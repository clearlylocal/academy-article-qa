import { matchPattern } from 'browser-extension-url-match'
import { Violation } from '../types/Violation'
import { htmlToFragment } from '../utils/dom'

export const checkUrlDomains = (
	html: string,
	domainBlacklist: string[],
): Violation[] => {
	const violations: Violation[] = []
	const fragment = htmlToFragment(html)

	const anyProtocol = '*://'
	const protocolMatcher = /^\w+:\/{2,3}/

	const matchers = domainBlacklist.map((domain) => {
		const protocol = domain.match(protocolMatcher)?.[0] ?? anyProtocol

		const segments = domain.replace(protocolMatcher, '').split('.')

		const hostname = (
			segments.length === 2 ? ['*', ...segments] : segments
		).join('.')

		const pattern = matchPattern(
			`${protocol}${
				hostname.endsWith('/') ? hostname.slice(0, -1) : hostname
			}/*`,
		)

		return Object.assign({ domain }, pattern)
	})

	const links = fragment.querySelectorAll<HTMLAnchorElement>('a[href]')

	const leafNodes = [...fragment.querySelectorAll<HTMLElement>('*')].filter(
		(x) =>
			x.childNodes.length === 1 &&
			x.childNodes[0].nodeType === Node.TEXT_NODE,
	)

	for (const link of links) {
		const { href: url, textContent: text } = link

		const parent = link.parentElement ?? link

		for (const x of parent.querySelectorAll('a[href]')) {
			x.classList[x === link ? 'add' : 'remove']('violation')
		}

		const m = matchers.find((m) => m.match(url))

		if (m) {
			const { pattern, domain } = m

			violations.push({
				kind: 'Domain',
				url,
				context: parent.innerHTML,
				text: text!,
				pattern,
				domain,
			})
		}
	}

	for (const leafNode of leafNodes) {
		const text = leafNode.textContent!

		const parent = leafNode.parentElement ?? leafNode

		const domains = text.match(/[a-z0-9-]+(\.[a-z0-9]+)+/gi) ?? []

		for (const domain of domains) {
			const m = matchers.find((m) => m.match(`https://${domain}`))

			if (m) {
				const { pattern, domain } = m

				const context = parent.innerHTML.replace(
					new RegExp(domain.replace(/\./g, '\\.'), 'i'),
					`<span class="violation">${domain}</span>`,
				)

				violations.push({
					kind: 'Domain',
					url: domain,
					context,
					text: text!,
					pattern,
					domain,
				})
			}
		}
	}

	return violations
}

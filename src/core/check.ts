import { matchPattern } from 'browser-extension-url-match'
import { htmlToFragment } from '../utils/dom'

export type Violation = {
	url: string
	text: string
	domain: string
	pattern: string
	context: string
}

export const check = (html: string, domainBlacklist: string[]): Violation[] => {
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

	for (const link of fragment.querySelectorAll<HTMLAnchorElement>(
		'a[href]',
	)) {
		const { href: url, textContent: text } = link

		const parent = link.parentElement ?? link

		for (const x of parent.querySelectorAll('a[href]')) {
			x.classList[x === link ? 'add' : 'remove']('violation')
		}

		const m = matchers.find((m) => m.match(url))

		if (m) {
			const { pattern, domain } = m

			violations.push({
				url,
				context: parent.innerHTML,
				text: text!,
				pattern,
				domain,
			})
		}
	}

	return violations
}

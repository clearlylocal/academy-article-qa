import { regex } from 'fancy-regex'
import { Violation } from '../types/Violation'
import { htmlToFragment } from '../utils/dom'
import { forgivingPunctuation, nonWord } from '../utils/formatters'

const cache = new Map<string, HTMLElement[]>()

export const checkKeywords = (
	html: string,
	keywords: string[],
): Violation[] => {
	if (!keywords.length) {
		return [
			{
				kind: 'NoKeywordsSpecified',
			},
		]
	} else {
		const keywordMatchers = [...keywords]
			.sort((a, b) => b.length - a.length)
			.map((keyword) => ({
				keyword,
				matcher: regex('iu')`
					(?<=^|${nonWord})
					${forgivingPunctuation(keyword)}
					(?=$|${nonWord})
				`,
			}))
			.filter(
				(x, i, a) =>
					a.findIndex((y) =>
						regex('iu')`^${x.matcher}$`.test(y.keyword),
					) === i,
			)

		const found: string[] = []
		const minKeywordsNeeded = Math.ceil(keywordMatchers.length / 2)

		const leafNodes = cache.has(html)
			? cache.get(html)!
			: (() => {
					const fragment = htmlToFragment(html)

					const leafNodes = [
						...fragment.querySelectorAll<HTMLElement>('*'),
					].filter(
						(x) =>
							x.childNodes.length === 1 &&
							x.childNodes[0].nodeType === Node.TEXT_NODE,
					)

					cache.set(html, leafNodes)

					return leafNodes
			  })()

		for (const leafNode of leafNodes) {
			const text = leafNode.textContent!

			for (const [i, keywordMatcher] of keywordMatchers.entries()) {
				if (keywordMatcher.matcher.test(text)) {
					found.push(keywordMatcher.keyword)
					keywordMatchers.splice(i, 1)

					break
				}
			}
		}

		return found.length < minKeywordsNeeded
			? [
					{
						kind: 'TooFewKeywordsFound',
						minKeywordsNeeded,
						found,
						notFound: keywordMatchers
							.map((x) => x.keyword)
							.reverse(),
					},
			  ]
			: []
	}
}

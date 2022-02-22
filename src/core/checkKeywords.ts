import { regex } from 'fancy-regex'
import { Violation } from '../types/Violation'
import { htmlToFragment } from '../utils/dom'
import { normalize } from '../utils/formatters'

const cache = new Map<string, HTMLElement[]>()

const MIN_COUNT_PER_KEYWORD = 1

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
		// matcher operates on normalized strings with
		// all punctuation and stop-words replaced with single space ('\x20')
		const keywordMatchers = [...keywords]
			.sort((a, b) => b.length - a.length)
			.map((keyword) => ({
				keyword,
				count: 0,
				matcher: regex('iu')`
					(?<=^|\x20)
					${normalize(keyword)}
					(?=$|\x20)
				`,
			}))
			.filter(
				(x, i, a) => a.findIndex((y) => x.keyword === y.keyword) === i,
			)

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
			// normalize all punctuation and stop-words to single space ('\x20')
			const text = normalize(leafNode.textContent!)

			for (const keywordMatcher of keywordMatchers) {
				if (keywordMatcher.matcher.test(text)) {
					keywordMatcher.count++
				}
			}
		}

		return keywordMatchers.filter((x) => x.count >= MIN_COUNT_PER_KEYWORD)
			.length < minKeywordsNeeded
			? [
					{
						kind: 'TooFewKeywordsFound',
						minKeywordsNeeded,
						keywordCounts: keywordMatchers,
						minCountPerKeyword: MIN_COUNT_PER_KEYWORD,
					},
			  ]
			: []
	}
}

import { regex } from 'fancy-regex'

export const slugify = (str: string) =>
	str
		.toLowerCase()
		.replace(
			regex('gu')`[
				^
				\p{Letter}
				\p{Mark}
				\p{Number}
			]+`,
			' ',
		)
		.trim()
		.replace(/\s+/g, '-')

export const filenameify = (date: Date) =>
	date.toISOString().replace(/:/g, '_').slice(0, 19) + 'Z'

export const nonWord = /[^\p{Letter}\p{Mark}\p{Number}]+/gu

export const forgivingPunctuation = (str: string) =>
	str.replace(nonWord, nonWord.source)

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

const nonWord = /[^\p{Letter}\p{Mark}\p{Number}]+/gu

const forgivingPunctuation = (str: string) =>
	str.replace(nonWord, nonWord.source)

// https://www.semrush.com/blog/seo-stop-words/
// prettier-ignore
const stopWords = ['a', 'about', 'above', 'actually', 'after', 'again', 'against', 'all', 'almost', 'also', 'although', 'always', 'am', 'an', 'and', 'any', 'are', 'as', 'at', 'be', 'became', 'become', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'could', 'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'either', 'else', 'few', 'for', 'from', 'further', 'had', 'has', 'have', 'having', 'he', "he'd", "he'll", 'hence', "he's", 'her', 'here', "here's", 'hers', 'herself', 'him', 'himself', 'his', 'how', "how's", 'I', "I'd", "I'll", "I'm", "I've", 'if', 'in', 'into', 'is', 'it', "it's", 'its', 'itself', 'just', "let's", 'may', 'maybe', 'me', 'might', 'mine', 'more', 'most', 'must', 'my', 'myself', 'neither', 'nor', 'not', 'of', 'oh', 'on', 'once', 'only', 'ok', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she', "she'd", "she'll", "she's", 'should', 'so', 'some', 'such', 'than', 'that', "that's", 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', "there's", 'these', 'they', "they'd", "they'll", "they're", "they've", 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', "we'd", "we'll", "we're", "we've", 'were', 'what', "what's", 'when', 'whenever', "when's", 'where', 'whereas', 'wherever', "where's", 'whether', 'which', 'while', 'who', 'whoever', "who's", 'whose', 'whom', 'why', "why's", 'will', 'with', 'within', 'would', 'yes', 'yet', 'you', "you'd", "you'll", "you're", "you've", 'your', 'yours', 'yourself', 'yourselves'].map(forgivingPunctuation)

const nonWordOrStopWord = regex('giu')`
	(?:
		${nonWord}
		| \b(?:${stopWords.join('|')})\b
	)+
`

export const normalize = (x: string) =>
	x.replace(nonWordOrStopWord, '\x20').trim()

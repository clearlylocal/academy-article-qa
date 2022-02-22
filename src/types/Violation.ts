type DomainViolation = {
	kind: 'Domain'
	url: string
	text: string
	domain: string
	pattern: string
	context: string
}

type NoKeywordsSpecifiedViolation = {
	kind: 'NoKeywordsSpecified'
}

type TooFewKeywordsFoundViolation = {
	kind: 'TooFewKeywordsFound'
	minKeywordsNeeded: number
	keywordCounts: { keyword: string; count: number }[]
	minCountPerKeyword: number
}

export type Violation =
	| DomainViolation
	| TooFewKeywordsFoundViolation
	| NoKeywordsSpecifiedViolation

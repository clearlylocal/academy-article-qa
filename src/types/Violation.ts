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
	found: string[]
	notFound: string[]
}

export type Violation =
	| DomainViolation
	| TooFewKeywordsFoundViolation
	| NoKeywordsSpecifiedViolation

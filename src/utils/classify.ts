export const classify = <T>(xs: T[], classifier: (x: T) => boolean) => {
	const left: T[] = []
	const right: T[] = []

	for (const x of xs) {
		;(classifier(x) ? right : left).push(x)
	}

	return [left, right] as [T[], T[]]
}

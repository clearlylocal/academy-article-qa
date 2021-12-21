type BugReport = {
	date: string
	cases: {
		description: string
		source: string[]
		__original: string[]
		expected: string[]
	}[]
}

export const bugReports: BugReport[] = []

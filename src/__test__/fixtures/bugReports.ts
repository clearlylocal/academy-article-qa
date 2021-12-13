type BugReport = {
	date: string
	cases: {
		source: string[]
		__original: string[]
		expected: string[]
	}[]
}

export const bugReports: BugReport[] = []

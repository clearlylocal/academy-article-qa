import { bugReports } from './fixtures/bugReports'

if (bugReports.length) {
	describe('Bug reports', () => {
		for (const { date, cases } of bugReports) {
			describe(date, () => {
				for (const { source, expected, description } of cases) {
					it(description, () => {
						expect(source).toStrictEqual(expected)
					})
				}
			})
		}
	})
} else {
	it('...', () => {
		expect(true).toBeTruthy()
	})
}

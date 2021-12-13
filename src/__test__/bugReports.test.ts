import { bugReports } from './fixtures/bugReports'

for (const { date, cases } of bugReports) {
	describe(date, () => {
		for (const { source, expected } of cases) {
			it('...', () => {
				expect(source).toStrictEqual(expected)
			})
		}
	})
}

import { checkUrlDomains as _checkUrlDomains } from '../core/checkUrlDomains'

const list = `
coinmarketcap.com/alexandria
investopedia.com
binance.com
ftx.com
kraken.com
crypto.com
kucoin.com
abc.def.com
http://xyz.com
`
	.split('\n')
	.map((x) => x.trim())
	.filter(Boolean)

const link = (href: string) => `<a href="${href}">xyz</a>`
const bodyLink = (href: string) => `<!DOCTYPE html>
<html lang="en">
	<head><title>Title</title></head>
	<body>
		<p>abc ${link(href)} def</p>
	</body>
</html>`

const testCheck = (href: string) => _checkUrlDomains(bodyLink(href), list)

describe('check', () => {
	describe('control cases', () => {
		it('empty', () => {
			const results = testCheck('')

			expect(results).toHaveLength(0)
		})

		it('no violations', () => {
			const results = testCheck('https://google.co')

			expect(results).toHaveLength(0)
		})
	})

	describe('base url', () => {
		it('violation - base url only', () => {
			const expectedDomain = 'investopedia.com'
			const results = testCheck('https://investopedia.com')

			expect(results?.[0].domain).toStrictEqual(expectedDomain)
		})

		it('violation - base url +', () => {
			const expectedDomain = 'investopedia.com'
			const results = testCheck('https://investopedia.com/abc')

			expect(results?.[0].domain).toStrictEqual(expectedDomain)
		})

		it('violation - with subdomain', () => {
			const expectedDomain = 'investopedia.com'
			const results = testCheck('https://www.investopedia.com/abc')

			expect(results?.[0].domain).toStrictEqual(expectedDomain)
		})

		it('violation - multiple subdomains', () => {
			const expectedDomain = 'investopedia.com'
			const results = testCheck('https://www.xyz.investopedia.com/abc')

			expect(results?.[0].domain).toStrictEqual(expectedDomain)
		})
	})

	describe('path specific', () => {
		it('violation - path specific only', () => {
			const expectedDomain = 'coinmarketcap.com/alexandria'
			const results = testCheck('https://coinmarketcap.com/alexandria/')

			expect(results?.[0].domain).toStrictEqual(expectedDomain)
		})

		it('violation - path specific +', () => {
			const expectedDomain = 'coinmarketcap.com/alexandria'
			const results = testCheck(
				'https://coinmarketcap.com/alexandria/abc',
			)

			expect(results?.[0].domain).toStrictEqual(expectedDomain)
		})

		it('no violation - path specific', () => {
			const results = testCheck('https://coinmarketcap.com/abc/def')

			expect(results).toHaveLength(0)
		})
	})

	describe('subdomain specific', () => {
		it('violation - subdomain specific only', () => {
			const expectedDomain = 'abc.def.com'
			const results = testCheck('https://abc.def.com')

			expect(results?.[0].domain).toStrictEqual(expectedDomain)
		})

		it('violation - subdomain specific +', () => {
			const expectedDomain = 'abc.def.com'
			const results = testCheck('https://abc.def.com/qrs')

			expect(results?.[0].domain).toStrictEqual(expectedDomain)
		})

		it('no violation - subdomain specific', () => {
			const results = testCheck('https://www.def.com/qrs')

			expect(results).toHaveLength(0)
		})
	})

	describe('protocol specific', () => {
		it('violation - protocol specific only', () => {
			const expectedDomain = 'http://xyz.com'
			const results = testCheck('http://xyz.com')

			expect(results?.[0].domain).toStrictEqual(expectedDomain)
		})

		it('violation - protocol specific +', () => {
			const expectedDomain = 'http://xyz.com'
			const results = testCheck('http://xyz.com/aaa')

			expect(results?.[0].domain).toStrictEqual(expectedDomain)
		})

		it('no violation - protocol specific', () => {
			const results = testCheck('https://xyz.com')

			expect(results).toHaveLength(0)
		})
	})
})

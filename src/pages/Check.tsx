import {
	FC,
	useCallback,
	useEffect,
	useMemo,
	useState,
	ReactEventHandler,
} from 'react'
import { checkUrlDomains } from '../core/checkUrlDomains'
import { checkKeywords } from '../core/checkKeywords'
import { joinPath } from '../utils/path'
import mammoth from 'mammoth'
import { renderViolation } from '../components/renderViolation'

export const readFile = (file: File) =>
	new Promise<ArrayBuffer>((res) => {
		const reader = new FileReader()

		reader.onload = (e) => res(e.target!.result as ArrayBuffer)

		reader.readAsArrayBuffer(file)
	})

type HtmlResult = Awaited<ReturnType<typeof mammoth.convertToHtml>>

export const Check: FC = () => {
	const [_keywords, _setKeywords] = useState('')

	const keywords = useMemo(
		() =>
			_keywords
				.split('\n')
				.map((x) => x.trim().split('\t')[0])
				.filter((x) => x && x.toLowerCase() !== 'keyword'),
		[_keywords],
	)

	const listId = 'list'

	const [domainBlacklist, setDomainBlacklist] = useState<string[]>([])

	useEffect(() => {
		if (listId) {
			fetch(joinPath('lists', `${listId}.txt`)).then(async (res) => {
				if (
					res.headers.get('content-type')?.split(';')[0].trim() !==
					'text/plain'
				) {
					return
				}

				const list = await res.text()

				setDomainBlacklist(list.split('\n').filter(Boolean))
			})
		}
	}, [listId])

	const [loading, setLoading] = useState(false)

	const [htmlResult, setHtmlResult] = useState<null | HtmlResult>(null)

	const fileChangeHandler: ReactEventHandler<HTMLInputElement> = useCallback(
		async (e) => {
			const { files } = e.currentTarget

			if (!files?.length) {
				return
			}

			setLoading(true)

			const file = files[0]
			const arrayBuffer = await readFile(file)

			const result = await mammoth.convertToHtml({ arrayBuffer })

			setHtmlResult(result)

			setLoading(false)
		},
		[],
	)

	const keywordViolations = useMemo(
		() =>
			htmlResult?.value ? checkKeywords(htmlResult.value, keywords) : [],
		[htmlResult, keywords],
	)

	const domainViolations = useMemo(
		() =>
			htmlResult?.value
				? checkUrlDomains(htmlResult.value, domainBlacklist)
				: [],
		[htmlResult, domainBlacklist],
	)

	const violations = useMemo(
		() => [...domainViolations, ...keywordViolations],
		[keywordViolations, domainViolations],
	)

	return !domainBlacklist.length ? (
		<>
			<div className='spaced'>Loading...</div>
		</>
	) : (
		<form>
			<h1>Check</h1>
			<div className='spaced'>
				<label>
					Upload file (DOCX)
					<input onChange={fileChangeHandler} type='file' />
				</label>
			</div>
			<div className='spaced'>
				<label>
					Keywords
					<textarea
						placeholder='Paste target keywords here (one per line)'
						onChange={(e) => _setKeywords(e.currentTarget.value)}
					/>
				</label>
			</div>

			<hr />

			<output>
				<div>
					{loading ? (
						<>Checking...</>
					) : !htmlResult ? (
						<>No file selected.</>
					) : !violations.length ? (
						<>No issues found 🎉</>
					) : (
						<ul>
							{violations.map((x, i) => (
								<li key={i}>{renderViolation(x)}</li>
							))}
						</ul>
					)}
				</div>
			</output>
		</form>
	)
}

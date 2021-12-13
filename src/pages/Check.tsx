import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { check, Violation } from '../core/check'
import { joinPath } from '../utils/path'
import mammoth from 'mammoth'

export const readFile = (file: File) =>
	new Promise<ArrayBuffer>((res) => {
		const reader = new FileReader()

		reader.onload = (e) => res(e.target!.result as ArrayBuffer)

		reader.readAsArrayBuffer(file)
	})

type FormVals = {
	files?: FileList
}

const init: FormVals = {}

export const Check: FC = () => {
	const defaultValues: FormVals = useMemo(
		() => JSON.parse(localStorage.getItem('checkerForm') ?? 'null') ?? init,
		[],
	)

	const { register, handleSubmit } = useForm<FormVals>({
		defaultValues,
	})

	const listId = 'list'

	const [list, setList] = useState<string[]>([])

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

				setList(list.split('\n').filter(Boolean))
			})
		}
	}, [listId])

	const [violations, setViolations] = useState<Violation[] | null>(null)
	const [loading, setLoading] = useState(false)

	const changeHandler = useCallback((form: FormVals) => {
		localStorage.setItem(
			'checkerForm',
			JSON.stringify(form, (k, v) =>
				(k as keyof FormVals) === 'files' ? undefined : v,
			),
		)
	}, [])

	const submitHandler = useCallback(
		async (form: FormVals) => {
			const { files } = form

			setViolations(null)

			if (!files?.length) {
				return
			}

			setLoading(true)

			const file = files[0]
			const arrayBuffer = await readFile(file)

			const result = await mammoth.convertToHtml({ arrayBuffer })

			setViolations(check(result.value, list))

			setLoading(false)
		},
		[list],
	)

	return !list.length ? (
		<>
			<div className='spaced'>Loading...</div>
		</>
	) : (
		<form
			onSubmit={handleSubmit(submitHandler)}
			onChange={handleSubmit(changeHandler)}
		>
			<h1>Check</h1>
			<div className='spaced'>
				<label>
					Upload file (DOCX)
					<input
						onChange={handleSubmit(submitHandler)}
						type='file'
						name='files'
						ref={register}
					/>
				</label>
			</div>
			{/* <div className='spaced'>
				<button type='submit'>Check</button>
			</div> */}

			<hr />

			<output>
				{violations?.length ? (
					<ul>
						{violations.map((x, i) => (
							<li key={i}>
								<p>
									Matched blacklisted domain
									<code>{x.domain}</code>. Context:
								</p>
								<blockquote
									className='violation-context'
									dangerouslySetInnerHTML={{
										__html: x.context,
									}}
								/>
							</li>
						))}
					</ul>
				) : Array.isArray(violations) ? (
					<>No blacklisted domains found 😄</>
				) : loading ? (
					<>Checking...</>
				) : (
					<>No file selected.</>
				)}
			</output>
		</form>
	)
}

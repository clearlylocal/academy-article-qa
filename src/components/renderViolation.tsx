import { Violation } from '../types/Violation'
import { classify } from '../utils/classify'

export const renderViolation = (violation: Violation): JSX.Element => {
	switch (violation.kind) {
		case 'Domain':
			return (
				<>
					<p>
						Matched blacklisted domain
						<code>{violation.domain}</code>. Context:
					</p>
					<blockquote
						className='violation-context'
						dangerouslySetInnerHTML={{
							__html: violation.context,
						}}
					/>
				</>
			)
		case 'NoKeywordsSpecified':
			return <p>No keywords specified. Please specify target keywords.</p>
		case 'TooFewKeywordsFound':
			const [notFound, found] = classify(
				violation.keywordCounts,
				(x) => x.count >= violation.minCountPerKeyword,
			).map((xs) => xs.map((x) => x.keyword))

			return (
				<>
					<p>
						Only {found.length} of {found.length + notFound.length}{' '}
						keywords found (
						<strong>{violation.minKeywordsNeeded} needed</strong>)
					</p>
					<div>
						<strong>Found:</strong>
						<ul>
							{found.map((keyword, idx) => (
								<li key={idx}>{keyword}</li>
							))}
						</ul>
					</div>
					<div>
						<strong>Not found:</strong>
						<ul>
							{notFound.map((keyword, idx) => (
								<li key={idx}>{keyword}</li>
							))}
						</ul>
					</div>
				</>
			)
	}
}

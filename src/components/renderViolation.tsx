import { Violation } from '../types/Violation'

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
			return (
				<>
					<p>
						Only {violation.found.length} of{' '}
						{violation.found.length + violation.notFound.length}{' '}
						keywords found (
						<strong>{violation.minKeywordsNeeded} needed</strong>)
					</p>
					<div>
						<strong>Found:</strong>
						<ul>
							{violation.found.map((keyword, idx) => (
								<li key={idx}>{keyword}</li>
							))}
						</ul>
					</div>
					<div>
						<strong>Not found:</strong>
						<ul>
							{violation.notFound.map((keyword, idx) => (
								<li key={idx}>{keyword}</li>
							))}
						</ul>
					</div>
				</>
			)
	}
}

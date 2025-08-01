'use client';

import { useState } from 'react';

export default function SimplePostPage() {
	const [response, setResponse] = useState('');

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const data = {
			prompt: formData.get('prompt') as string,
		};

		const res = await fetch('/api/topics', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		const result = await res.json();
		setResponse(JSON.stringify(result, null, 2));
	};

	return (
		<div>
			<h1>Enter your topic below:</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Prompt:</label>
					<input id="prompt" name="prompt" type="text" required />
				</div>

				<button type="submit">Submit</button>
			</form>
			<pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
				{response}
			</pre>
		</div>
	);
}

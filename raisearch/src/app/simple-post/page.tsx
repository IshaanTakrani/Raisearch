'use client';

import { useState } from 'react';

export default function SimplePostPage() {
	const [response, setResponse] = useState(null);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const data = {
			prompt: formData.get('prompt') as string,
		};

		const res = await fetch('/api/simple', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		const result = await res.json();
		setResponse(result);
		console.log(result);
	};

	return (
		<div>
			<h1>Simple POST Request</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Prompt:</label>
					<input id="prompt" name="prompt" type="text" required />
				</div>

				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

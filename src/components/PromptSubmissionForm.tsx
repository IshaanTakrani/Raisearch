'use client';
import { useState } from 'react';

export default function PromptForm() {
	const [showTopics, setShowTopics] = useState(false);
	const [response, setResponse] = useState('');

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const data = {
			prompt: formData.get('prompt'),
			topics: showTopics
				? [
						formData.get('topic1'),
						formData.get('topic2'),
						formData.get('topic3'),
				  ]
				: [],
		};
		console.log('Form submitted:', data);
		setResponse(JSON.stringify(data, null, 2));
	};

	return (
		<div className="flex flex-col justify-center items-center w-full px-30">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col justify-center items-center w-full h-dvh "
			>
				<p className="text-5xl text-primary m-10 mb-0 mt-30">Submit a Prompt</p>

				<p className="text-[var(--green)] m-10 my-5">
					Type your prompt {showTopics && 'and topics'} below
				</p>

				{/* Prompt Field */}
				<div className="flex flex-col items-center w-full max-w-lg">
					<label
						htmlFor="prompt"
						className="mb-2 text-lg font-medium text-primary"
					>
						Prompt:
					</label>
					<input
						id="prompt"
						name="prompt"
						type="text"
						required
						className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>

				{/* Toggle for Topics */}
				<div className="flex items-center gap-3 mt-8">
					<input
						id="toggleTopics"
						type="checkbox"
						checked={showTopics}
						onChange={(e) => setShowTopics(e.target.checked)}
						className="w-5 h-5 accent-primary"
					/>
					<label htmlFor="toggleTopics" className="text-lg text-primary">
						Add Topics
					</label>
				</div>

				{/* Topics Section (conditionally shown) */}
				{showTopics && (
					<div className="flex flex-col items-center w-full max-w-lg mt-8">
						<label className="mb-4 text-lg font-medium text-primary">
							Topics:
						</label>
						<input
							name="topic1"
							type="text"
							placeholder="Topic 1"
							className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
						/>
						<input
							name="topic2"
							type="text"
							placeholder="Topic 2"
							className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
						/>
						<input
							name="topic3"
							type="text"
							placeholder="Topic 3"
							className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary"
						/>
					</div>
				)}

				{/* Submit Button */}
				<button
					type="submit"
					className="mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition"
				>
					Submit
				</button>
			</form>

			{/* Response Display */}
			<div className="mt-10 text-center max-w-lg whitespace-pre-wrap">
				{response}
			</div>
		</div>
	);
}

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from '@/components/ui/card';

import { generateSummaryFromSources } from '@/app/paper-assistant/[user_id]/[paper_id]/actions';

type Message = {
	role: 'user' | 'ai';
	content: string;
};

function AIAssistantTab({ paper_id }: { paper_id: string }) {
	const [messages, setMessages] = useState<Message[]>([
		{ role: 'ai', content: 'Hello! How can I help you today?' },
	]);
	const [input, setInput] = useState('');

	const bottomRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]); // runs whenever messages change

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim()) return;

		// ✅ Tell TS that role is of type "user"
		const newMessages: Message[] = [
			...messages,
			{ role: 'user', content: input } as Message,
		];
		setMessages(newMessages);
		setInput('');

		let llmResponse = await generateSummaryFromSources(
			'TODO: put user id here',
			paper_id,
			input
		);

		// Simulate AI response
		setMessages((prev) => [
			...prev,
			{ role: 'ai', content: `${llmResponse}` } as Message,
		]);
	};

	return (
		<Card className="w-full mx-auto shadow-lg rounded-2xl h-[500px] flex flex-col">
			<CardHeader>
				<CardTitle className="text-xl font-semibold">AI Chatbot</CardTitle>
			</CardHeader>

			<CardContent className="flex-1 overflow-y-auto space-y-3 pr-2">
				{messages.map((msg, idx) => (
					<div
						key={idx}
						className={`p-2 rounded-lg max-w-[80%] ${
							msg.role === 'user'
								? 'bg-[var(--green)] text-secondary ml-auto'
								: 'bg-muted text-primary'
						}`}
					>
						{msg.content}
					</div>
				))}

				{/* Invisible anchor div */}
				<div ref={bottomRef} />
			</CardContent>

			<CardFooter>
				<form
					onSubmit={handleSubmit}
					className="flex w-full gap-2 items-center"
				>
					<Input
						placeholder="Type your message..."
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<Button type="submit">Send</Button>
				</form>
			</CardFooter>
		</Card>
	);
}

export default AIAssistantTab;

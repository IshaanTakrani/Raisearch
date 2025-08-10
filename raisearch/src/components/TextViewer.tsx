'use client';

import React, { useState, useEffect, useRef } from 'react';
import { updatePaper } from '@/lib/db_service';

interface TextViewerProps {
	user_id: string;
	formattedPaper: string;
	id: string;
}

export default function TextViewer({
	formattedPaper,
	id,
	user_id,
}: TextViewerProps) {
	const [text, setText] = useState(
		formattedPaper.replace(/\\n/g, '\n').replace(/\\"/g, '"')
	);
	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (divRef.current) {
			divRef.current.innerHTML = text.replace(/\n/g, '<br>');
		}
	}, []);

	const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
		setText(e.currentTarget.innerHTML);
	};

	async function handlePrintText() {
		try {
			console.log(text);
			await updatePaper(user_id, id, text);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="text-xl">
			<div
				ref={divRef}
				contentEditable
				className="w-full p-5 border rounded-lg min-h-[200px] outline-none"
				onInput={handleInput}
				suppressContentEditableWarning
			/>
			<button
				onClick={handlePrintText}
				className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
			>
				Print Text
			</button>
		</div>
	);
}

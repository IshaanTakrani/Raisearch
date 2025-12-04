'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { updatePaper } from '@/lib/db_service';
import { toast } from 'sonner';

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

	const handleKeyDown = async (event: any) => {
		if (event.ctrlKey && event.key === 's') {
			event.preventDefault();
			console.log('save');

			await updatePaper(user_id, id, text);
			toast('Paper has been saved', {
				description: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
			});
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown]);

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
		<div className="text-lg">
			<div
				ref={divRef}
				contentEditable
				className="w-full p-5 border rounded-lg min-h-[200px] outline-none"
				onInput={handleInput}
				suppressContentEditableWarning
			/>
		</div>
	);
}

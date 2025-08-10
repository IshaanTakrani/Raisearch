'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Textarea } from './ui/textarea';

interface TextViewerProps {
	cumulativePaper: string[];
	topics: string[];
}

export default function TextViewer({
	cumulativePaper,
	topics,
}: TextViewerProps) {
	let paperAsString: string = '';

	for (let i = 0; i < topics.length; i++) {
		paperAsString += topics[i];
		paperAsString += '\n';
		paperAsString += cumulativePaper[i];
		paperAsString += '\n\n';
	}

	const [text, setText] = useState(paperAsString);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// Adjust height on every text change
	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto'; // reset to shrink if needed
			textareaRef.current.style.height =
				textareaRef.current.scrollHeight + 'px';
		}
	}, [text]);

	return (
		<div className="text-xl">
			<textarea
				ref={textareaRef}
				value={text}
				onChange={(e) => setText(e.target.value)}
				className="w-full p-5 border-border border-solid border-1 rounded-lg resize-none text-[1em] field-sizing-content"
			/>
		</div>
	);
}

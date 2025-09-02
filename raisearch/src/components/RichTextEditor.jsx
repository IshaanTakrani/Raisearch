'use client';
import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { updateAssistPaper } from '@/lib/db_service';

export default function RichTextEditor(paper_content) {
	const editor = useEditor({
		extensions: [StarterKit],
		content: paper_content.paper_content,
		immediatelyRender: false,
	});

	console.log(paper_content.paper_content);

	// useEffect(() => {
	// 	if (!editor) return null;

	// 	const handleSave = (e) => {
	// 		if ((e.ctrlKey || e.metaKey) && e.key === 's') {
	// 			e.preventDefault();
	// 			let html = editor.getHTML();
	// 			console.log('saving...');
	// 			console.log(html);
	// 		}
	// 	};

	// 	document.addEventListener('keydown', handleSave);
	// 	return () => document.removeEventListener('keydown', handleSave);
	// }, [editor]);

	useEffect(() => {
		if (!editor) return;

		const handleSave = (e) => {
			// Ctrl+S / Cmd+S
			if ((e.ctrlKey || e.metaKey) && e.key === 's') {
				e.preventDefault(); // prevent browser save dialog
				const html = editor.getHTML(); // or editor.getJSON()
				console.log('Saving to DB:', html);
				toast('Paper has been saved', {
					description: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
				});
				// updateAssistPaper(user);

				// TODO: call your API route here
				// await fetch('/api/save', { method: 'POST', body: JSON.stringify({ content: html }) })
			}
		};

		document.addEventListener('keydown', handleSave);
		return () => document.removeEventListener('keydown', handleSave);
	}, [editor]);

	if (!editor) return null;

	return (
		<div className="border rounded-lg p-4 space-y-4 w-full">
			{/* Toolbar */}
			<div className="flex gap-2">
				<Button
					size="sm"
					variant={editor.isActive('bold') ? 'default' : 'outline'}
					onClick={() => editor.chain().focus().toggleBold().run()}
				>
					Bold
				</Button>
				<Button
					size="sm"
					variant={editor.isActive('italic') ? 'default' : 'outline'}
					onClick={() => editor.chain().focus().toggleItalic().run()}
				>
					Italic
				</Button>
			</div>

			<EditorContent
				editor={editor}
				className="prose dark:prose-invert max-w-none"
			/>
		</div>
	);
}

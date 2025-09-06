'use client';
import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { updateAssistPaper } from '@/lib/db_service';

export default function RichTextEditor({ paper_content, paper_id, user_id }) {
	const editor = useEditor({
		extensions: [StarterKit],
		content: paper_content,
		immediatelyRender: false,
	});

	console.log('Paper Content:', paper_content?.paper_content);
	console.log('Paper ID:', paper_id);
	console.log('User ID:', user_id);

	useEffect(() => {
		if (!editor) return;

		const handleSave = async (e) => {
			if ((e.ctrlKey || e.metaKey) && e.key === 's') {
				e.preventDefault();
				const html = editor.getHTML();
				console.log('Saving to DB:', html);

				toast('Paper has been saved', {
					description: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
				});

				// Call Supabase update function
				await updateAssistPaper(user_id, paper_id, html);

				console.log('FROM CLIENT:');
				console.log('user_id:', user_id);
				console.log('paper_id:', paper_id);
			}
		};

		document.addEventListener('keydown', handleSave);
		return () => document.removeEventListener('keydown', handleSave);
	}, [editor, user_id, paper_id]);

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

			<div className="p-4 m-4">
				<div className=" bg-white drop-shadow-lg p-6 border border-gray-200 min-h-500 relative select-none outline-none">
					<EditorContent
						editor={editor}
						className="ProseEditor prose dark:prose-invert max-w-none min-h-[500px] select-none"
					/>
				</div>
			</div>
		</div>
	);
}

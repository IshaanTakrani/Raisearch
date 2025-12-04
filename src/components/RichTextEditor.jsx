'use client';
import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown'; // Import the extension
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { updateAssistPaper } from '@/lib/db_service';
import {
	Bold,
	Italic,
	Strikethrough,
	List,
	ListOrdered,
	Heading1,
	Heading2,
	Quote,
	Undo,
	Redo,
} from 'lucide-react';

export default function RichTextEditor({ paper_content, paper_id, user_id }) {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Markdown.configure({
				html: false, // Force output to be pure Markdown
				transformPastedText: true, // Allow pasting markdown from other sources
				transformCopiedText: true, // Copying text copies it as markdown
			}),
		],
		// If your DB content is already Markdown, Tiptap will parse it automatically.
		content: paper_content,
		immediatelyRender: false,
		editorProps: {
			attributes: {
				class:
					'prose dark:prose-invert max-w-none min-h-[500px] focus:outline-none',
			},
		},
	});

	const handleContainerClick = () => {
		if (editor) {
			editor.chain().focus().run();
		}
	};

	useEffect(() => {
		if (!editor) return;

		const handleSave = async (e) => {
			if ((e.ctrlKey || e.metaKey) && e.key === 's') {
				e.preventDefault();

				// 1. Get Markdown instead of HTML
				const markdownOutput = editor.storage.markdown.getMarkdown();

				console.log('Saving to DB (Markdown):', markdownOutput);

				toast('Paper has been saved', {
					description: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
				});

				// Save the markdown string to your DB
				await updateAssistPaper(user_id, paper_id, markdownOutput);
			}
		};

		document.addEventListener('keydown', handleSave);
		return () => document.removeEventListener('keydown', handleSave);
	}, [editor, user_id, paper_id]);

	if (!editor) return null;

	return (
		<div className="border rounded-lg p-4 space-y-4 w-full">
			{/* Toolbar (remains the same) */}
			<div className="flex flex-wrap gap-1 border-b pb-4">
				<ToolbarButton
					onClick={() => editor.chain().focus().toggleBold().run()}
					isActive={editor.isActive('bold')}
					icon={<Bold className="w-4 h-4" />}
					label="Bold"
				/>
				<ToolbarButton
					onClick={() => editor.chain().focus().toggleItalic().run()}
					isActive={editor.isActive('italic')}
					icon={<Italic className="w-4 h-4" />}
					label="Italic"
				/>
				<ToolbarButton
					onClick={() => editor.chain().focus().toggleStrike().run()}
					isActive={editor.isActive('strike')}
					icon={<Strikethrough className="w-4 h-4" />}
					label="Strike"
				/>

				<div className="w-px h-6 bg-gray-200 mx-2 self-center" />

				<ToolbarButton
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 1 }).run()
					}
					isActive={editor.isActive('heading', { level: 1 })}
					icon={<Heading1 className="w-4 h-4" />}
					label="H1"
				/>
				<ToolbarButton
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					}
					isActive={editor.isActive('heading', { level: 2 })}
					icon={<Heading2 className="w-4 h-4" />}
					label="H2"
				/>

				<div className="w-px h-6 bg-gray-200 mx-2 self-center" />

				<ToolbarButton
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					isActive={editor.isActive('bulletList')}
					icon={<List className="w-4 h-4" />}
					label="Bullet List"
				/>
				<ToolbarButton
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					isActive={editor.isActive('orderedList')}
					icon={<ListOrdered className="w-4 h-4" />}
					label="Ordered List"
				/>
				<ToolbarButton
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
					isActive={editor.isActive('blockquote')}
					icon={<Quote className="w-4 h-4" />}
					label="Quote"
				/>
			</div>

			<div className="p-4 m-4 bg-gray-50 rounded-md">
				<div
					className="bg-white drop-shadow-lg p-12 border border-gray-200 min-h-[800px] cursor-text w-full mx-auto max-w-4xl"
					onClick={handleContainerClick}
				>
					<EditorContent editor={editor} />
				</div>
			</div>
		</div>
	);
}

function ToolbarButton({ onClick, isActive, disabled, icon, label }) {
	return (
		<Button
			size="icon"
			variant={isActive ? 'default' : 'ghost'}
			onClick={onClick}
			disabled={disabled}
			className="h-8 w-8"
			title={label}
			type="button"
		>
			{icon}
		</Button>
	);
}

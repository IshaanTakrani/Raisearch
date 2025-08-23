"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";

export default function RichTextEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="border rounded-lg p-4 space-y-4 w-full">
      {/* Toolbar */}
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={editor.isActive("bold") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </Button>
        <Button
          size="sm"
          variant={editor.isActive("italic") ? "default" : "outline"}
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

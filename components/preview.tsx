"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Blockquote from "@tiptap/extension-blockquote";
import { useEffect } from "react";

interface PreviewProps {
  content: string;
}

const Preview = ({ content }: PreviewProps) => {
  const editor = useEditor({
    extensions: [
      Blockquote,
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
    ],
    content,
    editable: false, 
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="p-4 border rounded-md prose dark:prose-invert">
      <EditorContent editor={editor} />
    </div>
  );
};

export default Preview;

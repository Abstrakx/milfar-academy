"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Blockquote from "@tiptap/extension-blockquote";
import { useEffect } from "react";

interface PreviewArticleProps {
  content: string;
}

const PreviewArticle = ({ content }: PreviewArticleProps) => {
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
    immediatelyRender: false,
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
    <div className="prose prose-lg max-w-none p-0">
        <EditorContent editor={editor} />
    </div>
  );
};

export default PreviewArticle;

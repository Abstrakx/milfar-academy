"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Blockquote from "@tiptap/extension-blockquote";
import { Bold, Italic, Heading1, Heading2, Heading3, Quote, List, ListOrdered } from "lucide-react";
import { useEffect } from "react";

interface EditorProps {
    onChange: (value: string) => void;
    value: string;
}

interface Button {
    title: string;
    icon: React.ReactNode;
    action: (e: React.MouseEvent) => void;
    isActive: boolean;
}

const EditorButton = ({
    onClick,
    isActive,
    title,
    children,
}: {
    onClick: (e: React.MouseEvent) => void;
    isActive?: boolean;
    title: string;
    children: React.ReactNode;
}) => (
    <button
        onClick={onClick}
        type="button"
        className={`p-2 rounded hover:bg-gray-100 ${
            isActive ? "bg-gray-200" : ""
        }`}
        title={title}
    >
        {children}
    </button>
);

const Editor = ({ onChange, value }: EditorProps) => {
    const editor = useEditor({
        extensions: [
            Blockquote,
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: "min-h-[150px] prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        immediatelyRender: false,
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    if (!editor) {
        return null;
    }

    const buttons: Array<Button | "divider"> = [
        {
            title: "Bold",
            icon: <Bold className="w-5 h-5" />,
            action: (e) => {
                e.preventDefault();
                editor.chain().focus().toggleBold().run();
            },
            isActive: editor.isActive("bold"),
        },
        {
            title: "Italic",
            icon: <Italic className="w-5 h-5" />,
            action: (e) => {
                e.preventDefault();
                editor.chain().focus().toggleItalic().run();
            },
            isActive: editor.isActive("italic"),
        },
        "divider",
        {
            title: "Heading 1",
            icon: <Heading1 className="w-5 h-5" />,
            action: (e) => {
                e.preventDefault();
                editor.chain().focus().toggleHeading({ level: 1 }).run();
            },
            isActive: editor.isActive("heading", { level: 1 }),
        },
        {
            title: "Heading 2",
            icon: <Heading2 className="w-5 h-5" />,
            action: (e) => {
                e.preventDefault();
                editor.chain().focus().toggleHeading({ level: 2 }).run();
            },
            isActive: editor.isActive("heading", { level: 2 }),
        },
        {
            title: "Heading 3",
            icon: <Heading3 className="w-5 h-5" />,
            action: (e) => {
                e.preventDefault();
                editor.chain().focus().toggleHeading({ level: 3 }).run();
            },
            isActive: editor.isActive("heading", { level: 3 }),
        },
        "divider",
        {
            title: "Blockquote",
            icon: <Quote className="w-5 h-5" />,
            action: (e) => {
                e.preventDefault();
                editor.chain().focus().toggleBlockquote().run();
            },
            isActive: editor.isActive("blockquote"),
        },
        {
            title: "Bullet List",
            icon: <List className="w-5 h-5" />,
            action: (e) => {
                e.preventDefault();
                editor.chain().focus().toggleBulletList().run();
            },
            isActive: editor.isActive("bulletList"),
        },
        {
            title: "Numbered List",
            icon: <ListOrdered className="w-5 h-5" />,
            action: (e) => {
                e.preventDefault();
                editor.chain().focus().toggleOrderedList().run();
            },
            isActive: editor.isActive("orderedList"),
        },
    ];

    return (
        <div className="border rounded-md">
            <div className="border-b p-2 flex flex-wrap gap-2">
                {buttons.map((button, index) =>
                    button === "divider" ? (
                        <div key={`divider-${index}`} className="w-px bg-gray-200" />
                    ) : (
                        <EditorButton
                            key={button.title}
                            onClick={button.action}
                            isActive={button.isActive}
                            title={button.title}
                        >
                            {button.icon}
                        </EditorButton>
                    )
                )}
            </div>
            <div className="p-2">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default Editor;

"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

function ToolbarButton({
  active,
  onClick,
  children,
  className = "",
  ariaLabel,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={active}
      className={`h-10 px-4 border border-[#998C5F] flex items-center justify-center font-[family-name:var(--font-montserrat)] text-base font-bold transition-colors cursor-pointer ${
        active ? "bg-[rgba(255,234,158,0.3)] text-[#00101A]" : "bg-transparent text-[#00101A] hover:bg-[rgba(255,234,158,0.1)]"
      } ${className}`}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = "Hãy gửi gắm lời cám ơn và ghi nhận đến đồng đội tại đây nhé!",
}: {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        code: false,
        horizontalRule: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-blue-500 underline" },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "w-full min-h-[160px] max-h-[300px] overflow-y-auto px-6 pt-4 pb-4 font-[family-name:var(--font-montserrat)] text-base font-bold text-[#00101A] leading-6 focus:outline-none prose prose-sm max-w-none",
      },
    },
  });

  if (!editor) return null;

  function handleLinkInsert() {
    const url = window.prompt("Nhập URL:");
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  }

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex items-center border border-[#998C5F] rounded-t-lg overflow-hidden">
        <ToolbarButton
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          ariaLabel="In đậm"
          className="rounded-tl-lg"
        >
          B
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          ariaLabel="In nghiêng"
        >
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          ariaLabel="Gạch ngang"
        >
          <s>S</s>
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          ariaLabel="Danh sách đánh số"
        >
          ≡
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("link")}
          onClick={handleLinkInsert}
          ariaLabel="Chèn liên kết"
        >
          🔗
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          ariaLabel="Trích dẫn"
        >
          &ldquo;&rdquo;
        </ToolbarButton>
        <div className="flex-1 h-10 border-l border-[#998C5F] flex items-center justify-end px-4">
          <a
            href="#"
            className="font-[family-name:var(--font-montserrat)] text-base font-bold text-[#E46060] hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            Tiêu chuẩn cộng đồng
          </a>
        </div>
      </div>

      {/* Editor */}
      <div className="border border-t-0 border-[#998C5F] rounded-b-lg bg-white min-h-[200px]">
        {editor.isEmpty && (
          <p className="absolute px-6 pt-4 text-[#999] font-[family-name:var(--font-montserrat)] text-base font-bold pointer-events-none">
            {placeholder}
          </p>
        )}
        <EditorContent editor={editor} />
      </div>

      {/* Hint */}
      <p className="mt-1 font-[family-name:var(--font-montserrat)] text-base font-bold text-[#00101A] tracking-wide">
        Bạn có thể &quot;@ + tên&quot; để nhắc tới đồng nghiệp khác
      </p>
    </div>
  );
}

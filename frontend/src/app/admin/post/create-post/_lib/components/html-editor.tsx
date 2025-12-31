"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { useState } from "react";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

export default function HtmlEditor() {
  const [content, setContent] = useState("");


  return (
    <div className="bg-amber-50 max-w-[1200">
      <SimpleEditor />
    </div>
  );
}

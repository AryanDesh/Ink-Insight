import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from '@editorjs/paragraph';
import { BlockToolConstructable } from "@editorjs/editorjs";
import { useEffect, useRef } from "react";

// Explicitly type the tools
const header: BlockToolConstructable = Header as unknown as BlockToolConstructable;
const list: BlockToolConstructable = List as unknown as BlockToolConstructable;
const paragraph: BlockToolConstructable = Paragraph as unknown as BlockToolConstructable;

  
// a button function that will allow editor to become read only

const MarkdownEditor: React.FC = () => {
  const editorRef = useRef<EditorJS | null>(null);
  const editorHolder = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!editorHolder.current) return;

    // Initialize Editor.js
    editorRef.current = new EditorJS({
      holder: editorHolder.current,
      tools: {
        header: header,
        list: list,
        paragraph: paragraph,
      },
      placeholder: 'Start typing your content...',
    });

    // Cleanup on unmount
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  const handleSave = async () => {
    if (editorRef.current) {
      const savedData = await editorRef.current.save();
      console.log('Saved Data:', savedData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Markdown Editor (Editor.js)</h1>
      <div
        ref={editorHolder}
        className="border border-gray-300 bg-white rounded-md shadow-md p-4 min-h-[300px]"
      />
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md"
      >
        Save Content
      </button>
    </div>
  );
};

export default MarkdownEditor;

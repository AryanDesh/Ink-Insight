import React, { useEffect, useRef } from 'react'
import EditorJS, { OutputData} from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import EditorjsList from '@editorjs/list';
import CodeTool from '@editorjs/code';
import Quote from '@editorjs/quote';
import Warning from '@editorjs/warning';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import Table from '@editorjs/table';
import { useRecoilState } from 'recoil';
import {editorContent} from '../store/Recoil'

export enum eCollab {
  "SENT",
  "RECEIVED"
}
interface EditorComponentProps {
  receivedData?: OutputData;
  collab? : eCollab,
}


type t = Partial<OutputData>
const editorHolderId = 'editorjs';

const Editor: React.FC<EditorComponentProps> = ({ receivedData, collab }) => {
  const [editorData, setEditorData] = useRecoilState(editorContent);
  const ejRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!ejRef.current) {
      initEditor();
    }
    return () => {
      ejRef.current?.destroy();
      ejRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (ejRef.current && collab == eCollab.RECEIVED) {
      ejRef.current.render(receivedData!);
    }
  }, [receivedData]);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: editorHolderId,
      data: editorData as OutputData,
      onReady: () => {
        ejRef.current = editor;
      },
      onChange: async () => {
        // Save the editor data locally
        const content = await editor.saver.save();
        setEditorData(content);
        console.log(editorData);
      },
      autofocus: true,
      tools: {
        header: Header,
        paragraph: Paragraph,
        list: EditorjsList,
        quote: Quote,
        warning: Warning,
        code: CodeTool,
        delimiter: Delimiter,
        inlineCode: InlineCode,
        table: Table
      },
    });
  };

  return <div id={editorHolderId} ></div>;
};
export default Editor;
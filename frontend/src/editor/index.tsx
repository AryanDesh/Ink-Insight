import React, { useEffect, useRef, useState } from 'react'
import EditorJS, {BlockToolConstructable, OutputData} from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import EditorjsList from '@editorjs/list';
import { useRecoilState, useRecoilValue } from 'recoil';
import {editorContent} from '../store/Recoil'

export enum eCollab {
  "SENT",
  "RECEIVED"
}
interface EditorComponentProps {
  receivedData?: OutputData;
  collab? : eCollab,
}

const HeaderTool = Header as unknown as BlockToolConstructable;
const ParagraphTool = Paragraph as unknown as BlockToolConstructable;
const ListTool = EditorjsList as unknown as BlockToolConstructable;

type t = Partial<OutputData>
const editorHolderId = 'editorjs';

const Editor: React.FC<EditorComponentProps> = ({ receivedData, collab }) => {
  const [editorData, setEditorData] = useRecoilState(editorContent);
  const ejRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!ejRef.current) initEditor();

    return () => {
      ejRef.current?.destroy();
      ejRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (ejRef.current && collab == eCollab.RECEIVED) {
      ejRef.current.render(receivedData);
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
        header: HeaderTool,
        paragraph: ParagraphTool,
        list: ListTool,
      },
    });
  };

  return <div id={editorHolderId}></div>;
};
export default Editor;

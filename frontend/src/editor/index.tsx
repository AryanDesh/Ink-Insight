import EditorJS, {BlockToolConstructable } from '@editorjs/editorjs';
import React ,{useRef , useEffect, useState, Dispatch, SetStateAction} from 'react'
import { tEditorData } from '../lib/types';
import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import EditorjsList from '@editorjs/list';


const HeaderTool = Header as unknown as BlockToolConstructable;
const ParagraphTool = Paragraph as unknown as BlockToolConstructable;
const ListTool = EditorjsList as unknown as BlockToolConstructable;

const editorHolderId = 'editorjs';

type t = Partial<tEditorData>
const Editor = ( {editorData, setEditorData} : {editorData : t , setEditorData: Dispatch<SetStateAction<Partial<tEditorData>>>} ) => {
  const ejRef = useRef<EditorJS | null>(null);
  if(editorData.blocks){
    editorData.blocks.map((block) => console.log(block.data.text));
  }
  useEffect(() => {
    if(!ejRef.current) initEditor();
    return () => {
        ejRef.current?.destroy();
        ejRef.current = null; 
    }
  }, []);

  useEffect(() => {

  }, [editorData])

  // useEffect(() => {
  //   console.log("bifdbksbcb D");
  // }, []);
  const initEditor = () => {
    const editor = new EditorJS({
      holder : editorHolderId ,
      data: editorData as tEditorData,
      onReady: () => {
        ejRef.current = editor ;
      },

      onChange: async () => {
        let content  = await editor.saver.save();
        setEditorData(content);
      },
      
      autofocus : true,
      tools: {
        header : HeaderTool,
        paragraph : ParagraphTool,
        list : ListTool,
      }
    })
  }
  return (
      <div id = {editorHolderId}></div>
  )
}

export default Editor
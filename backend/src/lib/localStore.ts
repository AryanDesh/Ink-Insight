import { tEditorData } from "./types";

class EditorState {
    private static instance : EditorState;
    private data : tEditorData;
    private EditorState () {
        this.data = {
            "time" : new Date().getTime(),
            "blocks" : [
              {
                "type" : "header",
                "data" : {
                  "text" : "...",
                  "level" : 1
                } 
              }
            ]
        }
    }
    public static getInstance() : EditorState {
        if(!EditorState.instance){
            EditorState.instance = new EditorState();
        }
        return EditorState.instance;
    };

    public static makeChanges() {
        
    }
}
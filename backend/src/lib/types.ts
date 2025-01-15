
export type tEditorData = { 
    time: number;
    blocks: {
        type: string;
        data: {
            text: string;
            level: number;
        };
    }[];
}
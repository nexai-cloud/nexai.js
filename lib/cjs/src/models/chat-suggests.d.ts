export declare const ChatSuggests: {
    items: string[];
    currentIndex: number;
};
export declare const fetchSuggests: (projectName: string) => Promise<void>;
export declare const setSuggests: (suggests: string[]) => Promise<void>;
export declare const getSuggests: () => string[];
export declare const nextSuggests: () => string[];

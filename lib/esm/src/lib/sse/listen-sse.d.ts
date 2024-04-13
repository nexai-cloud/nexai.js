export declare const listenSSE: (url: string, callback: <Data>(event: MessageEvent<Data>) => {
    cancel?: true;
} | void) => {
    close: () => void;
};

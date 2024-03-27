export const listenSSE = (url, callback) => {
    const eventSource = new EventSource(url, {
    // withCredentials: true,
    });
    console.info("Listenting on SEE", eventSource);
    eventSource.onmessage = (event) => {
        const result = callback(Object.assign(Object.assign({}, event), { data: JSON.parse(event.data) }));
        if (result === null || result === void 0 ? void 0 : result.cancel) {
            console.info("Closing SSE");
            eventSource.close();
        }
    };
    return {
        close: () => {
            console.info("Closing SSE");
            eventSource.close();
        },
    };
};

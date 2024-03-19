export const listenSSE = (
  url: string, 
  callback: <Data>(event: MessageEvent<Data>) => { cancel?: true } | void
) => {
  const eventSource = new EventSource(url, {
    // withCredentials: true,
  });
  console.info("Listenting on SEE", eventSource);
  eventSource.onmessage = (event) => {
    const result = callback({
      ...event,
      data: JSON.parse(event.data)
    });
    if (result?.cancel) {
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
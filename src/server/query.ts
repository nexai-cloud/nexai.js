
export const sendAiChat = async ({
  nexaiApiUrl,
  message,
  sessionId,
  projectId,
  name,
}: {
  nexaiApiUrl: string;
  message: string,
  sessionId: string,
  projectId: string,
  name: string,
}) => {
  try {

    const apiUrl = `${nexaiApiUrl}/chat/`

    console.log('send', {
      message,
      sessionId,
      projectId,
      name
    })
    
    const resp = await fetch(apiUrl, {
      method: 'POST',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        sessionId,
        projectId,
        name
      })
    });
    console.log('fetch', apiUrl, {
      message,
      sessionId,
      projectId,
      name
    })
    if (resp.ok) {
      const data = await resp.json();
      // mistral ai responds with full prompt
      // data.response[0] = data.response[0].split("\n\n").pop()
      console.log(data);
      return data
    } else {
      console.error('HTTP Error:', resp.status);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
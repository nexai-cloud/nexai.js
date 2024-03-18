import { getEnv } from "~/lib/env";

const apiBase = getEnv('NEXAI_API_URL')

export const sendAiChat = async ({
  message,
  sessionId,
  projectId,
  name,
}: {
  message: string,
  sessionId: string,
  projectId: string,
  name: string,
}) => {
  try {

    const apiUrl = `${apiBase}/${projectId}/chat`

    console.log('send', {
      message,
      sessionId,
      projectId,
      name
    })
    

    const resp = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        session_id: sessionId,
        app_id: projectId
      })
    });
    console.log('fetch', apiUrl, {
      message,
      session_id: sessionId
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
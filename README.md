# Nexai AI Support Chat Bubble

The Nexai AI Support Chat Bubble is a React component designed to facilitate AI-powered support chat for any website. 

## Setup

Log into https://nexai.site and create a new project. Add your website to the project then use the API key from the project settings.

## Compatibility

It is compatible with both CommonJS (CJS) and ECMAScript Modules (ESM) systems. It can run on the browser or server side nodejs or deno.

### Installation

```sh
npm install nexai-ai-support-chat-bubble
```

### Basic Usage

```js
import { NexaiChatBubble } from 'nexai-ai-support-chat-bubble';

export const App = () => {
  return <NexaiChatBubble nexaiApiKey="your-api-key" />;
};
```

### Development Usage

```sh
git clone https://github.com/nexai-cloud/support-chat-bubble
cd support-chat-bubble
npm install
npm run dev
```

### Props

```ts
export type NexaiChatBubbleProps = {
  width?: number;
  nexaiApiKey: string;
  nexaiIoUrl?: string;
  nexaiAssetsUrl?: string;
  aiName?: string;
  aiAvatarUrl?: string;
  chatSuggests?: string[];
  projectName?: string;
  inputPlaceholder?: string;
}
```

### React Example with all props

```js
import { NexaiChatBubble } from 'nexai-ai-support-chat-bubble';

export const App = () => {
  return (
    <NexaiChatBubble 
      nexaiApiKey="your-api-key"
      width={300}
      nexaiIoUrl="https://io.nexai.site"
      nexaiAssetsUrl="https://nexai.site"
      aiName="Your Bot Name"
      aiAvatarUrl="https://your.site/avatar.png"
      chatSuggests={[
        "Hello|How do I use it?", 
        "Help me login|Setup account", 
        "I'm happy|I need a human"
      ]}
      projectName="Your Project Name"
      inputPlaceholder="Type your message..."
    />
  );
};
```

### Key Components:

1. **Chat Bubble Interface (`./src/chat-bubble`)**: This is the frontend component that users interact with. It provides a user-friendly interface for sending messages and receiving responses from the AI.

2. **Server (`server.js`)**: The server component is built on Express.js and utilizes Socket.IO for real-time, bidirectional communication between the client and server. It handles incoming chat messages from the chat bubble interface, processes them, and sends them to the AI service for response generation.

3. **AI Communication (`sendChatToAi` function)**: This function is responsible for sending user messages to the AI service and retrieving AI-generated responses. It constructs a POST request with the user's message and other relevant information, sends it to the configured AI API endpoint, and processes the response.

4. **Configuration (`config.js`)**: The configuration file contains essential settings for the application, including the AI API URL. This allows for easy customization and integration with different AI services.

5. **Utilities (`utils.js`)**: This file includes utility functions that support the application's functionality, such as generating unique session keys for chat sessions.

### How It Works:

- The user interacts with the chat bubble interface to send a message.
- The message is transmitted to the server via a WebSocket connection established by Socket.IO.
- The server receives the message and uses the `sendChatToAi` function to forward the message to the AI service.
- The AI service processes the message and returns a response.
- The server then sends the AI-generated response back to the chat bubble interface, where it is displayed to the user.

This architecture allows for real-time communication with AI-powered support services, providing users with quick and efficient assistance.

### Compatibility:

- The Nexai AI Support Chat Bubble supports both CommonJS and ECMAScript Modules, making it versatile for integration into various JavaScript projects.
- It is designed to be deployed on server environments that support Node.js, leveraging Express.js and Socket.IO for backend functionality.

By integrating the Nexai AI Support Chat Bubble into your application, you can enhance user experience by providing instant AI-powered support and assistance.


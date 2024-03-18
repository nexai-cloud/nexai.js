export type ChatThread = {
  uid: string;
  hide: boolean;
  name: string;
  userUid: string;
  date: Date;
  messages: ChatMessage[];
  avatar: JSX.Element;
}

export type ChatUser = {
  name: string;
  userUid: string;
  avatar: JSX.Element;
}

export type ChatMessage = {
  message: React.ReactNode;
  sources?: string[];
}
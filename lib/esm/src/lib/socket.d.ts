import io from 'socket.io-client';
export declare const getSessionSocket: ({ sessionKey, ioUrl }: {
    sessionKey: string;
    ioUrl: string;
}) => ReturnType<typeof io>;
export declare const getProjectSocket: ({ projectId, ioUrl }: {
    projectId: string;
    ioUrl?: string | undefined;
}) => ReturnType<typeof io>;

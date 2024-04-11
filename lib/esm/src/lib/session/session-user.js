export const getChatUser = (session) => {
    const { name, sessionId, avatarUrl, email } = session;
    return {
        name,
        userUid: sessionId,
        avatarUrl,
        email
    };
};

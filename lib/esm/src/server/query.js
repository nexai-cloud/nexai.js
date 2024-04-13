var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const sendAiChat = (_a) => __awaiter(void 0, [_a], void 0, function* ({ nexaiApiUrl, message, sessionId, projectId, name, }) {
    try {
        const apiUrl = `${nexaiApiUrl}/chat/`;
        console.log('send', {
            message,
            sessionId,
            projectId,
            name
        });
        const resp = yield fetch(apiUrl, {
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
        });
        if (resp.ok) {
            const data = yield resp.json();
            // mistral ai responds with full prompt
            // data.response[0] = data.response[0].split("\n\n").pop()
            console.log(data);
            return data;
        }
        else {
            console.error('HTTP Error:', resp.status);
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
});

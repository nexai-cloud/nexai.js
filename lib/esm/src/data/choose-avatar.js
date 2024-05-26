import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Input } from "../components/ui/input";
import { getAvatarsList } from "../lib/avatars/avatars-list";
import { cn } from "../lib/utils";
export const ChooseAvatar = observer(({ chatSession, nexaiAssetsUrl }) => {
    const avatarsList = getAvatarsList(nexaiAssetsUrl);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isNameValid, setIsNameValid] = useState(true);
    const avatarUrl = chatSession.avatarUrl;
    const onSelectAvatar = (avatar) => {
        console.log('onSelectAvatar', { avatar });
        chatSession.setProps(Object.assign(Object.assign({}, chatSession), { avatarUrl: avatar.path }));
        chatSession.save();
    };
    const onChangeName = (name) => {
        console.log('onChangeName', { name });
        chatSession.setProps(Object.assign(Object.assign({}, chatSession), { name }));
        chatSession.save();
    };
    const onChangeEmail = (email) => {
        console.log('onChangeEmail', { email });
        chatSession.setProps(Object.assign(Object.assign({}, chatSession), { email }));
        chatSession.save();
    };
    const validateEmail = (email) => {
        const emailRegex = /^[^@\s]+@[^@\s.]+\.[^@\s.]+$/;
        return emailRegex.test(email);
    };
    const onBlurEmail = () => {
        var _a;
        if (((_a = chatSession.email) === null || _a === void 0 ? void 0 : _a.length) > 3) {
            setIsEmailValid(validateEmail(chatSession.email));
        }
    };
    const onBlurName = () => {
        var _a;
        setIsNameValid(((_a = chatSession.name) === null || _a === void 0 ? void 0 : _a.length) > 0);
    };
    console.log('choose-avatar', { avatarUrl });
    return (_jsxs("div", { children: [_jsx("h3", { className: "font-bold text-primary pt-4 pb-2 text-sm", children: "You may choose a profile" }), _jsx("div", { className: 'flex gap-4 flex-wrap py-4 px-2', children: avatarsList.map((avatar, index) => (_jsx("button", { className: cn("rounded-full border-2 shadow-lg", avatarUrl === avatar.path
                        ? "border-blue-500"
                        : "border-transparent"), onClick: () => onSelectAvatar(avatar), children: _jsx("img", { src: avatar.path, alt: avatar.name, className: "w-10 h-10" }) }, index))) }), _jsx("div", { className: "flex p-2", children: _jsx(Input, { value: chatSession.name, onChange: (e) => onChangeName(e.target.value), placeholder: "Enter your name", className: cn("w-full bg-white text-slate-700", !isNameValid && "border-red-500"), onBlur: () => onBlurName() }) }), _jsx("div", { className: "flex p-2", children: _jsx(Input, { value: chatSession.email, onChange: (e) => onChangeEmail(e.target.value), placeholder: "Enter your email", className: cn("w-full bg-white text-slate-700", !isEmailValid && "border-red-500"), type: "email", onBlur: () => onBlurEmail() }) })] }));
});

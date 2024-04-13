"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChooseAvatar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const mobx_react_lite_1 = require("mobx-react-lite");
const react_1 = require("react");
const input_1 = require("../components/ui/input");
const avatars_list_1 = require("../lib/avatars/avatars-list");
const utils_1 = require("../lib/utils");
exports.ChooseAvatar = (0, mobx_react_lite_1.observer)(({ chatSession }) => {
    const [isEmailValid, setIsEmailValid] = (0, react_1.useState)(true);
    const [isNameValid, setIsNameValid] = (0, react_1.useState)(true);
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
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-bold pt-4 pb-2 text-sm text-muted", children: "You may choose a profile" }), (0, jsx_runtime_1.jsx)("div", { className: 'flex gap-4 flex-wrap py-4 px-2', children: avatars_list_1.avatarsList.map((avatar, index) => ((0, jsx_runtime_1.jsx)("button", { className: (0, utils_1.cn)("rounded-full border-2 shadow-lg", avatarUrl === avatar.path
                        ? "border-blue-500"
                        : "border-transparent"), onClick: () => onSelectAvatar(avatar), children: (0, jsx_runtime_1.jsx)("img", { src: avatar.path, alt: avatar.name, className: "w-10 h-10" }) }, index))) }), (0, jsx_runtime_1.jsx)("div", { className: "flex p-2", children: (0, jsx_runtime_1.jsx)(input_1.Input, { value: chatSession.name, onChange: (e) => onChangeName(e.target.value), placeholder: "Enter your name", className: (0, utils_1.cn)("w-full bg-white text-slate-700", !isNameValid && "border-red-500"), onBlur: () => onBlurName() }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex p-2", children: (0, jsx_runtime_1.jsx)(input_1.Input, { value: chatSession.email, onChange: (e) => onChangeEmail(e.target.value), placeholder: "Enter your email", className: (0, utils_1.cn)("w-full bg-white text-slate-700", !isEmailValid && "border-red-500"), type: "email", onBlur: () => onBlurEmail() }) })] }));
});

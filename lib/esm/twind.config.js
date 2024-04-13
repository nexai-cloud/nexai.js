import { defineConfig } from "@twind/core";
import presetTailwind from "@twind/preset-tailwind";
import presetAutoprefix from "@twind/preset-autoprefix";
const customStyles = {
    ".nexai-chat-bubble": {
        display: "flex",
    },
    ".bubble-thread-box::-webkit-scrollbar": {
        display: "none",
    },
    ".bubble-thread-box": {
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
        "max-height": "calc(100vh - 182px)",
    },
    ".nexai-chat-bubble .chat-thread:first-child": {
        "margin-top": "0",
    },
    ".tri-left": {
        position: "absolute",
        bottom: "0",
        left: "0",
    },
    ".tri-left.left-bottom:before": {
        content: "''",
        position: "absolute",
        left: "-1px",
        bottom: "12px",
        width: "0",
        height: "0",
        border: "18px solid transparent",
        "border-right-color": "#fff",
        "border-left": "0",
        "margin-top": "-18px",
        "margin-left": "-18px",
        "z-index": "1000",
    },
    ".tri-left.left-bottom:after": {
        content: "''",
        position: "absolute",
        left: "-1px",
        bottom: "10px",
        width: "0",
        height: "0",
        border: "20px solid transparent",
        "border-right-color": "#e2e8f0",
        "border-left": "0",
        "margin-top": "-20px",
        "margin-left": "-20px",
    },
    ".nexai-chat-bubble code": {
        padding: "5px 8px 5px 8px",
        border: "1px solid #e2e8f0",
        "box-shadow": "0 0 5px #e2e8f0",
        margin: "5px",
        background: "#f7f9fb",
        display: "block",
        "border-radius": "8px",
        "text-overflow": "ellipsis",
        "overflow-x": "hidden",
        "overflow-y": "auto",
        "max-height": "500px",
        "font-size": "12px",
    },
    ".nexai-chat-bubble .prism-code": {
        padding: "5px 8px 5px 8px",
        "box-shadow": "0 0 5px #e2e8f0",
        margin: "5px",
        display: "block",
        "border-radius": "8px",
        "text-overflow": "ellipsis",
        "overflow-x": "hidden",
        "overflow-y": "auto",
        "max-height": "500px",
        "font-size": "12px",
    },
    "#nexai-audio-wave": {
        width: "80px",
        height: "80px",
    },
};
export default defineConfig({
    // Add your custom CSS rules to the theme property
    theme: {
        extend: {
            styles: Object.assign({}, customStyles),
        },
    },
    presets: [presetAutoprefix(), presetTailwind( /* options */)]
    /* config */
});

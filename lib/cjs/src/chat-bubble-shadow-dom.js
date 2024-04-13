"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NexaiChatBubbleShadowDom = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const chat_bubble_1 = require("./chat-bubble");
const client_1 = require("react-dom/client");
const core_1 = require("@twind/core");
// support shadowroot.adoptedStyleSheets in all browsers
require("construct-style-sheets-polyfill");
// mention right path for twind.config.js
const twind_config_1 = __importDefault(require("../twind.config"));
// Create separate CSSStyleSheet
const stylesheet = new CSSStyleSheet();
stylesheet.replace(`.nexai-chat-bubble {
  display: flex;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.bubble-thread-box::-webkit-scrollbar {
  display: none;
}
.bubble-thread-box {
  -ms-overflow-style: none;  
  scrollbar-width: none;
} 

.bubble-thread-box {
  max-height: calc(100vh - 182px);
  /* mask-image: linear-gradient(to top,white 60%, transparent); */
}

.nexai-chat-bubble .chat-thread:first-child {
  margin-top: 0;
}

/* .nexai-chat-bubble .chat-thread {
  background-color: #f1f5f9;
}

.nexai-chat-bubble .chat-thread.thread-user-bot {
  background-color: #fff;
}

.nexai-chat-bubble .chat-thread .tri-left.left-bottom:before{
	border-right-color: #f1f5f9;
}

.nexai-chat-bubble .chat-thread.thread-user-bot .tri-left.left-bottom:before{
	border-right-color: #fff;
} */

.tri-left {
  position: absolute;
  bottom: 0;
  left: 0;
}
.tri-left.left-bottom:before{
	content: '';
	position: absolute;
	left: -1px;
	bottom: 12px;
	width: 0;
	height: 0;
	border: 18px solid transparent;
	border-right-color: #fff;
	border-left: 0;
	margin-top: -18px;
	margin-left: -18px;
  z-index: 1000;
}
.tri-left.left-bottom:after{
	content: '';
	position: absolute;
	left: -1px;
	bottom: 10px;
	width: 0;
	height: 0;
	border: 20px solid transparent;
	border-right-color: #e2e8f0;
	border-left: 0;
	margin-top: -20px;
	margin-left: -20px;
}

.nexai-chat-bubble code {
  padding: 5px 8px 5px 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 0 5px #e2e8f0;
  margin: 5px;
  background: #f7f9fb;
  display: block;
  border-radius: 8px;
  text-overflow: ellipsis;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 500px;
  font-size: 12px;
}

.nexai-chat-bubble .prism-code {
  padding: 5px 8px 5px 8px;
  box-shadow: 0 0 5px #e2e8f0;
  margin: 5px;
  display: block;
  border-radius: 8px;
  text-overflow: ellipsis;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 500px;
  font-size: 12px;
}

#nexai-audio-wave {
  width: 80px;
  height: 80px;
}

.typing-busy-indicator {
  display: inline-block;
}

.typing-text {
  display: inline-block;
  vertical-align: middle;
  animation: blink 1s infinite;
}

@keyframes blink {
  0% {
    opacity: 0.2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}

.dot-1, .dot-2, .dot-3 {
  display: inline-block;
  width: 4px;
  height: 4px;
  background-color: #fff;
  border-radius: 50%;
  margin-left: 4px;
  animation: dot-animation 1.5s infinite;
}

.dot-2 {
  animation-delay: 0.5s;
}

.dot-3 {
  animation-delay: 1s;
}

@keyframes dot-animation {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(3px);
  }
}

.code-block .code-copy {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.code-block:hover .code-copy {
  opacity: 1;
  pointer-events: all;
}
`);
const sheet = (0, core_1.cssom)(stylesheet);
// Use sheet and config to create an twind instance. `tw` will
// append the right CSS to our custom stylesheet.
const tw = (0, core_1.twind)(twind_config_1.default, sheet);
const NexaiChatBubbleShadowDom = (props) => {
    const shadowContainerRef = (0, react_1.useRef)(null);
    const addTwStyles = (shadowRoot) => {
        // link stylesheet
        shadowRoot.adoptedStyleSheets = [sheet.target];
        (0, core_1.observe)(tw, shadowRoot);
    };
    (0, react_1.useEffect)(() => {
        const shadowContainer = shadowContainerRef.current;
        if (shadowContainer && !shadowContainer.shadowRoot) {
            const shadowRoot = shadowContainer.attachShadow({ mode: 'open' });
            const container = document.createElement('div');
            shadowRoot.appendChild(container);
            addTwStyles(shadowRoot);
            // Render the NexaiChatBubble component inside the shadow root
            const root = (0, client_1.createRoot)(container);
            root.render((0, jsx_runtime_1.jsx)(chat_bubble_1.NexaiChatBubble, Object.assign({}, props)));
            // Cleanup when the component unmounts
            // return () => {
            //   root.unmount();
            // };
        }
    }, [props]);
    return ((0, jsx_runtime_1.jsx)("div", { ref: shadowContainerRef, id: "nexai-shadow" }));
};
exports.NexaiChatBubbleShadowDom = NexaiChatBubbleShadowDom;

"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTwStyles = void 0;
const core_1 = require("@twind/core");
// support shadowroot.adoptedStyleSheets in all browsers
require("construct-style-sheets-polyfill");
// mention right path for twind.config.js
const twind_config_1 = __importDefault(require("../../../twind.config"));
const styles_1 = require("./styles");
const addTwStyles = (shadowRoot) => {
    if (typeof CSSStyleSheet === 'undefined') {
        return;
    }
    // Create separate CSSStyleSheet
    const stylesheet = new CSSStyleSheet();
    // add chat styles
    stylesheet.replace(styles_1.styles);
    const sheet = (0, core_1.cssom)(stylesheet);
    // Use sheet and config to create an twind instance. `tw` will
    // append the right CSS to our custom stylesheet.
    const tw = (0, core_1.twind)(twind_config_1.default, sheet);
    // link stylesheet
    shadowRoot.adoptedStyleSheets = [sheet.target];
    (0, core_1.observe)(tw, shadowRoot);
};
exports.addTwStyles = addTwStyles;

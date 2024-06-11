"use strict";
"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const addTwStyles = (shadowRoot, styles) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof CSSStyleSheet === 'undefined') {
        return;
    }
    // Create separate CSSStyleSheet
    const stylesheet = new CSSStyleSheet();
    // add chat styles
    yield stylesheet.replace(styles);
    const sheet = (0, core_1.cssom)(stylesheet);
    // Use sheet and config to create an twind instance. `tw` will
    // append the right CSS to our custom stylesheet.
    const tw = (0, core_1.twind)(twind_config_1.default, sheet);
    // link stylesheet
    shadowRoot.adoptedStyleSheets = [sheet.target];
    (0, core_1.observe)(tw, shadowRoot);
});
exports.addTwStyles = addTwStyles;

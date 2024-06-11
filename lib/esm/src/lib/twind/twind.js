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
import { twind, cssom, observe } from "@twind/core";
// support shadowroot.adoptedStyleSheets in all browsers
import "construct-style-sheets-polyfill";
// mention right path for twind.config.js
import config from "../../../twind.config";
export const addTwStyles = (shadowRoot, styles) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof CSSStyleSheet === 'undefined') {
        return;
    }
    // Create separate CSSStyleSheet
    const stylesheet = new CSSStyleSheet();
    // add chat styles
    yield stylesheet.replace(styles);
    const sheet = cssom(stylesheet);
    // Use sheet and config to create an twind instance. `tw` will
    // append the right CSS to our custom stylesheet.
    const tw = twind(config, sheet);
    // link stylesheet
    shadowRoot.adoptedStyleSheets = [sheet.target];
    observe(tw, shadowRoot);
});

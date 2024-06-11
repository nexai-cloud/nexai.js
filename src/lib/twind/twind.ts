"use client"

import { twind, cssom, observe } from "@twind/core";
// support shadowroot.adoptedStyleSheets in all browsers
import "construct-style-sheets-polyfill";
// mention right path for twind.config.js
import config from "../../../twind.config";

export const addTwStyles = async (shadowRoot: ShadowRoot, styles: string) => {

  if (typeof CSSStyleSheet === 'undefined') {
    return 
  }

  // Create separate CSSStyleSheet
  const stylesheet = new CSSStyleSheet()

  // add chat styles
  await stylesheet.replace(styles)

  const sheet = cssom(stylesheet);

  // Use sheet and config to create an twind instance. `tw` will
  // append the right CSS to our custom stylesheet.
  const tw = twind(config, sheet);

  // link stylesheet
  shadowRoot.adoptedStyleSheets = [sheet.target];
    observe(tw, shadowRoot);
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.text2Words = void 0;
const stopwords_1 = require("./stopwords");
// import jaroWinkler from 'talisman/metrics/jaro-winkler';
const text2Words = (text) => {
    const tokens = text.split(' ');
    const filteredTokens = tokens.filter(token => !stopwords_1.stopwords.includes(token));
    return filteredTokens;
};
exports.text2Words = text2Words;

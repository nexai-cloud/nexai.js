"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
const meta = import.meta;
const getEnv = (name) => {
    return typeof process !== 'undefined'
        ? process.env[name]
        : meta.env[name];
};
exports.getEnv = getEnv;

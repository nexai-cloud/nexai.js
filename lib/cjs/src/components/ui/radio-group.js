"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioGroupItem = exports.RadioGroup = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const RadioGroupPrimitive = __importStar(require("@radix-ui/react-radio-group"));
const lucide_react_1 = require("lucide-react");
const utils_1 = require("../../lib/utils");
const RadioGroup = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(RadioGroupPrimitive.Root, Object.assign({ className: (0, utils_1.cn)("grid gap-2", className) }, props, { ref: ref })));
});
exports.RadioGroup = RadioGroup;
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
const RadioGroupItem = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(RadioGroupPrimitive.Item, Object.assign({ ref: ref, className: (0, utils_1.cn)("aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className) }, props, { children: (0, jsx_runtime_1.jsx)(RadioGroupPrimitive.Indicator, { className: "flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Circle, { className: "h-2.5 w-2.5 fill-current text-current" }) }) })));
});
exports.RadioGroupItem = RadioGroupItem;
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

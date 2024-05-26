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
exports.ToggleGroupItem = exports.ToggleGroup = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const ToggleGroupPrimitive = __importStar(require("@radix-ui/react-toggle-group"));
const utils_1 = require("../../lib/utils");
const toggle_1 = require("../../components/ui/toggle");
const ToggleGroupContext = React.createContext({
    size: "default",
    variant: "default",
});
const ToggleGroup = React.forwardRef((_a, ref) => {
    var { className, variant, size, children } = _a, props = __rest(_a, ["className", "variant", "size", "children"]);
    return ((0, jsx_runtime_1.jsx)(ToggleGroupPrimitive.Root, Object.assign({ ref: ref, className: (0, utils_1.cn)("flex items-center justify-center gap-1", className) }, props, { children: (0, jsx_runtime_1.jsx)(ToggleGroupContext.Provider, { value: { variant, size }, children: children }) })));
});
exports.ToggleGroup = ToggleGroup;
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;
const ToggleGroupItem = React.forwardRef((_a, ref) => {
    var { className, children, variant, size } = _a, props = __rest(_a, ["className", "children", "variant", "size"]);
    const context = React.useContext(ToggleGroupContext);
    return ((0, jsx_runtime_1.jsx)(ToggleGroupPrimitive.Item, Object.assign({ ref: ref, className: (0, utils_1.cn)((0, toggle_1.toggleVariants)({
            variant: context.variant || variant,
            size: context.size || size,
        }), className) }, props, { children: children })));
});
exports.ToggleGroupItem = ToggleGroupItem;
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

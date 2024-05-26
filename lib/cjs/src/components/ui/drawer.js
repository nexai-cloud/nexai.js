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
exports.DrawerDescription = exports.DrawerTitle = exports.DrawerFooter = exports.DrawerHeader = exports.DrawerContent = exports.DrawerClose = exports.DrawerTrigger = exports.DrawerOverlay = exports.DrawerPortal = exports.Drawer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const vaul_1 = require("vaul");
const utils_1 = require("../../lib/utils");
const Drawer = (_a) => {
    var { shouldScaleBackground = true } = _a, props = __rest(_a, ["shouldScaleBackground"]);
    return ((0, jsx_runtime_1.jsx)(vaul_1.Drawer.Root, Object.assign({ shouldScaleBackground: shouldScaleBackground }, props)));
};
exports.Drawer = Drawer;
Drawer.displayName = "Drawer";
const DrawerTrigger = vaul_1.Drawer.Trigger;
exports.DrawerTrigger = DrawerTrigger;
const DrawerPortal = vaul_1.Drawer.Portal;
exports.DrawerPortal = DrawerPortal;
const DrawerClose = vaul_1.Drawer.Close;
exports.DrawerClose = DrawerClose;
const DrawerOverlay = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(vaul_1.Drawer.Overlay, Object.assign({ ref: ref, className: (0, utils_1.cn)("fixed inset-0 z-50 bg-black/80", className) }, props)));
});
exports.DrawerOverlay = DrawerOverlay;
DrawerOverlay.displayName = vaul_1.Drawer.Overlay.displayName;
const DrawerContent = React.forwardRef((_a, ref) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return ((0, jsx_runtime_1.jsxs)(DrawerPortal, { children: [(0, jsx_runtime_1.jsx)(DrawerOverlay, {}), (0, jsx_runtime_1.jsxs)(vaul_1.Drawer.Content, Object.assign({ ref: ref, className: (0, utils_1.cn)("fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background", className) }, props, { children: [(0, jsx_runtime_1.jsx)("div", { className: "mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" }), children] }))] }));
});
exports.DrawerContent = DrawerContent;
DrawerContent.displayName = "DrawerContent";
const DrawerHeader = (_a) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: (0, utils_1.cn)("grid gap-1.5 p-4 text-center sm:text-left", className) }, props)));
};
exports.DrawerHeader = DrawerHeader;
DrawerHeader.displayName = "DrawerHeader";
const DrawerFooter = (_a) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: (0, utils_1.cn)("mt-auto flex flex-col gap-2 p-4", className) }, props)));
};
exports.DrawerFooter = DrawerFooter;
DrawerFooter.displayName = "DrawerFooter";
const DrawerTitle = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(vaul_1.Drawer.Title, Object.assign({ ref: ref, className: (0, utils_1.cn)("text-lg font-semibold leading-none tracking-tight", className) }, props)));
});
exports.DrawerTitle = DrawerTitle;
DrawerTitle.displayName = vaul_1.Drawer.Title.displayName;
const DrawerDescription = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(vaul_1.Drawer.Description, Object.assign({ ref: ref, className: (0, utils_1.cn)("text-sm text-muted-foreground", className) }, props)));
});
exports.DrawerDescription = DrawerDescription;
DrawerDescription.displayName = vaul_1.Drawer.Description.displayName;

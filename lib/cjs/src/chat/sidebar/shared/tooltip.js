"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TooltipWrap = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tooltip_1 = require("../../../components/ui/tooltip");
const TooltipWrap = ({ children, tooltip, className = '' }) => ((0, jsx_runtime_1.jsx)(tooltip_1.TooltipProvider, { delayDuration: 100, children: (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, { children: [(0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, { children: children }), (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, { className: className, children: tooltip })] }) }));
exports.TooltipWrap = TooltipWrap;

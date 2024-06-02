import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/ui/tooltip";
export const TooltipWrap = ({ children, tooltip, className = '' }) => (_jsx(TooltipProvider, { delayDuration: 100, children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { children: children }), _jsx(TooltipContent, { className: className, children: tooltip })] }) }));

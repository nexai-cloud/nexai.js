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
import { jsx as _jsx } from "react/jsx-runtime";
import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";
import { cn } from "@/lib/utils";
const ResizablePanelGroup = (_a) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(ResizablePrimitive.PanelGroup, Object.assign({ className: cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className) }, props)));
};
const ResizablePanel = ResizablePrimitive.Panel;
const ResizableHandle = (_a) => {
    var { withHandle, className } = _a, props = __rest(_a, ["withHandle", "className"]);
    return (_jsx(ResizablePrimitive.PanelResizeHandle, Object.assign({ className: cn("relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90", className) }, props, { children: withHandle && (_jsx("div", { className: "z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border", children: _jsx(GripVertical, { className: "h-2.5 w-2.5" }) })) })));
};
export { ResizablePanelGroup, ResizablePanel, ResizableHandle };

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
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "~/lib/utils";
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(ToastPrimitives.Viewport, Object.assign({ ref: ref, className: cn("fixed top-0 z-[100] mt-16 flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:right-0 sm:flex-col md:max-w-[420px]", className) }, props)));
});
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full", {
    variants: {
        variant: {
            default: "border bg-background",
            destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
const Toast = React.forwardRef((_a, ref) => {
    var { className, variant } = _a, props = __rest(_a, ["className", "variant"]);
    return (_jsx(ToastPrimitives.Root, Object.assign({ ref: ref, className: cn(toastVariants({ variant }), className) }, props)));
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(ToastPrimitives.Action, Object.assign({ ref: ref, className: cn("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive", className) }, props)));
});
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(ToastPrimitives.Close, Object.assign({ ref: ref, className: cn("absolute right-2 top-2 rounded-md p-1 text-foreground/50 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600 lg:opacity-0 lg:group-hover:opacity-100", className), "toast-close": "" }, props, { children: _jsx(X, { className: "h-4 w-4" }) })));
});
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(ToastPrimitives.Title, Object.assign({ ref: ref, className: cn("text-sm font-semibold", className) }, props)));
});
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(ToastPrimitives.Description, Object.assign({ ref: ref, className: cn("text-sm opacity-90", className) }, props)));
});
ToastDescription.displayName = ToastPrimitives.Description.displayName;
export { Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport, };

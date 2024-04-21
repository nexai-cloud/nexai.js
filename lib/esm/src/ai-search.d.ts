import * as React from "react";
import { DialogProps } from "@radix-ui/react-alert-dialog";
import { ButtonProps } from "./components/ui/button";
export type NavItem = {
    title: string;
    summary?: string;
    href?: string;
    external?: true;
    items?: NavItem[];
    icon?: React.ReactNode;
    label?: string;
};
export type AISearchProps = DialogProps & ButtonProps & {
    nexaiApiKey: string;
    onMenuItemSelect?: (navItem: NavItem) => void;
    onMenuItemReadMore: (navItem: NavItem, group: NavItem) => void;
    className?: string;
    placeholder?: string;
    placeholderSmall?: string;
    commandEmpty?: React.ReactNode;
};
export declare function AISearch({ nexaiApiKey, onMenuItemSelect, onMenuItemReadMore, className, commandEmpty, placeholder, placeholderSmall, ...props }: AISearchProps): import("react/jsx-runtime").JSX.Element;

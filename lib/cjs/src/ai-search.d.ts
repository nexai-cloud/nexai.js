import * as React from "react";
import { DialogProps } from "@radix-ui/react-alert-dialog";
import { ButtonProps } from "./components/ui/button";
import { type NavItem } from "./models/flexsearch-model";
export type AISearchProps = DialogProps & ButtonProps & {
    nexaiApiKey: string;
    nexaiApiUrl: string;
    onMenuItemSelect?: (navItem: NavItem) => void;
    onMenuItemReadMore: (navItem: NavItem, group: NavItem) => void;
    className?: string;
    placeholder?: string;
    placeholderSmall?: string;
    commandEmpty?: React.ReactNode;
};
export declare const AISearch: (({ nexaiApiKey, nexaiApiUrl, onMenuItemSelect, onMenuItemReadMore, className, commandEmpty, placeholder, placeholderSmall, ...props }: AISearchProps) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};

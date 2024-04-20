import * as React from "react";
import { DialogProps } from "@radix-ui/react-alert-dialog";
export type NavItem = {
    title: string;
    summary?: string;
    href?: string;
    external?: true;
    items?: NavItem[];
    icon?: React.ReactNode;
    label?: string;
};
export type CommandMenuProps = DialogProps & {
    onMenuItemSelect?: (navItem: NavItem) => void;
    onMenuItemReadMore: (navItem: NavItem, group: NavItem) => void;
    docsNav: NavItem[];
    className?: string;
    placeholder?: string;
    placeholderSmall?: string;
    commandEmpty?: React.ReactNode;
};
export declare function CommandMenu({ onMenuItemSelect, onMenuItemReadMore, docsNav, className, commandEmpty, placeholder, placeholderSmall, ...props }: CommandMenuProps): import("react/jsx-runtime").JSX.Element;

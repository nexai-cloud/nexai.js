import { DialogProps } from "@radix-ui/react-alert-dialog";
import { ButtonProps } from "../../components/ui/button";
import { type NavItem } from "../../models/flexsearch-model";
export type AISearchProps = DialogProps & ButtonProps & {
    nexaiApiKey: string;
    nexaiApiUrl: string;
    input: string;
    onMenuItemSelect: (navItem: NavItem, group: NavItem) => void;
    className?: string;
    showInput?: boolean;
};
export declare const SearchSuggest: (({ nexaiApiKey, nexaiApiUrl, input, onMenuItemSelect, showInput }: AISearchProps) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};

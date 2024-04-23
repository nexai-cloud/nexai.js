/// <reference types="react" />
import { NavItem } from "../../ai-search";
import { IndexSearchResult } from "../../models/flexsearch-model";
export declare const filterFlexsearchResults: (nav: NavItem[], results: IndexSearchResult[]) => ({
    items: NavItem[];
    title: string;
    summary?: string | undefined;
    href?: string | undefined;
    external?: true | undefined;
    icon?: import("react").ReactNode;
    label?: string | undefined;
} | undefined)[];

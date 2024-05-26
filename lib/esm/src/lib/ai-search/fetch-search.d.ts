import { type NavItem } from "~/models/flexsearch-model";
export declare const fetchSearchDocs: ({ nexaiApiKey, nexaiApiUrl }: {
    nexaiApiKey: string;
    nexaiApiUrl: string;
}) => Promise<NavItem[]>;

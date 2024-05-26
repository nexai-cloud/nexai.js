/// <reference types="react" />
import { FetchModel } from "../models/fetch-model";
import Flexsearch from "flexsearch";
import { Model } from "./model";
export type NavItem = {
    title: string;
    summary?: string;
    href?: string;
    external?: true;
    items?: NavItem[];
    icon?: React.ReactNode;
    label?: string;
};
export type SearchResult = {
    field: string;
    result: string[];
};
export type IndexSearchResult = string;
export declare const getNavItemId: (group: NavItem, navItem: NavItem) => string;
export declare class FlexsearchModel extends Model {
    constructor();
    nexaiApiKey: string;
    nexaiApiUrl: string;
    documents: NavItem[];
    documentsState: FetchModel;
    setDocuments(documents: NavItem[]): Promise<void>;
    documentsReady(): Promise<unknown>;
    fetchDocumentsState: FetchModel;
    fetchDocuments(): Promise<unknown>;
    flexsearch: Flexsearch.Index;
    searchState: FetchModel;
    currentQuery: string;
    limit: number;
    results: IndexSearchResult[];
    setResults(results: IndexSearchResult[]): void;
    queryToKeywords(query: string): string;
    search(query: string): Promise<void>;
}
export declare const useFlexsearchModel: ({ nexaiApiKey, nexaiApiUrl }: {
    nexaiApiKey: string;
    nexaiApiUrl: string;
}) => FlexsearchModel;

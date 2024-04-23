import { FetchModel } from "../models/fetch-model";
import Flexsearch from "flexsearch";
import { NavItem } from "../ai-search";
import { Model } from "./model";
export type SearchResult = {
    field: string;
    result: string[];
};
export type IndexSearchResult = string;
export declare const getNavItemId: (group: NavItem, navItem: NavItem) => string;
export declare class FlexsearchModel extends Model {
    constructor();
    nexaiApiKey: string;
    documents: NavItem[];
    documentsState: FetchModel;
    setDocuments(documents: NavItem[]): Promise<void>;
    documentsReady(): Promise<unknown>;
    flexsearch: Flexsearch.Index;
    searchState: FetchModel;
    currentQuery: string;
    limit: number;
    results: IndexSearchResult[];
    setResults(results: IndexSearchResult[]): void;
    search(query: string): Promise<void>;
}
export declare const useFlexsearchModel: ({ nexaiApiKey }: {
    nexaiApiKey: string;
}) => FlexsearchModel;

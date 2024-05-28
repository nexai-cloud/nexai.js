"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
import { 
// Command,
CommandGroup, CommandItem, CommandList,
// CommandSeparator,
 } from "../../components/ui/command";
import { ChevronRight, LucideMessageCircleQuestion, SparklesIcon, ZapIcon } from "lucide-react";
import { useFlexsearchModel } from "../../models/flexsearch-model";
import { filterFlexsearchResults } from "../../lib/ai-search/flexsearch";
import { observer } from "mobx-react-lite";
import { ScrollArea } from "../../components/ui/scroll-area";
export const SearchSuggest = observer(({ nexaiApiKey, nexaiApiUrl, input, onMenuItemSelect, showInput = true }) => {
    const searchModel = useFlexsearchModel({ nexaiApiKey, nexaiApiUrl });
    const docsNav = searchModel.documents;
    React.useEffect(() => {
        if (input) {
            searchModel.search(input);
        }
        else {
            // clear results - remove prev selection not working??
            searchModel.setResults([]);
        }
    }, [input, searchModel]);
    React.useEffect(() => {
        const fetchDocs = () => __awaiter(void 0, void 0, void 0, function* () {
            yield searchModel.fetchDocuments();
        });
        if (!searchModel.fetchDocumentsState.busy && !searchModel.fetchDocumentsState.ok) {
            fetchDocs();
        }
    }, [nexaiApiKey, searchModel]);
    const uniqueNav = docsNav.filter((group, index) => {
        return docsNav.findIndex((nav) => nav.title === group.title) === index;
    });
    const keywords = input.split(' ').filter(i => i);
    const searches = keywords.map(keyword => new RegExp(keyword, 'ig'));
    // use flexsearch index
    const visibleNav = (searches.length === 0)
        ? []
        : filterFlexsearchResults(uniqueNav, searchModel.results);
    const runCommand = React.useCallback((command) => {
        command();
    }, []);
    const onSelect = React.useCallback((navItem) => {
        console.log('onSelect', navItem);
        const group = docsNav.find(nav => { var _a; return (_a = nav.items) === null || _a === void 0 ? void 0 : _a.includes(navItem); });
        runCommand(() => onMenuItemSelect(navItem, group));
    }, [runCommand, onMenuItemSelect, docsNav]);
    if (!input)
        return null;
    return (_jsxs(_Fragment, { children: [_jsx(ScrollArea, { className: cn(!visibleNav.length && 'hidden', 'p-2'), children: _jsxs(CommandList, { className: "overflow-visible", children: [_jsx(CommandGroup, { heading: (_jsx("p", { className: "text-blue-500 text-sm flex", children: 'Suggestions' })), children: _jsxs(CommandItem, { className: cn(!showInput && "hidden", "cursor-pointer group items-center", "aria-selected:bg-blue-100 "), children: [_jsx("div", { className: "mr-2 ml-2 flex h-4 w-4 items-center justify-center", children: _jsx(SparklesIcon, { className: "text-yellow-500 h-3 w-3" }) }), _jsxs("span", { className: "flex items-center text-muted-foreground", children: [input, "..."] }), _jsx("span", { className: "opacity-0 item-arrow ml-auto mr-2 h-6 w-6 items-center justify-center group group-aria-selected:opacity-100", children: _jsx(SparklesIcon, { className: "text-blue-500 h-6 w-6 mb-2" }) })] }) }), visibleNav.map((group) => {
                            var _a;
                            return group && (_jsx(CommandGroup, { heading: (_jsx("p", { className: "text-blue-500", children: group.title })), children: (_a = group.items) === null || _a === void 0 ? void 0 : _a.map((navItem) => (_jsxs(CommandItem, { value: navItem.title, onSelect: () => onSelect(navItem), className: cn("cursor-pointer group items-center", "aria-selected:bg-blue-100 "), children: [_jsx("div", { className: "mr-2 ml-2 flex h-4 w-4 items-center justify-center", children: group.icon ? (_jsx("span", { className: "text-blue-500", children: group.icon })) : (_jsx(LucideMessageCircleQuestion, { className: "text-blue-500 h-5" })) }), _jsx("span", { className: "", children: navItem.title }), _jsx("span", { className: "opacity-0 item-arrow ml-auto mr-2 h-6 w-6 items-center justify-center group group-aria-selected:opacity-100", children: _jsx(ChevronRight, { className: "text-blue-500 h-6 w-6 mb-2" }) })] }, navItem.href))) }, group.title));
                        })] }) }), _jsx("div", { className: cn("flex items-center px-3", visibleNav.length && 'border-t'), children: _jsxs("a", { className: "flex gap-1 items-center p-2 ml-auto text-xs font-medium text-muted-foreground", href: "https://nexai.site", target: "_blank", children: [_jsx("span", { children: 'AI Search ' }), _jsx(ZapIcon, { className: "text-orange-500", size: 10 }), _jsx("span", { className: "font-bold bg-gradient-to-r from-violet-500 to-blue-500 text-transparent bg-clip-text", children: "Nexai" })] }) })] }));
});

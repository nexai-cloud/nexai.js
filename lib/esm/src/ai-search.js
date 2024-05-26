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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { CircleIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CommandDialog, CommandEmpty, CommandGroup, 
// CommandInput,
CommandItem, CommandList, CommandSeparator, } from "@/components/ui/command";
import { ArrowRightCircleIcon, EyeIcon, SearchIcon, ZapIcon } from "lucide-react";
import { fetchSearchDocs } from "./lib/ai-search/fetch-search";
import { useFlexsearchModel } from "./models/flexsearch-model";
import { keywordSearch } from "./lib/ai-search/keyword-search";
import { filterFlexsearchResults } from "./lib/ai-search/flexsearch";
import { observer } from "mobx-react-lite";
export const AISearch = observer((_a) => {
    var { nexaiApiKey, onMenuItemSelect, onMenuItemReadMore, className, commandEmpty = 'No results found.', placeholder = 'Search documentation...', placeholderSmall = 'Search...' } = _a, props = __rest(_a, ["nexaiApiKey", "onMenuItemSelect", "onMenuItemReadMore", "className", "commandEmpty", "placeholder", "placeholderSmall"]);
    const [open, setOpen] = React.useState(false);
    const [input, setInput] = React.useState('');
    const [selectedNavItem, setSelectedNavItem] = React.useState();
    const searchModel = useFlexsearchModel({ nexaiApiKey });
    const [docsNav, setDocsNav] = React.useState([]);
    const fetched = React.useRef(false);
    React.useEffect(() => {
        const fetchDocs = () => __awaiter(void 0, void 0, void 0, function* () {
            const docs = yield fetchSearchDocs(nexaiApiKey);
            setDocsNav(docs);
            searchModel.setDocuments(docs);
        });
        if (!fetched.current) {
            fetchDocs();
            fetched.current = true;
        }
    }, [docsNav, nexaiApiKey, searchModel]);
    const uniqueNav = docsNav.filter((group, index) => {
        return docsNav.findIndex((nav) => nav.title === group.title) === index;
    });
    const keywords = input.split(' ').filter(i => i);
    const searches = keywords.map(keyword => new RegExp(keyword, 'ig'));
    // use flexsearch index
    const visibleNav = !searches.length
        ? uniqueNav
        : filterFlexsearchResults(uniqueNav, searchModel.results);
    // augment with OR keyword search
    if (!visibleNav.length) {
        visibleNav.push(...keywordSearch(input, uniqueNav));
    }
    React.useEffect(() => {
        const down = (e) => {
            if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
                if ((e.target instanceof HTMLElement && e.target.isContentEditable) ||
                    e.target instanceof HTMLInputElement ||
                    e.target instanceof HTMLTextAreaElement ||
                    e.target instanceof HTMLSelectElement) {
                    return;
                }
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);
    const runCommand = React.useCallback((command) => {
        setOpen(false);
        command();
    }, []);
    const onSelect = React.useCallback((navItem) => {
        // console.log('onSelect', navItem)
        if (navItem === selectedNavItem) {
            const group = docsNav.find(nav => { var _a; return (_a = nav.items) === null || _a === void 0 ? void 0 : _a.includes(selectedNavItem); });
            runCommand(() => onMenuItemReadMore(navItem, group));
        }
        if (onMenuItemSelect) {
            runCommand(() => onMenuItemSelect(navItem));
        }
        else {
            setSelectedNavItem(navItem);
        }
    }, [runCommand, onMenuItemSelect, docsNav, onMenuItemReadMore, selectedNavItem]);
    const onReadMore = React.useCallback((navItem, group) => {
        runCommand(() => onMenuItemReadMore(navItem, group));
    }, [runCommand, onMenuItemReadMore]);
    const onSearchInput = (input) => __awaiter(void 0, void 0, void 0, function* () {
        setInput(input);
        // console.log('searchModel', searchModel)
        yield searchModel.search(input);
        // console.log('results', searchModel.results, searchModel)
    });
    return (_jsxs(_Fragment, { children: [_jsxs(Button, Object.assign({ variant: "outline", className: cn("flex group h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none", className), onClick: () => setOpen(true) }, props, { children: [_jsx(SearchIcon, { className: "group-hover:text-blue-500 mr-2 h-4 w-4 shrink-0" }), _jsx("span", { className: "hidden lg:inline-flex", children: placeholder }), _jsx("span", { className: "inline-flex lg:hidden", children: placeholderSmall }), _jsxs("kbd", { className: "ml-auto group-hover:text-blue-500 pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex", children: [_jsx("span", { className: "text-xs", children: "\u2318" }), "K"] })] })), _jsxs(CommandDialog, { open: open, onOpenChange: setOpen, children: [_jsxs("div", { className: "flex items-center border-b px-3", children: [_jsx(SearchIcon, { className: "text-blue-500 mr-2 h-4 w-4 shrink-0" }), _jsx("input", { value: input, onChange: e => onSearchInput(e.target.value), placeholder: placeholder, className: "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50" })] }), _jsxs(CommandList, { children: [_jsx(CommandEmpty, { children: commandEmpty }), visibleNav.map((group) => {
                                var _a;
                                return group && (_jsx(CommandGroup, { heading: (_jsx("p", { className: "text-blue-500", children: group.title })), children: (_a = group.items) === null || _a === void 0 ? void 0 : _a.map((navItem) => (_jsxs("div", { children: [_jsxs(CommandItem, { value: navItem.title, onSelect: () => onSelect(navItem), className: cn("cursor-pointer group", selectedNavItem === navItem
                                                    ? "border border-blue-500 border-b-transparent rounded-b-none bg-gradient-to-r from-blue-100 via-violet-100 to-blue-100"
                                                    : "aria-selected:bg-gradient-to-r from-blue-50 via-violet-50 to-blue-50 "), children: [_jsx("div", { className: "mr-2 ml-2 flex h-4 w-4 items-center justify-center", children: group.icon ? (_jsx("span", { className: "text-blue-500", children: group.icon })) : (_jsx(CircleIcon, { className: "text-blue-500 h-3 w-3" })) }), _jsx("span", { className: "", children: navItem.title }), _jsx("span", { className: "opacity-0 item-arrow ml-auto mr-2 h-4 w-4 items-center justify-center group group-aria-selected:opacity-100", children: _jsx(ArrowRightCircleIcon, { className: "text-blue-500 h-3 w-3" }) })] }), selectedNavItem === navItem ? (_jsxs("div", { className: "rounded rounded-t-none border border-blue-500 bg-blue-50 shadow text-sm p-4 flex align-middle items-center", children: [_jsx("div", { className: "mr-2 ml-2 flex h-4 w-4 items-center justify-center" }), _jsxs("p", { children: [navItem.summary, _jsxs(Button, { className: "flex gap-2 h-7 m-2 ml-auto bg-blue-500", onClick: () => onReadMore(navItem, group), children: [_jsx("span", { children: "More" }), _jsx(EyeIcon, { className: "h-5 w-5" })] })] })] })) : null] }, navItem.href))) }, group.title));
                            }), _jsx(CommandSeparator, {})] }), _jsx("div", { className: "flex items-center border-t px-3", children: _jsxs("a", { className: "flex gap-1 items-center p-2 ml-auto text-xs font-medium text-muted-foreground", href: "https://nexai.site", target: "_blank", children: [_jsx("span", { children: 'AI Search ' }), _jsx(ZapIcon, { className: "text-orange-500", size: 10 }), _jsx("span", { className: "font-bold bg-gradient-to-r from-violet-500 to-blue-500 text-transparent bg-clip-text", children: "Nexai" })] }) })] })] }));
});

"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AISearch = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_icons_1 = require("@radix-ui/react-icons");
const utils_1 = require("./lib/utils");
const button_1 = require("./components/ui/button");
const command_1 = require("./components/ui/command");
const lucide_react_1 = require("lucide-react");
const fetch_search_1 = require("./lib/ai-search/fetch-search");
const flexsearch_model_1 = require("./models/flexsearch-model");
const keyword_search_1 = require("./lib/ai-search/keyword-search");
const flexsearch_1 = require("./lib/ai-search/flexsearch");
const mobx_react_lite_1 = require("mobx-react-lite");
exports.AISearch = (0, mobx_react_lite_1.observer)((_a) => {
    var { nexaiApiKey, onMenuItemSelect, onMenuItemReadMore, className, commandEmpty = 'No results found.', placeholder = 'Search documentation...', placeholderSmall = 'Search...' } = _a, props = __rest(_a, ["nexaiApiKey", "onMenuItemSelect", "onMenuItemReadMore", "className", "commandEmpty", "placeholder", "placeholderSmall"]);
    const [open, setOpen] = React.useState(false);
    const [input, setInput] = React.useState('');
    const [selectedNavItem, setSelectedNavItem] = React.useState();
    const searchModel = (0, flexsearch_model_1.useFlexsearchModel)({ nexaiApiKey });
    const [docsNav, setDocsNav] = React.useState([]);
    const fetched = React.useRef(false);
    React.useEffect(() => {
        const fetchDocs = () => __awaiter(void 0, void 0, void 0, function* () {
            const docs = yield (0, fetch_search_1.fetchSearchDocs)(nexaiApiKey);
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
        : (0, flexsearch_1.filterFlexsearchResults)(uniqueNav, searchModel.results);
    // augment with OR keyword search
    if (!visibleNav.length) {
        visibleNav.push(
        // @ts-expect-error navitem
        ...(0, keyword_search_1.keywordSearch)(input, uniqueNav));
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
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(button_1.Button, Object.assign({ variant: "outline", className: (0, utils_1.cn)("flex group h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none", className), onClick: () => setOpen(true) }, props, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.SearchIcon, { className: "group-hover:text-blue-500 mr-2 h-4 w-4 shrink-0" }), (0, jsx_runtime_1.jsx)("span", { className: "hidden lg:inline-flex", children: placeholder }), (0, jsx_runtime_1.jsx)("span", { className: "inline-flex lg:hidden", children: placeholderSmall }), (0, jsx_runtime_1.jsxs)("kbd", { className: "ml-auto group-hover:text-blue-500 pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs", children: "\u2318" }), "K"] })] })), (0, jsx_runtime_1.jsxs)(command_1.CommandDialog, { open: open, onOpenChange: setOpen, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center border-b px-3", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.SearchIcon, { className: "text-blue-500 mr-2 h-4 w-4 shrink-0" }), (0, jsx_runtime_1.jsx)("input", { value: input, onChange: e => onSearchInput(e.target.value), placeholder: placeholder, className: "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50" })] }), (0, jsx_runtime_1.jsxs)(command_1.CommandList, { children: [(0, jsx_runtime_1.jsx)(command_1.CommandEmpty, { children: commandEmpty }), visibleNav.map((group) => {
                                var _a;
                                return group && ((0, jsx_runtime_1.jsx)(command_1.CommandGroup, { heading: ((0, jsx_runtime_1.jsx)("p", { className: "text-blue-500", children: group.title })), children: (_a = group.items) === null || _a === void 0 ? void 0 : _a.map((navItem) => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)(command_1.CommandItem, { value: navItem.title, onSelect: () => onSelect(navItem), className: (0, utils_1.cn)("cursor-pointer group", selectedNavItem === navItem
                                                    ? "border border-blue-500 border-b-transparent rounded-b-none bg-gradient-to-r from-blue-100 via-violet-100 to-blue-100"
                                                    : "aria-selected:bg-gradient-to-r from-blue-50 via-violet-50 to-blue-50 "), children: [(0, jsx_runtime_1.jsx)("div", { className: "mr-2 ml-2 flex h-4 w-4 items-center justify-center", children: group.icon ? ((0, jsx_runtime_1.jsx)("span", { className: "text-blue-500", children: group.icon })) : ((0, jsx_runtime_1.jsx)(react_icons_1.CircleIcon, { className: "text-blue-500 h-3 w-3" })) }), (0, jsx_runtime_1.jsx)("span", { className: "", children: navItem.title }), (0, jsx_runtime_1.jsx)("span", { className: "opacity-0 item-arrow ml-auto mr-2 h-4 w-4 items-center justify-center group group-aria-selected:opacity-100", children: (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRightCircleIcon, { className: "text-blue-500 h-3 w-3" }) })] }), selectedNavItem === navItem ? ((0, jsx_runtime_1.jsxs)("div", { className: "rounded rounded-t-none border border-blue-500 bg-blue-50 shadow text-sm p-4 flex align-middle items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "mr-2 ml-2 flex h-4 w-4 items-center justify-center" }), (0, jsx_runtime_1.jsxs)("p", { children: [navItem.summary, (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "flex gap-2 h-7 m-2 ml-auto bg-blue-500", onClick: () => onReadMore(navItem, group), children: [(0, jsx_runtime_1.jsx)("span", { children: "More" }), (0, jsx_runtime_1.jsx)(lucide_react_1.EyeIcon, { className: "h-5 w-5" })] })] })] })) : null] }, navItem.href))) }, group.title));
                            }), (0, jsx_runtime_1.jsx)(command_1.CommandSeparator, {})] }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center border-t px-3", children: (0, jsx_runtime_1.jsxs)("a", { className: "flex gap-1 items-center p-2 ml-auto text-xs font-medium text-muted-foreground", href: "https://nexai.site", target: "_blank", children: [(0, jsx_runtime_1.jsx)("span", { children: 'AI Search ' }), (0, jsx_runtime_1.jsx)(lucide_react_1.ZapIcon, { className: "text-orange-500", size: 10 }), (0, jsx_runtime_1.jsx)("span", { className: "font-bold bg-gradient-to-r from-violet-500 to-blue-500 text-transparent bg-clip-text", children: "Nexai" })] }) })] })] }));
});

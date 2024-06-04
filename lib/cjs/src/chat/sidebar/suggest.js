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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchSuggest = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const utils_1 = require("../../lib/utils");
const command_1 = require("../../components/ui/command");
const lucide_react_1 = require("lucide-react");
const flexsearch_model_1 = require("../../models/flexsearch-model");
const flexsearch_1 = require("../../lib/ai-search/flexsearch");
const mobx_react_lite_1 = require("mobx-react-lite");
const scroll_area_1 = require("../../components/ui/scroll-area");
exports.SearchSuggest = (0, mobx_react_lite_1.observer)(({ nexaiApiKey, nexaiApiUrl, input, onMenuItemSelect, showInput = true }) => {
    const searchModel = (0, flexsearch_model_1.useFlexsearchModel)({ nexaiApiKey, nexaiApiUrl });
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
        : (0, flexsearch_1.filterFlexsearchResults)(uniqueNav, searchModel.results);
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
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(scroll_area_1.ScrollArea, { className: (0, utils_1.cn)(!visibleNav.length && 'hidden', 'p-2'), children: (0, jsx_runtime_1.jsxs)(command_1.CommandList, { className: "overflow-visible", children: [(0, jsx_runtime_1.jsx)(command_1.CommandGroup, { heading: ((0, jsx_runtime_1.jsx)("p", { className: "text-blue-500 text-sm flex", children: 'Suggestions' })), children: (0, jsx_runtime_1.jsxs)(command_1.CommandItem, { value: input, className: (0, utils_1.cn)(!showInput && "hidden", "cursor-pointer group items-center", "aria-selected:bg-blue-100 "), children: [(0, jsx_runtime_1.jsx)("div", { className: "mr-2 ml-2 flex h-4 w-4 items-center justify-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.SparklesIcon, { className: "text-yellow-500 h-3 w-3" }) }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center text-muted-foreground", children: [input, "..."] }), (0, jsx_runtime_1.jsx)("span", { className: "opacity-0 item-arrow ml-auto mr-2 h-6 w-6 items-center justify-center group group-aria-selected:opacity-100", children: (0, jsx_runtime_1.jsx)(lucide_react_1.SparklesIcon, { className: "text-blue-500 h-6 w-6 mb-2" }) })] }) }), visibleNav.map((group, i) => {
                            var _a;
                            return group && ((0, jsx_runtime_1.jsx)(command_1.CommandGroup, { heading: ((0, jsx_runtime_1.jsx)("p", { className: "text-blue-500", children: group.title })), children: (_a = group.items) === null || _a === void 0 ? void 0 : _a.map((navItem, i) => ((0, jsx_runtime_1.jsxs)(command_1.CommandItem, { value: navItem.title, onSelect: () => onSelect(navItem), className: (0, utils_1.cn)("cursor-pointer group items-center", "aria-selected:bg-blue-100 "), children: [(0, jsx_runtime_1.jsx)("div", { className: "mr-2 ml-2 flex h-4 w-4 items-center justify-center", children: group.icon ? ((0, jsx_runtime_1.jsx)("span", { className: "text-blue-500", children: group.icon })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.LucideMessageCircleQuestion, { className: "text-blue-500 h-5" })) }), (0, jsx_runtime_1.jsx)("span", { className: "", children: navItem.title }), (0, jsx_runtime_1.jsx)("span", { className: "opacity-0 item-arrow ml-auto mr-2 h-6 w-6 items-center justify-center group group-aria-selected:opacity-100", children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { className: "text-blue-500 h-6 w-6 mb-2" }) })] }, i))) }, i));
                        })] }) }), (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)("flex items-center px-3", visibleNav.length && 'border-t'), children: (0, jsx_runtime_1.jsxs)("a", { className: "flex gap-1 items-center p-2 ml-auto text-xs font-medium text-muted-foreground", href: "https://nexai.site", target: "_blank", children: [(0, jsx_runtime_1.jsx)("span", { children: 'AI Search ' }), (0, jsx_runtime_1.jsx)(lucide_react_1.ZapIcon, { className: "text-orange-500", size: 10 }), (0, jsx_runtime_1.jsx)("span", { className: "font-bold bg-gradient-to-r from-violet-500 to-blue-500 text-transparent bg-clip-text", children: "Nexai" })] }) })] }));
});

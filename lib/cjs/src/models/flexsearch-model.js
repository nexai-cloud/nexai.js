"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFlexsearchModel = exports.FlexsearchModel = exports.getNavItemId = void 0;
const mobx_1 = require("mobx");
const fetch_model_1 = require("../models/fetch-model");
const flexsearch_1 = __importDefault(require("flexsearch"));
const model_1 = require("./model");
const getNavItemId = (group, navItem) => {
    return `${group.title}::${navItem.title}`;
};
exports.getNavItemId = getNavItemId;
class FlexsearchModel extends model_1.Model {
    constructor() {
        super();
        Object.defineProperty(this, "nexaiApiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "documents", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "documentsState", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: fetch_model_1.FetchModel.create()
        });
        Object.defineProperty(this, "flexsearch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new flexsearch_1.default.Index()
        });
        Object.defineProperty(this, "searchState", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: fetch_model_1.FetchModel.create()
        });
        Object.defineProperty(this, "currentQuery", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "limit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 100
        });
        Object.defineProperty(this, "results", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        (0, mobx_1.makeObservable)(this, {
            nexaiApiKey: mobx_1.observable,
            documents: mobx_1.observable,
            setDocuments: mobx_1.action,
            searchState: mobx_1.observable,
            search: mobx_1.action,
            results: mobx_1.observable
        });
    }
    setDocuments(documents) {
        return __awaiter(this, void 0, void 0, function* () {
            this.documents.push(...documents);
            this.documentsState.fetch(() => __awaiter(this, void 0, void 0, function* () {
                yield Promise.all(documents.map((group) => {
                    return group.items.map(item => {
                        const id = (0, exports.getNavItemId)(group, item);
                        // console.log('add', { id, item })
                        return this.flexsearch.addAsync(id, `${item.title} ${item.summary} ${item.href}`);
                    });
                }).flat());
            }));
        });
    }
    documentsReady() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.documentsState.fetched)
                return true;
            return new Promise((resolve) => {
                (0, mobx_1.reaction)(() => this.documentsState.fetched, (status) => status && resolve(true));
            });
        });
    }
    setResults(results) {
        this.results.splice(0, this.results.length, ...results);
    }
    search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            this.currentQuery = query;
            yield this.documentsReady();
            if (this.currentQuery !== query) {
                return; // newer query exists
            }
            this.searchState.fetch(() => __awaiter(this, void 0, void 0, function* () {
                const results = yield this.flexsearch.searchAsync(query, this.limit);
                if (this.currentQuery !== query) {
                    return; // newer query exists
                }
                // console.log('search results', { query, results })
                this.setResults(results);
            }));
        });
    }
}
exports.FlexsearchModel = FlexsearchModel;
const map = new Map();
const useFlexsearchModel = ({ nexaiApiKey }) => {
    if (!map.has(nexaiApiKey)) {
        // console.log('create new flexsearch', nexaiApiKey)
        const chatSession = FlexsearchModel.create({ nexaiApiKey });
        map.set(nexaiApiKey, chatSession);
    }
    return map.get(nexaiApiKey);
};
exports.useFlexsearchModel = useFlexsearchModel;

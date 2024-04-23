"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterFlexsearchResults = void 0;
const flexsearch_model_1 = require("../../models/flexsearch-model");
const filterFlexsearchResults = (nav, results) => {
    // console.log('filter', { nav, results })
    const visibleNav = nav.map((group) => {
        var _a;
        const items = (_a = group.items) === null || _a === void 0 ? void 0 : _a.filter((item) => {
            const id = (0, flexsearch_model_1.getNavItemId)(group, item);
            return results.includes(id);
        });
        if (items === null || items === void 0 ? void 0 : items.length) {
            return Object.assign(Object.assign({}, group), { items });
        }
    }).filter(i => i);
    return visibleNav;
};
exports.filterFlexsearchResults = filterFlexsearchResults;

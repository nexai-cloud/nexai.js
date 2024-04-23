"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keywordSearch = void 0;
const keywordSearch = (query, nav) => {
    const keywords = query.split(' ').filter(i => i);
    const searches = keywords.map(keyword => new RegExp(keyword, 'ig'));
    const visibleNav = !searches.length
        ? nav
        : nav.map(item => {
            var _a;
            const items = (_a = item.items) === null || _a === void 0 ? void 0 : _a.filter(i => {
                return searches.find(search => {
                    var _a;
                    return (i.title.match(search) || ((_a = i.href) === null || _a === void 0 ? void 0 : _a.match(search)));
                });
            });
            if (items === null || items === void 0 ? void 0 : items.length) {
                return Object.assign(Object.assign({}, item), { items });
            }
        }).filter(i => i);
    return visibleNav;
};
exports.keywordSearch = keywordSearch;

import { getNavItemId } from "~/models/flexsearch-model";
export const filterFlexsearchResults = (nav, results) => {
    // console.log('filter', { nav, results })
    const visibleNav = nav.map((group) => {
        var _a;
        const items = (_a = group.items) === null || _a === void 0 ? void 0 : _a.filter((item) => {
            const id = getNavItemId(group, item);
            return results.includes(id);
        });
        if (items === null || items === void 0 ? void 0 : items.length) {
            return Object.assign(Object.assign({}, group), { items });
        }
    }).filter(i => i);
    return visibleNav;
};

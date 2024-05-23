import { IndexSearchResult, type NavItem, getNavItemId } from "~/models/flexsearch-model"

export const filterFlexsearchResults = (nav: NavItem[], results: IndexSearchResult[]): NavItem[] => {

  // console.log('filter', { nav, results })
  const visibleNav = nav.map((group) => {
    const items = group.items?.filter((item) => {
      const id = getNavItemId(group, item)
      return results.includes(id)
    })
    if (items?.length) {
      return {
        ...group,
        items
      }
    }
  }).filter(i => i)

  return visibleNav as NavItem[]
}
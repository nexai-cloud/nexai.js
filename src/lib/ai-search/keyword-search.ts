import { type NavItem } from "~/models/flexsearch-model"

export const keywordSearch = (query: string, nav: NavItem[]): NavItem[] => {
  const keywords = query.split(' ').filter(i => i)
  const searches = keywords.map(keyword => new RegExp(keyword, 'ig'))

  const visibleNav = !searches.length 
    ? nav 
    : nav.map(item => {
    const items = item.items?.filter(i => {
      return searches.find(search => (
        i.title.match(search) || i.href?.match(search)
      ))
    })
    if (items?.length) {
      return {
        ...item,
        items
      }
    }
  }).filter(i => i)

  return visibleNav as NavItem[]
}
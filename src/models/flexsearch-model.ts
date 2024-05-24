import { action, makeObservable, observable, reaction } from "mobx";
import { FetchModel } from "~/models/fetch-model";
import Flexsearch from "flexsearch"
import { Model } from "./model";
import { text2Words } from "~/lib/ai-search/tokenizer";
import { fetchSearchDocs } from "~/lib/ai-search/fetch-search";

export type NavItem = {
  title: string;
  summary?: string;
  href?: string;
  external?: true;
  items?: NavItem[]
  icon?: React.ReactNode;
  label?: string;
}

export type SearchResult = {
  field: string; 
  result: string[]
}

export type IndexSearchResult = string

export const getNavItemId = (group: NavItem, navItem: NavItem) => {
  return `${group.title}::${navItem.title}`
}

export class FlexsearchModel extends Model  {

  constructor() {
    super()
    makeObservable(this, {
      nexaiApiKey: observable,
      documents: observable,
      setDocuments: action,
      searchState: observable,
      search: action,
      results: observable,
      setResults: action,
      fetchDocumentsState: observable,
      fetchDocuments: action
    })
  }

  nexaiApiKey = ''

  documents: NavItem[] = []

  documentsState = FetchModel.create()

  async setDocuments(documents: NavItem[]) {
    this.documents.push(...documents)
    this.documentsState.fetch(async () => {
      await Promise.all(
        documents.map((group: NavItem): Promise<Flexsearch.Index>[] => {
          return group.items!.map(item => {
            const id = getNavItemId(group, item)
            // console.log('add', { id, item })
            return this.flexsearch.addAsync(
              id, `${item.title} ${item.summary} ${item.href}`
            )
          })
        }).flat()
      )
    })
  }

  async documentsReady() {
    if (this.documentsState.fetched) return true
    return new Promise((resolve) => {
      reaction(
        () => this.documentsState.fetched, 
        (status) => status && resolve(true)
      )
    })
  }

  fetchDocumentsState = FetchModel.create()

  async fetchDocuments() {
    return this.fetchDocumentsState.fetch(async () => {
      const docs = await fetchSearchDocs(this.nexaiApiKey)
      await this.setDocuments(docs)
    })
  }

  flexsearch = new Flexsearch.Index();

  searchState = FetchModel.create()

  currentQuery = ''

  limit = 100

  results: IndexSearchResult[] = []

  setResults(results: IndexSearchResult[]) {
    this.results.splice(0, this.results.length, ...results)
  }

  queryToKeywords(query: string) {
    const words = text2Words(query).join(' ');
    return words;
  }

  async search(query: string) {
    const keywords = this.queryToKeywords(query)
    this.currentQuery = query
    await this.documentsReady()
    if (this.currentQuery !== query) {
      return // newer query exists
    }
    this.searchState.fetch(async () => {
      const keywordResults = await this.flexsearch.searchAsync(keywords, this.limit)
      // fallback to searching whole query
      const results =  keywordResults.length 
        ? keywordResults : 
        await this.flexsearch.searchAsync(query, this.limit)
      if (this.currentQuery !== query) {
        return // newer query exists
      }
      // console.log('search results', { query, results })
      if (results.length) {
        this.setResults(results as IndexSearchResult[])
      }
    })
  }

}

const map = new Map<string, FlexsearchModel>()
export const useFlexsearchModel = ({ nexaiApiKey }: {
  nexaiApiKey: string;
}): FlexsearchModel => {
  if (!map.has(nexaiApiKey)) {
    // console.log('create new flexsearch', nexaiApiKey)
    const chatSession = FlexsearchModel.create({ nexaiApiKey })
    map.set(nexaiApiKey, chatSession)
  }
  return map.get(nexaiApiKey) as FlexsearchModel
}


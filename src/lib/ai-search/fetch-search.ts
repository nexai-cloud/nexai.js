import { type NavItem } from "~/models/flexsearch-model"
import { NexaiDocumentExtract } from "~/types/ai-search"

export const fetchSearchDocs = async ({ nexaiApiKey, nexaiApiUrl }: {
  nexaiApiKey: string;
  nexaiApiUrl: string;
}): Promise<NavItem[]> => {
  const res = await fetch(nexaiApiUrl + '/doc/search/?projectId=' + nexaiApiKey, {
    mode: 'cors'
  })
  const data = (await res.json()).data
  const extractions = data.extractions as NexaiDocumentExtract[]
  console.log('data', data)
  const nav = extractions.map((doc) => {
    return ({
      title: doc.title || doc.name,
      href: doc.name,
      items: doc.question_answers.map(q => {
        return {
          title: q.question,
          summary: q.answer,
          href: doc.documentId + '#' + q.question,
          label: doc.keywords[0],
        }
      })
    })
  })

  return nav as NavItem[]
}
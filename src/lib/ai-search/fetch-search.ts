import { NavItem } from "~/ai-search"
import { NexaiDocumentExtract } from "~/types/ai-search"

export const fetchSearchDocs = async (nexaiApiKey: string): Promise<NavItem[]> => {
  const res = await fetch('https://nexai.site/api/doc/search/?projectId=' + nexaiApiKey, {
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
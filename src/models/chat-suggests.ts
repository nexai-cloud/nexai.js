import { observable } from 'mobx'

export const ChatSuggests = observable({
  items: [] as string[],
  currentIndex: 0
});

export const fetchSuggests = async (projectName: string) => {
  setSuggests([
    `Hi! I'm fine.|What is ${projectName}.`,
    `Cool!|How do I use ${projectName}?`,
    `${projectName} API?|${projectName} Apps?`,
    `Use with NodeJS?|Use with React?`,
    `${projectName} pricing?|Free option?`,
    `I am satisfied.|I am not happy.`,
    `Thanks, bye.`
  ])
}

export const setSuggests = async (suggests: string[]) => {
  ChatSuggests.items.splice(0, ChatSuggests.items.length, ...suggests)
}

export const getSuggests = (): string[] => {
  const { items, currentIndex } = ChatSuggests
  console.log('current', ChatSuggests)
  const suggests = items[currentIndex]
  return suggests?.split('|') || []
}

export const nextSuggests = (): string[] => {
  ChatSuggests.currentIndex++
  console.log('next', ChatSuggests)
  return getSuggests()
}
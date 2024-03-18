import { observable } from 'mobx'

export const ChatSuggests = observable({
  items: [] as string[],
  currentIndex: 0
});

export const fetchSuggests = async () => {
  ChatSuggests.items.push(
    `I'm fine.|Tell me about Nexai.`,
    'Cool!|How do I use nexai?',
    'Nexai API?|Nexai Apps?',
    'NodeJS integration?|Use with React?',
    'Nexai pricing?|Free option?',
    'I am satisfied.|I am not happy.',
    'Thanks, bye.'
  )
}

export const getSuggests = (): string[] => {
  const { items, currentIndex } = ChatSuggests
  console.log('current', ChatSuggests)
  const suggests = items[currentIndex]
  return suggests?.split('|') || []
}

export const nextSuggests = (): string[] => {
  ChatSuggests.currentIndex++
  const { items, currentIndex } = ChatSuggests
  console.log('next', ChatSuggests)
  const suggests = items[currentIndex]
  return suggests?.split('|') || []
}
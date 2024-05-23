import { stopwords } from './stopwords';
// import jaroWinkler from 'talisman/metrics/jaro-winkler';

export const text2Words = (text: string) => {
  const tokens = text.split(' ')
  const filteredTokens = tokens.filter(token => !stopwords.includes(token));
  return filteredTokens
}
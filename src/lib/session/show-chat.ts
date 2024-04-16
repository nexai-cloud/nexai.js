export const getIsShowChat = () => {
  return globalThis.localStorage?.getItem('isShowChat')
}

export const hasIsShowChat = () => {
  return getIsShowChat() !== null
}
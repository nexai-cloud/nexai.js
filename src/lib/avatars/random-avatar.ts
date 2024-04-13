import { getAvatarsList } from "./avatars-list"

export const randomAvatarGenerator = (nexaiAssetsUrl: string) => {
  const avatarsList = getAvatarsList(nexaiAssetsUrl)
  return avatarsList[Math.floor(Math.random() * avatarsList.length)]
}
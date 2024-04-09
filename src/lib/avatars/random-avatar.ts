import { avatarsList } from "./avatars-list"

export const randomAvatarGenerator = () => {
  return avatarsList[Math.floor(Math.random() * avatarsList.length)]
}
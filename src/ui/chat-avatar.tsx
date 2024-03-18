import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const ChatAvatar = ({ src = undefined, name = '' }) => (
  <div className="rounded-full shadow border">
    <Avatar>
      <AvatarImage src={src} alt={name} />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  </div>
)

export const BotAvatar = () => (
  <div className="transform scale-x-[-1]">
    <img
      src={'/logo/round.png'}
      width={50}
      height={50}
      alt="Logo Chat Assistant"
    />  
  </div>
)
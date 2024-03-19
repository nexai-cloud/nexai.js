import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const getInitials = (name: string) => {
  return name.split(' ').map(c => c[0]).join('').substring(0, 2)
}

export const ChatAvatar = ({ src = undefined, name = '' }) => (
  <div className="rounded-full shadow border">
    <Avatar>
      <AvatarImage src={src} alt={name} />
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  </div>
)

export const BotAvatar = () => (
  <div className="transform scale-x-[-1]">
    <img
      src={'/logo/nexai-logo-round.svg'}
      width={50}
      height={50}
      alt="Logo Chat Assistant"
    />  
  </div>
)
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip"
import { cn } from "~/lib/utils"

const getInitials = (name: string) => {
  return name.split(' ').map(c => c[0]).join('').substring(0, 2)
}

export const ChatAvatar = ({ src = '', name = '', className = '' }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <div
          className={cn("overflow-hidden rounded-full shadow  border", className)}
        >
          <Avatar>
            <AvatarImage src={src} alt={name} />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        {name}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

export const BotAvatar = () => (
    <ChatAvatar
      className="border-none shadow-none"
      src={'/logo/nexai-logo-round.svg'}
      name="Nexai"
    />  
)
import { ChevronLeftIcon } from "lucide-react"
import { observer } from "mobx-react-lite";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { cn } from "~/lib/utils"
import { TeamMemberModel } from "~/models/team-member";

type Props = {
  teamMembers: TeamMemberModel[],
  onClickBack: () => void;
}

const getInitials = (name: string): string => (
  name.split(' ').map(w => w[0]).join('').toUpperCase()
)

export const ChatHeader = observer(({ teamMembers, onClickBack }: Props) => {

  return (
    <div className="flex flex-col space-y-2 m-2 border-b pb-2">
      <div className="flex items-center gap-2 w-full px-6">
        <button onClick={onClickBack}>
          <ChevronLeftIcon size={30} />
        </button>
        <Avatar className="mr-auto h-16 w-16">
          <AvatarImage src="/nexai-logo/nexai-logo-circle-color.svg" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <div className="flex-grow"></div>
        <div className="ml-auto flex relative">
          {
            teamMembers.map((user, i) => {
              const initials = getInitials(user.name || user.email)
              return (user.picture || initials) && (
                <Avatar key={i} className={cn(
                  "mr-auto h-10 w-10 border border-white"
                )} style={{
                  zIndex: 10 - i*2,
                  marginLeft: -16,
                  borderWidth: 3
                }}>
                  <AvatarImage src={user.picture} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              )
            })
          }
        </div>
      </div>
      <div className="flex">
        <span className="px-2 text-slate-400 text-lg">
          {`Talking to Nexai AI Assistant`}
        </span>
      </div>
    </div>
  )
})
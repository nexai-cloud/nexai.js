import { observer } from "mobx-react-lite";
import { Input } from "~/components/ui/input";
import { ChatAvatar, avatarsList } from "~/lib/avatars/avatars-list";
import { cn } from "~/lib/utils";
import { ChatSessionModel } from "~/models/chat-session";

export const ChooseAvatar = observer((
{ 
  chatSession 
} : { 
  chatSession: ChatSessionModel 
}) => {
  const avatarUrl = chatSession.avatarUrl
  const onSelectAvatar = (avatar: ChatAvatar) => {
    console.log('onSelectAvatar', { avatar })
    chatSession.setProps({
      ...chatSession,
      avatarUrl: avatar.path
    })
    chatSession.save()
  }
  const onChangeName = (name: string) => {
    console.log('onChangeName', { name })
    chatSession.setProps({
      ...chatSession,
      name
    })
    chatSession.save()
  }
  const onChangeEmail = (email: string) => {
    console.log('onChangeEmail', { email })
    chatSession.setProps({
      ...chatSession,
      email
    })
    chatSession.save()
  }
  const validateEmail = (email: string) => {
    const emailRegex = /^[^@\s]+@[^@\s.]+\.[^@\s.]+$/;
    return emailRegex.test(email);
  }
  
  console.log('choose-avatar', { avatarUrl })
  return (
    <div>
      <h3 className="font-bold pt-4 pb-2 text-sm text-muted">
      You may choose a profile
      </h3>
      <div className={'flex gap-4 flex-wrap py-4 px-2'}>
        {avatarsList.map((avatar, index) => (
          <button
            key={index}
            className={cn(
              "rounded-full border-2 shadow-lg",
              avatarUrl === avatar.path 
                ? "border-blue-500"
                : "border-transparent"
            )}
            onClick={() => onSelectAvatar(avatar)}
          >
            <img
              src={avatar.path}
              alt={avatar.name}
              className="w-10 h-10" 
            />
          </button>
        ))}
      </div>
      <div className="flex p-2">
        <Input
          value={chatSession.name}
          onChange={(e) => onChangeName(e.target.value)}
          placeholder="Enter your name"
          className="w-full"
        />
      </div>
      <div className="flex p-2">
        <Input
          value={chatSession.email}
          onChange={(e) => onChangeEmail(e.target.value)}
          placeholder="Enter your email"
          className={cn(
            "w-full",
            !validateEmail(chatSession.email) && "border-red-500"
          )}
          type="email"
        />
      </div>
    </div>
  );
});


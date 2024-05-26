import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './components/ui/resizable'
import { ChatSidebar } from './chat/sidebar/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'
import { useState } from 'react';
import { cn } from './lib/utils';

type ChatSidePanelProps = {
  nexaiApiKey: string;
  nexaiApiUrl: string;
}

export const ChatSidePanel = ({ nexaiApiKey, nexaiApiUrl }: ChatSidePanelProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <ResizablePanelGroup direction="horizontal" className={cn(
        'fixed bottom-0 left-0 h-screen pointer-events-none',
      )}>
        <ResizablePanel className='flex flex-col space-y-2 space-x-2 p-3'>
        </ResizablePanel>
        {
          open && <ResizableHandle withHandle />
        }
        <ResizablePanel className={cn(
          'flex flex-col bg-white shadow-xl',
          'opacity-0',
          'transition-all duration-300',
          open && 'opacity-100 pointer-events-auto'
        )}>
          <ChatSidebar
            nexaiApiKey={nexaiApiKey}
            nexaiApiUrl={nexaiApiUrl}
            onClickBack={() => setOpen(false)}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          open ? 'hidden' : 'flex'
        )}
      >
        <Avatar className={cn(
          "mr-auto h-16 w-16 fixed z-20 bottom-4 right-4 backdrop-blur-sm shadow-xl",
        )}>
          <AvatarImage src="/nexai-logo/nexai-logo-circle-color.svg" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      </button>
    </>
  )
}
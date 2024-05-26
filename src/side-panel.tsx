import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './components/ui/resizable'
import { ChatSidebar } from './chat/sidebar/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'
import { useState } from 'react';
import { cn } from './lib/utils';
import "./chat/sidebar/style/sidebar.css"

type ChatSidePanelProps = {
  nexaiApiKey: string;
  nexaiApiUrl: string;
}

export const ChatSidePanel = ({
  nexaiApiKey,
  nexaiApiUrl,
}: ChatSidePanelProps) => {
  const [open, setOpen] = useState(false)
  const [isSidePanel, setIsSidePanel] = useState(false)

  return (
    <>
      <ResizablePanelGroup direction="horizontal" className={cn(
        'fixed bottom-0 left-0 pointer-events-none',
        'md:p-10 md:pb-20',
      )}>
        <ResizablePanel
          className={cn(
            'flex flex-col space-y-2 space-x-2 p-3',
            'hidden lg:flex',
          )}
          defaultSize={70}
        />
        {
          open && (
            <ResizableHandle className="bg-transparent" />
          )
        }
        <ResizablePanel className={cn(
          'nexai-chat-sidebar',
          "max-h-screen md:max-h-[90%]",
          'flex flex-col bg-white shadow-xl',
          'border rounded-lg mt-auto',
          'opacity-0',
          'transition-opacity duration-300',
          open && 'opacity-100 pointer-events-auto'
        )}
        >
          {
            open && (
              <ChatSidebar
                nexaiApiKey={nexaiApiKey}
                nexaiApiUrl={nexaiApiUrl}
                onClickBack={() => setOpen(false)}
              />
            )
          }
        </ResizablePanel>
      </ResizablePanelGroup>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          open && 'hidden md:flex',
          isSidePanel && 'hidden',
          "fixed z-20 bottom-0 right-0 pb-4 pr-10",
        )}
      >
        <Avatar className={cn(
          "backdrop-blur-sm shadow-xl",
          open ? "h-12 w-12" : "h-16 w-16",
        )}>
          <AvatarImage src="/nexai-logo/nexai-logo-circle-color.svg" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      </button>
    </>
  )
}
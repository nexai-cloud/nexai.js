import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './components/ui/resizable'
import { ChatSidebar } from './chat/sidebar/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'
import { useState } from 'react';
import { cn } from './lib/utils';
import "./chat/sidebar/style/sidebar.css"
import { ChevronsLeftRight } from 'lucide-react';

type ChatSidePanelProps = {
  nexaiApiKey: string;
  nexaiApiUrl: string;
}

export const ChatSidePanel = ({
  nexaiApiKey,
  nexaiApiUrl,
}: ChatSidePanelProps) => {
  const [open, _setOpen] = useState(
    localStorage.getItem('nexai:open') === null
      ? true
      : Boolean(localStorage.getItem('nexai:open'))
  )
  const [isSidePanel, setIsSidePanel] = useState(
    localStorage.getItem('nexai:panel') === null
      ? true
      : Boolean(localStorage.getItem('nexai:panel'))
  )
  const [chatInput, setChatInput] = useState('')

  const setOpen = (open: boolean) => {
    localStorage.setItem('nexai:open', open ? '1' : '')
    _setOpen(open)
  }

  const toggleSidePanel = () => {
    localStorage.setItem('nexai:panel', isSidePanel ? '' : '1')
    setIsSidePanel(!isSidePanel)
  }

  const onChatInput = (chatInput: string) => {
    setChatInput(chatInput)
  }

  return (
    <>
      <ResizablePanelGroup direction="horizontal" className={cn(
        'fixed bottom-0 left-0 pointer-events-none',
        !isSidePanel && 'md:p-10 md:pb-20',
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
            <ResizableHandle
              // @ts-expect-error withhandle
              withHandle={isSidePanel}
              className="bg-transparent"
            />
          )
        }
        <ResizablePanel className={cn(
          'nexai-chat-sidebar relative',
          "max-h-screen md:max-h-[90%] md:min-w-[400px]",
          'flex flex-col bg-white shadow-xl',
          'border rounded-lg mt-auto',
          'opacity-0',
          'transition-opacity duration-300',
          open && 'opacity-100 pointer-events-auto',
          'pt-4',
          isSidePanel && 'h-screen max-h-screen md:max-h-screen rounded-none',
          chatInput && 'min-h-[80vh] md:min-h-[550px]',
        )}
        >
          {
            open && (
              <>
                <button
                  className='absolute right-1 top-1'
                  onClick={toggleSidePanel}
                >
                  <ChevronsLeftRight size={18} className='text-slate-300 -rotate-45' />
                </button>
                <ChatSidebar
                  nexaiApiKey={nexaiApiKey}
                  nexaiApiUrl={nexaiApiUrl}
                  onClickBack={() => setOpen(false)}
                  onChatInput={onChatInput}
                />
              </>
            )
          }
        </ResizablePanel>
      </ResizablePanelGroup>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          // <md uses sidepanel so hide
          open && 'hidden md:flex',
          (isSidePanel && open) && 'md:hidden',
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
import { ChatMessage, type ChatThread } from "../chat-types"
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ExternalLinkIcon } from "lucide-react"
import { CodeBlock } from "~/components/shared/prism/code-block"

export const NexaiChatMsg = ({
  thread,
  chatMessage
}: {
  thread: ChatThread,
  chatMessage: ChatMessage
}) => {

  if (!chatMessage) return null
  const { message, sources } = chatMessage
  const isAi = thread.userUid === 'bot'

  return (
    <div
      className="px-3 text-slate-800 text-wrap overflow-ellipsis overflow-clip"
    >
      {
        typeof message === 'string' && isAi ? (
          <div>
              <div>
                {
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code(props) {
                      const {children, className, node, ...rest} = props
                      const match = /language-(\w+)/.exec(className || '')
                      return match ? (
                        <CodeBlock
                          code={String(children).replace(/\n$/, '')}
                          language={match[1]}
                          showLines={false}
                        />
                      ) : (
                        <code {...rest} className={className}>
                          {children}
                        </code>
                      )
                    }
                  }}
                >
                  {message as string}
                </Markdown>
                }
              </div>
              {
                sources && (
                  <div className='mt-2'>
                    <h4 className='font-semibold'>Sources:</h4>
                    {
                      sources.map((source: string) => (
                        <p key={source}>
                          <a className='flex items-center align-middle' href={source} target='_blank'>
                            {source}<ExternalLinkIcon className='ml-1' size={12} />
                          </a>
                        </p>
                      ))
                    }
                  </div>
                )
              }
            </div>
        ) : (
          message
        )
      }
    </div>
  )
}
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ExternalLinkIcon, Link2Icon} from "lucide-react"
import { CodeBlock } from "~/components/shared/prism/code-block"
import { observer } from "mobx-react-lite"
import { NexaiChatMessage } from '~/chat-types'

export const MessageMarkdown = observer(({
  chatMessage
}: {
  chatMessage: NexaiChatMessage
}) => {

  if (!chatMessage) return null
  const { message, sources } = chatMessage
  // const isAi = thread.userUid === 'nexai'

  return (
    <div className="message-markdown">
      {
        typeof message === 'string' ? (
          <div>
              <div>
                {
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code(props) {
                      const {children, className, node, ...rest} = props
                      node; // fix unused error
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
                sources?.length ? (
                  <div className='mt-2'>
                    <h4 className='text-sm font-semibold text-muted-foreground pb-1'>{sources.length} source{sources.length > 1 ? 's' : ''}</h4>
                    <div className="flex flex-col space-y-1">
                    {
                      sources.map((source: string) => (
                        <p className='group flex align-middle gap-1  text-sm' key={source}>
                          <Link2Icon className='text-muted-foreground' size={20} />
                          <a className='flex items-center align-middle' href={source} target='_blank'>
                            {source}<ExternalLinkIcon className='ml-1 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300' size={12} />
                          </a>
                        </p>
                      ))
                    }
                    </div>
                  </div>
                ) : null
              }
            </div>
        ) : (
          message
        )
      }
    </div>
  )
})
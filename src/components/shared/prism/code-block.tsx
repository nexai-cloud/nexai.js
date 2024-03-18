
import { Highlight, themes } from "prism-react-renderer"
import { Badge } from "~/components/ui/badge"
import { cn } from "~/lib/utils"
import { toast } from "~/components/ui/use-toast"

const copyCodeClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(function() {
    toast({
      title: "Copied code to clipboard",
      // description: text,
      className: 'bg-green-100'
    });
}, function(err) {
    console.error('Failed to copy text: ', err);
});
}

export const CodeBlock = ({
  code = '',
  language = 'tsx',
  showLines = true,
  showCopy = true,
  copyLabel = 'copy code'
}) => (
  <Highlight
    theme={themes.shadesOfPurple}
    code={code}
    language={language}
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      
      <div className={cn(
        'code-block',
        'relative w-fullshadow rounded',
        ''
      )}>

        <div className="w-full flex p-2 bg-purple-600">
          <div className="font-bold text-md text-muted">
            {language || 'code'}
          </div>
          {
            showCopy ? (
              <Badge
                className={cn(
                  "code-copy ml-auto",
                  "shadow bg-purple-500 hover:bg-purple-400"
                )}
                onClick={() => copyCodeClipboard(code)}
              >{copyLabel}</Badge>
            ) : null
          }
        </div>

        <pre
          style={{ ...style }}
          className={cn(
            className,
            'p-6'
          )}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {
                showLines ? (
                  <span>{i + 1}</span>
                ) : null
              }
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      </div>
    )}
  </Highlight>
)
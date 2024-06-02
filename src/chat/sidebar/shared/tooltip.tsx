import { ReactNode } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip"

type Props = {
  children: ReactNode;
  tooltip: ReactNode;
  className?: string;
}

export const TooltipWrap = ({ children, tooltip, className = '' }: Props) => (
  <TooltipProvider delayDuration={100}>
    <Tooltip>
      <TooltipTrigger>
      {children}
      </TooltipTrigger>
      <TooltipContent className={className}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)


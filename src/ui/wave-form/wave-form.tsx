import { useEffect } from "react";
import { NexaiWaveFormSVG } from "./wave-form-svg"
import { cn } from "~/lib/utils";

export const NexaiWaveForm = ({
  active = false,
  className = ''
}) => {

  useEffect(() => {
    
  })

  return (
    <NexaiWaveFormSVG
      className={cn(active ? "animate-spin" : "", className)}
    />
  )
};


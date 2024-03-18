import { useEffect } from "react";
import { NexaiWaveFormSVG } from "./wave-form-svg"

export const NexaiWaveForm = ({
  active = false,
}) => {

  useEffect(() => {
    
  })

  return (
    <NexaiWaveFormSVG
      className={active ? "animate-spin" : ""}
    />
  )
};


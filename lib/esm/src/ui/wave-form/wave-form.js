import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { NexaiWaveFormSVG } from "./wave-form-svg";
import { cn } from "../../lib/utils";
export const NexaiWaveForm = ({ active = false, className = '' }) => {
    useEffect(() => {
    });
    return (_jsx(NexaiWaveFormSVG, { className: cn(active ? "animate-spin" : "", className) }));
};

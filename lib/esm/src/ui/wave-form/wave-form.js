import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { NexaiWaveFormSVG } from "./wave-form-svg";
export const NexaiWaveForm = ({ active = false, }) => {
    useEffect(() => {
    });
    return (_jsx(NexaiWaveFormSVG, { className: active ? "animate-spin" : "" }));
};

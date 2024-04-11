"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NexaiWaveForm = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const wave_form_svg_1 = require("./wave-form-svg");
const NexaiWaveForm = ({ active = false, }) => {
    (0, react_1.useEffect)(() => {
    });
    return ((0, jsx_runtime_1.jsx)(wave_form_svg_1.NexaiWaveFormSVG, { className: active ? "animate-spin" : "" }));
};
exports.NexaiWaveForm = NexaiWaveForm;

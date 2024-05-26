"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NexaiWaveForm = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const wave_form_svg_1 = require("./wave-form-svg");
const utils_1 = require("../../lib/utils");
const NexaiWaveForm = ({ active = false, className = '' }) => {
    (0, react_1.useEffect)(() => {
    });
    return ((0, jsx_runtime_1.jsx)(wave_form_svg_1.NexaiWaveFormSVG, { className: (0, utils_1.cn)(active ? "animate-spin" : "", className) }));
};
exports.NexaiWaveForm = NexaiWaveForm;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@twind/core");
const preset_autoprefix_1 = __importDefault(require("@twind/preset-autoprefix"));
const preset_radix_ui_1 = __importDefault(require("@twind/preset-radix-ui"));
const base_1 = __importDefault(require("@twind/preset-tailwind/base"));
const colors = __importStar(require("@twind/preset-tailwind/colors"));
exports.default = (0, core_1.defineConfig)({
    // theme: {
    //   extend: {
    //     fontFamily: {
    //       sans: 'Roboto, sans-serif',
    //       'proxima-nova': '"Proxima Nova"',
    //     },
    //   },
    // },
    // preflight: {
    //   // Import external stylesheet
    //   '@import': `url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400&display=swap')`,
    //   // Declare font face
    //   '@font-face': [
    //     {
    //       fontFamily: 'Proxima Nova',
    //       fontWeight: '400',
    //       src: 'url(/fonts/proxima-nova/400-regular.woff) format("woff")',
    //     },
    //     {
    //       fontFamily: 'Proxima Nova',
    //       fontWeight: '500',
    //       src: 'url(/fonts/proxima-nova/500-medium.woff) format("woff")',
    //     },
    //   ],
    // },
    presets: [
        (0, preset_autoprefix_1.default)(),
        (0, preset_radix_ui_1.default)(),
        (0, base_1.default)({
            colors: Object.assign(Object.assign({}, colors), { border: "hsl(var(--border))", input: "hsl(var(--input))", ring: "hsl(var(--ring))", background: "hsl(var(--background))", foreground: "hsl(var(--foreground))", primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                }, secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                }, destructive: {
                    DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
                    foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
                }, muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                }, accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                }, popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                }, card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                } }),
        }),
    ]
    /* config */
});

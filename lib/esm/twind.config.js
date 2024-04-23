import { defineConfig } from "@twind/core";
import presetAutoprefix from "@twind/preset-autoprefix";
import presetRadixUi from '@twind/preset-radix-ui';
import presetTailwindBase from "@twind/preset-tailwind/base";
import * as colors from '@twind/preset-tailwind/colors';
export default defineConfig({
    // Add your custom CSS rules to the theme property
    theme: {
        extend: {
            styles: {},
        },
    },
    presets: [
        presetAutoprefix(),
        presetRadixUi(),
        presetTailwindBase({
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

import { CSSProperties } from 'react';
export type ShadowDomProps = {
    id: string;
    children: React.ReactNode;
    className?: string;
    style?: CSSProperties;
    styles?: string;
};
export declare const ShadowDom: ({ id, children, className, style, styles }: ShadowDomProps) => import("react/jsx-runtime").JSX.Element;

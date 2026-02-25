// Global type declarations for Google's <model-viewer> web component
// https://modelviewer.dev/

import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type ModelViewerAttributes = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
    src?: string;
    alt?: string;
    'auto-rotate'?: string;
    'auto-rotate-delay'?: string;
    'rotation-per-second'?: string;
    'camera-controls'?: string;
    'disable-zoom'?: string;
    'camera-orbit'?: string;
    'min-camera-orbit'?: string;
    'max-camera-orbit'?: string;
    'min-field-of-view'?: string;
    'max-field-of-view'?: string;
    'environment-image'?: string;
    'shadow-intensity'?: string;
    'shadow-softness'?: string;
    exposure?: string;
    loading?: string;
};

declare module 'react' {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': ModelViewerAttributes;
        }
    }
}

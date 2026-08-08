import { QuartzComponent } from '@quartz-community/types';

interface LogoOptions {
    src: string;
    alt?: string;
    href?: string;
    height?: number | string;
}
declare const _default: (opts?: LogoOptions) => QuartzComponent;

export { _default as Logo, type LogoOptions };

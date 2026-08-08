import { QuartzComponent } from '@quartz-community/types';

interface LogoOptions {
    src: string;
    alt?: string;
    href?: string;
    height?: number | string;
    /** Bản EN của trang chủ (mặc định /index-en) */
    homeEnHref?: string;
}
declare const _default: (opts?: LogoOptions) => QuartzComponent;

export { _default as Logo, type LogoOptions };

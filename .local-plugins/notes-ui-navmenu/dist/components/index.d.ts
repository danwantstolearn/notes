import { QuartzComponent } from '@quartz-community/types';

interface NavMenuOptions {
    links: {
        label: string;
        href: string;
    }[];
    align?: "left" | "center" | "right";
    /** Bản EN của trang chủ (mặc định /index-en) */
    homeEnHref?: string;
}
declare const _default: (opts?: NavMenuOptions) => QuartzComponent;

export { _default as NavMenu, type NavMenuOptions };

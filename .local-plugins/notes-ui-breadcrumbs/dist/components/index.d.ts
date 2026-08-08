import { QuartzComponent } from '@quartz-community/types';

interface BreadcrumbsOptions {
    /** Symbol between crumbs */
    spacerSymbol?: string;
    /** Name of first crumb */
    rootName?: string;
    /** Bản EN của trang chủ (mặc định /index-en) */
    homeEnHref?: string;
    /** Hiện trang hiện tại ở cuối breadcrumb */
    showCurrentPage?: boolean;
}
declare const _default: (opts?: BreadcrumbsOptions) => QuartzComponent;

export { _default as Breadcrumbs, type BreadcrumbsOptions };

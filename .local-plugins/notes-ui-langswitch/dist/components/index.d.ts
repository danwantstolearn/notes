import { QuartzComponent } from '@quartz-community/types';

interface LanguageSwitchOptions {
    /** Nhãn hiển thị khi không xác định được ngôn ngữ hiện tại (mặc định "EN") */
    label?: string;
    /** Nhãn khi trang hiện tại là tiếng Việt (mặc định "EN") */
    labelFromVi?: string;
    /** Nhãn khi trang hiện tại là tiếng Anh (mặc định "VI") */
    labelFromEn?: string;
    /**
     * Hành vi khi trang KHÔNG có bản dịch (thiếu altLang hoặc target không tồn tại):
     * - "disabled": hiện nút mờ, không phải link, tooltip "chưa có bản dịch"
     * - "hide": không render gì (hành vi cũ)
     */
    missingBehavior?: "disabled" | "hide";
}
declare const _default: (opts?: LanguageSwitchOptions) => QuartzComponent;

export { _default as LanguageSwitch, type LanguageSwitchOptions };

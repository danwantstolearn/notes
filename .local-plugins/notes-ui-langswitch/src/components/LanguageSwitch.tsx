import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types";

function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface LanguageSwitchOptions {
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

/** Chuẩn hoá đường dẫn altLang thành slug để so với allFiles. "/" -> "index" */
function altLangToSlug(altLang: string): string {
  const cleaned = altLang.replace(/^\/+|\/+$/g, "");
  return cleaned === "" ? "index" : cleaned;
}

export default ((opts?: LanguageSwitchOptions) => {
  const label = opts?.label ?? "EN";
  const labelFromVi = opts?.labelFromVi ?? "EN";
  const labelFromEn = opts?.labelFromEn ?? "VI";
  const missingBehavior = opts?.missingBehavior ?? "disabled";

  const LanguageSwitch: QuartzComponent = ({
    fileData,
    displayClass,
    allFiles,
  }: QuartzComponentProps) => {
    const fm = (fileData.frontmatter ?? {}) as Record<string, unknown>;

    // Đường dẫn tới bản ngôn ngữ kia, khai báo trong frontmatter:
    //   altLang: /notes/my-post.en   (bản EN)
    //   altLang: /notes/my-post      (bản VI)
    const altLang =
      typeof fm.altLang === "string" && fm.altLang.startsWith("/")
        ? fm.altLang
        : undefined;

    // Xác định ngôn ngữ hiện tại từ frontmatter `lang` (vi/en) hoặc suy từ slug
    let currentLang = typeof fm.lang === "string" ? fm.lang.toLowerCase() : "";
    if (!currentLang) {
      const slug = (fileData.slug ?? "").toLowerCase();
      if (slug.endsWith(".en") || slug.endsWith("-en") || slug.includes("/en/")) currentLang = "en";
      else if (slug.endsWith(".vi") || slug.endsWith("-vi") || slug.includes("/vi/")) currentLang = "vi";
    }

    const btnLabel =
      currentLang === "vi" ? labelFromVi : currentLang === "en" ? labelFromEn : label;

    // Kiểm tra bản dịch có thực sự tồn tại trong build không (tránh link chết)
    const targetExists =
      altLang !== undefined &&
      (allFiles ?? []).some((f) => f.slug === altLangToSlug(altLang));

    // Không có bản dịch (hoặc link hỏng) -> theo missingBehavior
    if (!altLang || !targetExists) {
      if (missingBehavior === "hide") return null;
      const missingTitle =
        currentLang === "vi"
          ? "Chưa có bản dịch tiếng Anh"
          : currentLang === "en"
            ? "Chưa có bản dịch tiếng Việt"
            : "Bản dịch chưa có";
      return (
        <span
          class={classNames(displayClass, "q-langswitch", "q-langswitch--missing")}
          title={missingTitle}
          aria-disabled="true"
        >
          {btnLabel}
        </span>
      );
    }

    return (
      <a
        class={classNames(displayClass, "q-langswitch")}
        href={altLang}
        rel="nofollow"
        title="Switch language"
      >
        {btnLabel}
      </a>
    );
  };

  LanguageSwitch.css = `
    .q-langswitch {
      display: inline-block;
      font-weight: bold;
      border: 1px solid var(--gray);
      padding: 6px 10px;
      border-radius: 8px;
      text-decoration: none;
      color: var(--dark);
      line-height: 1.2;
    }
    .q-langswitch:hover { text-decoration: underline; }
    .q-langswitch--missing {
      opacity: 0.45;
      cursor: not-allowed;
      border-style: dashed;
    }
    .q-langswitch--missing:hover { text-decoration: none; }
  `;

  return LanguageSwitch;
}) satisfies QuartzComponentConstructor<LanguageSwitchOptions>;

import type {
  QuartzComponent,
  QuartzComponentConstructor,
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
}

export default ((opts?: LanguageSwitchOptions) => {
  const label = opts?.label ?? "EN";
  const labelFromVi = opts?.labelFromVi ?? "EN";
  const labelFromEn = opts?.labelFromEn ?? "VI";

  const LanguageSwitch: QuartzComponent = ({ fileData, displayClass }) => {
    const fm = (fileData.frontmatter ?? {}) as Record<string, unknown>;

    // Đường dẫn tới bản ngôn ngữ kia, khai báo trong frontmatter:
    //   altLang: /notes/my-post.en   (bản EN)
    //   altLang: /notes/my-post      (bản VI)
    const altLang =
      typeof fm.altLang === "string" && fm.altLang.startsWith("/")
        ? fm.altLang
        : undefined;

    // Không có bản dịch -> không render gì
    if (!altLang) return null;

    // Xác định ngôn ngữ hiện tại từ frontmatter `lang` (vi/en) hoặc suy từ slug
    let currentLang = typeof fm.lang === "string" ? fm.lang.toLowerCase() : "";
    if (!currentLang) {
      const slug = (fileData.slug ?? "").toLowerCase();
      if (slug.endsWith(".en") || slug.includes("/en/")) currentLang = "en";
      else if (slug.endsWith(".vi") || slug.includes("/vi/")) currentLang = "vi";
    }

    const btnLabel = currentLang === "vi" ? labelFromVi : currentLang === "en" ? labelFromEn : label;

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
  `;

  return LanguageSwitch;
}) satisfies QuartzComponentConstructor<LanguageSwitchOptions>;

import type {
  QuartzComponent,
  QuartzComponentConstructor,
} from "@quartz-community/types";

function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface LogoOptions {
  src: string;
  alt?: string;
  href?: string;
  height?: number | string;
  /** Bản EN của trang chủ (mặc định /index-en) */
  homeEnHref?: string;
}

function detectLang(fileData: {
  frontmatter?: Record<string, unknown>;
  slug?: string;
}): "vi" | "en" | "" {
  const fm = (fileData.frontmatter ?? {}) as Record<string, unknown>;
  if (typeof fm.lang === "string") {
    const l = fm.lang.toLowerCase();
    if (l === "en") return "en";
    if (l === "vi") return "vi";
  }
  const slug = (fileData.slug ?? "").toLowerCase();
  if (slug.endsWith(".en") || slug.endsWith("-en") || slug.includes("/en/")) return "en";
  if (slug.endsWith(".vi") || slug.endsWith("-vi") || slug.includes("/vi/")) return "vi";
  return "";
}

export default ((opts?: LogoOptions) => {
  const src = opts?.src ?? "/static/logo.png";
  const alt = opts?.alt ?? "";
  const href = opts?.href ?? "/";
  const height = opts?.height ?? 100;
  const homeEnHref = opts?.homeEnHref ?? "/index-en";

  const Logo: QuartzComponent = ({ fileData, displayClass }) => {
    const isEn = detectLang(fileData) === "en";
    const linkHref = href === "/" && isEn ? homeEnHref : href;

    const img = (
      <img
        class="q-logo__img"
        src={src}
        alt={alt}
        style={`height: ${typeof height === "number" ? `${height}px` : height};`}
      />
    );
    return (
      <div class={classNames(displayClass, "q-logo")}>
        <a class="q-logo__link" href={linkHref}>
          {img}
        </a>
      </div>
    );
  };

  Logo.css = `
    .q-logo { padding: 1rem 0; }
    .q-logo__link { display: inline-block; }
    .q-logo__img { width: auto; max-width: 100%; object-fit: contain; }
  `;

  return Logo;
}) satisfies QuartzComponentConstructor<LogoOptions>;

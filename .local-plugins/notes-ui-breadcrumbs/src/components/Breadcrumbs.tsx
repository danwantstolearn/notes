import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types";

function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface BreadcrumbsOptions {
  /** Symbol between crumbs */
  spacerSymbol?: string;
  /** Name of first crumb */
  rootName?: string;
  /** Bản EN của trang chủ (mặc định /index-en) */
  homeEnHref?: string;
  /** Hiện trang hiện tại ở cuối breadcrumb */
  showCurrentPage?: boolean;
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

/** Xây chuỗi breadcrumb từ slug: index.md -> "/", notes/xin-chao -> "/notes/xin-chao" */
function slugToPath(slug: string): string {
  if (!slug || slug === "index") return "/";
  const parts = slug.split("/").filter((p) => p && p !== "index");
  return "/" + parts.join("/");
}

export default ((opts?: BreadcrumbsOptions) => {
  const spacer = opts?.spacerSymbol ?? "❯";
  const rootName = opts?.rootName ?? "Home";
  const homeEnHref = opts?.homeEnHref ?? "/index-en";
  const showCurrent = opts?.showCurrentPage ?? true;

  const Breadcrumbs: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const slug = fileData.slug ?? "";
    const isEn = detectLang(fileData) === "en";
    const homeHref = isEn ? homeEnHref : "/";

    // Các segment của đường dẫn hiện tại (bỏ index)
    const segments = slug
      .split("/")
      .filter((p) => p && p !== "index");

    if (segments.length === 0) return null; // trang chủ không cần breadcrumb

    // Dựng crumbs: Home ❯ Trang hiện tại (bỏ folder trung gian để tránh link lạc ngôn ngữ)
    const fm = (fileData.frontmatter ?? {}) as Record<string, unknown>;
    const currentName =
      typeof fm.title === "string" && fm.title.trim() ? fm.title : segments[segments.length - 1];
    const currentHref = slugToPath(slug);

    return (
      <nav class={classNames(displayClass, "breadcrumb-container")} aria-label="breadcrumbs">
        <div class="breadcrumb-element">
          <a href={homeHref}>{rootName}</a>
          <p> {spacer} </p>
        </div>
        <div class="breadcrumb-element">
          <a aria-current="page" style={{ fontWeight: "bold" }} href={currentHref}>
            {currentName}
          </a>
        </div>
      </nav>
    );
  };

  Breadcrumbs.css = `
    .breadcrumb-container {
      margin: 0;
      margin-top: 0.75rem;
      padding: 0;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .breadcrumb-element p {
      margin: 0;
      margin-left: 0.5rem;
      padding: 0;
      line-height: normal;
    }
    .breadcrumb-element {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  `;

  return Breadcrumbs;
}) satisfies QuartzComponentConstructor<BreadcrumbsOptions>;

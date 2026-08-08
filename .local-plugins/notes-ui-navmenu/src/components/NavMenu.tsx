import type {
  QuartzComponent,
  QuartzComponentConstructor,
} from "@quartz-community/types";

function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface NavMenuOptions {
  links: { label: string; href: string }[];
  align?: "left" | "center" | "right";
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

/** Transform link bản VI -> bản EN theo convention "-en" */
function toEnHref(href: string, homeEnHref: string): string {
  if (!href.startsWith("/")) return href; // external
  if (href === "/") return homeEnHref;
  if (href.endsWith("-en") || href.includes("-en/")) return href; // đã là EN
  return href + "-en";
}

export default ((opts?: NavMenuOptions) => {
  const links = opts?.links ?? [];
  const align = opts?.align ?? "left";
  const homeEnHref = opts?.homeEnHref ?? "/index-en";

  const NavMenu: QuartzComponent = ({ fileData, displayClass }) => {
    const isEn = detectLang(fileData) === "en";
    const hrefs = links.map((l) => (isEn ? toEnHref(l.href, homeEnHref) : l.href));

    return (
      <nav class={classNames(displayClass, `q-navmenu q-navmenu--${align}`)}>
        {links.map((l, i) => (
          <a class="q-navmenu__link" href={hrefs[i]}>
            {l.label}
          </a>
        ))}
      </nav>
    );
  };

  NavMenu.css = `
    .q-navmenu { display:flex; gap:.5rem; flex-wrap:wrap; }
    .q-navmenu--left { justify-content:flex-start; }
    .q-navmenu--center { justify-content:center; }
    .q-navmenu--right { justify-content:flex-end; }
    .q-navmenu__link {
      text-decoration:none;
      border:1px solid var(--gray);
      padding:6px 10px;
      border-radius:8px;
    }
    .q-navmenu__link:hover { text-decoration:underline; }
  `;

  return NavMenu;
}) satisfies QuartzComponentConstructor<NavMenuOptions>;

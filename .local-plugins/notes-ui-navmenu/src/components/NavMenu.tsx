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
}

export default ((opts?: NavMenuOptions) => {
  const links = opts?.links ?? [];
  const align = opts?.align ?? "left";

  const NavMenu: QuartzComponent = ({ displayClass }) => {
    return (
      <nav class={classNames(displayClass, `q-navmenu q-navmenu--${align}`)}>
        {links.map((l) => (
          <a class="q-navmenu__link" href={l.href}>
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

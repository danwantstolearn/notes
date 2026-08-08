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
}

export default ((opts?: LogoOptions) => {
  const src = opts?.src ?? "/static/logo.png";
  const alt = opts?.alt ?? "";
  const href = opts?.href ?? "/";
  const height = opts?.height ?? 100;

  const Logo: QuartzComponent = ({ displayClass }) => {
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
        <a class="q-logo__link" href={href}>
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

import { createRequire } from 'module';

createRequire(import.meta.url);
var l;
l = { __e: function(n2, l2, u3, t2) {
  for (var i2, r2, o2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((r2 = i2.constructor) && null != r2.getDerivedStateFromError && (i2.setState(r2.getDerivedStateFromError(n2)), o2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), o2 = i2.__d), o2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Math.random().toString(8);

// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var f2 = 0;
function u2(e2, t2, n2, o2, i2, u3) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i2, __self: u3 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l.vnode && l.vnode(l2), l2;
}

// src/components/Breadcrumbs.tsx
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function detectLang(fileData) {
  const fm = fileData.frontmatter ?? {};
  if (typeof fm.lang === "string") {
    const l2 = fm.lang.toLowerCase();
    if (l2 === "en") return "en";
    if (l2 === "vi") return "vi";
  }
  const slug = (fileData.slug ?? "").toLowerCase();
  if (slug.endsWith(".en") || slug.endsWith("-en") || slug.includes("/en/")) return "en";
  if (slug.endsWith(".vi") || slug.endsWith("-vi") || slug.includes("/vi/")) return "vi";
  return "";
}
function slugToPath(slug) {
  if (!slug || slug === "index") return "/";
  const parts = slug.split("/").filter((p2) => p2 && p2 !== "index");
  return "/" + parts.join("/");
}
var Breadcrumbs_default = ((opts) => {
  const spacer = opts?.spacerSymbol ?? "\u276F";
  const rootName = opts?.rootName ?? "Home";
  const homeEnHref = opts?.homeEnHref ?? "/index-en";
  opts?.showCurrentPage ?? true;
  const Breadcrumbs = ({ fileData, displayClass }) => {
    const slug = fileData.slug ?? "";
    const isEn = detectLang(fileData) === "en";
    const homeHref = isEn ? homeEnHref : "/";
    const segments = slug.split("/").filter((p2) => p2 && p2 !== "index");
    if (segments.length === 0) return null;
    const fm = fileData.frontmatter ?? {};
    const currentName = typeof fm.title === "string" && fm.title.trim() ? fm.title : segments[segments.length - 1];
    const currentHref = slugToPath(slug);
    return /* @__PURE__ */ u2("nav", { class: classNames(displayClass, "breadcrumb-container"), "aria-label": "breadcrumbs", children: [
      /* @__PURE__ */ u2("div", { class: "breadcrumb-element", children: [
        /* @__PURE__ */ u2("a", { href: homeHref, children: rootName }),
        /* @__PURE__ */ u2("p", { children: [
          " ",
          spacer,
          " "
        ] })
      ] }),
      /* @__PURE__ */ u2("div", { class: "breadcrumb-element", children: /* @__PURE__ */ u2("a", { "aria-current": "page", style: { fontWeight: "bold" }, href: currentHref, children: currentName }) })
    ] });
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
});

export { Breadcrumbs_default as Breadcrumbs };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
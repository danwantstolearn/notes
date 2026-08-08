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

// src/components/NavMenu.tsx
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
function toEnHref(href, homeEnHref) {
  if (!href.startsWith("/")) return href;
  if (href === "/") return homeEnHref;
  if (href.endsWith("-en") || href.includes("-en/")) return href;
  return href + "-en";
}
var NavMenu_default = ((opts) => {
  const links = opts?.links ?? [];
  const align = opts?.align ?? "left";
  const homeEnHref = opts?.homeEnHref ?? "/index-en";
  const NavMenu = ({ fileData, displayClass }) => {
    const isEn = detectLang(fileData) === "en";
    const hrefs = links.map((l2) => isEn ? toEnHref(l2.href, homeEnHref) : l2.href);
    return /* @__PURE__ */ u2("nav", { class: classNames(displayClass, `q-navmenu q-navmenu--${align}`), children: links.map((l2, i2) => /* @__PURE__ */ u2("a", { class: "q-navmenu__link", href: hrefs[i2], children: l2.label })) });
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
});

export { NavMenu_default as NavMenu };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
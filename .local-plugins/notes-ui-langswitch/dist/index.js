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
  return l.vnode && l.vnode(l2), l2;
}

// src/components/LanguageSwitch.tsx
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
var LanguageSwitch_default = ((opts) => {
  const label = opts?.label ?? "EN";
  const labelFromVi = opts?.labelFromVi ?? "EN";
  const labelFromEn = opts?.labelFromEn ?? "VI";
  const LanguageSwitch = ({ fileData, displayClass }) => {
    const fm = fileData.frontmatter ?? {};
    const altLang = typeof fm.altLang === "string" && fm.altLang.startsWith("/") ? fm.altLang : void 0;
    if (!altLang) return null;
    let currentLang = typeof fm.lang === "string" ? fm.lang.toLowerCase() : "";
    if (!currentLang) {
      const slug = (fileData.slug ?? "").toLowerCase();
      if (slug.endsWith(".en") || slug.includes("/en/")) currentLang = "en";
      else if (slug.endsWith(".vi") || slug.includes("/vi/")) currentLang = "vi";
    }
    const btnLabel = currentLang === "vi" ? labelFromVi : currentLang === "en" ? labelFromEn : label;
    return /* @__PURE__ */ u2(
      "a",
      {
        class: classNames(displayClass, "q-langswitch"),
        href: altLang,
        rel: "nofollow",
        title: "Switch language",
        children: btnLabel
      }
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
});

export { LanguageSwitch_default as LanguageSwitch };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
import './embed.css';var It = Object.defineProperty;
var Dt = (e, t, n) => t in e ? It(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var tt = (e, t, n) => Dt(e, typeof t != "symbol" ? t + "" : t, n);
function k() {
}
const Et = (e) => e;
function Pt(e, t) {
  for (const n in t) e[n] = t[n];
  return (
    /** @type {T & S} */
    e
  );
}
function Mt(e) {
  return e();
}
function _t() {
  return /* @__PURE__ */ Object.create(null);
}
function N(e) {
  e.forEach(Mt);
}
function lt(e) {
  return typeof e == "function";
}
function Y(e, t) {
  return e != e ? t == t : e !== t || e && typeof e == "object" || typeof e == "function";
}
function Rt(e) {
  return Object.keys(e).length === 0;
}
function qt(e, ...t) {
  if (e == null) {
    for (const s of t)
      s(void 0);
    return k;
  }
  const n = e.subscribe(...t);
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
function Ft(e, t, n) {
  e.$$.on_destroy.push(qt(t, n));
}
function Lt(e, t, n, s) {
  if (e) {
    const i = St(e, t, n, s);
    return e[0](i);
  }
}
function St(e, t, n, s) {
  return e[1] && s ? Pt(n.ctx.slice(), e[1](s(t))) : n.ctx;
}
function Ut(e, t, n, s) {
  if (e[2] && s) {
    const i = e[2](s(n));
    if (t.dirty === void 0)
      return i;
    if (typeof i == "object") {
      const o = [], c = Math.max(t.dirty.length, i.length);
      for (let r = 0; r < c; r += 1)
        o[r] = t.dirty[r] | i[r];
      return o;
    }
    return t.dirty | i;
  }
  return t.dirty;
}
function Gt(e, t, n, s, i, o) {
  if (i) {
    const c = St(t, n, s, o);
    e.p(c, i);
  }
}
function Jt(e) {
  if (e.ctx.length > 32) {
    const t = [], n = e.ctx.length / 32;
    for (let s = 0; s < n; s++)
      t[s] = -1;
    return t;
  }
  return -1;
}
const Nt = typeof window < "u";
let Kt = Nt ? () => window.performance.now() : () => Date.now(), ut = Nt ? (e) => requestAnimationFrame(e) : k;
const I = /* @__PURE__ */ new Set();
function jt(e) {
  I.forEach((t) => {
    t.c(e) || (I.delete(t), t.f());
  }), I.size !== 0 && ut(jt);
}
function Qt(e) {
  let t;
  return I.size === 0 && ut(jt), {
    promise: new Promise((n) => {
      I.add(t = { c: e, f: n });
    }),
    abort() {
      I.delete(t);
    }
  };
}
function w(e, t) {
  e.appendChild(t);
}
function zt(e) {
  if (!e) return document;
  const t = e.getRootNode ? e.getRootNode() : e.ownerDocument;
  return t && /** @type {ShadowRoot} */
  t.host ? (
    /** @type {ShadowRoot} */
    t
  ) : e.ownerDocument;
}
function Wt(e) {
  const t = E("style");
  return t.textContent = "/* empty */", Xt(zt(e), t), t.sheet;
}
function Xt(e, t) {
  return w(
    /** @type {Document} */
    e.head || e,
    t
  ), t.sheet;
}
function v(e, t, n) {
  e.insertBefore(t, n || null);
}
function y(e) {
  e.parentNode && e.parentNode.removeChild(e);
}
function E(e) {
  return document.createElement(e);
}
function T(e) {
  return document.createElementNS("http://www.w3.org/2000/svg", e);
}
function ct(e) {
  return document.createTextNode(e);
}
function q() {
  return ct(" ");
}
function Tt() {
  return ct("");
}
function K(e, t, n, s) {
  return e.addEventListener(t, n, s), () => e.removeEventListener(t, n, s);
}
function et(e) {
  return function(t) {
    return t.preventDefault(), e.call(this, t);
  };
}
function h(e, t, n) {
  n == null ? e.removeAttribute(t) : e.getAttribute(t) !== n && e.setAttribute(t, n);
}
function Yt(e) {
  return Array.from(e.childNodes);
}
function te(e, t) {
  t = "" + t, e.data !== t && (e.data = /** @type {string} */
  t);
}
function Vt(e, t, { bubbles: n = !1, cancelable: s = !1 } = {}) {
  return new CustomEvent(e, { detail: t, bubbles: n, cancelable: s });
}
const W = /* @__PURE__ */ new Map();
let X = 0;
function ee(e) {
  let t = 5381, n = e.length;
  for (; n--; ) t = (t << 5) - t ^ e.charCodeAt(n);
  return t >>> 0;
}
function ne(e, t) {
  const n = { stylesheet: Wt(t), rules: {} };
  return W.set(e, n), n;
}
function gt(e, t, n, s, i, o, c, r = 0) {
  const u = 16.666 / s;
  let l = `{
`;
  for (let p = 0; p <= 1; p += u) {
    const $ = t + (n - t) * o(p);
    l += p * 100 + `%{${c($, 1 - $)}}
`;
  }
  const _ = l + `100% {${c(n, 1 - n)}}
}`, m = `__svelte_${ee(_)}_${r}`, a = zt(e), { stylesheet: f, rules: d } = W.get(a) || ne(a, e);
  d[m] || (d[m] = !0, f.insertRule(`@keyframes ${m} ${_}`, f.cssRules.length));
  const b = e.style.animation || "";
  return e.style.animation = `${b ? `${b}, ` : ""}${m} ${s}ms linear ${i}ms 1 both`, X += 1, m;
}
function se(e, t) {
  const n = (e.style.animation || "").split(", "), s = n.filter(
    t ? (o) => o.indexOf(t) < 0 : (o) => o.indexOf("__svelte") === -1
    // remove all Svelte animations
  ), i = n.length - s.length;
  i && (e.style.animation = s.join(", "), X -= i, X || ie());
}
function ie() {
  ut(() => {
    X || (W.forEach((e) => {
      const { ownerNode: t } = e.stylesheet;
      t && y(t);
    }), W.clear());
  });
}
let U;
function F(e) {
  U = e;
}
function re() {
  if (!U) throw new Error("Function called outside component initialization");
  return U;
}
function oe() {
  const e = re();
  return (t, n, { cancelable: s = !1 } = {}) => {
    const i = e.$$.callbacks[t];
    if (i) {
      const o = Vt(
        /** @type {string} */
        t,
        n,
        { cancelable: s }
      );
      return i.slice().forEach((c) => {
        c.call(e, o);
      }), !o.defaultPrevented;
    }
    return !0;
  };
}
const O = [], pt = [];
let D = [];
const bt = [], le = /* @__PURE__ */ Promise.resolve();
let ot = !1;
function ue() {
  ot || (ot = !0, le.then(Ht));
}
function G(e) {
  D.push(e);
}
const nt = /* @__PURE__ */ new Set();
let A = 0;
function Ht() {
  if (A !== 0)
    return;
  const e = U;
  do {
    try {
      for (; A < O.length; ) {
        const t = O[A];
        A++, F(t), ce(t.$$);
      }
    } catch (t) {
      throw O.length = 0, A = 0, t;
    }
    for (F(null), O.length = 0, A = 0; pt.length; ) pt.pop()();
    for (let t = 0; t < D.length; t += 1) {
      const n = D[t];
      nt.has(n) || (nt.add(n), n());
    }
    D.length = 0;
  } while (O.length);
  for (; bt.length; )
    bt.pop()();
  ot = !1, nt.clear(), F(e);
}
function ce(e) {
  if (e.fragment !== null) {
    e.update(), N(e.before_update);
    const t = e.dirty;
    e.dirty = [-1], e.fragment && e.fragment.p(e.ctx, t), e.after_update.forEach(G);
  }
}
function fe(e) {
  const t = [], n = [];
  D.forEach((s) => e.indexOf(s) === -1 ? t.push(s) : n.push(s)), n.forEach((s) => s()), D = t;
}
let R;
function ae() {
  return R || (R = Promise.resolve(), R.then(() => {
    R = null;
  })), R;
}
function st(e, t, n) {
  e.dispatchEvent(Vt(`${t ? "intro" : "outro"}${n}`));
}
const Q = /* @__PURE__ */ new Set();
let M;
function Zt() {
  M = {
    r: 0,
    c: [],
    p: M
    // parent group
  };
}
function At() {
  M.r || N(M.c), M = M.p;
}
function S(e, t) {
  e && e.i && (Q.delete(e), e.i(t));
}
function V(e, t, n, s) {
  if (e && e.o) {
    if (Q.has(e)) return;
    Q.add(e), M.c.push(() => {
      Q.delete(e), s && (n && e.d(1), s());
    }), e.o(t);
  } else s && s();
}
const de = { duration: 0 };
function wt(e, t, n, s) {
  let o = t(e, n, { direction: "both" }), c = s ? 0 : 1, r = null, u = null, l = null, _;
  function m() {
    l && se(e, l);
  }
  function a(d, b) {
    const p = (
      /** @type {Program['d']} */
      d.b - c
    );
    return b *= Math.abs(p), {
      a: c,
      b: d.b,
      d: p,
      duration: b,
      start: d.start,
      end: d.start + b,
      group: d.group
    };
  }
  function f(d) {
    const {
      delay: b = 0,
      duration: p = 300,
      easing: $ = Et,
      tick: j = k,
      css: H
    } = o || de, Z = {
      start: Kt() + b,
      b: d
    };
    d || (Z.group = M, M.r += 1), "inert" in e && (d ? _ !== void 0 && (e.inert = _) : (_ = /** @type {HTMLElement} */
    e.inert, e.inert = !0)), r || u ? u = Z : (H && (m(), l = gt(e, c, d, p, b, $, H)), d && j(0, 1), r = a(Z, p), G(() => st(e, d, "start")), Qt((z) => {
      if (u && z > u.start && (r = a(u, p), u = null, st(e, r.b, "start"), H && (m(), l = gt(
        e,
        c,
        r.b,
        r.duration,
        0,
        $,
        o.css
      ))), r) {
        if (z >= r.end)
          j(c = r.b, 1 - c), st(e, r.b, "end"), u || (r.b ? m() : --r.group.r || N(r.group.c)), r = null;
        else if (z >= r.start) {
          const P = z - r.start;
          c = r.a + r.d * $(P / r.duration), j(c, 1 - c);
        }
      }
      return !!(r || u);
    }));
  }
  return {
    run(d) {
      lt(o) ? ae().then(() => {
        o = o({ direction: d ? "in" : "out" }), f(d);
      }) : f(d);
    },
    end() {
      m(), r = u = null;
    }
  };
}
function yt(e) {
  return (e == null ? void 0 : e.length) !== void 0 ? e : Array.from(e);
}
function he(e, t) {
  V(e, 1, 1, () => {
    t.delete(e.key);
  });
}
function me(e, t, n, s, i, o, c, r, u, l, _, m) {
  let a = e.length, f = o.length, d = a;
  const b = {};
  for (; d--; ) b[e[d].key] = d;
  const p = [], $ = /* @__PURE__ */ new Map(), j = /* @__PURE__ */ new Map(), H = [];
  for (d = f; d--; ) {
    const g = m(i, o, d), x = n(g);
    let C = c.get(x);
    C ? H.push(() => C.p(g, t)) : (C = l(x, g), C.c()), $.set(x, p[d] = C), x in b && j.set(x, Math.abs(d - b[x]));
  }
  const Z = /* @__PURE__ */ new Set(), z = /* @__PURE__ */ new Set();
  function P(g) {
    S(g, 1), g.m(r, _), c.set(g.key, g), _ = g.first, f--;
  }
  for (; a && f; ) {
    const g = p[f - 1], x = e[a - 1], C = g.key, J = x.key;
    g === x ? (_ = g.first, a--, f--) : $.has(J) ? !c.has(C) || Z.has(C) ? P(g) : z.has(J) ? a-- : j.get(C) > j.get(J) ? (z.add(C), P(g)) : (Z.add(J), a--) : (u(x, c), a--);
  }
  for (; a--; ) {
    const g = e[a];
    $.has(g.key) || u(g, c);
  }
  for (; f; ) P(p[f - 1]);
  return N(H), p;
}
function Bt(e) {
  e && e.c();
}
function ft(e, t, n) {
  const { fragment: s, after_update: i } = e.$$;
  s && s.m(t, n), G(() => {
    const o = e.$$.on_mount.map(Mt).filter(lt);
    e.$$.on_destroy ? e.$$.on_destroy.push(...o) : N(o), e.$$.on_mount = [];
  }), i.forEach(G);
}
function at(e, t) {
  const n = e.$$;
  n.fragment !== null && (fe(n.after_update), N(n.on_destroy), n.fragment && n.fragment.d(t), n.on_destroy = n.fragment = null, n.ctx = []);
}
function _e(e, t) {
  e.$$.dirty[0] === -1 && (O.push(e), ue(), e.$$.dirty.fill(0)), e.$$.dirty[t / 31 | 0] |= 1 << t % 31;
}
function dt(e, t, n, s, i, o, c = null, r = [-1]) {
  const u = U;
  F(e);
  const l = e.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: o,
    update: k,
    not_equal: i,
    bound: _t(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(t.context || (u ? u.$$.context : [])),
    // everything else
    callbacks: _t(),
    dirty: r,
    skip_bound: !1,
    root: t.target || u.$$.root
  };
  c && c(l.root);
  let _ = !1;
  if (l.ctx = n ? n(e, t.props || {}, (m, a, ...f) => {
    const d = f.length ? f[0] : a;
    return l.ctx && i(l.ctx[m], l.ctx[m] = d) && (!l.skip_bound && l.bound[m] && l.bound[m](d), _ && _e(e, m)), a;
  }) : [], l.update(), _ = !0, N(l.before_update), l.fragment = s ? s(l.ctx) : !1, t.target) {
    if (t.hydrate) {
      const m = Yt(t.target);
      l.fragment && l.fragment.l(m), m.forEach(y);
    } else
      l.fragment && l.fragment.c();
    t.intro && S(e.$$.fragment), ft(e, t.target, t.anchor), Ht();
  }
  F(u);
}
class ht {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    tt(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    tt(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    at(this, 1), this.$destroy = k;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(t, n) {
    if (!lt(n))
      return k;
    const s = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return s.push(n), () => {
      const i = s.indexOf(n);
      i !== -1 && s.splice(i, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(t) {
    this.$$set && !Rt(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
}
const ge = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(ge);
const B = [];
function pe(e, t = k) {
  let n;
  const s = /* @__PURE__ */ new Set();
  function i(r) {
    if (Y(e, r) && (e = r, n)) {
      const u = !B.length;
      for (const l of s)
        l[1](), B.push(l, e);
      if (u) {
        for (let l = 0; l < B.length; l += 2)
          B[l][0](B[l + 1]);
        B.length = 0;
      }
    }
  }
  function o(r) {
    i(r(e));
  }
  function c(r, u = k) {
    const l = [r, u];
    return s.add(l), s.size === 1 && (n = t(i, o) || k), r(e), () => {
      s.delete(l), s.size === 0 && n && (n(), n = null);
    };
  }
  return { set: i, update: o, subscribe: c };
}
const mt = pe([]), L = /* @__PURE__ */ new Map(), it = (e) => {
  const t = Math.floor(Math.random() * 1e4), n = {
    id: t,
    dismissible: !0,
    timeout: 3e3,
    ...e
  };
  if (mt.update((s) => [n, ...s]), n.timeout && n.dismissible) {
    const s = setTimeout(() => {
      Ot(t), L.delete(t);
    }, n.timeout);
    L.set(t, s);
  }
}, Ot = (e) => {
  mt.update((t) => t.filter((n) => n.id !== e)), L.has(e) && (clearTimeout(L.get(e)), L.delete(e));
}, rt = {
  error: (e, t) => it({
    ...t,
    type: "error",
    message: e
  }),
  info: (e, t) => it({
    ...t,
    type: "info",
    message: e
  }),
  success: (e, t) => it({
    ...t,
    type: "success",
    message: e
  })
};
function kt(e, { delay: t = 0, duration: n = 400, easing: s = Et } = {}) {
  const i = +getComputedStyle(e).opacity;
  return {
    delay: t,
    duration: n,
    easing: s,
    css: (o) => `opacity: ${o * i}`
  };
}
function be(e) {
  let t, n;
  return {
    c() {
      t = T("svg"), n = T("path"), h(n, "d", "M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"), h(t, "class", "fill-yellow-600"), h(t, "stroke", "currentColor"), h(t, "stroke-width", "0"), h(t, "viewBox", "0 0 24 24"), h(t, "width", "1.3em"), h(t, "xmlns", "http://www.w3.org/2000/svg");
    },
    m(s, i) {
      v(s, t, i), w(t, n);
    },
    d(s) {
      s && y(t);
    }
  };
}
function we(e) {
  let t, n;
  return {
    c() {
      t = T("svg"), n = T("path"), h(n, "d", "M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"), h(t, "class", "fill-red-700"), h(t, "stroke", "currentColor"), h(t, "stroke-width", "0"), h(t, "viewBox", "0 0 24 24"), h(t, "width", "1.3em"), h(t, "xmlns", "http://www.w3.org/2000/svg");
    },
    m(s, i) {
      v(s, t, i), w(t, n);
    },
    d(s) {
      s && y(t);
    }
  };
}
function ye(e) {
  let t, n, s;
  return {
    c() {
      t = T("svg"), n = T("path"), s = T("path"), h(n, "fill", "none"), h(n, "stroke-miterlimit", "10"), h(n, "stroke-width", "32"), h(n, "d", "M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"), h(s, "fill", "none"), h(s, "stroke-linecap", "round"), h(s, "stroke-linejoin", "round"), h(s, "stroke-width", "32"), h(s, "d", "M352 176 217.6 336 160 272"), h(t, "class", "stroke-green-700"), h(t, "fill", "currentColor"), h(t, "stroke-width", "0"), h(t, "viewBox", "0 0 512 512"), h(t, "width", "1.3em"), h(t, "xmlns", "http://www.w3.org/2000/svg");
    },
    m(i, o) {
      v(i, t, o), w(t, n), w(t, s);
    },
    d(i) {
      i && y(t);
    }
  };
}
function vt(e) {
  let t, n, s;
  return {
    c() {
      t = E("button"), t.textContent = "✕", h(t, "class", "m-0 border-none bg-transparent p-0 text-gray-600 hover:opacity-80");
    },
    m(i, o) {
      v(i, t, o), n || (s = K(
        t,
        "click",
        /*click_handler*/
        e[5]
      ), n = !0);
    },
    p: k,
    d(i) {
      i && y(t), n = !1, s();
    }
  };
}
function ke(e) {
  let t, n, s, i, o, c;
  function r(f, d) {
    return (
      /*type*/
      f[0] === "success" ? ye : (
        /*type*/
        f[0] === "error" ? we : be
      )
    );
  }
  let u = r(e), l = u(e);
  const _ = (
    /*#slots*/
    e[4].default
  ), m = Lt(
    _,
    e,
    /*$$scope*/
    e[3],
    null
  );
  let a = (
    /*dismissible*/
    e[1] && vt(e)
  );
  return {
    c() {
      t = E("article"), l.c(), n = q(), s = E("div"), m && m.c(), i = q(), a && a.c(), h(s, "class", "ml-4 mr-auto max-w-72"), h(t, "class", "mb-2 flex w-96 items-center justify-between rounded-md bg-white px-4 py-3 text-black shadow-md"), h(t, "role", "alert");
    },
    m(f, d) {
      v(f, t, d), l.m(t, null), w(t, n), w(t, s), m && m.m(s, null), w(t, i), a && a.m(t, null), c = !0;
    },
    p(f, [d]) {
      u !== (u = r(f)) && (l.d(1), l = u(f), l && (l.c(), l.m(t, n))), m && m.p && (!c || d & /*$$scope*/
      8) && Gt(
        m,
        _,
        f,
        /*$$scope*/
        f[3],
        c ? Ut(
          _,
          /*$$scope*/
          f[3],
          d,
          null
        ) : Jt(
          /*$$scope*/
          f[3]
        ),
        null
      ), /*dismissible*/
      f[1] ? a ? a.p(f, d) : (a = vt(f), a.c(), a.m(t, null)) : a && (a.d(1), a = null);
    },
    i(f) {
      c || (S(m, f), f && G(() => {
        c && (o || (o = wt(t, kt, {}, !0)), o.run(1));
      }), c = !0);
    },
    o(f) {
      V(m, f), f && (o || (o = wt(t, kt, {}, !1)), o.run(0)), c = !1;
    },
    d(f) {
      f && y(t), l.d(), m && m.d(f), a && a.d(), f && o && o.end();
    }
  };
}
function ve(e, t, n) {
  let { $$slots: s = {}, $$scope: i } = t;
  const o = oe();
  let { type: c = "error" } = t, { dismissible: r = !0 } = t;
  const u = () => o("dismiss");
  return e.$$set = (l) => {
    "type" in l && n(0, c = l.type), "dismissible" in l && n(1, r = l.dismissible), "$$scope" in l && n(3, i = l.$$scope);
  }, [c, r, o, i, s, u];
}
class $e extends ht {
  constructor(t) {
    super(), dt(this, t, ve, ke, Y, { type: 0, dismissible: 1 });
  }
}
function $t(e, t, n) {
  const s = e.slice();
  return s[2] = t[n], s;
}
function xt(e) {
  let t, n = [], s = /* @__PURE__ */ new Map(), i, o = yt(
    /*$toasts*/
    e[0]
  );
  const c = (r) => (
    /*toast*/
    r[2].id
  );
  for (let r = 0; r < o.length; r += 1) {
    let u = $t(e, o, r), l = c(u);
    s.set(l, n[r] = Ct(l, u));
  }
  return {
    c() {
      t = E("section");
      for (let r = 0; r < n.length; r += 1)
        n[r].c();
      h(t, "class", "fixed right-0 top-0 z-[1000] mt-4 flex w-0 -translate-x-[50vw] flex-col items-center justify-center");
    },
    m(r, u) {
      v(r, t, u);
      for (let l = 0; l < n.length; l += 1)
        n[l] && n[l].m(t, null);
      i = !0;
    },
    p(r, u) {
      u & /*$toasts*/
      1 && (o = yt(
        /*$toasts*/
        r[0]
      ), Zt(), n = me(n, u, c, 1, r, o, s, t, he, Ct, null, $t), At());
    },
    i(r) {
      if (!i) {
        for (let u = 0; u < o.length; u += 1)
          S(n[u]);
        i = !0;
      }
    },
    o(r) {
      for (let u = 0; u < n.length; u += 1)
        V(n[u]);
      i = !1;
    },
    d(r) {
      r && y(t);
      for (let u = 0; u < n.length; u += 1)
        n[u].d();
    }
  };
}
function xe(e) {
  let t = (
    /*toast*/
    e[2].message + ""
  ), n;
  return {
    c() {
      n = ct(t);
    },
    m(s, i) {
      v(s, n, i);
    },
    p(s, i) {
      i & /*$toasts*/
      1 && t !== (t = /*toast*/
      s[2].message + "") && te(n, t);
    },
    d(s) {
      s && y(n);
    }
  };
}
function Ct(e, t) {
  let n, s, i;
  function o() {
    return (
      /*dismiss_handler*/
      t[1](
        /*toast*/
        t[2]
      )
    );
  }
  return s = new $e({
    props: {
      type: (
        /*toast*/
        t[2].type
      ),
      dismissible: (
        /*toast*/
        t[2].dismissible
      ),
      $$slots: { default: [xe] },
      $$scope: { ctx: t }
    }
  }), s.$on("dismiss", o), {
    key: e,
    first: null,
    c() {
      n = Tt(), Bt(s.$$.fragment), this.first = n;
    },
    m(c, r) {
      v(c, n, r), ft(s, c, r), i = !0;
    },
    p(c, r) {
      t = c;
      const u = {};
      r & /*$toasts*/
      1 && (u.type = /*toast*/
      t[2].type), r & /*$toasts*/
      1 && (u.dismissible = /*toast*/
      t[2].dismissible), r & /*$$scope, $toasts*/
      33 && (u.$$scope = { dirty: r, ctx: t }), s.$set(u);
    },
    i(c) {
      i || (S(s.$$.fragment, c), i = !0);
    },
    o(c) {
      V(s.$$.fragment, c), i = !1;
    },
    d(c) {
      c && y(n), at(s, c);
    }
  };
}
function Ce(e) {
  let t, n, s = (
    /*$toasts*/
    e[0].length && xt(e)
  );
  return {
    c() {
      s && s.c(), t = Tt();
    },
    m(i, o) {
      s && s.m(i, o), v(i, t, o), n = !0;
    },
    p(i, [o]) {
      /*$toasts*/
      i[0].length ? s ? (s.p(i, o), o & /*$toasts*/
      1 && S(s, 1)) : (s = xt(i), s.c(), S(s, 1), s.m(t.parentNode, t)) : s && (Zt(), V(s, 1, 1, () => {
        s = null;
      }), At());
    },
    i(i) {
      n || (S(s), n = !0);
    },
    o(i) {
      V(s), n = !1;
    },
    d(i) {
      i && y(t), s && s.d(i);
    }
  };
}
function Ee(e, t, n) {
  let s;
  return Ft(e, mt, (o) => n(0, s = o)), [s, (o) => Ot(o.id)];
}
class Me extends ht {
  constructor(t) {
    super(), dt(this, t, Ee, Ce, Y, {});
  }
}
function Se(e) {
  let t, n, s, i, o, c, r, u, l, _, m;
  return u = new Me({}), {
    c() {
      t = E("div"), n = E("button"), n.textContent = "generate success toast", s = q(), i = E("button"), i.textContent = "generate error toast", o = q(), c = E("button"), c.textContent = "generate info toast", r = q(), Bt(u.$$.fragment), h(n, "class", "rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"), h(i, "class", "rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"), h(c, "class", "rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"), h(t, "class", "d-flex gap-3 p-2");
    },
    m(a, f) {
      v(a, t, f), w(t, n), w(t, s), w(t, i), w(t, o), w(t, c), v(a, r, f), ft(u, a, f), l = !0, _ || (m = [
        K(n, "click", et(
          /*click_handler*/
          e[3]
        )),
        K(i, "click", et(
          /*click_handler_1*/
          e[4]
        )),
        K(c, "click", et(
          /*click_handler_2*/
          e[5]
        ))
      ], _ = !0);
    },
    p: k,
    i(a) {
      l || (S(u.$$.fragment, a), l = !0);
    },
    o(a) {
      V(u.$$.fragment, a), l = !1;
    },
    d(a) {
      a && (y(t), y(r)), at(u, a), _ = !1, N(m);
    }
  };
}
function Ne(e, t, n) {
  let { success: s } = t, { error: i } = t, { info: o } = t;
  const c = () => rt.success(s), r = () => rt.error(i), u = () => rt.info(o);
  return e.$$set = (l) => {
    "success" in l && n(0, s = l.success), "error" in l && n(1, i = l.error), "info" in l && n(2, o = l.info);
  }, [s, i, o, c, r, u];
}
class je extends ht {
  constructor(t) {
    super(), dt(this, t, Ne, Se, Y, { success: 0, error: 1, info: 2 });
  }
}
function ze(e) {
  let t = document.getElementById("test-root");
  if (t) {
    console.warn("test is already initialized.");
    return;
  }
  t || (t = document.createElement("div"), t.id = "test-root", document.body.appendChild(t));
  try {
    new je({
      target: t,
      props: e
    });
  } catch (n) {
    console.error("Failed to initialize test:", n);
  }
}
function Te() {
  const e = document.getElementById("test-root");
  e && e.remove();
}
window.testStart = ze;
window.testStop = Te;

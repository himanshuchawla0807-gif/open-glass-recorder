import { i as e, s as t, t as n } from "./params-Bw-bnlK0.js";
//#region node_modules/dialkit/dist/vanilla/index.js
function r(e, t = 0, n = 0) {
	return Math.min(100, Math.max(...[
		e,
		t,
		n
	].map((e) => {
		let [t, n = "0"] = String(e).toLowerCase().split("e");
		return Math.max(0, (t.split(".")[1]?.length ?? 0) - Number(n));
	})));
}
function i(e, t, n, r) {
	let i = n ?? -Infinity, a = r ?? Infinity, o = Math.max(i, Math.min(a, e));
	if (o === i || o === a || !Number.isFinite(t) || t <= 0) return o;
	let s = n ?? 0, c = s + Math.round((o - s) / t) * t;
	return Math.max(i, Math.min(a, Number(c.toPrecision(14))));
}
var a = (e, t = 0, n = 1) => Math.max(t, Math.min(n, e)), o = (e) => (e % 360 + 360) % 360, s = (e, t) => e.map((e) => e.reduce((e, n, r) => e + n * t[r], 0)), c = (e) => Math.abs(e) <= .04045 ? e / 12.92 : Math.sign(e) * ((Math.abs(e) + .055) / 1.055) ** 2.4, l = (e) => Math.abs(e) <= .0031308 ? 12.92 * e : Math.sign(e) * (1.055 * Math.abs(e) ** (1 / 2.4) - .055), u = [
	[
		.4123907993,
		.3575843394,
		.1804807884
	],
	[
		.2126390059,
		.7151686788,
		.0721923154
	],
	[
		.0193308187,
		.1191947798,
		.9505321522
	]
], d = [
	[
		.4865709486,
		.2656676932,
		.1982172852
	],
	[
		.2289745641,
		.6917385218,
		.0792869141
	],
	[
		0,
		.0451133819,
		1.0439443689
	]
], f = [
	[
		3.2409699419,
		-1.5373831776,
		-.4986107603
	],
	[
		-.9692436363,
		1.8759675015,
		.0415550574
	],
	[
		.0556300797,
		-.2039769589,
		1.0569715142
	]
], p = [
	[
		2.4934969119,
		-.9313836179,
		-.4027107845
	],
	[
		-.8294889696,
		1.7626640603,
		.0236246858
	],
	[
		.0358458302,
		-.0761723893,
		.956884524
	]
];
function m(e, t = 1, n = "srgb") {
	let [r, i, l] = s([
		[
			.819022438,
			.3619062601,
			-.1288737815
		],
		[
			.0329836539,
			.9292868616,
			.0361446664
		],
		[
			.0481771894,
			.2642395318,
			.6335478285
		]
	], s(n === "p3" ? d : u, e.map(c))).map(Math.cbrt), f = .2104542553 * r + .793617785 * i - .0040720468 * l, p = 1.9779984951 * r - 2.428592205 * i + .4505937099 * l, m = .0259040371 * r + .7827717662 * i - .808675766 * l, h = Math.hypot(p, m);
	return {
		l: a(f),
		c: h < 1e-7 ? 0 : h,
		h: h < 1e-7 ? 0 : o(Math.atan2(m, p) * 180 / Math.PI),
		a: a(t)
	};
}
function h(e, t = "srgb") {
	let n = e.c * Math.cos(e.h * Math.PI / 180), r = e.c * Math.sin(e.h * Math.PI / 180), i = s([
		[
			1.2268798734,
			-.5578149966,
			.2813910502
		],
		[
			-.0405757626,
			1.1122868294,
			-.0717110667
		],
		[
			-.0763729497,
			-.421493324,
			1.5869240244
		]
	], [
		(e.l + .3963377774 * n + .2158037573 * r) ** 3,
		(e.l - .1055613458 * n - .0638541728 * r) ** 3,
		(e.l - .0894841775 * n - 1.291485548 * r) ** 3
	]);
	return s(t === "p3" ? p : f, i).map(l);
}
function g(e, t = "srgb") {
	return h(e, t).every((e) => e >= -1e-5 && e <= 1.00001);
}
function _(e, t = "srgb") {
	if (g(e, t)) return e;
	let n = 0, r = e.c;
	for (let i = 0; i < 20; i++) {
		let i = (n + r) / 2;
		g({
			...e,
			c: i
		}, t) ? n = i : r = i;
	}
	return {
		...e,
		c: n
	};
}
function v(e, t, n = "srgb") {
	return e <= 0 || e >= 1 ? 0 : _({
		l: e,
		c: .5,
		h: t,
		a: 1
	}, n).c;
}
function y(e) {
	return /^oklch\(/i.test(e.trim()) ? "oklch" : /^color\(display-p3\s/i.test(e.trim()) ? "p3" : "hex";
}
var b = (e, t = 4) => Number(e.toFixed(t));
function x(e, t) {
	let n = e.a < 1 ? ` / ${b(e.a)}` : "";
	if (t === "oklch") return `oklch(${b(e.l)} ${b(e.c)} ${b(e.h, 2)}${n})`;
	let r = h(_(e, t === "p3" ? "p3" : "srgb"), t === "p3" ? "p3" : "srgb");
	if (t === "p3") return `color(display-p3 ${r.map((e) => b(a(e), 5)).join(" ")}${n})`;
	let i = r.map((e) => Math.round(a(e) * 255));
	return e.a < 1 && i.push(Math.round(e.a * 255)), "#" + i.map((e) => e.toString(16).padStart(2, "0")).join("");
}
var S = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?(%|deg|grad|rad|turn)?$/i;
function C(e, t = 1, n = !1) {
	let r = e.match(S);
	if (!r) return null;
	let i = parseFloat(e);
	if (!Number.isFinite(i)) return null;
	let a = r[1]?.toLowerCase();
	return n ? a === "rad" ? i * 180 / Math.PI : a === "turn" ? i * 360 : a === "grad" ? i * .9 : !a || a === "deg" ? i : null : a === "%" ? i * t / 100 : a ? null : i;
}
function w(e) {
	let t = e.trim().toLowerCase();
	if (t === "transparent") return {
		l: 0,
		c: 0,
		h: 0,
		a: 0
	};
	if (/^#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/.test(t)) {
		let e = t.slice(1);
		e.length <= 4 && (e = [...e].map((e) => e + e).join(""));
		let n = e.match(/../g).map((e) => parseInt(e, 16) / 255);
		return m(n.slice(0, 3), n[3] ?? 1);
	}
	let n = t.match(/^(oklch|rgb|rgba|hsl|hsla|color)\(([^()]*)\)$/);
	if (!n) return null;
	let r = n[1], i = n[2].trim(), s = r === "color";
	if (s) {
		if (!i.startsWith("display-p3 ")) return null;
		i = i.slice(11).trim();
	}
	let c = i.includes(",");
	if (c && (s || r === "oklch" || i.includes("/"))) return null;
	let l = c ? i.split(",").map((e) => e.trim()) : i.split(/\s*\/\s*/);
	if (!c && l.length > 2) return null;
	let u = c ? l.slice(0, 3) : l[0].split(/\s+/);
	if (u.length !== 3 || c && l.length !== 3 && l.length !== 4 || c && r.startsWith("rgb") && u.some((e) => e.endsWith("%")) && !u.every((e) => e.endsWith("%"))) return null;
	let d = c ? l[3] : l[1], f = d === void 0 ? 1 : C(d);
	if (f === null) return null;
	if (r === "oklch") {
		let e = C(u[0]), t = C(u[1], .4), n = C(u[2], 1, !0);
		return e === null || t === null || n === null ? null : {
			l: a(e),
			c: Math.max(0, t),
			h: o(n),
			a: a(f)
		};
	}
	if (r.startsWith("hsl")) {
		let e = C(u[0], 1, !0), t = C(u[1]), n = C(u[2]);
		if (e === null || t === null || n === null || !u[1].endsWith("%") || !u[2].endsWith("%")) return null;
		let r = a(t), i = a(n), s = r * Math.min(i, 1 - i), c = (t) => {
			let n = (t + o(e) / 30) % 12;
			return i - s * Math.max(-1, Math.min(n - 3, 9 - n, 1));
		};
		return m([
			c(0),
			c(8),
			c(4)
		], f);
	}
	let p = u.map((e) => C(e, s ? 1 : 255));
	return p.some((e) => e === null) ? null : m(p.map((e) => s ? e : a(e / 255)), f, s ? "p3" : "srgb");
}
var T = 6;
function E(e, t, n, r) {
	if (n <= 0 || r <= 0) return;
	let i = Math.round(e / n * T), a = Math.round(t / r * T);
	if (i < 1 || i >= T || a < 1 || a >= T) return;
	let o = {
		x: i / T * n,
		y: a / T * r
	};
	return Math.abs(e - o.x) <= 8 && Math.abs(t - o.y) <= 8 ? o : void 0;
}
function D(e = [
	0,
	-1,
	1,
	.01
]) {
	let [t, n, r, i] = e, a = i ?? (r - n) / 200;
	if (![
		t,
		n,
		r,
		a,
		r - n
	].every(Number.isFinite) || r <= n || a <= 0) throw RangeError("DialPad axes need finite [default, min, max, step?] values, min < max, and a positive step.");
	let o = {
		default: t,
		min: n,
		max: r,
		step: a
	};
	return o.default = O(t, o), o;
}
function O(e, t) {
	if (!Number.isFinite(e)) return t.default;
	let n = Math.max(t.min, Math.min(t.max, e));
	if (n === t.min || n === t.max) return n;
	let r = t.min + Math.round((n - t.min) / t.step) * t.step;
	return Math.max(t.min, Math.min(t.max, Number(r.toPrecision(12))));
}
function k(e, t = {}) {
	let n = {
		x: D(t.x),
		y: D(t.y)
	}, r = typeof e == "object" && e ? e : {};
	return {
		x: typeof r.x == "number" ? O(r.x, n.x) : n.x.default,
		y: typeof r.y == "number" ? O(r.y, n.y) : n.y.default
	};
}
function A(e, t, n = {}) {
	let r = D(n.x), i = D(n.y);
	return {
		x: O(r.min + e * (r.max - r.min), r),
		y: O(i.max - t * (i.max - i.min), i)
	};
}
function j(e, t, n, r = {}) {
	let i = t === "ArrowLeft" || t === "ArrowRight" ? "x" : t === "ArrowUp" || t === "ArrowDown" ? "y" : void 0;
	if (!i) return;
	let a = D(r[i]), o = t === "ArrowRight" || t === "ArrowUp" ? 1 : -1;
	return {
		...e,
		[i]: O(e[i] + o * a.step * (n ? 10 : 1), a)
	};
}
var M = Object.freeze({});
function N(e, t) {
	return te(e, t, "");
}
function ee(e, t) {
	let n = {};
	return typeof t == "object" && t && P(e, t, "", n), n;
}
function te(e, t, n) {
	let r = {};
	for (let [i, a] of Object.entries(e)) {
		if (i === "_collapsed") continue;
		let e = n ? `${n}.${i}` : i;
		F(a) ? r[i] = t[e] ?? I(a) : typeof a == "object" && a && (r[i] = te(a, t, e));
	}
	return r;
}
function P(e, t, n, r) {
	for (let [i, a] of Object.entries(e)) {
		if (i === "_collapsed" || !(i in t)) continue;
		let e = t[i];
		if (e === void 0) continue;
		let o = n ? `${n}.${i}` : i;
		ae(a) || (F(a) ? r[o] = e : typeof a == "object" && a && typeof e == "object" && e && !Array.isArray(e) && P(a, e, o, r));
	}
}
function F(e) {
	return Array.isArray(e) && e.length <= 4 && typeof e[0] == "number" || typeof e == "number" || typeof e == "boolean" || typeof e == "string" || z(e) || B(e) || ae(e) || oe(e) || se(e) || ce(e) || le(e) || ue(e);
}
function I(e) {
	return Array.isArray(e) ? e[0] : oe(e) ? e.default ?? de(e.options) : se(e) ? e.default ?? "#000000" : ce(e) ? e.default ?? de(e.options ?? []) : le(e) ? e.default ?? "" : ue(e) ? k(void 0, e) : e;
}
function L(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function ne(e, t, n) {
	return Object.is(e, t) || n?.type === "pad" && L(e) && L(t) && e.x === t.x && e.y === t.y;
}
function R(e, t) {
	return typeof e == "object" && !!e && "type" in e && e.type === t;
}
function z(e) {
	return R(e, "spring");
}
function B(e) {
	return R(e, "easing");
}
function re(e) {
	return e.replace(/([A-Z])/g, " $1").replace(/^./, (e) => e.toUpperCase()).trim();
}
function ie(e, t) {
	let n = t - e;
	return n <= 1 ? .01 : n <= 10 ? .1 : n <= 100 ? 1 : 10;
}
function ae(e) {
	return R(e, "action");
}
function oe(e) {
	return R(e, "select") && "options" in e && Array.isArray(e.options);
}
function se(e) {
	return R(e, "color");
}
function ce(e) {
	return R(e, "image");
}
function le(e) {
	return R(e, "text");
}
function ue(e) {
	return R(e, "pad");
}
function de(e) {
	let t = e[0];
	return t === void 0 ? "" : typeof t == "string" ? t : t.value;
}
var V = /* @__PURE__ */ new class {
	constructor() {
		this.panelOpenListeners = /* @__PURE__ */ new Set(), this.panelOpenStates = /* @__PURE__ */ new Map(), this.panels = /* @__PURE__ */ new Map(), this.controlsByPanel = /* @__PURE__ */ new WeakMap(), this.panelsSnapshot = [], this.standardPanelsSnapshot = [], this.timelinePanelsSnapshot = [], this.listeners = /* @__PURE__ */ new Map(), this.globalListeners = /* @__PURE__ */ new Set(), this.snapshots = /* @__PURE__ */ new Map(), this.actionListeners = /* @__PURE__ */ new Map(), this.presets = /* @__PURE__ */ new Map(), this.activePreset = /* @__PURE__ */ new Map(), this.baseValues = /* @__PURE__ */ new Map(), this.defaultValues = /* @__PURE__ */ new Map(), this.registrationCounts = /* @__PURE__ */ new Map(), this.retainedPanels = /* @__PURE__ */ new Set(), this.persistConfigs = /* @__PURE__ */ new Map();
	}
	registerPanel(e, t, n, r, i = {}) {
		let { controls: a, controlsByPath: o, defaultValues: s } = this.parseConfig(n, r);
		!this.panelOpenStates.has(e) && i.defaultCollapsed !== void 0 && this.panelOpenStates.set(e, !i.defaultCollapsed);
		let c = this.panels.get(e);
		c && c.kind !== i.kind && console.warn(`[dialkit] Panel id "${e}" cannot be shared by a timeline and a standard panel; the most recent registration controls where it renders.`), this.configurePanelRetention(e, i), this.registrationCounts.set(e, (this.registrationCounts.get(e) ?? 0) + 1);
		let l = this.loadPersistedPanel(e), u = this.panels.get(e)?.values ?? this.snapshots.get(e) ?? l?.values ?? {}, d = this.reconcileValues(s, u, o), f = this.baseValues.get(e) ?? l?.baseValues ?? l?.values ?? {}, p = this.reconcileValues(s, f, o), m = {
			id: e,
			name: t,
			controls: a,
			values: d,
			shortcuts: r ?? {},
			kind: i.kind
		};
		this.panels.set(e, m), this.controlsByPanel.set(m, o), this.snapshots.set(e, { ...d }), this.baseValues.set(e, p), this.defaultValues.set(e, { ...s });
		let h = this.presets.get(e) ?? l?.presets;
		h && this.presets.set(e, this.reconcilePresets(h, s, o)), !this.activePreset.has(e) && l?.activePresetId !== void 0 && this.activePreset.set(e, l.activePresetId), this.persistPanel(e), this.notify(e), this.notifyGlobal();
	}
	updatePanel(e, t, n, r, i = {}) {
		let a = this.panels.get(e);
		if (!a) {
			this.registerPanel(e, t, n, r, i);
			return;
		}
		let { controls: o, controlsByPath: s, defaultValues: c } = this.parseConfig(n, r ?? a.shortcuts);
		this.configurePanelRetention(e, i);
		let l = this.reconcileValues(c, a.values, s), u = {
			id: e,
			name: t,
			controls: o,
			values: l,
			shortcuts: r ?? a.shortcuts,
			kind: i.kind ?? a.kind
		};
		this.panels.set(e, u), this.controlsByPanel.set(u, s), this.snapshots.set(e, { ...l });
		let d = this.baseValues.get(e) ?? {}, f = this.reconcileValues(c, d, s);
		for (let [e, t] of Object.entries(l)) e.endsWith(".__mode") && (f[e] = t);
		this.baseValues.set(e, f), this.defaultValues.set(e, { ...c }), this.presets.set(e, this.reconcilePresets(this.presets.get(e) ?? [], c, s)), this.persistPanel(e), this.notify(e), this.notifyGlobal();
	}
	unregisterPanel(e) {
		let t = (this.registrationCounts.get(e) ?? 1) - 1;
		t > 0 ? this.registrationCounts.set(e, t) : (this.registrationCounts.delete(e), this.panels.delete(e), this.listeners.get(e)?.size === 0 && this.listeners.delete(e), this.actionListeners.get(e)?.size === 0 && this.actionListeners.delete(e), this.retainedPanels.has(e) || (this.panelOpenStates.delete(e), this.snapshots.delete(e), this.baseValues.delete(e), this.defaultValues.delete(e), this.presets.delete(e), this.activePreset.delete(e), this.persistConfigs.delete(e)), this.notifyGlobal());
	}
	getPanelOpen(e) {
		return this.panelOpenStates.get(e);
	}
	isPanelOpen(e) {
		return this.panelOpenStates.get(e) ?? !0;
	}
	togglePanelOpen(e) {
		this.setPanelOpen(e, !this.isPanelOpen(e));
	}
	initPanelOpen(e, t) {
		this.panelOpenStates.has(e) || (this.panelOpenStates.set(e, t), this.notify(e));
	}
	subscribePanelOpen(e) {
		return this.panelOpenListeners.add(e), () => {
			this.panelOpenListeners.delete(e);
		};
	}
	setPanelOpen(e, t) {
		this.panels.has(e) && (this.panelOpenStates.get(e) !== t && (this.panelOpenStates.set(e, t), this.notify(e)), this.panelOpenListeners.forEach((n) => n(e, t)));
	}
	updateValue(e, t, n) {
		this.updateValues(e, { [t]: n });
	}
	updateValues(e, t) {
		let n = this.panels.get(e);
		if (!n) return;
		let r = {}, i = this.activePreset.get(e), a = i ? this.presets.get(e)?.find((e) => e.id === i)?.values : this.baseValues.get(e);
		for (let [e, i] of Object.entries(t)) {
			if (!Object.prototype.hasOwnProperty.call(n.values, e)) continue;
			let t = this.controlsByPanel.get(n)?.get(e);
			if (t?.type === "action") continue;
			let o = t?.type === "pad" ? k(i, t.pad) : i;
			(!ne(n.values[e], o, t) || a && !ne(a[e], o, t)) && (n.values[e] = o, r[e] = o);
		}
		Object.keys(r).length !== 0 && (a && Object.assign(a, r), this.snapshots.set(e, { ...n.values }), this.persistPanel(e), this.notify(e));
	}
	resetValues(e) {
		let t = this.panels.get(e), n = this.defaultValues.get(e);
		t && n && (t.values = { ...n }, this.snapshots.set(e, { ...t.values }), this.baseValues.set(e, { ...n }), this.activePreset.set(e, null), this.persistPanel(e), this.notify(e));
	}
	updateSpringMode(e, t, n) {
		this.updateTransitionMode(e, t, n);
	}
	getSpringMode(e, t) {
		let n = this.getTransitionMode(e, t);
		return n === "easing" ? "simple" : n;
	}
	updateTransitionMode(e, t, n) {
		let r = this.panels.get(e);
		r && r.values[`${t}.__mode`] !== n && (r.values[`${t}.__mode`] = n, this.snapshots.set(e, { ...r.values }), this.persistPanel(e), this.notify(e));
	}
	getTransitionMode(e, t) {
		let n = this.panels.get(e);
		return n && n.values[`${t}.__mode`] || "simple";
	}
	getValue(e, t) {
		return this.panels.get(e)?.values[t];
	}
	getValues(e) {
		return this.snapshots.get(e) ?? M;
	}
	getPanels(e) {
		return e === "panel" ? this.standardPanelsSnapshot : e === "timeline" ? this.timelinePanelsSnapshot : this.panelsSnapshot;
	}
	getPanel(e) {
		return this.panels.get(e);
	}
	subscribe(e, t) {
		return this.listeners.has(e) || this.listeners.set(e, /* @__PURE__ */ new Set()), this.listeners.get(e).add(t), () => {
			let n = this.listeners.get(e);
			n?.delete(t), n?.size === 0 && !this.panels.has(e) && this.listeners.delete(e);
		};
	}
	subscribeGlobal(e) {
		return this.globalListeners.add(e), () => this.globalListeners.delete(e);
	}
	subscribeActions(e, t) {
		return this.actionListeners.has(e) || this.actionListeners.set(e, /* @__PURE__ */ new Set()), this.actionListeners.get(e).add(t), () => {
			let n = this.actionListeners.get(e);
			n?.delete(t), n?.size === 0 && !this.panels.has(e) && this.actionListeners.delete(e);
		};
	}
	triggerAction(e, t) {
		this.actionListeners.get(e)?.forEach((e) => e(t));
	}
	saveNewPreset(e) {
		let t = this.getPresets(e).reduce((e, t) => {
			let n = /^Version (\d+)$/.exec(t.name);
			return n ? Math.max(e, Number(n[1])) : e;
		}, 1);
		return this.savePreset(e, `Version ${t + 1}`);
	}
	savePreset(e, t) {
		let n = this.panels.get(e);
		if (!n) throw Error(`Panel ${e} not found`);
		let r = `preset-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, i = {
			id: r,
			name: t,
			values: { ...n.values }
		}, a = this.presets.get(e) ?? [];
		return this.presets.set(e, [...a, i]), this.activePreset.set(e, r), this.snapshots.set(e, { ...n.values }), this.persistPanel(e), this.notify(e), r;
	}
	loadPreset(e, t) {
		let n = this.panels.get(e);
		if (!n) return;
		let r = (this.presets.get(e) ?? []).find((e) => e.id === t);
		r && (n.values = { ...r.values }, this.snapshots.set(e, { ...n.values }), this.activePreset.set(e, t), this.persistPanel(e), this.notify(e));
	}
	deletePreset(e, t) {
		let n = this.presets.get(e) ?? [];
		this.presets.set(e, n.filter((e) => e.id !== t)), this.activePreset.get(e) === t && this.activePreset.set(e, null);
		let r = this.panels.get(e);
		r && this.snapshots.set(e, { ...r.values }), this.persistPanel(e), this.notify(e);
	}
	getPresets(e) {
		return this.presets.get(e) ?? [];
	}
	getActivePresetId(e) {
		return this.activePreset.get(e) ?? null;
	}
	clearActivePreset(e) {
		let t = this.panels.get(e), n = this.baseValues.get(e);
		t && n && (t.values = { ...n }, this.snapshots.set(e, { ...t.values })), this.activePreset.set(e, null), this.persistPanel(e), this.notify(e);
	}
	resolveShortcutTarget(e, t) {
		for (let n of this.panels.values()) for (let [r, i] of Object.entries(n.shortcuts)) {
			if (!i.key || i.key.toLowerCase() !== e.toLowerCase() || (i.modifier ?? void 0) !== t) continue;
			let a = this.controlsByPanel.get(n)?.get(r);
			if (a) return {
				panelId: n.id,
				path: r,
				control: a
			};
		}
		return null;
	}
	resolveScrollOnlyTargets() {
		let e = [];
		for (let t of this.panels.values()) for (let [n, r] of Object.entries(t.shortcuts)) {
			if ((r.interaction ?? "scroll") !== "scroll-only") continue;
			let i = this.controlsByPanel.get(t)?.get(n);
			i && e.push({
				panelId: t.id,
				path: n,
				control: i,
				shortcut: r
			});
		}
		return e;
	}
	configurePanelRetention(e, t) {
		t.retainOnUnmount && this.retainedPanels.add(e);
		let n = this.normalizePersistConfig(e, t.persist);
		n ? (this.persistConfigs.set(e, n), this.retainedPanels.add(e)) : t.persist === !1 && this.persistConfigs.delete(e);
	}
	reconcileValues(e, t, n) {
		let r = {};
		for (let [i, a] of Object.entries(e)) if (i.endsWith(".__mode")) {
			let e = i.slice(0, -7), o = n.get(e), s = t[i];
			r[i] = o?.type === "transition" && (s === "easing" || s === "simple" || s === "advanced") ? s : a;
		} else r[i] = this.normalizePreservedValue(t[i], a, n.get(i));
		return r;
	}
	reconcilePresets(e, t, n) {
		return e.map((e) => ({
			...e,
			values: this.reconcileValues(t, e.values, n)
		}));
	}
	normalizePersistConfig(e, t) {
		if (!t) return null;
		let n = typeof t == "object" ? t : {};
		return {
			key: n.key ?? `dialkit:${e}`,
			storage: n.storage ?? "localStorage",
			presets: n.presets ?? !0
		};
	}
	loadPersistedPanel(e) {
		let t = this.persistConfigs.get(e);
		if (!t) return null;
		let n = this.getStorage(t.storage);
		if (!n) return null;
		try {
			let e = n.getItem(t.key);
			if (!e) return null;
			let r = JSON.parse(e);
			if (!L(r) || r.version !== 1) return null;
			let i = L(r.values) ? r.values : void 0, a = t.presets && Array.isArray(r.presets) ? r.presets.filter((e) => L(e) && typeof e.id == "string" && typeof e.name == "string" && L(e.values)) : [];
			return {
				version: 1,
				values: i,
				baseValues: t.presets && L(r.baseValues) ? r.baseValues : i,
				presets: a,
				activePresetId: a.some((e) => e.id === r.activePresetId) ? r.activePresetId : null
			};
		} catch {
			return null;
		}
	}
	persistPanel(e) {
		let t = this.persistConfigs.get(e);
		if (!t) return;
		let n = this.getStorage(t.storage);
		if (!n) return;
		let r = this.snapshots.get(e) ?? this.panels.get(e)?.values;
		if (!r) return;
		let i = {
			version: 1,
			values: r
		};
		t.presets && (i.baseValues = this.baseValues.get(e) ?? r, i.presets = this.presets.get(e) ?? [], i.activePresetId = this.activePreset.get(e) ?? null);
		try {
			n.setItem(t.key, JSON.stringify(i));
		} catch {}
	}
	getStorage(e) {
		if (typeof globalThis > "u" || !("window" in globalThis)) return null;
		try {
			return e === "sessionStorage" ? globalThis.window?.sessionStorage ?? null : globalThis.window?.localStorage ?? null;
		} catch {
			return null;
		}
	}
	notify(e) {
		this.listeners.get(e)?.forEach((e) => e());
	}
	notifyGlobal() {
		this.panelsSnapshot = Array.from(this.panels.values()), this.standardPanelsSnapshot = this.panelsSnapshot.filter((e) => e.kind !== "timeline"), this.timelinePanelsSnapshot = this.panelsSnapshot.filter((e) => e.kind === "timeline"), this.globalListeners.forEach((e) => e());
	}
	parseConfig(e, t) {
		let n = {}, r = {}, i = /* @__PURE__ */ new Map(), a = (e, o) => {
			let s = [];
			for (let [c, l] of Object.entries(e)) {
				if (c === "_collapsed") continue;
				let e = o ? `${o}.${c}` : c, u = re(c), d = t?.[e], f;
				if (Array.isArray(l) && l.length <= 4 && typeof l[0] == "number") f = {
					type: "slider",
					path: e,
					label: u,
					min: l[1],
					max: l[2],
					step: l[3] ?? ie(l[1], l[2]),
					shortcut: d
				};
				else if (typeof l == "number") {
					let { min: t, max: n, step: r } = this.inferRange(l);
					f = {
						type: "slider",
						path: e,
						label: u,
						min: t,
						max: n,
						step: r,
						shortcut: d
					};
				} else if (typeof l == "boolean") f = {
					type: "toggle",
					path: e,
					label: u,
					shortcut: d
				};
				else if (z(l) || B(l)) f = {
					type: "transition",
					path: e,
					label: u
				};
				else if (ae(l)) f = {
					type: "action",
					path: e,
					label: l.label || u
				};
				else if (oe(l)) f = {
					type: "select",
					path: e,
					label: u,
					options: l.options
				};
				else if (se(l)) f = {
					type: "color",
					path: e,
					label: u
				};
				else if (ce(l)) f = {
					type: "image",
					path: e,
					label: u,
					options: l.options
				};
				else if (le(l)) f = {
					type: "text",
					path: e,
					label: u,
					placeholder: l.placeholder
				};
				else if (ue(l)) f = {
					type: "pad",
					path: e,
					label: u,
					pad: l
				};
				else if (typeof l == "string") f = w(l) && l !== "transparent" ? {
					type: "color",
					path: e,
					label: u
				} : {
					type: "text",
					path: e,
					label: u
				};
				else if (typeof l == "object" && l) {
					let t = l;
					f = {
						type: "folder",
						path: e,
						label: u,
						defaultOpen: "_collapsed" in t ? !t._collapsed : !0,
						children: a(t, e)
					};
				}
				if (f && (s.push(f), i.set(e, f), f.type !== "folder")) {
					if (n[e] = I(l), B(l)) r[`${e}.__mode`] = "easing";
					else if (z(l)) {
						let t = l.stiffness !== void 0 || l.damping !== void 0 || l.mass !== void 0, n = l.visualDuration !== void 0 || l.bounce !== void 0;
						r[`${e}.__mode`] = t && !n ? "advanced" : "simple";
					}
				}
			}
			return s;
		}, o = a(e, "");
		return Object.assign(n, r), {
			controls: o,
			defaultValues: n,
			controlsByPath: i
		};
	}
	inferRange(e) {
		return e >= 0 && e <= 1 ? {
			min: 0,
			max: 1,
			step: .01
		} : e >= 0 && e <= 10 ? {
			min: 0,
			max: e * 3 || 10,
			step: .1
		} : e >= 0 && e <= 100 ? {
			min: 0,
			max: e * 3 || 100,
			step: 1
		} : e >= 0 ? {
			min: 0,
			max: e * 3 || 1e3,
			step: 10
		} : {
			min: e * 3,
			max: -e * 3,
			step: 1
		};
	}
	normalizePreservedValue(e, t, n) {
		if (e === void 0 || !n) return t;
		switch (n.type) {
			case "slider": {
				if (typeof e != "number" || !Number.isFinite(e) || typeof t != "number") return t;
				let r = n.min ?? -Infinity, a = n.max ?? Infinity, o = Math.min(a, Math.max(r, e));
				return typeof n.step != "number" || n.step <= 0 ? o : i(o, n.step, r, a);
			}
			case "toggle": return typeof e == "boolean" ? e : t;
			case "pad": return k(e, n.pad);
			case "select": {
				if (typeof e != "string") return t;
				let r = n.options ?? [];
				return new Set(r.map((e) => typeof e == "string" ? e : e.value)).has(e) ? e : t;
			}
			case "color":
			case "image":
			case "text": return typeof e == "string" ? e : t;
			case "transition": return z(t) ? z(e) ? e : t : B(t) && B(e) ? e : t;
			case "action": return t;
			default: return t;
		}
	}
}(), fe = 0;
function pe(e, t, n = {}) {
	let r = n.id ?? `vanilla-${e}-${++fe}`, i = t, a = !1, o = /* @__PURE__ */ new Set(), s = {
		retainOnUnmount: n.id !== void 0,
		persist: n.persist,
		defaultCollapsed: n.defaultCollapsed
	}, c = () => N(i, V.getValues(r));
	V.registerPanel(r, e, i, n.shortcuts, s);
	let l = n.onAction ? V.subscribeActions(r, n.onAction) : void 0;
	return {
		id: r,
		get values() {
			return c();
		},
		getValues: c,
		setValue(e, t) {
			a || V.updateValue(r, e, t);
		},
		setValues(e) {
			a || V.updateValues(r, ee(i, e));
		},
		resetValues() {
			a || V.resetValues(r);
		},
		setOpen(e) {
			a || V.setPanelOpen(r, e);
		},
		getOpen() {
			return V.getPanelOpen(r);
		},
		subscribe(e, t = !0) {
			if (a) return () => {};
			let n = V.subscribe(r, () => e(c())), i = () => {
				n(), o.delete(i);
			};
			return o.add(i), t && e(c()), i;
		},
		updateConfig(t) {
			a || (i = t, V.updatePanel(r, e, i, n.shortcuts, s));
		},
		destroy() {
			a || (a = !0, o.forEach((e) => e()), l?.(), V.unregisterPanel(r));
		}
	};
}
function me(e, t) {
	if (!Number.isFinite(e) || e <= 0) return 0;
	Number.isFinite(t) || (t = 0);
	let n = Math.min(Math.max(0, t), e);
	return e - n > 0 ? e - n : e;
}
function he(e, t, n = 0) {
	if (!Number.isFinite(e) || !Number.isFinite(t) || t <= 0) return {
		time: 0,
		wraps: 0
	};
	if (e < t) return {
		time: e,
		wraps: 0
	};
	let r = me(t, n), i = t - r, a = e - i;
	return {
		time: i + a % r,
		wraps: Math.floor(a / r)
	};
}
var ge = Object.freeze({
	time: 0,
	playing: !1,
	duration: 0,
	wraps: 0
}), _e = /* @__PURE__ */ new class {
	constructor() {
		this.timelines = /* @__PURE__ */ new Map(), this.transports = /* @__PURE__ */ new Map(), this.listeners = /* @__PURE__ */ new Map(), this.globalListeners = /* @__PURE__ */ new Set(), this.registrationCounts = /* @__PURE__ */ new Map(), this.listCache = null, this.rafId = null, this.lastTick = 0, this.tick = (e) => {
			let t = Math.max(0, (e - this.lastTick) / 1e3);
			this.lastTick = e;
			let n = !1;
			for (let [e, r] of this.transports) {
				if (!r.playing) continue;
				let i = this.timelines.get(e), a = i?.duration ?? r.duration;
				if (!Number.isFinite(a) || a <= 0) {
					this.transports.set(e, {
						time: 0,
						playing: !1,
						duration: 0,
						wraps: 0
					}), this.notify(e);
					continue;
				}
				let o = r.time + t, s = !0, c = r.wraps;
				if (o >= a) {
					if (i?.loop) {
						let e = he(o, a, i.loopStart);
						o = e.time, c += e.wraps;
					} else o = a, s = !1;
				}
				this.transports.set(e, {
					time: o,
					playing: s,
					duration: a,
					wraps: c
				}), s && (n = !0), this.notify(e);
			}
			this.rafId = n ? window.requestAnimationFrame(this.tick) : null;
		};
	}
	register(e, t) {
		let n = this.timelines.get(e.id);
		n && n.name !== e.name && console.warn(`[dialkit] Timeline id "${e.id}" is already registered by "${n.name}"; "${e.name}" will share and overwrite that transport.`), this.registrationCounts.set(e.id, (this.registrationCounts.get(e.id) ?? 0) + 1), this.applyMeta(e, t.autoplay);
	}
	update(e) {
		this.timelines.has(e.id) && this.applyMeta(e, !1);
	}
	unregister(e) {
		let t = (this.registrationCounts.get(e) ?? 1) - 1;
		t > 0 ? this.registrationCounts.set(e, t) : (this.registrationCounts.delete(e), this.timelines.delete(e), this.transports.delete(e), this.listeners.get(e)?.size === 0 && this.listeners.delete(e), this.listCache = null, this.notifyGlobal());
	}
	play(e) {
		let t = this.transports.get(e);
		if (!t || t.duration <= 0 || t.playing) return;
		let n = t.time >= t.duration;
		this.transports.set(e, {
			...t,
			time: n ? 0 : t.time,
			wraps: n ? 0 : t.wraps,
			playing: !0
		}), this.notify(e), this.ensureLoop();
	}
	pause(e) {
		let t = this.transports.get(e);
		t && t.playing && (this.transports.set(e, {
			...t,
			playing: !1
		}), this.notify(e));
	}
	replay(e) {
		let t = this.transports.get(e);
		!t || t.duration <= 0 || (this.transports.set(e, {
			...t,
			time: 0,
			wraps: 0,
			playing: !0
		}), this.notify(e), this.ensureLoop());
	}
	seek(e, t) {
		let n = this.transports.get(e);
		if (!n || !Number.isFinite(t)) return;
		let r = Math.min(n.duration, Math.max(0, t));
		this.transports.set(e, {
			...n,
			time: r,
			wraps: 0
		}), this.notify(e);
	}
	getTransport(e) {
		return this.transports.get(e) ?? ge;
	}
	getTimeline(e) {
		return this.timelines.get(e);
	}
	getTimelines() {
		return this.listCache ||= Array.from(this.timelines.values()), this.listCache;
	}
	subscribe(e, t) {
		return this.listeners.has(e) || this.listeners.set(e, /* @__PURE__ */ new Set()), this.listeners.get(e).add(t), () => {
			let n = this.listeners.get(e);
			n?.delete(t), n?.size === 0 && !this.timelines.has(e) && this.listeners.delete(e);
		};
	}
	subscribeGlobal(e) {
		return this.globalListeners.add(e), () => {
			this.globalListeners.delete(e);
		};
	}
	applyMeta(e, t) {
		let n = Number.isFinite(e.duration) ? Math.max(0, e.duration) : 0, r = Number.isFinite(e.loopStart) ? Math.min(n, Math.max(0, e.loopStart)) : 0, i = {
			...e,
			duration: n,
			loopStart: r
		};
		this.timelines.set(e.id, i);
		let a = this.transports.get(e.id);
		if (a) this.transports.set(e.id, {
			time: Math.min(a.time, n),
			playing: n > 0 && a.playing,
			duration: n,
			wraps: a.wraps
		});
		else {
			let r = n > 0 && t;
			this.transports.set(e.id, {
				time: 0,
				playing: r,
				duration: n,
				wraps: 0
			}), r && this.ensureLoop();
		}
		this.listCache = null, this.notify(e.id), this.notifyGlobal();
	}
	ensureLoop() {
		this.rafId === null && typeof window < "u" && (this.lastTick = performance.now(), this.rafId = window.requestAnimationFrame(this.tick));
	}
	notify(e) {
		this.listeners.get(e)?.forEach((e) => e());
	}
	notifyGlobal() {
		this.globalListeners.forEach((e) => e());
	}
}(), ve = /* @__PURE__ */ new class {
	constructor() {
		this.visible = !0, this.initialized = !1, this.controllers = /* @__PURE__ */ new Map(), this.listeners = /* @__PURE__ */ new Set();
	}
	getVisible() {
		for (let e of this.controllers.values()) if (e.visible !== void 0) return e.visible;
		return this.visible;
	}
	registerController(e, t) {
		let n = this.getVisible();
		return this.initialized ||= (this.visible = t.defaultVisible, !0), this.controllers.set(e, t), n !== this.getVisible() && this.notify(), () => {
			let t = this.getVisible();
			this.controllers.delete(e), this.controllers.size === 0 && (this.initialized = !1), t !== this.getVisible() && this.notify();
		};
	}
	updateController(e, t) {
		if (!this.controllers.has(e)) return;
		let n = this.getVisible();
		this.controllers.set(e, t), n !== this.getVisible() && this.notify();
	}
	requestVisible(e) {
		if (this.getVisible() === e) return;
		let t = Array.from(this.controllers.values()).filter((e) => e.visible !== void 0);
		t.length > 0 ? t.forEach((t) => t.onVisibilityChange?.(e)) : (this.visible = e, this.controllers.forEach((t) => t.onVisibilityChange?.(e)), this.notify());
	}
	toggle() {
		this.requestVisible(!this.getVisible());
	}
	subscribe(e) {
		return this.listeners.add(e), () => this.listeners.delete(e);
	}
	notify() {
		this.listeners.forEach((e) => e());
	}
}(), ye = 8, be = 42, xe = [
	".dialkit-panel-icon",
	".dialkit-panel-toolbar",
	"button",
	"input",
	"select",
	"textarea",
	"a",
	"[role=\"button\"]",
	"[contenteditable=\"true\"]"
].join(",");
function Se(e, t) {
	if (!(e instanceof Element) || !t) return null;
	let n = e.closest(".dialkit-panel-inner");
	if (!n || !t.contains(n)) return null;
	if (n.getAttribute("data-collapsed") === "true") return n;
	let r = e.closest(".dialkit-panel-header");
	return !r || !n.contains(r) || e.closest(xe) ? null : r;
}
function Ce(e, t, n) {
	let r = n.getBoundingClientRect();
	return {
		pointerX: e,
		pointerY: t,
		elX: r.left,
		elY: r.top
	};
}
function we(e, t, n) {
	return {
		x: e.elX + t - e.pointerX,
		y: e.elY + n - e.pointerY
	};
}
function Te(e, t, n) {
	let r = t - e.pointerX, i = n - e.pointerY;
	return Math.hypot(r, i) >= ye;
}
function Ee(e, t, n = typeof window < "u" ? window.innerWidth : void 0) {
	return t && n ? t.x + be / 2 < n / 2 ? "left" : "right" : e.endsWith("left") ? "left" : "right";
}
function De(e, t, n = typeof window < "u" ? window.innerHeight : void 0) {
	return t && n ? t.y + be / 2 < n / 2 ? "top" : "bottom" : e.startsWith("bottom") ? "bottom" : "top";
}
function Oe(e, t, n = typeof window < "u" ? window.innerWidth : void 0, r = typeof window < "u" ? window.innerHeight : void 0) {
	return `${De(e, t, r)}-${Ee(e, t, n)}`;
}
function ke(e) {
	let t = (e) => {
		e.preventDefault(), e.stopImmediatePropagation(), e.stopPropagation();
	};
	e.addEventListener("click", t, {
		capture: !0,
		once: !0
	}), window.setTimeout(() => {
		e.removeEventListener("click", t, !0);
	}, 0);
}
function Ae(e, t) {
	try {
		e.setPointerCapture(t);
	} catch (e) {
		if (!(e instanceof DOMException) || !["NotFoundError", "InvalidStateError"].includes(e.name)) throw e;
	}
}
function je(e, t) {
	try {
		e.hasPointerCapture(t) && e.releasePointerCapture(t);
	} catch (e) {
		if (!(e instanceof DOMException) || !["NotFoundError", "InvalidStateError"].includes(e.name)) throw e;
	}
}
function Me(e, t, n) {
	let r = JSON.stringify(Object.fromEntries(Object.entries(n).filter(([e]) => !e.endsWith(".__mode"))), null, 2);
	return e === "useDialTimeline" || e === "createDialTimeline" ? `Update the ${e} configuration for "${t}" with these values:

\`\`\`json
${r}
\`\`\`

Apply these values as the new defaults in the ${e} call. Keep the existing \`clip.current\` bindings while this timeline is being authored; do not convert the animation or remove DialKit yet.

Add this comment immediately above the ${e} call as a production handoff note:

\`\`\`tsx
// TODO(production): DialKit's clip.current values are the scrubbable authoring preview.
// Replace them with equivalent real Motion animations using the tuned timeline
// timings and transitions, then remove ${e} and <DialTimeline />.
\`\`\`` : `Update the ${e} configuration for "${t}" with these values:

\`\`\`json
${r}
\`\`\`

Apply these values as the new defaults in the ${e} call.`;
}
var Ne = "M6 9.5L12 15.5L18 9.5", Pe = "M6 6L18 18M18 6L6 18", Fe = "M5 12.75L10 19L19 5", H = {
	board: {
		board: "M8 6C8 4.34315 9.34315 3 11 3H13C14.6569 3 16 4.34315 16 6V7H8V6Z",
		sparkle: "M19.2405 16.1852L18.5436 14.3733C18.4571 14.1484 18.241 14 18 14C17.759 14 17.5429 14.1484 17.4564 14.3733L16.7595 16.1852C16.658 16.4493 16.4493 16.658 16.1852 16.7595L14.3733 17.4564C14.1484 17.5429 14 17.759 14 18C14 18.241 14.1484 18.4571 14.3733 18.5436L16.1852 19.2405C16.4493 19.342 16.658 19.5507 16.7595 19.8148L17.4564 21.6267C17.5429 21.8516 17.759 22 18 22C18.241 22 18.4571 21.8516 18.5436 21.6267L19.2405 19.8148C19.342 19.5507 19.5507 19.342 19.8148 19.2405L21.6267 18.5436C21.8516 18.4571 22 18.241 22 18C22 17.759 21.8516 17.5429 21.6267 17.4564L19.8148 16.7595C19.5507 16.658 19.342 16.4493 19.2405 16.1852Z",
		body: "M16 5H17C18.6569 5 20 6.34315 20 8V11M8 5H7C5.34315 5 4 6.34315 4 8V18C4 19.6569 5.34315 21 7 21H12"
	}.board,
	body: "M16 5H17C18.6569 5 20 6.34315 20 8V18C20 19.6569 18.6569 21 17 21H7C5.34315 21 4 19.6569 4 18V8C4 6.34315 5.34315 5 7 5H8"
}, Ie = ["M5 12H19M12 5V19"], Le = [
	"M5 6.5L5.80734 18.2064C5.91582 19.7794 7.22348 21 8.80023 21H15.1998C16.7765 21 18.0842 19.7794 18.1927 18.2064L19 6.5",
	"M10 11V16",
	"M14 11V16",
	"M3.5 6H20.5",
	"M8.07092 5.74621C8.42348 3.89745 10.0485 2.5 12 2.5C13.9515 2.5 15.5765 3.89745 15.9291 5.74621"
], Re = {
	path: "M6.84766 11.75C6.78583 11.9899 6.75 12.2408 6.75 12.5C6.75 12.7592 6.78583 13.0101 6.84766 13.25H2C1.58579 13.25 1.25 12.9142 1.25 12.5C1.25 12.0858 1.58579 11.75 2 11.75H6.84766ZM14 11.75C14.4142 11.75 14.75 12.0858 14.75 12.5C14.75 12.9142 14.4142 13.25 14 13.25H12.6523C12.7142 13.0101 12.75 12.7592 12.75 12.5C12.75 12.2408 12.7142 11.9899 12.6523 11.75H14ZM3.09766 7.25C3.03583 7.48994 3 7.74075 3 8C3 8.25925 3.03583 8.51006 3.09766 8.75H2C1.58579 8.75 1.25 8.41421 1.25 8C1.25 7.58579 1.58579 7.25 2 7.25H3.09766ZM14 7.25C14.4142 7.25 14.75 7.58579 14.75 8C14.75 8.41421 14.4142 8.75 14 8.75H8.90234C8.96417 8.51006 9 8.25925 9 8C9 7.74075 8.96417 7.48994 8.90234 7.25H14ZM7.59766 2.75C7.53583 2.98994 7.5 3.24075 7.5 3.5C7.5 3.75925 7.53583 4.01006 7.59766 4.25H2C1.58579 4.25 1.25 3.91421 1.25 3.5C1.25 3.08579 1.58579 2.75 2 2.75H7.59766ZM14 2.75C14.4142 2.75 14.75 3.08579 14.75 3.5C14.75 3.91421 14.4142 4.25 14 4.25H13.4023C13.4642 4.01006 13.5 3.75925 13.5 3.5C13.5 3.24075 13.4642 2.98994 13.4023 2.75H14Z",
	circles: [
		{
			cx: "6",
			cy: "8",
			r: "0.998596"
		},
		{
			cx: "10.4999",
			cy: "3.5",
			r: "0.998657"
		},
		{
			cx: "9.75015",
			cy: "12.5",
			r: "0.997986"
		}
	]
};
function U(e, t, n = {}) {
	let { dropdownHeight: r = 0, gap: i = 4, allowAbove: a = !0 } = n, o = e.getBoundingClientRect(), s = t.getBoundingClientRect(), c = window.visualViewport, l = c?.offsetTop ?? 0, u = c?.offsetLeft ?? 0, d = c?.height ?? window.innerHeight, f = c?.width ?? window.innerWidth, p = Math.max(0, l + d - o.bottom - i - 8), m = Math.max(0, o.top - l - i - 8), h = a && p < r && m > p, g = Math.min(n.maxHeight ?? 320, h ? m : p), _ = Math.min(r, g), v = Math.min(n.width ?? o.width, Math.max(0, f - 16)), y = Math.max(u + 8, Math.min(o.left, u + f - v - 8)), b = Math.max(l + 8, h ? o.top - _ - i : o.bottom + i);
	if (n.preferSide) {
		let t = e.closest(".dialkit-panel-inner")?.getBoundingClientRect() ?? o, a = t.left - v - i, s = t.right + i;
		a >= u + 8 ? y = a : s + v <= u + f - 8 && (y = s), g = Math.min(n.maxHeight ?? 480, d - 16), b = Math.max(l + 8, Math.min(o.top - 32, l + d - Math.min(r, g) - 8));
	}
	return {
		top: n.fixed ? b : b - s.top + t.scrollTop - t.clientTop,
		left: n.fixed ? y : y - s.left + t.scrollLeft - t.clientLeft,
		width: v,
		above: h,
		maxHeight: g
	};
}
function ze(e, t, n) {
	let r = 0, i = !1, a = "", o = () => {
		if (i) return;
		let s = n?.();
		s?.isConnected && s.style.position === "fixed" && typeof s.showPopover == "function" && !s.matches(":popover-open") && (s.setAttribute("popover", "manual"), s.showPopover());
		let c = e.getBoundingClientRect(), l = W(e)?.getBoundingClientRect(), u = window.visualViewport, d = [
			c.x,
			c.y,
			c.width,
			c.height,
			l?.x,
			l?.y,
			n?.()?.scrollHeight,
			window.innerWidth,
			window.innerHeight,
			u?.height,
			u?.offsetTop,
			u?.offsetLeft
		].join(",");
		d !== a && (a = d, t()), i || (r = requestAnimationFrame(o));
	};
	return o(), window.addEventListener("scroll", t, !0), () => {
		i = !0, cancelAnimationFrame(r), window.removeEventListener("scroll", t, !0);
	};
}
function W(e) {
	return e?.closest(".dialkit-root") ?? null;
}
function Be(e, t, n, r, i, a = !1) {
	if (e === "Home") return n;
	if (e === "End") return r;
	let o = [
		"ArrowRight",
		"ArrowUp",
		"PageUp"
	].includes(e) ? 1 : [
		"ArrowLeft",
		"ArrowDown",
		"PageDown"
	].includes(e) ? -1 : 0;
	if (!o) return;
	if (!(i > 0) || r <= n) return n;
	let s = e.startsWith("Page") || a ? 10 : 1, c = (t - n) / i, l = n + (o > 0 ? Math.floor(c + 1e-9) + s : Math.ceil(c - 1e-9) - s) * i;
	return Math.max(n, Math.min(r, Number(l.toPrecision(14))));
}
function Ve(e, t, n, r, i, a, o) {
	if (e.target !== e.currentTarget || e.altKey || e.metaKey || e.ctrlKey) return;
	let s = Be(e.key, t, n, r, i, e.shiftKey);
	(s !== void 0 || e.key === "Enter") && (e.preventDefault(), e.stopPropagation(), s === void 0 ? o() : a(s));
}
function He(e, t) {
	e.target === e.currentTarget && ["Enter", " "].includes(e.key) && (e.preventDefault(), e.stopPropagation(), t());
}
function Ue(e, t, n, r = !1) {
	if (!n) return;
	if (e === "Home") return 0;
	if (e === "End") return n - 1;
	let i = ["ArrowRight", "ArrowDown"].includes(e) ? 1 : ["ArrowLeft", "ArrowUp"].includes(e) ? -1 : 0;
	if (i) return r ? (t + i + n) % n : Math.max(0, Math.min(n - 1, t + i));
}
function We(e) {
	if (e.altKey || e.metaKey || e.ctrlKey) return;
	let t = e.currentTarget, n = Array.from(t.querySelectorAll(".dialkit-segmented-button:not(:disabled)")), r = Ue(e.key, n.indexOf(e.target), n.length, !0);
	r !== void 0 && (e.preventDefault(), e.stopPropagation(), n[r].focus({ preventScroll: !0 }), n[r].click());
}
var Ge = 0;
function Ke(e) {
	if (e.hasAttribute("aria-label") || e.hasAttribute("aria-labelledby")) return;
	let t = e.closest(".dialkit-labeled-control")?.querySelector(".dialkit-labeled-control-label");
	t ? (t.id ||= `dialkit-segment-label-${++Ge}`, e.setAttribute("aria-labelledby", t.id)) : e.setAttribute("aria-label", "Options");
}
function qe(e, t) {
	!["ArrowDown", "ArrowUp"].includes(e.key) || e.altKey || e.metaKey || e.ctrlKey || (e.preventDefault(), e.stopPropagation(), t());
}
function Je(e, t = !1) {
	let n = Array.from(e.ownerDocument.querySelectorAll("a[href], button, input, select, textarea, [tabindex], [contenteditable=\"true\"]")).filter((t) => t === e || t.tabIndex >= 0 && !t.matches(":disabled") && t.getClientRects().length > 0 && getComputedStyle(t).visibility !== "hidden" && !t.closest("[inert], [aria-hidden=\"true\"], .dialkit-select-dropdown, .dialkit-preset-dropdown, .dialkit-shortcuts-dropdown, .dialkit-color-popover")), r = n.indexOf(e);
	return r < 0 ? void 0 : n[r + (t ? -1 : 1)];
}
function G(e, t, n) {
	let r = document.createElement(e);
	return r.className = t, n && (r.textContent = n), r instanceof HTMLButtonElement && (r.type = "button"), r;
}
function Ye(e, t, n = "popover") {
	let r = n === "inline", i = t, o = w(i.value) ?? {
		l: 0,
		c: 0,
		h: 0,
		a: 1
	}, s = y(i.value), c, l, u, d = 0, f = () => {}, p = G("div", "dialkit-color-control"), m = G("span", "dialkit-color-label"), g = G("div", "dialkit-color-inputs"), b = G("input", "dialkit-color-value");
	b.type = "text", b.spellcheck = !1, b.autocomplete = "off";
	let S = G("button", "dialkit-color-swatch");
	S.setAttribute("aria-haspopup", "dialog"), S.setAttribute("aria-expanded", "false"), g.append(b, S), p.append(m, g), e.append(p), r && (p.style.display = "none");
	let C = () => {
		m.textContent = i.label, b.setAttribute("aria-label", `${i.label} color value`), document.activeElement !== b && (b.value = i.value), b.title = i.value, S.style.setProperty("--dial-color", i.value), S.setAttribute("aria-label", `Pick ${i.label.toLowerCase()} color`), f();
	}, T = (e, t = s) => {
		s = t, o = s === "oklch" ? e : _(e, s === "p3" ? "p3" : "srgb");
		let n = x(o, s);
		c = n, i = {
			...i,
			value: n
		}, C(), i.onChange(n);
	}, E = (e) => {
		let t = w(e.value);
		if (!t) return e.setAttribute("aria-invalid", "true"), e.title = "Enter a hex, RGB, HSL, OKLCH, or Display P3 color", !1;
		e.removeAttribute("aria-invalid"), o = t, s = y(e.value);
		let n = e.value.trim();
		return c = n, i = {
			...i,
			value: n
		}, C(), i.onChange(n), !0;
	};
	b.addEventListener("change", () => E(b)), b.addEventListener("blur", () => {
		b.getAttribute("aria-invalid") && (b.value = i.value, b.removeAttribute("aria-invalid"));
	}), b.addEventListener("keydown", (e) => {
		e.key === "Enter" && E(b) && b.blur(), e.key === "Escape" && (b.value = i.value, b.removeAttribute("aria-invalid"), b.blur()), e.stopPropagation();
	});
	let D = (e = !1) => {
		u?.(), u = void 0, cancelAnimationFrame(d), l?.remove(), l = void 0, f = () => {}, delete p.dataset.open, S.setAttribute("aria-expanded", "false"), document.removeEventListener("pointerdown", O), document.removeEventListener("focusin", k), e && S.focus({ preventScroll: !0 });
	}, O = (e) => {
		!l?.contains(e.target) && !p.contains(e.target) && D();
	}, k = (e) => {
		!l?.contains(e.target) && !p.contains(e.target) && D();
	}, A = () => {
		if (l) {
			r || D();
			return;
		}
		let t = r ? e : W(e) ?? e;
		l = G("div", "dialkit-color-popover"), l.dataset.presentation = n, l.style.position = r ? "static" : "fixed", l.setAttribute("role", r ? "group" : "dialog"), l.setAttribute("aria-label", `${i.label} color picker`);
		let c = G("div", "dialkit-color-plane");
		c.setAttribute("role", "group"), c.setAttribute("aria-label", "Color field; use arrow keys to adjust saturation and lightness"), c.tabIndex = 0;
		let m = G("canvas", "dialkit-color-canvas");
		m.width = 252, m.height = 160, m.setAttribute("aria-hidden", "true");
		let g = G("span", "dialkit-color-marker");
		g.setAttribute("aria-hidden", "true"), c.append(m, g);
		let _ = G("div", "dialkit-color-tracks");
		function y(e, t, n, r) {
			let i = G("label", "dialkit-color-track-row"), a = G("span", "", e), o = G("input", `dialkit-color-track ${r}`);
			return o.type = "range", o.min = "0", o.max = String(t), o.step = String(n), o.setAttribute("aria-label", e), i.append(a, o), _.append(i), o;
		}
		let b = y("Hue", 360, .1, "dialkit-color-hue"), C = y("Opacity", 100, 1, "dialkit-color-opacity");
		b.addEventListener("input", () => {
			let e = Number(b.value);
			T({
				...o,
				h: e,
				c: F * v(o.l, e, I())
			});
		}), C.addEventListener("input", () => T({
			...o,
			a: Number(C.value) / 100
		}));
		let w = G("div", "dialkit-labeled-control dialkit-color-format-row"), A = G("div", "dialkit-segmented dialkit-color-formats");
		w.append(A), A.setAttribute("role", "radiogroup"), A.addEventListener("keydown", We), A.setAttribute("aria-label", "Color format");
		let j = G("div", "dialkit-segmented-pill");
		j.setAttribute("aria-hidden", "true"), A.append(j);
		let M = [
			"hex",
			"oklch",
			"p3"
		].map((e) => {
			let t = G("button", "dialkit-segmented-button dialkit-color-format", e === "p3" ? "Display P3" : e === "hex" ? "Hex" : "OKLCH");
			return t.type = "button", t.setAttribute("role", "radio"), t.addEventListener("click", () => T(o, e)), A.append(t), t;
		}), N = G("input", "dialkit-color-css-input");
		N.type = "text", N.spellcheck = !1, N.setAttribute("aria-label", "CSS color"), N.addEventListener("change", () => E(N)), N.addEventListener("keydown", (e) => {
			e.key === "Enter" && (e.preventDefault(), E(N));
		});
		let ee = -1, te = "", P = "", F = 0, I = () => s === "hex" ? "srgb" : "p3", L = m.getContext("2d", { colorSpace: "display-p3" }), ne = L?.getContextAttributes?.().colorSpace === "display-p3" ? "p3" : "srgb", R = () => {
			if (!L) return;
			let e = I();
			if (ee === o.h && te === e) return;
			ee = o.h, te = e;
			let t = L.createImageData(m.width, m.height);
			for (let n = 0; n < m.height; n++) {
				let r = 1 - n / (m.height - 1), i = v(r, o.h, e);
				for (let e = 0; e < m.width; e++) {
					let s = h({
						l: r,
						c: e / (m.width - 1) * i,
						h: o.h,
						a: 1
					}, ne), c = (n * m.width + e) * 4;
					s.forEach((e, n) => {
						t.data[c + n] = Math.round(a(e) * 255);
					}), t.data[c + 3] = 255;
				}
			}
			L.putImageData(t, 0, 0);
		};
		f = () => {
			l?.setAttribute("aria-label", `${i.label} color picker`);
			let e = v(o.l, o.h, I());
			e > 0 && (F = a(o.c / e)), g.style.left = `${F * 100}%`, g.style.top = `${(1 - o.l) * 100}%`, g.style.background = x({
				...o,
				a: 1
			}, "oklch"), b.value = String(o.h), C.value = String(o.a * 100), b.setAttribute("aria-valuetext", `${Math.round(o.h)} degrees`), C.setAttribute("aria-valuetext", `${Math.round(o.a * 100)} percent`);
			let t = `${o.l.toFixed(5)}:${F.toFixed(5)}:${I()}`;
			if (t !== P) {
				P = t;
				let e = Array.from({ length: 73 }, (e, t) => {
					let n = t * 5;
					return x({
						l: o.l,
						c: F * v(o.l, n, I()),
						h: n,
						a: 1
					}, "oklch");
				});
				b.style.setProperty("--dial-color-track-bg", `linear-gradient(to right in oklab, ${e.join(", ")})`);
			}
			b.style.setProperty("--dial-color-thumb", x({
				...o,
				a: 1
			}, "oklch")), C.style.setProperty("--dial-color-thumb", x(o, "oklch")), C.style.setProperty("--dial-color-opaque", x({
				...o,
				a: 1
			}, "oklch")), M.forEach((e, t) => {
				let n = [
					"hex",
					"oklch",
					"p3"
				][t] === s;
				e.setAttribute("aria-checked", String(n)), e.tabIndex = n ? 0 : -1, e.dataset.active = String(n), n && (j.style.transform = `translateX(${t * 100}%)`);
			}), document.activeElement !== N && (N.value = i.value, N.removeAttribute("aria-invalid")), N.title = i.value, cancelAnimationFrame(d), d = requestAnimationFrame(R);
		};
		let z = (e) => {
			let t = c.getBoundingClientRect(), n = 1 - a((e.clientY - t.top) / t.height);
			F = a((e.clientX - t.left) / t.width), T({
				...o,
				l: n,
				c: F * v(n, o.h, I())
			});
		};
		c.addEventListener("pointerdown", (e) => {
			e.button === 0 && (e.preventDefault(), c.focus({ preventScroll: !0 }), c.setPointerCapture(e.pointerId), z(e));
		}), c.addEventListener("keydown", (e) => {
			if (![
				"ArrowUp",
				"ArrowDown",
				"ArrowLeft",
				"ArrowRight"
			].includes(e.key)) return;
			e.preventDefault();
			let t = e.shiftKey ? .1 : .01, n = a(o.l + (e.key === "ArrowUp" ? t : e.key === "ArrowDown" ? -t : 0));
			F = a(F + (e.key === "ArrowRight" ? t : e.key === "ArrowLeft" ? -t : 0)), T({
				...o,
				l: n,
				c: F * v(n, o.h, I())
			});
		}), c.addEventListener("pointermove", (e) => {
			c.hasPointerCapture(e.pointerId) && z(e);
		}), c.addEventListener("pointerup", (e) => {
			c.hasPointerCapture(e.pointerId) && c.releasePointerCapture(e.pointerId);
		}), l.addEventListener("keydown", (e) => {
			if (!r) {
				if (e.key === "Escape" && (e.preventDefault(), D(!0)), e.key === "Tab") {
					let t = M.find((e) => e.tabIndex === 0);
					(e.shiftKey && document.activeElement === t || !e.shiftKey && document.activeElement === N) && (S.focus({ preventScroll: !0 }), D());
				}
				e.stopPropagation();
			}
		}), l.append(w, c, _, N), t.append(l), f(), !r && (u = ze(p, () => {
			if (!l) return;
			if (!e.isConnected || p.getClientRects().length === 0) {
				D();
				return;
			}
			let n = U(p, t, {
				dropdownHeight: l.scrollHeight + 2,
				width: 280,
				maxHeight: 480,
				preferSide: !0,
				fixed: !0,
				gap: 8
			});
			Object.assign(l.style, {
				left: `${n.left}px`,
				top: `${n.top}px`,
				width: `${n.width}px`,
				maxHeight: `${n.maxHeight}px`,
				transformOrigin: n.above ? "bottom" : "top"
			});
		}, () => l), p.dataset.open = "true", S.setAttribute("aria-expanded", "true"), document.addEventListener("pointerdown", O), document.addEventListener("focusin", k), M.find((e) => e.getAttribute("aria-checked") === "true")?.focus({ preventScroll: !0 }));
	};
	return S.addEventListener("click", A), C(), r && A(), {
		update(e) {
			let t = w(e.value);
			t && e.value !== c && e.value !== i.value && (o = {
				...t,
				h: t.c < 1e-7 ? o.h : t.h
			}, s = y(e.value)), i = e, C();
		},
		destroy() {
			D(), p.remove();
		}
	};
}
var Xe = 0, Ze = 10485760;
function K(e, t, n) {
	let r = document.createElement(e);
	return r.className = t, n && (r.textContent = n), e === "button" && (r.type = "button"), r;
}
function Qe(e) {
	let t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	t.setAttribute("viewBox", "0 0 24 24"), t.setAttribute("fill", "none"), t.setAttribute("stroke", "currentColor"), t.setAttribute("stroke-width", "1.5"), t.setAttribute("stroke-linecap", "round"), t.setAttribute("stroke-linejoin", "round"), t.setAttribute("aria-hidden", "true");
	let n = document.createElementNS(t.namespaceURI, "path");
	return n.setAttribute("d", e === "upload" ? "M12 16V3m-4 4 4-4 4 4M4 15v5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5" : "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm-2 13 5-5 4 4 3-3 6 6M15 7h.01"), t.append(n), t;
}
function $e(e) {
	if (!e) return "No image";
	if (e.startsWith("data:") || e.startsWith("blob:")) return "Uploaded image";
	let t = e.split(/[?#]/)[0].split("/").filter(Boolean).pop();
	try {
		return t ? decodeURIComponent(t) : "Image";
	} catch {
		return t || "Image";
	}
}
function et(e = [], t = [], n = "") {
	let r = /* @__PURE__ */ new Map();
	for (let n of [...e, ...t]) {
		let e = typeof n == "string" ? {
			value: n,
			label: $e(n)
		} : n;
		e.value && !r.has(e.value) && r.set(e.value, e);
	}
	return n && !r.has(n) && r.set(n, {
		value: n,
		label: $e(n)
	}), [...r.values()];
}
function tt(e) {
	let t = K("span", `dialkit-image-frame ${e}`), n = K("span", "dialkit-image-fallback");
	n.append(Qe("image"));
	let r = K("img", "dialkit-image-img");
	r.alt = "", r.draggable = !1, r.decoding = "async", r.hidden = !0, t.append(n, r);
	let i;
	return r.addEventListener("load", () => {
		r.hidden = !1, n.hidden = !0, t.removeAttribute("title");
	}), r.addEventListener("error", () => {
		r.hidden = !0, n.hidden = !1, t.title = "Image unavailable";
	}), {
		frame: t,
		update(e) {
			e !== i && (i = e, r.hidden = !0, n.hidden = !1, t.removeAttribute("title"), e ? r.src = e : r.removeAttribute("src"));
		}
	};
}
function nt(e, t, n = "popover") {
	let r = n === "inline", i = t, a = [], o, s, c = () => {}, l = () => {}, u, d = 0, f = `dialkit-image-picker-${++Xe}`, p = K("button", "dialkit-image-control"), m = K("span", "dialkit-image-label"), h = K("span", "dialkit-image-value"), g = tt("dialkit-image-thumbnail");
	p.setAttribute("aria-haspopup", "dialog"), p.setAttribute("aria-expanded", "false"), p.append(m, h, g.frame);
	let _ = K("input", "dialkit-image-file");
	_.type = "file", _.accept = "image/*", _.hidden = !0, e.append(p, _), r && (p.style.display = "none");
	let v = () => et(i.options, a, i.value), y = () => {
		m.textContent = i.label, h.textContent = v().find((e) => e.value === i.value)?.label ?? "No image", p.setAttribute("aria-label", `Choose ${i.label.toLowerCase()} image: ${h.textContent}`), g.update(i.value), c();
	}, b = (e) => {
		i = {
			...i,
			value: e
		}, y(), i.onChange(e);
	}, x = (e = !1) => {
		d++, u?.abort(), u = void 0, _.onchange = null, s?.(), s = void 0, o?.remove(), o = void 0, c = () => {}, l = () => {}, delete p.dataset.open, p.setAttribute("aria-expanded", "false"), p.removeAttribute("aria-controls"), document.removeEventListener("pointerdown", S), document.removeEventListener("focusin", C), e && p.focus({ preventScroll: !0 });
	}, S = (t) => {
		!o?.contains(t.target) && !e.contains(t.target) && x();
	}, C = (t) => {
		!o?.contains(t.target) && !e.contains(t.target) && x();
	}, w = () => {
		if (o) {
			r || x();
			return;
		}
		let t = r ? e : W(e) ?? e;
		o = K("div", "dialkit-image-popover"), o.dataset.presentation = n, o.style.position = r ? "static" : "fixed", o.id = f, o.setAttribute("role", r ? "group" : "dialog");
		let m = K("div", "dialkit-image-heading"), h = K("span", "dialkit-image-title"), g = K("button", "dialkit-image-clear", "Remove");
		g.addEventListener("click", () => {
			b(""), r || x(!0);
		}), m.append(h, g);
		let w = K("div", "dialkit-image-grid");
		w.setAttribute("role", "group"), w.setAttribute("aria-label", "Available images");
		let T = K("div", "dialkit-image-empty", "Choose an image to get started."), E = K("button", "dialkit-button dialkit-image-upload"), D = K("span", "", "Upload image");
		E.append(Qe("upload"), D);
		let O = K("div", "dialkit-image-status");
		O.setAttribute("role", "status"), O.hidden = !0, E.addEventListener("click", () => {
			j || _.click();
		});
		let k = [], A = [], j = !1, M = (e) => {
			j = e, E.setAttribute("aria-disabled", String(e)), D.textContent = e ? "Loading image…" : "Upload image", w.setAttribute("aria-busy", String(e));
		};
		l = () => {
			d++, u?.abort(), u = void 0, M(!1), O.hidden = !0;
		};
		let N = (e) => {
			if (j) return;
			if (O.hidden = !0, !e.type.startsWith("image/") || e.size > Ze) {
				O.textContent = e.size > Ze ? "Choose an image smaller than 10 MB." : "Choose an image file, such as PNG, JPG, WebP, GIF, or SVG.", O.hidden = !1;
				return;
			}
			let t = ++d;
			M(!0);
			let n = () => {
				t === d && (M(!1), O.textContent = "This image could not be opened. Try another file.", O.hidden = !1);
			};
			u = new FileReader(), u.addEventListener("error", n), u.addEventListener("load", () => {
				if (t !== d) return;
				let r = u?.result;
				if (u = void 0, typeof r != "string") {
					n();
					return;
				}
				let i = new Image();
				i.onerror = n, i.onload = () => {
					t === d && (M(!1), a.some((e) => e.value === r) || a.push({
						value: r,
						label: e.name
					}), b(r), k.find((e) => e.getAttribute("aria-pressed") === "true")?.focus({ preventScroll: !0 }));
				}, i.src = r;
			}), u.readAsDataURL(e);
		};
		_.onchange = () => {
			let e = _.files?.[0];
			_.value = "", e && N(e);
		}, o.addEventListener("dragover", (e) => {
			e.dataTransfer?.types.includes("Files") && (e.preventDefault(), e.dataTransfer.dropEffect = "copy", o.dataset.dragging = "true");
		}), o.addEventListener("dragleave", (e) => {
			o?.contains(e.relatedTarget) || delete o.dataset.dragging;
		}), o.addEventListener("drop", (e) => {
			e.preventDefault(), delete o.dataset.dragging;
			let t = e.dataTransfer?.files[0];
			t && N(t);
		}), w.addEventListener("keydown", (e) => {
			if (e.metaKey || e.ctrlKey || e.altKey) return;
			let t = k.indexOf(document.activeElement);
			if (t < 0) return;
			let n = getComputedStyle(w).gridTemplateColumns.split(" ").length, r = e.key === "ArrowRight" ? t + 1 : e.key === "ArrowLeft" ? t - 1 : e.key === "ArrowDown" ? t + n : e.key === "ArrowUp" ? t - n : e.key === "Home" ? 0 : e.key === "End" ? k.length - 1 : void 0;
			if (r === void 0) return;
			e.preventDefault();
			let i = k[Math.max(0, Math.min(k.length - 1, r))];
			k.forEach((e) => {
				e.tabIndex = e === i ? 0 : -1;
			}), i.focus({ preventScroll: !0 }), i.scrollIntoView({ block: "nearest" });
		}), o.addEventListener("keydown", (e) => {
			if (!r && (e.stopPropagation(), e.key === "Escape" && (e.preventDefault(), x(!0)), e.key === "Tab")) {
				let t = g.hidden ? k.find((e) => e.tabIndex === 0) ?? E : g;
				if (e.shiftKey && document.activeElement === t || !e.shiftKey && document.activeElement === E) {
					let t = Je(p, e.shiftKey);
					x(!0), t && (e.preventDefault(), t.focus());
				}
			}
		}), c = () => {
			o?.setAttribute("aria-label", `${i.label} image picker`), h.textContent = i.label, g.hidden = !i.value, g.setAttribute("aria-label", `Remove ${i.label.toLowerCase()} image`);
			let e = v();
			if (T.hidden = e.length > 0, w.hidden = e.length === 0, e.length !== A.length || e.some((e, t) => e.value !== A[t].value || e.label !== A[t].label)) {
				let t = k.indexOf(document.activeElement);
				A = e, k = e.map((e) => {
					let t = K("button", "dialkit-image-option");
					t.setAttribute("aria-label", e.label), t.title = e.label;
					let n = tt("dialkit-image-option-preview");
					return n.update(e.value), t.append(n.frame), t.addEventListener("click", () => {
						l(), b(e.value);
					}), t;
				}), w.replaceChildren(...k), t >= 0 && k[Math.min(t, k.length - 1)]?.focus({ preventScroll: !0 });
			}
			let t = e.findIndex((e) => e.value === i.value);
			k.forEach((e, n) => {
				e.setAttribute("aria-pressed", String(n === t)), e.tabIndex = n === Math.max(0, t) ? 0 : -1;
			});
		}, o.append(m, w, T, E, O), t.append(o), y(), r || (s = ze(p, () => {
			if (!o) return;
			if (!e.isConnected || p.getClientRects().length === 0) {
				x();
				return;
			}
			let n = U(p, t, {
				dropdownHeight: o.scrollHeight + 2,
				width: 320,
				maxHeight: 560,
				preferSide: !0,
				fixed: !0,
				gap: 8
			});
			Object.assign(o.style, {
				left: `${n.left}px`,
				top: `${n.top}px`,
				width: `${n.width}px`,
				maxHeight: `${n.maxHeight}px`,
				transformOrigin: n.above ? "bottom" : "top"
			});
		}, () => o), p.dataset.open = "true", p.setAttribute("aria-expanded", "true"), p.setAttribute("aria-controls", f), document.addEventListener("pointerdown", S), document.addEventListener("focusin", C), (k.find((e) => e.tabIndex === 0) ?? E).focus({ preventScroll: !0 }));
	};
	return p.addEventListener("click", w), p.addEventListener("keydown", (e) => {
		e.stopPropagation(), e.key === "Escape" && (e.preventDefault(), x()), e.key === "ArrowDown" && !o && (e.preventDefault(), w());
	}), y(), r && w(), {
		update(e) {
			e.value !== i.value && l(), i = e, y();
		},
		destroy() {
			x(), _.onchange = null, p.remove(), _.remove();
		}
	};
}
var rt = 0;
function q(e, t, n) {
	let r = document.createElement(e);
	return r.className = t, n && (r.textContent = n), r;
}
function it(e, t) {
	let n = t, r = k(n.value, n), i, a = q("div", "dialkit-pad"), o = q("div", "dialkit-pad-fields"), s = q("div", "dialkit-pad-caption"), c = q("span", "dialkit-pad-label");
	s.append(c), o.append(s);
	let l = q("div", "dialkit-pad-surface");
	l.tabIndex = 0, l.setAttribute("role", "group");
	let u = q("div", "dialkit-pad-plane");
	u.setAttribute("aria-hidden", "true");
	let d = q("div", "dialkit-pad-grid");
	d.setAttribute("aria-hidden", "true");
	for (let e = 1; e < T; e++) {
		let t = q("span", "dialkit-pad-grid-line dialkit-pad-grid-vertical"), n = q("span", "dialkit-pad-grid-line dialkit-pad-grid-horizontal");
		t.style.left = `${e / T * 100}%`, n.style.top = `${e / T * 100}%`, d.append(t, n);
	}
	let f = q("span", "dialkit-pad-center"), p = q("span", "dialkit-pad-point");
	u.append(f, p), l.append(d, u);
	let m = q("span", "dialkit-pad-instructions", "Arrow keys adjust each axis. Shift adjusts by ten steps. Home resets both axes. Hold Shift while dragging to lock an axis.");
	m.id = `dialkit-pad-help-${++rt}`, l.setAttribute("aria-describedby", m.id);
	let h = ["x", "y"].map((e) => {
		let t = q("label", "dialkit-pad-field"), i = q("span", "dialkit-pad-axis"), a = q("input", "dialkit-pad-value");
		return a.type = "text", a.inputMode = "decimal", a.autocomplete = "off", a.spellcheck = !1, a.setAttribute("role", "spinbutton"), t.append(i, a), o.append(t), a.addEventListener("focus", () => a.select()), a.addEventListener("blur", () => {
			let t = a.value.trim() === "" ? NaN : Number(a.value);
			Number.isFinite(t) && _({
				...r,
				[e]: t
			}), a.value = String(r[e]);
		}), a.addEventListener("keydown", (t) => {
			if (t.stopPropagation(), t.key === "Enter" || t.key === "Escape") t.preventDefault(), t.key === "Escape" && (a.value = String(r[e])), a.blur(), l.focus({ preventScroll: !0 });
			else if (!t.altKey && !t.metaKey && !t.ctrlKey && ["ArrowUp", "ArrowDown"].includes(t.key)) {
				t.preventDefault();
				let i = D(n[e]), o = a.value.trim() === "" ? NaN : Number(a.value), s = Number.isFinite(o) ? o : r[e], c = t.key === "ArrowUp" ? 1 : -1;
				_({
					...r,
					[e]: O(s + c * i.step * (t.shiftKey ? 10 : 1), i)
				}), a.value = String(r[e]);
			}
		}), {
			axis: e,
			name: i,
			input: a
		};
	});
	a.append(o, l, m), e.append(a);
	function g() {
		c.textContent = n.label, c.title = n.label;
		let e = {
			x: n.labels?.x ?? "X",
			y: n.labels?.y ?? "Y"
		};
		l.setAttribute("aria-label", `${n.label}: ${e.x} ${r.x}, ${e.y} ${r.y}`), h.forEach(({ axis: t, name: i, input: a }) => {
			let o = D(n[t]);
			i.textContent = e[t], i.title = e[t], a.setAttribute("aria-label", `${n.label} ${e[t]}`), a.setAttribute("aria-valuemin", String(o.min)), a.setAttribute("aria-valuemax", String(o.max)), a.setAttribute("aria-valuenow", String(r[t])), document.activeElement !== a && (a.value = String(r[t]));
			let s = (r[t] - o.min) / (o.max - o.min);
			p.style[t === "x" ? "left" : "top"] = `${(t === "x" ? s : 1 - s) * 100}%`;
		});
	}
	function _(e) {
		let t = k(e, n);
		(t.x !== r.x || t.y !== r.y) && (r = t, g(), n.onChange({ ...r }));
	}
	function v() {
		let e = i?.id;
		i = void 0, delete l.dataset.dragging, e !== void 0 && l.hasPointerCapture(e) && l.releasePointerCapture(e);
	}
	function y(e, t = !1) {
		if (!i || e.pointerId !== i.id) return;
		Math.max(Math.abs(e.clientX - i.start.x), Math.abs(e.clientY - i.start.y)) >= 3 && (i.moved = !0, l.dataset.dragging = "true");
		let a = u.getBoundingClientRect();
		if (!a.width || !a.height) return;
		let o = e.clientX - i.offset.x, s = e.clientY - i.offset.y;
		if (t && !i.moved && !e.shiftKey) {
			let t = d.getBoundingClientRect(), n = E(e.clientX - t.left, e.clientY - t.top, t.width, t.height);
			n && (o = t.left + n.x, s = t.top + n.y);
		}
		let c = A((o - a.left) / a.width, (s - a.top) / a.height, n);
		if (e.shiftKey) {
			if (!i.lock) {
				let t = Math.abs(e.clientX - i.start.x), n = Math.abs(e.clientY - i.start.y);
				if (Math.max(t, n) < 3) return;
				i.lock = t >= n ? "x" : "y", i.lockValue = { ...r };
			}
			let t = i.lock === "x" ? "y" : "x";
			c[t] = i.lockValue[t];
		} else i.lock = void 0, i.lockValue = void 0;
		_(c);
	}
	return l.addEventListener("dblclick", () => _(k(void 0, n))), l.addEventListener("pointerdown", (e) => {
		if (e.button !== 0 || i) return;
		e.preventDefault(), l.focus({ preventScroll: !0 });
		let t = p.getBoundingClientRect(), n = e.target === p;
		i = {
			id: e.pointerId,
			start: {
				x: e.clientX,
				y: e.clientY
			},
			value: { ...r },
			offset: n ? {
				x: e.clientX - t.left - t.width / 2,
				y: e.clientY - t.top - t.height / 2
			} : {
				x: 0,
				y: 0
			},
			moved: !1
		}, l.setPointerCapture(e.pointerId), y(e);
	}), l.addEventListener("pointermove", y), l.addEventListener("pointerup", (e) => {
		e.pointerId === i?.id && (y(e, !0), v());
	}), l.addEventListener("pointercancel", (e) => {
		e.pointerId === i?.id && v();
	}), l.addEventListener("lostpointercapture", (e) => {
		e.pointerId === i?.id && v();
	}), l.addEventListener("keydown", (e) => {
		if (e.altKey || e.metaKey || e.ctrlKey) return;
		let t = j(r, e.key, e.shiftKey, n);
		if (t || e.key === "Home" || e.key === "Escape" && i) {
			if (e.preventDefault(), e.stopPropagation(), t) _(t);
			else if (e.key === "Home") v(), _(k(void 0, n));
			else if (i) {
				let e = i.value;
				v(), _(e);
			}
		}
	}), g(), {
		update(e) {
			n = e, r = k(e.value, n), g();
		},
		destroy() {
			v(), a.remove();
		}
	};
}
function at(e, t) {
	let n = e.min ?? 0, r = (e.max ?? 1) - n, i = t.mode ?? "normal";
	return i === "fine" ? r * .01 : i === "coarse" ? r * .1 : e.step ?? 1;
}
function ot(e, t, n, r, a) {
	let o = V.getValue(e, t), s = n.min ?? 0, c = n.max ?? 1, l = Math.max(s, Math.min(c, o + a * r));
	V.updateValue(e, t, i(l, r, s, c));
}
function st(e, t, n) {
	let r = (e - t) / (n - t), i = Math.round(r * 10) / 10;
	return Math.abs(r - i) <= .03125 ? t + i * (n - t) : e;
}
function ct() {
	let e = document.activeElement;
	if (!e) return !1;
	let t = e.tagName;
	return !!(t === "INPUT" || t === "TEXTAREA" || e.closest("select, button, [role=\"slider\"], [role=\"radio\"], [role=\"listbox\"], [role=\"menu\"], [role=\"menuitem\"], [role=\"menuitemradio\"], [role=\"button\"]") || e.contentEditable === "true");
}
function J(e) {
	if (e.altKey) return "alt";
	if (e.shiftKey) return "shift";
	if (e.metaKey) return "meta";
}
var lt = 4;
function ut(e) {
	switch (e) {
		case "drag": return "Drag";
		case "move": return "Move";
		case "scroll-only": return "Scroll";
		default: return "Scroll";
	}
}
function dt(e) {
	let t = ut(e.interaction ?? "scroll");
	return e.key ? `${pt(e.modifier)}${e.key.toUpperCase()}+${t}` : t;
}
function ft(e) {
	return e.key ? `${pt(e.modifier)}${e.key.toUpperCase()}` : "Press";
}
function pt(e) {
	return e === "alt" ? "⌥" : e === "shift" ? "⇧" : e === "meta" ? "⌘" : "";
}
function mt(e) {
	let t = e.parentElement, n = e.ownerDocument.createElement("textarea");
	n.className = e.className, n.rows = 1, n.tabIndex = -1, n.readOnly = !0, n.inert = !0, n.setAttribute("aria-hidden", "true"), Object.assign(n.style, {
		position: "absolute",
		visibility: "hidden",
		pointerEvents: "none",
		top: "0",
		left: "0",
		height: "0",
		minHeight: "0",
		maxHeight: "none",
		overflow: "hidden",
		transition: "none"
	}), t.append(n);
	let r = 0, i = 0, a = !1, o = () => {
		if (a || !e.isConnected || !e.offsetWidth) return;
		let r = getComputedStyle(e), i = parseFloat(r.lineHeight), o = parseFloat(r.paddingTop) + parseFloat(r.paddingBottom), s = parseFloat(r.borderTopWidth) + parseFloat(r.borderBottomWidth), c = Math.max(0, e.offsetWidth - e.clientWidth - s);
		t.style.setProperty("--dial-text-gutter", `${c}px`), n.style.width = r.width, n.value = e.value || e.placeholder;
		let l = i + o + s, u = i * 5 + o + s, d = n.scrollHeight + s, f = Math.max(l, Math.min(u, d));
		e.style.height = `${f}px`, e.style.overflowY = d > u ? "auto" : "hidden", d <= u && (e.scrollTop = 0);
		let p = getComputedStyle(t), m = parseFloat(p.paddingTop) + parseFloat(p.paddingBottom) + parseFloat(p.borderTopWidth) + parseFloat(p.borderBottomWidth);
		t.style.height = `${f + m}px`, t.hasAttribute("data-autosized") || (t.offsetHeight, t.setAttribute("data-autosized", "true"));
	}, s = () => {
		cancelAnimationFrame(r), r = requestAnimationFrame(o);
	}, c = new ResizeObserver(() => {
		e.offsetWidth !== i && (i = e.offsetWidth, s());
	});
	return c.observe(e), e.addEventListener("input", o), e.ownerDocument.fonts?.addEventListener("loadingdone", s), o(), {
		update: o,
		destroy() {
			a = !0, cancelAnimationFrame(r), c.disconnect(), e.removeEventListener("input", o), e.ownerDocument.fonts?.removeEventListener("loadingdone", s), n.remove(), t.removeAttribute("data-autosized"), t.style.removeProperty("height"), t.style.removeProperty("--dial-text-gutter");
		}
	};
}
function ht(e) {
	let t = e.parentElement;
	if (!t) return e.offsetHeight;
	let n = getComputedStyle(t), r = n.boxSizing === "border-box" ? [
		n.paddingTop,
		n.paddingBottom,
		n.borderTopWidth,
		n.borderBottomWidth
	].reduce((e, t) => e + (parseFloat(t) || 0), 0) : 0;
	return e.offsetHeight + r;
}
function gt(e) {
	let t = e.firstElementChild;
	if (!t) return () => {};
	let n = () => {
		e.style.setProperty("--dial-panel-header-height", `${t.offsetHeight}px`);
	}, r = new ResizeObserver(n);
	return r.observe(t), n(), () => {
		r.disconnect(), e.style.removeProperty("--dial-panel-header-height");
	};
}
var Y = /* @__PURE__ */ new WeakMap();
function _t(e) {
	for (let t of [e.content, e.toolbar]) t.style.display = e.open ? "" : "none", t.style.removeProperty("height"), t.inert = !e.open;
}
function vt(e, t) {
	let n = e.querySelector(":scope > .dialkit-folder-content"), r = e.querySelector(":scope > .dialkit-folder-header > .dialkit-panel-section-toolbar-clip"), i = t, a = null;
	return _t({
		content: n,
		toolbar: r,
		open: i
	}), {
		setOpen(t) {
			if (t === i) return;
			if (i = t, a = e.closest(".dialkit-panel-inner"), !a) {
				_t({
					content: n,
					toolbar: r,
					open: i
				});
				return;
			}
			let o = a.querySelector(":scope > .dialkit-folder-root"), s = a.closest(".dialkit-panel"), c = a.classList.contains("dialkit-panel-inline"), l = Y.get(a);
			l || (l = {
				sections: /* @__PURE__ */ new Map(),
				frame: 0
			}, Y.set(a, l)), cancelAnimationFrame(l.frame);
			let u = parseFloat(getComputedStyle(a).height), d = a.scrollTop, f = l.sections.get(e) ?? {
				content: n,
				toolbar: r,
				open: i,
				fromContent: 0,
				toContent: 0,
				fromToolbar: 0,
				toToolbar: 0
			};
			f.open = i, l.sections.set(e, f);
			for (let e of l.sections.values()) {
				e.fromContent = e.content.offsetHeight, e.fromToolbar = e.toolbar.offsetHeight;
				for (let [t, n] of [[e.content, e.fromContent], [e.toolbar, e.fromToolbar]]) t.style.height = `${n}px`, t.style.display = "", t.inert = !e.open;
				e.toContent = e.open ? e.content.firstElementChild.offsetHeight : 0, e.toToolbar = e.open ? e.toolbar.firstElementChild.offsetHeight : 0;
			}
			let p = ht(o) + [...l.sections.values()].reduce((e, t) => e + t.toContent - t.fromContent + t.toToolbar - t.fromToolbar, 0), m = [window.innerHeight - 32, parseFloat(getComputedStyle(a).maxHeight)];
			s && m.push(parseFloat(getComputedStyle(s).maxHeight));
			let h = Math.min(p, ...m.filter(Number.isFinite)), g = Math.min(d, Math.max(0, p - h)), _ = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 260, v = performance.now(), y = a, b = l, x = y.parentElement;
			y.setAttribute("data-folding", "true");
			let S = (e) => {
				let t = _ === 0 ? 1 : Math.min(1, Math.max(0, (e - v) / _)), n = 1 - (1 - t) ** 3;
				for (let e of b.sections.values()) e.content.style.height = `${e.fromContent + (e.toContent - e.fromContent) * n}px`, e.toolbar.style.height = `${e.fromToolbar + (e.toToolbar - e.fromToolbar) * n}px`;
				if (c || (x.style.setProperty("--dial-panel-fold-height", `${u + (h - u) * n}px`), y.scrollTop = d + (g - d) * n), t < 1) b.frame = requestAnimationFrame(S);
				else {
					for (let e of b.sections.values()) _t(e);
					b.sections.clear(), b.frame = requestAnimationFrame(() => {
						!c && y.dataset.collapsed !== "true" && (y.style.height = `${h}px`), y.removeAttribute("data-folding"), x.style.removeProperty("--dial-panel-fold-height"), Y.delete(y);
					});
				}
			};
			S(v);
		},
		destroy() {
			if (!a) return;
			let t = Y.get(a);
			t?.sections.delete(e), t && t.sections.size === 0 && (cancelAnimationFrame(t.frame), a.removeAttribute("data-folding"), a.parentElement?.style.removeProperty("--dial-panel-fold-height"), Y.delete(a));
		}
	};
}
function X(e, t = "", n) {
	let r = document.createElement(e);
	return r.className = t, n !== void 0 && (r.textContent = n), e === "button" && (r.type = "button"), r;
}
function Z(e, t = {}) {
	let n = document.createElementNS("http://www.w3.org/2000/svg", e);
	for (let [e, r] of Object.entries(t)) n.setAttribute(e, String(r));
	return n;
}
function Q(e, t = "", n = "0 0 24 24") {
	let r = Z("svg", {
		class: t,
		viewBox: n,
		fill: "none",
		stroke: "currentColor",
		"stroke-width": 2,
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"aria-hidden": "true"
	});
	for (let t of typeof e == "string" ? [e] : e) r.append(Z("path", { d: t }));
	return r;
}
function yt(e, t, n) {
	let r = X("button", "dialkit-toolbar-add");
	return r.title = e, r.setAttribute("aria-label", e), r.append(Q(t)), r.addEventListener("click", n), r;
}
function bt(e) {
	return Math.round(e * 100) / 100;
}
function xt(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
function St(e) {
	return e.type === "spring" && (e.stiffness !== void 0 || e.damping !== void 0 || e.mass !== void 0);
}
function Ct(e) {
	if (St(e)) return {
		stiffness: e.stiffness ?? 200,
		damping: e.damping ?? 25,
		mass: e.mass ?? 1
	};
	let t = Math.max(.05, e.visualDuration ?? .3), n = e.bounce ?? .3, r = 2 * Math.PI / (t * 1.2), i = r * r;
	return {
		stiffness: i,
		damping: 2 * Math.min(1, Math.max(.05, 1 - n)) * Math.sqrt(i),
		mass: 1
	};
}
function wt(e, { stiffness: t, damping: n, mass: r }) {
	if (e <= 0) return 0;
	let i = Math.sqrt(t / r), a = n / (2 * Math.sqrt(t * r));
	if (a < .9999) {
		let t = i * Math.sqrt(1 - a * a);
		return 1 - Math.exp(-a * i * e) * (Math.cos(t * e) + a * i / t * Math.sin(t * e));
	}
	if (a < 1.0001) return 1 - Math.exp(-i * e) * (1 + i * e);
	let o = i * Math.sqrt(a * a - 1), s = -a * i + o, c = -a * i - o;
	return 1 + (c * Math.exp(s * e) - s * Math.exp(c * e)) / (s - c);
}
function Tt(e) {
	let t = Math.sqrt(e.stiffness / e.mass), n = e.damping / (2 * Math.sqrt(e.stiffness * e.mass)), r = n >= 1 ? n * t - t * Math.sqrt(Math.max(0, n * n - 1)) : n * t;
	return bt(xt(Math.log(200) / Math.max(r, 1e-6), .05, 10));
}
function Et(e, t, n = .35, r = .1) {
	if (typeof e.animate != "function" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
	let i = Ct({
		type: "spring",
		visualDuration: n,
		bounce: r
	}), a = Tt(i), o = Math.max(2, Math.ceil(a * 60)), s = Array.from({ length: o + 1 }, (e, n) => t(n === o ? 1 : wt(n / o * a, i)));
	return e.animate(s, {
		duration: a * 1e3,
		easing: "linear"
	});
}
function Dt(e, t) {
	let n = t, r = n.open ?? n.defaultOpen ?? !0, i = X("div", `dialkit-folder${n.isRoot ? " dialkit-folder-root" : n.isSection ? " dialkit-folder-section" : ""}`), a = X("div", `dialkit-folder-header${n.isRoot ? " dialkit-panel-header" : ""}`), o = X("div", "dialkit-folder-header-top"), s = X("div", "dialkit-folder-title-row"), c = X("span", `dialkit-folder-title${n.isRoot ? " dialkit-folder-title-root" : ""}`);
	s.append(c), o.append(s);
	let l = n.isRoot ? Z("svg", {
		class: "dialkit-panel-icon",
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true"
	}) : Q(Ne, "dialkit-folder-icon");
	(!n.inline || !n.isRoot) && o.append(l);
	let u = X("div", n.isRoot ? "dialkit-panel-toolbar" : "dialkit-panel-section-toolbar");
	if (u.addEventListener("click", (e) => e.stopPropagation()), a.append(o), n.isSection) {
		let e = X("div", "dialkit-panel-section-toolbar-clip");
		e.append(u), a.append(e);
	} else n.isRoot && a.append(u);
	let d = X("div", "dialkit-folder-content"), f = X("div", "dialkit-folder-inner");
	d.append(f), i.append(a, d);
	let p = n.isRoot ? X("div", `dialkit-panel-inner${n.inline ? " dialkit-panel-inline" : ""}`) : i;
	n.isRoot && (p.tabIndex = -1, p.append(i)), e.append(p);
	let m = r, h, g, _ = () => {
		let e = m !== r, t = (n.isRoot ? p : d).getBoundingClientRect();
		e && h?.cancel();
		let a = m;
		if (m = r, i.dataset.open = String(r), c.textContent = n.title, o.setAttribute("aria-label", n.title), o.setAttribute("aria-expanded", String(r)), n.inline && n.isRoot || (o.setAttribute("role", "button"), o.tabIndex = 0), n.isSection || (d.style.display = r ? "" : "none", d.inert = !r, u.style.display = r ? "" : "none"), n.isRoot ? (l.setAttribute("viewBox", r ? "0 0 24 24" : "0 0 16 16"), l.replaceChildren(), r ? l.append(Z("path", {
			d: Pe,
			stroke: "currentColor",
			"stroke-width": 2,
			"stroke-linecap": "round"
		})) : (l.append(Z("path", {
			d: Re.path,
			fill: "currentColor",
			opacity: .5
		})), Re.circles.forEach((e) => l.append(Z("circle", {
			...e,
			fill: "currentColor",
			stroke: "currentColor",
			"stroke-width": 1.25
		})))), s.style.display = r ? "" : "none", p.dataset.collapsed = String(!r), n.inline || Object.assign(p.style, r ? {
			width: "280px",
			height: "auto",
			maxHeight: "calc(100dvh - 32px)",
			borderRadius: "14px",
			boxShadow: "var(--dial-shadow)",
			overflowX: "hidden",
			overflowY: "auto",
			cursor: ""
		} : {
			width: "42px",
			height: "42px",
			maxHeight: "42px",
			borderRadius: "50%",
			boxShadow: "var(--dial-shadow-collapsed)",
			overflow: "hidden",
			cursor: "pointer"
		})) : (l.style.transform = r ? "rotate(180deg)" : "", l.style.transition = "transform 250ms ease"), e && t.width > 0) {
			if (n.isRoot && !n.inline) {
				let e = p.getBoundingClientRect();
				p.style.maxHeight = "calc(100dvh - 32px)", h = Et(p, (n) => ({
					width: `${t.width + (e.width - t.width) * n}px`,
					height: `${t.height + (e.height - t.height) * n}px`,
					borderRadius: `${(a ? 14 : 21) + (r ? -7 : 7) * n}px`
				}));
			} else if (!n.isRoot && !n.isSection) {
				d.style.display = "";
				let e = r ? d.scrollHeight : 0;
				h = Et(d, (n) => ({ height: `${t.height + (e - t.height) * n}px` })), r || (h ? h.onfinish = () => {
					r || (d.style.display = "none");
				} : d.style.display = "none");
			}
		}
		g?.setOpen(r);
	}, v = () => {
		n.inline && n.isRoot || (r = !r, _(), n.onOpenChange?.(r));
	};
	a.addEventListener("click", (e) => {
		e.stopPropagation(), v();
	}), o.addEventListener("keydown", (e) => He(e, v)), n.isRoot && p.addEventListener("click", () => {
		r || v();
	}), _(), n.isSection && (g = vt(i, r));
	let y = n.isRoot ? gt(i) : void 0;
	return {
		element: p,
		body: f,
		toolbar: u,
		update(e) {
			n = e, r = e.open ?? r, _();
		},
		destroy() {
			h?.cancel(), y?.(), g?.destroy(), p.remove();
		}
	};
}
function Ot(e, t) {
	let n = t, r = X("div", "dialkit-segmented");
	r.setAttribute("role", "radiogroup"), r.addEventListener("keydown", We);
	let i = X("div", "dialkit-segmented-pill");
	i.style.transition = "left 200ms ease, width 200ms ease", i.setAttribute("aria-hidden", "true"), r.append(i), e.append(r), Ke(r);
	let a = [], o = "";
	function s() {
		let e = JSON.stringify(n.options);
		o !== e && (o = e, a.forEach((e) => e.remove()), a = n.options.map((e) => {
			let t = X("button", "dialkit-segmented-button", e.label);
			return t.setAttribute("role", "radio"), t.addEventListener("click", () => n.onChange(e.value)), r.append(t), t;
		})), a.forEach((e, t) => {
			let r = n.options[t].value === n.value;
			e.dataset.active = String(r), e.setAttribute("aria-checked", String(r)), e.tabIndex = r ? 0 : -1, r && (i.style.left = `${e.offsetLeft}px`, i.style.width = `${e.offsetWidth}px`);
		});
	}
	let c = new ResizeObserver(s);
	return c.observe(r), s(), {
		update(e) {
			n = e, s();
		},
		destroy() {
			c.disconnect(), r.remove();
		}
	};
}
function kt(e, t) {
	let n = t, r = X("div", "dialkit-labeled-control"), i = X("span", "dialkit-labeled-control-label");
	r.append(i), e.append(r);
	let a = () => ({
		options: [{
			value: "off",
			label: "Off"
		}, {
			value: "on",
			label: "On"
		}],
		value: n.checked ? "on" : "off",
		onChange: (e) => n.onChange(e === "on")
	}), o = Ot(r, a());
	function s() {
		i.textContent = n.label, At(i, n.shortcut, n.shortcutActive, !0), o.update(a());
	}
	return s(), {
		update(e) {
			n = e, s();
		},
		destroy() {
			o.destroy(), r.remove();
		}
	};
}
function At(e, t, n = !1, r = !1) {
	t && e.append(X("span", `dialkit-shortcut-pill${n ? " dialkit-shortcut-pill-active" : ""}`, r ? ft(t) : dt(t)));
}
function jt(e, t) {
	let n = t, a = X("div", "dialkit-slider-wrapper"), o = X("div", "dialkit-slider");
	o.tabIndex = 0, o.setAttribute("role", "slider");
	let s = X("div", "dialkit-slider-hashmarks"), c = X("div", "dialkit-slider-fill"), l = X("div", "dialkit-slider-handle"), u = X("span", "dialkit-slider-label"), d = X("span", "dialkit-slider-value"), f = X("input", "dialkit-slider-input");
	f.type = "text", f.inputMode = "decimal", f.style.display = "none", o.append(s, c, l, u, d, f), a.append(o), e.append(a);
	let p, m = !1, h = !1, g = !1, _, v = "", y = [], b = () => {
		y.forEach((e) => e?.cancel()), y = [];
	}, x = () => ({
		min: n.min ?? 0,
		max: n.max ?? 1,
		step: n.step ?? .01
	}), S = () => {
		let { min: e, max: t, step: i } = x();
		return n.value.toFixed(r(i, e, t));
	};
	function C() {
		let { min: e, max: t, step: r } = x(), i = t > e ? Math.max(0, Math.min(100, (n.value - e) / (t - e) * 100)) : 0;
		c.style.width = `${i}%`, l.style.left = `max(5px, calc(${i}% - 9px))`;
		let m = h || !!p, g = a.offsetWidth, _ = g > 0 && (i < (18 + u.offsetWidth) / g * 100 || i > (g - 20 - d.offsetWidth) / g * 100);
		l.style.opacity = m ? String(_ ? .1 : p?.moved ? .9 : .5) : "0", l.style.transform = `translateY(-50%) scale(${m ? 1 : .25}, ${m && _ ? .75 : 1})`, l.style.transition = "opacity 150ms, transform 200ms", o.classList.toggle("dialkit-slider-active", m), o.setAttribute("aria-label", n.label), o.setAttribute("aria-valuemin", String(e)), o.setAttribute("aria-valuemax", String(t)), o.setAttribute("aria-valuenow", String(n.value)), o.setAttribute("aria-valuetext", `${S()}${n.unit ? ` ${n.unit}` : ""}`), u.textContent = n.label, At(u, n.shortcut, n.shortcutActive), d.textContent = S(), f.setAttribute("aria-label", `${n.label} value`);
		let y = `${e}:${t}:${r}`;
		if (y !== v) {
			v = y, s.replaceChildren();
			let n = (t - e) / r;
			for (let e = 1; e < (n <= 10 ? n : 10); e++) {
				let t = X("div", "dialkit-slider-hashmark");
				t.style.left = `${n <= 10 ? e / n * 100 : e * 10}%`, s.append(t);
			}
		}
	}
	let w = (e) => {
		n = {
			...n,
			value: e
		}, C(), n.onChange(e);
	}, T = (e) => {
		let { min: t, max: n } = x(), r = p?.rect ?? a.getBoundingClientRect();
		return t + Math.max(0, Math.min(1, (e - r.left) / (r.width || 1))) * (n - t);
	};
	function E() {
		let e = p?.id;
		p = void 0, o.style.width = "", o.style.transform = "", e !== void 0 && o.hasPointerCapture(e) && o.releasePointerCapture(e), C();
	}
	function D() {
		E(), m = !0, f.value = S(), f.style.display = "", d.style.display = "none", o.tabIndex = -1, f.focus(), f.select();
	}
	function O(e = !1) {
		if (!m) return;
		m = !1;
		let t = f.value.trim() ? Number(f.value) : NaN;
		if (!e && Number.isFinite(t)) {
			let { min: e, max: n, step: r } = x();
			w(i(Math.max(e, Math.min(n, t)), r, e, n));
		}
		f.style.display = "none", d.style.display = "", o.tabIndex = 0, g = !1, d.classList.remove("dialkit-slider-value-editable");
	}
	return o.addEventListener("keydown", (e) => {
		let { min: t, max: r, step: i } = x();
		Ve(e, n.value, t, r, i, w, D);
	}), o.addEventListener("pointerdown", (e) => {
		m || e.button !== 0 || (e.preventDefault(), b(), o.focus({ preventScroll: !0 }), o.setPointerCapture(e.pointerId), p = {
			id: e.pointerId,
			x: e.clientX,
			y: e.clientY,
			rect: a.getBoundingClientRect(),
			moved: !1
		}, C());
	}), o.addEventListener("pointermove", (e) => {
		if (!p || p.id !== e.pointerId || (p.moved || (p.moved = Math.hypot(e.clientX - p.x, e.clientY - p.y) > 3), !p.moved)) return;
		let { min: t, max: n, step: r } = x(), a = e.clientX < p.rect.left ? e.clientX - p.rect.left : e.clientX > p.rect.right ? e.clientX - p.rect.right : 0, s = Math.sign(a) * 8 * Math.sqrt(Math.min(Math.max(0, Math.abs(a) - 32) / 200, 1));
		o.style.width = `calc(100% + ${Math.abs(s)}px)`, o.style.transform = `translateX(${Math.min(0, s)}px)`, w(i(T(e.clientX), r, t, n));
	}), o.addEventListener("pointerup", (e) => {
		if (p && p.id === e.pointerId) {
			if (!p.moved) {
				let { min: t, max: r, step: a } = x(), o = T(e.clientX), s = (r - t) / a <= 10 ? t + Math.round((o - t) / a) * a : st(o, t, r), u = n.value;
				w(i(s, a, t, r));
				let d = (u - t) / (r - t) * 100, f = (n.value - t) / (r - t) * 100;
				r > t && (y = [Et(c, (e) => ({ width: `${d + (f - d) * e}%` }), .25), Et(l, (e) => ({ left: `max(5px, calc(${d + (f - d) * e}% - 9px))` }), .25)]);
			}
			E();
		}
	}), o.addEventListener("pointercancel", E), o.addEventListener("lostpointercapture", E), o.addEventListener("mouseenter", () => {
		h = !0, C();
	}), o.addEventListener("mouseleave", () => {
		h = !1, C();
	}), d.addEventListener("mouseenter", () => {
		_ = setTimeout(() => {
			g = !0, d.classList.add("dialkit-slider-value-editable");
		}, 800);
	}), d.addEventListener("mouseleave", () => {
		clearTimeout(_), g = !1, d.classList.remove("dialkit-slider-value-editable");
	}), d.addEventListener("pointerdown", (e) => {
		g && e.stopPropagation();
	}), d.addEventListener("click", (e) => {
		g && (e.stopPropagation(), D());
	}), f.addEventListener("pointerdown", (e) => e.stopPropagation()), f.addEventListener("keydown", (e) => {
		e.stopPropagation(), (e.key === "Enter" || e.key === "Escape") && (e.preventDefault(), O(e.key === "Escape"), o.focus({ preventScroll: !0 }));
	}), f.addEventListener("blur", () => O()), C(), {
		update(e) {
			n = e, C();
		},
		destroy() {
			clearTimeout(_), b(), E(), a.remove();
		}
	};
}
function Mt(e, t) {
	let n = t, r = X("label", "dialkit-text-control"), i = X("span", "dialkit-text-label"), a = X("textarea", "dialkit-text-input");
	a.rows = 1, r.append(i, a), e.append(r);
	let o = mt(a);
	function s() {
		i.textContent = n.label, a.value !== n.value && (a.value = n.value), a.placeholder = n.placeholder ?? "", o.update();
	}
	return a.addEventListener("input", () => {
		n = {
			...n,
			value: a.value
		}, o.update(), n.onChange(a.value);
	}), s(), {
		update(e) {
			n = e, s();
		},
		destroy() {
			o.destroy(), r.remove();
		}
	};
}
var Nt = 0;
function Pt(e, t, n, r = "select") {
	let i = 0, a, o = !1, s = () => {
		if (o) return;
		let c = t();
		if (!c?.isConnected) {
			i = requestAnimationFrame(s);
			return;
		}
		c.inert = !1, c.removeAttribute("aria-hidden"), c.id ||= `dialkit-dropdown-${++Nt}`, c.setAttribute("role", r === "select" ? "listbox" : r === "presets" ? "menu" : "dialog"), c.setAttribute("aria-label", e.getAttribute("aria-label") || e.querySelector(".dialkit-select-label")?.textContent?.trim() || e.getAttribute("title") || e.textContent?.trim() || "Options"), c.tabIndex = -1, e.setAttribute("aria-controls", c.id);
		let l = r === "select" ? ".dialkit-select-option" : ".dialkit-preset-name, .dialkit-preset-delete, .dialkit-preset-create", u, d = 0, f = "", p = 0, m = !1, h = () => Array.from(c.querySelectorAll(l)).filter((e) => !e.hasAttribute("disabled")), g = (e) => {
			let t = h();
			d = Math.max(0, Math.min(t.length - 1, e)), u = t[d], (u ?? c).focus({ preventScroll: !0 }), u?.scrollIntoView({
				block: "nearest",
				inline: "nearest"
			});
		}, _ = () => {
			if (e.matches(":disabled")) {
				m = !0;
				let t = Je(e, !0);
				n(), queueMicrotask(() => t?.focus());
			} else h().forEach((e) => {
				e.tabIndex = -1, e.setAttribute("role", r === "select" ? "option" : e.classList.contains("dialkit-preset-name") ? "menuitemradio" : "menuitem"), r === "select" ? e.setAttribute("aria-selected", e.dataset.selected ?? "false") : e.classList.contains("dialkit-preset-name") && e.setAttribute("aria-checked", e.parentElement?.dataset.active ?? "false");
			}), u && !u.isConnected && !m && g(d);
		};
		_();
		let v = new MutationObserver(_);
		v.observe(c, {
			childList: !0,
			subtree: !0,
			attributes: !0,
			attributeFilter: ["data-active", "data-selected"]
		});
		let y = () => {
			m = !0, e.focus({ preventScroll: !0 });
		}, b = (t) => {
			if (t.altKey || t.metaKey || t.ctrlKey || t.isComposing) return;
			if (t.key === "Tab") {
				let r = Je(e, t.shiftKey);
				y(), n(), r && (t.preventDefault(), t.stopPropagation(), queueMicrotask(() => r.focus()));
				return;
			}
			if (t.key === "Escape") {
				t.preventDefault(), t.stopPropagation(), y(), n();
				return;
			}
			let r = h(), i = r.indexOf(document.activeElement), a = Ue(t.key, Math.max(0, i), r.length);
			if (a !== void 0) t.preventDefault(), t.stopPropagation(), g(a);
			else if (["Enter", " "].includes(t.key) && i >= 0) t.preventDefault(), t.stopPropagation(), r[i].click();
			else if (t.key.length === 1 && t.key !== " ") {
				let e = Date.now();
				f = e - p < 700 ? f + t.key.toLocaleLowerCase() : t.key.toLocaleLowerCase(), p = e;
				let n = [...f].every((e) => e === f[0]) ? f[0] : f;
				for (let e = n.length > 1 ? 0 : 1; e <= r.length; e++) {
					let t = (Math.max(0, i) + e) % r.length;
					if (r[t]?.textContent?.trim().toLocaleLowerCase().startsWith(n)) {
						g(t);
						break;
					}
				}
				t.preventDefault(), t.stopPropagation();
			}
		}, x = (e) => {
			let t = e.target.closest(l);
			t && !t.classList.contains("dialkit-preset-delete") && y();
		}, S = (t) => {
			let r = t.target;
			!m && !c.contains(r) && !e.contains(r) && (m = !0, n());
		};
		c.addEventListener("keydown", b), c.addEventListener("click", x, !0), document.addEventListener("focusin", S);
		let C;
		if (r !== "select") {
			let t = W(e);
			if (t) {
				c.dataset.theme = t.dataset.theme ?? "dark";
				let e = getComputedStyle(t);
				for (let t of Array.from(e)) t.startsWith("--dial-") && c.style.setProperty(t, e.getPropertyValue(t));
			}
			C = ze(e, () => {
				let n = U(e, t ?? document.body, {
					fixed: !0,
					dropdownHeight: c.scrollHeight + 2,
					width: r === "help" ? 280 : e.getBoundingClientRect().width
				});
				Object.assign(c.style, {
					position: "fixed",
					top: `${n.top}px`,
					left: `${n.left}px`,
					right: "auto",
					width: `${n.width}px`,
					minWidth: "0",
					maxHeight: `${n.maxHeight}px`
				});
			}, () => c);
		}
		let w = h().findIndex((e) => e.dataset.selected === "true" || e.classList.contains("dialkit-preset-name") && e.parentElement?.dataset.active === "true");
		g(Math.max(0, w)), a = () => {
			m = !0, c.contains(document.activeElement) && e.focus({ preventScroll: !0 }), c.inert = !0, c.setAttribute("aria-hidden", "true"), v.disconnect(), C?.(), c.removeEventListener("keydown", b), c.removeEventListener("click", x, !0), document.removeEventListener("focusin", S), e.removeAttribute("aria-controls");
		};
	};
	return i = requestAnimationFrame(s), () => {
		o = !0, cancelAnimationFrame(i), a?.();
	};
}
function Ft(e, t, n, r) {
	let i, a, o, s = (t) => {
		!e.contains(t.target) && !i?.contains(t.target) && c();
	};
	function c() {
		a?.(), o?.(), a = o = void 0, i?.remove(), i = void 0, e.dataset.open = "false", e.setAttribute("aria-expanded", "false"), document.removeEventListener("pointerdown", s);
	}
	function l() {
		if (i || e.disabled) return;
		let l = W(e) ?? document.body;
		i = X("div", t), i.style.position = "fixed", l.append(i), r(i), e.dataset.open = "true", e.setAttribute("aria-expanded", "true"), o = ze(e, () => {
			if (!i) return;
			if (!e.isConnected || !e.getClientRects().length) {
				c();
				return;
			}
			let t = U(e, l, {
				fixed: !0,
				dropdownHeight: i.scrollHeight + 2,
				...n === "help" ? { width: 280 } : {}
			});
			Object.assign(i.style, {
				top: `${t.top}px`,
				left: `${t.left}px`,
				width: `${t.width}px`,
				maxHeight: `${t.maxHeight}px`
			});
		}, () => i), a = Pt(e, () => i, c, n), document.addEventListener("pointerdown", s);
	}
	let u = () => {
		i ? c() : l();
	}, d = (e) => qe(e, l);
	return e.setAttribute("aria-haspopup", n === "select" ? "listbox" : n === "presets" ? "menu" : "dialog"), e.setAttribute("aria-expanded", "false"), e.addEventListener("click", u), e.addEventListener("keydown", d), {
		close: c,
		refresh() {
			i && r(i);
		},
		destroy() {
			c(), e.removeEventListener("click", u), e.removeEventListener("keydown", d);
		}
	};
}
function It(e, t) {
	let n = t, r = X("div", "dialkit-select-row"), i = X("button", "dialkit-select-trigger"), a = X("span", "dialkit-select-label"), o = X("div", "dialkit-select-right"), s = X("span", "dialkit-select-value");
	o.append(s, Q(Ne, "dialkit-select-chevron")), i.append(a, o), r.append(i), e.append(r);
	let c = () => n.options.map((e) => typeof e == "string" ? {
		value: e,
		label: e.replace(/\b\w/g, (e) => e.toUpperCase())
	} : e), l = Ft(i, "dialkit-select-dropdown", "select", (e) => {
		e.replaceChildren(...c().map((e) => {
			let t = X("button", "dialkit-select-option", e.label);
			return t.dataset.selected = String(e.value === n.value), t.addEventListener("click", () => {
				n.onChange(e.value), l.close();
			}), t;
		}));
	});
	function u() {
		a.textContent = n.label, s.textContent = c().find((e) => e.value === n.value)?.label ?? n.value, i.disabled = !n.options.length, l.refresh();
	}
	return u(), {
		update(e) {
			n = e, u();
		},
		destroy() {
			l.destroy(), r.remove();
		}
	};
}
function Lt(e, t) {
	let n = t, r = X("div", "dialkit-preset-manager"), i = X("button", "dialkit-preset-trigger"), a = X("span", "dialkit-preset-label");
	i.setAttribute("aria-label", "Versions"), i.append(a, Q(Ne, "dialkit-select-chevron")), r.append(i), e.append(r);
	let o = Ft(i, "dialkit-preset-dropdown", "presets", (e) => {
		let t = [{
			id: null,
			name: "Version 1"
		}, ...n.presets];
		e.replaceChildren(...t.map((e) => {
			let t = X("div", "dialkit-preset-item");
			t.dataset.active = String(e.id === n.activePresetId);
			let r = X("button", "dialkit-preset-name", e.name);
			if (t.addEventListener("click", () => {
				e.id ? V.loadPreset(n.panelId, e.id) : V.clearActivePreset(n.panelId), o.close();
			}), t.append(Q(e.id === n.activePresetId ? Fe : [], "dialkit-preset-check"), r), e.id) {
				let r = X("button", "dialkit-preset-delete");
				r.title = `Delete ${e.name}`, r.setAttribute("aria-label", r.title), r.append(Q(Le)), r.addEventListener("click", (t) => {
					t.stopPropagation(), V.deletePreset(n.panelId, e.id);
				}), t.append(r);
			}
			return t;
		}));
		let r = X("div", "dialkit-preset-divider");
		r.setAttribute("role", "separator");
		let a = X("button", "dialkit-preset-create");
		a.append(Q(Ie, "dialkit-preset-check"), document.createTextNode("New version")), a.addEventListener("click", () => {
			n.onAdd ? n.onAdd() : V.saveNewPreset(n.panelId), o.close(), i.focus();
		}), e.append(r, a);
	});
	function s() {
		let e = n.presets.find((e) => e.id === n.activePresetId);
		a.textContent = e?.name ?? "Version 1", i.dataset.hasPreset = String(!!e), o.refresh();
	}
	return s(), {
		update(e) {
			n = e, s();
		},
		destroy() {
			o.destroy(), r.remove();
		}
	};
}
var Rt = (e) => Math.max(-1, Math.min(2, e));
function zt(e) {
	return e.join(", ");
}
function Bt(e) {
	let t = e.split(",").map((e) => e.trim());
	if (t.length !== 4 || t.some((e) => !/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(e))) return null;
	let n = t.map(Number);
	return !n.every(Number.isFinite) || n[0] < 0 || n[0] > 1 || n[2] < 0 || n[2] > 1 ? null : (n[1] = Rt(n[1]), n[3] = Rt(n[3]), n);
}
function Vt(e) {
	return e.map((e, t) => {
		let n = Number.isFinite(e) ? e : t < 2 ? 0 : 1;
		return t % 2 == 0 ? Math.max(0, Math.min(1, n)) : n;
	});
}
function Ht(e, t, n) {
	let r = Vt(e), i = Math.min(12, t / 4, n / 4), a = Math.max(.5, Math.abs(r[1] - .5), Math.abs(r[3] - .5)), o = Math.min(t - i * 2, (n / 2 - i) / a), s = {
		x: o,
		y: o
	}, c = (e, r) => ({
		x: t / 2 + (e - .5) * s.x,
		y: n / 2 - (r - .5) * s.y
	});
	return {
		scale: s,
		start: c(0, 0),
		end: c(1, 1),
		handles: [c(r[0], r[1]), c(r[2], r[3])]
	};
}
function $(e, t, n, r, i) {
	let a = [...e];
	if (!Number.isFinite(i.x) || !Number.isFinite(i.y) || i.x <= 0 || i.y <= 0) return a;
	let o = t * 2, s = e[o] + n / i.x, c = e[o + 1] - r / i.y;
	return n !== 0 && (a[o] = Number(Math.max(0, Math.min(1, s)).toFixed(2))), r !== 0 && Number.isFinite(c) && (a[o + 1] = Number(Rt(c).toFixed(2))), a;
}
function Ut(e, t, n, r) {
	let i = r ? .1 : .01, a = {
		x: 1,
		y: 1
	};
	if (n === "ArrowLeft") return $(e, t, -i, 0, a);
	if (n === "ArrowRight") return $(e, t, i, 0, a);
	if (n === "ArrowUp") return $(e, t, 0, -i, a);
	if (n === "ArrowDown") return $(e, t, 0, i, a);
}
function Wt(e, t, n = 5) {
	let r = t.x - e.x, i = t.y - e.y, a = Math.hypot(r, i);
	return a <= n ? { ...e } : {
		x: t.x - r / a * n,
		y: t.y - i / a * n
	};
}
var Gt = 0;
function Kt(e, t) {
	let n = t, r = Vt(n.easing.ease), i = 256, a = 180, o, s = document.createElement("div");
	s.className = "dialkit-easing-viz", s.setAttribute("aria-label", "Bézier easing curve");
	let c = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	c.setAttribute("aria-hidden", "true");
	let l = (e, t) => {
		let n = document.createElementNS("http://www.w3.org/2000/svg", e);
		return n.setAttribute("class", t), c.append(n), n;
	}, u = l("line", "dialkit-easing-reference"), d = [l("line", "dialkit-easing-tangent"), l("line", "dialkit-easing-tangent")], f = l("path", "dialkit-easing-curve"), p = [l("circle", "dialkit-easing-endpoint"), l("circle", "dialkit-easing-endpoint")], m = document.createElement("span");
	m.className = "dialkit-easing-instructions", m.id = `dialkit-easing-help-${++Gt}`, m.textContent = "Drag to adjust X from 0 to 1 and Y from -1 to 2. Arrow keys adjust by 0.01. Shift adjusts by 0.1. Escape cancels a drag.", s.append(c, m);
	let h = [0, 1].map((e) => {
		let t = document.createElement("button");
		return t.type = "button", t.className = "dialkit-easing-handle", t.setAttribute("aria-describedby", m.id), t.addEventListener("pointerdown", (c) => {
			if (!n.onChange || c.button !== 0 || o) return;
			c.preventDefault(), c.stopPropagation(), t.focus({ preventScroll: !0 }), v();
			let l = s.getBoundingClientRect();
			l.width && l.height && (o = {
				id: c.pointerId,
				handle: e,
				x: c.clientX,
				y: c.clientY,
				scale: Ht(r, i, a).scale,
				ratioX: i / l.width,
				ratioY: a / l.height,
				value: [...r]
			}, t.setPointerCapture(c.pointerId), t.dataset.dragging = "true");
		}), t.addEventListener("pointermove", b), t.addEventListener("pointerup", (e) => {
			e.pointerId === o?.id && (b(e), x());
		}), t.addEventListener("pointercancel", (e) => {
			e.pointerId === o?.id && S();
		}), t.addEventListener("lostpointercapture", (e) => {
			e.pointerId === o?.id && x();
		}), t.addEventListener("keydown", (t) => {
			if (!n.onChange || t.altKey || t.metaKey || t.ctrlKey) return;
			if (t.key === "Escape" && o) {
				t.preventDefault(), t.stopPropagation(), S();
				return;
			}
			let i = Ut(r, e, t.key, t.shiftKey);
			i && (t.preventDefault(), t.stopPropagation(), x(), y(i));
		}), s.append(t), t;
	});
	e.append(s);
	function g(e, t, n) {
		e.setAttribute("x1", String(t.x)), e.setAttribute("y1", String(t.y)), e.setAttribute("x2", String(n.x)), e.setAttribute("y2", String(n.y));
	}
	function _() {
		let e = Ht(r, i, a);
		c.setAttribute("viewBox", `0 0 ${i} ${a}`), g(u, e.start, e.end), [e.start, e.end].forEach((t, o) => {
			g(d[o], t, Wt(t, e.handles[o])), p[o].setAttribute("cx", String(t.x)), p[o].setAttribute("cy", String(t.y)), p[o].setAttribute("r", "2.5");
			let s = h[o];
			s.style.left = `${e.handles[o].x / i * 100}%`, s.style.top = `${e.handles[o].y / a * 100}%`, s.disabled = !n.onChange, s.setAttribute("aria-label", `B\xE9zier handle ${o + 1}: X ${r[o * 2]}, Y ${r[o * 2 + 1]}`);
		}), s.setAttribute("role", n.onChange ? "group" : "img");
		let { start: t, end: o, handles: [l, m] } = e;
		f.setAttribute("d", `M ${t.x} ${t.y} C ${l.x} ${l.y}, ${m.x} ${m.y}, ${o.x} ${o.y}`);
	}
	function v() {
		i = s.clientWidth || i, a = s.clientHeight || a, _();
	}
	function y(e) {
		e.every((e, t) => e === r[t]) || (r = e, _(), n.onChange?.([...r]));
	}
	function b(e) {
		o && e.pointerId === o.id && y($(o.value, o.handle, (e.clientX - o.x) * o.ratioX, (e.clientY - o.y) * o.ratioY, o.scale));
	}
	function x() {
		if (!o) return;
		let { id: e, handle: t } = o;
		o = void 0, delete h[t].dataset.dragging, h[t].hasPointerCapture(e) && h[t].releasePointerCapture(e);
	}
	function S() {
		if (!o) return;
		let e = o.value;
		x(), y(e);
	}
	let C = new ResizeObserver(v);
	return C.observe(s), v(), {
		update(e) {
			let t = Vt(e.easing.ease);
			(!e.onChange || t.some((e, t) => e !== r[t])) && x(), n = e, r = t, _();
		},
		destroy() {
			x(), C.disconnect(), s.remove();
		}
	};
}
function qt(e, t) {
	let n = Z("svg", {
		viewBox: "0 0 256 140",
		class: "dialkit-spring-viz",
		role: "img",
		"aria-label": "Spring response curve"
	});
	for (let e = 1; e < 4; e++) n.append(Z("line", {
		x1: e * 64,
		y1: 0,
		x2: e * 64,
		y2: 140,
		stroke: "var(--dial-surface-active)"
	}), Z("line", {
		x1: 0,
		y1: e * 35,
		x2: 256,
		y2: e * 35,
		stroke: "var(--dial-surface-active)"
	}));
	n.append(Z("line", {
		x1: 0,
		y1: 70,
		x2: 256,
		y2: 70,
		stroke: "var(--dial-border-hover)",
		"stroke-dasharray": "4,4"
	}));
	let r = Z("path", {
		fill: "none",
		stroke: "var(--dial-text-label)",
		"stroke-width": 2,
		"stroke-linecap": "round",
		"stroke-linejoin": "round"
	});
	n.append(r), e.append(n);
	function i({ spring: e, isSimpleMode: t }) {
		let n = Ct(t ? {
			type: "spring",
			visualDuration: e.visualDuration ?? .3,
			bounce: e.bounce ?? .2
		} : {
			type: "spring",
			stiffness: e.stiffness ?? 400,
			damping: e.damping ?? 17,
			mass: e.mass ?? 1
		}), i = Array.from({ length: 101 }, (e, t) => wt(t / 50, n)), a = Math.min(...i), o = Math.max(...i) - a || 1;
		r.setAttribute("d", i.map((e, t) => `${t ? "L" : "M"} ${t * 2.56} ${140 - ((e - a) / o * 84 + 28)}`).join(" "));
	}
	return i(t), {
		update: i,
		destroy() {
			n.remove();
		}
	};
}
function Jt(e, t, n = !1) {
	let r = t, i = Dt(e, { title: r.label }), a = X("div");
	Object.assign(a.style, {
		display: "flex",
		flexDirection: "column",
		gap: "6px"
	}), i.body.append(a);
	let o, s = [], c = () => {}, l = {
		easing: r.value.type === "easing" ? r.value : {
			type: "easing",
			duration: .3,
			ease: [
				1,
				-.4,
				.5,
				1
			]
		},
		simple: r.value.type === "spring" && r.value.visualDuration !== void 0 ? r.value : {
			type: "spring",
			visualDuration: .3,
			bounce: .2
		},
		advanced: r.value.type === "spring" && r.value.stiffness !== void 0 ? r.value : {
			type: "spring",
			stiffness: 200,
			damping: 25,
			mass: 1
		}
	}, u = () => n ? V.getSpringMode(r.panelId, r.path) : V.getTransitionMode(r.panelId, r.path);
	function d() {
		let e = u();
		e === "easing" && r.value.type === "easing" && (l.easing = r.value), e !== "easing" && r.value.type === "spring" && (l[e] = r.value), o !== e && (o = e, f()), i.update({ title: r.label }), c();
	}
	function f() {
		s.forEach((e) => e.destroy()), s = [], a.replaceChildren();
		let e = [], t = (e) => r.onChange(e);
		if (o === "easing") {
			let n = () => ({
				easing: l.easing,
				onChange: (e) => t({
					...l.easing,
					ease: e
				})
			}), r = Kt(a, n());
			s.push(r), e.push(() => r.update(n()));
		} else {
			let t = () => ({
				spring: l[o],
				isSimpleMode: o === "simple"
			}), n = qt(a, t());
			s.push(n), e.push(() => n.update(t()));
		}
		let i = X("div", "dialkit-labeled-control");
		i.append(X("span", "dialkit-labeled-control-label", "Type")), a.append(i);
		let u = Ot(i, {
			options: [
				...n ? [] : [{
					value: "easing",
					label: "Easing"
				}],
				{
					value: "simple",
					label: "Time"
				},
				{
					value: "advanced",
					label: "Physics"
				}
			],
			value: o,
			onChange(e) {
				let t = { ...l[e] };
				n ? V.updateSpringMode(r.panelId, r.path, e) : V.updateTransitionMode(r.panelId, r.path, e), r.onChange(t);
			}
		});
		s.push(u);
		function d(n, i, c, u, d, f, p = !1) {
			let m = () => {
				let e = l[o], a = p ? r.durationControl : void 0;
				return {
					label: n,
					value: a?.value ?? e[i] ?? c,
					min: a?.min ?? u,
					max: a?.max ?? d,
					step: a?.step ?? f,
					unit: p ? "s" : void 0,
					onChange: a?.onChange ?? ((e) => {
						let n = {
							...l[o],
							[i]: e
						};
						o === "simple" ? (delete n.stiffness, delete n.damping, delete n.mass) : o === "advanced" && (delete n.visualDuration, delete n.bounce), t(n);
					})
				};
			}, h = jt(a, m());
			s.push(h), e.push(() => h.update(m()));
		}
		if (o === "easing") {
			let n = X("div", "dialkit-labeled-control");
			n.append(X("span", "dialkit-labeled-control-label", "Ease"));
			let r = X("input", "dialkit-text-input");
			r.setAttribute("aria-label", "Bézier coordinates"), r.spellcheck = !1, n.append(r), a.append(n), r.addEventListener("blur", () => {
				let e = Bt(r.value);
				e && t({
					...l.easing,
					ease: e
				}), r.value = zt(l.easing.ease);
			}), r.addEventListener("keydown", (e) => {
				e.key === "Escape" && (r.value = zt(l.easing.ease)), (e.key === "Escape" || e.key === "Enter") && (e.preventDefault(), r.blur()), e.stopPropagation();
			}), e.push(() => {
				document.activeElement !== r && (r.value = zt(l.easing.ease));
			});
		} else o === "simple" ? (n && !r.hideDuration && d("Duration", "visualDuration", .3, .1, 1, .05, !0), d("Bounce", "bounce", .2, 0, 1, .05)) : (d("Stiffness", "stiffness", 400, 1, 1e3, 10), d("Damping", "damping", 17, 1, 100, 1), d("Mass", "mass", 1, .1, 10, .1));
		!n && !r.hideDuration && o !== "advanced" && d("Duration", o === "easing" ? "duration" : "visualDuration", .3, .1, o === "easing" ? 2 : 1, .05, !0), c = () => e.forEach((e) => e());
	}
	return d(), {
		update(e) {
			r = e, d();
		},
		destroy() {
			s.forEach((e) => e.destroy()), i.destroy();
		}
	};
}
function Yt(e, t) {
	let n = (e) => ({
		...e,
		value: e.spring,
		onChange: (t) => e.onChange(t)
	}), r = Jt(e, n(t), !0);
	return {
		update(e) {
			r.update(n(e));
		},
		destroy: r.destroy
	};
}
var Xt = 0, Zt, Qt = null, $t = /* @__PURE__ */ new Set();
function en(e) {
	return $t.add(e), e(Qt), () => {
		$t.delete(e);
	};
}
function tn(e) {
	Qt = e, $t.forEach((t) => t(e));
}
function nn() {
	Xt++ === 0 && (Zt = rn());
	let e = !1;
	return { destroy() {
		e || (e = !0, --Xt === 0 && (Zt?.(), Zt = void 0));
	} };
}
function rn() {
	let e = /* @__PURE__ */ new Set(), t, n = !1, r, i = 0, a = (...n) => {
		for (let r of e) {
			let e = V.resolveShortcutTarget(r, t);
			if (e?.control.type === "slider" && n.includes(e.control.shortcut?.interaction ?? "scroll")) return e;
		}
		return null;
	}, o = () => {
		n = !1, r = void 0, i = 0;
	}, s = (n) => {
		if (ct()) return;
		if (t = J(n), n.key.startsWith("Arrow") && e.size) {
			let e = a("scroll", "drag", "move");
			if (e) {
				n.preventDefault(), ot(e.panelId, e.path, e.control, at(e.control, e.control.shortcut), ["ArrowRight", "ArrowUp"].includes(n.key) ? 1 : -1);
				return;
			}
		}
		let o = n.key.toLowerCase(), s = e.has(o);
		e.add(o);
		let c = V.resolveShortcutTarget(o, t);
		c && (tn(c), !s && c.control.type === "toggle" && V.updateValue(c.panelId, c.path, !V.getValue(c.panelId, c.path))), s || (r = void 0, i = 0);
	}, c = (n) => {
		e.delete(n.key.toLowerCase()), t = J(n), o(), tn([...e].map((e) => V.resolveShortcutTarget(e, t)).find(Boolean) ?? null);
	}, l = (e) => {
		if (ct()) return;
		t = J(e);
		let n = a("scroll") ?? V.resolveScrollOnlyTargets().find((e) => e.control.type === "slider");
		n && (e.preventDefault(), ot(n.panelId, n.path, n.control, at(n.control, n.control.shortcut), e.deltaY > 0 ? -1 : 1));
	}, u = (e) => {
		e.button !== 0 || ct() || (t = J(e), a("drag") && (n = !0, r = e.clientX, i = 0, e.preventDefault()));
	}, d = (e) => {
		if (ct()) return;
		t = J(e);
		let o = a(n ? "drag" : "move");
		if (!o) return;
		if (r === void 0) {
			r = e.clientX;
			return;
		}
		i += e.clientX - r, r = e.clientX;
		let s = Math.trunc(i / lt);
		s && (i -= s * lt, ot(o.panelId, o.path, o.control, at(o.control, o.control.shortcut), s));
	}, f = () => {
		e.clear(), o(), tn(null);
	};
	return window.addEventListener("keydown", s), window.addEventListener("keyup", c), window.addEventListener("wheel", l, { passive: !1 }), window.addEventListener("mousedown", u), window.addEventListener("mousemove", d), window.addEventListener("mouseup", o), window.addEventListener("blur", f), () => {
		window.removeEventListener("keydown", s), window.removeEventListener("keyup", c), window.removeEventListener("wheel", l), window.removeEventListener("mousedown", u), window.removeEventListener("mousemove", d), window.removeEventListener("mouseup", o), window.removeEventListener("blur", f), f();
	};
}
function an(e, t) {
	let n = t, r = null, i = "", a = [];
	function o(e, t) {
		for (let i of e) {
			let e = function(e, n) {
				let r = e(t, n());
				a.push({
					update: () => r.update(n()),
					destroy: r.destroy
				});
			}, s = () => n.values[i.path], c = (e) => V.updateValue(n.panelId, i.path, e), l = () => ({
				shortcut: i.shortcut,
				shortcutActive: r?.panelId === n.panelId && r?.path === i.path
			});
			switch (i.type) {
				case "folder": {
					let e = Dt(t, {
						title: i.label,
						defaultOpen: i.defaultOpen
					});
					a.push({
						update() {},
						destroy: e.destroy
					}), o(i.children ?? [], e.body);
					break;
				}
				case "slider":
					e(jt, () => ({
						label: i.label,
						value: s(),
						min: i.min,
						max: i.max,
						step: i.step,
						onChange: c,
						...l()
					}));
					break;
				case "toggle":
					e(kt, () => ({
						label: i.label,
						checked: s(),
						onChange: c,
						...l()
					}));
					break;
				case "text":
					e(Mt, () => ({
						label: i.label,
						value: s(),
						placeholder: i.placeholder,
						onChange: c
					}));
					break;
				case "select":
					e(It, () => ({
						label: i.label,
						value: s(),
						options: i.options ?? [],
						onChange: c
					}));
					break;
				case "color":
					e(Ye, () => ({
						label: i.label,
						value: s(),
						onChange: c
					}));
					break;
				case "image":
					e(nt, () => ({
						label: i.label,
						value: s(),
						options: i.options,
						onChange: c
					}));
					break;
				case "pad":
					e(it, () => ({
						...i.pad,
						label: i.label,
						value: s(),
						onChange: c
					}));
					break;
				case "spring":
					e(Yt, () => ({
						panelId: n.panelId,
						path: i.path,
						label: i.label,
						spring: s(),
						onChange: c
					}));
					break;
				case "transition":
					e(Jt, () => ({
						panelId: n.panelId,
						path: i.path,
						label: i.label,
						value: s(),
						durationControl: n.transitionDuration,
						onChange: c
					}));
					break;
				case "action": {
					let e = X("button", "dialkit-button", i.label);
					e.addEventListener("click", () => V.triggerAction(n.panelId, i.path)), t.append(e), a.push({
						update() {},
						destroy() {
							e.remove();
						}
					});
					break;
				}
			}
		}
	}
	function s() {
		let t = JSON.stringify([n.panelId, n.controls]);
		i === t ? a.forEach((e) => e.update()) : (a.forEach((e) => e.destroy()), a = [], i = t, o(n.controls, e));
	}
	let c = en((e) => {
		r = e, a.forEach((e) => e.update());
	});
	return s(), {
		update(e) {
			n = e, s();
		},
		destroy() {
			c(), a.forEach((e) => e.destroy()), a = [];
		}
	};
}
function on(e, t, n = "createDialKit") {
	let r, i = !1, a = () => ({
		panelId: t,
		presets: V.getPresets(t),
		activePresetId: V.getActivePresetId(t)
	}), o = Lt(e, a()), s = yt("Copy parameters", [H.board, H.body], async () => {
		try {
			await navigator.clipboard.writeText(Me(n, V.getPanel(t)?.name ?? "", V.getValues(t)));
		} catch {
			return;
		}
		i || (s.replaceChildren(Q(Fe)), clearTimeout(r), r = setTimeout(() => s.replaceChildren(Q([H.board, H.body])), 1500));
	});
	s.classList.add("dialkit-toolbar-primary"), e.append(s);
	let c = V.subscribe(t, () => o.update(a()));
	return { destroy() {
		i = !0, clearTimeout(r), c(), o.destroy(), s.remove();
	} };
}
function sn(e = {}) {
	let t = X("div", "dialkit-root"), n = X("div", "dialkit-panel");
	t.append(n);
	let r = e.mode === "inline";
	t.dataset.mode = n.dataset.mode = r ? "inline" : "popover", t.dataset.theme = e.theme ?? "system";
	let i = e.position ?? "top-right";
	n.dataset.position = i;
	let a = null, o, s = () => {
		n.dataset.originX = Ee(i, a), n.dataset.originY = De(i, a);
	};
	s();
	let c = r || (e.defaultOpen ?? !0), l = c, u = "", d = [], f, p = !1, m = (t) => {
		l !== t && (l = t, e.onOpenChange?.(t));
	};
	function h(e) {
		c = e, f?.update({
			title: "DialKit",
			open: e,
			isRoot: !0,
			inline: r,
			onOpenChange: h
		}), m(e);
	}
	function g(e) {
		if (!_e.getTimelines().length) return;
		let t = yt("Toggle timeline", ["M3 5h18v14H3z", "M7 9h10M7 13h6"], () => ve.toggle());
		e.append(t);
		let n = () => t.setAttribute("aria-pressed", String(ve.getVisible())), r = ve.subscribe(n);
		n(), d.push({ destroy() {
			r(), t.remove();
		} });
	}
	function _(t, n, i) {
		V.initPanelOpen(t.id, !i || r || (e.defaultOpen ?? !0));
		let a = () => ({
			title: V.getPanel(t.id)?.name ?? t.name,
			open: V.getPanelOpen(t.id),
			isRoot: i,
			isSection: !i,
			inline: i && r,
			onOpenChange: (e) => {
				V.setPanelOpen(t.id, e), i && m(e);
			}
		}), o = Dt(n, a()), s = o.toolbar, c = on(s, t.id);
		i && g(s);
		let l = () => ({
			panelId: t.id,
			controls: V.getPanel(t.id)?.controls ?? [],
			values: V.getValues(t.id)
		}), u = an(o.body, l()), f = V.subscribe(t.id, () => {
			o.update(a()), u.update(l());
		});
		d.push({ destroy() {
			f(), c.destroy(), u.destroy(), o.destroy();
		} });
	}
	function v() {
		if (p) return;
		let e = V.getPanels("panel"), i = _e.getTimelines();
		t.style.display = e.length || i.length ? "" : "none";
		let a = JSON.stringify([e.map((e) => [
			e.id,
			e.name,
			e.controls
		]), i.length > 0]);
		if (a === u || (u = a, d.forEach((e) => e.destroy()), d = [], n.replaceChildren(), f = void 0, !e.length && !i.length)) return;
		let o = X("div", "dialkit-panel-wrapper");
		n.append(o), n.dataset.multiple = String(e.length > 1), e.length === 1 ? _(e[0], o, !0) : (f = Dt(o, {
			title: "DialKit",
			open: c,
			isRoot: !0,
			inline: r,
			onOpenChange: h
		}), d.push(f), g(f.toolbar), e.forEach((e) => _(e, f.body, !1)), e.length || f.body.append(X("div", "dialkit-timeline-toolkit-only", "Timeline")));
	}
	let y = () => {
		if (!o) return;
		let e = o;
		o = void 0, je(e.handle, e.id), e.moved && ke(e.handle);
	};
	r || (n.addEventListener("pointerdown", (e) => {
		if (e.button !== 0) return;
		let t = Se(e.target, n);
		t && (e.preventDefault(), o = {
			start: Ce(e.clientX, e.clientY, n),
			handle: t,
			id: e.pointerId,
			moved: !1
		}, Ae(t, e.pointerId));
	}), n.addEventListener("pointermove", (e) => {
		o && o.id === e.pointerId && (o.moved || Te(o.start, e.clientX, e.clientY)) && (o.moved = !0, a = we(o.start, e.clientX, e.clientY), delete n.dataset.position, Object.assign(n.style, {
			left: `${a.x}px`,
			top: `${a.y}px`,
			right: "auto",
			bottom: "auto"
		}), s());
	}), n.addEventListener("pointerup", y), n.addEventListener("pointercancel", y), n.addEventListener("lostpointercapture", y)), e.productionEnabled !== !1 && (e.target ?? document.body).append(t);
	let b = e.productionEnabled === !1 ? void 0 : nn(), x = e.productionEnabled === !1 ? () => {} : V.subscribeGlobal(v), S = e.productionEnabled === !1 ? () => {} : _e.subscribeGlobal(v), C = V.subscribePanelOpen((e, t) => {
		if (p) return;
		let o = V.getPanels("panel");
		o.some((t) => t.id === e) && (o.length > 1 && t ? h(!0) : o.length === 1 && m(t), !t && !r && a && (i = Oe(i, a), a = null, n.style.cssText = "", n.dataset.position = i, s()));
	});
	return e.productionEnabled !== !1 && v(), {
		element: t,
		destroy() {
			p || (p = !0, y(), x(), S(), C(), b?.destroy(), d.forEach((e) => e.destroy()), t.remove());
		}
	};
}
//#endregion
//#region node_modules/dialkit/dist/vanilla/styles.css?inline
var cn = ".dialkit-root{--dial-surface:#ffffff0d;--dial-surface-hover:#ffffff1a;--dial-surface-active:#ffffff1c;--dial-surface-subtle:#ffffff0f;--dial-text-root:#fff;--dial-text-section:#ffffffb3;--dial-text-label:#ffffffb3;--dial-text-focus:#fff;--dial-text-primary:#fffffff2;--dial-text-secondary:#fff9;--dial-text-tertiary:#fff6;--dial-border:#ffffff1a;--dial-border-hover:#ffffff26;--dial-focus-ring:#fff9;--dial-timeline-clip-overlay:transparent;--dial-glass-bg:#212121;--dial-dropdown-bg:#2a2a2a;--dial-backdrop-blur:20px;--dial-radius:8px;--dial-row-height:36px;--dial-row-gap:6px;--dial-shadow:0 8px 32px #00000080;--dial-shadow-collapsed:0 4px 16px #00000040;--dial-shadow-dropdown:0 8px 24px #0006;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-family:system-ui,-apple-system,SF Pro Display,sans-serif;position:relative}.dialkit-panel{z-index:9999;max-height:calc(100vh - 32px);position:fixed;overflow:visible}.dialkit-root[data-mode=inline]{max-height:100%}.dialkit-panel[data-mode=inline]{z-index:auto;max-height:inherit;height:auto;position:static;overflow:visible}.dialkit-panel-inner{box-sizing:border-box;background:var(--dial-glass-bg);border:1px solid var(--dial-border);-webkit-backdrop-filter:blur(var(--dial-backdrop-blur));transform-origin:var(--dial-origin-y,top) var(--dial-origin-x,right);border-radius:14px;padding:10px 12px;transform:translateZ(0)}.dialkit-panel[data-origin-x=left]{--dial-origin-x:left}.dialkit-panel[data-origin-x=right]{--dial-origin-x:right}.dialkit-panel[data-origin-y=top]{--dial-origin-y:top}.dialkit-panel[data-origin-y=bottom]{--dial-origin-y:bottom}.dialkit-panel[data-position=top-left] .dialkit-panel-inner{max-height:calc(100vh - 80px);overflow-y:auto}.dialkit-panel-inner[data-collapsed=true]{transform-origin:50%;box-sizing:border-box;border-radius:50%;padding:12px}.dialkit-panel-inner[data-collapsed=true] .dialkit-panel-header{border-bottom:none;margin-bottom:0;padding-bottom:0}.dialkit-panel-inner[data-collapsed=true] .dialkit-folder-title-row{display:none}.dialkit-panel-inner[data-collapsed=true] .dialkit-folder-header-top{justify-content:center;padding:0}.dialkit-panel-inner::-webkit-scrollbar{display:none}.dialkit-panel-inner{-ms-overflow-style:none;scrollbar-width:none;overflow-anchor:none}.dialkit-panel-inner[data-folding=true]:not(.dialkit-panel-inline){height:var(--dial-panel-fold-height)!important}.dialkit-panel-inner:not([data-collapsed=true]){padding-top:0}.dialkit-panel-inner:not([data-collapsed=true])>.dialkit-folder-root>.dialkit-panel-header{z-index:3;background:var(--dial-glass-bg);padding-top:10px;position:sticky;top:0}.dialkit-panel-inner:not([data-collapsed=true])>.dialkit-folder-root>.dialkit-panel-header:before,.dialkit-folder-section>.dialkit-folder-header:before{content:\"\";z-index:-1;background:var(--dial-glass-bg);pointer-events:none;position:absolute;inset:0 -12px}.dialkit-panel-inner:not([data-collapsed=true])>.dialkit-folder-root>.dialkit-panel-header .dialkit-panel-icon{right:0}.dialkit-panel-inline{width:100%;height:auto;max-height:inherit;box-shadow:none;box-sizing:border-box;border:none;border-radius:0;overflow:visible}.dialkit-panel[data-mode=inline] .dialkit-panel-wrapper{width:100%;max-height:inherit;flex-direction:column;height:auto;display:flex}.dialkit-panel[data-position=top-right]{top:16px;right:16px}.dialkit-panel[data-position=top-left]{top:16px;left:16px}.dialkit-panel[data-position=bottom-right]{bottom:16px;right:16px}.dialkit-panel[data-position=bottom-left]{bottom:16px;left:16px}.dialkit-folder{border-bottom:1px solid var(--dial-surface-subtle);margin-bottom:8px;padding-bottom:8px}.dialkit-folder:last-child:not(.dialkit-folder-root){margin-bottom:0;padding-bottom:0}.dialkit-folder-root{border-bottom:none;margin-bottom:0;padding-bottom:0}.dialkit-panel-header{border-bottom:1px solid var(--dial-surface-subtle);margin-bottom:12px;padding-bottom:6px}.dialkit-panel:not([data-mode=inline]) .dialkit-panel-inner:not([data-collapsed=true])>.dialkit-folder-root>.dialkit-panel-header{cursor:grab}.dialkit-panel:not([data-mode=inline]) .dialkit-panel-inner:not([data-collapsed=true])>.dialkit-folder-root>.dialkit-panel-header:active{cursor:grabbing}.dialkit-panel:not([data-mode=inline]) .dialkit-panel-inner:not([data-collapsed=true]) .dialkit-panel-icon{color:var(--dial-text-label);opacity:.6}.dialkit-panel:not([data-mode=inline]) .dialkit-panel-icon{cursor:pointer}.dialkit-folder-header{cursor:pointer;-webkit-user-select:none;user-select:none}.dialkit-folder-header-top{justify-content:space-between;align-items:center;padding:0 0 8px;display:flex}.dialkit-folder-title{color:var(--dial-text-section);letter-spacing:-.01em;font-size:13px;font-weight:600;transition:color .15s;transform:translateY(-.5px)}.dialkit-folder-title-root{color:var(--dial-text-root);font-size:15px;font-weight:600;transform:translateZ(0)}.dialkit-folder-title-row{white-space:nowrap;flex:1;align-items:center;gap:6px;display:flex;overflow:hidden}.dialkit-folder-copy{cursor:pointer;background:0 0;border:none;justify-content:center;align-items:center;width:20px;height:20px;padding:0;display:flex}.dialkit-folder-copy svg{width:14px;height:14px;color:var(--dial-text-section)}.dialkit-folder-icon{box-sizing:border-box;width:20px;height:20px;color:var(--dial-text-label);opacity:.6;flex-shrink:0;padding:2px}.dialkit-panel-icon{width:16px;height:16px;color:var(--dial-text-focus);z-index:1;position:absolute;top:12px;right:12px}.dialkit-folder-content{will-change:transform}.dialkit-folder:not(.dialkit-folder-root)>.dialkit-folder-content{overflow-y:clip}.dialkit-folder-inner{gap:var(--dial-row-gap);flex-direction:column;padding-bottom:10px;display:flex}.dialkit-folder:not(.dialkit-folder-root){border-top:1px solid var(--dial-surface-subtle);border-bottom:1px solid var(--dial-surface-subtle);margin-top:4px;margin-bottom:4px;padding-bottom:0}.dialkit-folder:not(.dialkit-folder-root):last-child{border-bottom:none;margin-bottom:0}.dialkit-folder:not(.dialkit-folder-root)+.dialkit-folder:not(.dialkit-folder-root){border-top:none;margin-top:-10px}.dialkit-folder:not(.dialkit-folder-root)>.dialkit-folder-header{height:var(--dial-row-height);padding:0}.dialkit-folder:not(.dialkit-folder-root)>.dialkit-folder-header>.dialkit-folder-header-top{height:100%;padding:0}.dialkit-folder-root>.dialkit-folder-content>.dialkit-folder-inner{padding-bottom:0}.dialkit-folder-root>.dialkit-folder-content>.dialkit-folder-inner>.dialkit-folder:first-child:not(:has(~.dialkit-folder)){border-top:none;margin-top:0}.dialkit-panel[data-multiple=true] .dialkit-panel-inner:not([data-collapsed=true]){padding:0 12px}.dialkit-panel[data-multiple=true] .dialkit-panel-inner:not([data-collapsed=true]) .dialkit-panel-icon{top:14px}.dialkit-panel[data-multiple=true] .dialkit-folder-root>.dialkit-panel-header{margin-bottom:0;padding-top:0;padding-bottom:0}.dialkit-panel[data-multiple=true] .dialkit-folder-root>.dialkit-panel-header>.dialkit-folder-header-top,.dialkit-panel[data-multiple=true] .dialkit-folder-root>.dialkit-folder-content>.dialkit-folder-inner>.dialkit-folder>.dialkit-folder-header>.dialkit-folder-header-top{height:44px;padding:0}.dialkit-panel[data-multiple=true] .dialkit-folder-root>.dialkit-folder-content>.dialkit-folder-inner>.dialkit-folder>.dialkit-folder-header{height:auto}.dialkit-panel[data-multiple=true] .dialkit-folder-root>.dialkit-folder-content>.dialkit-folder-inner{gap:0}.dialkit-panel[data-multiple=true] .dialkit-folder-root>.dialkit-folder-content>.dialkit-folder-inner>.dialkit-folder{border-top:1px solid var(--dial-surface-subtle);border-bottom:none;margin:0;padding-bottom:0}.dialkit-panel[data-multiple=true] .dialkit-folder-root>.dialkit-folder-content>.dialkit-folder-inner>.dialkit-folder>.dialkit-folder-header .dialkit-folder-title{color:var(--dial-text-root);font-size:15px;font-weight:600;line-height:20px;transform:translateZ(0)}.dialkit-panel[data-multiple=true] .dialkit-folder-title-root{line-height:20px}.dialkit-panel[data-multiple=true] .dialkit-folder-root>.dialkit-folder-content>.dialkit-folder-inner>.dialkit-folder:first-child{border-top:none;margin-top:0}.dialkit-panel[data-multiple=true] .dialkit-folder-root>.dialkit-folder-content>.dialkit-folder-inner>.dialkit-folder+.dialkit-folder{margin-top:0}.dialkit-panel[data-multiple=true] .dialkit-folder-root>.dialkit-folder-content>.dialkit-folder-inner>.dialkit-folder>.dialkit-folder-content>.dialkit-folder-inner{padding-top:0;padding-bottom:12px}.dialkit-panel .dialkit-folder.dialkit-folder-section>.dialkit-folder-header{top:var(--dial-panel-header-height,0px);z-index:2;background:var(--dial-glass-bg);height:auto;position:sticky}.dialkit-folder-section{--dial-section-header-height:calc(44px + var(--dial-row-height) + 10px)}.dialkit-folder-inner :is(button,input,textarea,[tabindex]){scroll-margin-top:calc(var(--dial-panel-header-height,0px) + var(--dial-section-header-height,0px) + var(--dial-row-gap))}.dialkit-folder.dialkit-folder-section>.dialkit-folder-header>.dialkit-folder-header-top{height:var(--dial-row-height)}.dialkit-panel-section-toolbar-clip{overflow-y:clip}.dialkit-folder-section>.dialkit-folder-header>.dialkit-panel-section-toolbar-clip>.dialkit-panel-section-toolbar{padding-top:4px;padding-bottom:var(--dial-row-gap);box-sizing:content-box}.dialkit-panel-toolbar:empty,.dialkit-panel-section-toolbar:empty{display:none}.dialkit-slider-wrapper{height:var(--dial-row-height);position:relative}.dialkit-slider{cursor:pointer;-webkit-user-select:none;user-select:none;background:var(--dial-surface);border-radius:var(--dial-radius);touch-action:none;width:100%;height:100%;position:absolute;top:0;left:0;overflow:hidden}.dialkit-slider-hashmarks{pointer-events:none;position:absolute;inset:0}.dialkit-slider-hashmark{background:#fff0;border-radius:999px;width:1px;height:8px;transition:background .2s;position:absolute;top:50%;transform:translate(-50%)translateY(-50%)}.dialkit-slider-active .dialkit-slider-hashmark{background:var(--dial-border-hover)}.dialkit-slider-active .dialkit-slider-value{color:var(--dial-text-focus)}.dialkit-slider-fill{background:var(--dial-surface-active);pointer-events:none;transition:background .15s;position:absolute;top:0;bottom:0;left:0}.dialkit-slider-active .dialkit-slider-fill{background:var(--dial-border-hover)}.dialkit-slider-handle{background:var(--dial-text-primary);pointer-events:none;border-radius:999px;width:3px;height:20px;position:absolute;top:50%}.dialkit-slider-label{color:var(--dial-text-label);pointer-events:none;align-items:center;font-size:13px;font-weight:500;transition:color .15s;display:inline-flex;position:absolute;top:50%;left:10px;transform:translateY(calc(-50% - .5px))}.dialkit-slider-value{color:var(--dial-text-label);pointer-events:auto;border-bottom:1px solid #0000;padding-bottom:1px;font-family:Geist Mono,monospace;font-size:13px;font-weight:500;transition:color .15s,border-color .15s;position:absolute;top:50%;right:12px;transform:translateY(calc(.5px - 50%))}.dialkit-slider-value-editable{border-bottom-color:var(--dial-text-label)}.dialkit-slider-input{width:4ch;min-width:3ch;max-width:6ch;color:var(--dial-text-label);border:none;border-bottom:1px solid var(--dial-text-label);text-align:right;background:0 0;outline:none;padding:0 0 1px;font-family:Geist Mono,monospace;font-size:13px;font-weight:500;position:absolute;top:50%;right:12px;transform:translateY(-50%)}.dialkit-slider-input:focus{color:var(--dial-text-focus)}.dialkit-segmented{border-radius:var(--dial-radius);background:0 0;padding:2px;display:flex;position:relative}.dialkit-segmented-pill{background:var(--dial-surface-active);z-index:0;pointer-events:none;border-radius:6px;position:absolute;top:2px;bottom:2px}.dialkit-segmented-button{z-index:1;cursor:pointer;background:0 0;border:none;flex:none;padding:6px 8px;font-family:inherit;font-size:13px;font-weight:500;transition:color .15s;position:relative}.dialkit-segmented-button[data-active=true]{color:var(--dial-text-primary)}.dialkit-segmented-button[data-active=false]{color:var(--dial-text-label)}.dialkit-toggle{background:var(--dial-surface);border-radius:var(--dial-radius);cursor:pointer;-webkit-user-select:none;user-select:none;justify-content:space-between;align-items:center;padding:10px 16px;transition:background .15s;display:flex}.dialkit-toggle:hover{background:var(--dial-surface-hover)}.dialkit-toggle-label{color:var(--dial-text-label);font-size:13px;font-weight:500;transition:color .15s}.dialkit-toggle[data-checked=true] .dialkit-toggle-label{color:var(--dial-text-primary)}.dialkit-toggle-track{background:var(--dial-surface-active);border-radius:10px;width:36px;height:20px;transition:background .2s;position:relative}.dialkit-toggle[data-checked=true] .dialkit-toggle-track{background:var(--dial-border-hover)}.dialkit-toggle-thumb{background:var(--dial-text-primary);border-radius:8px;width:16px;height:16px;position:absolute;top:2px}.dialkit-button-group{flex-direction:column;gap:6px;display:flex}.dialkit-button{color:var(--dial-text-secondary);background:var(--dial-surface);border-radius:var(--dial-radius);cursor:pointer;border:none;flex:1;padding:10px 16px;font-family:inherit;font-size:13px;font-weight:500;transition:background .15s,color .15s}.dialkit-button:hover{background:var(--dial-surface-hover);color:var(--dial-text-primary)}.dialkit-button:active{background:var(--dial-surface-active)}.dialkit-labeled-control{height:var(--dial-row-height);background:var(--dial-surface);border-radius:var(--dial-radius);justify-content:space-between;align-items:center;gap:12px;padding:2px 10px 2px 12px;display:flex}.dialkit-labeled-control-label{color:var(--dial-text-label);flex-shrink:0;align-items:center;font-size:13px;font-weight:500;line-height:17px;display:flex}.dialkit-labeled-control .dialkit-segmented{flex-shrink:0;margin-right:-6px}.dialkit-action-button{width:160px;color:var(--dial-text-secondary);background:var(--dial-surface);border-radius:var(--dial-radius);cursor:pointer;border:none;flex-shrink:0;padding:10px 16px;font-family:inherit;font-size:13px;font-weight:500;transition:background .15s,color .15s}.dialkit-action-button:hover{background:var(--dial-surface-hover);color:var(--dial-text-primary)}.dialkit-action-button:active{background:var(--dial-surface-active)}.dialkit-actions-group{align-items:flex-start}.dialkit-actions-stack{flex-direction:column;gap:6px;width:160px;display:flex}.dialkit-spring-viz{border-radius:var(--dial-radius);background:var(--dial-surface);width:100%;overflow:visible}.dialkit-easing-viz{aspect-ratio:256/180;border-radius:var(--dial-radius);background:var(--dial-surface);isolation:isolate;width:100%;position:relative;overflow:hidden}.dialkit-easing-viz svg{pointer-events:none;width:100%;height:100%;position:absolute;inset:0}.dialkit-easing-reference{stroke:var(--dial-text-tertiary);stroke-width:1px;stroke-dasharray:3 4;opacity:.4}.dialkit-easing-tangent{stroke:var(--dial-text-tertiary);stroke-width:1px}.dialkit-easing-curve{fill:none;stroke:var(--dial-text-primary);stroke-width:2px;stroke-linecap:round}.dialkit-easing-endpoint{fill:var(--dial-text-secondary)}.dialkit-easing-handle{cursor:grab;touch-action:none;-webkit-user-select:none;user-select:none;background:0 0;border:0;border-radius:50%;place-items:center;width:24px;height:24px;padding:0;display:grid;position:absolute;transform:translate(-50%,-50%)}.dialkit-easing-handle:after{content:\"\";box-sizing:border-box;border:1.5px solid var(--dial-text-secondary);background:var(--dial-surface);border-radius:50%;width:10px;height:10px}.dialkit-easing-handle:hover:after,.dialkit-easing-handle:focus-visible:after,.dialkit-easing-handle[data-dragging]:after{border-color:var(--dial-text-primary);background:var(--dial-text-primary)}.dialkit-easing-handle[data-dragging]{cursor:grabbing;z-index:1}.dialkit-easing-handle:disabled{pointer-events:none}.dialkit-easing-instructions{clip-path:inset(50%);white-space:nowrap;width:1px;height:1px;padding:0;position:absolute;overflow:hidden}.dialkit-panel-wrapper{flex-direction:column;display:inline-flex}.dialkit-panel-toolbar{height:var(--dial-row-height);align-items:center;gap:6px;min-width:0;margin-bottom:6px;display:flex;overflow:hidden}.dialkit-panel-section-toolbar{width:100%;height:var(--dial-row-height);align-items:center;gap:6px;min-width:0;display:flex;overflow:hidden}.dialkit-toolbar-add{width:var(--dial-row-height);height:var(--dial-row-height);background:var(--dial-surface);border-radius:var(--dial-radius);cursor:pointer;border:none;flex-shrink:0;justify-content:center;align-items:center;padding:0;transition:background .15s;display:flex}.dialkit-toolbar-add:hover{background:var(--dial-surface-hover)}.dialkit-timeline-toolbar-toggle[data-active]{background:var(--dial-surface-active);color:var(--dial-text-root)}.dialkit-toolbar-add svg{width:16px;height:16px;color:var(--dial-text-label)}.dialkit-timeline-toolkit-only{height:var(--dial-row-height);border-radius:var(--dial-radius);background:var(--dial-surface-subtle);color:var(--dial-text-secondary);align-items:center;padding:0 12px;font-size:12px;display:flex}.dialkit-toolbar-copy{height:var(--dial-row-height);color:var(--dial-text-label);background:var(--dial-surface);border-radius:var(--dial-radius);cursor:pointer;border:none;flex-shrink:0;align-items:center;gap:6px;padding:0 12px;font-family:inherit;font-size:13px;font-weight:500;transition:background .15s;display:flex;position:relative}.dialkit-toolbar-copy:hover{background:var(--dial-surface-hover)}.dialkit-toolbar-copy-icon-wrap{flex-shrink:0;width:16px;height:16px;position:relative}.dialkit-toolbar-copy-icon{width:16px;height:16px;position:absolute;inset:0}.dialkit-text-control{box-sizing:border-box;height:var(--dial-row-height);min-height:var(--dial-row-height);padding:calc((var(--dial-row-height) - 18px) / 2) 12px;background:var(--dial-surface);border-radius:var(--dial-radius);justify-content:space-between;align-items:flex-start;gap:12px;display:flex;position:relative;overflow:clip}.dialkit-text-label{color:var(--dial-text-label);flex-shrink:0;font-size:13px;font-weight:500;line-height:18px}.dialkit-text-input{box-sizing:border-box;margin:0;margin-right:calc(-1 * var(--dial-text-gutter,0px));resize:none;overflow-wrap:anywhere;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-gutter:stable;scrollbar-color:var(--dial-text-tertiary) transparent;width:0;min-width:0;height:18px;color:var(--dial-text-label);text-align:right;cursor:text;background:0 0;border:none;outline:none;flex:1;padding:0;font-family:inherit;font-size:13px;font-weight:500;line-height:18px;display:block;overflow:hidden}.dialkit-text-control[data-autosized]{transition:height .18s cubic-bezier(.2,0,0,1)}.dialkit-text-input::-webkit-scrollbar{width:6px}.dialkit-text-input::-webkit-scrollbar-track{background:0 0}.dialkit-text-input::-webkit-scrollbar-thumb{background:var(--dial-text-tertiary);border-radius:3px}@media (prefers-reduced-motion:reduce){.dialkit-text-control[data-autosized]{transition:none}}.dialkit-text-input:focus{color:var(--dial-text-focus)}.dialkit-text-input:focus-visible{background-image:linear-gradient(var(--dial-focus-ring), var(--dial-focus-ring));background-position:4px bottom;background-repeat:no-repeat;background-size:calc(100% - var(--dial-text-gutter,0px) - 4px) 1px}.dialkit-text-input::placeholder{color:var(--dial-text-tertiary)}.dialkit-select-trigger{width:100%;height:var(--dial-row-height);color:var(--dial-text-label);background:var(--dial-surface);border-radius:var(--dial-radius);cursor:pointer;border:none;justify-content:space-between;align-items:center;padding:0 12px;font-family:inherit;font-size:13px;font-weight:500;transition:background .15s;display:flex}.dialkit-select-trigger:hover{background:var(--dial-surface-hover)}.dialkit-select-trigger[data-open=true]{background:var(--dial-surface-active)}.dialkit-select-label{color:var(--dial-text-label);flex-shrink:0;font-size:13px;font-weight:500;transform:translateY(-.5px)}.dialkit-select-right{align-items:center;gap:8px;display:flex}.dialkit-select-value{color:var(--dial-text-label);text-overflow:ellipsis;white-space:nowrap;font-size:13px;font-weight:500;overflow:hidden;transform:translateY(-.5px)}.dialkit-select-chevron{box-sizing:border-box;opacity:.6;flex-shrink:0;width:20px;height:20px;padding:2px}.dialkit-select-dropdown{box-sizing:border-box;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:var(--dial-border-hover) transparent;background:var(--dial-glass-bg);border:1px solid var(--dial-border);border-radius:var(--dial-radius);z-index:10000;box-shadow:var(--dial-shadow-dropdown);margin:0;padding:4px;inset:auto;overflow-y:auto}.dialkit-select-option{width:100%;min-height:36px;color:var(--dial-text-label);cursor:pointer;text-align:left;background:0 0;border:none;border-radius:6px;padding:8px 10px;font-family:inherit;font-size:13px;font-weight:500;transition:background .15s,color .15s;display:block}.dialkit-select-option:hover{background:var(--dial-surface-hover)}.dialkit-select-option[data-selected=true]{color:var(--dial-text-primary);background:var(--dial-surface-active)}.dialkit-image-control{width:100%;height:var(--dial-row-height);border-radius:var(--dial-radius);background:var(--dial-surface);color:var(--dial-text-label);text-align:left;cursor:pointer;border:0;align-items:center;gap:8px;padding:0 6px 0 12px;font:500 13px system-ui,-apple-system,sans-serif;transition:background .15s,box-shadow .15s;display:flex}.dialkit-image-control:hover{background:var(--dial-surface-hover)}.dialkit-image-control[data-open=true]{background:var(--dial-surface-active);box-shadow:inset 0 0 0 1px var(--dial-border-hover);color:var(--dial-text-primary)}.dialkit-image-label{flex-shrink:0}.dialkit-image-value{text-overflow:ellipsis;white-space:nowrap;text-align:right;min-width:0;color:var(--dial-text-secondary);flex:1;font-size:12px;overflow:hidden}.dialkit-image-frame{border-radius:var(--dial-radius);background:repeating-conic-gradient(var(--dial-surface) 0% 25%, transparent 0% 50%) 0 / 12px 12px, var(--dial-surface);display:block;position:relative;overflow:hidden}.dialkit-image-img{object-fit:cover;width:100%;height:100%;display:block}.dialkit-image-fallback{color:var(--dial-text-tertiary);place-items:center;display:grid;position:absolute;inset:0}.dialkit-image-fallback svg{width:24px;height:24px}.dialkit-image-thumbnail{height:26px;box-shadow:inset 0 0 0 1px var(--dial-border);border-radius:5px;flex:0 0 38px}.dialkit-image-thumbnail svg{width:16px;height:16px}.dialkit-image-popover{z-index:10002;box-sizing:border-box;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:var(--dial-border-hover) transparent;border:1px solid var(--dial-border);background:var(--dial-glass-bg);box-shadow:var(--dial-shadow);color:var(--dial-text-label);border-radius:14px;flex-direction:column;gap:10px;margin:0;padding:12px;font:500 13px system-ui,-apple-system,sans-serif;animation:.16s ease-out dialkit-color-enter;display:flex;position:fixed;inset:auto;overflow-y:auto}.dialkit-image-popover *,.dialkit-image-popover :before,.dialkit-image-popover :after{box-sizing:border-box}.dialkit-image-popover>*{flex-shrink:0}.dialkit-image-heading{justify-content:space-between;align-items:center;gap:12px;min-width:0;display:flex}.dialkit-image-title{color:var(--dial-text-primary)}.dialkit-image-clear{color:var(--dial-text-tertiary);font:inherit;cursor:pointer;background:0 0;border:0;border-radius:4px;margin:-4px -4px -4px 0;padding:4px;font-size:11px}.dialkit-image-clear:hover{color:var(--dial-text-primary)}.dialkit-image-grid{gap:var(--dial-row-gap);grid-template-columns:repeat(3,minmax(0,1fr));display:grid}.dialkit-image-option{border-radius:calc(var(--dial-radius) + 3px);cursor:pointer;background:0 0;border:1px solid #0000;width:100%;padding:3px;transition:border-color .15s,background .15s;display:block;position:relative}.dialkit-image-option-preview{aspect-ratio:4/3;border-radius:calc(var(--dial-radius) - 1px);width:100%}.dialkit-image-option:hover{background:var(--dial-surface-hover);border-color:var(--dial-border-hover)}.dialkit-image-option[aria-pressed=true]{border-color:var(--dial-text-label);background:var(--dial-surface-active)}.dialkit-image-upload{flex:none;justify-content:center;align-items:center;gap:8px;width:100%;display:flex}.dialkit-image-upload svg{width:15px;height:15px}.dialkit-image-popover[data-dragging=true] .dialkit-image-upload{background:var(--dial-surface-hover);color:var(--dial-text-primary)}.dialkit-image-upload[aria-disabled=true]{opacity:.6;cursor:progress}.dialkit-image-empty{border-radius:var(--dial-radius);background:var(--dial-surface);color:var(--dial-text-tertiary);text-align:center;padding:28px 12px;font-weight:400}.dialkit-image-status{overflow-wrap:anywhere;font-size:11px;font-weight:400;line-height:1.5}.dialkit-image-popover [hidden],.dialkit-image-frame [hidden],.dialkit-image-file{display:none}@media (prefers-reduced-motion:reduce){.dialkit-image-popover{animation:none}}.dialkit-pad{gap:var(--dial-row-gap);min-width:0;display:grid}.dialkit-pad-caption{min-width:0;height:var(--dial-row-height);border-radius:var(--dial-radius);background:var(--dial-surface);align-items:center;padding:0 12px;display:flex}.dialkit-pad-label{min-width:0;color:var(--dial-text-label);text-overflow:ellipsis;white-space:nowrap;flex:1;font-size:13px;font-weight:500;overflow:hidden}.dialkit-pad-surface{aspect-ratio:1;border-radius:var(--dial-radius);background:var(--dial-surface);cursor:crosshair;touch-action:none;-webkit-user-select:none;user-select:none;width:100%;position:relative;overflow:hidden}.dialkit-pad-plane{pointer-events:none;position:absolute;inset:12px}.dialkit-pad-grid{pointer-events:none;position:absolute;inset:0}.dialkit-pad-grid-line{background:var(--dial-border);opacity:.65;position:absolute}.dialkit-pad-grid-vertical{width:1px;top:0;bottom:0;transform:translate(-50%)}.dialkit-pad-grid-horizontal{height:1px;left:0;right:0;transform:translateY(-50%)}.dialkit-pad-center{background:var(--dial-text-tertiary);border-radius:50%;width:3px;height:3px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.dialkit-pad-point{background:var(--dial-text-primary);pointer-events:auto;cursor:grab;border-radius:50%;width:12px;height:12px;transition:box-shadow .15s;position:absolute;transform:translate(-50%,-50%);box-shadow:0 0 #0000,0 2px 4px #0003}.dialkit-pad-surface[data-dragging=true],.dialkit-pad-surface[data-dragging=true] .dialkit-pad-point{cursor:grabbing}.dialkit-pad-surface[data-dragging=true] .dialkit-pad-point{box-shadow:0 0 0 6px var(--dial-border-hover), 0 2px 6px #0003}.dialkit-pad-fields{gap:var(--dial-row-gap);grid-template-columns:repeat(3,minmax(0,1fr));display:grid}.dialkit-pad-field{min-width:0;height:var(--dial-row-height);border-radius:var(--dial-radius);background:var(--dial-surface);align-items:center;gap:4px;padding:0 12px 0 10px;display:flex}.dialkit-pad-axis{text-overflow:ellipsis;white-space:nowrap;min-width:0;max-width:35%;color:var(--dial-text-label);flex-shrink:0;font-size:13px;font-weight:500;overflow:hidden}.dialkit-pad-value{width:100%;min-width:0;color:var(--dial-text-label);text-align:right;background:0 0;border:0;padding:0 0 1px;font:500 13px Geist Mono,monospace}.dialkit-pad-field:focus-within{background:var(--dial-surface-hover)}.dialkit-pad-value:focus-visible{box-shadow:inset 0 -1px var(--dial-focus-ring)}.dialkit-pad-value:focus{color:var(--dial-text-focus)}.dialkit-pad-instructions{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}@media (prefers-reduced-motion:reduce){.dialkit-pad-point{transition:none}}.dialkit-color-control{height:var(--dial-row-height);background:var(--dial-surface);border-radius:var(--dial-radius);justify-content:space-between;align-items:center;gap:12px;padding:0 12px;transition:background .15s,box-shadow .15s;display:flex}.dialkit-color-control[data-open=true]{background:var(--dial-surface-active);box-shadow:inset 0 0 0 1px var(--dial-border-hover)}.dialkit-color-control[data-open=true] .dialkit-color-label,.dialkit-color-control[data-open=true] .dialkit-color-value{color:var(--dial-text-primary)}.dialkit-color-label{color:var(--dial-text-label);flex-shrink:0;font-size:13px;font-weight:500;transform:translateY(-.5px)}.dialkit-color-inputs{flex:1;justify-content:flex-end;align-items:center;gap:8px;min-width:0;display:flex}.dialkit-color-value{width:100%;min-width:0;color:var(--dial-text-label);text-align:right;text-overflow:ellipsis;background:0 0;border:0;outline:none;padding:4px 0;font:500 13px Geist Mono,monospace}.dialkit-color-value:focus{color:var(--dial-text-focus)}.dialkit-color-swatch{border:1px solid var(--dial-border-hover);background:linear-gradient(var(--dial-color), var(--dial-color)), repeating-conic-gradient(#aaa 0% 25%, #eee 0% 50%) 0 / 8px 8px;cursor:pointer;border-radius:5px;flex:0 0 20px;width:20px;height:20px;padding:0;transition:transform .15s;box-shadow:inset 0 0 0 1px #ffffff14}.dialkit-color-swatch:hover{transform:scale(1.08)}.dialkit-color-popover{gap:var(--dial-row-gap);z-index:10002;box-sizing:border-box;overscroll-behavior:contain;scrollbar-width:thin;border:1px solid var(--dial-border);background:var(--dial-glass-bg);box-shadow:var(--dial-shadow);color:var(--dial-text-label);border-radius:14px;margin:0;padding:10px;animation:.16s ease-out dialkit-color-enter;display:grid;position:fixed;inset:auto;overflow-y:auto}.dialkit-color-popover *,.dialkit-color-popover :before,.dialkit-color-popover :after{box-sizing:border-box}.dialkit-color-plane{border-radius:var(--dial-radius);touch-action:none;cursor:crosshair;-webkit-user-select:none;user-select:none;height:160px;position:relative}.dialkit-color-canvas{border-radius:inherit;width:100%;height:100%;display:block}.dialkit-color-plane:after{content:\"\";border-radius:inherit;pointer-events:none;position:absolute;inset:0;box-shadow:inset 0 0 0 1px #0000001a}.dialkit-color-marker{z-index:1;pointer-events:none;border:2px solid #fff;border-radius:50%;width:12px;height:12px;margin:-6px;position:absolute;box-shadow:0 2px 4px #0000004d}.dialkit-color-tracks{gap:var(--dial-row-gap);display:grid}.dialkit-color-track-row{height:var(--dial-row-height);border-radius:var(--dial-radius);background:var(--dial-surface);align-items:center;gap:12px;padding:0 12px;font-size:13px;font-weight:500;display:flex}.dialkit-color-track-row>span{color:var(--dial-text-label);flex:0 0 52px}.dialkit-color-track{appearance:none;cursor:pointer;touch-action:none;background:0 0;border:0;flex:1;min-width:0;height:100%;margin:0;padding:0}.dialkit-color-hue{--dial-color-thumb-bg:var(--dial-color-thumb)}.dialkit-color-opacity{--dial-color-track-bg:linear-gradient(to right, transparent, var(--dial-color-opaque)), repeating-conic-gradient(#aaa 0% 25%, #eee 0% 50%) 0 / 8px 8px;--dial-color-thumb-bg:linear-gradient(var(--dial-color-thumb), var(--dial-color-thumb)), repeating-conic-gradient(#aaa 0% 25%, #eee 0% 50%) 0 / 8px 8px}.dialkit-color-track::-webkit-slider-runnable-track{background:var(--dial-color-track-bg);border-radius:4px;height:16px}.dialkit-color-track::-moz-range-track{background:var(--dial-color-track-bg);border:0;border-radius:4px;height:16px}.dialkit-color-track::-webkit-slider-thumb{-webkit-appearance:none;box-sizing:border-box;background:var(--dial-color-thumb-bg);background-clip:padding-box;border:2px solid #fff;border-radius:5px;width:16px;height:24px;margin-top:-4px;box-shadow:0 2px 4px #0000004d}.dialkit-color-track::-moz-range-thumb{box-sizing:border-box;background:var(--dial-color-thumb-bg);background-clip:padding-box;border:2px solid #fff;border-radius:5px;width:16px;height:24px;box-shadow:0 2px 4px #0000004d}.dialkit-color-format-row{padding:2px}.dialkit-color-format-row .dialkit-color-formats{flex:1;min-width:0;margin-right:0}.dialkit-color-formats .dialkit-segmented-pill{width:calc(33.3333% - 1.33333px);transition:transform .2s cubic-bezier(.25,1,.5,1);left:2px}.dialkit-color-format{white-space:nowrap;flex:1 1 0;min-width:0}.dialkit-color-format:hover{color:var(--dial-text-primary)}.dialkit-color-css-input{width:100%;height:var(--dial-row-height);border-radius:var(--dial-radius);background:var(--dial-surface);color:var(--dial-text-label);border:0;outline:none;padding:0 12px;font:500 13px Geist Mono,monospace;display:block}.dialkit-color-css-input:focus{color:var(--dial-text-focus)}.dialkit-color-popover input[aria-invalid=true],.dialkit-color-value[aria-invalid=true]{color:#ef7777}@keyframes dialkit-color-enter{0%{opacity:0;transform:translateY(3px)scale(.98)}to{opacity:1;transform:none}}@media (prefers-reduced-motion:reduce){.dialkit-color-popover{animation:none}.dialkit-color-formats .dialkit-segmented-pill{transition:none}}.dialkit-preset-manager{flex:1;position:relative}.dialkit-preset-trigger{width:100%;height:var(--dial-row-height);color:var(--dial-text-label);background:var(--dial-surface);border-radius:var(--dial-radius);cursor:pointer;border:none;justify-content:space-between;align-items:center;padding:0 12px;font-family:inherit;font-size:13px;font-weight:500;transition:background .15s;display:flex}.dialkit-preset-trigger:hover{background:var(--dial-surface-hover)}.dialkit-preset-trigger[data-disabled=true]{cursor:default}.dialkit-preset-trigger[data-disabled=true]:hover{background:var(--dial-surface)}.dialkit-preset-trigger[data-open=true]{background:var(--dial-surface-active)}.dialkit-preset-label{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.dialkit-preset-dropdown{overscroll-behavior:contain;background:var(--dial-dropdown-bg);border:1px solid var(--dial-border);z-index:10000;width:max-content;box-shadow:var(--dial-shadow-dropdown);border-radius:12px;margin:0;padding:4px;inset:auto;overflow-y:auto}.dialkit-preset-list{border-bottom:1px solid var(--dial-border);flex-direction:column;gap:2px;margin-bottom:4px;padding-bottom:4px;display:flex}.dialkit-preset-item{box-sizing:border-box;cursor:pointer;border-radius:8px;justify-content:space-between;align-items:center;gap:8px;height:32px;padding:0 10px;transition:background .15s;display:flex}.dialkit-preset-item+.dialkit-preset-item{margin-top:2px}.dialkit-preset-item:hover{background:var(--dial-surface-hover)}.dialkit-preset-item[data-active=true]{background:var(--dial-surface-active)}.dialkit-preset-name{text-align:left;cursor:pointer;min-width:0;color:var(--dial-text-label);text-overflow:ellipsis;white-space:nowrap;background:0 0;border:0;border-radius:4px;flex:1;padding:0;font-family:inherit;font-size:13px;font-weight:500;overflow:hidden}.dialkit-preset-item[data-active=true] .dialkit-preset-name{color:var(--dial-text-primary)}.dialkit-preset-delete{cursor:pointer;opacity:0;background:0 0;border:none;flex-shrink:0;justify-content:center;align-items:center;width:24px;height:24px;padding:0;transition:opacity .15s;display:flex}.dialkit-preset-item:hover .dialkit-preset-delete,.dialkit-preset-item:focus-within .dialkit-preset-delete{opacity:.6}.dialkit-preset-item:focus-within{background:var(--dial-surface-hover)}.dialkit-preset-delete:hover{opacity:1!important}.dialkit-preset-delete svg{width:14px;height:14px;color:var(--dial-text-focus);pointer-events:none;transition:color .15s}.dialkit-preset-delete:hover svg{color:#ff3b30}.dialkit-preset-save-btn{width:100%;color:var(--dial-text-label);cursor:pointer;background:0 0;border:none;border-radius:6px;justify-content:center;align-items:center;gap:6px;padding:8px 10px;font-family:inherit;font-size:13px;font-weight:500;transition:background .15s,color .15s;display:flex}.dialkit-preset-save-btn:hover{background:var(--dial-surface-hover);color:var(--dial-text-primary)}.dialkit-preset-save-btn svg{width:12px;height:12px}.dialkit-preset-save-row{align-items:center;gap:6px;padding:4px;display:flex}.dialkit-preset-input{min-width:0;color:var(--dial-text-primary);background:var(--dial-surface);border:1px solid var(--dial-border);border-radius:6px;outline:none;flex:1;padding:6px 8px;font-family:inherit;font-size:13px}.dialkit-preset-input:focus{border-color:var(--dial-text-label)}.dialkit-preset-input::placeholder{color:var(--dial-text-tertiary)}.dialkit-preset-confirm{background:var(--dial-surface);cursor:pointer;border:none;border-radius:6px;justify-content:center;align-items:center;width:28px;height:28px;padding:0;transition:background .15s;display:flex}.dialkit-preset-confirm:hover:not(:disabled){background:var(--dial-surface-hover)}.dialkit-preset-confirm:disabled{opacity:.4;cursor:not-allowed}.dialkit-preset-confirm svg{width:14px;height:14px;color:var(--dial-text-label)}.dialkit-shortcut-pill{color:var(--dial-text-tertiary);background:var(--dial-surface-subtle);letter-spacing:.02em;white-space:nowrap;vertical-align:middle;border-radius:4px;margin-left:6px;padding:1px 5px;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:600;line-height:16px;transition:color .15s,background .15s;display:inline-block}.dialkit-shortcut-pill-active{color:var(--dial-text-primary);background:var(--dial-border-hover)}.dialkit-shortcuts-trigger{width:var(--dial-row-height);height:var(--dial-row-height);background:var(--dial-surface);border-radius:var(--dial-radius);cursor:pointer;border:none;flex-shrink:0;justify-content:center;align-items:center;padding:0;transition:background .15s;display:flex}.dialkit-shortcuts-trigger:hover{background:var(--dial-surface-hover)}.dialkit-shortcuts-trigger svg{width:16px;height:16px;color:var(--dial-text-label)}.dialkit-shortcuts-dropdown{background:var(--dial-dropdown-bg);border:1px solid var(--dial-border);z-index:10000;box-shadow:var(--dial-shadow-dropdown);border-radius:12px;min-width:200px;padding:8px}.dialkit-shortcuts-title{color:var(--dial-text-tertiary);text-transform:uppercase;letter-spacing:.05em;padding:4px 8px 8px;font-size:11px;font-weight:600}.dialkit-shortcuts-list{flex-direction:column;gap:2px;display:flex}.dialkit-shortcuts-row{border-radius:6px;align-items:center;gap:10px;padding:6px 8px;display:flex}.dialkit-shortcuts-row-key{color:var(--dial-text-secondary);background:var(--dial-surface-subtle);text-align:center;border-radius:4px;min-width:28px;padding:2px 6px;font-family:ui-monospace,SF Mono,Courier New,monospace;font-size:11px;font-weight:600}.dialkit-shortcuts-row-label{color:var(--dial-text-label);flex:1;font-size:13px;font-weight:500}.dialkit-shortcuts-row-mode{color:var(--dial-text-tertiary);font-size:11px;font-style:italic;font-weight:500}.dialkit-shortcuts-hint{color:var(--dial-text-tertiary);border-top:1px solid var(--dial-border);margin-top:4px;padding:6px 8px 2px;font-size:11px}.dialkit-root[data-theme=light]{--dial-surface:#0000000a;--dial-surface-hover:#00000014;--dial-surface-active:#0000001a;--dial-surface-subtle:#0000000f;--dial-text-root:#000;--dial-text-section:#000000a6;--dial-text-label:#0009;--dial-text-focus:#000;--dial-text-primary:#000000e6;--dial-text-secondary:#0000008c;--dial-text-tertiary:#00000059;--dial-border:#0000001a;--dial-border-hover:#00000026;--dial-focus-ring:#0000008c;--dial-timeline-clip-overlay:#00000047;--dial-glass-bg:#fafafa;--dial-dropdown-bg:#fff;--dial-shadow:0 4px 20px #00000014;--dial-shadow-collapsed:0 2px 10px #0000000f;--dial-shadow-dropdown:0 4px 16px #00000014}.dialkit-root[data-theme=light] .dialkit-spring-viz line{stroke:#00000014}.dialkit-root[data-theme=light] .dialkit-spring-viz line[stroke-dasharray]{stroke:#00000026}.dialkit-root[data-theme=light] .dialkit-spring-viz path{stroke:#00000080}.dialkit-root[data-theme=light] .dialkit-toggle-thumb{box-shadow:0 0 0 1px #0000000f,0 1px 2px #00000014}@media (prefers-color-scheme:light){.dialkit-root[data-theme=system]{--dial-surface:#0000000a;--dial-surface-hover:#00000014;--dial-surface-active:#0000001a;--dial-surface-subtle:#0000000f;--dial-text-root:#000;--dial-text-section:#000000a6;--dial-text-label:#0009;--dial-text-focus:#000;--dial-text-primary:#000000e6;--dial-text-secondary:#0000008c;--dial-text-tertiary:#00000059;--dial-border:#0000001a;--dial-border-hover:#00000026;--dial-focus-ring:#0000008c;--dial-timeline-clip-overlay:#00000047;--dial-glass-bg:#fafafa;--dial-dropdown-bg:#fff;--dial-shadow:0 4px 20px #00000014;--dial-shadow-collapsed:0 2px 10px #0000000f;--dial-shadow-dropdown:0 4px 16px #00000014}.dialkit-root[data-theme=system] .dialkit-spring-viz line{stroke:#00000014}.dialkit-root[data-theme=system] .dialkit-spring-viz line[stroke-dasharray]{stroke:#00000026}.dialkit-root[data-theme=system] .dialkit-spring-viz path{stroke:#00000080}.dialkit-root[data-theme=system] .dialkit-toggle-thumb{box-shadow:0 0 0 1px #0000000f,0 1px 2px #00000014}}.dialkit-timeline{z-index:9998;position:fixed;bottom:12px;left:12px;right:12px}.dialkit-timeline[hidden]{display:none}.dialkit-timeline-dock{box-sizing:border-box;background:var(--dial-glass-bg);border:1px solid var(--dial-border);-webkit-backdrop-filter:blur(var(--dial-backdrop-blur));overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:var(--dial-text-tertiary) transparent;border-radius:14px;flex-direction:column;gap:10px;padding:0 12px 10px;display:flex;position:relative;overflow:hidden auto}.dialkit-timeline-resize-handle{z-index:9;cursor:ns-resize;touch-action:none;height:10px;position:absolute;top:-4px;left:0;right:0}.dialkit-timeline-dock::-webkit-scrollbar{width:8px}.dialkit-timeline-dock::-webkit-scrollbar-track{background:0 0}.dialkit-timeline-dock::-webkit-scrollbar-thumb{background:var(--dial-text-tertiary);border-radius:999px}.dialkit-timeline-section{--dial-timeline-label-w:96px;--dial-timeline-actions-w:284px;--dial-timeline-header-h:calc(var(--dial-row-height) + 4px)}.dialkit-timeline-section+.dialkit-timeline-section{border-top:1px solid var(--dial-border);padding-top:10px}.dialkit-timeline-header{z-index:7;box-sizing:border-box;height:var(--dial-timeline-header-h);background:var(--dial-glass-bg);-webkit-backdrop-filter:blur(var(--dial-backdrop-blur));grid-template-columns:auto minmax(100px,1fr) auto;align-items:center;gap:12px;margin:0;padding:4px 0 0;display:grid;position:sticky;top:0}.dialkit-timeline-header[data-open]{grid-template-columns:minmax(0,1fr) auto;gap:12px}.dialkit-timeline-header:not([data-open]){grid-template-columns:var(--dial-timeline-label-w) minmax(0, 1fr) auto;gap:0}.dialkit-timeline-header:not([data-open]) .dialkit-timeline-identity{width:var(--dial-timeline-label-w);box-sizing:border-box;padding-right:10px;overflow:hidden}.dialkit-timeline-header:not([data-open]) .dialkit-timeline-title{text-overflow:ellipsis;overflow:hidden}.dialkit-timeline-header:not([data-open]) .dialkit-timeline-overview{margin-right:12px}.dialkit-timeline-identity{align-items:center;gap:10px;min-width:0;display:flex}.dialkit-timeline-title{min-width:0;color:var(--dial-text-root);letter-spacing:-.01em;white-space:nowrap;font-size:15px;font-weight:600;display:block}.dialkit-timeline-header[data-open] .dialkit-timeline-identity{width:100%;overflow:hidden}.dialkit-timeline-header[data-open] .dialkit-timeline-title{text-overflow:ellipsis;flex:0 auto;width:-moz-fit-content;width:fit-content;max-width:100%;display:inline-block;overflow:hidden}.dialkit-timeline-time{font-variant-numeric:tabular-nums;color:var(--dial-text-label);white-space:nowrap;font-family:Geist Mono,ui-monospace,monospace;font-size:13px;font-weight:500}.dialkit-timeline-overview{background:var(--dial-surface-subtle);cursor:col-resize;touch-action:none;-webkit-user-select:none;user-select:none;border-radius:999px;min-width:60px;height:12px;position:relative;overflow:hidden}.dialkit-timeline-overview-viewport{border-radius:inherit;pointer-events:none;position:absolute;inset-block:0}.dialkit-timeline-overview-viewport[data-zoomed]{background:color-mix(in srgb, var(--dial-text-tertiary) 18%, transparent);box-shadow:inset 0 0 0 1px var(--dial-border)}.dialkit-timeline-overview-progress{background:var(--dial-text-tertiary);opacity:.35;pointer-events:none;border-radius:999px 0 0 999px;position:absolute;inset:0 auto 0 0}.dialkit-timeline-overview-playhead{background:var(--dial-text-root);pointer-events:none;border-radius:2px;width:2px;position:absolute;top:0;bottom:0;transform:translate(-1px)}.dialkit-timeline-actions{align-items:center;gap:6px;display:flex}.dialkit-timeline-header[data-open] .dialkit-timeline-actions{box-sizing:border-box;justify-content:flex-end;width:auto;padding-left:0}.dialkit-timeline-actions .dialkit-preset-manager{flex:0 0 120px;width:120px}.dialkit-timeline-chevron{width:20px;height:var(--dial-row-height);cursor:pointer;color:var(--dial-text-label);opacity:.6;background:0 0;border:none;justify-content:center;align-items:center;padding:2px;transition:opacity .15s;display:flex}.dialkit-timeline-chevron:hover{opacity:1}.dialkit-timeline-chevron svg{width:16px;height:16px;transition:transform .18s}.dialkit-timeline-chevron[data-open=true] svg{transform:rotate(180deg)}.dialkit-timeline-body{margin-top:0;overflow:visible}.dialkit-timeline-scroll-row{z-index:6;grid-template-columns:var(--dial-timeline-label-w) minmax(0, 1fr);background:var(--dial-glass-bg);-webkit-backdrop-filter:blur(var(--dial-backdrop-blur));margin-top:6px;margin-bottom:-10px;padding:4px 0 10px;display:grid;position:sticky;bottom:-10px}.dialkit-timeline-horizontal-scroll{scrollbar-width:thin;scrollbar-color:var(--dial-text-tertiary) transparent;overscroll-behavior-x:contain;min-width:0;height:10px;overflow:auto hidden}.dialkit-timeline-horizontal-scroll>div{height:1px}.dialkit-timeline-horizontal-scroll::-webkit-scrollbar{height:8px}.dialkit-timeline-horizontal-scroll::-webkit-scrollbar-track{background:0 0}.dialkit-timeline-horizontal-scroll::-webkit-scrollbar-thumb{background:var(--dial-text-tertiary);border-radius:999px}.dialkit-timeline-grid{flex-direction:column;gap:6px;display:flex;position:relative}.dialkit-timeline-row{grid-template-columns:var(--dial-timeline-label-w) minmax(0, 1fr);align-items:stretch;display:grid}.dialkit-timeline-label{flex:0 0 var(--dial-timeline-label-w);box-sizing:border-box;color:var(--dial-text-label);text-overflow:ellipsis;white-space:nowrap;-webkit-user-select:none;user-select:none;align-items:center;gap:4px;padding-right:10px;font-size:13px;font-weight:500;display:flex;overflow:hidden}.dialkit-timeline-ruler{cursor:col-resize;touch-action:none;-webkit-user-select:none;user-select:none;z-index:5;min-width:0;height:28px;position:relative;overflow:visible}.dialkit-timeline-ruler-row{top:var(--dial-timeline-header-h);z-index:6;background:var(--dial-glass-bg);height:28px;-webkit-backdrop-filter:blur(var(--dial-backdrop-blur));position:sticky}.dialkit-timeline-tick{background:var(--dial-text-tertiary);pointer-events:none;width:1px;height:100%;position:absolute;top:50%;transform:translateY(-50%)}.dialkit-timeline-tick-medium{background:var(--dial-border-hover);height:16px}.dialkit-timeline-tick-fine{background:var(--dial-border);height:8px}.dialkit-timeline-tick-label{font-variant-numeric:tabular-nums;height:18px;color:var(--dial-text-tertiary);white-space:nowrap;align-items:center;font-family:Geist Mono,ui-monospace,monospace;font-size:9.5px;line-height:18px;display:flex;position:absolute;top:50%;left:4px;transform:translateY(-50%)}.dialkit-timeline-row{height:28px}.dialkit-timeline-group-row{height:22px}.dialkit-timeline-group-row .dialkit-timeline-label{color:var(--dial-text-root);gap:4px;font-weight:600}.dialkit-timeline-group-row .dialkit-timeline-lane{background:0 0}.dialkit-timeline-group-toggle{cursor:pointer;color:var(--dial-text-tertiary);background:0 0;border:none;justify-content:center;align-items:center;margin-left:-2px;padding:0;display:flex}.dialkit-timeline-group-toggle svg{width:10px;height:10px;transition:transform .15s;transform:rotate(-90deg)}.dialkit-timeline-group-toggle[data-open=true] svg{transform:rotate(0)}.dialkit-timeline-row[data-grouped] .dialkit-timeline-label{padding-left:14px}.dialkit-timeline-lane{background:var(--dial-surface-subtle);border-radius:8px;flex:1;position:relative;overflow:hidden}.dialkit-timeline-clip{cursor:grab;-webkit-user-select:none;user-select:none;touch-action:none;box-sizing:border-box;z-index:1;box-shadow:inset 0 0 0 999px var(--dial-timeline-clip-overlay);border-radius:6px;justify-content:flex-end;align-items:center;padding:0 9px;display:flex;position:absolute;top:3px;bottom:3px;overflow:hidden}.dialkit-timeline-clip-ghost{box-sizing:border-box;opacity:.18;pointer-events:none;-webkit-user-select:none;user-select:none;border-radius:5px;display:flex;position:absolute;top:4px;bottom:4px;overflow:hidden}.dialkit-timeline-clip-ghost-segment{box-sizing:border-box;flex-shrink:0;height:100%}.dialkit-timeline-clip-ghost-segment+.dialkit-timeline-clip-ghost-segment{box-shadow:inset 1px 0 #00000080}.dialkit-timeline-loop-infinity{z-index:2;color:var(--dial-text-tertiary);pointer-events:none;-webkit-user-select:none;user-select:none;font-family:Geist Mono,ui-monospace,monospace;font-size:13px;font-weight:600;line-height:1;position:absolute;top:50%;right:7px;transform:translateY(-50%)}.dialkit-timeline-clip[data-dragging]{cursor:grabbing}.dialkit-timeline-clip[data-selected]{box-shadow:0 0 0 2px var(--dial-text-root), inset 0 0 0 999px var(--dial-timeline-clip-overlay)}.dialkit-timeline-clip-duration{font-variant-numeric:tabular-nums;color:#0000008c;white-space:nowrap;pointer-events:none;font-family:Geist Mono,ui-monospace,monospace;font-size:9.5px}.dialkit-timeline-clip[data-steps]{justify-content:flex-start;padding:0}.dialkit-timeline-clip-segment{box-sizing:border-box;flex-shrink:0;justify-content:flex-end;align-items:center;height:100%;padding:0 8px;display:flex;position:relative;overflow:hidden}.dialkit-timeline-clip-segment+.dialkit-timeline-clip-segment{box-shadow:inset 1.5px 0 #00000040}.dialkit-timeline-clip-segment:hover{background:#0000000f}.dialkit-timeline-clip-segment[data-selected]{background:#0000001f}.dialkit-timeline-clip[data-composite]{cursor:pointer}.dialkit-timeline-track-row .dialkit-timeline-label{color:var(--dial-text-tertiary);padding-left:26px;font-size:13px}.dialkit-timeline-track-row[data-grouped] .dialkit-timeline-label{padding-left:32px}.dialkit-timeline-clip-handle{cursor:ew-resize;width:8px;position:absolute;top:0;bottom:0}.dialkit-timeline-clip-handle[data-edge=start]{left:0}.dialkit-timeline-clip-handle[data-edge=end]{right:0}.dialkit-timeline-playhead-control{cursor:ew-resize;touch-action:none;width:12px;margin-left:-6px;position:absolute;top:0;bottom:0}.dialkit-timeline-playhead-anchor{top:calc(var(--dial-timeline-header-h) + 14px);z-index:8;width:0;height:0;margin-left:6px;position:sticky}.dialkit-timeline-playhead-anchor:before{content:\"\";background:var(--dial-text-root);pointer-events:none;width:2px;height:15px;position:absolute;top:0;left:-1px}.dialkit-timeline-playhead-flag{top:0;left:calc(var(--dial-timeline-playhead-flag-offset,0px) - 26px);z-index:1;box-sizing:border-box;color:#414141;font-variant-numeric:tabular-nums;font-feature-settings:\"tnum\" 1;text-align:center;white-space:nowrap;background:#f3f3f3;border:1px solid #ffffffbf;border-radius:6px;width:52px;height:18px;padding:0 7px;font-family:Geist Mono,ui-monospace,monospace;font-size:9.5px;font-weight:600;line-height:16px;transition:top .12s;position:absolute;transform:translateY(-50%);box-shadow:0 1px 4px #00000047}.dialkit-timeline-playhead-stem{z-index:5;background:var(--dial-text-root);pointer-events:none;width:2px;position:absolute;top:27px;bottom:0;left:5px}.dialkit-timeline-popover{z-index:10000;background:var(--dial-glass-bg);border:1px solid var(--dial-border);-webkit-backdrop-filter:blur(var(--dial-backdrop-blur));box-shadow:var(--dial-shadow);box-sizing:border-box;scrollbar-width:none;-ms-overflow-style:none;border-radius:14px;max-height:60vh;padding:10px 12px;position:fixed;overflow-y:auto}.dialkit-timeline-popover::-webkit-scrollbar{display:none}.dialkit-timeline-popover-header{border-bottom:1px solid var(--dial-border);align-items:center;gap:8px;margin-bottom:6px;padding:2px 2px 8px;display:flex}.dialkit-timeline-popover-title{color:var(--dial-text-root);letter-spacing:-.01em;font-size:15px;font-weight:600}.dialkit-timeline-popover-close{width:24px;height:24px;color:var(--dial-text-tertiary);cursor:pointer;background:0 0;border:none;border-radius:6px;justify-content:center;align-items:center;margin-left:auto;padding:5px;display:flex}.dialkit-timeline-popover-close:hover{color:var(--dial-text-root);background:var(--dial-surface-hover)}.dialkit-timeline-popover-close svg{width:14px;height:14px}.dialkit-timeline-popover-body{flex-direction:column;gap:6px;display:flex}.dialkit-timeline-popover-body>.dialkit-folder:first-child{border-top:none;margin-top:0}@media (max-width:720px){.dialkit-timeline-dock{padding:0 10px 10px}.dialkit-timeline-header{grid-template-columns:auto minmax(40px,1fr) auto;gap:8px}.dialkit-timeline-section{--dial-timeline-label-w:76px;--dial-timeline-actions-w:270px}.dialkit-timeline-identity{gap:7px;overflow:hidden}.dialkit-timeline-title{text-overflow:ellipsis;font-size:13px;overflow:hidden}.dialkit-timeline-time{font-size:11px}.dialkit-timeline-overview{height:12px}.dialkit-timeline-actions{min-width:0}.dialkit-timeline-actions .dialkit-preset-manager{flex-basis:100px;width:100px}.dialkit-timeline-chevron{justify-content:center;width:26px;height:28px;padding:0}.dialkit-timeline-grid{min-width:0}}.dialkit-root :where(button,input,textarea,[tabindex]):focus{outline:none}.dialkit-root :where(button,[role=slider],[role=button],.dialkit-color-plane,.dialkit-pad-surface):focus-visible{outline:2px solid var(--dial-focus-ring);outline-offset:-2px}.dialkit-folder-header-top[role=button]{border-radius:5px}.dialkit-panel-inner[data-collapsed=true] .dialkit-folder-header-top{border-radius:50%}.dialkit-slider:focus-visible .dialkit-slider-value,.dialkit-slider:focus-within .dialkit-slider-value{color:var(--dial-text-focus)}.dialkit-slider:focus-visible .dialkit-slider-fill{background:var(--dial-border-hover)}.dialkit-select-option:focus-visible{background:var(--dial-surface-hover);color:var(--dial-text-focus)}.dialkit-root :where(.dialkit-slider-input,.dialkit-color-value,.dialkit-preset-input):focus-visible{box-shadow:inset 0 -1px var(--dial-focus-ring)}.dialkit-color-css-input:focus-visible{outline:none}.dialkit-shortcuts-dropdown{margin:0;inset:auto;overflow-y:auto}@media (forced-colors:active){.dialkit-root{--dial-focus-ring:Highlight}}.dialkit-toolbar-primary{background:var(--dial-text-root);color:var(--dial-glass-bg)}.dialkit-toolbar-primary:hover{background:color-mix(in srgb, var(--dial-text-root) 88%, var(--dial-glass-bg))}.dialkit-toolbar-primary svg{color:inherit}.dialkit-preset-check{width:14px;height:14px;color:var(--dial-text-focus);flex-shrink:0}.dialkit-preset-divider{background:var(--dial-surface-subtle);height:1px;margin:4px 0}.dialkit-preset-create{width:100%;height:32px;color:var(--dial-text-label);font:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:8px;align-items:center;gap:8px;padding:0 10px;font-size:13px;font-weight:500;transition:background .15s;display:flex}.dialkit-preset-create:hover,.dialkit-preset-create:focus-visible{background:var(--dial-surface-hover)}";
//#endregion
//#region src/recorder/panel.js
function ln(t, n, r) {
	let i = {};
	for (let [r, a] of Object.entries(e[t])) {
		let e = n[r];
		i[r] = [
			e,
			Math.min(a.min, e),
			Math.max(a.max, e),
			a.step
		];
	}
	return t === "Glow" && (n.glowColors.forEach((e, t) => {
		i[`color${t + 1}`] = {
			type: "color",
			default: e
		};
	}), i.micLevelColor = {
		type: "color",
		default: n.micLevelColor
	}), t === "Scene" && r && (i.backdrop = {
		type: "select",
		options: r,
		default: r[0]
	}), i;
}
function un() {
	if (document.getElementById("lgr-dialkit-styles")) return;
	let e = document.createElement("style");
	e.id = "lgr-dialkit-styles", e.textContent = cn, document.head.append(e);
}
function dn(r, { persist: i = !1, storageId: a = "liquid-glass-recorder", open: o, onOpenChange: s } = {}) {
	un();
	let c = window.innerWidth < 900, l = sn({
		position: "top-right",
		theme: "dark",
		defaultOpen: o ?? !c,
		onOpenChange: (e) => s?.(e)
	}), u = [
		"default",
		"none",
		...(r.o.backdrops ?? []).map((e) => e.name)
	], d = !1, f = u[0], p = /* @__PURE__ */ new Map();
	Object.keys(e).forEach((t, n) => {
		let o = pe(t, ln(t, r.P, t === "Scene" ? u : null), {
			id: `${a}-${t.toLowerCase()}`,
			persist: i,
			defaultCollapsed: n > 0
		});
		o.subscribe((n) => {
			if (d) return;
			let i = {};
			for (let r of Object.keys(e[t])) typeof n[r] == "number" && (i[r] = n[r]);
			if (t === "Glow" && (i.glowColors = [
				1,
				2,
				3,
				4,
				5,
				6
			].map((e, t) => n[`color${e}`] ?? r.P.glowColors[t]), n.micLevelColor && (i.micLevelColor = n.micLevelColor)), t === "Scene" && n.backdrop && n.backdrop !== f && (f = n.backdrop, r.setBackdrop(n.backdrop)), Object.entries(i).some(([e, t]) => Array.isArray(t) ? t.join() !== r.P[e].join() : t !== r.P[e])) {
				d = !0;
				try {
					r.setParams(i);
				} finally {
					d = !1;
				}
			}
		}), p.set(t, o);
	});
	let m = () => JSON.stringify(r.exportParams(), null, 2), h = (e) => r.say(e, 2200), g = {
		async copy() {
			try {
				await navigator.clipboard.writeText(m()), h("Params copied as JSON");
			} catch {
				g.download();
			}
		},
		download() {
			let e = document.createElement("a"), t = URL.createObjectURL(new Blob([m()], { type: "application/json" }));
			e.href = t, e.download = `recorder-params-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`, e.click(), setTimeout(() => URL.revokeObjectURL(t), 1e3), h("Params downloaded");
		},
		import() {
			let e = document.createElement("input");
			e.type = "file", e.accept = "application/json,.json", e.onchange = async () => {
				try {
					let n = JSON.parse(await e.files[0].text());
					if (n.kind && !t(n.kind)) throw Error("kind");
					r.setParams(n), h("Params imported");
				} catch {
					h("That file isn’t a recorder params file");
				}
			}, e.click();
		},
		reset() {
			r.setParams(n), h("Params reset to defaults");
		}
	}, _ = pe("Settings", {
		copy: {
			type: "action",
			label: "Copy params as JSON"
		},
		download: {
			type: "action",
			label: "Download JSON"
		},
		import: {
			type: "action",
			label: "Import JSON…"
		},
		reset: {
			type: "action",
			label: "Reset to defaults"
		}
	}, {
		id: `${a}-settings`,
		defaultCollapsed: !0,
		onAction: (e) => g[e]?.()
	});
	return {
		element: l.element,
		panels: p,
		sync(t) {
			d = !0;
			try {
				for (let [n, r] of p) {
					let i = {};
					for (let r of Object.keys(e[n])) i[r] = t[r];
					n === "Glow" && (t.glowColors.forEach((e, t) => {
						i[`color${t + 1}`] = e;
					}), i.micLevelColor = t.micLevelColor), r.setValues(i);
				}
			} finally {
				d = !1;
			}
		},
		show() {
			l.element.style.display = "";
		},
		hide() {
			l.element.style.display = "none";
		},
		get hidden() {
			return l.element.style.display === "none";
		},
		destroy() {
			for (let e of p.values()) e.destroy();
			_.destroy(), l.destroy();
		}
	};
}
//#endregion
export { dn as createPanel };


import { h as t, hydrate as e, render as n, cloneElement as o } from 'preact';
function r() {
	return (
		(r = Object.assign
			? Object.assign.bind()
			: function (t) {
					for (var e = 1; e < arguments.length; e++) {
						var n = arguments[e];
						for (var o in n)
							Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
					}
					return t;
			  }),
		r.apply(this, arguments)
	);
}
var i = ['context', 'children'];
function a(t, e, n, o) {
	function r() {
		var e = Reflect.construct(HTMLElement, [], r);
		return (
			(e._vdomComponent = t),
			(e._root =
				o && o.shadow ? e.attachShadow({ mode: o.mode || 'open' }) : e),
			e
		);
	}
	return (
		((r.prototype = Object.create(HTMLElement.prototype)).constructor = r),
		(r.prototype.connectedCallback = c),
		(r.prototype.attributeChangedCallback = u),
		(r.prototype.disconnectedCallback = p),
		(n = n || t.observedAttributes || Object.keys(t.propTypes || {})),
		(r.observedAttributes = n),
		n.forEach(function (t) {
			Object.defineProperty(r.prototype, t, {
				get: function () {
					return this._vdom.props[t];
				},
				set: function (e) {
					this._vdom
						? this.attributeChangedCallback(t, null, e)
						: (this._props || (this._props = {}),
						  (this._props[t] = e),
						  this.connectedCallback());
					var n = typeof e;
					(null != e && 'string' !== n && 'boolean' !== n && 'number' !== n) ||
						this.setAttribute(t, e);
				},
			});
		}),
		customElements.define(e || t.tagName || t.displayName || t.name, r)
	);
}
function s(t) {
	this.getChildContext = function () {
		return t.context;
	};
	var e = t.children,
		n = (function (t, e) {
			if (null == t) return {};
			var n,
				o,
				r = {},
				i = Object.keys(t);
			for (o = 0; o < i.length; o++)
				e.indexOf((n = i[o])) >= 0 || (r[n] = t[n]);
			return r;
		})(t, i);
	return o(e, n);
}
function c() {
	var o = new CustomEvent('_preact', {
		detail: {},
		bubbles: !0,
		cancelable: !0,
	});
	this.dispatchEvent(o),
		(this._vdom = t(
			s,
			r({}, this._props, { context: o.detail.context }),
			h(this, this._vdomComponent)
		)),
		(this.hasAttribute('hydrate') ? e : n)(this._vdom, this._root);
}
function l(t) {
	return t.replace(/-(\w)/g, function (t, e) {
		return e ? e.toUpperCase() : '';
	});
}
function u(t, e, r) {
	if (this._vdom) {
		var i = {};
		(i[t] = r = null == r ? void 0 : r),
			(i[l(t)] = r),
			(this._vdom = o(this._vdom, i)),
			n(this._vdom, this._root);
	}
}
function p() {
	n((this._vdom = null), this._root);
}
function d(e, n) {
	var o = this;
	return t(
		'slot',
		r({}, e, {
			ref: function (t) {
				t
					? ((o.ref = t),
					  o._listener ||
							((o._listener = function (t) {
								t.stopPropagation(), (t.detail.context = n);
							}),
							t.addEventListener('_preact', o._listener)))
					: o.ref.removeEventListener('_preact', o._listener);
			},
		})
	);
}
function h(e, n) {
	if (3 === e.nodeType) return e.data;
	if (1 !== e.nodeType) return null;
	var o = [],
		r = {},
		i = 0,
		a = e.attributes,
		s = e.childNodes;
	for (i = a.length; i--; )
		'slot' !== a[i].name &&
			((r[a[i].name] = a[i].value), (r[l(a[i].name)] = a[i].value));
	for (i = s.length; i--; ) {
		var c = h(s[i], null),
			u = s[i].slot;
		u ? (r[u] = t(d, { name: u }, c)) : (o[i] = c);
	}
	var p = n ? t(d, null, o) : o;
	return t(n || e.nodeName.toLowerCase(), r, p);
}
export { a as default };
//# sourceMappingURL=preact-custom-element.esm.js.map

var t = require('preact');
function e() {
	return (
		(e = Object.assign
			? Object.assign.bind()
			: function (t) {
					for (var e = 1; e < arguments.length; e++) {
						var n = arguments[e];
						for (var r in n)
							Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
					}
					return t;
			  }),
		e.apply(this, arguments)
	);
}
var n = ['context', 'children'];
function r(e) {
	this.getChildContext = function () {
		return e.context;
	};
	var r = e.children,
		o = (function (t, e) {
			if (null == t) return {};
			var n,
				r,
				o = {},
				i = Object.keys(t);
			for (r = 0; r < i.length; r++)
				e.indexOf((n = i[r])) >= 0 || (o[n] = t[n]);
			return o;
		})(e, n);
	return t.cloneElement(r, o);
}
function o() {
	var n = new CustomEvent('_preact', {
		detail: {},
		bubbles: !0,
		cancelable: !0,
	});
	this.dispatchEvent(n),
		(this._vdom = t.h(
			r,
			e({}, this._props, { context: n.detail.context }),
			l(this, this._vdomComponent)
		)),
		(this.hasAttribute('hydrate') ? t.hydrate : t.render)(
			this._vdom,
			this._root
		);
}
function i(t) {
	return t.replace(/-(\w)/g, function (t, e) {
		return e ? e.toUpperCase() : '';
	});
}
function a(e, n, r) {
	if (this._vdom) {
		var o = {};
		(o[e] = r = null == r ? void 0 : r),
			(o[i(e)] = r),
			(this._vdom = t.cloneElement(this._vdom, o)),
			t.render(this._vdom, this._root);
	}
}
function s() {
	t.render((this._vdom = null), this._root);
}
function c(n, r) {
	var o = this;
	return t.h(
		'slot',
		e({}, n, {
			ref: function (t) {
				t
					? ((o.ref = t),
					  o._listener ||
							((o._listener = function (t) {
								t.stopPropagation(), (t.detail.context = r);
							}),
							t.addEventListener('_preact', o._listener)))
					: o.ref.removeEventListener('_preact', o._listener);
			},
		})
	);
}
function l(e, n) {
	if (3 === e.nodeType) return e.data;
	if (1 !== e.nodeType) return null;
	var r = [],
		o = {},
		a = 0,
		s = e.attributes,
		u = e.childNodes;
	for (a = s.length; a--; )
		'slot' !== s[a].name &&
			((o[s[a].name] = s[a].value), (o[i(s[a].name)] = s[a].value));
	for (a = u.length; a--; ) {
		var d = l(u[a], null),
			h = u[a].slot;
		h ? (o[h] = t.h(c, { name: h }, d)) : (r[a] = d);
	}
	var p = n ? t.h(c, null, r) : r;
	return t.h(n || e.nodeName.toLowerCase(), o, p);
}
module.exports = function (t, e, n, r) {
	function i() {
		var e = Reflect.construct(HTMLElement, [], i);
		return (
			(e._vdomComponent = t),
			(e._root =
				r && r.shadow ? e.attachShadow({ mode: r.mode || 'open' }) : e),
			e
		);
	}
	return (
		((i.prototype = Object.create(HTMLElement.prototype)).constructor = i),
		(i.prototype.connectedCallback = o),
		(i.prototype.attributeChangedCallback = a),
		(i.prototype.disconnectedCallback = s),
		(n = n || t.observedAttributes || Object.keys(t.propTypes || {})),
		(i.observedAttributes = n),
		n.forEach(function (t) {
			Object.defineProperty(i.prototype, t, {
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
		customElements.define(e || t.tagName || t.displayName || t.name, i)
	);
};
//# sourceMappingURL=preact-custom-element.js.map

!(function (t, e) {
	'object' == typeof exports && 'undefined' != typeof module
		? (module.exports = e(require('preact')))
		: 'function' == typeof define && define.amd
		? define(['preact'], e)
		: ((t || self).preactCustomElement = e(t.preact));
})(this, function (t) {
	function e() {
		return (
			(e = Object.assign
				? Object.assign.bind()
				: function (t) {
						for (var e = 1; e < arguments.length; e++) {
							var n = arguments[e];
							for (var o in n)
								Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
						}
						return t;
				  }),
			e.apply(this, arguments)
		);
	}
	var n = ['context', 'children'];
	function o(e) {
		this.getChildContext = function () {
			return e.context;
		};
		var o = e.children,
			r = (function (t, e) {
				if (null == t) return {};
				var n,
					o,
					r = {},
					i = Object.keys(t);
				for (o = 0; o < i.length; o++)
					e.indexOf((n = i[o])) >= 0 || (r[n] = t[n]);
				return r;
			})(e, n);
		return t.cloneElement(o, r);
	}
	function r() {
		var n = new CustomEvent('_preact', {
			detail: {},
			bubbles: !0,
			cancelable: !0,
		});
		this.dispatchEvent(n),
			(this._vdom = t.h(
				o,
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
	function a(e, n, o) {
		if (this._vdom) {
			var r = {};
			(r[e] = o = null == o ? void 0 : o),
				(r[i(e)] = o),
				(this._vdom = t.cloneElement(this._vdom, r)),
				t.render(this._vdom, this._root);
		}
	}
	function s() {
		t.render((this._vdom = null), this._root);
	}
	function c(n, o) {
		var r = this;
		return t.h(
			'slot',
			e({}, n, {
				ref: function (t) {
					t
						? ((r.ref = t),
						  r._listener ||
								((r._listener = function (t) {
									t.stopPropagation(), (t.detail.context = o);
								}),
								t.addEventListener('_preact', r._listener)))
						: r.ref.removeEventListener('_preact', r._listener);
				},
			})
		);
	}
	function l(e, n) {
		if (3 === e.nodeType) return e.data;
		if (1 !== e.nodeType) return null;
		var o = [],
			r = {},
			a = 0,
			s = e.attributes,
			u = e.childNodes;
		for (a = s.length; a--; )
			'slot' !== s[a].name &&
				((r[s[a].name] = s[a].value), (r[i(s[a].name)] = s[a].value));
		for (a = u.length; a--; ) {
			var d = l(u[a], null),
				p = u[a].slot;
			p ? (r[p] = t.h(c, { name: p }, d)) : (o[a] = d);
		}
		var h = n ? t.h(c, null, o) : o;
		return t.h(n || e.nodeName.toLowerCase(), r, h);
	}
	return function (t, e, n, o) {
		function i() {
			var e = Reflect.construct(HTMLElement, [], i);
			return (
				(e._vdomComponent = t),
				(e._root =
					o && o.shadow ? e.attachShadow({ mode: o.mode || 'open' }) : e),
				e
			);
		}
		return (
			((i.prototype = Object.create(HTMLElement.prototype)).constructor = i),
			(i.prototype.connectedCallback = r),
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
						(null != e &&
							'string' !== n &&
							'boolean' !== n &&
							'number' !== n) ||
							this.setAttribute(t, e);
					},
				});
			}),
			customElements.define(e || t.tagName || t.displayName || t.name, i)
		);
	};
});
//# sourceMappingURL=preact-custom-element.umd.js.map

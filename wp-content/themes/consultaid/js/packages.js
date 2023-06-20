/*! UIkit 3.0.0-beta.4 | http://www.getuikit.com | (c) 2014 - 2016 YOOtheme | MIT License */
!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e(require("jquery")) : "function" == typeof define && define.amd ? define([ "jquery" ], e) : t.UIkit = e(t.jQuery);
}(this, function(t) {
    "use strict";
    function e() {
        return "complete" === document.readyState || "loading" !== document.readyState && !document.documentElement.doScroll;
    }
    function i(t) {
        var i = function() {
            o(document, "DOMContentLoaded", i), o(window, "load", i), t();
        };
        e() ? t() : (n(document, "DOMContentLoaded", i), n(window, "load", i));
    }
    function n(t, e, i, n) {
        Pt(t)[0].addEventListener(e, i, n);
    }
    function o(t, e, i, n) {
        Pt(t)[0].removeEventListener(e, i, n);
    }
    function s(t, e, i, n) {
        void 0 === i && (i = 400), void 0 === n && (n = "linear");
        var o = Pt.Deferred();
        t = Pt(t);
        for (var s in e) t.css(s, t.css(s));
        var r = setTimeout(function() {
            return t.trigger(Qt || "transitionend");
        }, i);
        return t.one(Qt || "transitionend", function(e, i) {
            clearTimeout(r), t.removeClass("uk-transition").css("transition", ""), i ? o.reject() : o.resolve();
        }).addClass("uk-transition").css("transition", "all " + i + "ms " + n).css(e), o.promise();
    }
    function r(t, e, i, n, o) {
        function s() {
            t.css("animation-duration", "").removeClass(a + " " + e);
        }
        void 0 === i && (i = 200);
        var r = Pt.Deferred(), a = o ? "uk-animation-leave" : "uk-animation-enter";
        return t = Pt(t), 0 === e.lastIndexOf("uk-animation-", 0) && (n && (e += " uk-animation-" + n), 
        o && (e += " uk-animation-reverse")), s(), t.one(Xt || "animationend", function() {
            return r.resolve().then(s);
        }).css("animation-duration", i + "ms").addClass(e).addClass(a), Xt || Ft(function() {
            return jt.cancel(t);
        }), r.promise();
    }
    function a(t, e) {
        return t = Pt(t), t.is(e) || !!(I(e) ? t.parents(e).length : Pt.contains(e instanceof Pt ? e[0] : e, t[0]));
    }
    function l(t, e, i, n) {
        return t = Pt(t), t.attr(e, function(t, e) {
            return e ? e.replace(i, n) : e;
        });
    }
    function h(t, e) {
        return l(t, "class", new RegExp("(^|\\s)" + e + "(?!\\S)", "g"), "");
    }
    function c(t, e, i, n) {
        if (void 0 === e && (e = !0), void 0 === i && (i = !1), void 0 === n && (n = !1), 
        I(t)) {
            var o = document.createEvent("Event");
            o.initEvent(t, e, i), t = o;
        }
        return n && Pt.extend(t, n), t;
    }
    function u(t, e, i) {
        if (void 0 === e && (e = 0), void 0 === i && (i = 0), t = Pt(t), !t.is(":visible")) return !1;
        var n = Nt.scrollLeft(), o = Nt.scrollTop(), s = t.offset(), r = s.top, a = s.left;
        return r + t.height() >= o && r - e <= o + Nt.height() && a + t.width() >= n && a - i <= n + Nt.width();
    }
    function d(t, e, i) {
        void 0 === i && (i = 0), e = Pt(e);
        var n = Pt(e).length;
        return t = (D(t) ? t : "next" === t ? i + 1 : "previous" === t ? i - 1 : I(t) ? parseInt(t, 10) : e.index(t)) % n, 
        t < 0 ? t + n : t;
    }
    function f(t) {
        return t = Pt(t), Ut[t[0].tagName.toLowerCase()];
    }
    function g(t, e) {
        var i = N(t);
        return i ? i.reduce(function(t, e) {
            return _(e, t);
        }, e) : _(t);
    }
    function p(t, e, i) {
        return (window.getComputedStyle(t, i) || {})[e];
    }
    function m(t) {
        var e, i = document.documentElement, n = i.appendChild(document.createElement("div"));
        n.classList.add("var-" + t);
        try {
            e = p(n, "content", ":before").replace(/^["'](.*)["']$/, "$1"), e = JSON.parse(e);
        } catch (t) {}
        return i.removeChild(n), e || void 0;
    }
    function v() {
        var t = this;
        t.reads = [], t.writes = [], t.raf = Ft.bind(window);
    }
    function w(t) {
        t.scheduled || (t.scheduled = !0, t.raf(b.bind(null, t)));
    }
    function b(t) {
        var e, i = t.reads.splice(0, t.reads.length), n = t.writes.splice(0, t.writes.length);
        try {
            y(i), y(n);
        } catch (t) {
            e = t;
        }
        if (t.scheduled = !1, (t.reads.length || t.writes.length) && w(t), e) {
            if (!t.catch) throw e;
            t.catch(e);
        }
    }
    function y(t) {
        for (var e; e = t.shift(); ) e();
    }
    function k(t, e) {
        var i = t.indexOf(e);
        return !!~i && !!t.splice(i, 1);
    }
    function $(t, e) {
        for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
    }
    function x(t, e) {
        return function(i) {
            var n = arguments.length;
            return n ? n > 1 ? t.apply(e, arguments) : t.call(e, i) : t.call(e);
        };
    }
    function T(t, e) {
        return Jt.call(t, e);
    }
    function C(t) {
        return t.replace(/(?:^|[-_\/])(\w)/g, function(t, e) {
            return e ? e.toUpperCase() : "";
        });
    }
    function S(t) {
        return t.replace(/([a-z\d])([A-Z])/g, "$1-$2").toLowerCase();
    }
    function E(t) {
        return t.replace(Kt, A);
    }
    function A(t, e) {
        return e ? e.toUpperCase() : "";
    }
    function I(t) {
        return "string" == typeof t;
    }
    function D(t) {
        return "number" == typeof t;
    }
    function O(t) {
        return void 0 === t;
    }
    function P(t) {
        return I(t) && t.match(/^(!|>|\+|-)/);
    }
    function N(t) {
        return P(t) && t.split(/(?=\s(?:!|>|\+|-))/g).map(function(t) {
            return t.trim();
        });
    }
    function _(t, e) {
        if (t === !0) return null;
        try {
            t = e && P(t) && ">" !== t[0] ? Pt(e)[Zt[t[0]]](t.substr(1)) : Pt(t, e);
        } catch (t) {
            return null;
        }
        return t.length ? t : null;
    }
    function H(t) {
        return "boolean" == typeof t ? t : "true" === t || "1" == t || "" === t || "false" !== t && "0" != t && t;
    }
    function M(t) {
        var e = Number(t);
        return !isNaN(e) && e;
    }
    function B(t) {
        if (I(t) && "@" == t[0]) {
            var e = "media-" + t.substr(1);
            t = te[e] || (te[e] = parseFloat(m(e)));
        }
        return !(!t || isNaN(t)) && "(min-width: " + t + "px)";
    }
    function j(t, e, i) {
        return t === Boolean ? H(e) : t === Number ? M(e) : "jQuery" === t ? g(e, i) : "media" === t ? B(e) : t ? t(e) : e;
    }
    function U(t, e, i) {
        function n(n) {
            s[n] = (ee[n] || le)(t[n], e[n], i, n);
        }
        var o, s = {};
        if (e.mixins) for (var r = 0, a = e.mixins.length; r < a; r++) t = U(t, e.mixins[r], i);
        for (o in t) n(o);
        for (o in e) T(t, o) || n(o);
        return s;
    }
    function L(t, e, i, n, o, s, r, a) {
        t = Pt(t), e = Pt(e), a = a && Pt(a), i = z(i), n = z(n);
        var l = q(t), h = q(e), c = h;
        F(c, i, l, -1), F(c, n, h, 1), o = R(o, l.width, l.height), s = R(s, h.width, h.height), 
        o.x += s.x, o.y += s.y, c.left += o.x, c.top += o.y, a = q(a || window);
        var u = {
            element: i,
            target: n
        };
        return r && Pt.each(he, function(t, e) {
            var s = e[0], d = e[1], f = e[2];
            if (r === !0 || ~r.indexOf(t)) {
                var g = i[t] === d ? -l[s] : i[t] === f ? l[s] : 0, p = n[t] === d ? h[s] : n[t] === f ? -h[s] : 0;
                if (c[d] < a[d] || c[d] + l[s] > a[f]) {
                    var m = c[d] + g + p - 2 * o[t];
                    m >= a[d] && m + l[s] <= a[f] && (c[d] = m, [ "element", "target" ].forEach(function(e) {
                        u[e][t] = g ? u[e][t] === he[t][1] ? he[t][2] : he[t][1] : u[e][t];
                    }));
                }
            }
        }), t.offset({
            left: c.left,
            top: c.top
        }), u;
    }
    function q(t) {
        t = Pt(t);
        var e = Math.round(t.outerWidth()), i = Math.round(t.outerHeight()), n = t[0].getClientRects ? t.offset() : null, o = n ? Math.round(n.left) : t.scrollLeft(), s = n ? Math.round(n.top) : t.scrollTop();
        return {
            width: e,
            height: i,
            left: o,
            top: s,
            right: o + e,
            bottom: s + i
        };
    }
    function F(t, e, i, n) {
        Pt.each(he, function(o, s) {
            var r = s[0], a = s[1], l = s[2];
            e[o] === l ? t[a] += i[r] * n : "center" === e[o] && (t[a] += i[r] * n / 2);
        });
    }
    function z(t) {
        var e = /left|center|right/, i = /top|center|bottom/;
        return t = (t || "").split(" "), 1 === t.length && (t = e.test(t[0]) ? t.concat([ "center" ]) : i.test(t[0]) ? [ "center" ].concat(t) : [ "center", "center" ]), 
        {
            x: e.test(t[0]) ? t[0] : "center",
            y: i.test(t[1]) ? t[1] : "center"
        };
    }
    function R(t, e, i) {
        return t = (t || "").split(" "), {
            x: t[0] ? parseFloat(t[0]) * ("%" === t[0][t[0].length - 1] ? e / 100 : 1) : 0,
            y: t[1] ? parseFloat(t[1]) * ("%" === t[1][t[1].length - 1] ? i / 100 : 1) : 0
        };
    }
    function W(t) {
        switch (t) {
          case "left":
            return "right";

          case "right":
            return "left";

          case "top":
            return "bottom";

          case "bottom":
            return "top";

          default:
            return t;
        }
    }
    function Y(t, e, i, n) {
        return Math.abs(t - e) >= Math.abs(i - n) ? t - e > 0 ? "Left" : "Right" : i - n > 0 ? "Up" : "Down";
    }
    function V() {
        se = null, ce.last && (void 0 !== ce.el && ce.el.trigger("longTap"), ce = {});
    }
    function Q() {
        se && clearTimeout(se), se = null;
    }
    function X() {
        ie && clearTimeout(ie), ne && clearTimeout(ne), oe && clearTimeout(oe), se && clearTimeout(se), 
        ie = ne = oe = se = null, ce = {};
    }
    function G(t) {
        function e() {
            var e = Array.prototype.forEach;
            o(document.body, t.connect), new qt(function(i) {
                return i.forEach(function(i) {
                    e.call(i.addedNodes, function(e) {
                        o(e, t.connect), t.update("update", i.target, !0);
                    }), e.call(i.removedNodes, function(e) {
                        o(e, t.disconnect), t.update("update", i.target, !0);
                    });
                });
            }).observe(document.body, {
                childList: !0,
                subtree: !0
            });
        }
        function o(t, e) {
            if (t.nodeType === Node.ELEMENT_NODE && !t.hasAttribute("uk-no-boot")) for (e(t), 
            t = t.firstChild; t; ) {
                var i = t.nextSibling;
                o(t, e), t = i;
            }
        }
        qt ? document.body ? e() : new qt(function() {
            document.body && (this.disconnect(), e());
        }).observe(document.documentElement, {
            childList: !0
        }) : i(function() {
            o(document.body, connect), n(document.body, "DOMNodeInserted", function(e) {
                return o(e.target, t.connect);
            }), n(document.body, "DOMNodeRemoved", function(e) {
                return o(e.target, t.disconnect);
            });
        });
    }
    function J(t) {
        var e = t.data;
        t.use = function(t) {
            if (!t.installed) return t.call(null, this), t.installed = !0, this;
        }, t.mixin = function(e, i) {
            i = (I(i) ? t.components[i] : i) || this, i.options = U(i.options, e);
        }, t.extend = function(t) {
            t = t || {};
            var e = this, i = t.name || e.options.name, n = K(i || "UIkitComponent");
            return n.prototype = Object.create(e.prototype), n.prototype.constructor = n, n.options = U(e.options, t), 
            n.super = e, n.extend = e.extend, n;
        }, t.update = function(i, n, o) {
            if (void 0 === o && (o = !1), i = c(i || "update"), n) n = Pt(n)[0], t.elements.forEach(function(t) {
                if (t[e] && (t === n || Pt.contains.apply(Pt, o ? [ t, n ] : [ n, t ]))) for (var s in t[e]) t[e][s]._isReady && t[e][s]._callUpdate(i);
            }); else for (var s in t.instances) t.instances[s]._isReady && t.instances[s]._callUpdate(i);
        };
        var i;
        Object.defineProperty(t, "container", {
            get: function() {
                return i || document.body;
            },
            set: function(t) {
                i = t;
            }
        });
    }
    function K(t) {
        return new Function("return function " + C(t) + " (options) { this._init(options); }")();
    }
    function Z(e) {
        var i = 0;
        e.prototype.props = {}, e.prototype._init = function(t) {
            t = t || {}, t = this.$options = U(this.constructor.options, t, this), e.instances[i] = this, 
            this.$el = null, this.$name = e.prefix + S(this.$options.name), this._uid = i++, 
            this._initData(), this._initMethods(), this._callHook("created"), this._frames = {
                reads: {},
                writes: {}
            }, t.el && this.$mount(t.el);
        }, e.prototype._initData = function() {
            var e = this, i = t.extend(!0, {}, this.$options.defaults), n = this.$options.data || {}, o = this.$options.args || [], s = this.$options.props || {};
            if (i) {
                o.length && t.isArray(n) && (n = n.slice(0, o.length).reduce(function(t, e, i) {
                    return t[o[i]] = e, t;
                }, {}));
                for (var r in i) e[r] = T(n, r) ? j(s[r], n[r], e.$options.el) : i[r];
            }
        }, e.prototype._initProps = function() {
            var t, e, i = this, n = this.$el[0], o = this.$options.args || [], s = this.$options.props || {}, r = n.getAttribute(this.$name);
            if (s) {
                for (t in s) if (e = S(t), n.hasAttribute(e)) {
                    var a = j(s[t], n.getAttribute(e), n);
                    if ("target" === e && (!a || 0 === a.lastIndexOf("_", 0))) continue;
                    i[t] = a;
                }
                if (r) {
                    if ("{" === r[0]) try {
                        r = JSON.parse(r);
                    } catch (t) {
                        console.warn("Invalid JSON."), r = {};
                    } else if (o.length && !~r.indexOf(":")) {
                        l = {}, l[o[0]] = r, r = l;
                        var l;
                    } else {
                        var h = {};
                        r.split(";").forEach(function(t) {
                            var e = t.split(/:(.+)/), i = e[0], n = e[1];
                            i && n && (h[i.trim()] = n.trim());
                        }), r = h;
                    }
                    for (t in r || {}) e = E(t), void 0 !== s[e] && (i[e] = j(s[e], r[t], n));
                }
            }
        }, e.prototype._initMethods = function() {
            var t = this, e = this.$options.methods;
            if (e) for (var i in e) t[i] = x(e[i], t);
        }, e.prototype._initEvents = function() {
            var e = this, i = this.$options.events, n = function(t, i) {
                return e.$el.on(t, I(i) ? e[i] : x(i, e));
            };
            if (i) for (var o in i) t.isArray(i[o]) ? i[o].forEach(function(t) {
                return n(o, t);
            }) : n(o, i[o]);
        }, e.prototype._callReady = function() {
            this._isReady = !0, this._callHook("ready"), this._callUpdate();
        }, e.prototype._callHook = function(t) {
            var e = this, i = this.$options[t];
            i && i.forEach(function(t) {
                return t.call(e);
            });
        }, e.prototype._callUpdate = function(t) {
            var e = this;
            t = c(t || "update");
            var i = this.$options.update;
            i && i.forEach(function(i, n) {
                if ("update" === t.type || i.events && ~i.events.indexOf(t.type)) {
                    if (t.sync) return i.read && i.read.call(e, t), void (i.write && i.write.call(e, t));
                    i.read && !~Gt.reads.indexOf(e._frames.reads[n]) && (e._frames.reads[n] = Gt.measure(function() {
                        return i.read.call(e, t);
                    })), i.write && !~Gt.writes.indexOf(e._frames.writes[n]) && (e._frames.writes[n] = Gt.mutate(function() {
                        return i.write.call(e, t);
                    }));
                }
            });
        };
    }
    function tt(t) {
        var e = t.data;
        t.prototype.$mount = function(n) {
            var o = this, s = this.$options.name;
            return n[e] || (n[e] = {}, t.elements.push(n)), n[e][s] ? void console.warn('Component "' + s + '" is already mounted on element: ', n) : (n[e][s] = this, 
            this.$el = Pt(n), this._initProps(), this._callHook("init"), this._initEvents(), 
            document.documentElement.contains(this.$el[0]) && this._callHook("connected"), void i(function() {
                return o._callReady();
            }));
        }, t.prototype.$emit = function(t) {
            this._callUpdate(t);
        }, t.prototype.$update = function(e, i) {
            t.update(e, this.$el, i);
        }, t.prototype.$destroy = function(i) {
            void 0 === i && (i = !1), this._callHook("destroy"), delete t.instances[this._uid];
            var n = this.$options.el;
            if (n && n[e]) {
                if (delete n[e][this.$options.name], !Object.keys(n[e]).length) {
                    delete n[e];
                    var o = t.elements.indexOf(n);
                    ~o && t.elements.splice(o, 1);
                }
                i && this.$el.remove();
            }
        };
    }
    function et(e) {
        var i = e.data;
        e.components = {}, e.component = function(n, o) {
            return n = E(n), t.isPlainObject(o) ? (o.name = n, o = e.extend(o)) : o.options.name = n, 
            e.components[n] = o, e[n] = function(o, s) {
                for (var r = arguments.length, a = Array(r); r--; ) a[r] = arguments[r];
                if (t.isPlainObject(o)) return new e.components[n]({
                    data: o
                });
                if (e.components[n].options.functional) return new e.components[n]({
                    data: [].concat(a)
                });
                var l = [];
                return s = s || {}, Pt(o).each(function(t, o) {
                    return l.push(o[i] && o[i][n] || new e.components[n]({
                        el: o,
                        data: s
                    }));
                }), l;
            }, document.body && !o.options.functional && e[n]("[uk-" + n + "],[data-uk-" + n + "]"), 
            e.components[n];
        }, e.getComponents = function(t) {
            return t && t[i] || {};
        }, e.getComponent = function(t, i) {
            return e.getComponents(t)[i];
        }, e.connect = function(t) {
            var n;
            if (t[i]) {
                ~e.elements.indexOf(t) || e.elements.push(t);
                for (n in t[i]) {
                    var o = t[i][n];
                    o._uid in e.instances || (e.instances[o._uid] = o), o._callHook("connected");
                }
            }
            for (var s = 0; s < t.attributes.length; s++) n = t.attributes[s].name, 0 !== n.lastIndexOf("uk-", 0) && 0 !== n.lastIndexOf("data-uk-", 0) || (n = E(n.replace("data-uk-", "").replace("uk-", "")), 
            e[n] && e[n](t));
        }, e.disconnect = function(t) {
            var n = e.elements.indexOf(t);
            ~n && e.elements.splice(n, 1);
            for (var o in t[i]) {
                var s = t[i][o];
                s._uid in e.instances && (delete e.instances[s._uid], s._callHook("disconnected"));
            }
        };
    }
    function it(t, e) {
        return (e.y - t.y) / (e.x - t.x);
    }
    function nt(t) {
        t.mixin.class = pe, t.mixin.modal = be, t.mixin.mouse = ye, t.mixin.position = ke, 
        t.mixin.toggable = we;
    }
    function ot(t) {
        t.component("accordion", {
            mixins: [ pe, we ],
            props: {
                targets: String,
                active: null,
                collapsible: Boolean,
                multiple: Boolean,
                toggle: String,
                content: String,
                transition: String
            },
            defaults: {
                targets: "> *",
                active: !1,
                animation: !0,
                collapsible: !0,
                multiple: !1,
                clsOpen: "uk-open",
                toggle: ".uk-accordion-title",
                content: ".uk-accordion-content",
                transition: "ease"
            },
            ready: function() {
                var t = this;
                this.$el.on("click", this.targets + " " + this.toggle, function(e) {
                    e.preventDefault(), t.show(t.items.find(t.toggle).index(e.currentTarget));
                });
            },
            update: function() {
                var t = this, e = Pt(this.targets, this.$el), i = !this.items || e.length !== this.items.length || e.toArray().some(function(e, i) {
                    return e !== t.items.get(i);
                });
                if (this.items = e, i) {
                    this.items.each(function(e, i) {
                        i = Pt(i), t.toggleNow(i.find(t.content), i.hasClass(t.clsOpen));
                    });
                    var n = this.active !== !1 && _(this.items.eq(Number(this.active))) || !this.collapsible && _(this.items.eq(0));
                    n && !n.hasClass(this.clsOpen) && this.show(n, !1);
                }
            },
            methods: {
                show: function(t, e) {
                    var i = this, n = d(t, this.items), o = this.items.filter("." + this.clsOpen);
                    t = this.items.eq(n), t.add(!this.multiple && o).each(function(n, s) {
                        s = Pt(s);
                        var r = s.find(i.content), a = s.is(t), l = a && !s.hasClass(i.clsOpen);
                        !l && a && !i.collapsible && o.length < 2 || (s.toggleClass(i.clsOpen, l), Bt.inProgress(r.parent()) || r.wrap("<div>").parent().attr("hidden", l), 
                        i.toggleNow(r, !0), i.toggleElement(r.parent(), l, e).then(function() {
                            s.hasClass(i.clsOpen) === l && (l || i.toggleNow(r, !1), r.unwrap());
                        }));
                    });
                }
            }
        });
    }
    function st(t) {
        t.component("alert", {
            mixins: [ pe, we ],
            args: "animation",
            props: {
                animation: Boolean,
                close: String
            },
            defaults: {
                animation: !0,
                close: ".uk-alert-close",
                duration: 150
            },
            ready: function() {
                var t = this;
                this.$el.on("click", this.close, function(e) {
                    e.preventDefault(), t.closeAlert();
                });
            },
            methods: {
                closeAlert: function() {
                    var t = this;
                    this.toggleElement(this.$el).then(function() {
                        return t.$destroy(!0);
                    }), requestAnimationFrame(function() {
                        return t.$el.css("opacity", 0);
                    });
                }
            }
        });
    }
    function rt(t) {
        t.component("cover", {
            props: {
                automute: Boolean,
                width: Number,
                height: Number
            },
            defaults: {
                automute: !0
            },
            ready: function() {
                if (this.$el.is("iframe") && (this.$el.css("pointerEvents", "none"), this.automute)) {
                    var t = this.$el.attr("src");
                    this.$el.attr("src", "" + t + (~t.indexOf("?") ? "&" : "?") + "enablejsapi=1&api=1").on("load", function(t) {
                        var e = t.target;
                        return e.contentWindow.postMessage('{"event": "command", "func": "mute", "method":"setVolume", "value":0}', "*");
                    });
                }
            },
            update: {
                write: function() {
                    0 !== this.$el[0].offsetHeight && this.$el.css({
                        width: "",
                        height: ""
                    }).css(Lt.cover({
                        width: this.width || this.$el.width(),
                        height: this.height || this.$el.height()
                    }, {
                        width: this.$el.parent().width(),
                        height: this.$el.parent().height()
                    }));
                },
                events: [ "load", "resize", "orientationchange" ]
            },
            events: {
                loadedmetadata: function() {
                    this.$emit();
                }
            }
        });
    }
    function at(t) {
        var e;
        _t.on("click", function(t) {
            !e || a(t.target, e.$el) || e.toggle && a(t.target, e.toggle.$el) || e.hide(!1);
        }), t.component("drop", {
            mixins: [ ye, ke, we ],
            args: "pos",
            props: {
                mode: String,
                toggle: Boolean,
                boundary: "jQuery",
                boundaryAlign: Boolean,
                delayShow: Number,
                delayHide: Number,
                clsDrop: String
            },
            defaults: {
                mode: "hover",
                toggle: "- :first",
                boundary: window,
                boundaryAlign: !1,
                delayShow: 0,
                delayHide: 800,
                clsDrop: !1,
                hoverIdle: 200,
                animation: "uk-animation-fade",
                cls: "uk-open"
            },
            init: function() {
                this.clsDrop = this.clsDrop || "uk-" + this.$options.name, this.clsPos = this.clsDrop, 
                this.$el.addClass(this.clsDrop);
            },
            ready: function() {
                var e = this;
                this.updateAria(this.$el), this.$el.on("click", "." + this.clsDrop + "-close", function(t) {
                    t.preventDefault(), e.hide(!1);
                }), this.toggle && (this.toggle = g(this.toggle, this.$el), this.toggle && (this.toggle = t.toggle(this.toggle, {
                    target: this.$el,
                    mode: this.mode
                })[0]));
            },
            update: {
                write: function() {
                    if (this.$el.hasClass(this.cls)) {
                        h(this.$el, this.clsDrop + "-(stack|boundary)").css({
                            top: "",
                            left: ""
                        }), this.$el.toggleClass(this.clsDrop + "-boundary", this.boundaryAlign), this.dir = this.pos[0], 
                        this.align = this.pos[1];
                        var t = q(this.boundary), e = this.boundaryAlign ? t : q(this.toggle.$el);
                        if ("justify" === this.align) {
                            var i = "y" === this.getAxis() ? "width" : "height";
                            this.$el.css(i, e[i]);
                        } else this.$el.outerWidth() > Math.max(t.right - e.left, e.right - t.left) && (this.$el.addClass(this.clsDrop + "-stack"), 
                        this.$el.trigger("stack", [ this ]));
                        this.positionAt(this.$el, this.boundaryAlign ? this.boundary : this.toggle.$el, this.boundary);
                    }
                },
                events: [ "resize", "orientationchange" ]
            },
            events: {
                toggle: function(t, e) {
                    t.preventDefault(), this.isToggled(this.$el) ? this.hide(!1) : this.show(e, !1);
                },
                "toggleShow mouseenter": function(t, e) {
                    t.preventDefault(), this.show(e || this.toggle);
                },
                "toggleHide mouseleave": function(t) {
                    t.preventDefault(), this.toggle && "hover" === this.toggle.mode && this.hide();
                }
            },
            methods: {
                show: function t(i, n) {
                    var o = this;
                    if (void 0 === n && (n = !0), i && this.toggle && !this.toggle.$el.is(i.$el) && this.hide(!1), 
                    this.toggle = i || this.toggle, this.clearTimers(), !this.isActive()) {
                        if (n && e && e !== this && e.isDelaying) return void (this.showTimer = setTimeout(this.show, 75));
                        e && e.hide(!1);
                        var t = function() {
                            "rejected" !== o.toggleElement(o.$el, !0).state() && (o.initMouseTracker(), o.toggle.$el.addClass(o.cls).attr("aria-expanded", "true"), 
                            o.clearTimers());
                        };
                        n && this.delayShow ? this.showTimer = setTimeout(t, this.delayShow) : t(), e = this;
                    }
                },
                hide: function t(i) {
                    var n = this;
                    void 0 === i && (i = !0), this.clearTimers();
                    var t = function() {
                        "rejected" !== n.toggleElement(n.$el, !1, !1).state() && (e = n.isActive() ? null : e, 
                        n.toggle.$el.removeClass(n.cls).attr("aria-expanded", "false").blur().find("a, button").blur(), 
                        n.cancelMouseTracker(), n.clearTimers());
                    };
                    this.isDelaying = this.movesTo(this.$el), i && this.isDelaying ? this.hideTimer = setTimeout(this.hide, this.hoverIdle) : i && this.delayHide ? this.hideTimer = setTimeout(t, this.delayHide) : t();
                },
                clearTimers: function() {
                    clearTimeout(this.showTimer), clearTimeout(this.hideTimer), this.showTimer = null, 
                    this.hideTimer = null;
                },
                isActive: function() {
                    return e === this;
                }
            }
        }), t.drop.getActive = function() {
            return e;
        };
    }
    function lt(t) {
        t.component("dropdown", t.components.drop.extend({
            name: "dropdown"
        }));
    }
    function ht(t) {
        t.component("form-custom", {
            mixins: [ pe ],
            args: "target",
            props: {
                target: Boolean
            },
            defaults: {
                target: !1
            },
            ready: function() {
                this.input = this.$el.find(":input:first"), this.target = this.target && g(this.target === !0 ? "> :input:first + :first" : this.target, this.$el);
                var t = this.input.next();
                this.input.on({
                    focus: function(e) {
                        return t.addClass("uk-focus");
                    },
                    blur: function(e) {
                        return t.removeClass("uk-focus");
                    },
                    mouseenter: function(e) {
                        return t.addClass("uk-hover");
                    },
                    mouseleave: function(e) {
                        return t.removeClass("uk-hover");
                    }
                }), this.input.trigger("change");
            },
            events: {
                change: function() {
                    this.target && this.target[this.target.is(":input") ? "val" : "text"](this.input[0].files && this.input[0].files[0] ? this.input[0].files[0].name : this.input.is("select") ? this.input.find("option:selected").text() : this.input.val());
                }
            }
        });
    }
    function ct(t) {
        t.component("gif", {
            update: {
                read: function() {
                    var t = u(this.$el);
                    !this.isInView && t && (this.$el[0].src = this.$el[0].src), this.isInView = t;
                },
                events: [ "scroll", "load", "resize", "orientationchange" ]
            }
        });
    }
    function ut(t) {
        t.component("grid", t.components.margin.extend({
            mixins: [ pe ],
            name: "grid",
            defaults: {
                margin: "uk-grid-margin",
                clsStack: "uk-grid-stack"
            },
            update: {
                write: function() {
                    this.$el.toggleClass(this.clsStack, this.stacks);
                },
                events: [ "load", "resize", "orientationchange" ]
            }
        }));
    }
    function dt(t) {
        t.component("height-match", {
            args: "target",
            props: {
                target: String,
                row: Boolean
            },
            defaults: {
                target: "> *",
                row: !0
            },
            update: {
                write: function() {
                    var t = this, e = _(this.target, this.$el).css("min-height", "");
                    if (!this.row) return this.match(e), this;
                    var i = !1, n = [];
                    e.each(function(e, o) {
                        o = Pt(o);
                        var s = o.offset().top;
                        s != i && n.length && (t.match(Pt(n)), n = [], s = o.offset().top), n.push(o), i = s;
                    }), n.length && this.match(Pt(n));
                },
                events: [ "resize", "orientationchange" ]
            },
            methods: {
                match: function(t) {
                    if (!(t.length < 2)) {
                        var e = 0;
                        t.each(function(t, i) {
                            i = Pt(i);
                            var n;
                            if ("none" === i.css("display")) {
                                var o = i.attr("style");
                                i.attr("style", o + ";display:block !important;"), n = i.outerHeight(), i.attr("style", o || "");
                            } else n = i.outerHeight();
                            e = Math.max(e, n);
                        }).each(function(t, i) {
                            i = Pt(i), i.css("min-height", e - (i.outerHeight() - parseFloat(i.css("height"))) + "px");
                        });
                    }
                }
            }
        });
    }
    function ft(t) {
        t.component("height-viewport", {
            props: {
                expand: Boolean,
                offsetTop: Boolean,
                offsetBottom: Boolean
            },
            defaults: {
                expand: !1,
                offsetTop: !1,
                offsetBottom: !1
            },
            init: function() {
                this.$emit();
            },
            update: {
                write: function() {
                    var t, e = window.innerHeight, i = 0;
                    if (this.expand) {
                        this.$el.css({
                            height: "",
                            minHeight: ""
                        });
                        var n = e - document.documentElement.offsetHeight;
                        n > 0 && this.$el.css("min-height", t = this.$el.outerHeight() + n);
                    } else {
                        var o = this.$el[0].offsetTop;
                        o < e && (this.offsetTop && (i += o), this.offsetBottom && (i += this.$el.next().outerHeight() || 0)), 
                        this.$el.css("min-height", t = i ? "calc(100vh - " + i + "px)" : "100vh");
                    }
                    this.$el.css("height", ""), t && e - i >= this.$el.outerHeight() && this.$el.css("height", t);
                },
                events: [ "load", "resize", "orientationchange" ]
            }
        });
    }
    function gt(t) {
        i(function() {
            if (Rt) {
                var e = "uk-hover";
                Ht.on("tap", function(t) {
                    var i = t.target;
                    return Pt("." + e).filter(function(t, e) {
                        return !a(i, e);
                    }).removeClass(e);
                }), Object.defineProperty(t, "hoverSelector", {
                    set: function(t) {
                        Ht.on("tap", t, function() {
                            this.classList.add(e);
                        });
                    }
                }), t.hoverSelector = ".uk-animation-toggle, .uk-transition-toggle, [uk-hover]";
            }
        });
    }
    function pt(t) {
        t.component("icon", t.components.svg.extend({
            mixins: [ pe ],
            name: "icon",
            args: "icon",
            props: [ "icon" ],
            defaults: {
                exclude: [ "id", "style", "class", "src" ]
            },
            init: function() {
                this.$el.addClass("uk-icon");
            }
        })), [ "close", "navbar-toggle-icon", "overlay-icon", "pagination-previous", "pagination-next", "slidenav", "search-icon", "totop" ].forEach(function(e) {
            return t.component(e, t.components.icon.extend({
                name: e
            }));
        });
    }
    function mt(t) {
        t.component("margin", {
            props: {
                margin: String,
                firstColumn: Boolean
            },
            defaults: {
                margin: "uk-margin-small-top",
                firstColumn: "uk-first-column"
            },
            connected: function() {
                this.$emit();
            },
            update: {
                read: function() {
                    var t = this;
                    if (0 === this.$el[0].offsetHeight) return void (this.hidden = !0);
                    this.hidden = !1, this.stacks = !0;
                    var e = this.$el.children().filter(function(t, e) {
                        return e.offsetHeight > 0;
                    });
                    this.rows = [ [ e.get(0) ] ], e.slice(1).each(function(e, i) {
                        for (var n = Math.ceil(i.offsetTop), o = n + i.offsetHeight, s = t.rows.length - 1; s >= 0; s--) {
                            var r = t.rows[s], a = Math.ceil(r[0].offsetTop);
                            if (n >= a + r[0].offsetHeight) {
                                t.rows.push([ i ]);
                                break;
                            }
                            if (o > a) {
                                if (t.stacks = !1, i.offsetLeft < r[0].offsetLeft) {
                                    r.unshift(i);
                                    break;
                                }
                                r.push(i);
                                break;
                            }
                            if (0 === s) {
                                t.rows.splice(s, 0, [ i ]);
                                break;
                            }
                        }
                    });
                },
                write: function() {
                    var t = this;
                    this.hidden || this.rows.forEach(function(e, i) {
                        return e.forEach(function(e, n) {
                            return Pt(e).toggleClass(t.margin, 0 !== i).toggleClass(t.firstColumn, 0 === n);
                        });
                    });
                },
                events: [ "load", "resize", "orientationchange" ]
            }
        });
    }
    function vt(e) {
        e.component("modal", {
            mixins: [ be ],
            props: {
                center: Boolean,
                container: Boolean
            },
            defaults: {
                center: !1,
                clsPage: "uk-modal-page",
                clsPanel: "uk-modal-dialog",
                selClose: ".uk-modal-close, .uk-modal-close-default, .uk-modal-close-outside, .uk-modal-close-full",
                container: !0
            },
            ready: function() {
                this.container = this.container === !0 && e.container || this.container && _(this.container), 
                this.container && !this.$el.parent().is(this.container) && this.$el.appendTo(this.container);
            },
            update: {
                write: function() {
                    "block" === this.$el.css("display") && this.center && this.$el.removeClass("uk-flex uk-flex-center uk-flex-middle").css("display", "block").toggleClass("uk-flex uk-flex-center uk-flex-middle", window.innerHeight > this.panel.outerHeight(!0)).css("display", this.$el.hasClass("uk-flex") ? "" : "block");
                },
                events: [ "resize", "orientationchange" ]
            },
            events: {
                beforeshow: function(t) {
                    this.$el.is(t.target) && (this.page.addClass(this.clsPage), this.$el.css("display", "block"), 
                    this.$el.height());
                },
                hide: function(t) {
                    this.$el.is(t.target) && (this.getActive() || this.page.removeClass(this.clsPage), 
                    this.$el.css("display", "").removeClass("uk-flex uk-flex-center uk-flex-middle"));
                }
            }
        }), e.component("overflow-auto", {
            mixins: [ pe ],
            ready: function() {
                this.panel = g("!.uk-modal-dialog", this.$el), this.$el.css("min-height", 150);
            },
            update: {
                write: function() {
                    var t = this.$el.css("max-height");
                    this.$el.css("max-height", 150).css("max-height", Math.max(150, 150 - (this.panel.outerHeight(!0) - window.innerHeight))), 
                    t !== this.$el.css("max-height") && this.$el.trigger("resize");
                },
                events: [ "load", "resize", "orientationchange" ]
            }
        }), e.modal.dialog = function(t, i) {
            var n = e.modal(Pt('<div class="uk-modal">\n                <div class="uk-modal-dialog">' + t + "</div>\n             </div>"), i)[0];
            return n.show(), n.$el.on("hide", function() {
                return n.$destroy(!0);
            }), n;
        }, e.modal.alert = function(i, n) {
            n = t.extend({
                bgClose: !1,
                escClose: !1,
                labels: e.modal.labels
            }, n);
            var o = Pt.Deferred();
            return e.modal.dialog('\n            <div class="uk-modal-body">' + (I(i) ? i : Pt(i).html()) + '</div>\n            <div class="uk-modal-footer uk-text-right">\n                <button class="uk-button uk-button-primary uk-modal-close" autofocus>' + n.labels.ok + "</button>\n            </div>\n        ", n).$el.on("hide", function() {
                return o.resolve();
            }), o.promise();
        }, e.modal.confirm = function(i, n) {
            n = t.extend({
                bgClose: !1,
                escClose: !1,
                labels: e.modal.labels
            }, n);
            var o = Pt.Deferred();
            return e.modal.dialog('\n            <div class="uk-modal-body">' + (I(i) ? i : Pt(i).html()) + '</div>\n            <div class="uk-modal-footer uk-text-right">\n                <button class="uk-button uk-button-default uk-modal-close">' + n.labels.cancel + '</button>\n                <button class="uk-button uk-button-primary uk-modal-close" autofocus>' + n.labels.ok + "</button>\n            </div>\n        ", n).$el.on("click", ".uk-modal-footer button", function(t) {
                return o[0 === Pt(t.target).index() ? "reject" : "resolve"]();
            }), o.promise();
        }, e.modal.prompt = function(i, n, o) {
            o = t.extend({
                bgClose: !1,
                escClose: !1,
                labels: e.modal.labels
            }, o);
            var s = Pt.Deferred(), r = e.modal.dialog('\n                <form class="uk-form-stacked">\n                    <div class="uk-modal-body">\n                        <label>' + (I(i) ? i : Pt(i).html()) + '</label>\n                        <input class="uk-input" type="text" autofocus>\n                    </div>\n                    <div class="uk-modal-footer uk-text-right">\n                        <button class="uk-button uk-button-default uk-modal-close" type="button">' + o.labels.cancel + '</button>\n                        <button class="uk-button uk-button-primary" type="submit">' + o.labels.ok + "</button>\n                    </div>\n                </form>\n            ", o), a = r.$el.find("input").val(n);
            return r.$el.on("submit", "form", function(t) {
                t.preventDefault(), s.resolve(a.val()), r.hide();
            }).on("hide", function() {
                "pending" === s.state() && s.resolve(null);
            }), s.promise();
        }, e.modal.labels = {
            ok: "Ok",
            cancel: "Cancel"
        };
    }
    function wt(t) {
        t.component("nav", t.components.accordion.extend({
            name: "nav",
            defaults: {
                targets: "> .uk-parent",
                toggle: "> a",
                content: "ul:first"
            }
        }));
    }
    function bt(e) {
        e.component("navbar", {
            mixins: [ pe ],
            props: {
                dropdown: String,
                mode: String,
                align: String,
                offset: Number,
                boundary: Boolean,
                boundaryAlign: Boolean,
                clsDrop: String,
                delayShow: Number,
                delayHide: Number,
                dropbar: Boolean,
                dropbarMode: String,
                dropbarAnchor: "jQuery",
                duration: Number
            },
            defaults: {
                dropdown: ".uk-navbar-nav > li",
                mode: "hover",
                align: "left",
                offset: !1,
                boundary: !0,
                boundaryAlign: !1,
                clsDrop: "uk-navbar-dropdown",
                delayShow: 0,
                delayHide: 800,
                flip: "x",
                dropbar: !1,
                dropbarMode: "slide",
                dropbarAnchor: !1,
                duration: 200
            },
            init: function() {
                this.boundary = this.boundary === !0 || this.boundaryAlign ? this.$el : this.boundary, 
                this.pos = "bottom-" + this.align;
            },
            ready: function() {
                var t = this;
                this.$el.on("mouseenter", this.dropdown, function(e) {
                    var i = e.target, n = t.getActive();
                    !n || a(i, n.toggle.$el) || n.isDelaying || n.hide(!1);
                }), this.dropbar && (this.dropbar = g(this.dropbar, this.$el) || Pt('<div class="uk-navbar-dropbar"></div>').insertAfter(this.dropbarAnchor || this.$el), 
                this.dropbar.on({
                    mouseleave: function() {
                        var e = t.getActive();
                        e && !t.dropbar.is(":hover") && e.hide();
                    },
                    beforeshow: function(e, i) {
                        var n = i.$el;
                        n.addClass(t.clsDrop + "-dropbar"), t.transitionTo(n.outerHeight(!0));
                    },
                    beforehide: function(e, i) {
                        var n = i.$el, o = t.getActive();
                        if (t.dropbar.is(":hover") && o && o.$el.is(n)) return !1;
                    },
                    hide: function(e, i) {
                        var n = i.$el, o = t.getActive();
                        (!o || o && o.$el.is(n)) && t.transitionTo(0);
                    }
                }), "slide" === this.dropbarMode && this.dropbar.addClass("uk-navbar-dropbar-slide"));
            },
            update: function() {
                var i = this;
                Pt(this.dropdown, this.$el).each(function(n, o) {
                    var s = _("." + i.clsDrop, o);
                    !s || e.getComponent(s, "drop") || e.getComponent(s, "dropdown") || e.drop(s, t.extend({}, i));
                });
            },
            events: {
                beforeshow: function(t, e) {
                    var i = e.$el, n = e.dir;
                    this.dropbar && "bottom" === n && !a(i, this.dropbar) && (i.appendTo(this.dropbar), 
                    this.dropbar.trigger("beforeshow", [ {
                        $el: i
                    } ]));
                }
            },
            methods: {
                getActive: function() {
                    var t = e.drop.getActive();
                    return t && "click" !== t.mode && a(t.toggle.$el, this.$el) && t;
                },
                transitionTo: function(t) {
                    return this.dropbar.height(this.dropbar[0].offsetHeight ? this.dropbar.height() : 0), 
                    Bt.cancel(this.dropbar).start(this.dropbar, {
                        height: t
                    }, this.duration);
                }
            }
        });
    }
    function yt(t) {
        t.component("offcanvas", {
            mixins: [ be ],
            args: "mode",
            props: {
                mode: String,
                flip: Boolean,
                overlay: Boolean
            },
            defaults: {
                mode: "slide",
                flip: !1,
                overlay: !1,
                clsPage: "uk-offcanvas-page",
                clsPanel: "uk-offcanvas-bar",
                clsFlip: "uk-offcanvas-flip",
                clsPageAnimation: "uk-offcanvas-page-animation",
                clsSidebarAnimation: "uk-offcanvas-bar-animation",
                clsMode: "uk-offcanvas",
                clsOverlay: "uk-offcanvas-overlay",
                clsPageOverlay: "uk-offcanvas-page-overlay",
                selClose: ".uk-offcanvas-close"
            },
            init: function() {
                this.clsFlip = this.flip ? this.clsFlip : "", this.clsOverlay = this.overlay ? this.clsOverlay : "", 
                this.clsPageOverlay = this.overlay ? this.clsPageOverlay : "", this.clsMode = this.clsMode + "-" + this.mode, 
                "none" !== this.mode && "reveal" !== this.mode || (this.clsSidebarAnimation = ""), 
                "push" !== this.mode && "reveal" !== this.mode && (this.clsPageAnimation = "");
            },
            update: {
                write: function() {
                    this.isActive() && this.page.width(window.innerWidth - this.getScrollbarWidth());
                },
                events: [ "resize", "orientationchange" ]
            },
            events: {
                beforeshow: function(t) {
                    this.$el.is(t.target) && (this.page.addClass(this.clsPage + " " + this.clsFlip + " " + this.clsPageAnimation + " " + this.clsPageOverlay), 
                    this.panel.addClass(this.clsSidebarAnimation + " " + this.clsMode), this.$el.addClass(this.clsOverlay).css("display", "block").height());
                },
                beforehide: function(t) {
                    this.$el.is(t.target) && (this.page.removeClass(this.clsPageAnimation).css("margin-left", ""), 
                    ("none" === this.mode || this.getActive() && this.getActive() !== this) && this.panel.trigger(Qt));
                },
                hide: function(t) {
                    this.$el.is(t.target) && (this.page.removeClass(this.clsPage + " " + this.clsFlip + " " + this.clsPageOverlay).width(""), 
                    this.panel.removeClass(this.clsSidebarAnimation + " " + this.clsMode), this.$el.removeClass(this.clsOverlay).css("display", ""));
                }
            }
        });
    }
    function kt(t) {
        t.component("responsive", {
            props: [ "width", "height" ],
            update: {
                write: function() {
                    this.$el.is(":visible") && this.width && this.height && this.$el.height(Lt.fit({
                        height: this.height,
                        width: this.width
                    }, {
                        width: this.$el.parent().width(),
                        height: this.height || this.$el.height()
                    }).height);
                },
                events: [ "load", "resize", "orientationchange" ]
            }
        });
    }
    function $t(t) {
        t.component("scroll", {
            props: {
                duration: Number,
                transition: String,
                offset: Number
            },
            defaults: {
                duration: 1e3,
                transition: "easeOutExpo",
                offset: 0
            },
            methods: {
                scrollToElement: function(t) {
                    var e = this;
                    t = Pt(t);
                    var i = t.offset().top - this.offset, n = _t.height(), o = window.innerHeight;
                    i + o > n && (i = n - o), Pt("html,body").stop().animate({
                        scrollTop: parseInt(i, 10) || 1
                    }, this.duration, this.transition).promise().then(function() {
                        return e.$el.triggerHandler(Pt.Event("scrolled"), [ e ]);
                    });
                }
            },
            events: {
                click: function(t) {
                    t.isDefaultPrevented() || (t.preventDefault(), this.scrollToElement(Pt(this.$el[0].hash).length ? this.$el[0].hash : "body"));
                }
            }
        }), Pt.easing.easeOutExpo || (Pt.easing.easeOutExpo = function(t, e, i, n, o) {
            return e == o ? i + n : n * (-Math.pow(2, -10 * e / o) + 1) + i;
        });
    }
    function xt(t) {
        t.component("scrollspy", {
            args: "cls",
            props: {
                cls: String,
                target: String,
                hidden: Boolean,
                offsetTop: Number,
                offsetLeft: Number,
                repeat: Boolean,
                delay: Number
            },
            defaults: {
                cls: "uk-scrollspy-inview",
                target: !1,
                hidden: !0,
                offsetTop: 0,
                offsetLeft: 0,
                repeat: !1,
                delay: 0,
                inViewClass: "uk-scrollspy-inview"
            },
            init: function() {
                this.$emit();
            },
            update: [ {
                read: function() {
                    this.elements = this.target && _(this.target, this.$el) || this.$el;
                },
                write: function() {
                    this.hidden && this.elements.filter(":not(." + this.inViewClass + ")").css("visibility", "hidden");
                }
            }, {
                read: function() {
                    var t = this;
                    this.elements.each(function(e, i) {
                        i._scrollspy || (i._scrollspy = {
                            toggles: (Pt(i).attr("uk-scrollspy-class") || t.cls).split(",")
                        }), i._scrollspy.show = u(i, t.offsetTop, t.offsetLeft);
                    });
                },
                write: function() {
                    var t = this, e = 1 === this.elements.length ? 1 : 0;
                    this.elements.each(function(i, n) {
                        var o = Pt(n), s = n._scrollspy;
                        s.show ? s.inview || s.timer || (s.timer = setTimeout(function() {
                            o.css("visibility", "").addClass(t.inViewClass).toggleClass(s.toggles[0]).trigger("inview"), 
                            s.inview = !0, delete s.timer;
                        }, t.delay * e++)) : s.inview && t.repeat && (s.timer && (clearTimeout(s.timer), 
                        delete s.timer), o.removeClass(t.inViewClass).toggleClass(s.toggles[0]).css("visibility", t.hidden ? "hidden" : "").trigger("outview"), 
                        s.inview = !1), s.toggles.reverse();
                    });
                },
                events: [ "scroll", "load", "resize", "orientationchange" ]
            } ]
        });
    }
    function Tt(t) {
        t.component("scrollspy-nav", {
            props: {
                cls: String,
                closest: String,
                scroll: Boolean,
                overflow: Boolean,
                offset: Number
            },
            defaults: {
                cls: "uk-active",
                closest: !1,
                scroll: !1,
                overflow: !0,
                offset: 0
            },
            update: [ {
                read: function() {
                    if (this.links = this.$el.find('a[href^="#"]').filter(function(t, e) {
                        return e.hash;
                    }), this.elements = this.closest ? this.links.closest(this.closest) : this.links, 
                    this.targets = Pt(Pt.map(this.links, function(t) {
                        return t.hash;
                    }).join(",")), this.scroll) {
                        var e = this.offset || 0;
                        this.links.each(function() {
                            t.scroll(this, {
                                offset: e
                            });
                        });
                    }
                }
            }, {
                read: function() {
                    var t = this, e = Nt.scrollTop() + this.offset, i = document.documentElement.scrollHeight - window.innerHeight + this.offset;
                    this.active = !1, this.targets.each(function(n, o) {
                        o = Pt(o);
                        var s = o.offset(), r = n + 1 === t.targets.length;
                        if (!t.overflow && (0 === n && s.top > e || r && s.top + o.outerHeight() < e)) return !1;
                        if (r || !(t.targets.eq(n + 1).offset().top <= e)) {
                            if (e >= i) for (var a = t.targets.length; a > n; a--) if (u(t.targets.eq(a))) {
                                o = t.targets.eq(a);
                                break;
                            }
                            return !(t.active = _(t.links.filter('[href="#' + o.attr("id") + '"]')));
                        }
                    });
                },
                write: function() {
                    this.links.blur(), this.elements.removeClass(this.cls), this.active && this.$el.trigger("active", [ this.active, (this.closest ? this.active.closest(this.closest) : this.active).addClass(this.cls) ]);
                },
                events: [ "scroll", "load", "resize", "orientationchange" ]
            } ]
        });
    }
    function Ct(t) {
        t.component("spinner", t.components.icon.extend({
            name: "spinner",
            init: function() {
                this.height = this.width = this.$el.width();
            },
            ready: function() {
                var t = this;
                this.svg.then(function(e) {
                    var i = e.find("circle"), n = Math.floor(t.width / 2);
                    e[0].setAttribute("viewBox", "0 0 " + t.width + " " + t.width), i.attr({
                        cx: n,
                        cy: n,
                        r: n - parseInt(i.css("stroke-width"), 10)
                    });
                });
            }
        }));
    }
    function St(e) {
        e.component("sticky", {
            props: {
                top: null,
                bottom: Boolean,
                offset: Number,
                animation: String,
                clsActive: String,
                clsInactive: String,
                widthElement: "jQuery",
                showOnUp: Boolean,
                media: "media",
                target: Number
            },
            defaults: {
                top: 0,
                bottom: !1,
                offset: 0,
                animation: "",
                clsActive: "uk-active",
                clsInactive: "",
                widthElement: !1,
                showOnUp: !1,
                media: !1,
                target: !1
            },
            connected: function() {
                this.placeholder = Pt('<div class="uk-sticky-placeholder"></div>').insertAfter(this.$el).attr("hidden", !0), 
                this._widthElement = this.widthElement || this.placeholder;
            },
            ready: function() {
                var t = this;
                if (this.topProp = this.top, this.bottomProp = this.bottom, this.target && location.hash && Nt.scrollTop() > 0) {
                    var e = g(location.hash);
                    e && Ft(function() {
                        var i = e.offset().top, n = t.$el.offset().top, o = t.$el.outerHeight(), s = n + o;
                        s >= i && n <= i + e.outerHeight() && window.scrollTo(0, i - o - t.target - t.offset);
                    });
                }
            },
            update: [ {
                write: function() {
                    var e, i = this, n = this.$el.outerHeight(), o = this.isActive();
                    this.placeholder.css("height", "absolute" !== this.$el.css("position") ? n : "").css(this.$el.css([ "marginTop", "marginBottom", "marginLeft", "marginRight" ])), 
                    this.topOffset = (o ? this.placeholder.offset() : this.$el.offset()).top, this.bottomOffset = this.topOffset + n, 
                    [ "top", "bottom" ].forEach(function(n) {
                        i[n] = i[n + "Prop"], i[n] && (t.isNumeric(i[n]) ? i[n] = i[n + "Offset"] + parseFloat(i[n]) : I(i[n]) && i[n].match(/^-?\d+vh$/) ? i[n] = window.innerHeight * parseFloat(i[n]) / 100 : (e = i[n] === !0 ? i.$el.parent() : g(i[n], i.$el), 
                        e && (i[n] = e.offset().top + e.outerHeight())));
                    }), this.top = Math.max(parseFloat(this.top), this.topOffset) - this.offset, this.bottom = this.bottom && this.bottom - n, 
                    this.inactive = this.media && !window.matchMedia(this.media).matches;
                },
                events: [ "load", "resize", "orientationchange" ]
            }, {
                write: function(t) {
                    var e = this;
                    void 0 === t && (t = {});
                    var i = t.dir, n = this.isActive(), o = Nt.scrollTop();
                    if (!(o < 0 || !this.$el.is(":visible") || this.disabled)) if (this.inactive || o < this.top || this.showOnUp && ("up" !== i || "up" === i && !n && o <= this.bottomOffset)) {
                        if (!n) return;
                        n = !1, this.animation && this.bottomOffset < this.$el.offset().top ? jt.cancel(this.$el).then(function() {
                            return jt.out(e.$el, e.animation).then(function() {
                                return e.hide();
                            });
                        }) : this.hide();
                    } else n ? this.update() : this.animation ? jt.cancel(this.$el).then(function() {
                        e.show(), jt.in(e.$el, e.animation);
                    }) : this.show();
                },
                events: [ "scroll" ]
            } ],
            methods: {
                show: function() {
                    this.update(), this.$el.addClass(this.clsActive).removeClass(this.clsInactive).trigger("active");
                },
                hide: function() {
                    this.$el.addClass(this.clsInactive).removeClass(this.clsActive).css({
                        position: "",
                        top: "",
                        width: ""
                    }).trigger("inactive"), this.placeholder.attr("hidden", !0);
                },
                update: function() {
                    var t = Math.max(0, this.offset), e = Nt.scrollTop();
                    this.placeholder.attr("hidden", !1), this.bottom && e > this.bottom - this.offset && (t = this.bottom - e), 
                    this.$el.css({
                        position: "fixed",
                        top: t + "px",
                        width: this._widthElement[0].getBoundingClientRect().width
                    });
                },
                isActive: function() {
                    return this.$el.hasClass(this.clsActive) && !(this.animation && this.$el.hasClass("uk-animation-leave"));
                }
            },
            disconnected: function() {
                this.placeholder.remove(), this.placeholder = null, this._widthElement = null;
            }
        });
    }
    function Et(t) {
        function e(t) {
            var e = i(t);
            if (!e) {
                if (t = t.clone().empty().attr("uk-no-boot", "").appendTo(document.body).show(), 
                t.is(":visible") || (e = i(t)), !e && "CANVAS" === t[0].tagName) {
                    var n = Pt(t[0].outerHTML.replace(/canvas/g, "span")).insertAfter(t);
                    e = i(n), n.remove();
                }
                t.remove();
            }
            return e && e.slice(4, -1).replace(/"/g, "");
        }
        function i(t) {
            var e = p(t[0], "backgroundImage", "::before");
            return "none" !== e && e;
        }
        t.component("svg", {
            props: {
                id: String,
                icon: String,
                src: String,
                class: String,
                style: String,
                width: Number,
                height: Number,
                ratio: Number
            },
            defaults: {
                ratio: 1,
                id: !1,
                class: "",
                exclude: [ "src" ]
            },
            connected: function() {
                this.svg = Pt.Deferred();
            },
            update: {
                read: function() {
                    var t = this;
                    if (this.src || (this.src = e(this.$el)), this.src && !this.isSet) {
                        if (this.isSet = !0, !this.icon && ~this.src.indexOf("#")) {
                            var i = this.src.split("#");
                            i.length > 1 && (this.src = i[0], this.icon = i[1]);
                        }
                        this.get(this.src).then(function(e) {
                            return Gt.mutate(function() {
                                var i;
                                if (i = t.icon ? (i = _("#" + t.icon, e)) && _((i[0].outerHTML || Pt("<div>").append(i.clone()).html()).replace(/symbol/g, "svg")) || !_("symbol", e) && e.clone() : e.clone(), 
                                !i || !i.length) return Pt.Deferred().reject("SVG not found.");
                                var n = i[0].getAttribute("viewBox");
                                n && (n = n.split(" "), t.width = t.width || n[2], t.height = t.height || n[3]), 
                                t.width *= t.ratio, t.height *= t.ratio;
                                for (var o in t.$options.props) t[o] && !~t.exclude.indexOf(o) && i.attr(o, t[o]);
                                t.id || i.removeAttr("id"), t.width && !t.height && i.removeAttr("height"), t.height && !t.width && i.removeAttr("width"), 
                                f(t.$el) || "CANVAS" === t.$el[0].tagName ? (t.$el.attr({
                                    hidden: !0,
                                    id: null
                                }), i.insertAfter(t.$el)) : i.appendTo(t.$el), t.svg.resolve(i);
                            });
                        });
                    }
                },
                events: [ "load" ]
            },
            methods: {
                get: function(e) {
                    function i(t) {
                        return Pt(t).filter("svg");
                    }
                    if (xe[e]) return xe[e];
                    if (xe[e] = Pt.Deferred(), 0 === e.lastIndexOf("data:", 0)) xe[e].resolve(i(decodeURIComponent(e.split(",")[1]))); else {
                        var n = "uikit_" + t.version + "_" + e;
                        $e[n] ? xe[e].resolve(i($e[n])) : Pt.get(e).then(function(t, o, s) {
                            $e[n] = s.responseText, xe[e].resolve(i($e[n]));
                        });
                    }
                    return xe[e];
                }
            },
            destroy: function() {
                f(this.$el) && this.$el.attr({
                    hidden: null,
                    id: this.id || null
                }), this.svg && this.svg.then(function(t) {
                    return t.remove();
                });
            }
        });
    }
    function At(t) {
        t.component("switcher", {
            mixins: [ we ],
            args: "connect",
            props: {
                connect: "jQuery",
                toggle: String,
                active: Number,
                swiping: Boolean
            },
            defaults: {
                connect: !1,
                toggle: " > *",
                active: 0,
                swiping: !0,
                cls: "uk-active",
                clsContainer: "uk-switcher",
                attrItem: "uk-switcher-item",
                queued: !0
            },
            ready: function() {
                var t = this;
                this.$el.on("click", this.toggle + ":not(.uk-disabled)", function(e) {
                    e.preventDefault(), t.show(e.currentTarget);
                });
            },
            update: function() {
                var t = this;
                this.toggles = Pt(this.toggle, this.$el), this.connects = this.connect || Pt(this.$el.next("." + this.clsContainer)), 
                this.connects.off("click", "[" + this.attrItem + "]").on("click", "[" + this.attrItem + "]", function(e) {
                    e.preventDefault(), t.show(Pt(e.currentTarget).attr(t.attrItem));
                }), this.swiping && this.connects.off("swipeRight swipeLeft").on("swipeRight swipeLeft", function(e) {
                    e.preventDefault(), window.getSelection().toString() || t.show("swipeLeft" == e.type ? "next" : "previous");
                }), this.updateAria(this.connects.children()), this.show(_(this.toggles.filter("." + this.cls + ":first")) || _(this.toggles.eq(this.active)) || this.toggles.first());
            },
            methods: {
                show: function(t) {
                    for (var e, i = this, n = this.toggles.length, o = this.connects.children("." + this.cls).index(), s = o >= 0, r = d(t, this.toggles, o), a = "previous" === t ? -1 : 1, l = 0; l < n; l++, 
                    r = (r + a + n) % n) if (!i.toggles.eq(r).is(".uk-disabled, [disabled]")) {
                        e = i.toggles.eq(r);
                        break;
                    }
                    !e || o >= 0 && e.hasClass(this.cls) || o === r || (this.toggles.removeClass(this.cls).attr("aria-expanded", !1), 
                    e.addClass(this.cls).attr("aria-expanded", !0), s ? this.toggleElement(this.connects.children(":nth-child(" + (o + 1) + "),:nth-child(" + (r + 1) + ")")) : this.toggleNow(this.connects.children(":nth-child(" + (r + 1) + ")")));
                }
            }
        });
    }
    function It(t) {
        t.component("tab", t.components.switcher.extend({
            mixins: [ pe ],
            name: "tab",
            defaults: {
                media: 960,
                attrItem: "uk-tab-item"
            },
            init: function() {
                var e = this.$el.hasClass("uk-tab-left") && "uk-tab-left" || this.$el.hasClass("uk-tab-right") && "uk-tab-right";
                e && t.toggle(this.$el, {
                    cls: e,
                    mode: "media",
                    media: this.media
                });
            }
        }));
    }
    function Dt(t) {
        t.component("toggle", {
            mixins: [ t.mixin.toggable ],
            args: "target",
            props: {
                href: "jQuery",
                target: "jQuery",
                mode: String,
                media: "media"
            },
            defaults: {
                href: !1,
                target: !1,
                mode: "click",
                queued: !0,
                media: !1
            },
            ready: function() {
                var t = this;
                this.target = this.target || this.href || this.$el, this.mode = Rt && "hover" == this.mode ? "click" : this.mode, 
                "media" !== this.mode && ("hover" === this.mode && this.$el.on({
                    mouseenter: function() {
                        return t.toggle("toggleShow");
                    },
                    mouseleave: function() {
                        return t.toggle("toggleHide");
                    }
                }), this.$el.on("click", function(e) {
                    (Pt(e.target).closest('a[href="#"], button').length || Pt(e.target).closest("a[href]") && (t.cls || !t.target.is(":visible"))) && e.preventDefault(), 
                    t.toggle();
                }));
            },
            update: {
                write: function() {
                    if ("media" === this.mode && this.media) {
                        var t = this.isToggled(this.target);
                        (window.matchMedia(this.media).matches ? !t : t) && this.toggle();
                    }
                },
                events: [ "load", "resize", "orientationchange" ]
            },
            methods: {
                toggle: function(t) {
                    var e = Pt.Event(t || "toggle");
                    this.target.triggerHandler(e, [ this ]), e.isDefaultPrevented() || this.toggleElement(this.target);
                }
            }
        });
    }
    function Ot(t) {
        function e(t) {
            return 0 === (p(t, "animationName") || "").lastIndexOf("uk-", 0);
        }
        var i, o, s, r = null;
        Nt.on("load", t.update).on("resize orientationchange", function(e) {
            s || (Ft(function() {
                t.update(e), s = !1;
            }), s = !0);
        }).on("scroll", function(e) {
            null === r && (r = 0), i = r < window.pageYOffset, r = window.pageYOffset, o || (Ft(function() {
                e.dir = i ? "down" : "up", t.update(e), o = !1;
            }), o = !0);
        });
        var a = 0;
        n(document, "animationstart", function(t) {
            var i = t.target;
            Gt.measure(function() {
                e(i) && Gt.mutate(function() {
                    document.body.style.overflowX = "hidden", a++;
                });
            });
        }, !0), n(document, "animationend", function(t) {
            var i = t.target;
            Gt.measure(function() {
                e(i) && !--a && Gt.mutate(function() {
                    return document.body.style.overflowX = "";
                });
            });
        }, !0), n(document.documentElement, "webkitAnimationEnd", function(t) {
            var e = t.target;
            Gt.measure(function() {
                "antialiased" === p(e, "webkitFontSmoothing") && Gt.mutate(function() {
                    e.style.webkitFontSmoothing = "subpixel-antialiased", setTimeout(function() {
                        return e.style.webkitFontSmoothing = "";
                    });
                });
            });
        }, !0), t.use(ot), t.use(st), t.use(rt), t.use(at), t.use(lt), t.use(ht), t.use(dt), 
        t.use(ft), t.use(gt), t.use(mt), t.use(ct), t.use(ut), t.use(vt), t.use(wt), t.use(bt), 
        t.use(yt), t.use(kt), t.use($t), t.use(xt), t.use(Tt), t.use(St), t.use(Et), t.use(pt), 
        t.use(Ct), t.use(At), t.use(It), t.use(Dt);
    }
    var Pt = "default" in t ? t.default : t, Nt = Pt(window), _t = Pt(document), Ht = Pt(document.documentElement), Mt = "rtl" == Pt("html").attr("dir") ? "right" : "left", Bt = {
        start: s,
        stop: function(t) {
            return Pt(t).trigger(Qt || "transitionend"), this;
        },
        cancel: function(t) {
            return Pt(t).trigger(Qt || "transitionend", [ !0 ]), this;
        },
        inProgress: function(t) {
            return Pt(t).hasClass("uk-transition");
        }
    }, jt = {
        in: function(t, e, i, n) {
            return r(t, e, i, n, !1);
        },
        out: function(t, e, i, n) {
            return r(t, e, i, n, !0);
        },
        inProgress: function(t) {
            return Pt(t).hasClass("uk-animation-enter") || Pt(t).hasClass("uk-animation-leave");
        },
        cancel: function(t) {
            var e = Pt.Deferred();
            return Pt(t).trigger(Xt || "animationend"), Ft(function() {
                return e.resolve();
            }), e.promise();
        }
    }, Ut = {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        menuitem: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0
    }, Lt = {
        ratio: function(t, e, i) {
            var n = "width" === e ? "height" : "width";
            return o = {}, o[n] = Math.round(i * t[n] / t[e]), o[e] = i, o;
            var o;
        },
        fit: function(e, i) {
            var n = this;
            return e = t.extend({}, e), t.each(e, function(t) {
                return e = e[t] > i[t] ? n.ratio(e, t, i[t]) : e;
            }), e;
        },
        cover: function(e, i) {
            var n = this;
            return e = this.fit(e, i), t.each(e, function(t) {
                return e = e[t] < i[t] ? n.ratio(e, t, i[t]) : e;
            }), e;
        }
    }, qt = window.MutationObserver || window.WebKitMutationObserver, Ft = window.requestAnimationFrame || function(t) {
        return setTimeout(t, 1e3 / 60);
    }, zt = window.cancelAnimationFrame || window.clearTimeout, Rt = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch || navigator.msPointerEnabled && navigator.msMaxTouchPoints > 0 || navigator.pointerEnabled && navigator.maxTouchPoints > 0, Wt = Rt ? window.PointerEvent ? "pointerdown" : "touchstart" : "mousedown", Yt = Rt ? window.PointerEvent ? "pointermove" : "touchmove" : "mousemove", Vt = Rt ? window.PointerEvent ? "pointerup" : "touchend" : "mouseup", Qt = function() {
        var t, e = document.body || document.documentElement, i = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (t in i) if (void 0 !== e.style[t]) return i[t];
    }(), Xt = function() {
        var t, e = document.body || document.documentElement, i = {
            WebkitAnimation: "webkitAnimationEnd",
            MozAnimation: "animationend",
            OAnimation: "oAnimationEnd oanimationend",
            animation: "animationend"
        };
        for (t in i) if (void 0 !== e.style[t]) return i[t];
    }();
    v.prototype = {
        constructor: v,
        measure: function(t, e) {
            var i = e ? t.bind(e) : t;
            return this.reads.push(i), w(this), i;
        },
        mutate: function(t, e) {
            var i = e ? t.bind(e) : t;
            return this.writes.push(i), w(this), i;
        },
        clear: function(t) {
            return k(this.reads, t) || k(this.writes, t);
        },
        extend: function(t) {
            if ("object" != typeof t) throw new Error("expected object");
            var e = Object.create(this);
            return $(e, t), e.fastdom = this, e.initialize && e.initialize(), e;
        },
        catch: null
    };
    var Gt = new v(), Jt = Object.prototype.hasOwnProperty, Kt = /-(\w)/g, Zt = {
        "!": "closest",
        "+": "nextAll",
        "-": "prevAll"
    }, te = {}, ee = {};
    ee.args = ee.created = ee.init = ee.ready = ee.connected = ee.disconnected = ee.destroy = function(e, i) {
        return i ? e ? e.concat(i) : t.isArray(i) ? i : [ i ] : e;
    }, ee.update = function(e, i) {
        return ee.args(e, t.isFunction(i) ? {
            write: i
        } : i);
    }, ee.events = function(e, i) {
        if (!i) return e;
        if (!e) return i;
        var n = t.extend({}, e);
        for (var o in i) {
            var s = n[o], r = i[o];
            s && !t.isArray(s) && (s = [ s ]), n[o] = s ? s.concat(r) : [ r ];
        }
        return n;
    }, ee.props = function(e, i) {
        if (t.isArray(i)) {
            var n = {};
            i.forEach(function(t) {
                n[t] = String;
            }), i = n;
        }
        return ee.methods(e, i);
    }, ee.defaults = ee.methods = function(e, i) {
        return i ? e ? t.extend({}, e, i) : i : e;
    };
    var ie, ne, oe, se, re, ae, le = function(t, e) {
        return O(e) ? t : e;
    }, he = {
        x: [ "width", "left", "right" ],
        y: [ "height", "top", "bottom" ]
    }, ce = {}, ue = 750;
    i(function() {
        var t, e, i, n = 0, o = 0;
        "MSGesture" in window && (re = new MSGesture(), re.target = document.body), document.addEventListener("click", function() {
            return ae = !0;
        }, !0), _t.on("MSGestureEnd gestureend", function(t) {
            var e = t.originalEvent.velocityX > 1 ? "Right" : t.originalEvent.velocityX < -1 ? "Left" : t.originalEvent.velocityY > 1 ? "Down" : t.originalEvent.velocityY < -1 ? "Up" : null;
            e && void 0 !== ce.el && (ce.el.trigger("swipe"), ce.el.trigger("swipe" + e));
        }).on(Wt, function(n) {
            i = n.originalEvent.touches ? n.originalEvent.touches[0] : n, t = Date.now(), e = t - (ce.last || t), 
            ce.el = Pt("tagName" in i.target ? i.target : i.target.parentNode), ie && clearTimeout(ie), 
            ce.x1 = i.pageX, ce.y1 = i.pageY, e > 0 && e <= 250 && (ce.isDoubleTap = !0), ce.last = t, 
            se = setTimeout(V, ue), !re || "pointerdown" != n.type && "touchstart" != n.type || re.addPointer(n.originalEvent.pointerId), 
            ae = !1;
        }).on(Yt, function(t) {
            i = t.originalEvent.touches ? t.originalEvent.touches[0] : t, Q(), ce.x2 = i.pageX, 
            ce.y2 = i.pageY, n += Math.abs(ce.x1 - ce.x2), o += Math.abs(ce.y1 - ce.y2);
        }).on(Vt, function() {
            Q(), ce.x2 && Math.abs(ce.x1 - ce.x2) > 30 || ce.y2 && Math.abs(ce.y1 - ce.y2) > 30 ? oe = setTimeout(function() {
                void 0 !== ce.el && (ce.el.trigger("swipe"), ce.el.trigger("swipe" + Y(ce.x1, ce.x2, ce.y1, ce.y2))), 
                ce = {};
            }, 0) : "last" in ce && (isNaN(n) || n < 30 && o < 30 ? ne = setTimeout(function() {
                var t = Pt.Event("tap");
                t.cancelTouch = X, void 0 !== ce.el && ce.el.trigger(t), ce.isDoubleTap ? (void 0 !== ce.el && ce.el.trigger("doubleTap"), 
                ce = {}) : ie = setTimeout(function() {
                    ie = null, void 0 !== ce.el && (ce.el.trigger("singleTap"), ae || ce.el.trigger("click")), 
                    ce = {};
                }, 300);
            }) : ce = {}, n = o = 0);
        }).on("touchcancel pointercancel", X), Nt.on("scroll", X);
    });
    var de = Object.freeze({
        win: Nt,
        doc: _t,
        docElement: Ht,
        langDirection: Mt,
        isReady: e,
        ready: i,
        on: n,
        off: o,
        transition: s,
        Transition: Bt,
        animate: r,
        Animation: jt,
        isWithin: a,
        attrFilter: l,
        removeClass: h,
        createEvent: c,
        isInView: u,
        getIndex: d,
        isVoidElement: f,
        Dimensions: Lt,
        query: g,
        Observer: qt,
        requestAnimationFrame: Ft,
        cancelAnimationFrame: zt,
        hasTouch: Rt,
        pointerDown: Wt,
        pointerMove: Yt,
        pointerUp: Vt,
        transitionend: Qt,
        animationend: Xt,
        getStyle: p,
        getCssVar: m,
        fastdom: Gt,
        $: Pt,
        bind: x,
        hasOwn: T,
        classify: C,
        hyphenate: S,
        camelize: E,
        isString: I,
        isNumber: D,
        isUndefined: O,
        isContextSelector: P,
        getContextSelectors: N,
        toJQuery: _,
        toBoolean: H,
        toNumber: M,
        toMedia: B,
        coerce: j,
        ajax: t.ajax,
        each: t.each,
        extend: t.extend,
        map: t.map,
        merge: t.merge,
        isArray: t.isArray,
        isNumeric: t.isNumeric,
        isFunction: t.isFunction,
        isPlainObject: t.isPlainObject,
        mergeOptions: U,
        position: L,
        getDimensions: q,
        flipPosition: W
    }), fe = function(t) {
        this._init(t);
    };
    fe.util = de, fe.data = "__uikit__", fe.prefix = "uk-", fe.options = {}, fe.instances = {}, 
    fe.elements = [], J(fe), Z(fe), tt(fe), et(fe), G(fe);
    var ge, pe = {
        init: function() {
            this.$el.addClass(this.$name);
        }
    }, me = {
        overflow: "",
        height: "",
        paddingTop: "",
        paddingBottom: "",
        marginTop: "",
        marginBottom: ""
    }, ve = {
        overflow: "hidden",
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0
    }, we = {
        props: {
            cls: Boolean,
            animation: Boolean,
            duration: Number,
            origin: String,
            transition: String,
            queued: Boolean
        },
        defaults: {
            cls: !1,
            animation: !1,
            duration: 200,
            origin: !1,
            transition: "linear",
            queued: !1
        },
        ready: function() {
            I(this.animation) && (this.animation = this.animation.split(","), 1 === this.animation.length && (this.animation[1] = this.animation[0]), 
            this.animation = this.animation.map(function(t) {
                return t.trim();
            })), this.queued = this.queued && !!this.animation;
        },
        methods: {
            toggleElement: function(t, e, i) {
                var n, o = this, s = document.body, r = s.scrollTop, a = function(t) {
                    return Pt.when.apply(Pt, t.toArray().map(function(t) {
                        return o._toggleElement(t, e, i);
                    }));
                }, l = function(t) {
                    var e = a(t);
                    return o.queued = !0, s.scrollTop = r, e;
                };
                return t = Pt(t), !this.queued || t.length < 2 ? a(t) : this.queued !== !0 ? l(t.not(this.queued)) : (this.queued = t.not(n = t.filter(function(t, e) {
                    return o.isToggled(e);
                })), a(n).then(function() {
                    return o.queued !== !0 && l(o.queued);
                }));
            },
            toggleNow: function(t, e) {
                var i = this;
                Pt(t).each(function(t, n) {
                    return i._toggleElement(n, e, !1);
                });
            },
            isToggled: function(t) {
                return t = Pt(t), this.cls ? t.hasClass(this.cls.split(" ")[0]) : !t.attr("hidden");
            },
            updateAria: function(t) {
                this.cls === !1 && t.attr("aria-hidden", !this.isToggled(t));
            },
            _toggleElement: function(t, e, i) {
                var n = this;
                t = Pt(t);
                var o;
                if (jt.inProgress(t)) return jt.cancel(t).then(function() {
                    return n._toggleElement(t, e, i);
                });
                e = "boolean" == typeof e ? e : !this.isToggled(t);
                var s = Pt.Event("before" + (e ? "show" : "hide"));
                return t.trigger(s, [ this ]), s.result === !1 ? Pt.Deferred().reject() : (o = (this.animation === !0 && i !== !1 ? this._toggleHeight : this.animation && i !== !1 ? this._toggleAnimation : this._toggleImmediate)(t, e), 
                t.trigger(e ? "show" : "hide", [ this ]), o);
            },
            _toggle: function(t, e) {
                t = Pt(t), this.cls ? t.toggleClass(this.cls, ~this.cls.indexOf(" ") ? void 0 : e) : t.attr("hidden", !e), 
                t.find("[autofocus]:visible").focus(), this.updateAria(t), UIkit.update(null, t);
            },
            _toggleImmediate: function(t, e) {
                return this._toggle(t, e), Pt.Deferred().resolve();
            },
            _toggleHeight: function(e, i) {
                var n, o = this, s = Bt.inProgress(e), r = parseFloat(e.children().first().css("margin-top")) + parseFloat(e.children().last().css("margin-bottom")), a = e[0].offsetHeight ? e.height() + (s ? 0 : r) : 0;
                return Bt.cancel(e), this.isToggled(e) || this._toggle(e, !0), e.css("height", ""), 
                n = e.height() + (s ? 0 : r), e.height(a), i ? Bt.start(e, t.extend(me, {
                    overflow: "hidden",
                    height: n
                }), Math.round(this.duration * (1 - a / n)), this.transition) : Bt.start(e, ve, Math.round(this.duration * (a / n)), this.transition).then(function() {
                    o._toggle(e, !1), e.css(me);
                });
            },
            _toggleAnimation: function(t, e) {
                var i = this;
                return e ? (this._toggle(t, !0), jt.in(t, this.animation[0], this.duration, this.origin)) : jt.out(t, this.animation[1], this.duration, this.origin).then(function() {
                    return i._toggle(t, !1);
                });
            }
        }
    };
    _t.on({
        click: function(t) {
            ge && ge.bgClose && !t.isDefaultPrevented() && !a(t.target, ge.panel) && ge.hide();
        },
        keydown: function(t) {
            27 === t.keyCode && ge && ge.escClose && (t.preventDefault(), ge.hide());
        }
    });
    var be = {
        mixins: [ pe, we ],
        props: {
            clsPanel: String,
            selClose: String,
            escClose: Boolean,
            bgClose: Boolean,
            stack: Boolean
        },
        defaults: {
            cls: "uk-open",
            escClose: !0,
            bgClose: !0,
            overlay: !0,
            stack: !1
        },
        ready: function() {
            var t = this;
            this.page = Pt(document.documentElement), this.body = Pt(document.body), this.panel = _("." + this.clsPanel, this.$el), 
            this.$el.on("click", this.selClose, function(e) {
                e.preventDefault(), t.hide();
            });
        },
        events: {
            toggle: function(t) {
                t.preventDefault(), this.toggleNow(this.$el);
            },
            beforeshow: function(t) {
                var e = this;
                if (this.$el.is(t.target)) {
                    if (this.isActive()) return !1;
                    var i = ge && ge !== this && ge;
                    ge || this.body.css("overflow-y", this.getScrollbarWidth() && this.overlay ? "scroll" : ""), 
                    ge = this, i && (this.stack ? this.prev = i : i.hide()), this.panel.one(Qt, function() {
                        var t = Pt.Event("show");
                        t.isShown = !0, e.$el.trigger(t, [ e ]);
                    });
                }
            },
            show: function(t) {
                this.$el.is(t.target) && (t.isShown || t.stopImmediatePropagation());
            },
            beforehide: function(t) {
                var e = this;
                if (this.$el.is(t.target)) {
                    ge = ge && ge !== this && ge || this.prev;
                    var i = function() {
                        var t = Pt.Event("hide");
                        t.isHidden = !0, e.$el.trigger(t, [ e ]);
                    };
                    parseFloat(this.panel.css("transition-duration")) ? this.panel.one(Qt, i) : i();
                }
            },
            hide: function(t) {
                if (this.$el.is(t.target)) return t.isHidden ? void (ge || this.body.css("overflow-y", "")) : void t.stopImmediatePropagation();
            }
        },
        methods: {
            isActive: function() {
                return this.$el.hasClass(this.cls);
            },
            toggle: function() {
                return this.isActive() ? this.hide() : this.show();
            },
            show: function() {
                var t = Pt.Deferred();
                return this.$el.one("show", function() {
                    return t.resolve();
                }), this.toggleNow(this.$el, !0), t.promise();
            },
            hide: function() {
                var t = Pt.Deferred();
                return this.$el.one("hide", function() {
                    return t.resolve();
                }), this.toggleNow(this.$el, !1), t.promise();
            },
            getActive: function() {
                return ge;
            },
            getScrollbarWidth: function() {
                var t = this.page[0].style.width;
                this.page.css("width", "");
                var e = window.innerWidth - this.page.width();
                return t && this.page.width(t), e;
            }
        }
    }, ye = {
        defaults: {
            positions: [],
            position: null
        },
        methods: {
            initMouseTracker: function() {
                var t = this;
                this.positions = [], this.position = null, this.mouseHandler = function(e) {
                    t.positions.push({
                        x: e.pageX,
                        y: e.pageY
                    }), t.positions.length > 5 && t.positions.shift();
                }, _t.on("mousemove", this.mouseHandler);
            },
            cancelMouseTracker: function() {
                this.mouseHandler && _t.off("mousemove", this.mouseHandler);
            },
            movesTo: function(t) {
                var e = q(t), i = [ [ {
                    x: e.left,
                    y: e.top
                }, {
                    x: e.right,
                    y: e.bottom
                } ], [ {
                    x: e.right,
                    y: e.top
                }, {
                    x: e.left,
                    y: e.bottom
                } ] ], n = this.positions[this.positions.length - 1], o = this.positions[0] || n;
                if (!n) return !1;
                e.right <= n.x || (e.left >= n.x ? (i[0].reverse(), i[1].reverse()) : e.bottom <= n.y ? i[0].reverse() : e.top >= n.y && i[1].reverse());
                var s = n && !(this.position && n.x === this.position.x && n.y === this.position.y) && i.reduce(function(t, e) {
                    return t + (it(o, e[0]) < it(n, e[0]) && it(o, e[1]) > it(n, e[1]));
                }, 0);
                return this.position = s ? n : null, s;
            }
        }
    }, ke = {
        props: {
            pos: String,
            offset: null,
            flip: Boolean,
            clsPos: String
        },
        defaults: {
            pos: "bottom-left",
            flip: !0,
            offset: !1,
            clsPos: ""
        },
        init: function() {
            this.pos = (this.pos + (~this.pos.indexOf("-") ? "" : "-center")).split("-"), this.dir = this.pos[0], 
            this.align = this.pos[1];
        },
        methods: {
            positionAt: function(t, e, i) {
                h(t, this.clsPos + "-(top|bottom|left|right)(-[a-z]+)?").css({
                    top: "",
                    left: ""
                }), this.dir = this.pos[0], this.align = this.pos[1];
                var n = M(this.offset) || 0, o = this.getAxis(), s = L(t, e, "x" === o ? W(this.dir) + " " + this.align : this.align + " " + W(this.dir), "x" === o ? this.dir + " " + this.align : this.align + " " + this.dir, "x" === o ? "" + ("left" === this.dir ? -1 * n : n) : " " + ("top" === this.dir ? -1 * n : n), null, this.flip, i);
                this.dir = "x" === o ? s.target.x : s.target.y, this.align = "x" === o ? s.target.y : s.target.x, 
                t.css("display", "").toggleClass(this.clsPos + "-" + this.dir + "-" + this.align, this.offset === !1);
            },
            getAxis: function() {
                return "top" === this.pos[0] || "bottom" === this.pos[0] ? "y" : "x";
            }
        }
    }, $e = window.sessionStorage || {}, xe = {};
    return fe.version = "3.0.0", nt(fe), Ot(fe), "undefined" != typeof module && (module.exports = fe), 
    fe;
}), function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(require("uikit")) : "function" == typeof define && define.amd ? define([ "uikit" ], e) : e(t.UIkit);
}(this, function(t) {
    "use strict";
    var e, i = t.util.$, n = t.util.doc, o = t.util.extend, s = t.util.Dimensions, r = t.util.getIndex, a = t.util.Transition;
    n.on({
        keydown: function(t) {
            if (e) switch (t.keyCode) {
              case 37:
                e.show("previous");
                break;

              case 39:
                e.show("next");
            }
        }
    }), UIkit.component("lightbox", {
        name: "lightbox",
        props: {
            toggle: String,
            duration: Number,
            inverse: Boolean
        },
        defaults: {
            toggle: "a",
            duration: 400,
            dark: !1,
            attrItem: "uk-lightbox-item",
            items: [],
            index: 0
        },
        ready: function() {
            var t = this;
            this.toggles = i(this.toggle, this.$el), this.toggles.each(function(e, n) {
                n = i(n), t.items.push({
                    source: n.attr("href"),
                    title: n.attr("title"),
                    type: n.attr("type")
                });
            }), this.$el.on("click", this.toggle + ":not(.uk-disabled)", function(e) {
                e.preventDefault(), t.show(t.toggles.index(e.currentTarget));
            });
        },
        update: {
            write: function() {
                var t = this, e = this.getItem();
                if (this.modal && e.content) {
                    var n = this.modal.panel, o = {
                        width: n.width(),
                        height: n.height()
                    }, r = {
                        width: window.innerWidth - (n.outerWidth(!0) - o.width),
                        height: window.innerHeight - (n.outerHeight(!0) - o.height)
                    }, l = s.fit({
                        width: e.width,
                        height: e.height
                    }, r);
                    a.stop(n).stop(this.modal.content), this.modal.content && this.modal.content.remove(), 
                    this.modal.content = i(e.content).css("opacity", 0).appendTo(n), n.css(o), a.start(n, l, this.duration).then(function() {
                        a.start(t.modal.content, {
                            opacity: 1
                        }, 400).then(function() {
                            n.find("[uk-transition-hide]").show(), n.find("[uk-transition-show]").hide();
                        });
                    });
                }
            },
            events: [ "resize", "orientationchange" ]
        },
        events: {
            showitem: function(t) {
                var e = this.getItem();
                e.content && (this.$update(), t.stopImmediatePropagation());
            }
        },
        methods: {
            show: function(t) {
                var n = this;
                this.index = r(t, this.items, this.index), this.modal || (this.modal = UIkit.modal.dialog('\n                    <button class="uk-modal-close-outside" uk-transition-hide type="button" uk-close></button>\n                    <span class="uk-position-center" uk-transition-show uk-icon="icon: trash"></span>\n                    ', {
                    center: !0
                }), this.modal.$el.css("overflow", "hidden").addClass("uk-modal-lightbox"), this.modal.panel.css({
                    width: 200,
                    height: 200
                }), this.modal.caption = i('<div class="uk-modal-caption" uk-transition-hide></div>').appendTo(this.modal.panel), 
                this.items.length > 1 && i('<div class="' + (this.dark ? "uk-dark" : "uk-light") + '" uk-transition-hide>\n                            <a href="#" class="uk-position-center-left" uk-slidenav="previous" uk-lightbox-item="previous"></a>\n                            <a href="#" class="uk-position-center-right" uk-slidenav="next" uk-lightbox-item="next"></a>\n                        </div>\n                    ').appendTo(this.modal.panel.addClass("uk-slidenav-position")), 
                this.modal.$el.on("hide", this.hide).on("click", "[" + this.attrItem + "]", function(t) {
                    t.preventDefault(), n.show(i(t.currentTarget).attr(n.attrItem));
                }).on("swipeRight swipeLeft", function(t) {
                    t.preventDefault(), window.getSelection().toString() || n.show("swipeLeft" == t.type ? "next" : "previous");
                })), e = this, this.modal.panel.find("[uk-transition-hide]").hide(), this.modal.panel.find("[uk-transition-show]").show(), 
                this.modal.content && this.modal.content.remove(), this.modal.caption.text(this.getItem().title);
                var o = i.Event("showitem");
                this.$el.trigger(o), o.isImmediatePropagationStopped() || this.setError(this.getItem());
            },
            hide: function() {
                var t = this;
                e = e && e !== this && e, this.modal.hide().then(function() {
                    t.modal.$destroy(!0), t.modal = null;
                });
            },
            getItem: function() {
                return this.items[this.index] || {
                    source: "",
                    title: "",
                    type: ""
                };
            },
            setItem: function(t, e, i, n) {
                void 0 === i && (i = 200), void 0 === n && (n = 200), o(t, {
                    content: e,
                    width: i,
                    height: n
                }), this.$update();
            },
            setError: function(t) {
                this.setItem(t, '<div class="uk-position-cover uk-flex uk-flex-middle uk-flex-center"><strong>Loading resource failed!</strong></div>', 400, 300);
            }
        }
    }), UIkit.mixin({
        events: {
            showitem: function(t) {
                var e = this, i = this.getItem();
                if ("image" === i.type || !i.source || i.source.match(/\.(jp(e)?g|png|gif|svg)$/i)) {
                    var n = new Image();
                    n.onerror = function() {
                        return e.setError(i);
                    }, n.onload = function() {
                        return e.setItem(i, '<img class="uk-responsive-width" width="' + n.width + '" height="' + n.height + '" src ="' + i.source + '">', n.width, n.height);
                    }, n.src = i.source, t.stopImmediatePropagation();
                }
            }
        }
    }, "lightbox"), UIkit.mixin({
        events: {
            showitem: function(t) {
                var e = this, n = this.getItem();
                if ("video" === n.type || !n.source || n.source.match(/\.(mp4|webm|ogv)$/i)) {
                    var o = i('<video class="uk-responsive-width" controls></video>').on("loadedmetadata", function() {
                        return e.setItem(n, o.attr({
                            width: o[0].videoWidth,
                            height: o[0].videoHeight
                        }), o[0].videoWidth, o[0].videoHeight);
                    }).attr("src", n.source);
                    t.stopImmediatePropagation();
                }
            }
        }
    }, "lightbox"), UIkit.mixin({
        events: {
            showitem: function(t) {
                var e, i = this, n = this.getItem();
                if ((e = n.source.match(/\/\/.*?youtube\.[a-z]+\/watch\?v=([^&]+)&?(.*)/)) || n.source.match(/youtu\.be\/(.*)/)) {
                    var o = e[1], s = new Image(), r = !1, a = function(t, e) {
                        return i.setItem(n, '<iframe src="//www.youtube.com/embed/' + o + '" width="' + t + '" height="' + e + '" style="max-width:100%;box-sizing:border-box;"></iframe>', t, e);
                    };
                    s.onerror = function() {
                        return a(640, 320);
                    }, s.onload = function() {
                        120 === s.width && 90 === s.height ? r ? a(640, 320) : (r = !0, s.src = "//img.youtube.com/vi/" + o + "/0.jpg") : a(s.width, s.height);
                    }, s.src = "//img.youtube.com/vi/" + o + "/maxresdefault.jpg", t.stopImmediatePropagation();
                }
            }
        }
    }, "lightbox"), UIkit.mixin({
        events: {
            showitem: function(t) {
                var e, n = this, o = this.getItem();
                if (e = o.source.match(/(\/\/.*?)vimeo\.[a-z]+\/([0-9]+).*?/)) {
                    var s = e[2], r = function(t, e) {
                        return n.setItem(o, '<iframe src="//player.vimeo.com/video/' + s + '" width="' + t + '" height="' + e + '" style="max-width:100%;box-sizing:border-box;"></iframe>', t, e);
                    };
                    i.ajax({
                        type: "GET",
                        url: "http://vimeo.com/api/oembed.json?url=" + encodeURI(o.source),
                        jsonp: "callback",
                        dataType: "jsonp"
                    }).then(function(t) {
                        return r(t.width, t.height);
                    }), t.stopImmediatePropagation();
                }
            }
        }
    }, "lightbox");
}), function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(require("uikit")) : "function" == typeof define && define.amd ? define([ "uikit" ], e) : e(t.UIkit);
}(this, function(t) {
    "use strict";
    var e = t.util.$, i = t.util.Transition, n = {};
    UIkit.component("notification", {
        functional: !0,
        args: [ "message", "status" ],
        defaults: {
            message: "",
            status: "",
            timeout: 5e3,
            group: null,
            pos: "top-center",
            onClose: null
        },
        created: function() {
            n[this.pos] || (n[this.pos] = e('<div class="uk-notification uk-notification-' + this.pos + '"></div>').appendTo(t.container)), 
            this.$mount(e('<div class="uk-notification-message' + (this.status ? " uk-notification-message-" + this.status : "") + '">\n                <a href="#" class="uk-notification-close" data-uk-close></a>\n                <div>' + this.message + "</div>\n            </div>").appendTo(n[this.pos].show()));
        },
        ready: function() {
            var t = this, e = parseInt(this.$el.css("margin-bottom"), 10);
            i.start(this.$el.css({
                opacity: 0,
                marginTop: -1 * this.$el.outerHeight(),
                marginBottom: 0
            }), {
                opacity: 1,
                marginTop: 0,
                marginBottom: e
            }).then(function() {
                t.timeout && (t.timer = setTimeout(t.close, t.timeout), t.$el.on("mouseenter", function() {
                    return clearTimeout(t.timer);
                }).on("mouseleave", function() {
                    return t.timer = setTimeout(t.close, t.timeout);
                }));
            });
        },
        events: {
            click: function(t) {
                t.preventDefault(), this.close();
            }
        },
        methods: {
            close: function(t) {
                var e = this, o = function() {
                    e.onClose && e.onClose(), e.$el.trigger("close", [ e ]).remove(), n[e.pos].children().length || n[e.pos].hide();
                };
                this.timer && clearTimeout(this.timer), t ? o() : i.start(this.$el, {
                    opacity: 0,
                    marginTop: -1 * this.$el.outerHeight(),
                    marginBottom: 0
                }).then(o);
            }
        }
    }), UIkit.notification.closeAll = function(t, e) {
        var i;
        UIkit.elements.forEach(function(n) {
            !(i = UIkit.getComponent(n, "notification")) || t && t !== i.group || i.close(e);
        });
    };
}), function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(require("uikit")) : "function" == typeof define && define.amd ? define([ "uikit" ], e) : e(t.UIkit);
}(this, function(t) {
    "use strict";
    function e(t) {
        return UIkit.getComponent(t, "sortable") || t.parentNode && e(t.parentNode);
    }
    function i() {
        var t = setTimeout(function() {
            return s.trigger("click");
        }, 0), e = function(i) {
            i.preventDefault(), i.stopPropagation(), clearTimeout(t), c(s, "click", e, !0);
        };
        h(s, "click", e, !0);
    }
    var n = t.util.$, o = t.util.createEvent, s = t.util.docElement, r = t.util.extend, a = t.util.isWithin, l = t.util.Observer, h = t.util.on, c = t.util.off, u = t.util.pointerDown, d = t.util.pointerMove, f = t.util.pointerUp, g = t.util.win;
    UIkit.component("sortable", {
        mixins: [ t.mixin.class ],
        props: {
            group: String,
            animation: Number,
            threshold: Number,
            clsItem: String,
            clsPlaceholder: String,
            clsDrag: String,
            clsDragState: String,
            clsBase: String,
            clsNoDrag: String,
            clsEmpty: String,
            clsCustom: String,
            handle: String
        },
        defaults: {
            group: !1,
            animation: 150,
            threshold: 5,
            clsItem: "uk-sortable-item",
            clsPlaceholder: "uk-sortable-placeholder",
            clsDrag: "uk-sortable-drag",
            clsDragState: "uk-drag",
            clsBase: "uk-sortable",
            clsNoDrag: "uk-sortable-nodrag",
            clsEmpty: "uk-sortable-empty",
            clsCustom: "",
            handle: !1
        },
        init: function() {
            var t = this;
            [ "init", "start", "move", "end" ].forEach(function(e) {
                var i = t[e];
                t[e] = function(e) {
                    e = e.originalEvent || e, t.scrollY = window.scrollY;
                    var n = e.touches && e.touches[0] || e, o = n.pageX, s = n.pageY;
                    t.pos = {
                        x: o,
                        y: s
                    }, i(e);
                };
            });
        },
        connected: function() {
            var t = this;
            if (h(this.$el, u, this.init), this.clsEmpty) {
                var e = function() {
                    return t.$el.toggleClass(t.clsEmpty, !t.$el.children().length);
                };
                (this._observer = new l(e)).observe(this.$el[0], {
                    childList: !0
                }), e();
            }
        },
        update: {
            write: function() {
                var t = this;
                if (this.drag) {
                    this.drag.offset({
                        top: this.pos.y + this.origin.top,
                        left: this.pos.x + this.origin.left
                    });
                    var e = this.drag.offset().top, i = e + this.drag[0].offsetHeight;
                    e > 0 && e < this.scrollY ? setTimeout(function() {
                        return g.scrollTop(t.scrollY - 5);
                    }, 5) : i < s[0].offsetHeight && i > window.innerHeight + this.scrollY && setTimeout(function() {
                        return g.scrollTop(t.scrollY + 5);
                    }, 5);
                }
            }
        },
        methods: {
            init: function(t) {
                var e = n(t.target), i = this.$el.children().filter(function(e, i) {
                    return a(t.target, i);
                });
                !i.length || e.is(":input") || this.handle && !a(e, this.handle) || t.button && 0 !== t.button || a(e, "." + this.clsNoDrag) || (t.preventDefault(), 
                t.stopPropagation(), this.touched = [ this ], this.placeholder = i, this.origin = r({
                    target: e,
                    index: this.placeholder.index()
                }, this.pos), s.on(d, this.move), s.on(f, this.end), g.on("scroll", this.scroll), 
                this.threshold || this.start(t));
            },
            start: function(e) {
                this.drag = n(this.placeholder[0].outerHTML.replace(/^<li/i, "<div").replace(/li>$/i, "div>")).attr("uk-no-boot", "").addClass(this.clsDrag + " " + this.clsCustom).css({
                    boxSizing: "border-box",
                    width: this.placeholder.outerWidth(),
                    height: this.placeholder.outerHeight()
                }).css(this.placeholder.css([ "paddingLeft", "paddingRight", "paddingTop", "paddingBottom" ])).appendTo(t.container), 
                this.drag.children().first().height(this.placeholder.children().height());
                var i = this.placeholder.offset(), o = i.left, a = i.top;
                r(this.origin, {
                    left: o - this.pos.x,
                    top: a - this.pos.y
                }), this.placeholder.addClass(this.clsPlaceholder), this.$el.children().addClass(this.clsItem), 
                s.addClass(this.clsDragState), this.$el.trigger("start", [ this, this.placeholder, this.drag ]), 
                this.move(e);
            },
            move: function t(i) {
                if (!this.drag) return void ((Math.abs(this.pos.x - this.origin.x) > this.threshold || Math.abs(this.pos.y - this.origin.y) > this.threshold) && this.start(i));
                this.$emit();
                var o = "mousemove" === i.type ? i.target : document.elementFromPoint(this.pos.x - document.body.scrollLeft, this.pos.y - document.body.scrollTop), s = e(o), r = e(this.placeholder[0]), t = s !== r;
                if (s && !a(o, this.placeholder) && (!t || s.group && s.group === r.group)) {
                    if (o = s.$el.is(o.parentNode) && n(o) || s.$el.children().has(o), t) r.remove(this.placeholder); else if (!o.length) return;
                    s.insert(this.placeholder, o), ~this.touched.indexOf(s) || this.touched.push(s);
                }
            },
            scroll: function t() {
                var t = window.scrollY;
                t !== this.scrollY && (this.pos.y += t - this.scrollY, this.scrollY = t, this.$emit());
            },
            end: function(t) {
                if (s.off(d, this.move), s.off(f, this.end), g.off("scroll", this.scroll), !this.drag) return void ("mouseup" !== t.type && a(t.target, "a[href]") && (location.href = n(t.target).closest("a[href]").attr("href")));
                i();
                var o = e(this.placeholder[0]);
                this === o ? this.origin.index !== this.placeholder.index() && this.$el.trigger("change", [ this, this.placeholder, "moved" ]) : (o.$el.trigger("change", [ o, this.placeholder, "added" ]), 
                this.$el.trigger("change", [ this, this.placeholder, "removed" ])), this.$el.trigger("stop", [ this ]), 
                this.drag.remove(), this.drag = null, this.touched.forEach(function(t) {
                    return t.$el.children().removeClass(t.clsPlaceholder + " " + t.clsItem);
                }), s.removeClass(this.clsDragState);
            },
            insert: function t(e, i) {
                var n = this;
                this.$el.children().addClass(this.clsItem);
                var t = function() {
                    i.length ? !n.$el.has(e).length || e.prevAll().filter(i).length ? e.insertBefore(i) : e.insertAfter(i) : n.$el.append(e);
                };
                this.animation ? this.animate(t) : t();
            },
            remove: function(t) {
                this.$el.has(t).length && (this.animation ? this.animate(function() {
                    return t.remove();
                }) : t.remove());
            },
            animate: function(t) {
                var e = this, i = [], s = o("update", !0, !1, {
                    sync: !0
                }), a = this.$el.children().toArray().map(function(t) {
                    return t = n(t), i.push(r({
                        position: "absolute",
                        pointerEvents: "none",
                        width: t.outerWidth(),
                        height: t.outerHeight()
                    }, t.position())), t;
                }), l = {
                    position: "",
                    width: "",
                    height: "",
                    pointerEvents: "",
                    top: "",
                    left: ""
                };
                t(), a.forEach(function(t) {
                    return t.stop();
                }), this.$el.children().css(l), this.$update(s, !0), this.$el.css("min-height", this.$el.height());
                var h = a.map(function(t) {
                    return t.position();
                });
                n.when.apply(n, a.map(function(t, n) {
                    return t.css(i[n]).animate(h[n], e.animation).promise();
                })).then(function() {
                    e.$el.css("min-height", "").children().css(l), e.$update(s, !0);
                });
            }
        },
        disconnected: function() {
            c(this.$el, u, this.init), this._observer && this._observer.disconnect();
        }
    });
}), function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(require("uikit")) : "function" == typeof define && define.amd ? define([ "uikit" ], e) : e(t.UIkit);
}(this, function(t) {
    "use strict";
    var e = t.util.$, i = t.util.flipPosition;
    UIkit.component("tooltip", {
        mixins: [ t.mixin.toggable, t.mixin.position ],
        props: {
            delay: Number
        },
        defaults: {
            pos: "top",
            delay: 0,
            animation: "uk-animation-scale-up",
            duration: 100,
            cls: "uk-active",
            clsPos: "uk-tooltip"
        },
        ready: function() {
            this.content = this.$el.attr("title"), this.$el.removeAttr("title").attr("aria-expanded", !1);
        },
        methods: {
            show: function() {
                var n = this;
                clearTimeout(this.showTimer), "true" !== this.$el.attr("aria-expanded") && (this.tooltip = e('<div class="' + this.clsPos + '" aria-hidden="true"><div class="' + this.clsPos + '-inner">' + this.content + "</div></div>").appendTo(t.container), 
                this.$el.attr("aria-expanded", !0), this.positionAt(this.tooltip, this.$el), this.origin = "y" === this.getAxis() ? i(this.dir) + "-" + this.align : this.align + "-" + i(this.dir), 
                this.showTimer = setTimeout(function() {
                    n.toggleElement(n.tooltip, !0), n.hideTimer = setInterval(function() {
                        n.$el.is(":visible") || n.hide();
                    }, 150);
                }, this.delay));
            },
            hide: function() {
                this.$el.is("input") && this.$el[0] === document.activeElement || (clearTimeout(this.showTimer), 
                clearInterval(this.hideTimer), this.$el.attr("aria-expanded", !1), this.toggleElement(this.tooltip, !1), 
                this.tooltip.remove(), this.tooltip = !1);
            }
        },
        events: {
            "focus mouseenter": "show",
            "blur mouseleave": "hide"
        }
    });
}), function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(require("uikit")) : "function" == typeof define && define.amd ? define([ "uikit" ], e) : e(t.UIkit);
}(this, function(t) {
    "use strict";
    function e(t, e) {
        return e.match(new RegExp("^" + t.replace(/\//g, "\\/").replace(/\*\*/g, "(\\/[^\\/]+)*").replace(/\*/g, "[^\\/]+").replace(/((?!\\))\?/g, "$1.") + "$", "i"));
    }
    function i(t, e) {
        for (var i = [], n = 0; n < t.length; n += e) {
            for (var o = [], s = 0; s < e; s++) o.push(t[n + s]);
            i.push(o);
        }
        return i;
    }
    var n = t.util.$, o = t.util.ajax, s = t.util.on;
    UIkit.component("upload", {
        props: {
            allow: String,
            clsDragover: String,
            concurrent: Number,
            dataType: String,
            mime: String,
            msgInvalidMime: String,
            msgInvalidName: String,
            multiple: Boolean,
            name: String,
            params: Object,
            type: String,
            url: String
        },
        defaults: {
            allow: !1,
            clsDragover: "uk-dragover",
            concurrent: 1,
            dataType: void 0,
            mime: !1,
            msgInvalidMime: "Invalid File Type: %s",
            msgInvalidName: "Invalid File Name: %s",
            multiple: !1,
            name: "files[]",
            params: {},
            type: "POST",
            url: "",
            abort: null,
            beforeAll: null,
            beforeSend: null,
            complete: null,
            completeAll: null,
            error: null,
            fail: function(t) {
                alert(t);
            },
            load: null,
            loadEnd: null,
            loadStart: null,
            progress: null
        },
        events: {
            change: function(t) {
                n(t.target).is('input[type="file"]') && (t.preventDefault(), t.target.files && this.upload(t.target.files), 
                t.target.value = "");
            },
            drop: function(t) {
                t.preventDefault(), t.stopPropagation();
                var e = t.originalEvent.dataTransfer;
                e && e.files && (this.$el.removeClass(this.clsDragover), this.upload(e.files));
            },
            dragenter: function(t) {
                t.preventDefault(), t.stopPropagation();
            },
            dragover: function(t) {
                t.preventDefault(), t.stopPropagation(), this.$el.addClass(this.clsDragover);
            },
            dragleave: function(t) {
                t.preventDefault(), t.stopPropagation(), this.$el.removeClass(this.clsDragover);
            }
        },
        methods: {
            upload: function t(r) {
                var a = this;
                if (r.length) {
                    this.$el.trigger("upload", [ r ]);
                    for (var l = 0; l < r.length; l++) {
                        if (a.allow && !e(a.allow, r[l].name)) return void a.fail(a.msgInvalidName.replace(/%s/, a.allow));
                        if (a.mime && !e(a.mime, r[l].type)) return void a.fail(a.msgInvalidMime.replace(/%s/, a.mime));
                    }
                    this.multiple || (r = [ r[0] ]), this.beforeAll && this.beforeAll(this, r);
                    var h = i(r, this.concurrent), t = function(e) {
                        var i = new FormData();
                        e.forEach(function(t) {
                            return i.append(a.name, t);
                        });
                        for (var r in a.params) i.append(r, a.params[r]);
                        o({
                            data: i,
                            url: a.url,
                            type: a.type,
                            dataType: a.dataType,
                            beforeSend: a.beforeSend,
                            complete: [ a.complete, function(e, i) {
                                h.length ? t(h.shift()) : a.completeAll && a.completeAll(e), "abort" === i && a.abort && a.abort(e);
                            } ],
                            cache: !1,
                            contentType: !1,
                            processData: !1,
                            xhr: function() {
                                var t = n.ajaxSettings.xhr();
                                return t.upload && a.progress && s(t.upload, "progress", a.progress), [ "loadStart", "load", "loadEnd", "error", "abort" ].forEach(function(e) {
                                    return a[e] && s(t, e.toLowerCase(), a[e]);
                                }), t;
                            }
                        });
                    };
                    t(h.shift());
                }
            }
        }
    });
});

/**
 * Swiper 3.2.7
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2015, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: December 7, 2015
 */
!function() {
    "use strict";
    function e(e) {
        e.fn.swiper = function(a) {
            var r;
            return e(this).each(function() {
                var e = new t(this, a);
                r || (r = e);
            }), r;
        };
    }
    var a, t = function(e, s) {
        function i() {
            return "horizontal" === T.params.direction;
        }
        function n(e) {
            return Math.floor(e);
        }
        function o() {
            T.autoplayTimeoutId = setTimeout(function() {
                T.params.loop ? (T.fixLoop(), T._slideNext()) : T.isEnd ? s.autoplayStopOnLast ? T.stopAutoplay() : T._slideTo(0) : T._slideNext();
            }, T.params.autoplay);
        }
        function l(e, t) {
            var r = a(e.target);
            if (!r.is(t)) if ("string" == typeof t) r = r.parents(t); else if (t.nodeType) {
                var s;
                return r.parents().each(function(e, a) {
                    a === t && (s = t);
                }), s ? t : void 0;
            }
            if (0 !== r.length) return r[0];
        }
        function d(e, a) {
            a = a || {};
            var t = window.MutationObserver || window.WebkitMutationObserver, r = new t(function(e) {
                e.forEach(function(e) {
                    T.onResize(!0), T.emit("onObserverUpdate", T, e);
                });
            });
            r.observe(e, {
                attributes: "undefined" == typeof a.attributes ? !0 : a.attributes,
                childList: "undefined" == typeof a.childList ? !0 : a.childList,
                characterData: "undefined" == typeof a.characterData ? !0 : a.characterData
            }), T.observers.push(r);
        }
        function p(e) {
            e.originalEvent && (e = e.originalEvent);
            var a = e.keyCode || e.charCode;
            if (!T.params.allowSwipeToNext && (i() && 39 === a || !i() && 40 === a)) return !1;
            if (!T.params.allowSwipeToPrev && (i() && 37 === a || !i() && 38 === a)) return !1;
            if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                if (37 === a || 39 === a || 38 === a || 40 === a) {
                    var t = !1;
                    if (T.container.parents(".swiper-slide").length > 0 && 0 === T.container.parents(".swiper-slide-active").length) return;
                    var r = {
                        left: window.pageXOffset,
                        top: window.pageYOffset
                    }, s = window.innerWidth, n = window.innerHeight, o = T.container.offset();
                    T.rtl && (o.left = o.left - T.container[0].scrollLeft);
                    for (var l = [ [ o.left, o.top ], [ o.left + T.width, o.top ], [ o.left, o.top + T.height ], [ o.left + T.width, o.top + T.height ] ], d = 0; d < l.length; d++) {
                        var p = l[d];
                        p[0] >= r.left && p[0] <= r.left + s && p[1] >= r.top && p[1] <= r.top + n && (t = !0);
                    }
                    if (!t) return;
                }
                i() ? ((37 === a || 39 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 
                (39 === a && !T.rtl || 37 === a && T.rtl) && T.slideNext(), (37 === a && !T.rtl || 39 === a && T.rtl) && T.slidePrev()) : ((38 === a || 40 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 
                40 === a && T.slideNext(), 38 === a && T.slidePrev());
            }
        }
        function u(e) {
            e.originalEvent && (e = e.originalEvent);
            var a = T.mousewheel.event, t = 0, r = T.rtl ? -1 : 1;
            if (e.detail) t = -e.detail; else if ("mousewheel" === a) if (T.params.mousewheelForceToAxis) if (i()) {
                if (!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY))) return;
                t = e.wheelDeltaX * r;
            } else {
                if (!(Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX))) return;
                t = e.wheelDeltaY;
            } else t = Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY) ? -e.wheelDeltaX * r : -e.wheelDeltaY; else if ("DOMMouseScroll" === a) t = -e.detail; else if ("wheel" === a) if (T.params.mousewheelForceToAxis) if (i()) {
                if (!(Math.abs(e.deltaX) > Math.abs(e.deltaY))) return;
                t = -e.deltaX * r;
            } else {
                if (!(Math.abs(e.deltaY) > Math.abs(e.deltaX))) return;
                t = -e.deltaY;
            } else t = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX * r : -e.deltaY;
            if (0 !== t) {
                if (T.params.mousewheelInvert && (t = -t), T.params.freeMode) {
                    var s = T.getWrapperTranslate() + t * T.params.mousewheelSensitivity, n = T.isBeginning, o = T.isEnd;
                    if (s >= T.minTranslate() && (s = T.minTranslate()), s <= T.maxTranslate() && (s = T.maxTranslate()), 
                    T.setWrapperTransition(0), T.setWrapperTranslate(s), T.updateProgress(), T.updateActiveIndex(), 
                    (!n && T.isBeginning || !o && T.isEnd) && T.updateClasses(), T.params.freeModeSticky && (clearTimeout(T.mousewheel.timeout), 
                    T.mousewheel.timeout = setTimeout(function() {
                        T.slideReset();
                    }, 300)), 0 === s || s === T.maxTranslate()) return;
                } else {
                    if (new window.Date().getTime() - T.mousewheel.lastScrollTime > 60) if (0 > t) if (T.isEnd && !T.params.loop || T.animating) {
                        if (T.params.mousewheelReleaseOnEdges) return !0;
                    } else T.slideNext(); else if (T.isBeginning && !T.params.loop || T.animating) {
                        if (T.params.mousewheelReleaseOnEdges) return !0;
                    } else T.slidePrev();
                    T.mousewheel.lastScrollTime = new window.Date().getTime();
                }
                return T.params.autoplay && T.stopAutoplay(), e.preventDefault ? e.preventDefault() : e.returnValue = !1, 
                !1;
            }
        }
        function c(e, t) {
            e = a(e);
            var r, s, n, o = T.rtl ? -1 : 1;
            r = e.attr("data-swiper-parallax") || "0", s = e.attr("data-swiper-parallax-x"), 
            n = e.attr("data-swiper-parallax-y"), s || n ? (s = s || "0", n = n || "0") : i() ? (s = r, 
            n = "0") : (n = r, s = "0"), s = s.indexOf("%") >= 0 ? parseInt(s, 10) * t * o + "%" : s * t * o + "px", 
            n = n.indexOf("%") >= 0 ? parseInt(n, 10) * t + "%" : n * t + "px", e.transform("translate3d(" + s + ", " + n + ",0px)");
        }
        function m(e) {
            return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), 
            e;
        }
        if (!(this instanceof t)) return new t(e, s);
        var f = {
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            autoplay: !1,
            autoplayDisableOnInteraction: !0,
            iOSEdgeSwipeDetection: !1,
            iOSEdgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: !0
            },
            cube: {
                slideShadows: !0,
                shadow: !0,
                shadowOffset: 20,
                shadowScale: .94
            },
            fade: {
                crossFade: !1
            },
            parallax: !1,
            scrollbar: null,
            scrollbarHide: !0,
            scrollbarDraggable: !1,
            scrollbarSnapOnRelease: !1,
            keyboardControl: !1,
            mousewheelControl: !1,
            mousewheelReleaseOnEdges: !1,
            mousewheelInvert: !1,
            mousewheelForceToAxis: !1,
            mousewheelSensitivity: 1,
            hashnav: !1,
            breakpoints: void 0,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            centeredSlides: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            onlyExternal: !1,
            threshold: 0,
            touchMoveStopPropagation: !0,
            pagination: null,
            paginationElement: "span",
            paginationClickable: !1,
            paginationHide: !1,
            paginationBulletRender: null,
            resistance: !0,
            resistanceRatio: .85,
            nextButton: null,
            prevButton: null,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            lazyLoading: !1,
            lazyLoadingInPrevNext: !1,
            lazyLoadingOnTransitionStart: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            control: void 0,
            controlInverse: !1,
            controlBy: "slide",
            allowSwipeToPrev: !0,
            allowSwipeToNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            slideClass: "swiper-slide",
            slideActiveClass: "swiper-slide-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slidePrevClass: "swiper-slide-prev",
            wrapperClass: "swiper-wrapper",
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
            buttonDisabledClass: "swiper-button-disabled",
            paginationHiddenClass: "swiper-pagination-hidden",
            observer: !1,
            observeParents: !1,
            a11y: !1,
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}",
            runCallbacksOnInit: !0
        }, h = s && s.virtualTranslate;
        s = s || {};
        var g = {};
        for (var v in s) if ("object" != typeof s[v] || (s[v].nodeType || s[v] === window || s[v] === document || "undefined" != typeof r && s[v] instanceof r || "undefined" != typeof jQuery && s[v] instanceof jQuery)) g[v] = s[v]; else {
            g[v] = {};
            for (var w in s[v]) g[v][w] = s[v][w];
        }
        for (var y in f) if ("undefined" == typeof s[y]) s[y] = f[y]; else if ("object" == typeof s[y]) for (var b in f[y]) "undefined" == typeof s[y][b] && (s[y][b] = f[y][b]);
        var T = this;
        if (T.params = s, T.originalParams = g, T.classNames = [], "undefined" != typeof a && "undefined" != typeof r && (a = r), 
        ("undefined" != typeof a || (a = "undefined" == typeof r ? window.Dom7 || window.Zepto || window.jQuery : r)) && (T.$ = a, 
        T.currentBreakpoint = void 0, T.getActiveBreakpoint = function() {
            if (!T.params.breakpoints) return !1;
            var e, a = !1, t = [];
            for (e in T.params.breakpoints) T.params.breakpoints.hasOwnProperty(e) && t.push(e);
            t.sort(function(e, a) {
                return parseInt(e, 10) > parseInt(a, 10);
            });
            for (var r = 0; r < t.length; r++) e = t[r], e >= window.innerWidth && !a && (a = e);
            return a || "max";
        }, T.setBreakpoint = function() {
            var e = T.getActiveBreakpoint();
            if (e && T.currentBreakpoint !== e) {
                var a = e in T.params.breakpoints ? T.params.breakpoints[e] : T.originalParams;
                for (var t in a) T.params[t] = a[t];
                T.currentBreakpoint = e;
            }
        }, T.params.breakpoints && T.setBreakpoint(), T.container = a(e), 0 !== T.container.length)) {
            if (T.container.length > 1) return void T.container.each(function() {
                new t(this, s);
            });
            T.container[0].swiper = T, T.container.data("swiper", T), T.classNames.push("swiper-container-" + T.params.direction), 
            T.params.freeMode && T.classNames.push("swiper-container-free-mode"), T.support.flexbox || (T.classNames.push("swiper-container-no-flexbox"), 
            T.params.slidesPerColumn = 1), T.params.autoHeight && T.classNames.push("swiper-container-autoheight"), 
            (T.params.parallax || T.params.watchSlidesVisibility) && (T.params.watchSlidesProgress = !0), 
            [ "cube", "coverflow" ].indexOf(T.params.effect) >= 0 && (T.support.transforms3d ? (T.params.watchSlidesProgress = !0, 
            T.classNames.push("swiper-container-3d")) : T.params.effect = "slide"), "slide" !== T.params.effect && T.classNames.push("swiper-container-" + T.params.effect), 
            "cube" === T.params.effect && (T.params.resistanceRatio = 0, T.params.slidesPerView = 1, 
            T.params.slidesPerColumn = 1, T.params.slidesPerGroup = 1, T.params.centeredSlides = !1, 
            T.params.spaceBetween = 0, T.params.virtualTranslate = !0, T.params.setWrapperSize = !1), 
            "fade" === T.params.effect && (T.params.slidesPerView = 1, T.params.slidesPerColumn = 1, 
            T.params.slidesPerGroup = 1, T.params.watchSlidesProgress = !0, T.params.spaceBetween = 0, 
            "undefined" == typeof h && (T.params.virtualTranslate = !0)), T.params.grabCursor && T.support.touch && (T.params.grabCursor = !1), 
            T.wrapper = T.container.children("." + T.params.wrapperClass), T.params.pagination && (T.paginationContainer = a(T.params.pagination), 
            T.params.paginationClickable && T.paginationContainer.addClass("swiper-pagination-clickable")), 
            T.rtl = i() && ("rtl" === T.container[0].dir.toLowerCase() || "rtl" === T.container.css("direction")), 
            T.rtl && T.classNames.push("swiper-container-rtl"), T.rtl && (T.wrongRTL = "-webkit-box" === T.wrapper.css("display")), 
            T.params.slidesPerColumn > 1 && T.classNames.push("swiper-container-multirow"), 
            T.device.android && T.classNames.push("swiper-container-android"), T.container.addClass(T.classNames.join(" ")), 
            T.translate = 0, T.progress = 0, T.velocity = 0, T.lockSwipeToNext = function() {
                T.params.allowSwipeToNext = !1;
            }, T.lockSwipeToPrev = function() {
                T.params.allowSwipeToPrev = !1;
            }, T.lockSwipes = function() {
                T.params.allowSwipeToNext = T.params.allowSwipeToPrev = !1;
            }, T.unlockSwipeToNext = function() {
                T.params.allowSwipeToNext = !0;
            }, T.unlockSwipeToPrev = function() {
                T.params.allowSwipeToPrev = !0;
            }, T.unlockSwipes = function() {
                T.params.allowSwipeToNext = T.params.allowSwipeToPrev = !0;
            }, T.params.grabCursor && (T.container[0].style.cursor = "move", T.container[0].style.cursor = "-webkit-grab", 
            T.container[0].style.cursor = "-moz-grab", T.container[0].style.cursor = "grab"), 
            T.imagesToLoad = [], T.imagesLoaded = 0, T.loadImage = function(e, a, t, r, s) {
                function i() {
                    s && s();
                }
                var n;
                e.complete && r ? i() : a ? (n = new window.Image(), n.onload = i, n.onerror = i, 
                t && (n.srcset = t), a && (n.src = a)) : i();
            }, T.preloadImages = function() {
                function e() {
                    "undefined" != typeof T && null !== T && (void 0 !== T.imagesLoaded && T.imagesLoaded++, 
                    T.imagesLoaded === T.imagesToLoad.length && (T.params.updateOnImagesReady && T.update(), 
                    T.emit("onImagesReady", T)));
                }
                T.imagesToLoad = T.container.find("img");
                for (var a = 0; a < T.imagesToLoad.length; a++) T.loadImage(T.imagesToLoad[a], T.imagesToLoad[a].currentSrc || T.imagesToLoad[a].getAttribute("src"), T.imagesToLoad[a].srcset || T.imagesToLoad[a].getAttribute("srcset"), !0, e);
            }, T.autoplayTimeoutId = void 0, T.autoplaying = !1, T.autoplayPaused = !1, T.startAutoplay = function() {
                return "undefined" != typeof T.autoplayTimeoutId ? !1 : T.params.autoplay ? T.autoplaying ? !1 : (T.autoplaying = !0, 
                T.emit("onAutoplayStart", T), void o()) : !1;
            }, T.stopAutoplay = function(e) {
                T.autoplayTimeoutId && (T.autoplayTimeoutId && clearTimeout(T.autoplayTimeoutId), 
                T.autoplaying = !1, T.autoplayTimeoutId = void 0, T.emit("onAutoplayStop", T));
            }, T.pauseAutoplay = function(e) {
                T.autoplayPaused || (T.autoplayTimeoutId && clearTimeout(T.autoplayTimeoutId), T.autoplayPaused = !0, 
                0 === e ? (T.autoplayPaused = !1, o()) : T.wrapper.transitionEnd(function() {
                    T && (T.autoplayPaused = !1, T.autoplaying ? o() : T.stopAutoplay());
                }));
            }, T.minTranslate = function() {
                return -T.snapGrid[0];
            }, T.maxTranslate = function() {
                return -T.snapGrid[T.snapGrid.length - 1];
            }, T.updateAutoHeight = function() {
                var e = T.slides.eq(T.activeIndex)[0].offsetHeight;
                e && T.wrapper.css("height", T.slides.eq(T.activeIndex)[0].offsetHeight + "px");
            }, T.updateContainerSize = function() {
                var e, a;
                e = "undefined" != typeof T.params.width ? T.params.width : T.container[0].clientWidth, 
                a = "undefined" != typeof T.params.height ? T.params.height : T.container[0].clientHeight, 
                0 === e && i() || 0 === a && !i() || (e = e - parseInt(T.container.css("padding-left"), 10) - parseInt(T.container.css("padding-right"), 10), 
                a = a - parseInt(T.container.css("padding-top"), 10) - parseInt(T.container.css("padding-bottom"), 10), 
                T.width = e, T.height = a, T.size = i() ? T.width : T.height);
            }, T.updateSlidesSize = function() {
                T.slides = T.wrapper.children("." + T.params.slideClass), T.snapGrid = [], T.slidesGrid = [], 
                T.slidesSizesGrid = [];
                var e, a = T.params.spaceBetween, t = -T.params.slidesOffsetBefore, r = 0, s = 0;
                "string" == typeof a && a.indexOf("%") >= 0 && (a = parseFloat(a.replace("%", "")) / 100 * T.size), 
                T.virtualSize = -a, T.rtl ? T.slides.css({
                    marginLeft: "",
                    marginTop: ""
                }) : T.slides.css({
                    marginRight: "",
                    marginBottom: ""
                });
                var o;
                T.params.slidesPerColumn > 1 && (o = Math.floor(T.slides.length / T.params.slidesPerColumn) === T.slides.length / T.params.slidesPerColumn ? T.slides.length : Math.ceil(T.slides.length / T.params.slidesPerColumn) * T.params.slidesPerColumn, 
                "auto" !== T.params.slidesPerView && "row" === T.params.slidesPerColumnFill && (o = Math.max(o, T.params.slidesPerView * T.params.slidesPerColumn)));
                var l, d = T.params.slidesPerColumn, p = o / d, u = p - (T.params.slidesPerColumn * p - T.slides.length);
                for (e = 0; e < T.slides.length; e++) {
                    l = 0;
                    var c = T.slides.eq(e);
                    if (T.params.slidesPerColumn > 1) {
                        var m, f, h;
                        "column" === T.params.slidesPerColumnFill ? (f = Math.floor(e / d), h = e - f * d, 
                        (f > u || f === u && h === d - 1) && ++h >= d && (h = 0, f++), m = f + h * o / d, 
                        c.css({
                            "-webkit-box-ordinal-group": m,
                            "-moz-box-ordinal-group": m,
                            "-ms-flex-order": m,
                            "-webkit-order": m,
                            order: m
                        })) : (h = Math.floor(e / p), f = e - h * p), c.css({
                            "margin-top": 0 !== h && T.params.spaceBetween && T.params.spaceBetween + "px"
                        }).attr("data-swiper-column", f).attr("data-swiper-row", h);
                    }
                    "none" !== c.css("display") && ("auto" === T.params.slidesPerView ? (l = i() ? c.outerWidth(!0) : c.outerHeight(!0), 
                    T.params.roundLengths && (l = n(l))) : (l = (T.size - (T.params.slidesPerView - 1) * a) / T.params.slidesPerView, 
                    T.params.roundLengths && (l = n(l)), i() ? T.slides[e].style.width = l + "px" : T.slides[e].style.height = l + "px"), 
                    T.slides[e].swiperSlideSize = l, T.slidesSizesGrid.push(l), T.params.centeredSlides ? (t = t + l / 2 + r / 2 + a, 
                    0 === e && (t = t - T.size / 2 - a), Math.abs(t) < .001 && (t = 0), s % T.params.slidesPerGroup === 0 && T.snapGrid.push(t), 
                    T.slidesGrid.push(t)) : (s % T.params.slidesPerGroup === 0 && T.snapGrid.push(t), 
                    T.slidesGrid.push(t), t = t + l + a), T.virtualSize += l + a, r = l, s++);
                }
                T.virtualSize = Math.max(T.virtualSize, T.size) + T.params.slidesOffsetAfter;
                var g;
                if (T.rtl && T.wrongRTL && ("slide" === T.params.effect || "coverflow" === T.params.effect) && T.wrapper.css({
                    width: T.virtualSize + T.params.spaceBetween + "px"
                }), (!T.support.flexbox || T.params.setWrapperSize) && (i() ? T.wrapper.css({
                    width: T.virtualSize + T.params.spaceBetween + "px"
                }) : T.wrapper.css({
                    height: T.virtualSize + T.params.spaceBetween + "px"
                })), T.params.slidesPerColumn > 1 && (T.virtualSize = (l + T.params.spaceBetween) * o, 
                T.virtualSize = Math.ceil(T.virtualSize / T.params.slidesPerColumn) - T.params.spaceBetween, 
                T.wrapper.css({
                    width: T.virtualSize + T.params.spaceBetween + "px"
                }), T.params.centeredSlides)) {
                    for (g = [], e = 0; e < T.snapGrid.length; e++) T.snapGrid[e] < T.virtualSize + T.snapGrid[0] && g.push(T.snapGrid[e]);
                    T.snapGrid = g;
                }
                if (!T.params.centeredSlides) {
                    for (g = [], e = 0; e < T.snapGrid.length; e++) T.snapGrid[e] <= T.virtualSize - T.size && g.push(T.snapGrid[e]);
                    T.snapGrid = g, Math.floor(T.virtualSize - T.size) > Math.floor(T.snapGrid[T.snapGrid.length - 1]) && T.snapGrid.push(T.virtualSize - T.size);
                }
                0 === T.snapGrid.length && (T.snapGrid = [ 0 ]), 0 !== T.params.spaceBetween && (i() ? T.rtl ? T.slides.css({
                    marginLeft: a + "px"
                }) : T.slides.css({
                    marginRight: a + "px"
                }) : T.slides.css({
                    marginBottom: a + "px"
                })), T.params.watchSlidesProgress && T.updateSlidesOffset();
            }, T.updateSlidesOffset = function() {
                for (var e = 0; e < T.slides.length; e++) T.slides[e].swiperSlideOffset = i() ? T.slides[e].offsetLeft : T.slides[e].offsetTop;
            }, T.updateSlidesProgress = function(e) {
                if ("undefined" == typeof e && (e = T.translate || 0), 0 !== T.slides.length) {
                    "undefined" == typeof T.slides[0].swiperSlideOffset && T.updateSlidesOffset();
                    var a = -e;
                    T.rtl && (a = e), T.slides.removeClass(T.params.slideVisibleClass);
                    for (var t = 0; t < T.slides.length; t++) {
                        var r = T.slides[t], s = (a - r.swiperSlideOffset) / (r.swiperSlideSize + T.params.spaceBetween);
                        if (T.params.watchSlidesVisibility) {
                            var i = -(a - r.swiperSlideOffset), n = i + T.slidesSizesGrid[t], o = i >= 0 && i < T.size || n > 0 && n <= T.size || 0 >= i && n >= T.size;
                            o && T.slides.eq(t).addClass(T.params.slideVisibleClass);
                        }
                        r.progress = T.rtl ? -s : s;
                    }
                }
            }, T.updateProgress = function(e) {
                "undefined" == typeof e && (e = T.translate || 0);
                var a = T.maxTranslate() - T.minTranslate(), t = T.isBeginning, r = T.isEnd;
                0 === a ? (T.progress = 0, T.isBeginning = T.isEnd = !0) : (T.progress = (e - T.minTranslate()) / a, 
                T.isBeginning = T.progress <= 0, T.isEnd = T.progress >= 1), T.isBeginning && !t && T.emit("onReachBeginning", T), 
                T.isEnd && !r && T.emit("onReachEnd", T), T.params.watchSlidesProgress && T.updateSlidesProgress(e), 
                T.emit("onProgress", T, T.progress);
            }, T.updateActiveIndex = function() {
                var e, a, t, r = T.rtl ? T.translate : -T.translate;
                for (a = 0; a < T.slidesGrid.length; a++) "undefined" != typeof T.slidesGrid[a + 1] ? r >= T.slidesGrid[a] && r < T.slidesGrid[a + 1] - (T.slidesGrid[a + 1] - T.slidesGrid[a]) / 2 ? e = a : r >= T.slidesGrid[a] && r < T.slidesGrid[a + 1] && (e = a + 1) : r >= T.slidesGrid[a] && (e = a);
                (0 > e || "undefined" == typeof e) && (e = 0), t = Math.floor(e / T.params.slidesPerGroup), 
                t >= T.snapGrid.length && (t = T.snapGrid.length - 1), e !== T.activeIndex && (T.snapIndex = t, 
                T.previousIndex = T.activeIndex, T.activeIndex = e, T.updateClasses());
            }, T.updateClasses = function() {
                T.slides.removeClass(T.params.slideActiveClass + " " + T.params.slideNextClass + " " + T.params.slidePrevClass);
                var e = T.slides.eq(T.activeIndex);
                if (e.addClass(T.params.slideActiveClass), e.next("." + T.params.slideClass).addClass(T.params.slideNextClass), 
                e.prev("." + T.params.slideClass).addClass(T.params.slidePrevClass), T.bullets && T.bullets.length > 0) {
                    T.bullets.removeClass(T.params.bulletActiveClass);
                    var t;
                    T.params.loop ? (t = Math.ceil(T.activeIndex - T.loopedSlides) / T.params.slidesPerGroup, 
                    t > T.slides.length - 1 - 2 * T.loopedSlides && (t -= T.slides.length - 2 * T.loopedSlides), 
                    t > T.bullets.length - 1 && (t -= T.bullets.length)) : t = "undefined" != typeof T.snapIndex ? T.snapIndex : T.activeIndex || 0, 
                    T.paginationContainer.length > 1 ? T.bullets.each(function() {
                        a(this).index() === t && a(this).addClass(T.params.bulletActiveClass);
                    }) : T.bullets.eq(t).addClass(T.params.bulletActiveClass);
                }
                T.params.loop || (T.params.prevButton && (T.isBeginning ? (a(T.params.prevButton).addClass(T.params.buttonDisabledClass), 
                T.params.a11y && T.a11y && T.a11y.disable(a(T.params.prevButton))) : (a(T.params.prevButton).removeClass(T.params.buttonDisabledClass), 
                T.params.a11y && T.a11y && T.a11y.enable(a(T.params.prevButton)))), T.params.nextButton && (T.isEnd ? (a(T.params.nextButton).addClass(T.params.buttonDisabledClass), 
                T.params.a11y && T.a11y && T.a11y.disable(a(T.params.nextButton))) : (a(T.params.nextButton).removeClass(T.params.buttonDisabledClass), 
                T.params.a11y && T.a11y && T.a11y.enable(a(T.params.nextButton)))));
            }, T.updatePagination = function() {
                if (T.params.pagination && T.paginationContainer && T.paginationContainer.length > 0) {
                    for (var e = "", a = T.params.loop ? Math.ceil((T.slides.length - 2 * T.loopedSlides) / T.params.slidesPerGroup) : T.snapGrid.length, t = 0; a > t; t++) e += T.params.paginationBulletRender ? T.params.paginationBulletRender(t, T.params.bulletClass) : "<" + T.params.paginationElement + ' class="' + T.params.bulletClass + '"></' + T.params.paginationElement + ">";
                    T.paginationContainer.html(e), T.bullets = T.paginationContainer.find("." + T.params.bulletClass), 
                    T.params.paginationClickable && T.params.a11y && T.a11y && T.a11y.initPagination();
                }
            }, T.update = function(e) {
                function a() {
                    r = Math.min(Math.max(T.translate, T.maxTranslate()), T.minTranslate()), T.setWrapperTranslate(r), 
                    T.updateActiveIndex(), T.updateClasses();
                }
                if (T.updateContainerSize(), T.updateSlidesSize(), T.updateProgress(), T.updatePagination(), 
                T.updateClasses(), T.params.scrollbar && T.scrollbar && T.scrollbar.set(), e) {
                    var t, r;
                    T.controller && T.controller.spline && (T.controller.spline = void 0), T.params.freeMode ? (a(), 
                    T.params.autoHeight && T.updateAutoHeight()) : (t = ("auto" === T.params.slidesPerView || T.params.slidesPerView > 1) && T.isEnd && !T.params.centeredSlides ? T.slideTo(T.slides.length - 1, 0, !1, !0) : T.slideTo(T.activeIndex, 0, !1, !0), 
                    t || a());
                } else T.params.autoHeight && T.updateAutoHeight();
            }, T.onResize = function(e) {
                T.params.breakpoints && T.setBreakpoint();
                var a = T.params.allowSwipeToPrev, t = T.params.allowSwipeToNext;
                if (T.params.allowSwipeToPrev = T.params.allowSwipeToNext = !0, T.updateContainerSize(), 
                T.updateSlidesSize(), ("auto" === T.params.slidesPerView || T.params.freeMode || e) && T.updatePagination(), 
                T.params.scrollbar && T.scrollbar && T.scrollbar.set(), T.controller && T.controller.spline && (T.controller.spline = void 0), 
                T.params.freeMode) {
                    var r = Math.min(Math.max(T.translate, T.maxTranslate()), T.minTranslate());
                    T.setWrapperTranslate(r), T.updateActiveIndex(), T.updateClasses(), T.params.autoHeight && T.updateAutoHeight();
                } else T.updateClasses(), ("auto" === T.params.slidesPerView || T.params.slidesPerView > 1) && T.isEnd && !T.params.centeredSlides ? T.slideTo(T.slides.length - 1, 0, !1, !0) : T.slideTo(T.activeIndex, 0, !1, !0);
                T.params.allowSwipeToPrev = a, T.params.allowSwipeToNext = t;
            };
            var x = [ "mousedown", "mousemove", "mouseup" ];
            window.navigator.pointerEnabled ? x = [ "pointerdown", "pointermove", "pointerup" ] : window.navigator.msPointerEnabled && (x = [ "MSPointerDown", "MSPointerMove", "MSPointerUp" ]), 
            T.touchEvents = {
                start: T.support.touch || !T.params.simulateTouch ? "touchstart" : x[0],
                move: T.support.touch || !T.params.simulateTouch ? "touchmove" : x[1],
                end: T.support.touch || !T.params.simulateTouch ? "touchend" : x[2]
            }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === T.params.touchEventsTarget ? T.container : T.wrapper).addClass("swiper-wp8-" + T.params.direction), 
            T.initEvents = function(e) {
                var t = e ? "off" : "on", r = e ? "removeEventListener" : "addEventListener", i = "container" === T.params.touchEventsTarget ? T.container[0] : T.wrapper[0], n = T.support.touch ? i : document, o = T.params.nested ? !0 : !1;
                T.browser.ie ? (i[r](T.touchEvents.start, T.onTouchStart, !1), n[r](T.touchEvents.move, T.onTouchMove, o), 
                n[r](T.touchEvents.end, T.onTouchEnd, !1)) : (T.support.touch && (i[r](T.touchEvents.start, T.onTouchStart, !1), 
                i[r](T.touchEvents.move, T.onTouchMove, o), i[r](T.touchEvents.end, T.onTouchEnd, !1)), 
                !s.simulateTouch || T.device.ios || T.device.android || (i[r]("mousedown", T.onTouchStart, !1), 
                document[r]("mousemove", T.onTouchMove, o), document[r]("mouseup", T.onTouchEnd, !1))), 
                window[r]("resize", T.onResize), T.params.nextButton && (a(T.params.nextButton)[t]("click", T.onClickNext), 
                T.params.a11y && T.a11y && a(T.params.nextButton)[t]("keydown", T.a11y.onEnterKey)), 
                T.params.prevButton && (a(T.params.prevButton)[t]("click", T.onClickPrev), T.params.a11y && T.a11y && a(T.params.prevButton)[t]("keydown", T.a11y.onEnterKey)), 
                T.params.pagination && T.params.paginationClickable && (a(T.paginationContainer)[t]("click", "." + T.params.bulletClass, T.onClickIndex), 
                T.params.a11y && T.a11y && a(T.paginationContainer)[t]("keydown", "." + T.params.bulletClass, T.a11y.onEnterKey)), 
                (T.params.preventClicks || T.params.preventClicksPropagation) && i[r]("click", T.preventClicks, !0);
            }, T.attachEvents = function(e) {
                T.initEvents();
            }, T.detachEvents = function() {
                T.initEvents(!0);
            }, T.allowClick = !0, T.preventClicks = function(e) {
                T.allowClick || (T.params.preventClicks && e.preventDefault(), T.params.preventClicksPropagation && T.animating && (e.stopPropagation(), 
                e.stopImmediatePropagation()));
            }, T.onClickNext = function(e) {
                e.preventDefault(), (!T.isEnd || T.params.loop) && T.slideNext();
            }, T.onClickPrev = function(e) {
                e.preventDefault(), (!T.isBeginning || T.params.loop) && T.slidePrev();
            }, T.onClickIndex = function(e) {
                e.preventDefault();
                var t = a(this).index() * T.params.slidesPerGroup;
                T.params.loop && (t += T.loopedSlides), T.slideTo(t);
            }, T.updateClickedSlide = function(e) {
                var t = l(e, "." + T.params.slideClass), r = !1;
                if (t) for (var s = 0; s < T.slides.length; s++) T.slides[s] === t && (r = !0);
                if (!t || !r) return T.clickedSlide = void 0, void (T.clickedIndex = void 0);
                if (T.clickedSlide = t, T.clickedIndex = a(t).index(), T.params.slideToClickedSlide && void 0 !== T.clickedIndex && T.clickedIndex !== T.activeIndex) {
                    var i, n = T.clickedIndex;
                    if (T.params.loop) {
                        if (T.animating) return;
                        i = a(T.clickedSlide).attr("data-swiper-slide-index"), T.params.centeredSlides ? n < T.loopedSlides - T.params.slidesPerView / 2 || n > T.slides.length - T.loopedSlides + T.params.slidesPerView / 2 ? (T.fixLoop(), 
                        n = T.wrapper.children("." + T.params.slideClass + '[data-swiper-slide-index="' + i + '"]:not(.swiper-slide-duplicate)').eq(0).index(), 
                        setTimeout(function() {
                            T.slideTo(n);
                        }, 0)) : T.slideTo(n) : n > T.slides.length - T.params.slidesPerView ? (T.fixLoop(), 
                        n = T.wrapper.children("." + T.params.slideClass + '[data-swiper-slide-index="' + i + '"]:not(.swiper-slide-duplicate)').eq(0).index(), 
                        setTimeout(function() {
                            T.slideTo(n);
                        }, 0)) : T.slideTo(n);
                    } else T.slideTo(n);
                }
            };
            var S, C, M, E, P, k, z, I, L, D, B = "input, select, textarea, button", G = Date.now(), A = [];
            T.animating = !1, T.touches = {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0
            };
            var O, N;
            if (T.onTouchStart = function(e) {
                if (e.originalEvent && (e = e.originalEvent), O = "touchstart" === e.type, O || !("which" in e) || 3 !== e.which) {
                    if (T.params.noSwiping && l(e, "." + T.params.noSwipingClass)) return void (T.allowClick = !0);
                    if (!T.params.swipeHandler || l(e, T.params.swipeHandler)) {
                        var t = T.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, r = T.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
                        if (!(T.device.ios && T.params.iOSEdgeSwipeDetection && t <= T.params.iOSEdgeSwipeThreshold)) {
                            if (S = !0, C = !1, M = !0, P = void 0, N = void 0, T.touches.startX = t, T.touches.startY = r, 
                            E = Date.now(), T.allowClick = !0, T.updateContainerSize(), T.swipeDirection = void 0, 
                            T.params.threshold > 0 && (I = !1), "touchstart" !== e.type) {
                                var s = !0;
                                a(e.target).is(B) && (s = !1), document.activeElement && a(document.activeElement).is(B) && document.activeElement.blur(), 
                                s && e.preventDefault();
                            }
                            T.emit("onTouchStart", T, e);
                        }
                    }
                }
            }, T.onTouchMove = function(e) {
                if (e.originalEvent && (e = e.originalEvent), !(O && "mousemove" === e.type || e.preventedByNestedSwiper)) {
                    if (T.params.onlyExternal) return T.allowClick = !1, void (S && (T.touches.startX = T.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, 
                    T.touches.startY = T.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, 
                    E = Date.now()));
                    if (O && document.activeElement && e.target === document.activeElement && a(e.target).is(B)) return C = !0, 
                    void (T.allowClick = !1);
                    if (M && T.emit("onTouchMove", T, e), !(e.targetTouches && e.targetTouches.length > 1)) {
                        if (T.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, 
                        T.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, 
                        "undefined" == typeof P) {
                            var t = 180 * Math.atan2(Math.abs(T.touches.currentY - T.touches.startY), Math.abs(T.touches.currentX - T.touches.startX)) / Math.PI;
                            P = i() ? t > T.params.touchAngle : 90 - t > T.params.touchAngle;
                        }
                        if (P && T.emit("onTouchMoveOpposite", T, e), "undefined" == typeof N && T.browser.ieTouch && (T.touches.currentX !== T.touches.startX || T.touches.currentY !== T.touches.startY) && (N = !0), 
                        S) {
                            if (P) return void (S = !1);
                            if (N || !T.browser.ieTouch) {
                                T.allowClick = !1, T.emit("onSliderMove", T, e), e.preventDefault(), T.params.touchMoveStopPropagation && !T.params.nested && e.stopPropagation(), 
                                C || (s.loop && T.fixLoop(), z = T.getWrapperTranslate(), T.setWrapperTransition(0), 
                                T.animating && T.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), 
                                T.params.autoplay && T.autoplaying && (T.params.autoplayDisableOnInteraction ? T.stopAutoplay() : T.pauseAutoplay()), 
                                D = !1, T.params.grabCursor && (T.container[0].style.cursor = "move", T.container[0].style.cursor = "-webkit-grabbing", 
                                T.container[0].style.cursor = "-moz-grabbin", T.container[0].style.cursor = "grabbing")), 
                                C = !0;
                                var r = T.touches.diff = i() ? T.touches.currentX - T.touches.startX : T.touches.currentY - T.touches.startY;
                                r *= T.params.touchRatio, T.rtl && (r = -r), T.swipeDirection = r > 0 ? "prev" : "next", 
                                k = r + z;
                                var n = !0;
                                if (r > 0 && k > T.minTranslate() ? (n = !1, T.params.resistance && (k = T.minTranslate() - 1 + Math.pow(-T.minTranslate() + z + r, T.params.resistanceRatio))) : 0 > r && k < T.maxTranslate() && (n = !1, 
                                T.params.resistance && (k = T.maxTranslate() + 1 - Math.pow(T.maxTranslate() - z - r, T.params.resistanceRatio))), 
                                n && (e.preventedByNestedSwiper = !0), !T.params.allowSwipeToNext && "next" === T.swipeDirection && z > k && (k = z), 
                                !T.params.allowSwipeToPrev && "prev" === T.swipeDirection && k > z && (k = z), T.params.followFinger) {
                                    if (T.params.threshold > 0) {
                                        if (!(Math.abs(r) > T.params.threshold || I)) return void (k = z);
                                        if (!I) return I = !0, T.touches.startX = T.touches.currentX, T.touches.startY = T.touches.currentY, 
                                        k = z, void (T.touches.diff = i() ? T.touches.currentX - T.touches.startX : T.touches.currentY - T.touches.startY);
                                    }
                                    (T.params.freeMode || T.params.watchSlidesProgress) && T.updateActiveIndex(), T.params.freeMode && (0 === A.length && A.push({
                                        position: T.touches[i() ? "startX" : "startY"],
                                        time: E
                                    }), A.push({
                                        position: T.touches[i() ? "currentX" : "currentY"],
                                        time: new window.Date().getTime()
                                    })), T.updateProgress(k), T.setWrapperTranslate(k);
                                }
                            }
                        }
                    }
                }
            }, T.onTouchEnd = function(e) {
                if (e.originalEvent && (e = e.originalEvent), M && T.emit("onTouchEnd", T, e), M = !1, 
                S) {
                    T.params.grabCursor && C && S && (T.container[0].style.cursor = "move", T.container[0].style.cursor = "-webkit-grab", 
                    T.container[0].style.cursor = "-moz-grab", T.container[0].style.cursor = "grab");
                    var t = Date.now(), r = t - E;
                    if (T.allowClick && (T.updateClickedSlide(e), T.emit("onTap", T, e), 300 > r && t - G > 300 && (L && clearTimeout(L), 
                    L = setTimeout(function() {
                        T && (T.params.paginationHide && T.paginationContainer.length > 0 && !a(e.target).hasClass(T.params.bulletClass) && T.paginationContainer.toggleClass(T.params.paginationHiddenClass), 
                        T.emit("onClick", T, e));
                    }, 300)), 300 > r && 300 > t - G && (L && clearTimeout(L), T.emit("onDoubleTap", T, e))), 
                    G = Date.now(), setTimeout(function() {
                        T && (T.allowClick = !0);
                    }, 0), !S || !C || !T.swipeDirection || 0 === T.touches.diff || k === z) return void (S = C = !1);
                    S = C = !1;
                    var s;
                    if (s = T.params.followFinger ? T.rtl ? T.translate : -T.translate : -k, T.params.freeMode) {
                        if (s < -T.minTranslate()) return void T.slideTo(T.activeIndex);
                        if (s > -T.maxTranslate()) return void (T.slides.length < T.snapGrid.length ? T.slideTo(T.snapGrid.length - 1) : T.slideTo(T.slides.length - 1));
                        if (T.params.freeModeMomentum) {
                            if (A.length > 1) {
                                var i = A.pop(), n = A.pop(), o = i.position - n.position, l = i.time - n.time;
                                T.velocity = o / l, T.velocity = T.velocity / 2, Math.abs(T.velocity) < T.params.freeModeMinimumVelocity && (T.velocity = 0), 
                                (l > 150 || new window.Date().getTime() - i.time > 300) && (T.velocity = 0);
                            } else T.velocity = 0;
                            A.length = 0;
                            var d = 1e3 * T.params.freeModeMomentumRatio, p = T.velocity * d, u = T.translate + p;
                            T.rtl && (u = -u);
                            var c, m = !1, f = 20 * Math.abs(T.velocity) * T.params.freeModeMomentumBounceRatio;
                            if (u < T.maxTranslate()) T.params.freeModeMomentumBounce ? (u + T.maxTranslate() < -f && (u = T.maxTranslate() - f), 
                            c = T.maxTranslate(), m = !0, D = !0) : u = T.maxTranslate(); else if (u > T.minTranslate()) T.params.freeModeMomentumBounce ? (u - T.minTranslate() > f && (u = T.minTranslate() + f), 
                            c = T.minTranslate(), m = !0, D = !0) : u = T.minTranslate(); else if (T.params.freeModeSticky) {
                                var h, g = 0;
                                for (g = 0; g < T.snapGrid.length; g += 1) if (T.snapGrid[g] > -u) {
                                    h = g;
                                    break;
                                }
                                u = Math.abs(T.snapGrid[h] - u) < Math.abs(T.snapGrid[h - 1] - u) || "next" === T.swipeDirection ? T.snapGrid[h] : T.snapGrid[h - 1], 
                                T.rtl || (u = -u);
                            }
                            if (0 !== T.velocity) d = T.rtl ? Math.abs((-u - T.translate) / T.velocity) : Math.abs((u - T.translate) / T.velocity); else if (T.params.freeModeSticky) return void T.slideReset();
                            T.params.freeModeMomentumBounce && m ? (T.updateProgress(c), T.setWrapperTransition(d), 
                            T.setWrapperTranslate(u), T.onTransitionStart(), T.animating = !0, T.wrapper.transitionEnd(function() {
                                T && D && (T.emit("onMomentumBounce", T), T.setWrapperTransition(T.params.speed), 
                                T.setWrapperTranslate(c), T.wrapper.transitionEnd(function() {
                                    T && T.onTransitionEnd();
                                }));
                            })) : T.velocity ? (T.updateProgress(u), T.setWrapperTransition(d), T.setWrapperTranslate(u), 
                            T.onTransitionStart(), T.animating || (T.animating = !0, T.wrapper.transitionEnd(function() {
                                T && T.onTransitionEnd();
                            }))) : T.updateProgress(u), T.updateActiveIndex();
                        }
                        return void ((!T.params.freeModeMomentum || r >= T.params.longSwipesMs) && (T.updateProgress(), 
                        T.updateActiveIndex()));
                    }
                    var v, w = 0, y = T.slidesSizesGrid[0];
                    for (v = 0; v < T.slidesGrid.length; v += T.params.slidesPerGroup) "undefined" != typeof T.slidesGrid[v + T.params.slidesPerGroup] ? s >= T.slidesGrid[v] && s < T.slidesGrid[v + T.params.slidesPerGroup] && (w = v, 
                    y = T.slidesGrid[v + T.params.slidesPerGroup] - T.slidesGrid[v]) : s >= T.slidesGrid[v] && (w = v, 
                    y = T.slidesGrid[T.slidesGrid.length - 1] - T.slidesGrid[T.slidesGrid.length - 2]);
                    var b = (s - T.slidesGrid[w]) / y;
                    if (r > T.params.longSwipesMs) {
                        if (!T.params.longSwipes) return void T.slideTo(T.activeIndex);
                        "next" === T.swipeDirection && (b >= T.params.longSwipesRatio ? T.slideTo(w + T.params.slidesPerGroup) : T.slideTo(w)), 
                        "prev" === T.swipeDirection && (b > 1 - T.params.longSwipesRatio ? T.slideTo(w + T.params.slidesPerGroup) : T.slideTo(w));
                    } else {
                        if (!T.params.shortSwipes) return void T.slideTo(T.activeIndex);
                        "next" === T.swipeDirection && T.slideTo(w + T.params.slidesPerGroup), "prev" === T.swipeDirection && T.slideTo(w);
                    }
                }
            }, T._slideTo = function(e, a) {
                return T.slideTo(e, a, !0, !0);
            }, T.slideTo = function(e, a, t, r) {
                "undefined" == typeof t && (t = !0), "undefined" == typeof e && (e = 0), 0 > e && (e = 0), 
                T.snapIndex = Math.floor(e / T.params.slidesPerGroup), T.snapIndex >= T.snapGrid.length && (T.snapIndex = T.snapGrid.length - 1);
                var s = -T.snapGrid[T.snapIndex];
                T.params.autoplay && T.autoplaying && (r || !T.params.autoplayDisableOnInteraction ? T.pauseAutoplay(a) : T.stopAutoplay()), 
                T.updateProgress(s);
                for (var i = 0; i < T.slidesGrid.length; i++) -Math.floor(100 * s) >= Math.floor(100 * T.slidesGrid[i]) && (e = i);
                return !T.params.allowSwipeToNext && s < T.translate && s < T.minTranslate() ? !1 : !T.params.allowSwipeToPrev && s > T.translate && s > T.maxTranslate() && (T.activeIndex || 0) !== e ? !1 : ("undefined" == typeof a && (a = T.params.speed), 
                T.previousIndex = T.activeIndex || 0, T.activeIndex = e, T.rtl && -s === T.translate || !T.rtl && s === T.translate ? (T.params.autoHeight && T.updateAutoHeight(), 
                T.updateClasses(), "slide" !== T.params.effect && T.setWrapperTranslate(s), !1) : (T.updateClasses(), 
                T.onTransitionStart(t), 0 === a ? (T.setWrapperTranslate(s), T.setWrapperTransition(0), 
                T.onTransitionEnd(t)) : (T.setWrapperTranslate(s), T.setWrapperTransition(a), T.animating || (T.animating = !0, 
                T.wrapper.transitionEnd(function() {
                    T && T.onTransitionEnd(t);
                }))), !0));
            }, T.onTransitionStart = function(e) {
                "undefined" == typeof e && (e = !0), T.params.autoHeight && T.updateAutoHeight(), 
                T.lazy && T.lazy.onTransitionStart(), e && (T.emit("onTransitionStart", T), T.activeIndex !== T.previousIndex && (T.emit("onSlideChangeStart", T), 
                T.activeIndex > T.previousIndex ? T.emit("onSlideNextStart", T) : T.emit("onSlidePrevStart", T)));
            }, T.onTransitionEnd = function(e) {
                T.animating = !1, T.setWrapperTransition(0), "undefined" == typeof e && (e = !0), 
                T.lazy && T.lazy.onTransitionEnd(), e && (T.emit("onTransitionEnd", T), T.activeIndex !== T.previousIndex && (T.emit("onSlideChangeEnd", T), 
                T.activeIndex > T.previousIndex ? T.emit("onSlideNextEnd", T) : T.emit("onSlidePrevEnd", T))), 
                T.params.hashnav && T.hashnav && T.hashnav.setHash();
            }, T.slideNext = function(e, a, t) {
                if (T.params.loop) {
                    if (T.animating) return !1;
                    T.fixLoop();
                    T.container[0].clientLeft;
                    return T.slideTo(T.activeIndex + T.params.slidesPerGroup, a, e, t);
                }
                return T.slideTo(T.activeIndex + T.params.slidesPerGroup, a, e, t);
            }, T._slideNext = function(e) {
                return T.slideNext(!0, e, !0);
            }, T.slidePrev = function(e, a, t) {
                if (T.params.loop) {
                    if (T.animating) return !1;
                    T.fixLoop();
                    T.container[0].clientLeft;
                    return T.slideTo(T.activeIndex - 1, a, e, t);
                }
                return T.slideTo(T.activeIndex - 1, a, e, t);
            }, T._slidePrev = function(e) {
                return T.slidePrev(!0, e, !0);
            }, T.slideReset = function(e, a, t) {
                return T.slideTo(T.activeIndex, a, e);
            }, T.setWrapperTransition = function(e, a) {
                T.wrapper.transition(e), "slide" !== T.params.effect && T.effects[T.params.effect] && T.effects[T.params.effect].setTransition(e), 
                T.params.parallax && T.parallax && T.parallax.setTransition(e), T.params.scrollbar && T.scrollbar && T.scrollbar.setTransition(e), 
                T.params.control && T.controller && T.controller.setTransition(e, a), T.emit("onSetTransition", T, e);
            }, T.setWrapperTranslate = function(e, a, t) {
                var r = 0, s = 0, o = 0;
                i() ? r = T.rtl ? -e : e : s = e, T.params.roundLengths && (r = n(r), s = n(s)), 
                T.params.virtualTranslate || (T.support.transforms3d ? T.wrapper.transform("translate3d(" + r + "px, " + s + "px, " + o + "px)") : T.wrapper.transform("translate(" + r + "px, " + s + "px)")), 
                T.translate = i() ? r : s;
                var l, d = T.maxTranslate() - T.minTranslate();
                l = 0 === d ? 0 : (e - T.minTranslate()) / d, l !== T.progress && T.updateProgress(e), 
                a && T.updateActiveIndex(), "slide" !== T.params.effect && T.effects[T.params.effect] && T.effects[T.params.effect].setTranslate(T.translate), 
                T.params.parallax && T.parallax && T.parallax.setTranslate(T.translate), T.params.scrollbar && T.scrollbar && T.scrollbar.setTranslate(T.translate), 
                T.params.control && T.controller && T.controller.setTranslate(T.translate, t), T.emit("onSetTranslate", T, T.translate);
            }, T.getTranslate = function(e, a) {
                var t, r, s, i;
                return "undefined" == typeof a && (a = "x"), T.params.virtualTranslate ? T.rtl ? -T.translate : T.translate : (s = window.getComputedStyle(e, null), 
                window.WebKitCSSMatrix ? (r = s.transform || s.webkitTransform, r.split(",").length > 6 && (r = r.split(", ").map(function(e) {
                    return e.replace(",", ".");
                }).join(", ")), i = new window.WebKitCSSMatrix("none" === r ? "" : r)) : (i = s.MozTransform || s.OTransform || s.MsTransform || s.msTransform || s.transform || s.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), 
                t = i.toString().split(",")), "x" === a && (r = window.WebKitCSSMatrix ? i.m41 : 16 === t.length ? parseFloat(t[12]) : parseFloat(t[4])), 
                "y" === a && (r = window.WebKitCSSMatrix ? i.m42 : 16 === t.length ? parseFloat(t[13]) : parseFloat(t[5])), 
                T.rtl && r && (r = -r), r || 0);
            }, T.getWrapperTranslate = function(e) {
                return "undefined" == typeof e && (e = i() ? "x" : "y"), T.getTranslate(T.wrapper[0], e);
            }, T.observers = [], T.initObservers = function() {
                if (T.params.observeParents) for (var e = T.container.parents(), a = 0; a < e.length; a++) d(e[a]);
                d(T.container[0], {
                    childList: !1
                }), d(T.wrapper[0], {
                    attributes: !1
                });
            }, T.disconnectObservers = function() {
                for (var e = 0; e < T.observers.length; e++) T.observers[e].disconnect();
                T.observers = [];
            }, T.createLoop = function() {
                T.wrapper.children("." + T.params.slideClass + "." + T.params.slideDuplicateClass).remove();
                var e = T.wrapper.children("." + T.params.slideClass);
                "auto" !== T.params.slidesPerView || T.params.loopedSlides || (T.params.loopedSlides = e.length), 
                T.loopedSlides = parseInt(T.params.loopedSlides || T.params.slidesPerView, 10), 
                T.loopedSlides = T.loopedSlides + T.params.loopAdditionalSlides, T.loopedSlides > e.length && (T.loopedSlides = e.length);
                var t, r = [], s = [];
                for (e.each(function(t, i) {
                    var n = a(this);
                    t < T.loopedSlides && s.push(i), t < e.length && t >= e.length - T.loopedSlides && r.push(i), 
                    n.attr("data-swiper-slide-index", t);
                }), t = 0; t < s.length; t++) T.wrapper.append(a(s[t].cloneNode(!0)).addClass(T.params.slideDuplicateClass));
                for (t = r.length - 1; t >= 0; t--) T.wrapper.prepend(a(r[t].cloneNode(!0)).addClass(T.params.slideDuplicateClass));
            }, T.destroyLoop = function() {
                T.wrapper.children("." + T.params.slideClass + "." + T.params.slideDuplicateClass).remove(), 
                T.slides.removeAttr("data-swiper-slide-index");
            }, T.fixLoop = function() {
                var e;
                T.activeIndex < T.loopedSlides ? (e = T.slides.length - 3 * T.loopedSlides + T.activeIndex, 
                e += T.loopedSlides, T.slideTo(e, 0, !1, !0)) : ("auto" === T.params.slidesPerView && T.activeIndex >= 2 * T.loopedSlides || T.activeIndex > T.slides.length - 2 * T.params.slidesPerView) && (e = -T.slides.length + T.activeIndex + T.loopedSlides, 
                e += T.loopedSlides, T.slideTo(e, 0, !1, !0));
            }, T.appendSlide = function(e) {
                if (T.params.loop && T.destroyLoop(), "object" == typeof e && e.length) for (var a = 0; a < e.length; a++) e[a] && T.wrapper.append(e[a]); else T.wrapper.append(e);
                T.params.loop && T.createLoop(), T.params.observer && T.support.observer || T.update(!0);
            }, T.prependSlide = function(e) {
                T.params.loop && T.destroyLoop();
                var a = T.activeIndex + 1;
                if ("object" == typeof e && e.length) {
                    for (var t = 0; t < e.length; t++) e[t] && T.wrapper.prepend(e[t]);
                    a = T.activeIndex + e.length;
                } else T.wrapper.prepend(e);
                T.params.loop && T.createLoop(), T.params.observer && T.support.observer || T.update(!0), 
                T.slideTo(a, 0, !1);
            }, T.removeSlide = function(e) {
                T.params.loop && (T.destroyLoop(), T.slides = T.wrapper.children("." + T.params.slideClass));
                var a, t = T.activeIndex;
                if ("object" == typeof e && e.length) {
                    for (var r = 0; r < e.length; r++) a = e[r], T.slides[a] && T.slides.eq(a).remove(), 
                    t > a && t--;
                    t = Math.max(t, 0);
                } else a = e, T.slides[a] && T.slides.eq(a).remove(), t > a && t--, t = Math.max(t, 0);
                T.params.loop && T.createLoop(), T.params.observer && T.support.observer || T.update(!0), 
                T.params.loop ? T.slideTo(t + T.loopedSlides, 0, !1) : T.slideTo(t, 0, !1);
            }, T.removeAllSlides = function() {
                for (var e = [], a = 0; a < T.slides.length; a++) e.push(a);
                T.removeSlide(e);
            }, T.effects = {
                fade: {
                    setTranslate: function() {
                        for (var e = 0; e < T.slides.length; e++) {
                            var a = T.slides.eq(e), t = a[0].swiperSlideOffset, r = -t;
                            T.params.virtualTranslate || (r -= T.translate);
                            var s = 0;
                            i() || (s = r, r = 0);
                            var n = T.params.fade.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(Math.max(a[0].progress, -1), 0);
                            a.css({
                                opacity: n
                            }).transform("translate3d(" + r + "px, " + s + "px, 0px)");
                        }
                    },
                    setTransition: function(e) {
                        if (T.slides.transition(e), T.params.virtualTranslate && 0 !== e) {
                            var a = !1;
                            T.slides.transitionEnd(function() {
                                if (!a && T) {
                                    a = !0, T.animating = !1;
                                    for (var e = [ "webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd" ], t = 0; t < e.length; t++) T.wrapper.trigger(e[t]);
                                }
                            });
                        }
                    }
                },
                cube: {
                    setTranslate: function() {
                        var e, t = 0;
                        T.params.cube.shadow && (i() ? (e = T.wrapper.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), 
                        T.wrapper.append(e)), e.css({
                            height: T.width + "px"
                        })) : (e = T.container.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), 
                        T.container.append(e))));
                        for (var r = 0; r < T.slides.length; r++) {
                            var s = T.slides.eq(r), n = 90 * r, o = Math.floor(n / 360);
                            T.rtl && (n = -n, o = Math.floor(-n / 360));
                            var l = Math.max(Math.min(s[0].progress, 1), -1), d = 0, p = 0, u = 0;
                            r % 4 === 0 ? (d = 4 * -o * T.size, u = 0) : (r - 1) % 4 === 0 ? (d = 0, u = 4 * -o * T.size) : (r - 2) % 4 === 0 ? (d = T.size + 4 * o * T.size, 
                            u = T.size) : (r - 3) % 4 === 0 && (d = -T.size, u = 3 * T.size + 4 * T.size * o), 
                            T.rtl && (d = -d), i() || (p = d, d = 0);
                            var c = "rotateX(" + (i() ? 0 : -n) + "deg) rotateY(" + (i() ? n : 0) + "deg) translate3d(" + d + "px, " + p + "px, " + u + "px)";
                            if (1 >= l && l > -1 && (t = 90 * r + 90 * l, T.rtl && (t = 90 * -r - 90 * l)), 
                            s.transform(c), T.params.cube.slideShadows) {
                                var m = i() ? s.find(".swiper-slide-shadow-left") : s.find(".swiper-slide-shadow-top"), f = i() ? s.find(".swiper-slide-shadow-right") : s.find(".swiper-slide-shadow-bottom");
                                0 === m.length && (m = a('<div class="swiper-slide-shadow-' + (i() ? "left" : "top") + '"></div>'), 
                                s.append(m)), 0 === f.length && (f = a('<div class="swiper-slide-shadow-' + (i() ? "right" : "bottom") + '"></div>'), 
                                s.append(f));
                                s[0].progress;
                                m.length && (m[0].style.opacity = -s[0].progress), f.length && (f[0].style.opacity = s[0].progress);
                            }
                        }
                        if (T.wrapper.css({
                            "-webkit-transform-origin": "50% 50% -" + T.size / 2 + "px",
                            "-moz-transform-origin": "50% 50% -" + T.size / 2 + "px",
                            "-ms-transform-origin": "50% 50% -" + T.size / 2 + "px",
                            "transform-origin": "50% 50% -" + T.size / 2 + "px"
                        }), T.params.cube.shadow) if (i()) e.transform("translate3d(0px, " + (T.width / 2 + T.params.cube.shadowOffset) + "px, " + -T.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + T.params.cube.shadowScale + ")"); else {
                            var h = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90), g = 1.5 - (Math.sin(2 * h * Math.PI / 360) / 2 + Math.cos(2 * h * Math.PI / 360) / 2), v = T.params.cube.shadowScale, w = T.params.cube.shadowScale / g, y = T.params.cube.shadowOffset;
                            e.transform("scale3d(" + v + ", 1, " + w + ") translate3d(0px, " + (T.height / 2 + y) + "px, " + -T.height / 2 / w + "px) rotateX(-90deg)");
                        }
                        var b = T.isSafari || T.isUiWebView ? -T.size / 2 : 0;
                        T.wrapper.transform("translate3d(0px,0," + b + "px) rotateX(" + (i() ? 0 : t) + "deg) rotateY(" + (i() ? -t : 0) + "deg)");
                    },
                    setTransition: function(e) {
                        T.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), 
                        T.params.cube.shadow && !i() && T.container.find(".swiper-cube-shadow").transition(e);
                    }
                },
                coverflow: {
                    setTranslate: function() {
                        for (var e = T.translate, t = i() ? -e + T.width / 2 : -e + T.height / 2, r = i() ? T.params.coverflow.rotate : -T.params.coverflow.rotate, s = T.params.coverflow.depth, n = 0, o = T.slides.length; o > n; n++) {
                            var l = T.slides.eq(n), d = T.slidesSizesGrid[n], p = l[0].swiperSlideOffset, u = (t - p - d / 2) / d * T.params.coverflow.modifier, c = i() ? r * u : 0, m = i() ? 0 : r * u, f = -s * Math.abs(u), h = i() ? 0 : T.params.coverflow.stretch * u, g = i() ? T.params.coverflow.stretch * u : 0;
                            Math.abs(g) < .001 && (g = 0), Math.abs(h) < .001 && (h = 0), Math.abs(f) < .001 && (f = 0), 
                            Math.abs(c) < .001 && (c = 0), Math.abs(m) < .001 && (m = 0);
                            var v = "translate3d(" + g + "px," + h + "px," + f + "px)  rotateX(" + m + "deg) rotateY(" + c + "deg)";
                            if (l.transform(v), l[0].style.zIndex = -Math.abs(Math.round(u)) + 1, T.params.coverflow.slideShadows) {
                                var w = i() ? l.find(".swiper-slide-shadow-left") : l.find(".swiper-slide-shadow-top"), y = i() ? l.find(".swiper-slide-shadow-right") : l.find(".swiper-slide-shadow-bottom");
                                0 === w.length && (w = a('<div class="swiper-slide-shadow-' + (i() ? "left" : "top") + '"></div>'), 
                                l.append(w)), 0 === y.length && (y = a('<div class="swiper-slide-shadow-' + (i() ? "right" : "bottom") + '"></div>'), 
                                l.append(y)), w.length && (w[0].style.opacity = u > 0 ? u : 0), y.length && (y[0].style.opacity = -u > 0 ? -u : 0);
                            }
                        }
                        if (T.browser.ie) {
                            var b = T.wrapper[0].style;
                            b.perspectiveOrigin = t + "px 50%";
                        }
                    },
                    setTransition: function(e) {
                        T.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e);
                    }
                }
            }, T.lazy = {
                initialImageLoaded: !1,
                loadImageInSlide: function(e, t) {
                    if ("undefined" != typeof e && ("undefined" == typeof t && (t = !0), 0 !== T.slides.length)) {
                        var r = T.slides.eq(e), s = r.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");
                        !r.hasClass("swiper-lazy") || r.hasClass("swiper-lazy-loaded") || r.hasClass("swiper-lazy-loading") || (s = s.add(r[0])), 
                        0 !== s.length && s.each(function() {
                            var e = a(this);
                            e.addClass("swiper-lazy-loading");
                            var s = e.attr("data-background"), i = e.attr("data-src"), n = e.attr("data-srcset");
                            T.loadImage(e[0], i || s, n, !1, function() {
                                if (s ? (e.css("background-image", "url(" + s + ")"), e.removeAttr("data-background")) : (n && (e.attr("srcset", n), 
                                e.removeAttr("data-srcset")), i && (e.attr("src", i), e.removeAttr("data-src"))), 
                                e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"), r.find(".swiper-lazy-preloader, .preloader").remove(), 
                                T.params.loop && t) {
                                    var a = r.attr("data-swiper-slide-index");
                                    if (r.hasClass(T.params.slideDuplicateClass)) {
                                        var o = T.wrapper.children('[data-swiper-slide-index="' + a + '"]:not(.' + T.params.slideDuplicateClass + ")");
                                        T.lazy.loadImageInSlide(o.index(), !1);
                                    } else {
                                        var l = T.wrapper.children("." + T.params.slideDuplicateClass + '[data-swiper-slide-index="' + a + '"]');
                                        T.lazy.loadImageInSlide(l.index(), !1);
                                    }
                                }
                                T.emit("onLazyImageReady", T, r[0], e[0]);
                            }), T.emit("onLazyImageLoad", T, r[0], e[0]);
                        });
                    }
                },
                load: function() {
                    var e;
                    if (T.params.watchSlidesVisibility) T.wrapper.children("." + T.params.slideVisibleClass).each(function() {
                        T.lazy.loadImageInSlide(a(this).index());
                    }); else if (T.params.slidesPerView > 1) for (e = T.activeIndex; e < T.activeIndex + T.params.slidesPerView; e++) T.slides[e] && T.lazy.loadImageInSlide(e); else T.lazy.loadImageInSlide(T.activeIndex);
                    if (T.params.lazyLoadingInPrevNext) if (T.params.slidesPerView > 1) {
                        for (e = T.activeIndex + T.params.slidesPerView; e < T.activeIndex + T.params.slidesPerView + T.params.slidesPerView; e++) T.slides[e] && T.lazy.loadImageInSlide(e);
                        for (e = T.activeIndex - T.params.slidesPerView; e < T.activeIndex; e++) T.slides[e] && T.lazy.loadImageInSlide(e);
                    } else {
                        var t = T.wrapper.children("." + T.params.slideNextClass);
                        t.length > 0 && T.lazy.loadImageInSlide(t.index());
                        var r = T.wrapper.children("." + T.params.slidePrevClass);
                        r.length > 0 && T.lazy.loadImageInSlide(r.index());
                    }
                },
                onTransitionStart: function() {
                    T.params.lazyLoading && (T.params.lazyLoadingOnTransitionStart || !T.params.lazyLoadingOnTransitionStart && !T.lazy.initialImageLoaded) && T.lazy.load();
                },
                onTransitionEnd: function() {
                    T.params.lazyLoading && !T.params.lazyLoadingOnTransitionStart && T.lazy.load();
                }
            }, T.scrollbar = {
                isTouched: !1,
                setDragPosition: function(e) {
                    var a = T.scrollbar, t = i() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY, r = t - a.track.offset()[i() ? "left" : "top"] - a.dragSize / 2, s = -T.minTranslate() * a.moveDivider, n = -T.maxTranslate() * a.moveDivider;
                    s > r ? r = s : r > n && (r = n), r = -r / a.moveDivider, T.updateProgress(r), T.setWrapperTranslate(r, !0);
                },
                dragStart: function(e) {
                    var a = T.scrollbar;
                    a.isTouched = !0, e.preventDefault(), e.stopPropagation(), a.setDragPosition(e), 
                    clearTimeout(a.dragTimeout), a.track.transition(0), T.params.scrollbarHide && a.track.css("opacity", 1), 
                    T.wrapper.transition(100), a.drag.transition(100), T.emit("onScrollbarDragStart", T);
                },
                dragMove: function(e) {
                    var a = T.scrollbar;
                    a.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, a.setDragPosition(e), 
                    T.wrapper.transition(0), a.track.transition(0), a.drag.transition(0), T.emit("onScrollbarDragMove", T));
                },
                dragEnd: function(e) {
                    var a = T.scrollbar;
                    a.isTouched && (a.isTouched = !1, T.params.scrollbarHide && (clearTimeout(a.dragTimeout), 
                    a.dragTimeout = setTimeout(function() {
                        a.track.css("opacity", 0), a.track.transition(400);
                    }, 1e3)), T.emit("onScrollbarDragEnd", T), T.params.scrollbarSnapOnRelease && T.slideReset());
                },
                enableDraggable: function() {
                    var e = T.scrollbar, t = T.support.touch ? e.track : document;
                    a(e.track).on(T.touchEvents.start, e.dragStart), a(t).on(T.touchEvents.move, e.dragMove), 
                    a(t).on(T.touchEvents.end, e.dragEnd);
                },
                disableDraggable: function() {
                    var e = T.scrollbar, t = T.support.touch ? e.track : document;
                    a(e.track).off(T.touchEvents.start, e.dragStart), a(t).off(T.touchEvents.move, e.dragMove), 
                    a(t).off(T.touchEvents.end, e.dragEnd);
                },
                set: function() {
                    if (T.params.scrollbar) {
                        var e = T.scrollbar;
                        e.track = a(T.params.scrollbar), e.drag = e.track.find(".swiper-scrollbar-drag"), 
                        0 === e.drag.length && (e.drag = a('<div class="swiper-scrollbar-drag"></div>'), 
                        e.track.append(e.drag)), e.drag[0].style.width = "", e.drag[0].style.height = "", 
                        e.trackSize = i() ? e.track[0].offsetWidth : e.track[0].offsetHeight, e.divider = T.size / T.virtualSize, 
                        e.moveDivider = e.divider * (e.trackSize / T.size), e.dragSize = e.trackSize * e.divider, 
                        i() ? e.drag[0].style.width = e.dragSize + "px" : e.drag[0].style.height = e.dragSize + "px", 
                        e.divider >= 1 ? e.track[0].style.display = "none" : e.track[0].style.display = "", 
                        T.params.scrollbarHide && (e.track[0].style.opacity = 0);
                    }
                },
                setTranslate: function() {
                    if (T.params.scrollbar) {
                        var e, a = T.scrollbar, t = (T.translate || 0, a.dragSize);
                        e = (a.trackSize - a.dragSize) * T.progress, T.rtl && i() ? (e = -e, e > 0 ? (t = a.dragSize - e, 
                        e = 0) : -e + a.dragSize > a.trackSize && (t = a.trackSize + e)) : 0 > e ? (t = a.dragSize + e, 
                        e = 0) : e + a.dragSize > a.trackSize && (t = a.trackSize - e), i() ? (T.support.transforms3d ? a.drag.transform("translate3d(" + e + "px, 0, 0)") : a.drag.transform("translateX(" + e + "px)"), 
                        a.drag[0].style.width = t + "px") : (T.support.transforms3d ? a.drag.transform("translate3d(0px, " + e + "px, 0)") : a.drag.transform("translateY(" + e + "px)"), 
                        a.drag[0].style.height = t + "px"), T.params.scrollbarHide && (clearTimeout(a.timeout), 
                        a.track[0].style.opacity = 1, a.timeout = setTimeout(function() {
                            a.track[0].style.opacity = 0, a.track.transition(400);
                        }, 1e3));
                    }
                },
                setTransition: function(e) {
                    T.params.scrollbar && T.scrollbar.drag.transition(e);
                }
            }, T.controller = {
                LinearSpline: function(e, a) {
                    this.x = e, this.y = a, this.lastIndex = e.length - 1;
                    var t, r;
                    this.x.length;
                    this.interpolate = function(e) {
                        return e ? (r = s(this.x, e), t = r - 1, (e - this.x[t]) * (this.y[r] - this.y[t]) / (this.x[r] - this.x[t]) + this.y[t]) : 0;
                    };
                    var s = function() {
                        var e, a, t;
                        return function(r, s) {
                            for (a = -1, e = r.length; e - a > 1; ) r[t = e + a >> 1] <= s ? a = t : e = t;
                            return e;
                        };
                    }();
                },
                getInterpolateFunction: function(e) {
                    T.controller.spline || (T.controller.spline = T.params.loop ? new T.controller.LinearSpline(T.slidesGrid, e.slidesGrid) : new T.controller.LinearSpline(T.snapGrid, e.snapGrid));
                },
                setTranslate: function(e, a) {
                    function r(a) {
                        e = a.rtl && "horizontal" === a.params.direction ? -T.translate : T.translate, "slide" === T.params.controlBy && (T.controller.getInterpolateFunction(a), 
                        i = -T.controller.spline.interpolate(-e)), i && "container" !== T.params.controlBy || (s = (a.maxTranslate() - a.minTranslate()) / (T.maxTranslate() - T.minTranslate()), 
                        i = (e - T.minTranslate()) * s + a.minTranslate()), T.params.controlInverse && (i = a.maxTranslate() - i), 
                        a.updateProgress(i), a.setWrapperTranslate(i, !1, T), a.updateActiveIndex();
                    }
                    var s, i, n = T.params.control;
                    if (T.isArray(n)) for (var o = 0; o < n.length; o++) n[o] !== a && n[o] instanceof t && r(n[o]); else n instanceof t && a !== n && r(n);
                },
                setTransition: function(e, a) {
                    function r(a) {
                        a.setWrapperTransition(e, T), 0 !== e && (a.onTransitionStart(), a.wrapper.transitionEnd(function() {
                            i && (a.params.loop && "slide" === T.params.controlBy && a.fixLoop(), a.onTransitionEnd());
                        }));
                    }
                    var s, i = T.params.control;
                    if (T.isArray(i)) for (s = 0; s < i.length; s++) i[s] !== a && i[s] instanceof t && r(i[s]); else i instanceof t && a !== i && r(i);
                }
            }, T.hashnav = {
                init: function() {
                    if (T.params.hashnav) {
                        T.hashnav.initialized = !0;
                        var e = document.location.hash.replace("#", "");
                        if (e) for (var a = 0, t = 0, r = T.slides.length; r > t; t++) {
                            var s = T.slides.eq(t), i = s.attr("data-hash");
                            if (i === e && !s.hasClass(T.params.slideDuplicateClass)) {
                                var n = s.index();
                                T.slideTo(n, a, T.params.runCallbacksOnInit, !0);
                            }
                        }
                    }
                },
                setHash: function() {
                    T.hashnav.initialized && T.params.hashnav && (document.location.hash = T.slides.eq(T.activeIndex).attr("data-hash") || "");
                }
            }, T.disableKeyboardControl = function() {
                T.params.keyboardControl = !1, a(document).off("keydown", p);
            }, T.enableKeyboardControl = function() {
                T.params.keyboardControl = !0, a(document).on("keydown", p);
            }, T.mousewheel = {
                event: !1,
                lastScrollTime: new window.Date().getTime()
            }, T.params.mousewheelControl) {
                try {
                    new window.WheelEvent("wheel"), T.mousewheel.event = "wheel";
                } catch (R) {}
                T.mousewheel.event || void 0 === document.onmousewheel || (T.mousewheel.event = "mousewheel"), 
                T.mousewheel.event || (T.mousewheel.event = "DOMMouseScroll");
            }
            T.disableMousewheelControl = function() {
                return T.mousewheel.event ? (T.container.off(T.mousewheel.event, u), !0) : !1;
            }, T.enableMousewheelControl = function() {
                return T.mousewheel.event ? (T.container.on(T.mousewheel.event, u), !0) : !1;
            }, T.parallax = {
                setTranslate: function() {
                    T.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                        c(this, T.progress);
                    }), T.slides.each(function() {
                        var e = a(this);
                        e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                            var a = Math.min(Math.max(e[0].progress, -1), 1);
                            c(this, a);
                        });
                    });
                },
                setTransition: function(e) {
                    "undefined" == typeof e && (e = T.params.speed), T.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                        var t = a(this), r = parseInt(t.attr("data-swiper-parallax-duration"), 10) || e;
                        0 === e && (r = 0), t.transition(r);
                    });
                }
            }, T._plugins = [];
            for (var W in T.plugins) {
                var V = T.plugins[W](T, T.params[W]);
                V && T._plugins.push(V);
            }
            return T.callPlugins = function(e) {
                for (var a = 0; a < T._plugins.length; a++) e in T._plugins[a] && T._plugins[a][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
            }, T.emitterEventListeners = {}, T.emit = function(e) {
                T.params[e] && T.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                var a;
                if (T.emitterEventListeners[e]) for (a = 0; a < T.emitterEventListeners[e].length; a++) T.emitterEventListeners[e][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                T.callPlugins && T.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
            }, T.on = function(e, a) {
                return e = m(e), T.emitterEventListeners[e] || (T.emitterEventListeners[e] = []), 
                T.emitterEventListeners[e].push(a), T;
            }, T.off = function(e, a) {
                var t;
                if (e = m(e), "undefined" == typeof a) return T.emitterEventListeners[e] = [], T;
                if (T.emitterEventListeners[e] && 0 !== T.emitterEventListeners[e].length) {
                    for (t = 0; t < T.emitterEventListeners[e].length; t++) T.emitterEventListeners[e][t] === a && T.emitterEventListeners[e].splice(t, 1);
                    return T;
                }
            }, T.once = function(e, a) {
                e = m(e);
                var t = function() {
                    a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), T.off(e, t);
                };
                return T.on(e, t), T;
            }, T.a11y = {
                makeFocusable: function(e) {
                    return e.attr("tabIndex", "0"), e;
                },
                addRole: function(e, a) {
                    return e.attr("role", a), e;
                },
                addLabel: function(e, a) {
                    return e.attr("aria-label", a), e;
                },
                disable: function(e) {
                    return e.attr("aria-disabled", !0), e;
                },
                enable: function(e) {
                    return e.attr("aria-disabled", !1), e;
                },
                onEnterKey: function(e) {
                    13 === e.keyCode && (a(e.target).is(T.params.nextButton) ? (T.onClickNext(e), T.isEnd ? T.a11y.notify(T.params.lastSlideMessage) : T.a11y.notify(T.params.nextSlideMessage)) : a(e.target).is(T.params.prevButton) && (T.onClickPrev(e), 
                    T.isBeginning ? T.a11y.notify(T.params.firstSlideMessage) : T.a11y.notify(T.params.prevSlideMessage)), 
                    a(e.target).is("." + T.params.bulletClass) && a(e.target)[0].click());
                },
                liveRegion: a('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
                notify: function(e) {
                    var a = T.a11y.liveRegion;
                    0 !== a.length && (a.html(""), a.html(e));
                },
                init: function() {
                    if (T.params.nextButton) {
                        var e = a(T.params.nextButton);
                        T.a11y.makeFocusable(e), T.a11y.addRole(e, "button"), T.a11y.addLabel(e, T.params.nextSlideMessage);
                    }
                    if (T.params.prevButton) {
                        var t = a(T.params.prevButton);
                        T.a11y.makeFocusable(t), T.a11y.addRole(t, "button"), T.a11y.addLabel(t, T.params.prevSlideMessage);
                    }
                    a(T.container).append(T.a11y.liveRegion);
                },
                initPagination: function() {
                    T.params.pagination && T.params.paginationClickable && T.bullets && T.bullets.length && T.bullets.each(function() {
                        var e = a(this);
                        T.a11y.makeFocusable(e), T.a11y.addRole(e, "button"), T.a11y.addLabel(e, T.params.paginationBulletMessage.replace(/{{index}}/, e.index() + 1));
                    });
                },
                destroy: function() {
                    T.a11y.liveRegion && T.a11y.liveRegion.length > 0 && T.a11y.liveRegion.remove();
                }
            }, T.init = function() {
                T.params.loop && T.createLoop(), T.updateContainerSize(), T.updateSlidesSize(), 
                T.updatePagination(), T.params.scrollbar && T.scrollbar && (T.scrollbar.set(), T.params.scrollbarDraggable && T.scrollbar.enableDraggable()), 
                "slide" !== T.params.effect && T.effects[T.params.effect] && (T.params.loop || T.updateProgress(), 
                T.effects[T.params.effect].setTranslate()), T.params.loop ? T.slideTo(T.params.initialSlide + T.loopedSlides, 0, T.params.runCallbacksOnInit) : (T.slideTo(T.params.initialSlide, 0, T.params.runCallbacksOnInit), 
                0 === T.params.initialSlide && (T.parallax && T.params.parallax && T.parallax.setTranslate(), 
                T.lazy && T.params.lazyLoading && (T.lazy.load(), T.lazy.initialImageLoaded = !0))), 
                T.attachEvents(), T.params.observer && T.support.observer && T.initObservers(), 
                T.params.preloadImages && !T.params.lazyLoading && T.preloadImages(), T.params.autoplay && T.startAutoplay(), 
                T.params.keyboardControl && T.enableKeyboardControl && T.enableKeyboardControl(), 
                T.params.mousewheelControl && T.enableMousewheelControl && T.enableMousewheelControl(), 
                T.params.hashnav && T.hashnav && T.hashnav.init(), T.params.a11y && T.a11y && T.a11y.init(), 
                T.emit("onInit", T);
            }, T.cleanupStyles = function() {
                T.container.removeClass(T.classNames.join(" ")).removeAttr("style"), T.wrapper.removeAttr("style"), 
                T.slides && T.slides.length && T.slides.removeClass([ T.params.slideVisibleClass, T.params.slideActiveClass, T.params.slideNextClass, T.params.slidePrevClass ].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), 
                T.paginationContainer && T.paginationContainer.length && T.paginationContainer.removeClass(T.params.paginationHiddenClass), 
                T.bullets && T.bullets.length && T.bullets.removeClass(T.params.bulletActiveClass), 
                T.params.prevButton && a(T.params.prevButton).removeClass(T.params.buttonDisabledClass), 
                T.params.nextButton && a(T.params.nextButton).removeClass(T.params.buttonDisabledClass), 
                T.params.scrollbar && T.scrollbar && (T.scrollbar.track && T.scrollbar.track.length && T.scrollbar.track.removeAttr("style"), 
                T.scrollbar.drag && T.scrollbar.drag.length && T.scrollbar.drag.removeAttr("style"));
            }, T.destroy = function(e, a) {
                T.detachEvents(), T.stopAutoplay(), T.params.scrollbar && T.scrollbar && T.params.scrollbarDraggable && T.scrollbar.disableDraggable(), 
                T.params.loop && T.destroyLoop(), a && T.cleanupStyles(), T.disconnectObservers(), 
                T.params.keyboardControl && T.disableKeyboardControl && T.disableKeyboardControl(), 
                T.params.mousewheelControl && T.disableMousewheelControl && T.disableMousewheelControl(), 
                T.params.a11y && T.a11y && T.a11y.destroy(), T.emit("onDestroy"), e !== !1 && (T = null);
            }, T.init(), T;
        }
    };
    t.prototype = {
        isSafari: function() {
            var e = navigator.userAgent.toLowerCase();
            return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0;
        }(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
        isArray: function(e) {
            return "[object Array]" === Object.prototype.toString.apply(e);
        },
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1
        },
        device: function() {
            var e = navigator.userAgent, a = e.match(/(Android);?[\s\/]+([\d.]+)?/), t = e.match(/(iPad).*OS\s([\d_]+)/), r = e.match(/(iPod)(.*OS\s([\d_]+))?/), s = !t && e.match(/(iPhone\sOS)\s([\d_]+)/);
            return {
                ios: t || s || r,
                android: a
            };
        }(),
        support: {
            touch: window.Modernizr && Modernizr.touch === !0 || function() {
                return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
            }(),
            transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function() {
                var e = document.createElement("div").style;
                return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e;
            }(),
            flexbox: function() {
                for (var e = document.createElement("div").style, a = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), t = 0; t < a.length; t++) if (a[t] in e) return !0;
            }(),
            observer: function() {
                return "MutationObserver" in window || "WebkitMutationObserver" in window;
            }()
        },
        plugins: {}
    };
    for (var r = (function() {
        var e = function(e) {
            var a = this, t = 0;
            for (t = 0; t < e.length; t++) a[t] = e[t];
            return a.length = e.length, this;
        }, a = function(a, t) {
            var r = [], s = 0;
            if (a && !t && a instanceof e) return a;
            if (a) if ("string" == typeof a) {
                var i, n, o = a.trim();
                if (o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
                    var l = "div";
                    for (0 === o.indexOf("<li") && (l = "ul"), 0 === o.indexOf("<tr") && (l = "tbody"), 
                    (0 === o.indexOf("<td") || 0 === o.indexOf("<th")) && (l = "tr"), 0 === o.indexOf("<tbody") && (l = "table"), 
                    0 === o.indexOf("<option") && (l = "select"), n = document.createElement(l), n.innerHTML = a, 
                    s = 0; s < n.childNodes.length; s++) r.push(n.childNodes[s]);
                } else for (i = t || "#" !== a[0] || a.match(/[ .<>:~]/) ? (t || document).querySelectorAll(a) : [ document.getElementById(a.split("#")[1]) ], 
                s = 0; s < i.length; s++) i[s] && r.push(i[s]);
            } else if (a.nodeType || a === window || a === document) r.push(a); else if (a.length > 0 && a[0].nodeType) for (s = 0; s < a.length; s++) r.push(a[s]);
            return new e(r);
        };
        return e.prototype = {
            addClass: function(e) {
                if ("undefined" == typeof e) return this;
                for (var a = e.split(" "), t = 0; t < a.length; t++) for (var r = 0; r < this.length; r++) this[r].classList.add(a[t]);
                return this;
            },
            removeClass: function(e) {
                for (var a = e.split(" "), t = 0; t < a.length; t++) for (var r = 0; r < this.length; r++) this[r].classList.remove(a[t]);
                return this;
            },
            hasClass: function(e) {
                return this[0] ? this[0].classList.contains(e) : !1;
            },
            toggleClass: function(e) {
                for (var a = e.split(" "), t = 0; t < a.length; t++) for (var r = 0; r < this.length; r++) this[r].classList.toggle(a[t]);
                return this;
            },
            attr: function(e, a) {
                if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
                for (var t = 0; t < this.length; t++) if (2 === arguments.length) this[t].setAttribute(e, a); else for (var r in e) this[t][r] = e[r], 
                this[t].setAttribute(r, e[r]);
                return this;
            },
            removeAttr: function(e) {
                for (var a = 0; a < this.length; a++) this[a].removeAttribute(e);
                return this;
            },
            data: function(e, a) {
                if ("undefined" != typeof a) {
                    for (var t = 0; t < this.length; t++) {
                        var r = this[t];
                        r.dom7ElementDataStorage || (r.dom7ElementDataStorage = {}), r.dom7ElementDataStorage[e] = a;
                    }
                    return this;
                }
                if (this[0]) {
                    var s = this[0].getAttribute("data-" + e);
                    return s ? s : this[0].dom7ElementDataStorage && e in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[e] : void 0;
                }
            },
            transform: function(e) {
                for (var a = 0; a < this.length; a++) {
                    var t = this[a].style;
                    t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e;
                }
                return this;
            },
            transition: function(e) {
                "string" != typeof e && (e += "ms");
                for (var a = 0; a < this.length; a++) {
                    var t = this[a].style;
                    t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e;
                }
                return this;
            },
            on: function(e, t, r, s) {
                function i(e) {
                    var s = e.target;
                    if (a(s).is(t)) r.call(s, e); else for (var i = a(s).parents(), n = 0; n < i.length; n++) a(i[n]).is(t) && r.call(i[n], e);
                }
                var n, o, l = e.split(" ");
                for (n = 0; n < this.length; n++) if ("function" == typeof t || t === !1) for ("function" == typeof t && (r = arguments[1], 
                s = arguments[2] || !1), o = 0; o < l.length; o++) this[n].addEventListener(l[o], r, s); else for (o = 0; o < l.length; o++) this[n].dom7LiveListeners || (this[n].dom7LiveListeners = []), 
                this[n].dom7LiveListeners.push({
                    listener: r,
                    liveListener: i
                }), this[n].addEventListener(l[o], i, s);
                return this;
            },
            off: function(e, a, t, r) {
                for (var s = e.split(" "), i = 0; i < s.length; i++) for (var n = 0; n < this.length; n++) if ("function" == typeof a || a === !1) "function" == typeof a && (t = arguments[1], 
                r = arguments[2] || !1), this[n].removeEventListener(s[i], t, r); else if (this[n].dom7LiveListeners) for (var o = 0; o < this[n].dom7LiveListeners.length; o++) this[n].dom7LiveListeners[o].listener === t && this[n].removeEventListener(s[i], this[n].dom7LiveListeners[o].liveListener, r);
                return this;
            },
            once: function(e, a, t, r) {
                function s(n) {
                    t(n), i.off(e, a, s, r);
                }
                var i = this;
                "function" == typeof a && (a = !1, t = arguments[1], r = arguments[2]), i.on(e, a, s, r);
            },
            trigger: function(e, a) {
                for (var t = 0; t < this.length; t++) {
                    var r;
                    try {
                        r = new window.CustomEvent(e, {
                            detail: a,
                            bubbles: !0,
                            cancelable: !0
                        });
                    } catch (s) {
                        r = document.createEvent("Event"), r.initEvent(e, !0, !0), r.detail = a;
                    }
                    this[t].dispatchEvent(r);
                }
                return this;
            },
            transitionEnd: function(e) {
                function a(i) {
                    if (i.target === this) for (e.call(this, i), t = 0; t < r.length; t++) s.off(r[t], a);
                }
                var t, r = [ "webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd" ], s = this;
                if (e) for (t = 0; t < r.length; t++) s.on(r[t], a);
                return this;
            },
            width: function() {
                return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null;
            },
            outerWidth: function(e) {
                return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null;
            },
            height: function() {
                return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null;
            },
            outerHeight: function(e) {
                return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null;
            },
            offset: function() {
                if (this.length > 0) {
                    var e = this[0], a = e.getBoundingClientRect(), t = document.body, r = e.clientTop || t.clientTop || 0, s = e.clientLeft || t.clientLeft || 0, i = window.pageYOffset || e.scrollTop, n = window.pageXOffset || e.scrollLeft;
                    return {
                        top: a.top + i - r,
                        left: a.left + n - s
                    };
                }
                return null;
            },
            css: function(e, a) {
                var t;
                if (1 === arguments.length) {
                    if ("string" != typeof e) {
                        for (t = 0; t < this.length; t++) for (var r in e) this[t].style[r] = e[r];
                        return this;
                    }
                    if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(e);
                }
                if (2 === arguments.length && "string" == typeof e) {
                    for (t = 0; t < this.length; t++) this[t].style[e] = a;
                    return this;
                }
                return this;
            },
            each: function(e) {
                for (var a = 0; a < this.length; a++) e.call(this[a], a, this[a]);
                return this;
            },
            html: function(e) {
                if ("undefined" == typeof e) return this[0] ? this[0].innerHTML : void 0;
                for (var a = 0; a < this.length; a++) this[a].innerHTML = e;
                return this;
            },
            is: function(t) {
                if (!this[0]) return !1;
                var r, s;
                if ("string" == typeof t) {
                    var i = this[0];
                    if (i === document) return t === document;
                    if (i === window) return t === window;
                    if (i.matches) return i.matches(t);
                    if (i.webkitMatchesSelector) return i.webkitMatchesSelector(t);
                    if (i.mozMatchesSelector) return i.mozMatchesSelector(t);
                    if (i.msMatchesSelector) return i.msMatchesSelector(t);
                    for (r = a(t), s = 0; s < r.length; s++) if (r[s] === this[0]) return !0;
                    return !1;
                }
                if (t === document) return this[0] === document;
                if (t === window) return this[0] === window;
                if (t.nodeType || t instanceof e) {
                    for (r = t.nodeType ? [ t ] : t, s = 0; s < r.length; s++) if (r[s] === this[0]) return !0;
                    return !1;
                }
                return !1;
            },
            index: function() {
                if (this[0]) {
                    for (var e = this[0], a = 0; null !== (e = e.previousSibling); ) 1 === e.nodeType && a++;
                    return a;
                }
            },
            eq: function(a) {
                if ("undefined" == typeof a) return this;
                var t, r = this.length;
                return a > r - 1 ? new e([]) : 0 > a ? (t = r + a, new e(0 > t ? [] : [ this[t] ])) : new e([ this[a] ]);
            },
            append: function(a) {
                var t, r;
                for (t = 0; t < this.length; t++) if ("string" == typeof a) {
                    var s = document.createElement("div");
                    for (s.innerHTML = a; s.firstChild; ) this[t].appendChild(s.firstChild);
                } else if (a instanceof e) for (r = 0; r < a.length; r++) this[t].appendChild(a[r]); else this[t].appendChild(a);
                return this;
            },
            prepend: function(a) {
                var t, r;
                for (t = 0; t < this.length; t++) if ("string" == typeof a) {
                    var s = document.createElement("div");
                    for (s.innerHTML = a, r = s.childNodes.length - 1; r >= 0; r--) this[t].insertBefore(s.childNodes[r], this[t].childNodes[0]);
                } else if (a instanceof e) for (r = 0; r < a.length; r++) this[t].insertBefore(a[r], this[t].childNodes[0]); else this[t].insertBefore(a, this[t].childNodes[0]);
                return this;
            },
            insertBefore: function(e) {
                for (var t = a(e), r = 0; r < this.length; r++) if (1 === t.length) t[0].parentNode.insertBefore(this[r], t[0]); else if (t.length > 1) for (var s = 0; s < t.length; s++) t[s].parentNode.insertBefore(this[r].cloneNode(!0), t[s]);
            },
            insertAfter: function(e) {
                for (var t = a(e), r = 0; r < this.length; r++) if (1 === t.length) t[0].parentNode.insertBefore(this[r], t[0].nextSibling); else if (t.length > 1) for (var s = 0; s < t.length; s++) t[s].parentNode.insertBefore(this[r].cloneNode(!0), t[s].nextSibling);
            },
            next: function(t) {
                return new e(this.length > 0 ? t ? this[0].nextElementSibling && a(this[0].nextElementSibling).is(t) ? [ this[0].nextElementSibling ] : [] : this[0].nextElementSibling ? [ this[0].nextElementSibling ] : [] : []);
            },
            nextAll: function(t) {
                var r = [], s = this[0];
                if (!s) return new e([]);
                for (;s.nextElementSibling; ) {
                    var i = s.nextElementSibling;
                    t ? a(i).is(t) && r.push(i) : r.push(i), s = i;
                }
                return new e(r);
            },
            prev: function(t) {
                return new e(this.length > 0 ? t ? this[0].previousElementSibling && a(this[0].previousElementSibling).is(t) ? [ this[0].previousElementSibling ] : [] : this[0].previousElementSibling ? [ this[0].previousElementSibling ] : [] : []);
            },
            prevAll: function(t) {
                var r = [], s = this[0];
                if (!s) return new e([]);
                for (;s.previousElementSibling; ) {
                    var i = s.previousElementSibling;
                    t ? a(i).is(t) && r.push(i) : r.push(i), s = i;
                }
                return new e(r);
            },
            parent: function(e) {
                for (var t = [], r = 0; r < this.length; r++) e ? a(this[r].parentNode).is(e) && t.push(this[r].parentNode) : t.push(this[r].parentNode);
                return a(a.unique(t));
            },
            parents: function(e) {
                for (var t = [], r = 0; r < this.length; r++) for (var s = this[r].parentNode; s; ) e ? a(s).is(e) && t.push(s) : t.push(s), 
                s = s.parentNode;
                return a(a.unique(t));
            },
            find: function(a) {
                for (var t = [], r = 0; r < this.length; r++) for (var s = this[r].querySelectorAll(a), i = 0; i < s.length; i++) t.push(s[i]);
                return new e(t);
            },
            children: function(t) {
                for (var r = [], s = 0; s < this.length; s++) for (var i = this[s].childNodes, n = 0; n < i.length; n++) t ? 1 === i[n].nodeType && a(i[n]).is(t) && r.push(i[n]) : 1 === i[n].nodeType && r.push(i[n]);
                return new e(a.unique(r));
            },
            remove: function() {
                for (var e = 0; e < this.length; e++) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
                return this;
            },
            add: function() {
                var e, t, r = this;
                for (e = 0; e < arguments.length; e++) {
                    var s = a(arguments[e]);
                    for (t = 0; t < s.length; t++) r[r.length] = s[t], r.length++;
                }
                return r;
            }
        }, a.fn = e.prototype, a.unique = function(e) {
            for (var a = [], t = 0; t < e.length; t++) -1 === a.indexOf(e[t]) && a.push(e[t]);
            return a;
        }, a;
    }()), s = [ "jQuery", "Zepto", "Dom7" ], i = 0; i < s.length; i++) window[s[i]] && e(window[s[i]]);
    var n;
    n = "undefined" == typeof r ? window.Dom7 || window.Zepto || window.jQuery : r, 
    n && ("transitionEnd" in n.fn || (n.fn.transitionEnd = function(e) {
        function a(i) {
            if (i.target === this) for (e.call(this, i), t = 0; t < r.length; t++) s.off(r[t], a);
        }
        var t, r = [ "webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd" ], s = this;
        if (e) for (t = 0; t < r.length; t++) s.on(r[t], a);
        return this;
    }), "transform" in n.fn || (n.fn.transform = function(e) {
        for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e;
        }
        return this;
    }), "transition" in n.fn || (n.fn.transition = function(e) {
        "string" != typeof e && (e += "ms");
        for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e;
        }
        return this;
    })), window.Swiper = t;
}(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function() {
    "use strict";
    return window.Swiper;
});

/*! Magnific Popup - v1.0.1 - 2015-12-30
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2015 Dmitry Semenov; */
!function(a) {
    "function" == typeof define && define.amd ? define([ "jquery" ], a) : a("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto);
}(function(a) {
    var b, c, d, e, f, g, h = "Close", i = "BeforeClose", j = "AfterClose", k = "BeforeAppend", l = "MarkupParse", m = "Open", n = "Change", o = "mfp", p = "." + o, q = "mfp-ready", r = "mfp-removing", s = "mfp-prevent-close", t = function() {}, u = !!window.jQuery, v = a(window), w = function(a, c) {
        b.ev.on(o + a + p, c);
    }, x = function(b, c, d, e) {
        var f = document.createElement("div");
        return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), 
        c && f.appendTo(c)), f;
    }, y = function(c, d) {
        b.ev.triggerHandler(o + c, d), b.st.callbacks && (c = c.charAt(0).toLowerCase() + c.slice(1), 
        b.st.callbacks[c] && b.st.callbacks[c].apply(b, a.isArray(d) ? d : [ d ]));
    }, z = function(c) {
        return c === g && b.currTemplate.closeBtn || (b.currTemplate.closeBtn = a(b.st.closeMarkup.replace("%title%", b.st.tClose)), 
        g = c), b.currTemplate.closeBtn;
    }, A = function() {
        a.magnificPopup.instance || (b = new t(), b.init(), a.magnificPopup.instance = b);
    }, B = function() {
        var a = document.createElement("p").style, b = [ "ms", "O", "Moz", "Webkit" ];
        if (void 0 !== a.transition) return !0;
        for (;b.length; ) if (b.pop() + "Transition" in a) return !0;
        return !1;
    };
    t.prototype = {
        constructor: t,
        init: function() {
            var c = navigator.appVersion;
            b.isIE7 = -1 !== c.indexOf("MSIE 7."), b.isIE8 = -1 !== c.indexOf("MSIE 8."), b.isLowIE = b.isIE7 || b.isIE8, 
            b.isAndroid = /android/gi.test(c), b.isIOS = /iphone|ipad|ipod/gi.test(c), b.supportsTransition = B(), 
            b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), 
            d = a(document), b.popupsCache = {};
        },
        open: function(c) {
            var e;
            if (c.isObj === !1) {
                b.items = c.items.toArray(), b.index = 0;
                var g, h = c.items;
                for (e = 0; e < h.length; e++) if (g = h[e], g.parsed && (g = g.el[0]), g === c.el[0]) {
                    b.index = e;
                    break;
                }
            } else b.items = a.isArray(c.items) ? c.items : [ c.items ], b.index = c.index || 0;
            if (b.isOpen) return void b.updateItemHTML();
            b.types = [], f = "", c.mainEl && c.mainEl.length ? b.ev = c.mainEl.eq(0) : b.ev = d, 
            c.key ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}), b.currTemplate = b.popupsCache[c.key]) : b.currTemplate = {}, 
            b.st = a.extend(!0, {}, a.magnificPopup.defaults, c), b.fixedContentPos = "auto" === b.st.fixedContentPos ? !b.probablyMobile : b.st.fixedContentPos, 
            b.st.modal && (b.st.closeOnContentClick = !1, b.st.closeOnBgClick = !1, b.st.showCloseBtn = !1, 
            b.st.enableEscapeKey = !1), b.bgOverlay || (b.bgOverlay = x("bg").on("click" + p, function() {
                b.close();
            }), b.wrap = x("wrap").attr("tabindex", -1).on("click" + p, function(a) {
                b._checkIfClose(a.target) && b.close();
            }), b.container = x("container", b.wrap)), b.contentContainer = x("content"), b.st.preloader && (b.preloader = x("preloader", b.container, b.st.tLoading));
            var i = a.magnificPopup.modules;
            for (e = 0; e < i.length; e++) {
                var j = i[e];
                j = j.charAt(0).toUpperCase() + j.slice(1), b["init" + j].call(b);
            }
            y("BeforeOpen"), b.st.showCloseBtn && (b.st.closeBtnInside ? (w(l, function(a, b, c, d) {
                c.close_replaceWith = z(d.type);
            }), f += " mfp-close-btn-in") : b.wrap.append(z())), b.st.alignTop && (f += " mfp-align-top"), 
            b.fixedContentPos ? b.wrap.css({
                overflow: b.st.overflowY,
                overflowX: "hidden",
                overflowY: b.st.overflowY
            }) : b.wrap.css({
                top: v.scrollTop(),
                position: "absolute"
            }), (b.st.fixedBgPos === !1 || "auto" === b.st.fixedBgPos && !b.fixedContentPos) && b.bgOverlay.css({
                height: d.height(),
                position: "absolute"
            }), b.st.enableEscapeKey && d.on("keyup" + p, function(a) {
                27 === a.keyCode && b.close();
            }), v.on("resize" + p, function() {
                b.updateSize();
            }), b.st.closeOnContentClick || (f += " mfp-auto-cursor"), f && b.wrap.addClass(f);
            var k = b.wH = v.height(), n = {};
            if (b.fixedContentPos && b._hasScrollBar(k)) {
                var o = b._getScrollbarSize();
                o && (n.marginRight = o);
            }
            b.fixedContentPos && (b.isIE7 ? a("body, html").css("overflow", "hidden") : n.overflow = "hidden");
            var r = b.st.mainClass;
            return b.isIE7 && (r += " mfp-ie7"), r && b._addClassToMFP(r), b.updateItemHTML(), 
            y("BuildControls"), a("html").css(n), b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)), 
            b._lastFocusedEl = document.activeElement, setTimeout(function() {
                b.content ? (b._addClassToMFP(q), b._setFocus()) : b.bgOverlay.addClass(q), d.on("focusin" + p, b._onFocusIn);
            }, 16), b.isOpen = !0, b.updateSize(k), y(m), c;
        },
        close: function() {
            b.isOpen && (y(i), b.isOpen = !1, b.st.removalDelay && !b.isLowIE && b.supportsTransition ? (b._addClassToMFP(r), 
            setTimeout(function() {
                b._close();
            }, b.st.removalDelay)) : b._close());
        },
        _close: function() {
            y(h);
            var c = r + " " + q + " ";
            if (b.bgOverlay.detach(), b.wrap.detach(), b.container.empty(), b.st.mainClass && (c += b.st.mainClass + " "), 
            b._removeClassFromMFP(c), b.fixedContentPos) {
                var e = {
                    marginRight: ""
                };
                b.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "", a("html").css(e);
            }
            d.off("keyup" + p + " focusin" + p), b.ev.off(p), b.wrap.attr("class", "mfp-wrap").removeAttr("style"), 
            b.bgOverlay.attr("class", "mfp-bg"), b.container.attr("class", "mfp-container"), 
            !b.st.showCloseBtn || b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0 || b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach(), 
            b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(), b.currItem = null, 
            b.content = null, b.currTemplate = null, b.prevHeight = 0, y(j);
        },
        updateSize: function(a) {
            if (b.isIOS) {
                var c = document.documentElement.clientWidth / window.innerWidth, d = window.innerHeight * c;
                b.wrap.css("height", d), b.wH = d;
            } else b.wH = a || v.height();
            b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize");
        },
        updateItemHTML: function() {
            var c = b.items[b.index];
            b.contentContainer.detach(), b.content && b.content.detach(), c.parsed || (c = b.parseEl(b.index));
            var d = c.type;
            if (y("BeforeChange", [ b.currItem ? b.currItem.type : "", d ]), b.currItem = c, 
            !b.currTemplate[d]) {
                var f = b.st[d] ? b.st[d].markup : !1;
                y("FirstMarkupParse", f), f ? b.currTemplate[d] = a(f) : b.currTemplate[d] = !0;
            }
            e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
            var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
            b.appendContent(g, d), c.preloaded = !0, y(n, c), e = c.type, b.container.prepend(b.contentContainer), 
            y("AfterChange");
        },
        appendContent: function(a, c) {
            b.content = a, a ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0 ? b.content.find(".mfp-close").length || b.content.append(z()) : b.content = a : b.content = "", 
            y(k), b.container.addClass("mfp-" + c + "-holder"), b.contentContainer.append(b.content);
        },
        parseEl: function(c) {
            var d, e = b.items[c];
            if (e.tagName ? e = {
                el: a(e)
            } : (d = e.type, e = {
                data: e,
                src: e.src
            }), e.el) {
                for (var f = b.types, g = 0; g < f.length; g++) if (e.el.hasClass("mfp-" + f[g])) {
                    d = f[g];
                    break;
                }
                e.src = e.el.attr("data-mfp-src"), e.src || (e.src = e.el.attr("href"));
            }
            return e.type = d || b.st.type || "inline", e.index = c, e.parsed = !0, b.items[c] = e, 
            y("ElementParse", e), b.items[c];
        },
        addGroup: function(a, c) {
            var d = function(d) {
                d.mfpEl = this, b._openClick(d, a, c);
            };
            c || (c = {});
            var e = "click.magnificPopup";
            c.mainEl = a, c.items ? (c.isObj = !0, a.off(e).on(e, d)) : (c.isObj = !1, c.delegate ? a.off(e).on(e, c.delegate, d) : (c.items = a, 
            a.off(e).on(e, d)));
        },
        _openClick: function(c, d, e) {
            var f = void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
            if (f || !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)) {
                var g = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn;
                if (g) if (a.isFunction(g)) {
                    if (!g.call(b)) return !0;
                } else if (v.width() < g) return !0;
                c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()), e.el = a(c.mfpEl), 
                e.delegate && (e.items = d.find(e.delegate)), b.open(e);
            }
        },
        updateStatus: function(a, d) {
            if (b.preloader) {
                c !== a && b.container.removeClass("mfp-s-" + c), d || "loading" !== a || (d = b.st.tLoading);
                var e = {
                    status: a,
                    text: d
                };
                y("UpdateStatus", e), a = e.status, d = e.text, b.preloader.html(d), b.preloader.find("a").on("click", function(a) {
                    a.stopImmediatePropagation();
                }), b.container.addClass("mfp-s-" + a), c = a;
            }
        },
        _checkIfClose: function(c) {
            if (!a(c).hasClass(s)) {
                var d = b.st.closeOnContentClick, e = b.st.closeOnBgClick;
                if (d && e) return !0;
                if (!b.content || a(c).hasClass("mfp-close") || b.preloader && c === b.preloader[0]) return !0;
                if (c === b.content[0] || a.contains(b.content[0], c)) {
                    if (d) return !0;
                } else if (e && a.contains(document, c)) return !0;
                return !1;
            }
        },
        _addClassToMFP: function(a) {
            b.bgOverlay.addClass(a), b.wrap.addClass(a);
        },
        _removeClassFromMFP: function(a) {
            this.bgOverlay.removeClass(a), b.wrap.removeClass(a);
        },
        _hasScrollBar: function(a) {
            return (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height());
        },
        _setFocus: function() {
            (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus();
        },
        _onFocusIn: function(c) {
            return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target) ? void 0 : (b._setFocus(), 
            !1);
        },
        _parseMarkup: function(b, c, d) {
            var e;
            d.data && (c = a.extend(d.data, c)), y(l, [ b, c, d ]), a.each(c, function(a, c) {
                if (void 0 === c || c === !1) return !0;
                if (e = a.split("_"), e.length > 1) {
                    var d = b.find(p + "-" + e[0]);
                    if (d.length > 0) {
                        var f = e[1];
                        "replaceWith" === f ? d[0] !== c[0] && d.replaceWith(c) : "img" === f ? d.is("img") ? d.attr("src", c) : d.replaceWith('<img src="' + c + '" class="' + d.attr("class") + '" />') : d.attr(e[1], c);
                    }
                } else b.find(p + "-" + a).html(c);
            });
        },
        _getScrollbarSize: function() {
            if (void 0 === b.scrollbarSize) {
                var a = document.createElement("div");
                a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", 
                document.body.appendChild(a), b.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a);
            }
            return b.scrollbarSize;
        }
    }, a.magnificPopup = {
        instance: null,
        proto: t.prototype,
        modules: [],
        open: function(b, c) {
            return A(), b = b ? a.extend(!0, {}, b) : {}, b.isObj = !0, b.index = c || 0, this.instance.open(b);
        },
        close: function() {
            return a.magnificPopup.instance && a.magnificPopup.instance.close();
        },
        registerModule: function(b, c) {
            c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), 
            this.modules.push(b);
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, a.fn.magnificPopup = function(c) {
        A();
        var d = a(this);
        if ("string" == typeof c) if ("open" === c) {
            var e, f = u ? d.data("magnificPopup") : d[0].magnificPopup, g = parseInt(arguments[1], 10) || 0;
            f.items ? e = f.items[g] : (e = d, f.delegate && (e = e.find(f.delegate)), e = e.eq(g)), 
            b._openClick({
                mfpEl: e
            }, d, f);
        } else b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1)); else c = a.extend(!0, {}, c), 
        u ? d.data("magnificPopup", c) : d[0].magnificPopup = c, b.addGroup(d, c);
        return d;
    };
    var C, D, E, F = "inline", G = function() {
        E && (D.after(E.addClass(C)).detach(), E = null);
    };
    a.magnificPopup.registerModule(F, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                b.types.push(F), w(h + "." + F, function() {
                    G();
                });
            },
            getInline: function(c, d) {
                if (G(), c.src) {
                    var e = b.st.inline, f = a(c.src);
                    if (f.length) {
                        var g = f[0].parentNode;
                        g && g.tagName && (D || (C = e.hiddenClass, D = x(C), C = "mfp-" + C), E = f.after(D).detach().removeClass(C)), 
                        b.updateStatus("ready");
                    } else b.updateStatus("error", e.tNotFound), f = a("<div>");
                    return c.inlineElement = f, f;
                }
                return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d;
            }
        }
    });
    var H, I = "ajax", J = function() {
        H && a(document.body).removeClass(H);
    }, K = function() {
        J(), b.req && b.req.abort();
    };
    a.magnificPopup.registerModule(I, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                b.types.push(I), H = b.st.ajax.cursor, w(h + "." + I, K), w("BeforeChange." + I, K);
            },
            getAjax: function(c) {
                H && a(document.body).addClass(H), b.updateStatus("loading");
                var d = a.extend({
                    url: c.src,
                    success: function(d, e, f) {
                        var g = {
                            data: d,
                            xhr: f
                        };
                        y("ParseAjax", g), b.appendContent(a(g.data), I), c.finished = !0, J(), b._setFocus(), 
                        setTimeout(function() {
                            b.wrap.addClass(q);
                        }, 16), b.updateStatus("ready"), y("AjaxContentAdded");
                    },
                    error: function() {
                        J(), c.finished = c.loadError = !0, b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src));
                    }
                }, b.st.ajax.settings);
                return b.req = a.ajax(d), "";
            }
        }
    });
    var L, M = function(c) {
        if (c.data && void 0 !== c.data.title) return c.data.title;
        var d = b.st.image.titleSrc;
        if (d) {
            if (a.isFunction(d)) return d.call(b, c);
            if (c.el) return c.el.attr(d) || "";
        }
        return "";
    };
    a.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var c = b.st.image, d = ".image";
                b.types.push("image"), w(m + d, function() {
                    "image" === b.currItem.type && c.cursor && a(document.body).addClass(c.cursor);
                }), w(h + d, function() {
                    c.cursor && a(document.body).removeClass(c.cursor), v.off("resize" + p);
                }), w("Resize" + d, b.resizeImage), b.isLowIE && w("AfterChange", b.resizeImage);
            },
            resizeImage: function() {
                var a = b.currItem;
                if (a && a.img && b.st.image.verticalFit) {
                    var c = 0;
                    b.isLowIE && (c = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), 
                    a.img.css("max-height", b.wH - c);
                }
            },
            _onImageHasSize: function(a) {
                a.img && (a.hasSize = !0, L && clearInterval(L), a.isCheckingImgSize = !1, y("ImageHasSize", a), 
                a.imgHidden && (b.content && b.content.removeClass("mfp-loading"), a.imgHidden = !1));
            },
            findImageSize: function(a) {
                var c = 0, d = a.img[0], e = function(f) {
                    L && clearInterval(L), L = setInterval(function() {
                        return d.naturalWidth > 0 ? void b._onImageHasSize(a) : (c > 200 && clearInterval(L), 
                        c++, void (3 === c ? e(10) : 40 === c ? e(50) : 100 === c && e(500)));
                    }, f);
                };
                e(1);
            },
            getImage: function(c, d) {
                var e = 0, f = function() {
                    c && (c.img[0].complete ? (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), 
                    b.updateStatus("ready")), c.hasSize = !0, c.loaded = !0, y("ImageLoadComplete")) : (e++, 
                    200 > e ? setTimeout(f, 100) : g()));
                }, g = function() {
                    c && (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("error", h.tError.replace("%url%", c.src))), 
                    c.hasSize = !0, c.loaded = !0, c.loadError = !0);
                }, h = b.st.image, i = d.find(".mfp-img");
                if (i.length) {
                    var j = document.createElement("img");
                    j.className = "mfp-img", c.el && c.el.find("img").length && (j.alt = c.el.find("img").attr("alt")), 
                    c.img = a(j).on("load.mfploader", f).on("error.mfploader", g), j.src = c.src, i.is("img") && (c.img = c.img.clone()), 
                    j = c.img[0], j.naturalWidth > 0 ? c.hasSize = !0 : j.width || (c.hasSize = !1);
                }
                return b._parseMarkup(d, {
                    title: M(c),
                    img_replaceWith: c.img
                }, c), b.resizeImage(), c.hasSize ? (L && clearInterval(L), c.loadError ? (d.addClass("mfp-loading"), 
                b.updateStatus("error", h.tError.replace("%url%", c.src))) : (d.removeClass("mfp-loading"), 
                b.updateStatus("ready")), d) : (b.updateStatus("loading"), c.loading = !0, c.hasSize || (c.imgHidden = !0, 
                d.addClass("mfp-loading"), b.findImageSize(c)), d);
            }
        }
    });
    var N, O = function() {
        return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform), 
        N;
    };
    a.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(a) {
                return a.is("img") ? a : a.find("img");
            }
        },
        proto: {
            initZoom: function() {
                var a, c = b.st.zoom, d = ".zoom";
                if (c.enabled && b.supportsTransition) {
                    var e, f, g = c.duration, j = function(a) {
                        var b = a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"), d = "all " + c.duration / 1e3 + "s " + c.easing, e = {
                            position: "fixed",
                            zIndex: 9999,
                            left: 0,
                            top: 0,
                            "-webkit-backface-visibility": "hidden"
                        }, f = "transition";
                        return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, b.css(e), b;
                    }, k = function() {
                        b.content.css("visibility", "visible");
                    };
                    w("BuildControls" + d, function() {
                        if (b._allowZoom()) {
                            if (clearTimeout(e), b.content.css("visibility", "hidden"), a = b._getItemToZoom(), 
                            !a) return void k();
                            f = j(a), f.css(b._getOffset()), b.wrap.append(f), e = setTimeout(function() {
                                f.css(b._getOffset(!0)), e = setTimeout(function() {
                                    k(), setTimeout(function() {
                                        f.remove(), a = f = null, y("ZoomAnimationEnded");
                                    }, 16);
                                }, g);
                            }, 16);
                        }
                    }), w(i + d, function() {
                        if (b._allowZoom()) {
                            if (clearTimeout(e), b.st.removalDelay = g, !a) {
                                if (a = b._getItemToZoom(), !a) return;
                                f = j(a);
                            }
                            f.css(b._getOffset(!0)), b.wrap.append(f), b.content.css("visibility", "hidden"), 
                            setTimeout(function() {
                                f.css(b._getOffset());
                            }, 16);
                        }
                    }), w(h + d, function() {
                        b._allowZoom() && (k(), f && f.remove(), a = null);
                    });
                }
            },
            _allowZoom: function() {
                return "image" === b.currItem.type;
            },
            _getItemToZoom: function() {
                return b.currItem.hasSize ? b.currItem.img : !1;
            },
            _getOffset: function(c) {
                var d;
                d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
                var e = d.offset(), f = parseInt(d.css("padding-top"), 10), g = parseInt(d.css("padding-bottom"), 10);
                e.top -= a(window).scrollTop() - f;
                var h = {
                    width: d.width(),
                    height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f
                };
                return O() ? h["-moz-transform"] = h.transform = "translate(" + e.left + "px," + e.top + "px)" : (h.left = e.left, 
                h.top = e.top), h;
            }
        }
    });
    var P = "iframe", Q = "//about:blank", R = function(a) {
        if (b.currTemplate[P]) {
            var c = b.currTemplate[P].find("iframe");
            c.length && (a || (c[0].src = Q), b.isIE8 && c.css("display", a ? "block" : "none"));
        }
    };
    a.magnificPopup.registerModule(P, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                b.types.push(P), w("BeforeChange", function(a, b, c) {
                    b !== c && (b === P ? R() : c === P && R(!0));
                }), w(h + "." + P, function() {
                    R();
                });
            },
            getIframe: function(c, d) {
                var e = c.src, f = b.st.iframe;
                a.each(f.patterns, function() {
                    return e.indexOf(this.index) > -1 ? (this.id && (e = "string" == typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length) : this.id.call(this, e)), 
                    e = this.src.replace("%id%", e), !1) : void 0;
                });
                var g = {};
                return f.srcAction && (g[f.srcAction] = e), b._parseMarkup(d, g, c), b.updateStatus("ready"), 
                d;
            }
        }
    });
    var S = function(a) {
        var c = b.items.length;
        return a > c - 1 ? a - c : 0 > a ? c + a : a;
    }, T = function(a, b, c) {
        return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c);
    };
    a.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [ 0, 2 ],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var c = b.st.gallery, e = ".mfp-gallery", g = Boolean(a.fn.mfpFastClick);
                return b.direction = !0, c && c.enabled ? (f += " mfp-gallery", w(m + e, function() {
                    c.navigateByImgClick && b.wrap.on("click" + e, ".mfp-img", function() {
                        return b.items.length > 1 ? (b.next(), !1) : void 0;
                    }), d.on("keydown" + e, function(a) {
                        37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next();
                    });
                }), w("UpdateStatus" + e, function(a, c) {
                    c.text && (c.text = T(c.text, b.currItem.index, b.items.length));
                }), w(l + e, function(a, d, e, f) {
                    var g = b.items.length;
                    e.counter = g > 1 ? T(c.tCounter, f.index, g) : "";
                }), w("BuildControls" + e, function() {
                    if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                        var d = c.arrowMarkup, e = b.arrowLeft = a(d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(s), f = b.arrowRight = a(d.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(s), h = g ? "mfpFastClick" : "click";
                        e[h](function() {
                            b.prev();
                        }), f[h](function() {
                            b.next();
                        }), b.isIE7 && (x("b", e[0], !1, !0), x("a", e[0], !1, !0), x("b", f[0], !1, !0), 
                        x("a", f[0], !1, !0)), b.container.append(e.add(f));
                    }
                }), w(n + e, function() {
                    b._preloadTimeout && clearTimeout(b._preloadTimeout), b._preloadTimeout = setTimeout(function() {
                        b.preloadNearbyImages(), b._preloadTimeout = null;
                    }, 16);
                }), void w(h + e, function() {
                    d.off(e), b.wrap.off("click" + e), b.arrowLeft && g && b.arrowLeft.add(b.arrowRight).destroyMfpFastClick(), 
                    b.arrowRight = b.arrowLeft = null;
                })) : !1;
            },
            next: function() {
                b.direction = !0, b.index = S(b.index + 1), b.updateItemHTML();
            },
            prev: function() {
                b.direction = !1, b.index = S(b.index - 1), b.updateItemHTML();
            },
            goTo: function(a) {
                b.direction = a >= b.index, b.index = a, b.updateItemHTML();
            },
            preloadNearbyImages: function() {
                var a, c = b.st.gallery.preload, d = Math.min(c[0], b.items.length), e = Math.min(c[1], b.items.length);
                for (a = 1; a <= (b.direction ? e : d); a++) b._preloadItem(b.index + a);
                for (a = 1; a <= (b.direction ? d : e); a++) b._preloadItem(b.index - a);
            },
            _preloadItem: function(c) {
                if (c = S(c), !b.items[c].preloaded) {
                    var d = b.items[c];
                    d.parsed || (d = b.parseEl(c)), y("LazyLoad", d), "image" === d.type && (d.img = a('<img class="mfp-img" />').on("load.mfploader", function() {
                        d.hasSize = !0;
                    }).on("error.mfploader", function() {
                        d.hasSize = !0, d.loadError = !0, y("LazyLoadError", d);
                    }).attr("src", d.src)), d.preloaded = !0;
                }
            }
        }
    });
    var U = "retina";
    a.magnificPopup.registerModule(U, {
        options: {
            replaceSrc: function(a) {
                return a.src.replace(/\.\w+$/, function(a) {
                    return "@2x" + a;
                });
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var a = b.st.retina, c = a.ratio;
                    c = isNaN(c) ? c() : c, c > 1 && (w("ImageHasSize." + U, function(a, b) {
                        b.img.css({
                            "max-width": b.img[0].naturalWidth / c,
                            width: "100%"
                        });
                    }), w("ElementParse." + U, function(b, d) {
                        d.src = a.replaceSrc(d, c);
                    }));
                }
            }
        }
    }), function() {
        var b = 1e3, c = "ontouchstart" in window, d = function() {
            v.off("touchmove" + f + " touchend" + f);
        }, e = "mfpFastClick", f = "." + e;
        a.fn.mfpFastClick = function(e) {
            return a(this).each(function() {
                var g, h = a(this);
                if (c) {
                    var i, j, k, l, m, n;
                    h.on("touchstart" + f, function(a) {
                        l = !1, n = 1, m = a.originalEvent ? a.originalEvent.touches[0] : a.touches[0], 
                        j = m.clientX, k = m.clientY, v.on("touchmove" + f, function(a) {
                            m = a.originalEvent ? a.originalEvent.touches : a.touches, n = m.length, m = m[0], 
                            (Math.abs(m.clientX - j) > 10 || Math.abs(m.clientY - k) > 10) && (l = !0, d());
                        }).on("touchend" + f, function(a) {
                            d(), l || n > 1 || (g = !0, a.preventDefault(), clearTimeout(i), i = setTimeout(function() {
                                g = !1;
                            }, b), e());
                        });
                    });
                }
                h.on("click" + f, function() {
                    g || e();
                });
            });
        }, a.fn.destroyMfpFastClick = function() {
            a(this).off("touchstart" + f + " click" + f), c && v.off("touchmove" + f + " touchend" + f);
        };
    }(), A();
});

/*!
Waypoints - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
!function() {
    "use strict";
    function t(o) {
        if (!o) throw new Error("No options passed to Waypoint constructor");
        if (!o.element) throw new Error("No element option passed to Waypoint constructor");
        if (!o.handler) throw new Error("No handler option passed to Waypoint constructor");
        this.key = "waypoint-" + e, this.options = t.Adapter.extend({}, t.defaults, o), 
        this.element = this.options.element, this.adapter = new t.Adapter(this.element), 
        this.callback = o.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", 
        this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({
            name: this.options.group,
            axis: this.axis
        }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), 
        this.group.add(this), this.context.add(this), i[this.key] = this, e += 1;
    }
    var e = 0, i = {};
    t.prototype.queueTrigger = function(t) {
        this.group.queueTrigger(this, t);
    }, t.prototype.trigger = function(t) {
        this.enabled && this.callback && this.callback.apply(this, t);
    }, t.prototype.destroy = function() {
        this.context.remove(this), this.group.remove(this), delete i[this.key];
    }, t.prototype.disable = function() {
        return this.enabled = !1, this;
    }, t.prototype.enable = function() {
        return this.context.refresh(), this.enabled = !0, this;
    }, t.prototype.next = function() {
        return this.group.next(this);
    }, t.prototype.previous = function() {
        return this.group.previous(this);
    }, t.invokeAll = function(t) {
        var e = [];
        for (var o in i) e.push(i[o]);
        for (var n = 0, r = e.length; r > n; n++) e[n][t]();
    }, t.destroyAll = function() {
        t.invokeAll("destroy");
    }, t.disableAll = function() {
        t.invokeAll("disable");
    }, t.enableAll = function() {
        t.invokeAll("enable");
    }, t.refreshAll = function() {
        t.Context.refreshAll();
    }, t.viewportHeight = function() {
        return window.innerHeight || document.documentElement.clientHeight;
    }, t.viewportWidth = function() {
        return document.documentElement.clientWidth;
    }, t.adapters = [], t.defaults = {
        context: window,
        continuous: !0,
        enabled: !0,
        group: "default",
        horizontal: !1,
        offset: 0
    }, t.offsetAliases = {
        "bottom-in-view": function() {
            return this.context.innerHeight() - this.adapter.outerHeight();
        },
        "right-in-view": function() {
            return this.context.innerWidth() - this.adapter.outerWidth();
        }
    }, window.Waypoint = t;
}(), function() {
    "use strict";
    function t(t) {
        window.setTimeout(t, 1e3 / 60);
    }
    function e(t) {
        this.element = t, this.Adapter = n.Adapter, this.adapter = new this.Adapter(t), 
        this.key = "waypoint-context-" + i, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
            x: this.adapter.scrollLeft(),
            y: this.adapter.scrollTop()
        }, this.waypoints = {
            vertical: {},
            horizontal: {}
        }, t.waypointContextKey = this.key, o[t.waypointContextKey] = this, i += 1, this.createThrottledScrollHandler(), 
        this.createThrottledResizeHandler();
    }
    var i = 0, o = {}, n = window.Waypoint, r = window.onload;
    e.prototype.add = function(t) {
        var e = t.options.horizontal ? "horizontal" : "vertical";
        this.waypoints[e][t.key] = t, this.refresh();
    }, e.prototype.checkEmpty = function() {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal), e = this.Adapter.isEmptyObject(this.waypoints.vertical);
        t && e && (this.adapter.off(".waypoints"), delete o[this.key]);
    }, e.prototype.createThrottledResizeHandler = function() {
        function t() {
            e.handleResize(), e.didResize = !1;
        }
        var e = this;
        this.adapter.on("resize.waypoints", function() {
            e.didResize || (e.didResize = !0, n.requestAnimationFrame(t));
        });
    }, e.prototype.createThrottledScrollHandler = function() {
        function t() {
            e.handleScroll(), e.didScroll = !1;
        }
        var e = this;
        this.adapter.on("scroll.waypoints", function() {
            (!e.didScroll || n.isTouch) && (e.didScroll = !0, n.requestAnimationFrame(t));
        });
    }, e.prototype.handleResize = function() {
        n.Context.refreshAll();
    }, e.prototype.handleScroll = function() {
        var t = {}, e = {
            horizontal: {
                newScroll: this.adapter.scrollLeft(),
                oldScroll: this.oldScroll.x,
                forward: "right",
                backward: "left"
            },
            vertical: {
                newScroll: this.adapter.scrollTop(),
                oldScroll: this.oldScroll.y,
                forward: "down",
                backward: "up"
            }
        };
        for (var i in e) {
            var o = e[i], n = o.newScroll > o.oldScroll, r = n ? o.forward : o.backward;
            for (var s in this.waypoints[i]) {
                var a = this.waypoints[i][s], l = o.oldScroll < a.triggerPoint, h = o.newScroll >= a.triggerPoint, p = l && h, u = !l && !h;
                (p || u) && (a.queueTrigger(r), t[a.group.id] = a.group);
            }
        }
        for (var c in t) t[c].flushTriggers();
        this.oldScroll = {
            x: e.horizontal.newScroll,
            y: e.vertical.newScroll
        };
    }, e.prototype.innerHeight = function() {
        return this.element == this.element.window ? n.viewportHeight() : this.adapter.innerHeight();
    }, e.prototype.remove = function(t) {
        delete this.waypoints[t.axis][t.key], this.checkEmpty();
    }, e.prototype.innerWidth = function() {
        return this.element == this.element.window ? n.viewportWidth() : this.adapter.innerWidth();
    }, e.prototype.destroy = function() {
        var t = [];
        for (var e in this.waypoints) for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
        for (var o = 0, n = t.length; n > o; o++) t[o].destroy();
    }, e.prototype.refresh = function() {
        var t, e = this.element == this.element.window, i = e ? void 0 : this.adapter.offset(), o = {};
        this.handleScroll(), t = {
            horizontal: {
                contextOffset: e ? 0 : i.left,
                contextScroll: e ? 0 : this.oldScroll.x,
                contextDimension: this.innerWidth(),
                oldScroll: this.oldScroll.x,
                forward: "right",
                backward: "left",
                offsetProp: "left"
            },
            vertical: {
                contextOffset: e ? 0 : i.top,
                contextScroll: e ? 0 : this.oldScroll.y,
                contextDimension: this.innerHeight(),
                oldScroll: this.oldScroll.y,
                forward: "down",
                backward: "up",
                offsetProp: "top"
            }
        };
        for (var r in t) {
            var s = t[r];
            for (var a in this.waypoints[r]) {
                var l, h, p, u, c, d = this.waypoints[r][a], f = d.options.offset, w = d.triggerPoint, y = 0, g = null == w;
                d.element !== d.element.window && (y = d.adapter.offset()[s.offsetProp]), "function" == typeof f ? f = f.apply(d) : "string" == typeof f && (f = parseFloat(f), 
                d.options.offset.indexOf("%") > -1 && (f = Math.ceil(s.contextDimension * f / 100))), 
                l = s.contextScroll - s.contextOffset, d.triggerPoint = y + l - f, h = w < s.oldScroll, 
                p = d.triggerPoint >= s.oldScroll, u = h && p, c = !h && !p, !g && u ? (d.queueTrigger(s.backward), 
                o[d.group.id] = d.group) : !g && c ? (d.queueTrigger(s.forward), o[d.group.id] = d.group) : g && s.oldScroll >= d.triggerPoint && (d.queueTrigger(s.forward), 
                o[d.group.id] = d.group);
            }
        }
        return n.requestAnimationFrame(function() {
            for (var t in o) o[t].flushTriggers();
        }), this;
    }, e.findOrCreateByElement = function(t) {
        return e.findByElement(t) || new e(t);
    }, e.refreshAll = function() {
        for (var t in o) o[t].refresh();
    }, e.findByElement = function(t) {
        return o[t.waypointContextKey];
    }, window.onload = function() {
        r && r(), e.refreshAll();
    }, n.requestAnimationFrame = function(e) {
        var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t;
        i.call(window, e);
    }, n.Context = e;
}(), function() {
    "use strict";
    function t(t, e) {
        return t.triggerPoint - e.triggerPoint;
    }
    function e(t, e) {
        return e.triggerPoint - t.triggerPoint;
    }
    function i(t) {
        this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], 
        this.clearTriggerQueues(), o[this.axis][this.name] = this;
    }
    var o = {
        vertical: {},
        horizontal: {}
    }, n = window.Waypoint;
    i.prototype.add = function(t) {
        this.waypoints.push(t);
    }, i.prototype.clearTriggerQueues = function() {
        this.triggerQueues = {
            up: [],
            down: [],
            left: [],
            right: []
        };
    }, i.prototype.flushTriggers = function() {
        for (var i in this.triggerQueues) {
            var o = this.triggerQueues[i], n = "up" === i || "left" === i;
            o.sort(n ? e : t);
            for (var r = 0, s = o.length; s > r; r += 1) {
                var a = o[r];
                (a.options.continuous || r === o.length - 1) && a.trigger([ i ]);
            }
        }
        this.clearTriggerQueues();
    }, i.prototype.next = function(e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints), o = i === this.waypoints.length - 1;
        return o ? null : this.waypoints[i + 1];
    }, i.prototype.previous = function(e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints);
        return i ? this.waypoints[i - 1] : null;
    }, i.prototype.queueTrigger = function(t, e) {
        this.triggerQueues[e].push(t);
    }, i.prototype.remove = function(t) {
        var e = n.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1);
    }, i.prototype.first = function() {
        return this.waypoints[0];
    }, i.prototype.last = function() {
        return this.waypoints[this.waypoints.length - 1];
    }, i.findOrCreate = function(t) {
        return o[t.axis][t.name] || new i(t);
    }, n.Group = i;
}(), function() {
    "use strict";
    function t(t) {
        this.$element = e(t);
    }
    var e = window.jQuery, i = window.Waypoint;
    e.each([ "innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop" ], function(e, i) {
        t.prototype[i] = function() {
            var t = Array.prototype.slice.call(arguments);
            return this.$element[i].apply(this.$element, t);
        };
    }), e.each([ "extend", "inArray", "isEmptyObject" ], function(i, o) {
        t[o] = e[o];
    }), i.adapters.push({
        name: "jquery",
        Adapter: t
    }), i.Adapter = t;
}(), function() {
    "use strict";
    function t(t) {
        return function() {
            var i = [], o = arguments[0];
            return t.isFunction(arguments[0]) && (o = t.extend({}, arguments[1]), o.handler = arguments[0]), 
            this.each(function() {
                var n = t.extend({}, o, {
                    element: this
                });
                "string" == typeof n.context && (n.context = t(this).closest(n.context)[0]), i.push(new e(n));
            }), i;
        };
    }
    var e = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto));
}();

// Generated by CoffeeScript 1.6.2
/*
jQuery Waypoints - v2.0.3
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function() {
    var t = [].indexOf || function(t) {
        for (var e = 0, n = this.length; e < n; e++) {
            if (e in this && this[e] === t) return e;
        }
        return -1;
    }, e = [].slice;
    (function(t, e) {
        if (typeof define === "function" && define.amd) {
            return define("waypoints", [ "jquery" ], function(n) {
                return e(n, t);
            });
        } else {
            return e(t.jQuery, t);
        }
    })(this, function(n, r) {
        var i, o, l, s, f, u, a, c, h, d, p, y, v, w, g, m;
        i = n(r);
        c = t.call(r, "ontouchstart") >= 0;
        s = {
            horizontal: {},
            vertical: {}
        };
        f = 1;
        a = {};
        u = "waypoints-context-id";
        p = "resize.waypoints";
        y = "scroll.waypoints";
        v = 1;
        w = "waypoints-waypoint-ids";
        g = "waypoint";
        m = "waypoints";
        o = function() {
            function t(t) {
                var e = this;
                this.$element = t;
                this.element = t[0];
                this.didResize = false;
                this.didScroll = false;
                this.id = "context" + f++;
                this.oldScroll = {
                    x: t.scrollLeft(),
                    y: t.scrollTop()
                };
                this.waypoints = {
                    horizontal: {},
                    vertical: {}
                };
                t.data(u, this.id);
                a[this.id] = this;
                t.bind(y, function() {
                    var t;
                    if (!(e.didScroll || c)) {
                        e.didScroll = true;
                        t = function() {
                            e.doScroll();
                            return e.didScroll = false;
                        };
                        return r.setTimeout(t, n[m].settings.scrollThrottle);
                    }
                });
                t.bind(p, function() {
                    var t;
                    if (!e.didResize) {
                        e.didResize = true;
                        t = function() {
                            n[m]("refresh");
                            return e.didResize = false;
                        };
                        return r.setTimeout(t, n[m].settings.resizeThrottle);
                    }
                });
            }
            t.prototype.doScroll = function() {
                var t, e = this;
                t = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                };
                if (c && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
                    n[m]("refresh");
                }
                n.each(t, function(t, r) {
                    var i, o, l;
                    l = [];
                    o = r.newScroll > r.oldScroll;
                    i = o ? r.forward : r.backward;
                    n.each(e.waypoints[t], function(t, e) {
                        var n, i;
                        if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
                            return l.push(e);
                        } else if (r.newScroll < (i = e.offset) && i <= r.oldScroll) {
                            return l.push(e);
                        }
                    });
                    l.sort(function(t, e) {
                        return t.offset - e.offset;
                    });
                    if (!o) {
                        l.reverse();
                    }
                    return n.each(l, function(t, e) {
                        if (e.options.continuous || t === l.length - 1) {
                            return e.trigger([ i ]);
                        }
                    });
                });
                return this.oldScroll = {
                    x: t.horizontal.newScroll,
                    y: t.vertical.newScroll
                };
            };
            t.prototype.refresh = function() {
                var t, e, r, i = this;
                r = n.isWindow(this.element);
                e = this.$element.offset();
                this.doScroll();
                t = {
                    horizontal: {
                        contextOffset: r ? 0 : e.left,
                        contextScroll: r ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left"
                    },
                    vertical: {
                        contextOffset: r ? 0 : e.top,
                        contextScroll: r ? 0 : this.oldScroll.y,
                        contextDimension: r ? n[m]("viewportHeight") : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top"
                    }
                };
                return n.each(t, function(t, e) {
                    return n.each(i.waypoints[t], function(t, r) {
                        var i, o, l, s, f;
                        i = r.options.offset;
                        l = r.offset;
                        o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp];
                        if (n.isFunction(i)) {
                            i = i.apply(r.element);
                        } else if (typeof i === "string") {
                            i = parseFloat(i);
                            if (r.options.offset.indexOf("%") > -1) {
                                i = Math.ceil(e.contextDimension * i / 100);
                            }
                        }
                        r.offset = o - e.contextOffset + e.contextScroll - i;
                        if (r.options.onlyOnScroll && l != null || !r.enabled) {
                            return;
                        }
                        if (l !== null && l < (s = e.oldScroll) && s <= r.offset) {
                            return r.trigger([ e.backward ]);
                        } else if (l !== null && l > (f = e.oldScroll) && f >= r.offset) {
                            return r.trigger([ e.forward ]);
                        } else if (l === null && e.oldScroll >= r.offset) {
                            return r.trigger([ e.forward ]);
                        }
                    });
                });
            };
            t.prototype.checkEmpty = function() {
                if (n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical)) {
                    this.$element.unbind([ p, y ].join(" "));
                    return delete a[this.id];
                }
            };
            return t;
        }();
        l = function() {
            function t(t, e, r) {
                var i, o;
                r = n.extend({}, n.fn[g].defaults, r);
                if (r.offset === "bottom-in-view") {
                    r.offset = function() {
                        var t;
                        t = n[m]("viewportHeight");
                        if (!n.isWindow(e.element)) {
                            t = e.$element.height();
                        }
                        return t - n(this).outerHeight();
                    };
                }
                this.$element = t;
                this.element = t[0];
                this.axis = r.horizontal ? "horizontal" : "vertical";
                this.callback = r.handler;
                this.context = e;
                this.enabled = r.enabled;
                this.id = "waypoints" + v++;
                this.offset = null;
                this.options = r;
                e.waypoints[this.axis][this.id] = this;
                s[this.axis][this.id] = this;
                i = (o = t.data(w)) != null ? o : [];
                i.push(this.id);
                t.data(w, i);
            }
            t.prototype.trigger = function(t) {
                if (!this.enabled) {
                    return;
                }
                if (this.callback != null) {
                    this.callback.apply(this.element, t);
                }
                if (this.options.triggerOnce) {
                    return this.destroy();
                }
            };
            t.prototype.disable = function() {
                return this.enabled = false;
            };
            t.prototype.enable = function() {
                this.context.refresh();
                return this.enabled = true;
            };
            t.prototype.destroy = function() {
                delete s[this.axis][this.id];
                delete this.context.waypoints[this.axis][this.id];
                return this.context.checkEmpty();
            };
            t.getWaypointsByElement = function(t) {
                var e, r;
                r = n(t).data(w);
                if (!r) {
                    return [];
                }
                e = n.extend({}, s.horizontal, s.vertical);
                return n.map(r, function(t) {
                    return e[t];
                });
            };
            return t;
        }();
        d = {
            init: function(t, e) {
                var r;
                if (e == null) {
                    e = {};
                }
                if ((r = e.handler) == null) {
                    e.handler = t;
                }
                this.each(function() {
                    var t, r, i, s;
                    t = n(this);
                    i = (s = e.context) != null ? s : n.fn[g].defaults.context;
                    if (!n.isWindow(i)) {
                        i = t.closest(i);
                    }
                    i = n(i);
                    r = a[i.data(u)];
                    if (!r) {
                        r = new o(i);
                    }
                    return new l(t, r, e);
                });
                n[m]("refresh");
                return this;
            },
            disable: function() {
                return d._invoke(this, "disable");
            },
            enable: function() {
                return d._invoke(this, "enable");
            },
            destroy: function() {
                return d._invoke(this, "destroy");
            },
            prev: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e > 0) {
                        return t.push(n[e - 1]);
                    }
                });
            },
            next: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e < n.length - 1) {
                        return t.push(n[e + 1]);
                    }
                });
            },
            _traverse: function(t, e, i) {
                var o, l;
                if (t == null) {
                    t = "vertical";
                }
                if (e == null) {
                    e = r;
                }
                l = h.aggregate(e);
                o = [];
                this.each(function() {
                    var e;
                    e = n.inArray(this, l[t]);
                    return i(o, e, l[t]);
                });
                return this.pushStack(o);
            },
            _invoke: function(t, e) {
                t.each(function() {
                    var t;
                    t = l.getWaypointsByElement(this);
                    return n.each(t, function(t, n) {
                        n[e]();
                        return true;
                    });
                });
                return this;
            }
        };
        n.fn[g] = function() {
            var t, r;
            r = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (d[r]) {
                return d[r].apply(this, t);
            } else if (n.isFunction(r)) {
                return d.init.apply(this, arguments);
            } else if (n.isPlainObject(r)) {
                return d.init.apply(this, [ null, r ]);
            } else if (!r) {
                return n.error("jQuery Waypoints needs a callback function or handler option.");
            } else {
                return n.error("The " + r + " method does not exist in jQuery Waypoints.");
            }
        };
        n.fn[g].defaults = {
            context: r,
            continuous: true,
            enabled: true,
            horizontal: false,
            offset: 0,
            triggerOnce: false
        };
        h = {
            refresh: function() {
                return n.each(a, function(t, e) {
                    return e.refresh();
                });
            },
            viewportHeight: function() {
                var t;
                return (t = r.innerHeight) != null ? t : i.height();
            },
            aggregate: function(t) {
                var e, r, i;
                e = s;
                if (t) {
                    e = (i = a[n(t).data(u)]) != null ? i.waypoints : void 0;
                }
                if (!e) {
                    return [];
                }
                r = {
                    horizontal: [],
                    vertical: []
                };
                n.each(r, function(t, i) {
                    n.each(e[t], function(t, e) {
                        return i.push(e);
                    });
                    i.sort(function(t, e) {
                        return t.offset - e.offset;
                    });
                    r[t] = n.map(i, function(t) {
                        return t.element;
                    });
                    return r[t] = n.unique(r[t]);
                });
                return r;
            },
            above: function(t) {
                if (t == null) {
                    t = r;
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset <= t.oldScroll.y;
                });
            },
            below: function(t) {
                if (t == null) {
                    t = r;
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset > t.oldScroll.y;
                });
            },
            left: function(t) {
                if (t == null) {
                    t = r;
                }
                return h._filter(t, "horizontal", function(t, e) {
                    return e.offset <= t.oldScroll.x;
                });
            },
            right: function(t) {
                if (t == null) {
                    t = r;
                }
                return h._filter(t, "horizontal", function(t, e) {
                    return e.offset > t.oldScroll.x;
                });
            },
            enable: function() {
                return h._invoke("enable");
            },
            disable: function() {
                return h._invoke("disable");
            },
            destroy: function() {
                return h._invoke("destroy");
            },
            extendFn: function(t, e) {
                return d[t] = e;
            },
            _invoke: function(t) {
                var e;
                e = n.extend({}, s.vertical, s.horizontal);
                return n.each(e, function(e, n) {
                    n[t]();
                    return true;
                });
            },
            _filter: function(t, e, r) {
                var i, o;
                i = a[n(t).data(u)];
                if (!i) {
                    return [];
                }
                o = [];
                n.each(i.waypoints[e], function(t, e) {
                    if (r(i, e)) {
                        return o.push(e);
                    }
                });
                o.sort(function(t, e) {
                    return t.offset - e.offset;
                });
                return n.map(o, function(t) {
                    return t.element;
                });
            }
        };
        n[m] = function() {
            var t, n;
            n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (h[n]) {
                return h[n].apply(null, t);
            } else {
                return h.aggregate.call(null, n);
            }
        };
        n[m].settings = {
            resizeThrottle: 100,
            scrollThrottle: 30
        };
        return i.load(function() {
            return n[m]("refresh");
        });
    });
}).call(this);

/*!
* jquery.counterup.js 1.0
*
* Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
* Released under the GPL v2 License
*
* Date: Nov 26, 2013
*/
(function(e) {
    "use strict";
    e.fn.counterUp = function(t) {
        var n = e.extend({
            time: 400,
            delay: 10
        }, t);
        return this.each(function() {
            var t = e(this), r = n, i = function() {
                var e = [], n = r.time / r.delay, i = t.text(), s = /[0-9]+,[0-9]+/.test(i);
                i = i.replace(/,/g, "");
                var o = /^[0-9]+$/.test(i), u = /^[0-9]+\.[0-9]+$/.test(i), a = u ? (i.split(".")[1] || []).length : 0;
                for (var f = n; f >= 1; f--) {
                    var l = parseInt(i / n * f);
                    u && (l = parseFloat(i / n * f).toFixed(a));
                    if (s) while (/(\d+)(\d{3})/.test(l.toString())) l = l.toString().replace(/(\d+)(\d{3})/, "$1,$2");
                    e.unshift(l);
                }
                t.data("counterup-nums", e);
                t.text("0");
                var c = function() {
                    t.text(t.data("counterup-nums").shift());
                    if (t.data("counterup-nums").length) setTimeout(t.data("counterup-func"), r.delay); else {
                        delete t.data("counterup-nums");
                        t.data("counterup-nums", null);
                        t.data("counterup-func", null);
                    }
                };
                t.data("counterup-func", c);
                setTimeout(t.data("counterup-func"), r.delay);
            };
            t.waypoint(i, {
                offset: "100%",
                triggerOnce: !0
            });
        });
    };
})(jQuery);

/*!
 * Isotope PACKAGED v3.0.2
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2016 Metafizzy
 */
!function(t, e) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", [ "jquery" ], function(i) {
        return e(t, i);
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery);
}(window, function(t, e) {
    "use strict";
    function i(i, s, a) {
        function u(t, e, n) {
            var o, s = "$()." + i + '("' + e + '")';
            return t.each(function(t, u) {
                var h = a.data(u, i);
                if (!h) return void r(i + " not initialized. Cannot call methods, i.e. " + s);
                var d = h[e];
                if (!d || "_" == e.charAt(0)) return void r(s + " is not a valid method");
                var l = d.apply(h, n);
                o = void 0 === o ? l : o;
            }), void 0 !== o ? o : t;
        }
        function h(t, e) {
            t.each(function(t, n) {
                var o = a.data(n, i);
                o ? (o.option(e), o._init()) : (o = new s(n, e), a.data(n, i, o));
            });
        }
        a = a || e || t.jQuery, a && (s.prototype.option || (s.prototype.option = function(t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t));
        }), a.fn[i] = function(t) {
            if ("string" == typeof t) {
                var e = o.call(arguments, 1);
                return u(this, t, e);
            }
            return h(this, t), this;
        }, n(a));
    }
    function n(t) {
        !t || t && t.bridget || (t.bridget = i);
    }
    var o = Array.prototype.slice, s = t.console, r = "undefined" == typeof s ? function() {} : function(t) {
        s.error(t);
    };
    return n(e || t.jQuery), i;
}), function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e();
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {}, n = i[t] = i[t] || [];
            return n.indexOf(e) == -1 && n.push(e), this;
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {}, n = i[t] = i[t] || {};
            return n[e] = !0, this;
        }
    }, e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return n != -1 && i.splice(n, 1), this;
        }
    }, e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = 0, o = i[n];
            e = e || [];
            for (var s = this._onceEvents && this._onceEvents[t]; o; ) {
                var r = s && s[o];
                r && (this.off(t, o), delete s[o]), o.apply(this, e), n += r ? 0 : 1, o = i[n];
            }
            return this;
        }
    }, t;
}), function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function() {
        return e();
    }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e();
}(window, function() {
    "use strict";
    function t(t) {
        var e = parseFloat(t), i = t.indexOf("%") == -1 && !isNaN(e);
        return i && e;
    }
    function e() {}
    function i() {
        for (var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        }, e = 0; e < h; e++) {
            var i = u[e];
            t[i] = 0;
        }
        return t;
    }
    function n(t) {
        var e = getComputedStyle(t);
        return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), 
        e;
    }
    function o() {
        if (!d) {
            d = !0;
            var e = document.createElement("div");
            e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", 
            e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var o = n(e);
            s.isBoxSizeOuter = r = 200 == t(o.width), i.removeChild(e);
        }
    }
    function s(e) {
        if (o(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
            var s = n(e);
            if ("none" == s.display) return i();
            var a = {};
            a.width = e.offsetWidth, a.height = e.offsetHeight;
            for (var d = a.isBorderBox = "border-box" == s.boxSizing, l = 0; l < h; l++) {
                var f = u[l], c = s[f], m = parseFloat(c);
                a[f] = isNaN(m) ? 0 : m;
            }
            var p = a.paddingLeft + a.paddingRight, y = a.paddingTop + a.paddingBottom, g = a.marginLeft + a.marginRight, v = a.marginTop + a.marginBottom, _ = a.borderLeftWidth + a.borderRightWidth, I = a.borderTopWidth + a.borderBottomWidth, z = d && r, x = t(s.width);
            x !== !1 && (a.width = x + (z ? 0 : p + _));
            var S = t(s.height);
            return S !== !1 && (a.height = S + (z ? 0 : y + I)), a.innerWidth = a.width - (p + _), 
            a.innerHeight = a.height - (y + I), a.outerWidth = a.width + g, a.outerHeight = a.height + v, 
            a;
        }
    }
    var r, a = "undefined" == typeof console ? e : function(t) {
        console.error(t);
    }, u = [ "paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth" ], h = u.length, d = !1;
    return s;
}), function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e();
}(window, function() {
    "use strict";
    var t = function() {
        var t = Element.prototype;
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (var e = [ "webkit", "moz", "ms", "o" ], i = 0; i < e.length; i++) {
            var n = e[i], o = n + "MatchesSelector";
            if (t[o]) return o;
        }
    }();
    return function(e, i) {
        return e[t](i);
    };
}), function(t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", [ "desandro-matches-selector/matches-selector" ], function(i) {
        return e(t, i);
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector);
}(window, function(t, e) {
    var i = {};
    i.extend = function(t, e) {
        for (var i in e) t[i] = e[i];
        return t;
    }, i.modulo = function(t, e) {
        return (t % e + e) % e;
    }, i.makeArray = function(t) {
        var e = [];
        if (Array.isArray(t)) e = t; else if (t && "number" == typeof t.length) for (var i = 0; i < t.length; i++) e.push(t[i]); else e.push(t);
        return e;
    }, i.removeFrom = function(t, e) {
        var i = t.indexOf(e);
        i != -1 && t.splice(i, 1);
    }, i.getParent = function(t, i) {
        for (;t != document.body; ) if (t = t.parentNode, e(t, i)) return t;
    }, i.getQueryElement = function(t) {
        return "string" == typeof t ? document.querySelector(t) : t;
    }, i.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
    }, i.filterFindElements = function(t, n) {
        t = i.makeArray(t);
        var o = [];
        return t.forEach(function(t) {
            if (t instanceof HTMLElement) {
                if (!n) return void o.push(t);
                e(t, n) && o.push(t);
                for (var i = t.querySelectorAll(n), s = 0; s < i.length; s++) o.push(i[s]);
            }
        }), o;
    }, i.debounceMethod = function(t, e, i) {
        var n = t.prototype[e], o = e + "Timeout";
        t.prototype[e] = function() {
            var t = this[o];
            t && clearTimeout(t);
            var e = arguments, s = this;
            this[o] = setTimeout(function() {
                n.apply(s, e), delete s[o];
            }, i || 100);
        };
    }, i.docReady = function(t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t);
    }, i.toDashed = function(t) {
        return t.replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + "-" + i;
        }).toLowerCase();
    };
    var n = t.console;
    return i.htmlInit = function(e, o) {
        i.docReady(function() {
            var s = i.toDashed(o), r = "data-" + s, a = document.querySelectorAll("[" + r + "]"), u = document.querySelectorAll(".js-" + s), h = i.makeArray(a).concat(i.makeArray(u)), d = r + "-options", l = t.jQuery;
            h.forEach(function(t) {
                var i, s = t.getAttribute(r) || t.getAttribute(d);
                try {
                    i = s && JSON.parse(s);
                } catch (a) {
                    return void (n && n.error("Error parsing " + r + " on " + t.className + ": " + a));
                }
                var u = new e(t, i);
                l && l.data(t, o, u);
            });
        });
    }, i;
}), function(t, e) {
    "function" == typeof define && define.amd ? define("outlayer/item", [ "ev-emitter/ev-emitter", "get-size/get-size" ], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, 
    t.Outlayer.Item = e(t.EvEmitter, t.getSize));
}(window, function(t, e) {
    "use strict";
    function i(t) {
        for (var e in t) return !1;
        return e = null, !0;
    }
    function n(t, e) {
        t && (this.element = t, this.layout = e, this.position = {
            x: 0,
            y: 0
        }, this._create());
    }
    function o(t) {
        return t.replace(/([A-Z])/g, function(t) {
            return "-" + t.toLowerCase();
        });
    }
    var s = document.documentElement.style, r = "string" == typeof s.transition ? "transition" : "WebkitTransition", a = "string" == typeof s.transform ? "transform" : "WebkitTransform", u = {
        WebkitTransition: "webkitTransitionEnd",
        transition: "transitionend"
    }[r], h = {
        transform: a,
        transition: r,
        transitionDuration: r + "Duration",
        transitionProperty: r + "Property",
        transitionDelay: r + "Delay"
    }, d = n.prototype = Object.create(t.prototype);
    d.constructor = n, d._create = function() {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        }, this.css({
            position: "absolute"
        });
    }, d.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
    }, d.getSize = function() {
        this.size = e(this.element);
    }, d.css = function(t) {
        var e = this.element.style;
        for (var i in t) {
            var n = h[i] || i;
            e[n] = t[i];
        }
    }, d.getPosition = function() {
        var t = getComputedStyle(this.element), e = this.layout._getOption("originLeft"), i = this.layout._getOption("originTop"), n = t[e ? "left" : "right"], o = t[i ? "top" : "bottom"], s = this.layout.size, r = n.indexOf("%") != -1 ? parseFloat(n) / 100 * s.width : parseInt(n, 10), a = o.indexOf("%") != -1 ? parseFloat(o) / 100 * s.height : parseInt(o, 10);
        r = isNaN(r) ? 0 : r, a = isNaN(a) ? 0 : a, r -= e ? s.paddingLeft : s.paddingRight, 
        a -= i ? s.paddingTop : s.paddingBottom, this.position.x = r, this.position.y = a;
    }, d.layoutPosition = function() {
        var t = this.layout.size, e = {}, i = this.layout._getOption("originLeft"), n = this.layout._getOption("originTop"), o = i ? "paddingLeft" : "paddingRight", s = i ? "left" : "right", r = i ? "right" : "left", a = this.position.x + t[o];
        e[s] = this.getXValue(a), e[r] = "";
        var u = n ? "paddingTop" : "paddingBottom", h = n ? "top" : "bottom", d = n ? "bottom" : "top", l = this.position.y + t[u];
        e[h] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [ this ]);
    }, d.getXValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px";
    }, d.getYValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px";
    }, d._transitionTo = function(t, e) {
        this.getPosition();
        var i = this.position.x, n = this.position.y, o = parseInt(t, 10), s = parseInt(e, 10), r = o === this.position.x && s === this.position.y;
        if (this.setPosition(t, e), r && !this.isTransitioning) return void this.layoutPosition();
        var a = t - i, u = e - n, h = {};
        h.transform = this.getTranslate(a, u), this.transition({
            to: h,
            onTransitionEnd: {
                transform: this.layoutPosition
            },
            isCleaning: !0
        });
    }, d.getTranslate = function(t, e) {
        var i = this.layout._getOption("originLeft"), n = this.layout._getOption("originTop");
        return t = i ? t : -t, e = n ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)";
    }, d.goTo = function(t, e) {
        this.setPosition(t, e), this.layoutPosition();
    }, d.moveTo = d._transitionTo, d.setPosition = function(t, e) {
        this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10);
    }, d._nonTransition = function(t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this);
    }, d.transition = function(t) {
        if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
            this.css(t.from);
            var n = this.element.offsetHeight;
            n = null;
        }
        this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0;
    };
    var l = "opacity," + o(a);
    d.enableTransition = function() {
        if (!this.isTransitioning) {
            var t = this.layout.options.transitionDuration;
            t = "number" == typeof t ? t + "ms" : t, this.css({
                transitionProperty: l,
                transitionDuration: t,
                transitionDelay: this.staggerDelay || 0
            }), this.element.addEventListener(u, this, !1);
        }
    }, d.onwebkitTransitionEnd = function(t) {
        this.ontransitionend(t);
    }, d.onotransitionend = function(t) {
        this.ontransitionend(t);
    };
    var f = {
        "-webkit-transform": "transform"
    };
    d.ontransitionend = function(t) {
        if (t.target === this.element) {
            var e = this._transn, n = f[t.propertyName] || t.propertyName;
            if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", 
            delete e.clean[n]), n in e.onEnd) {
                var o = e.onEnd[n];
                o.call(this), delete e.onEnd[n];
            }
            this.emitEvent("transitionEnd", [ this ]);
        }
    }, d.disableTransition = function() {
        this.removeTransitionStyles(), this.element.removeEventListener(u, this, !1), this.isTransitioning = !1;
    }, d._removeStyles = function(t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e);
    };
    var c = {
        transitionProperty: "",
        transitionDuration: "",
        transitionDelay: ""
    };
    return d.removeTransitionStyles = function() {
        this.css(c);
    }, d.stagger = function(t) {
        t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms";
    }, d.removeElem = function() {
        this.element.parentNode.removeChild(this.element), this.css({
            display: ""
        }), this.emitEvent("remove", [ this ]);
    }, d.remove = function() {
        return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
            this.removeElem();
        }), void this.hide()) : void this.removeElem();
    }, d.reveal = function() {
        delete this.isHidden, this.css({
            display: ""
        });
        var t = this.layout.options, e = {}, i = this.getHideRevealTransitionEndProperty("visibleStyle");
        e[i] = this.onRevealTransitionEnd, this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e
        });
    }, d.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent("reveal");
    }, d.getHideRevealTransitionEndProperty = function(t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i;
    }, d.hide = function() {
        this.isHidden = !0, this.css({
            display: ""
        });
        var t = this.layout.options, e = {}, i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        e[i] = this.onHideTransitionEnd, this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e
        });
    }, d.onHideTransitionEnd = function() {
        this.isHidden && (this.css({
            display: "none"
        }), this.emitEvent("hide"));
    }, d.destroy = function() {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        });
    }, n;
}), function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", [ "ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item" ], function(i, n, o, s) {
        return e(t, i, n, o, s);
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item);
}(window, function(t, e, i, n, o) {
    "use strict";
    function s(t, e) {
        var i = n.getQueryElement(t);
        if (!i) return void (u && u.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
        this.element = i, h && (this.$element = h(this.element)), this.options = n.extend({}, this.constructor.defaults), 
        this.option(e);
        var o = ++l;
        this.element.outlayerGUID = o, f[o] = this, this._create();
        var s = this._getOption("initLayout");
        s && this.layout();
    }
    function r(t) {
        function e() {
            t.apply(this, arguments);
        }
        return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e;
    }
    function a(t) {
        if ("number" == typeof t) return t;
        var e = t.match(/(^\d*\.?\d*)(\w*)/), i = e && e[1], n = e && e[2];
        if (!i.length) return 0;
        i = parseFloat(i);
        var o = m[n] || 1;
        return i * o;
    }
    var u = t.console, h = t.jQuery, d = function() {}, l = 0, f = {};
    s.namespace = "outlayer", s.Item = o, s.defaults = {
        containerStyle: {
            position: "relative"
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    };
    var c = s.prototype;
    n.extend(c, e.prototype), c.option = function(t) {
        n.extend(this.options, t);
    }, c._getOption = function(t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e] ? this.options[e] : this.options[t];
    }, s.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, c._create = function() {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize();
    }, c.reloadItems = function() {
        this.items = this._itemize(this.element.children);
    }, c._itemize = function(t) {
        for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) {
            var s = e[o], r = new i(s, this);
            n.push(r);
        }
        return n;
    }, c._filterFindItemElements = function(t) {
        return n.filterFindElements(t, this.options.itemSelector);
    }, c.getItemElements = function() {
        return this.items.map(function(t) {
            return t.element;
        });
    }, c.layout = function() {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"), e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), this._isLayoutInited = !0;
    }, c._init = c.layout, c._resetLayout = function() {
        this.getSize();
    }, c.getSize = function() {
        this.size = i(this.element);
    }, c._getMeasurement = function(t, e) {
        var n, o = this.options[t];
        o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o), 
        this[t] = n ? i(n)[e] : o) : this[t] = 0;
    }, c.layoutItems = function(t, e) {
        t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout();
    }, c._getItemsForLayout = function(t) {
        return t.filter(function(t) {
            return !t.isIgnored;
        });
    }, c._layoutItems = function(t, e) {
        if (this._emitCompleteOnItems("layout", t), t && t.length) {
            var i = [];
            t.forEach(function(t) {
                var n = this._getItemLayoutPosition(t);
                n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n);
            }, this), this._processLayoutQueue(i);
        }
    }, c._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        };
    }, c._processLayoutQueue = function(t) {
        this.updateStagger(), t.forEach(function(t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e);
        }, this);
    }, c.updateStagger = function() {
        var t = this.options.stagger;
        return null === t || void 0 === t ? void (this.stagger = 0) : (this.stagger = a(t), 
        this.stagger);
    }, c._positionItem = function(t, e, i, n, o) {
        n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i));
    }, c._postLayout = function() {
        this.resizeContainer();
    }, c.resizeContainer = function() {
        var t = this._getOption("resizeContainer");
        if (t) {
            var e = this._getContainerSize();
            e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1));
        }
    }, c._getContainerSize = d, c._setContainerMeasure = function(t, e) {
        if (void 0 !== t) {
            var i = this.size;
            i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), 
            t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px";
        }
    }, c._emitCompleteOnItems = function(t, e) {
        function i() {
            o.dispatchEvent(t + "Complete", null, [ e ]);
        }
        function n() {
            r++, r == s && i();
        }
        var o = this, s = e.length;
        if (!e || !s) return void i();
        var r = 0;
        e.forEach(function(e) {
            e.once(t, n);
        });
    }, c.dispatchEvent = function(t, e, i) {
        var n = e ? [ e ].concat(i) : i;
        if (this.emitEvent(t, n), h) if (this.$element = this.$element || h(this.element), 
        e) {
            var o = h.Event(e);
            o.type = t, this.$element.trigger(o, i);
        } else this.$element.trigger(t, i);
    }, c.ignore = function(t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0);
    }, c.unignore = function(t) {
        var e = this.getItem(t);
        e && delete e.isIgnored;
    }, c.stamp = function(t) {
        t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this));
    }, c.unstamp = function(t) {
        t = this._find(t), t && t.forEach(function(t) {
            n.removeFrom(this.stamps, t), this.unignore(t);
        }, this);
    }, c._find = function(t) {
        if (t) return "string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t);
    }, c._manageStamps = function() {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this));
    }, c._getBoundingRect = function() {
        var t = this.element.getBoundingClientRect(), e = this.size;
        this._boundingRect = {
            left: t.left + e.paddingLeft + e.borderLeftWidth,
            top: t.top + e.paddingTop + e.borderTopWidth,
            right: t.right - (e.paddingRight + e.borderRightWidth),
            bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
        };
    }, c._manageStamp = d, c._getElementOffset = function(t) {
        var e = t.getBoundingClientRect(), n = this._boundingRect, o = i(t), s = {
            left: e.left - n.left - o.marginLeft,
            top: e.top - n.top - o.marginTop,
            right: n.right - e.right - o.marginRight,
            bottom: n.bottom - e.bottom - o.marginBottom
        };
        return s;
    }, c.handleEvent = n.handleEvent, c.bindResize = function() {
        t.addEventListener("resize", this), this.isResizeBound = !0;
    }, c.unbindResize = function() {
        t.removeEventListener("resize", this), this.isResizeBound = !1;
    }, c.onresize = function() {
        this.resize();
    }, n.debounceMethod(s, "onresize", 100), c.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout();
    }, c.needsResizeLayout = function() {
        var t = i(this.element), e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth;
    }, c.addItems = function(t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e;
    }, c.appended = function(t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e));
    }, c.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            var i = this.items.slice(0);
            this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), 
            this.reveal(e), this.layoutItems(i);
        }
    }, c.reveal = function(t) {
        if (this._emitCompleteOnItems("reveal", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e), t.reveal();
            });
        }
    }, c.hide = function(t) {
        if (this._emitCompleteOnItems("hide", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e), t.hide();
            });
        }
    }, c.revealItemElements = function(t) {
        var e = this.getItems(t);
        this.reveal(e);
    }, c.hideItemElements = function(t) {
        var e = this.getItems(t);
        this.hide(e);
    }, c.getItem = function(t) {
        for (var e = 0; e < this.items.length; e++) {
            var i = this.items[e];
            if (i.element == t) return i;
        }
    }, c.getItems = function(t) {
        t = n.makeArray(t);
        var e = [];
        return t.forEach(function(t) {
            var i = this.getItem(t);
            i && e.push(i);
        }, this), e;
    }, c.remove = function(t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function(t) {
            t.remove(), n.removeFrom(this.items, t);
        }, this);
    }, c.destroy = function() {
        var t = this.element.style;
        t.height = "", t.position = "", t.width = "", this.items.forEach(function(t) {
            t.destroy();
        }), this.unbindResize();
        var e = this.element.outlayerGUID;
        delete f[e], delete this.element.outlayerGUID, h && h.removeData(this.element, this.constructor.namespace);
    }, s.data = function(t) {
        t = n.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && f[e];
    }, s.create = function(t, e) {
        var i = r(s);
        return i.defaults = n.extend({}, s.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, s.compatOptions), 
        i.namespace = t, i.data = s.data, i.Item = r(o), n.htmlInit(i, t), h && h.bridget && h.bridget(t, i), 
        i;
    };
    var m = {
        ms: 1,
        s: 1e3
    };
    return s.Item = o, s;
}), function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/item", [ "outlayer/outlayer" ], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, 
    t.Isotope.Item = e(t.Outlayer));
}(window, function(t) {
    "use strict";
    function e() {
        t.Item.apply(this, arguments);
    }
    var i = e.prototype = Object.create(t.Item.prototype), n = i._create;
    i._create = function() {
        this.id = this.layout.itemGUID++, n.call(this), this.sortData = {};
    }, i.updateSortData = function() {
        if (!this.isIgnored) {
            this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
            var t = this.layout.options.getSortData, e = this.layout._sorters;
            for (var i in t) {
                var n = e[i];
                this.sortData[i] = n(this.element, this);
            }
        }
    };
    var o = i.destroy;
    return i.destroy = function() {
        o.apply(this, arguments), this.css({
            display: ""
        });
    }, e;
}), function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-mode", [ "get-size/get-size", "outlayer/outlayer" ], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, 
    t.Isotope.LayoutMode = e(t.getSize, t.Outlayer));
}(window, function(t, e) {
    "use strict";
    function i(t) {
        this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, 
        this.items = t.filteredItems, this.size = t.size);
    }
    var n = i.prototype, o = [ "_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption" ];
    return o.forEach(function(t) {
        n[t] = function() {
            return e.prototype[t].apply(this.isotope, arguments);
        };
    }), n.needsVerticalResizeLayout = function() {
        var e = t(this.isotope.element), i = this.isotope.size && e;
        return i && e.innerHeight != this.isotope.size.innerHeight;
    }, n._getMeasurement = function() {
        this.isotope._getMeasurement.apply(this, arguments);
    }, n.getColumnWidth = function() {
        this.getSegmentSize("column", "Width");
    }, n.getRowHeight = function() {
        this.getSegmentSize("row", "Height");
    }, n.getSegmentSize = function(t, e) {
        var i = t + e, n = "outer" + e;
        if (this._getMeasurement(i, n), !this[i]) {
            var o = this.getFirstItemSize();
            this[i] = o && o[n] || this.isotope.size["inner" + e];
        }
    }, n.getFirstItemSize = function() {
        var e = this.isotope.filteredItems[0];
        return e && e.element && t(e.element);
    }, n.layout = function() {
        this.isotope.layout.apply(this.isotope, arguments);
    }, n.getSize = function() {
        this.isotope.getSize(), this.size = this.isotope.size;
    }, i.modes = {}, i.create = function(t, e) {
        function o() {
            i.apply(this, arguments);
        }
        return o.prototype = Object.create(n), o.prototype.constructor = o, e && (o.options = e), 
        o.prototype.namespace = t, i.modes[t] = o, o;
    }, i;
}), function(t, e) {
    "function" == typeof define && define.amd ? define("masonry/masonry", [ "outlayer/outlayer", "get-size/get-size" ], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize);
}(window, function(t, e) {
    var i = t.create("masonry");
    return i.compatOptions.fitWidth = "isFitWidth", i.prototype._resetLayout = function() {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), 
        this.measureColumns(), this.colYs = [];
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0;
    }, i.prototype.measureColumns = function() {
        if (this.getContainerWidth(), !this.columnWidth) {
            var t = this.items[0], i = t && t.element;
            this.columnWidth = i && e(i).outerWidth || this.containerWidth;
        }
        var n = this.columnWidth += this.gutter, o = this.containerWidth + this.gutter, s = o / n, r = n - o % n, a = r && r < 1 ? "round" : "floor";
        s = Math[a](s), this.cols = Math.max(s, 1);
    }, i.prototype.getContainerWidth = function() {
        var t = this._getOption("fitWidth"), i = t ? this.element.parentNode : this.element, n = e(i);
        this.containerWidth = n && n.innerWidth;
    }, i.prototype._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth, i = e && e < 1 ? "round" : "ceil", n = Math[i](t.size.outerWidth / this.columnWidth);
        n = Math.min(n, this.cols);
        for (var o = this._getColGroup(n), s = Math.min.apply(Math, o), r = o.indexOf(s), a = {
            x: this.columnWidth * r,
            y: s
        }, u = s + t.size.outerHeight, h = this.cols + 1 - o.length, d = 0; d < h; d++) this.colYs[r + d] = u;
        return a;
    }, i.prototype._getColGroup = function(t) {
        if (t < 2) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, n = 0; n < i; n++) {
            var o = this.colYs.slice(n, n + t);
            e[n] = Math.max.apply(Math, o);
        }
        return e;
    }, i.prototype._manageStamp = function(t) {
        var i = e(t), n = this._getElementOffset(t), o = this._getOption("originLeft"), s = o ? n.left : n.right, r = s + i.outerWidth, a = Math.floor(s / this.columnWidth);
        a = Math.max(0, a);
        var u = Math.floor(r / this.columnWidth);
        u -= r % this.columnWidth ? 0 : 1, u = Math.min(this.cols - 1, u);
        for (var h = this._getOption("originTop"), d = (h ? n.top : n.bottom) + i.outerHeight, l = a; l <= u; l++) this.colYs[l] = Math.max(d, this.colYs[l]);
    }, i.prototype._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = {
            height: this.maxY
        };
        return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), 
        t;
    }, i.prototype._getContainerFitWidth = function() {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
        return (this.cols - t) * this.columnWidth - this.gutter;
    }, i.prototype.needsResizeLayout = function() {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth;
    }, i;
}), function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", [ "../layout-mode", "masonry/masonry" ], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry);
}(window, function(t, e) {
    "use strict";
    var i = t.create("masonry"), n = i.prototype, o = {
        _getElementOffset: !0,
        layout: !0,
        _getMeasurement: !0
    };
    for (var s in e.prototype) o[s] || (n[s] = e.prototype[s]);
    var r = n.measureColumns;
    n.measureColumns = function() {
        this.items = this.isotope.filteredItems, r.call(this);
    };
    var a = n._getOption;
    return n._getOption = function(t) {
        return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : a.apply(this.isotope, arguments);
    }, i;
}), function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", [ "../layout-mode" ], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode);
}(window, function(t) {
    "use strict";
    var e = t.create("fitRows"), i = e.prototype;
    return i._resetLayout = function() {
        this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth");
    }, i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter, i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
        var n = {
            x: this.x,
            y: this.y
        };
        return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, 
        n;
    }, i._getContainerSize = function() {
        return {
            height: this.maxY
        };
    }, e;
}), function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", [ "../layout-mode" ], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode);
}(window, function(t) {
    "use strict";
    var e = t.create("vertical", {
        horizontalAlignment: 0
    }), i = e.prototype;
    return i._resetLayout = function() {
        this.y = 0;
    }, i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment, i = this.y;
        return this.y += t.size.outerHeight, {
            x: e,
            y: i
        };
    }, i._getContainerSize = function() {
        return {
            height: this.y
        };
    }, e;
}), function(t, e) {
    "function" == typeof define && define.amd ? define([ "outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical" ], function(i, n, o, s, r, a) {
        return e(t, i, n, o, s, r, a);
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope/js/item"), require("isotope/js/layout-mode"), require("isotope/js/layout-modes/masonry"), require("isotope/js/layout-modes/fit-rows"), require("isotope/js/layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode);
}(window, function(t, e, i, n, o, s, r) {
    function a(t, e) {
        return function(i, n) {
            for (var o = 0; o < t.length; o++) {
                var s = t[o], r = i.sortData[s], a = n.sortData[s];
                if (r > a || r < a) {
                    var u = void 0 !== e[s] ? e[s] : e, h = u ? 1 : -1;
                    return (r > a ? 1 : -1) * h;
                }
            }
            return 0;
        };
    }
    var u = t.jQuery, h = String.prototype.trim ? function(t) {
        return t.trim();
    } : function(t) {
        return t.replace(/^\s+|\s+$/g, "");
    }, d = e.create("isotope", {
        layoutMode: "masonry",
        isJQueryFiltering: !0,
        sortAscending: !0
    });
    d.Item = s, d.LayoutMode = r;
    var l = d.prototype;
    l._create = function() {
        this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), 
        this.modes = {}, this.filteredItems = this.items, this.sortHistory = [ "original-order" ];
        for (var t in r.modes) this._initLayoutMode(t);
    }, l.reloadItems = function() {
        this.itemGUID = 0, e.prototype.reloadItems.call(this);
    }, l._itemize = function() {
        for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) {
            var n = t[i];
            n.id = this.itemGUID++;
        }
        return this._updateItemsSortData(t), t;
    }, l._initLayoutMode = function(t) {
        var e = r.modes[t], i = this.options[t] || {};
        this.options[t] = e.options ? o.extend(e.options, i) : i, this.modes[t] = new e(this);
    }, l.layout = function() {
        return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout();
    }, l._layout = function() {
        var t = this._getIsInstant();
        this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), 
        this._isLayoutInited = !0;
    }, l.arrange = function(t) {
        this.option(t), this._getIsInstant();
        var e = this._filter(this.items);
        this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [ e ]) : this._hideReveal(e), 
        this._sort(), this._layout();
    }, l._init = l.arrange, l._hideReveal = function(t) {
        this.reveal(t.needReveal), this.hide(t.needHide);
    }, l._getIsInstant = function() {
        var t = this._getOption("layoutInstant"), e = void 0 !== t ? t : !this._isLayoutInited;
        return this._isInstant = e, e;
    }, l._bindArrangeComplete = function() {
        function t() {
            e && i && n && o.dispatchEvent("arrangeComplete", null, [ o.filteredItems ]);
        }
        var e, i, n, o = this;
        this.once("layoutComplete", function() {
            e = !0, t();
        }), this.once("hideComplete", function() {
            i = !0, t();
        }), this.once("revealComplete", function() {
            n = !0, t();
        });
    }, l._filter = function(t) {
        var e = this.options.filter;
        e = e || "*";
        for (var i = [], n = [], o = [], s = this._getFilterTest(e), r = 0; r < t.length; r++) {
            var a = t[r];
            if (!a.isIgnored) {
                var u = s(a);
                u && i.push(a), u && a.isHidden ? n.push(a) : u || a.isHidden || o.push(a);
            }
        }
        return {
            matches: i,
            needReveal: n,
            needHide: o
        };
    }, l._getFilterTest = function(t) {
        return u && this.options.isJQueryFiltering ? function(e) {
            return u(e.element).is(t);
        } : "function" == typeof t ? function(e) {
            return t(e.element);
        } : function(e) {
            return n(e.element, t);
        };
    }, l.updateSortData = function(t) {
        var e;
        t ? (t = o.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), 
        this._updateItemsSortData(e);
    }, l._getSorters = function() {
        var t = this.options.getSortData;
        for (var e in t) {
            var i = t[e];
            this._sorters[e] = f(i);
        }
    }, l._updateItemsSortData = function(t) {
        for (var e = t && t.length, i = 0; e && i < e; i++) {
            var n = t[i];
            n.updateSortData();
        }
    };
    var f = function() {
        function t(t) {
            if ("string" != typeof t) return t;
            var i = h(t).split(" "), n = i[0], o = n.match(/^\[(.+)\]$/), s = o && o[1], r = e(s, n), a = d.sortDataParsers[i[1]];
            return t = a ? function(t) {
                return t && a(r(t));
            } : function(t) {
                return t && r(t);
            };
        }
        function e(t, e) {
            return t ? function(e) {
                return e.getAttribute(t);
            } : function(t) {
                var i = t.querySelector(e);
                return i && i.textContent;
            };
        }
        return t;
    }();
    d.sortDataParsers = {
        parseInt: function(t) {
            return parseInt(t, 10);
        },
        parseFloat: function(t) {
            return parseFloat(t);
        }
    }, l._sort = function() {
        var t = this.options.sortBy;
        if (t) {
            var e = [].concat.apply(t, this.sortHistory), i = a(e, this.options.sortAscending);
            this.filteredItems.sort(i), t != this.sortHistory[0] && this.sortHistory.unshift(t);
        }
    }, l._mode = function() {
        var t = this.options.layoutMode, e = this.modes[t];
        if (!e) throw new Error("No layout mode: " + t);
        return e.options = this.options[t], e;
    }, l._resetLayout = function() {
        e.prototype._resetLayout.call(this), this._mode()._resetLayout();
    }, l._getItemLayoutPosition = function(t) {
        return this._mode()._getItemLayoutPosition(t);
    }, l._manageStamp = function(t) {
        this._mode()._manageStamp(t);
    }, l._getContainerSize = function() {
        return this._mode()._getContainerSize();
    }, l.needsResizeLayout = function() {
        return this._mode().needsResizeLayout();
    }, l.appended = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i = this._filterRevealAdded(e);
            this.filteredItems = this.filteredItems.concat(i);
        }
    }, l.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            this._resetLayout(), this._manageStamps();
            var i = this._filterRevealAdded(e);
            this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), 
            this.items = e.concat(this.items);
        }
    }, l._filterRevealAdded = function(t) {
        var e = this._filter(t);
        return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), 
        e.matches;
    }, l.insert = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i, n, o = e.length;
            for (i = 0; i < o; i++) n = e[i], this.element.appendChild(n.element);
            var s = this._filter(e).matches;
            for (i = 0; i < o; i++) e[i].isLayoutInstant = !0;
            for (this.arrange(), i = 0; i < o; i++) delete e[i].isLayoutInstant;
            this.reveal(s);
        }
    };
    var c = l.remove;
    return l.remove = function(t) {
        t = o.makeArray(t);
        var e = this.getItems(t);
        c.call(this, t);
        for (var i = e && e.length, n = 0; i && n < i; n++) {
            var s = e[n];
            o.removeFrom(this.filteredItems, s);
        }
    }, l.shuffle = function() {
        for (var t = 0; t < this.items.length; t++) {
            var e = this.items[t];
            e.sortData.random = Math.random();
        }
        this.options.sortBy = "random", this._sort(), this._layout();
    }, l._noTransition = function(t, e) {
        var i = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var n = t.apply(this, e);
        return this.options.transitionDuration = i, n;
    }, l.getFilteredItemElements = function() {
        return this.filteredItems.map(function(t) {
            return t.element;
        });
    }, d;
});

/*!
 * Masonry PACKAGED v4.1.1
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */
!function(t, e) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", [ "jquery" ], function(i) {
        return e(t, i);
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery);
}(window, function(t, e) {
    "use strict";
    function i(i, r, a) {
        function h(t, e, n) {
            var o, r = "$()." + i + '("' + e + '")';
            return t.each(function(t, h) {
                var u = a.data(h, i);
                if (!u) return void s(i + " not initialized. Cannot call methods, i.e. " + r);
                var d = u[e];
                if (!d || "_" == e.charAt(0)) return void s(r + " is not a valid method");
                var l = d.apply(u, n);
                o = void 0 === o ? l : o;
            }), void 0 !== o ? o : t;
        }
        function u(t, e) {
            t.each(function(t, n) {
                var o = a.data(n, i);
                o ? (o.option(e), o._init()) : (o = new r(n, e), a.data(n, i, o));
            });
        }
        a = a || e || t.jQuery, a && (r.prototype.option || (r.prototype.option = function(t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t));
        }), a.fn[i] = function(t) {
            if ("string" == typeof t) {
                var e = o.call(arguments, 1);
                return h(this, t, e);
            }
            return u(this, t), this;
        }, n(a));
    }
    function n(t) {
        !t || t && t.bridget || (t.bridget = i);
    }
    var o = Array.prototype.slice, r = t.console, s = "undefined" == typeof r ? function() {} : function(t) {
        r.error(t);
    };
    return n(e || t.jQuery), i;
}), function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e();
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {}, n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e), this;
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {}, n = i[t] = i[t] || {};
            return n[e] = !0, this;
        }
    }, e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return -1 != n && i.splice(n, 1), this;
        }
    }, e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = 0, o = i[n];
            e = e || [];
            for (var r = this._onceEvents && this._onceEvents[t]; o; ) {
                var s = r && r[o];
                s && (this.off(t, o), delete r[o]), o.apply(this, e), n += s ? 0 : 1, o = i[n];
            }
            return this;
        }
    }, t;
}), function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function() {
        return e();
    }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e();
}(window, function() {
    "use strict";
    function t(t) {
        var e = parseFloat(t), i = -1 == t.indexOf("%") && !isNaN(e);
        return i && e;
    }
    function e() {}
    function i() {
        for (var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        }, e = 0; u > e; e++) {
            var i = h[e];
            t[i] = 0;
        }
        return t;
    }
    function n(t) {
        var e = getComputedStyle(t);
        return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), 
        e;
    }
    function o() {
        if (!d) {
            d = !0;
            var e = document.createElement("div");
            e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", 
            e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var o = n(e);
            r.isBoxSizeOuter = s = 200 == t(o.width), i.removeChild(e);
        }
    }
    function r(e) {
        if (o(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
            var r = n(e);
            if ("none" == r.display) return i();
            var a = {};
            a.width = e.offsetWidth, a.height = e.offsetHeight;
            for (var d = a.isBorderBox = "border-box" == r.boxSizing, l = 0; u > l; l++) {
                var c = h[l], f = r[c], m = parseFloat(f);
                a[c] = isNaN(m) ? 0 : m;
            }
            var p = a.paddingLeft + a.paddingRight, g = a.paddingTop + a.paddingBottom, y = a.marginLeft + a.marginRight, v = a.marginTop + a.marginBottom, _ = a.borderLeftWidth + a.borderRightWidth, E = a.borderTopWidth + a.borderBottomWidth, z = d && s, b = t(r.width);
            b !== !1 && (a.width = b + (z ? 0 : p + _));
            var x = t(r.height);
            return x !== !1 && (a.height = x + (z ? 0 : g + E)), a.innerWidth = a.width - (p + _), 
            a.innerHeight = a.height - (g + E), a.outerWidth = a.width + y, a.outerHeight = a.height + v, 
            a;
        }
    }
    var s, a = "undefined" == typeof console ? e : function(t) {
        console.error(t);
    }, h = [ "paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth" ], u = h.length, d = !1;
    return r;
}), function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e();
}(window, function() {
    "use strict";
    var t = function() {
        var t = Element.prototype;
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (var e = [ "webkit", "moz", "ms", "o" ], i = 0; i < e.length; i++) {
            var n = e[i], o = n + "MatchesSelector";
            if (t[o]) return o;
        }
    }();
    return function(e, i) {
        return e[t](i);
    };
}), function(t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", [ "desandro-matches-selector/matches-selector" ], function(i) {
        return e(t, i);
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector);
}(window, function(t, e) {
    var i = {};
    i.extend = function(t, e) {
        for (var i in e) t[i] = e[i];
        return t;
    }, i.modulo = function(t, e) {
        return (t % e + e) % e;
    }, i.makeArray = function(t) {
        var e = [];
        if (Array.isArray(t)) e = t; else if (t && "number" == typeof t.length) for (var i = 0; i < t.length; i++) e.push(t[i]); else e.push(t);
        return e;
    }, i.removeFrom = function(t, e) {
        var i = t.indexOf(e);
        -1 != i && t.splice(i, 1);
    }, i.getParent = function(t, i) {
        for (;t != document.body; ) if (t = t.parentNode, e(t, i)) return t;
    }, i.getQueryElement = function(t) {
        return "string" == typeof t ? document.querySelector(t) : t;
    }, i.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
    }, i.filterFindElements = function(t, n) {
        t = i.makeArray(t);
        var o = [];
        return t.forEach(function(t) {
            if (t instanceof HTMLElement) {
                if (!n) return void o.push(t);
                e(t, n) && o.push(t);
                for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++) o.push(i[r]);
            }
        }), o;
    }, i.debounceMethod = function(t, e, i) {
        var n = t.prototype[e], o = e + "Timeout";
        t.prototype[e] = function() {
            var t = this[o];
            t && clearTimeout(t);
            var e = arguments, r = this;
            this[o] = setTimeout(function() {
                n.apply(r, e), delete r[o];
            }, i || 100);
        };
    }, i.docReady = function(t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? t() : document.addEventListener("DOMContentLoaded", t);
    }, i.toDashed = function(t) {
        return t.replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + "-" + i;
        }).toLowerCase();
    };
    var n = t.console;
    return i.htmlInit = function(e, o) {
        i.docReady(function() {
            var r = i.toDashed(o), s = "data-" + r, a = document.querySelectorAll("[" + s + "]"), h = document.querySelectorAll(".js-" + r), u = i.makeArray(a).concat(i.makeArray(h)), d = s + "-options", l = t.jQuery;
            u.forEach(function(t) {
                var i, r = t.getAttribute(s) || t.getAttribute(d);
                try {
                    i = r && JSON.parse(r);
                } catch (a) {
                    return void (n && n.error("Error parsing " + s + " on " + t.className + ": " + a));
                }
                var h = new e(t, i);
                l && l.data(t, o, h);
            });
        });
    }, i;
}), function(t, e) {
    "function" == typeof define && define.amd ? define("outlayer/item", [ "ev-emitter/ev-emitter", "get-size/get-size" ], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, 
    t.Outlayer.Item = e(t.EvEmitter, t.getSize));
}(window, function(t, e) {
    "use strict";
    function i(t) {
        for (var e in t) return !1;
        return e = null, !0;
    }
    function n(t, e) {
        t && (this.element = t, this.layout = e, this.position = {
            x: 0,
            y: 0
        }, this._create());
    }
    function o(t) {
        return t.replace(/([A-Z])/g, function(t) {
            return "-" + t.toLowerCase();
        });
    }
    var r = document.documentElement.style, s = "string" == typeof r.transition ? "transition" : "WebkitTransition", a = "string" == typeof r.transform ? "transform" : "WebkitTransform", h = {
        WebkitTransition: "webkitTransitionEnd",
        transition: "transitionend"
    }[s], u = {
        transform: a,
        transition: s,
        transitionDuration: s + "Duration",
        transitionProperty: s + "Property",
        transitionDelay: s + "Delay"
    }, d = n.prototype = Object.create(t.prototype);
    d.constructor = n, d._create = function() {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        }, this.css({
            position: "absolute"
        });
    }, d.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
    }, d.getSize = function() {
        this.size = e(this.element);
    }, d.css = function(t) {
        var e = this.element.style;
        for (var i in t) {
            var n = u[i] || i;
            e[n] = t[i];
        }
    }, d.getPosition = function() {
        var t = getComputedStyle(this.element), e = this.layout._getOption("originLeft"), i = this.layout._getOption("originTop"), n = t[e ? "left" : "right"], o = t[i ? "top" : "bottom"], r = this.layout.size, s = -1 != n.indexOf("%") ? parseFloat(n) / 100 * r.width : parseInt(n, 10), a = -1 != o.indexOf("%") ? parseFloat(o) / 100 * r.height : parseInt(o, 10);
        s = isNaN(s) ? 0 : s, a = isNaN(a) ? 0 : a, s -= e ? r.paddingLeft : r.paddingRight, 
        a -= i ? r.paddingTop : r.paddingBottom, this.position.x = s, this.position.y = a;
    }, d.layoutPosition = function() {
        var t = this.layout.size, e = {}, i = this.layout._getOption("originLeft"), n = this.layout._getOption("originTop"), o = i ? "paddingLeft" : "paddingRight", r = i ? "left" : "right", s = i ? "right" : "left", a = this.position.x + t[o];
        e[r] = this.getXValue(a), e[s] = "";
        var h = n ? "paddingTop" : "paddingBottom", u = n ? "top" : "bottom", d = n ? "bottom" : "top", l = this.position.y + t[h];
        e[u] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [ this ]);
    }, d.getXValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px";
    }, d.getYValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px";
    }, d._transitionTo = function(t, e) {
        this.getPosition();
        var i = this.position.x, n = this.position.y, o = parseInt(t, 10), r = parseInt(e, 10), s = o === this.position.x && r === this.position.y;
        if (this.setPosition(t, e), s && !this.isTransitioning) return void this.layoutPosition();
        var a = t - i, h = e - n, u = {};
        u.transform = this.getTranslate(a, h), this.transition({
            to: u,
            onTransitionEnd: {
                transform: this.layoutPosition
            },
            isCleaning: !0
        });
    }, d.getTranslate = function(t, e) {
        var i = this.layout._getOption("originLeft"), n = this.layout._getOption("originTop");
        return t = i ? t : -t, e = n ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)";
    }, d.goTo = function(t, e) {
        this.setPosition(t, e), this.layoutPosition();
    }, d.moveTo = d._transitionTo, d.setPosition = function(t, e) {
        this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10);
    }, d._nonTransition = function(t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this);
    }, d.transition = function(t) {
        if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
            this.css(t.from);
            var n = this.element.offsetHeight;
            n = null;
        }
        this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0;
    };
    var l = "opacity," + o(a);
    d.enableTransition = function() {
        if (!this.isTransitioning) {
            var t = this.layout.options.transitionDuration;
            t = "number" == typeof t ? t + "ms" : t, this.css({
                transitionProperty: l,
                transitionDuration: t,
                transitionDelay: this.staggerDelay || 0
            }), this.element.addEventListener(h, this, !1);
        }
    }, d.onwebkitTransitionEnd = function(t) {
        this.ontransitionend(t);
    }, d.onotransitionend = function(t) {
        this.ontransitionend(t);
    };
    var c = {
        "-webkit-transform": "transform"
    };
    d.ontransitionend = function(t) {
        if (t.target === this.element) {
            var e = this._transn, n = c[t.propertyName] || t.propertyName;
            if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", 
            delete e.clean[n]), n in e.onEnd) {
                var o = e.onEnd[n];
                o.call(this), delete e.onEnd[n];
            }
            this.emitEvent("transitionEnd", [ this ]);
        }
    }, d.disableTransition = function() {
        this.removeTransitionStyles(), this.element.removeEventListener(h, this, !1), this.isTransitioning = !1;
    }, d._removeStyles = function(t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e);
    };
    var f = {
        transitionProperty: "",
        transitionDuration: "",
        transitionDelay: ""
    };
    return d.removeTransitionStyles = function() {
        this.css(f);
    }, d.stagger = function(t) {
        t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms";
    }, d.removeElem = function() {
        this.element.parentNode.removeChild(this.element), this.css({
            display: ""
        }), this.emitEvent("remove", [ this ]);
    }, d.remove = function() {
        return s && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
            this.removeElem();
        }), void this.hide()) : void this.removeElem();
    }, d.reveal = function() {
        delete this.isHidden, this.css({
            display: ""
        });
        var t = this.layout.options, e = {}, i = this.getHideRevealTransitionEndProperty("visibleStyle");
        e[i] = this.onRevealTransitionEnd, this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e
        });
    }, d.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent("reveal");
    }, d.getHideRevealTransitionEndProperty = function(t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i;
    }, d.hide = function() {
        this.isHidden = !0, this.css({
            display: ""
        });
        var t = this.layout.options, e = {}, i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        e[i] = this.onHideTransitionEnd, this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e
        });
    }, d.onHideTransitionEnd = function() {
        this.isHidden && (this.css({
            display: "none"
        }), this.emitEvent("hide"));
    }, d.destroy = function() {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        });
    }, n;
}), function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", [ "ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item" ], function(i, n, o, r) {
        return e(t, i, n, o, r);
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item);
}(window, function(t, e, i, n, o) {
    "use strict";
    function r(t, e) {
        var i = n.getQueryElement(t);
        if (!i) return void (h && h.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
        this.element = i, u && (this.$element = u(this.element)), this.options = n.extend({}, this.constructor.defaults), 
        this.option(e);
        var o = ++l;
        this.element.outlayerGUID = o, c[o] = this, this._create();
        var r = this._getOption("initLayout");
        r && this.layout();
    }
    function s(t) {
        function e() {
            t.apply(this, arguments);
        }
        return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e;
    }
    function a(t) {
        if ("number" == typeof t) return t;
        var e = t.match(/(^\d*\.?\d*)(\w*)/), i = e && e[1], n = e && e[2];
        if (!i.length) return 0;
        i = parseFloat(i);
        var o = m[n] || 1;
        return i * o;
    }
    var h = t.console, u = t.jQuery, d = function() {}, l = 0, c = {};
    r.namespace = "outlayer", r.Item = o, r.defaults = {
        containerStyle: {
            position: "relative"
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    };
    var f = r.prototype;
    n.extend(f, e.prototype), f.option = function(t) {
        n.extend(this.options, t);
    }, f._getOption = function(t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e] ? this.options[e] : this.options[t];
    }, r.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, f._create = function() {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize();
    }, f.reloadItems = function() {
        this.items = this._itemize(this.element.children);
    }, f._itemize = function(t) {
        for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) {
            var r = e[o], s = new i(r, this);
            n.push(s);
        }
        return n;
    }, f._filterFindItemElements = function(t) {
        return n.filterFindElements(t, this.options.itemSelector);
    }, f.getItemElements = function() {
        return this.items.map(function(t) {
            return t.element;
        });
    }, f.layout = function() {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"), e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), this._isLayoutInited = !0;
    }, f._init = f.layout, f._resetLayout = function() {
        this.getSize();
    }, f.getSize = function() {
        this.size = i(this.element);
    }, f._getMeasurement = function(t, e) {
        var n, o = this.options[t];
        o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o), 
        this[t] = n ? i(n)[e] : o) : this[t] = 0;
    }, f.layoutItems = function(t, e) {
        t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout();
    }, f._getItemsForLayout = function(t) {
        return t.filter(function(t) {
            return !t.isIgnored;
        });
    }, f._layoutItems = function(t, e) {
        if (this._emitCompleteOnItems("layout", t), t && t.length) {
            var i = [];
            t.forEach(function(t) {
                var n = this._getItemLayoutPosition(t);
                n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n);
            }, this), this._processLayoutQueue(i);
        }
    }, f._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        };
    }, f._processLayoutQueue = function(t) {
        this.updateStagger(), t.forEach(function(t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e);
        }, this);
    }, f.updateStagger = function() {
        var t = this.options.stagger;
        return null === t || void 0 === t ? void (this.stagger = 0) : (this.stagger = a(t), 
        this.stagger);
    }, f._positionItem = function(t, e, i, n, o) {
        n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i));
    }, f._postLayout = function() {
        this.resizeContainer();
    }, f.resizeContainer = function() {
        var t = this._getOption("resizeContainer");
        if (t) {
            var e = this._getContainerSize();
            e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1));
        }
    }, f._getContainerSize = d, f._setContainerMeasure = function(t, e) {
        if (void 0 !== t) {
            var i = this.size;
            i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), 
            t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px";
        }
    }, f._emitCompleteOnItems = function(t, e) {
        function i() {
            o.dispatchEvent(t + "Complete", null, [ e ]);
        }
        function n() {
            s++, s == r && i();
        }
        var o = this, r = e.length;
        if (!e || !r) return void i();
        var s = 0;
        e.forEach(function(e) {
            e.once(t, n);
        });
    }, f.dispatchEvent = function(t, e, i) {
        var n = e ? [ e ].concat(i) : i;
        if (this.emitEvent(t, n), u) if (this.$element = this.$element || u(this.element), 
        e) {
            var o = u.Event(e);
            o.type = t, this.$element.trigger(o, i);
        } else this.$element.trigger(t, i);
    }, f.ignore = function(t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0);
    }, f.unignore = function(t) {
        var e = this.getItem(t);
        e && delete e.isIgnored;
    }, f.stamp = function(t) {
        t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this));
    }, f.unstamp = function(t) {
        t = this._find(t), t && t.forEach(function(t) {
            n.removeFrom(this.stamps, t), this.unignore(t);
        }, this);
    }, f._find = function(t) {
        return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)) : void 0;
    }, f._manageStamps = function() {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this));
    }, f._getBoundingRect = function() {
        var t = this.element.getBoundingClientRect(), e = this.size;
        this._boundingRect = {
            left: t.left + e.paddingLeft + e.borderLeftWidth,
            top: t.top + e.paddingTop + e.borderTopWidth,
            right: t.right - (e.paddingRight + e.borderRightWidth),
            bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
        };
    }, f._manageStamp = d, f._getElementOffset = function(t) {
        var e = t.getBoundingClientRect(), n = this._boundingRect, o = i(t), r = {
            left: e.left - n.left - o.marginLeft,
            top: e.top - n.top - o.marginTop,
            right: n.right - e.right - o.marginRight,
            bottom: n.bottom - e.bottom - o.marginBottom
        };
        return r;
    }, f.handleEvent = n.handleEvent, f.bindResize = function() {
        t.addEventListener("resize", this), this.isResizeBound = !0;
    }, f.unbindResize = function() {
        t.removeEventListener("resize", this), this.isResizeBound = !1;
    }, f.onresize = function() {
        this.resize();
    }, n.debounceMethod(r, "onresize", 100), f.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout();
    }, f.needsResizeLayout = function() {
        var t = i(this.element), e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth;
    }, f.addItems = function(t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e;
    }, f.appended = function(t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e));
    }, f.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            var i = this.items.slice(0);
            this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), 
            this.reveal(e), this.layoutItems(i);
        }
    }, f.reveal = function(t) {
        if (this._emitCompleteOnItems("reveal", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e), t.reveal();
            });
        }
    }, f.hide = function(t) {
        if (this._emitCompleteOnItems("hide", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e), t.hide();
            });
        }
    }, f.revealItemElements = function(t) {
        var e = this.getItems(t);
        this.reveal(e);
    }, f.hideItemElements = function(t) {
        var e = this.getItems(t);
        this.hide(e);
    }, f.getItem = function(t) {
        for (var e = 0; e < this.items.length; e++) {
            var i = this.items[e];
            if (i.element == t) return i;
        }
    }, f.getItems = function(t) {
        t = n.makeArray(t);
        var e = [];
        return t.forEach(function(t) {
            var i = this.getItem(t);
            i && e.push(i);
        }, this), e;
    }, f.remove = function(t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function(t) {
            t.remove(), n.removeFrom(this.items, t);
        }, this);
    }, f.destroy = function() {
        var t = this.element.style;
        t.height = "", t.position = "", t.width = "", this.items.forEach(function(t) {
            t.destroy();
        }), this.unbindResize();
        var e = this.element.outlayerGUID;
        delete c[e], delete this.element.outlayerGUID, u && u.removeData(this.element, this.constructor.namespace);
    }, r.data = function(t) {
        t = n.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && c[e];
    }, r.create = function(t, e) {
        var i = s(r);
        return i.defaults = n.extend({}, r.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, r.compatOptions), 
        i.namespace = t, i.data = r.data, i.Item = s(o), n.htmlInit(i, t), u && u.bridget && u.bridget(t, i), 
        i;
    };
    var m = {
        ms: 1,
        s: 1e3
    };
    return r.Item = o, r;
}), function(t, e) {
    "function" == typeof define && define.amd ? define([ "outlayer/outlayer", "get-size/get-size" ], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize);
}(window, function(t, e) {
    var i = t.create("masonry");
    return i.compatOptions.fitWidth = "isFitWidth", i.prototype._resetLayout = function() {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), 
        this.measureColumns(), this.colYs = [];
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0;
    }, i.prototype.measureColumns = function() {
        if (this.getContainerWidth(), !this.columnWidth) {
            var t = this.items[0], i = t && t.element;
            this.columnWidth = i && e(i).outerWidth || this.containerWidth;
        }
        var n = this.columnWidth += this.gutter, o = this.containerWidth + this.gutter, r = o / n, s = n - o % n, a = s && 1 > s ? "round" : "floor";
        r = Math[a](r), this.cols = Math.max(r, 1);
    }, i.prototype.getContainerWidth = function() {
        var t = this._getOption("fitWidth"), i = t ? this.element.parentNode : this.element, n = e(i);
        this.containerWidth = n && n.innerWidth;
    }, i.prototype._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth, i = e && 1 > e ? "round" : "ceil", n = Math[i](t.size.outerWidth / this.columnWidth);
        n = Math.min(n, this.cols);
        for (var o = this._getColGroup(n), r = Math.min.apply(Math, o), s = o.indexOf(r), a = {
            x: this.columnWidth * s,
            y: r
        }, h = r + t.size.outerHeight, u = this.cols + 1 - o.length, d = 0; u > d; d++) this.colYs[s + d] = h;
        return a;
    }, i.prototype._getColGroup = function(t) {
        if (2 > t) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) {
            var o = this.colYs.slice(n, n + t);
            e[n] = Math.max.apply(Math, o);
        }
        return e;
    }, i.prototype._manageStamp = function(t) {
        var i = e(t), n = this._getElementOffset(t), o = this._getOption("originLeft"), r = o ? n.left : n.right, s = r + i.outerWidth, a = Math.floor(r / this.columnWidth);
        a = Math.max(0, a);
        var h = Math.floor(s / this.columnWidth);
        h -= s % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h);
        for (var u = this._getOption("originTop"), d = (u ? n.top : n.bottom) + i.outerHeight, l = a; h >= l; l++) this.colYs[l] = Math.max(d, this.colYs[l]);
    }, i.prototype._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = {
            height: this.maxY
        };
        return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), 
        t;
    }, i.prototype._getContainerFitWidth = function() {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
        return (this.cols - t) * this.columnWidth - this.gutter;
    }, i.prototype.needsResizeLayout = function() {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth;
    }, i;
});

/*!
 * Theia Sticky Sidebar v1.4.0
 * https://github.com/WeCodePixels/theia-sticky-sidebar
 *
 * Glues your website's sidebars, making them permanently visible while scrolling.
 *
 * Copyright 2013-2016 WeCodePixels and other contributors
 * Released under the MIT license
 */
(function($) {
    $.fn.theiaStickySidebar = function(options) {
        var defaults = {
            containerSelector: "",
            additionalMarginTop: 0,
            additionalMarginBottom: 0,
            updateSidebarHeight: true,
            minWidth: 0,
            disableOnResponsiveLayouts: true,
            sidebarBehavior: "modern"
        };
        options = $.extend(defaults, options);
        // Validate options
        options.additionalMarginTop = parseInt(options.additionalMarginTop) || 0;
        options.additionalMarginBottom = parseInt(options.additionalMarginBottom) || 0;
        tryInitOrHookIntoEvents(options, this);
        // Try doing init, otherwise hook into window.resize and document.scroll and try again then.
        function tryInitOrHookIntoEvents(options, $that) {
            var success = tryInit(options, $that);
            if (!success) {
                console.log("TST: Body width smaller than options.minWidth. Init is delayed.");
                $(document).scroll(function(options, $that) {
                    return function(evt) {
                        var success = tryInit(options, $that);
                        if (success) {
                            $(this).unbind(evt);
                        }
                    };
                }(options, $that));
                $(window).resize(function(options, $that) {
                    return function(evt) {
                        var success = tryInit(options, $that);
                        if (success) {
                            $(this).unbind(evt);
                        }
                    };
                }(options, $that));
            }
        }
        // Try doing init if proper conditions are met.
        function tryInit(options, $that) {
            if (options.initialized === true) {
                return true;
            }
            if ($("body").width() < options.minWidth) {
                return false;
            }
            init(options, $that);
            return true;
        }
        // Init the sticky sidebar(s).
        function init(options, $that) {
            options.initialized = true;
            // Add CSS
            $("head").append($('<style>.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>'));
            $that.each(function() {
                var o = {};
                o.sidebar = $(this);
                // Save options
                o.options = options || {};
                // Get container
                o.container = $(o.options.containerSelector);
                if (o.container.length == 0) {
                    o.container = o.sidebar.parent();
                }
                // Create sticky sidebar
                o.sidebar.parents().css("-webkit-transform", "none");
                // Fix for WebKit bug - https://code.google.com/p/chromium/issues/detail?id=20574
                o.sidebar.css({
                    position: "relative",
                    overflow: "visible",
                    // The "box-sizing" must be set to "content-box" because we set a fixed height to this element when the sticky sidebar has a fixed position.
                    "-webkit-box-sizing": "border-box",
                    "-moz-box-sizing": "border-box",
                    "box-sizing": "border-box"
                });
                // Get the sticky sidebar element. If none has been found, then create one.
                o.stickySidebar = o.sidebar.find(".theiaStickySidebar");
                if (o.stickySidebar.length == 0) {
                    o.sidebar.find("script").remove();
                    // Remove <script> tags, otherwise they will be run again on the next line.
                    o.stickySidebar = $("<div>").addClass("theiaStickySidebar").append(o.sidebar.children());
                    o.sidebar.append(o.stickySidebar);
                }
                // Get existing top and bottom margins and paddings
                o.marginTop = parseInt(o.sidebar.css("margin-top"));
                o.marginBottom = parseInt(o.sidebar.css("margin-bottom"));
                o.paddingTop = parseInt(o.sidebar.css("padding-top"));
                o.paddingBottom = parseInt(o.sidebar.css("padding-bottom"));
                // Add a temporary padding rule to check for collapsable margins.
                var collapsedTopHeight = o.stickySidebar.offset().top;
                var collapsedBottomHeight = o.stickySidebar.outerHeight();
                o.stickySidebar.css("padding-top", 1);
                o.stickySidebar.css("padding-bottom", 1);
                collapsedTopHeight -= o.stickySidebar.offset().top;
                collapsedBottomHeight = o.stickySidebar.outerHeight() - collapsedBottomHeight - collapsedTopHeight;
                if (collapsedTopHeight == 0) {
                    o.stickySidebar.css("padding-top", 0);
                    o.stickySidebarPaddingTop = 0;
                } else {
                    o.stickySidebarPaddingTop = 1;
                }
                if (collapsedBottomHeight == 0) {
                    o.stickySidebar.css("padding-bottom", 0);
                    o.stickySidebarPaddingBottom = 0;
                } else {
                    o.stickySidebarPaddingBottom = 1;
                }
                // We use this to know whether the user is scrolling up or down.
                o.previousScrollTop = null;
                // Scroll top (value) when the sidebar has fixed position.
                o.fixedScrollTop = 0;
                // Set sidebar to default values.
                resetSidebar();
                o.onScroll = function(o) {
                    // Stop if the sidebar isn't visible.
                    if (!o.stickySidebar.is(":visible")) {
                        return;
                    }
                    // Stop if the window is too small.
                    if ($("body").width() < o.options.minWidth) {
                        resetSidebar();
                        return;
                    }
                    // Stop if the sidebar width is larger than the container width (e.g. the theme is responsive and the sidebar is now below the content)
                    if (o.options.disableOnResponsiveLayouts) {
                        var sidebarWidth = o.sidebar.outerWidth(o.sidebar.css("float") == "none");
                        if (sidebarWidth + 50 > o.container.width()) {
                            resetSidebar();
                            return;
                        }
                    }
                    var scrollTop = $(document).scrollTop();
                    var position = "static";
                    // If the user has scrolled down enough for the sidebar to be clipped at the top, then we can consider changing its position.
                    if (scrollTop >= o.container.offset().top + (o.paddingTop + o.marginTop - o.options.additionalMarginTop)) {
                        // The top and bottom offsets, used in various calculations.
                        var offsetTop = o.paddingTop + o.marginTop + options.additionalMarginTop;
                        var offsetBottom = o.paddingBottom + o.marginBottom + options.additionalMarginBottom;
                        // All top and bottom positions are relative to the window, not to the parent elemnts.
                        var containerTop = o.container.offset().top;
                        var containerBottom = o.container.offset().top + getClearedHeight(o.container);
                        // The top and bottom offsets relative to the window screen top (zero) and bottom (window height).
                        var windowOffsetTop = 0 + options.additionalMarginTop;
                        var windowOffsetBottom;
                        var sidebarSmallerThanWindow = o.stickySidebar.outerHeight() + offsetTop + offsetBottom < $(window).height();
                        if (sidebarSmallerThanWindow) {
                            windowOffsetBottom = windowOffsetTop + o.stickySidebar.outerHeight();
                        } else {
                            windowOffsetBottom = $(window).height() - o.marginBottom - o.paddingBottom - options.additionalMarginBottom;
                        }
                        var staticLimitTop = containerTop - scrollTop + o.paddingTop + o.marginTop;
                        var staticLimitBottom = containerBottom - scrollTop - o.paddingBottom - o.marginBottom;
                        var top = o.stickySidebar.offset().top - scrollTop;
                        var scrollTopDiff = o.previousScrollTop - scrollTop;
                        // If the sidebar position is fixed, then it won't move up or down by itself. So, we manually adjust the top coordinate.
                        if (o.stickySidebar.css("position") == "fixed") {
                            if (o.options.sidebarBehavior == "modern") {
                                top += scrollTopDiff;
                            }
                        }
                        if (o.options.sidebarBehavior == "stick-to-top") {
                            top = options.additionalMarginTop;
                        }
                        if (o.options.sidebarBehavior == "stick-to-bottom") {
                            top = windowOffsetBottom - o.stickySidebar.outerHeight();
                        }
                        if (scrollTopDiff > 0) {
                            // If the user is scrolling up.
                            top = Math.min(top, windowOffsetTop);
                        } else {
                            // If the user is scrolling down.
                            top = Math.max(top, windowOffsetBottom - o.stickySidebar.outerHeight());
                        }
                        top = Math.max(top, staticLimitTop);
                        top = Math.min(top, staticLimitBottom - o.stickySidebar.outerHeight());
                        // If the sidebar is the same height as the container, we won't use fixed positioning.
                        var sidebarSameHeightAsContainer = o.container.height() == o.stickySidebar.outerHeight();
                        if (!sidebarSameHeightAsContainer && top == windowOffsetTop) {
                            position = "fixed";
                        } else if (!sidebarSameHeightAsContainer && top == windowOffsetBottom - o.stickySidebar.outerHeight()) {
                            position = "fixed";
                        } else if (scrollTop + top - o.sidebar.offset().top - o.paddingTop <= options.additionalMarginTop) {
                            // Stuck to the top of the page. No special behavior.
                            position = "static";
                        } else {
                            // Stuck to the bottom of the page.
                            position = "absolute";
                        }
                    }
                    /*
                     * Performance notice: It's OK to set these CSS values at each resize/scroll, even if they don't change.
                     * It's way slower to first check if the values have changed.
                     */
                    if (position == "fixed") {
                        o.stickySidebar.css({
                            position: "fixed",
                            width: o.sidebar.width(),
                            top: top,
                            left: o.sidebar.offset().left + parseInt(o.sidebar.css("padding-left"))
                        });
                    } else if (position == "absolute") {
                        var css = {};
                        if (o.stickySidebar.css("position") != "absolute") {
                            css.position = "absolute";
                            css.top = scrollTop + top - o.sidebar.offset().top - o.stickySidebarPaddingTop - o.stickySidebarPaddingBottom;
                        }
                        css.width = o.sidebar.width();
                        css.left = "";
                        o.stickySidebar.css(css);
                    } else if (position == "static") {
                        resetSidebar();
                    }
                    if (position != "static") {
                        if (o.options.updateSidebarHeight == true) {
                            o.sidebar.css({
                                "min-height": o.stickySidebar.outerHeight() + o.stickySidebar.offset().top - o.sidebar.offset().top + o.paddingBottom
                            });
                        }
                    }
                    o.previousScrollTop = scrollTop;
                };
                // Initialize the sidebar's position.
                o.onScroll(o);
                // Recalculate the sidebar's position on every scroll and resize.
                $(document).scroll(function(o) {
                    return function() {
                        o.onScroll(o);
                    };
                }(o));
                $(window).resize(function(o) {
                    return function() {
                        o.stickySidebar.css({
                            position: "static"
                        });
                        o.onScroll(o);
                    };
                }(o));
                // Reset the sidebar to its default state
                function resetSidebar() {
                    o.fixedScrollTop = 0;
                    o.sidebar.css({
                        "min-height": "1px"
                    });
                    o.stickySidebar.css({
                        position: "static",
                        width: ""
                    });
                }
                // Get the height of a div as if its floated children were cleared. Note that this function fails if the floats are more than one level deep.
                function getClearedHeight(e) {
                    var height = e.height();
                    e.children().each(function() {
                        height = Math.max(height, $(this).height());
                    });
                    return height;
                }
            });
        }
    };
})(jQuery);

/*! SVG Morpheus v0.3.2 License: MIT */ !function() {
    "use strict";
    function t(t, e, r) {
        var a, o = {};
        for (a in t) switch (a) {
          case "fill":
          case "stroke":
            o[a] = n(t[a]), o[a].r = t[a].r + (e[a].r - t[a].r) * r, o[a].g = t[a].g + (e[a].g - t[a].g) * r, 
            o[a].b = t[a].b + (e[a].b - t[a].b) * r, o[a].opacity = t[a].opacity + (e[a].opacity - t[a].opacity) * r;
            break;

          case "opacity":
          case "fill-opacity":
          case "stroke-opacity":
          case "stroke-width":
            o[a] = t[a] + (e[a] - t[a]) * r;
        }
        return o;
    }
    function e(t) {
        var e, r = {};
        for (e in t) switch (e) {
          case "fill":
          case "stroke":
            r[e] = F(t[e]);
            break;

          case "opacity":
          case "fill-opacity":
          case "stroke-opacity":
          case "stroke-width":
            r[e] = t[e];
        }
        return r;
    }
    function r(t, e) {
        var r, a = [ {}, {} ];
        for (r in t) switch (r) {
          case "fill":
          case "stroke":
            a[0][r] = L(t[r]), void 0 === e[r] && (a[1][r] = L(t[r]), a[1][r].opacity = 0);
            break;

          case "opacity":
          case "fill-opacity":
          case "stroke-opacity":
          case "stroke-width":
            a[0][r] = t[r], void 0 === e[r] && (a[1][r] = 1);
        }
        for (r in e) switch (r) {
          case "fill":
          case "stroke":
            a[1][r] = L(e[r]), void 0 === t[r] && (a[0][r] = L(e[r]), a[0][r].opacity = 0);
            break;

          case "opacity":
          case "fill-opacity":
          case "stroke-opacity":
          case "stroke-width":
            a[1][r] = e[r], void 0 === t[r] && (a[0][r] = 1);
        }
        return a;
    }
    function a(t, e, r) {
        var a = {};
        for (var o in t) switch (o) {
          case "rotate":
            a[o] = [ 0, 0, 0 ];
            for (var s = 0; 3 > s; s++) a[o][s] = t[o][s] + (e[o][s] - t[o][s]) * r;
        }
        return a;
    }
    function o(t) {
        var e = "";
        return t.rotate && (e += "rotate(" + t.rotate.join(" ") + ")"), e;
    }
    function s(t, e, r) {
        for (var a = [], o = 0, s = t.length; s > o; o++) {
            a.push([ t[o][0] ]);
            for (var n = 1, i = t[o].length; i > n; n++) a[o].push(t[o][n] + (e[o][n] - t[o][n]) * r);
        }
        return a;
    }
    function n(t) {
        var e;
        if (t instanceof Array) {
            e = [];
            for (var r = 0, a = t.length; a > r; r++) e[r] = n(t[r]);
            return e;
        }
        if (t instanceof Object) {
            e = {};
            for (var o in t) t.hasOwnProperty(o) && (e[o] = n(t[o]));
            return e;
        }
        return t;
    }
    function i(t, e, r) {
        if (!t) throw new Error('SVGMorpheus > "element" is required');
        if ("string" == typeof t && (t = document.querySelector(t), !t)) throw new Error('SVGMorpheus > "element" query is not related to an existing DOM node');
        if (e && typeof e != typeof {}) throw new Error('SVGMorpheus > "options" parameter must be an object');
        if (e = e || {}, r && "function" != typeof r) throw new Error('SVGMorpheus > "callback" parameter must be a function');
        var a = this;
        this._icons = {}, this._curIconId = e.iconId || "", this._toIconId = "", this._curIconItems = [], 
        this._fromIconItems = [], this._toIconItems = [], this._morphNodes = [], this._morphG, 
        this._startTime, this._defDuration = e.duration || 750, this._defEasing = e.easing || "quad-in-out", 
        this._defRotation = e.rotation || "clock", this._defCallback = r || function() {}, 
        this._duration = this._defDuration, this._easing = this._defEasing, this._rotation = this._defRotation, 
        this._callback = this._defCallback, this._rafid, this._fnTick = function(t) {
            a._startTime || (a._startTime = t);
            var e = Math.min((t - a._startTime) / a._duration, 1);
            a._updateAnimationProgress(e), 1 > e ? a._rafid = h(a._fnTick) : "" != a._toIconId && a._animationEnd();
        }, this._svgDoc = "SVG" === t.nodeName.toUpperCase() ? t : t.getSVGDocument(), this._svgDoc ? a._init() : t.addEventListener("load", function() {
            a._svgDoc = t.getSVGDocument(), a._init();
        }, !1);
    }
    var c = {};
    c["circ-in"] = function(t) {
        return -1 * (Math.sqrt(1 - t * t) - 1);
    }, c["circ-out"] = function(t) {
        return Math.sqrt(1 - (t -= 1) * t);
    }, c["circ-in-out"] = function(t) {
        return (t /= .5) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    }, c["cubic-in"] = function(t) {
        return t * t * t;
    }, c["cubic-out"] = function(t) {
        return --t * t * t + 1;
    }, c["cubic-in-out"] = function(t) {
        return .5 > t ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }, c["elastic-in"] = function(t) {
        var e = 1.70158, r = 0, a = 1;
        if (0 == t) return 0;
        if (1 == t) return 1;
        if (r || (r = .3), a < Math.abs(1)) {
            a = 1;
            var e = r / 4;
        } else var e = r / (2 * Math.PI) * Math.asin(1 / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / r));
    }, c["elastic-out"] = function(t) {
        var e = 1.70158, r = 0, a = 1;
        if (0 == t) return 0;
        if (1 == t) return 1;
        if (r || (r = .3), a < Math.abs(1)) {
            a = 1;
            var e = r / 4;
        } else var e = r / (2 * Math.PI) * Math.asin(1 / a);
        return a * Math.pow(2, -10 * t) * Math.sin(2 * (t - e) * Math.PI / r) + 1;
    }, c["elastic-in-out"] = function(t) {
        var e = 1.70158, r = 0, a = 1;
        if (0 == t) return 0;
        if (2 == (t /= .5)) return 1;
        if (r || (r = .3 * 1.5), a < Math.abs(1)) {
            a = 1;
            var e = r / 4;
        } else var e = r / (2 * Math.PI) * Math.asin(1 / a);
        return 1 > t ? -.5 * a * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / r) : a * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / r) * .5 + 1;
    }, c["expo-in"] = function(t) {
        return 0 == t ? 0 : Math.pow(2, 10 * (t - 1));
    }, c["expo-out"] = function(t) {
        return 1 == t ? 1 : 1 - Math.pow(2, -10 * t);
    }, c["expo-in-out"] = function(t) {
        return 0 == t ? 0 : 1 == t ? 1 : (t /= .5) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (-Math.pow(2, -10 * --t) + 2);
    }, c.linear = function(t) {
        return t;
    }, c["quad-in"] = function(t) {
        return t * t;
    }, c["quad-out"] = function(t) {
        return t * (2 - t);
    }, c["quad-in-out"] = function(t) {
        return .5 > t ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }, c["quart-in"] = function(t) {
        return t * t * t * t;
    }, c["quart-out"] = function(t) {
        return 1 - --t * t * t * t;
    }, c["quart-in-out"] = function(t) {
        return .5 > t ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    }, c["quint-in"] = function(t) {
        return t * t * t * t * t;
    }, c["quint-out"] = function(t) {
        return 1 + --t * t * t * t * t;
    }, c["quint-in-out"] = function(t) {
        return .5 > t ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
    }, c["sine-in"] = function(t) {
        return 1 - Math.cos(t * (Math.PI / 2));
    }, c["sine-out"] = function(t) {
        return Math.sin(t * (Math.PI / 2));
    }, c["sine-in-out"] = function(t) {
        return .5 * (1 - Math.cos(Math.PI * t));
    };
    var h = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame, u = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.oCancelAnimationFrame, l = "\t\n\v\f\r   ᠎             　\u2028\u2029", p = new RegExp("([a-z])[" + l + ",]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?[" + l + "]*,?[" + l + "]*)+)", "ig"), f = new RegExp("(-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?)[" + l + "]*,?[" + l + "]*", "ig"), m = function(t) {
        if (!t) return null;
        if (typeof t == typeof []) return t;
        var e = {
            a: 7,
            c: 6,
            o: 2,
            h: 1,
            l: 2,
            m: 2,
            r: 4,
            q: 4,
            s: 4,
            t: 2,
            v: 1,
            u: 3,
            z: 0
        }, r = [];
        return String(t).replace(p, function(t, a, o) {
            var s = [], n = a.toLowerCase();
            if (o.replace(f, function(t, e) {
                e && s.push(+e);
            }), "m" == n && s.length > 2 && (r.push([ a ].concat(s.splice(0, 2))), n = "l", 
            a = "m" == a ? "l" : "L"), "o" == n && 1 == s.length && r.push([ a, s[0] ]), "r" == n) r.push([ a ].concat(s)); else for (;s.length >= e[n] && (r.push([ a ].concat(s.splice(0, e[n]))), 
            e[n]); ) ;
        }), r;
    }, d = function(t, e) {
        for (var r = [], a = 0, o = t.length; o - 2 * !e > a; a += 2) {
            var s = [ {
                x: +t[a - 2],
                y: +t[a - 1]
            }, {
                x: +t[a],
                y: +t[a + 1]
            }, {
                x: +t[a + 2],
                y: +t[a + 3]
            }, {
                x: +t[a + 4],
                y: +t[a + 5]
            } ];
            e ? a ? o - 4 == a ? s[3] = {
                x: +t[0],
                y: +t[1]
            } : o - 2 == a && (s[2] = {
                x: +t[0],
                y: +t[1]
            }, s[3] = {
                x: +t[2],
                y: +t[3]
            }) : s[0] = {
                x: +t[o - 2],
                y: +t[o - 1]
            } : o - 4 == a ? s[3] = s[2] : a || (s[0] = {
                x: +t[a],
                y: +t[a + 1]
            }), r.push([ "C", (-s[0].x + 6 * s[1].x + s[2].x) / 6, (-s[0].y + 6 * s[1].y + s[2].y) / 6, (s[1].x + 6 * s[2].x - s[3].x) / 6, (s[1].y + 6 * s[2].y - s[3].y) / 6, s[2].x, s[2].y ]);
        }
        return r;
    }, y = function(t, e, r, a, o) {
        if (null == o && null == a && (a = r), t = +t, e = +e, r = +r, a = +a, null != o) var s = Math.PI / 180, n = t + r * Math.cos(-a * s), i = t + r * Math.cos(-o * s), c = e + r * Math.sin(-a * s), h = e + r * Math.sin(-o * s), u = [ [ "M", n, c ], [ "A", r, r, 0, +(o - a > 180), 0, i, h ] ]; else u = [ [ "M", t, e ], [ "m", 0, -a ], [ "a", r, a, 0, 1, 1, 0, 2 * a ], [ "a", r, a, 0, 1, 1, 0, -2 * a ], [ "z" ] ];
        return u;
    }, I = function(t) {
        if (t = m(t), !t || !t.length) return [ [ "M", 0, 0 ] ];
        var e, r = [], a = 0, o = 0, s = 0, n = 0, i = 0;
        "M" == t[0][0] && (a = +t[0][1], o = +t[0][2], s = a, n = o, i++, r[0] = [ "M", a, o ]);
        for (var c, h, u = 3 == t.length && "M" == t[0][0] && "R" == t[1][0].toUpperCase() && "Z" == t[2][0].toUpperCase(), l = i, p = t.length; p > l; l++) {
            if (r.push(c = []), h = t[l], e = h[0], e != e.toUpperCase()) switch (c[0] = e.toUpperCase(), 
            c[0]) {
              case "A":
                c[1] = h[1], c[2] = h[2], c[3] = h[3], c[4] = h[4], c[5] = h[5], c[6] = +h[6] + a, 
                c[7] = +h[7] + o;
                break;

              case "V":
                c[1] = +h[1] + o;
                break;

              case "H":
                c[1] = +h[1] + a;
                break;

              case "R":
                for (var f = [ a, o ].concat(h.slice(1)), I = 2, _ = f.length; _ > I; I++) f[I] = +f[I] + a, 
                f[++I] = +f[I] + o;
                r.pop(), r = r.concat(d(f, u));
                break;

              case "O":
                r.pop(), f = y(a, o, h[1], h[2]), f.push(f[0]), r = r.concat(f);
                break;

              case "U":
                r.pop(), r = r.concat(y(a, o, h[1], h[2], h[3])), c = [ "U" ].concat(r[r.length - 1].slice(-2));
                break;

              case "M":
                s = +h[1] + a, n = +h[2] + o;

              default:
                for (I = 1, _ = h.length; _ > I; I++) c[I] = +h[I] + (I % 2 ? a : o);
            } else if ("R" == e) f = [ a, o ].concat(h.slice(1)), r.pop(), r = r.concat(d(f, u)), 
            c = [ "R" ].concat(h.slice(-2)); else if ("O" == e) r.pop(), f = y(a, o, h[1], h[2]), 
            f.push(f[0]), r = r.concat(f); else if ("U" == e) r.pop(), r = r.concat(y(a, o, h[1], h[2], h[3])), 
            c = [ "U" ].concat(r[r.length - 1].slice(-2)); else for (var g = 0, M = h.length; M > g; g++) c[g] = h[g];
            if (e = e.toUpperCase(), "O" != e) switch (c[0]) {
              case "Z":
                a = +s, o = +n;
                break;

              case "H":
                a = c[1];
                break;

              case "V":
                o = c[1];
                break;

              case "M":
                s = c[c.length - 2], n = c[c.length - 1];

              default:
                a = c[c.length - 2], o = c[c.length - 1];
            }
        }
        return r;
    }, _ = function(t, e, r, a) {
        return [ t, e, r, a, r, a ];
    }, g = function(t, e, r, a, o, s) {
        var n = 1 / 3, i = 2 / 3;
        return [ n * t + i * r, n * e + i * a, n * o + i * r, n * s + i * a, o, s ];
    }, M = function(t, e, r, a, o, s, n, i, c, h) {
        var u, l = 120 * Math.PI / 180, p = Math.PI / 180 * (+o || 0), f = [], m = function(t, e, r) {
            var a = t * Math.cos(r) - e * Math.sin(r), o = t * Math.sin(r) + e * Math.cos(r);
            return {
                x: a,
                y: o
            };
        };
        if (h) w = h[0], k = h[1], v = h[2], x = h[3]; else {
            u = m(t, e, -p), t = u.x, e = u.y, u = m(i, c, -p), i = u.x, c = u.y;
            var d = (Math.cos(Math.PI / 180 * o), Math.sin(Math.PI / 180 * o), (t - i) / 2), y = (e - c) / 2, I = d * d / (r * r) + y * y / (a * a);
            I > 1 && (I = Math.sqrt(I), r = I * r, a = I * a);
            var _ = r * r, g = a * a, b = (s == n ? -1 : 1) * Math.sqrt(Math.abs((_ * g - _ * y * y - g * d * d) / (_ * y * y + g * d * d))), v = b * r * y / a + (t + i) / 2, x = b * -a * d / r + (e + c) / 2, w = Math.asin(((e - x) / a).toFixed(9)), k = Math.asin(((c - x) / a).toFixed(9));
            w = v > t ? Math.PI - w : w, k = v > i ? Math.PI - k : k, 0 > w && (w = 2 * Math.PI + w), 
            0 > k && (k = 2 * Math.PI + k), n && w > k && (w -= 2 * Math.PI), !n && k > w && (k -= 2 * Math.PI);
        }
        var A = k - w;
        if (Math.abs(A) > l) {
            var C = k, N = i, q = c;
            k = w + l * (n && k > w ? 1 : -1), i = v + r * Math.cos(k), c = x + a * Math.sin(k), 
            f = M(i, c, r, a, o, 0, n, N, q, [ k, C, v, x ]);
        }
        A = k - w;
        var P = Math.cos(w), F = Math.sin(w), E = Math.cos(k), S = Math.sin(k), G = Math.tan(A / 4), D = 4 / 3 * r * G, L = 4 / 3 * a * G, T = [ t, e ], V = [ t + D * F, e - L * P ], R = [ i + D * S, c - L * E ], U = [ i, c ];
        if (V[0] = 2 * T[0] - V[0], V[1] = 2 * T[1] - V[1], h) return [ V, R, U ].concat(f);
        f = [ V, R, U ].concat(f).join().split(",");
        for (var z = [], O = 0, j = f.length; j > O; O++) z[O] = O % 2 ? m(f[O - 1], f[O], p).y : m(f[O], f[O + 1], p).x;
        return z;
    }, b = function(t, e) {
        for (var r = I(t), a = e && I(e), o = {
            x: 0,
            y: 0,
            bx: 0,
            by: 0,
            X: 0,
            Y: 0,
            qx: null,
            qy: null
        }, s = {
            x: 0,
            y: 0,
            bx: 0,
            by: 0,
            X: 0,
            Y: 0,
            qx: null,
            qy: null
        }, n = (function(t, e, r) {
            var a, o;
            if (!t) return [ "C", e.x, e.y, e.x, e.y, e.x, e.y ];
            switch (!(t[0] in {
                T: 1,
                Q: 1
            }) && (e.qx = e.qy = null), t[0]) {
              case "M":
                e.X = t[1], e.Y = t[2];
                break;

              case "A":
                t = [ "C" ].concat(M.apply(0, [ e.x, e.y ].concat(t.slice(1))));
                break;

              case "S":
                "C" == r || "S" == r ? (a = 2 * e.x - e.bx, o = 2 * e.y - e.by) : (a = e.x, o = e.y), 
                t = [ "C", a, o ].concat(t.slice(1));
                break;

              case "T":
                "Q" == r || "T" == r ? (e.qx = 2 * e.x - e.qx, e.qy = 2 * e.y - e.qy) : (e.qx = e.x, 
                e.qy = e.y), t = [ "C" ].concat(g(e.x, e.y, e.qx, e.qy, t[1], t[2]));
                break;

              case "Q":
                e.qx = t[1], e.qy = t[2], t = [ "C" ].concat(g(e.x, e.y, t[1], t[2], t[3], t[4]));
                break;

              case "L":
                t = [ "C" ].concat(_(e.x, e.y, t[1], t[2]));
                break;

              case "H":
                t = [ "C" ].concat(_(e.x, e.y, t[1], e.y));
                break;

              case "V":
                t = [ "C" ].concat(_(e.x, e.y, e.x, t[1]));
                break;

              case "Z":
                t = [ "C" ].concat(_(e.x, e.y, e.X, e.Y));
            }
            return t;
        }), i = function(t, e) {
            if (t[e].length > 7) {
                t[e].shift();
                for (var o = t[e]; o.length; ) h[e] = "A", a && (u[e] = "A"), t.splice(e++, 0, [ "C" ].concat(o.splice(0, 6)));
                t.splice(e, 1), m = Math.max(r.length, a && a.length || 0);
            }
        }, c = function(t, e, o, s, n) {
            t && e && "M" == t[n][0] && "M" != e[n][0] && (e.splice(n, 0, [ "M", s.x, s.y ]), 
            o.bx = 0, o.by = 0, o.x = t[n][1], o.y = t[n][2], m = Math.max(r.length, a && a.length || 0));
        }, h = [], u = [], l = "", p = "", f = 0, m = Math.max(r.length, a && a.length || 0); m > f; f++) {
            r[f] && (l = r[f][0]), "C" != l && (h[f] = l, f && (p = h[f - 1])), r[f] = n(r[f], o, p), 
            "A" != h[f] && "C" == l && (h[f] = "C"), i(r, f), a && (a[f] && (l = a[f][0]), "C" != l && (u[f] = l, 
            f && (p = u[f - 1])), a[f] = n(a[f], s, p), "A" != u[f] && "C" == l && (u[f] = "C"), 
            i(a, f)), c(r, a, o, s, f), c(a, r, s, o, f);
            var d = r[f], y = a && a[f], b = d.length, v = a && y.length;
            o.x = d[b - 2], o.y = d[b - 1], o.bx = parseFloat(d[b - 4]) || o.x, o.by = parseFloat(d[b - 3]) || o.y, 
            s.bx = a && (parseFloat(y[v - 4]) || s.x), s.by = a && (parseFloat(y[v - 3]) || s.y), 
            s.x = a && y[v - 2], s.y = a && y[v - 1];
        }
        return a ? [ r, a ] : r;
    }, v = function(t, e, r, a) {
        return null == t && (t = e = r = a = 0), null == e && (e = t.y, r = t.width, a = t.height, 
        t = t.x), {
            x: t,
            y: e,
            w: r,
            h: a,
            cx: t + r / 2,
            cy: e + a / 2
        };
    }, x = function(t, e, r, a, o, s, n, i) {
        for (var c, h, u, l, p, f, m, d, y = [], I = [ [], [] ], _ = 0; 2 > _; ++_) if (0 == _ ? (h = 6 * t - 12 * r + 6 * o, 
        c = -3 * t + 9 * r - 9 * o + 3 * n, u = 3 * r - 3 * t) : (h = 6 * e - 12 * a + 6 * s, 
        c = -3 * e + 9 * a - 9 * s + 3 * i, u = 3 * a - 3 * e), Math.abs(c) < 1e-12) {
            if (Math.abs(h) < 1e-12) continue;
            l = -u / h, l > 0 && 1 > l && y.push(l);
        } else m = h * h - 4 * u * c, d = Math.sqrt(m), 0 > m || (p = (-h + d) / (2 * c), 
        p > 0 && 1 > p && y.push(p), f = (-h - d) / (2 * c), f > 0 && 1 > f && y.push(f));
        for (var g, M = y.length, b = M; M--; ) l = y[M], g = 1 - l, I[0][M] = g * g * g * t + 3 * g * g * l * r + 3 * g * l * l * o + l * l * l * n, 
        I[1][M] = g * g * g * e + 3 * g * g * l * a + 3 * g * l * l * s + l * l * l * i;
        return I[0][b] = t, I[1][b] = e, I[0][b + 1] = n, I[1][b + 1] = i, I[0].length = I[1].length = b + 2, 
        {
            min: {
                x: Math.min.apply(0, I[0]),
                y: Math.min.apply(0, I[1])
            },
            max: {
                x: Math.max.apply(0, I[0]),
                y: Math.max.apply(0, I[1])
            }
        };
    }, w = function(t) {
        for (var e, r = 0, a = 0, o = [], s = [], n = 0, i = t.length; i > n; n++) if (e = t[n], 
        "M" == e[0]) r = e[1], a = e[2], o.push(r), s.push(a); else {
            var c = x(r, a, e[1], e[2], e[3], e[4], e[5], e[6]);
            o = o.concat(c.min.x, c.max.x), s = s.concat(c.min.y, c.max.y), r = e[5], a = e[6];
        }
        var h = Math.min.apply(0, o), u = Math.min.apply(0, s), l = Math.max.apply(0, o), p = Math.max.apply(0, s), f = v(h, u, l - h, p - u);
        return f;
    }, k = /,?([a-z]),?/gi, A = function(t) {
        return t.join(",").replace(k, "$1");
    }, C = {
        hs: 1,
        rg: 1
    }, N = "hasOwnProperty", q = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\))\s*$/i, P = new RegExp("[" + l + "]*,[" + l + "]*"), F = function(t) {
        var e = Math.round;
        return "rgba(" + [ e(t.r), e(t.g), e(t.b), +t.opacity.toFixed(2) ] + ")";
    }, E = function(t) {
        var e = window.document.getElementsByTagName("head")[0] || window.document.getElementsByTagName("svg")[0], r = "rgb(255, 0, 0)";
        return E = function(t) {
            if ("red" == t.toLowerCase()) return r;
            e.style.color = r, e.style.color = t;
            var a = window.document.defaultView.getComputedStyle(e, "").getPropertyValue("color");
            return a == r ? null : a;
        }, E(t);
    }, S = function(t, e, r, a) {
        t = Math.round(255 * t), e = Math.round(255 * e), r = Math.round(255 * r);
        var o = {
            r: t,
            g: e,
            b: r,
            opacity: isFinite(a) ? a : 1
        };
        return o;
    }, G = function(t, e, r, a) {
        typeof t == typeof {} && "h" in t && "s" in t && "b" in t && (r = t.b, e = t.s, 
        t = t.h, a = t.o), t *= 360;
        var o, s, n, i, c;
        return t = t % 360 / 60, c = r * e, i = c * (1 - Math.abs(t % 2 - 1)), o = s = n = r - c, 
        t = ~~t, o += [ c, i, 0, 0, i, c ][t], s += [ i, c, c, i, 0, 0 ][t], n += [ 0, 0, i, c, c, i ][t], 
        S(o, s, n, a);
    }, D = function(t, e, r, a) {
        typeof t == typeof {} && "h" in t && "s" in t && "l" in t && (r = t.l, e = t.s, 
        t = t.h), (t > 1 || e > 1 || r > 1) && (t /= 360, e /= 100, r /= 100), t *= 360;
        var o, s, n, i, c;
        return t = t % 360 / 60, c = 2 * e * (.5 > r ? r : 1 - r), i = c * (1 - Math.abs(t % 2 - 1)), 
        o = s = n = r - c / 2, t = ~~t, o += [ c, i, 0, 0, i, c ][t], s += [ i, c, c, i, 0, 0 ][t], 
        n += [ 0, 0, i, c, c, i ][t], S(o, s, n, a);
    }, L = function(t) {
        if (!t || (t = String(t)).indexOf("-") + 1) return {
            r: -1,
            g: -1,
            b: -1,
            opacity: -1,
            error: 1
        };
        if ("none" == t) return {
            r: -1,
            g: -1,
            b: -1,
            opacity: -1
        };
        if (!(C[N](t.toLowerCase().substring(0, 2)) || "#" == t.charAt()) && (t = E(t)), 
        !t) return {
            r: -1,
            g: -1,
            b: -1,
            opacity: -1,
            error: 1
        };
        var e, r, a, o, s, n, i = t.match(q);
        return i ? (i[2] && (a = parseInt(i[2].substring(5), 16), r = parseInt(i[2].substring(3, 5), 16), 
        e = parseInt(i[2].substring(1, 3), 16)), i[3] && (a = parseInt((s = i[3].charAt(3)) + s, 16), 
        r = parseInt((s = i[3].charAt(2)) + s, 16), e = parseInt((s = i[3].charAt(1)) + s, 16)), 
        i[4] && (n = i[4].split(P), e = parseFloat(n[0]), "%" == n[0].slice(-1) && (e *= 2.55), 
        r = parseFloat(n[1]), "%" == n[1].slice(-1) && (r *= 2.55), a = parseFloat(n[2]), 
        "%" == n[2].slice(-1) && (a *= 2.55), "rgba" == i[1].toLowerCase().slice(0, 4) && (o = parseFloat(n[3])), 
        n[3] && "%" == n[3].slice(-1) && (o /= 100)), i[5] ? (n = i[5].split(P), e = parseFloat(n[0]), 
        "%" == n[0].slice(-1) && (e /= 100), r = parseFloat(n[1]), "%" == n[1].slice(-1) && (r /= 100), 
        a = parseFloat(n[2]), "%" == n[2].slice(-1) && (a /= 100), ("deg" == n[0].slice(-3) || "°" == n[0].slice(-1)) && (e /= 360), 
        "hsba" == i[1].toLowerCase().slice(0, 4) && (o = parseFloat(n[3])), n[3] && "%" == n[3].slice(-1) && (o /= 100), 
        G(e, r, a, o)) : i[6] ? (n = i[6].split(P), e = parseFloat(n[0]), "%" == n[0].slice(-1) && (e /= 100), 
        r = parseFloat(n[1]), "%" == n[1].slice(-1) && (r /= 100), a = parseFloat(n[2]), 
        "%" == n[2].slice(-1) && (a /= 100), ("deg" == n[0].slice(-3) || "°" == n[0].slice(-1)) && (e /= 360), 
        "hsla" == i[1].toLowerCase().slice(0, 4) && (o = parseFloat(n[3])), n[3] && "%" == n[3].slice(-1) && (o /= 100), 
        D(e, r, a, o)) : (e = Math.min(Math.round(e), 255), r = Math.min(Math.round(r), 255), 
        a = Math.min(Math.round(a), 255), o = Math.min(Math.max(o, 0), 1), i = {
            r: e,
            g: r,
            b: a
        }, i.opacity = isFinite(o) ? o : 1, i)) : {
            r: -1,
            g: -1,
            b: -1,
            opacity: -1,
            error: 1
        };
    };
    i.prototype._init = function() {
        if ("SVG" !== this._svgDoc.nodeName.toUpperCase() && (this._svgDoc = this._svgDoc.getElementsByTagName("svg")[0]), 
        this._svgDoc) {
            var t, e, r, a, o, s, n, i, c = "";
            for (t = this._svgDoc.childNodes.length - 1; t >= 0; t--) {
                var h = this._svgDoc.childNodes[t];
                if ("G" === h.nodeName.toUpperCase() && (r = h.getAttribute("id"))) {
                    for (a = [], s = 0, n = h.childNodes.length; n > s; s++) {
                        var u = h.childNodes[s];
                        switch (o = {
                            path: "",
                            attrs: {},
                            style: {}
                        }, u.nodeName.toUpperCase()) {
                          case "PATH":
                            o.path = u.getAttribute("d");
                            break;

                          case "CIRCLE":
                            var l = 1 * u.getAttribute("cx"), p = 1 * u.getAttribute("cy"), f = 1 * u.getAttribute("r");
                            o.path = "M" + (l - f) + "," + p + "a" + f + "," + f + " 0 1,0 " + 2 * f + ",0a" + f + "," + f + " 0 1,0 -" + 2 * f + ",0z";
                            break;

                          case "ELLIPSE":
                            var l = 1 * u.getAttribute("cx"), p = 1 * u.getAttribute("cy"), m = 1 * u.getAttribute("rx"), d = 1 * u.getAttribute("ry");
                            o.path = "M" + (l - m) + "," + p + "a" + m + "," + d + " 0 1,0 " + 2 * m + ",0a" + m + "," + d + " 0 1,0 -" + 2 * m + ",0z";
                            break;

                          case "RECT":
                            var y = 1 * u.getAttribute("x"), I = 1 * u.getAttribute("y"), _ = 1 * u.getAttribute("width"), g = 1 * u.getAttribute("height"), m = 1 * u.getAttribute("rx"), d = 1 * u.getAttribute("ry");
                            o.path = m || d ? "M" + (y + m) + "," + I + "l" + (_ - 2 * m) + ",0a" + m + "," + d + " 0 0,1 " + m + "," + d + "l0," + (g - 2 * d) + "a" + m + "," + d + " 0 0,1 -" + m + "," + d + "l" + (2 * m - _) + ",0a" + m + "," + d + " 0 0,1 -" + m + ",-" + d + "l0," + (2 * d - g) + "a" + m + "," + d + " 0 0,1 " + m + ",-" + d + "z" : "M" + y + "," + I + "l" + _ + ",0l0," + g + "l-" + _ + ",0z";
                            break;

                          case "POLYGON":
                            for (var M = u.getAttribute("points"), b = M.split(/\s+/), v = "", x = 0, e = b.length; e > x; x++) v += (x && "L" || "M") + b[x];
                            o.path = v + "z";
                            break;

                          case "LINE":
                            var w = 1 * u.getAttribute("x1"), k = 1 * u.getAttribute("y1"), A = 1 * u.getAttribute("x2"), C = 1 * u.getAttribute("y2");
                            o.path = "M" + w + "," + k + "L" + A + "," + C + "z";
                        }
                        if ("" != o.path) {
                            for (var x = 0, N = u.attributes.length; N > x; x++) {
                                var q = u.attributes[x];
                                if (q.specified) {
                                    var P = q.name.toLowerCase();
                                    switch (P) {
                                      case "fill":
                                      case "fill-opacity":
                                      case "opacity":
                                      case "stroke":
                                      case "stroke-opacity":
                                      case "stroke-width":
                                        o.attrs[P] = q.value;
                                    }
                                }
                            }
                            for (var F = 0, E = u.style.length; E > F; F++) {
                                var S = u.style[F];
                                switch (S) {
                                  case "fill":
                                  case "fill-opacity":
                                  case "opacity":
                                  case "stroke":
                                  case "stroke-opacity":
                                  case "stroke-width":
                                    o.style[S] = u.style[S];
                                }
                            }
                            a.push(o);
                        }
                    }
                    a.length > 0 && (i = {
                        id: r,
                        items: a
                    }, this._icons[r] = i), this._morphG ? this._svgDoc.removeChild(h) : (c = r, this._morphG = document.createElementNS("http://www.w3.org/2000/svg", "g"), 
                    this._svgDoc.replaceChild(this._morphG, h));
                }
            }
            var G = this._curIconId || c;
            "" !== G && (this._setupAnimation(G), this._updateAnimationProgress(1), this._animationEnd());
        }
    }, i.prototype._setupAnimation = function(t) {
        if (t && this._icons[t]) {
            this._toIconId = t, this._startTime = void 0;
            var a, o;
            for (this._fromIconItems = n(this._curIconItems), this._toIconItems = n(this._icons[t].items), 
            a = 0, o = this._morphNodes.length; o > a; a++) {
                var s = this._morphNodes[a];
                s.fromIconItemIdx = a, s.toIconItemIdx = a;
            }
            var i, c = Math.max(this._fromIconItems.length, this._toIconItems.length);
            for (a = 0; c > a; a++) if (this._fromIconItems[a] || (this._toIconItems[a] ? (i = w(b(this._toIconItems[a].path)), 
            this._fromIconItems.push({
                path: "M" + i.cx + "," + i.cy + "l0,0",
                attrs: {},
                style: {},
                trans: {
                    rotate: [ 0, i.cx, i.cy ]
                }
            })) : this._fromIconItems.push({
                path: "M0,0l0,0",
                attrs: {},
                style: {},
                trans: {
                    rotate: [ 0, 0, 0 ]
                }
            })), this._toIconItems[a] || (this._fromIconItems[a] ? (i = w(b(this._fromIconItems[a].path)), 
            this._toIconItems.push({
                path: "M" + i.cx + "," + i.cy + "l0,0",
                attrs: {},
                style: {},
                trans: {
                    rotate: [ 0, i.cx, i.cy ]
                }
            })) : this._toIconItems.push({
                path: "M0,0l0,0",
                attrs: {},
                style: {},
                trans: {
                    rotate: [ 0, 0, 0 ]
                }
            })), !this._morphNodes[a]) {
                var h = document.createElementNS("http://www.w3.org/2000/svg", "path");
                this._morphG.appendChild(h), this._morphNodes.push({
                    node: h,
                    fromIconItemIdx: a,
                    toIconItemIdx: a
                });
            }
            for (a = 0; c > a; a++) {
                var u = this._fromIconItems[a], l = this._toIconItems[a], p = b(this._fromIconItems[a].path, this._toIconItems[a].path);
                u.curve = p[0], l.curve = p[1];
                var f = r(this._fromIconItems[a].attrs, this._toIconItems[a].attrs);
                u.attrsNorm = f[0], l.attrsNorm = f[1], u.attrs = e(u.attrsNorm), l.attrs = e(l.attrsNorm);
                var m = r(this._fromIconItems[a].style, this._toIconItems[a].style);
                u.styleNorm = m[0], l.styleNorm = m[1], u.style = e(u.styleNorm), l.style = e(l.styleNorm), 
                i = w(l.curve), l.trans = {
                    rotate: [ 0, i.cx, i.cy ]
                };
                var d, y = this._rotation;
                switch ("random" === y && (y = Math.random() < .5 ? "counterclock" : "clock"), y) {
                  case "none":
                    u.trans.rotate && (l.trans.rotate[0] = u.trans.rotate[0]);
                    break;

                  case "counterclock":
                    u.trans.rotate ? (l.trans.rotate[0] = u.trans.rotate[0] - 360, d = -u.trans.rotate[0] % 360, 
                    l.trans.rotate[0] += 180 > d ? d : d - 360) : l.trans.rotate[0] = -360;
                    break;

                  default:
                    u.trans.rotate ? (l.trans.rotate[0] = u.trans.rotate[0] + 360, d = u.trans.rotate[0] % 360, 
                    l.trans.rotate[0] += 180 > d ? -d : 360 - d) : l.trans.rotate[0] = 360;
                }
            }
            this._curIconItems = n(this._fromIconItems);
        }
    }, i.prototype._updateAnimationProgress = function(r) {
        r = c[this._easing](r);
        var n, i, h, u;
        for (n = 0, u = this._curIconItems.length; u > n; n++) this._curIconItems[n].curve = s(this._fromIconItems[n].curve, this._toIconItems[n].curve, r), 
        this._curIconItems[n].path = A(this._curIconItems[n].curve), this._curIconItems[n].attrsNorm = t(this._fromIconItems[n].attrsNorm, this._toIconItems[n].attrsNorm, r), 
        this._curIconItems[n].attrs = e(this._curIconItems[n].attrsNorm), this._curIconItems[n].styleNorm = t(this._fromIconItems[n].styleNorm, this._toIconItems[n].styleNorm, r), 
        this._curIconItems[n].style = e(this._curIconItems[n].styleNorm), this._curIconItems[n].trans = a(this._fromIconItems[n].trans, this._toIconItems[n].trans, r), 
        this._curIconItems[n].transStr = o(this._curIconItems[n].trans);
        for (n = 0, u = this._morphNodes.length; u > n; n++) {
            var l = this._morphNodes[n];
            l.node.setAttribute("d", this._curIconItems[n].path);
            var p = this._curIconItems[n].attrs;
            for (i in p) l.node.setAttribute(i, p[i]);
            var f = this._curIconItems[n].style;
            for (h in f) l.node.style[h] = f[h];
            l.node.setAttribute("transform", this._curIconItems[n].transStr);
        }
    }, i.prototype._animationEnd = function() {
        for (var t = this._morphNodes.length - 1; t >= 0; t--) {
            var e = this._morphNodes[t];
            this._icons[this._toIconId].items[t] ? e.node.setAttribute("d", this._icons[this._toIconId].items[t].path) : (e.node.parentNode.removeChild(e.node), 
            this._morphNodes.splice(t, 1));
        }
        this._curIconId = this._toIconId, this._toIconId = "", this._callback();
    }, i.prototype.to = function(t, e, r) {
        if (t !== this._toIconId) {
            if (e && typeof e != typeof {}) throw new Error('SVGMorpheus.to() > "options" parameter must be an object');
            if (e = e || {}, r && "function" != typeof r) throw new Error('SVGMorpheus.to() > "callback" parameter must be a function');
            u(this._rafid), this._duration = e.duration || this._defDuration, this._easing = e.easing || this._defEasing, 
            this._rotation = e.rotation || this._defRotation, this._callback = r || this._defCallback, 
            this._setupAnimation(t), this._rafid = h(this._fnTick);
        }
    }, i.prototype.registerEasing = function(t, e) {
        c[t] = e;
    }, "function" == typeof define && define.amd ? define(function() {
        return i;
    }) : "undefined" != typeof module && "undefined" != typeof module.exports ? module.exports = i : window.SVGMorpheus = i;
}();

/*!
 * imagesLoaded PACKAGED v4.1.1
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
!function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e();
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {}, n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e), this;
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {}, n = i[t] = i[t] || {};
            return n[e] = !0, this;
        }
    }, e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return -1 != n && i.splice(n, 1), this;
        }
    }, e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = 0, o = i[n];
            e = e || [];
            for (var r = this._onceEvents && this._onceEvents[t]; o; ) {
                var s = r && r[o];
                s && (this.off(t, o), delete r[o]), o.apply(this, e), n += s ? 0 : 1, o = i[n];
            }
            return this;
        }
    }, t;
}), function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "ev-emitter/ev-emitter" ], function(i) {
        return e(t, i);
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter);
}(window, function(t, e) {
    function i(t, e) {
        for (var i in e) t[i] = e[i];
        return t;
    }
    function n(t) {
        var e = [];
        if (Array.isArray(t)) e = t; else if ("number" == typeof t.length) for (var i = 0; i < t.length; i++) e.push(t[i]); else e.push(t);
        return e;
    }
    function o(t, e, r) {
        return this instanceof o ? ("string" == typeof t && (t = document.querySelectorAll(t)), 
        this.elements = n(t), this.options = i({}, this.options), "function" == typeof e ? r = e : i(this.options, e), 
        r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred()), 
        void setTimeout(function() {
            this.check();
        }.bind(this))) : new o(t, e, r);
    }
    function r(t) {
        this.img = t;
    }
    function s(t, e) {
        this.url = t, this.element = e, this.img = new Image();
    }
    var h = t.jQuery, a = t.console;
    o.prototype = Object.create(e.prototype), o.prototype.options = {}, o.prototype.getImages = function() {
        this.images = [], this.elements.forEach(this.addElementImages, this);
    }, o.prototype.addElementImages = function(t) {
        "IMG" == t.nodeName && this.addImage(t), this.options.background === !0 && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && d[e]) {
            for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var o = i[n];
                this.addImage(o);
            }
            if ("string" == typeof this.options.background) {
                var r = t.querySelectorAll(this.options.background);
                for (n = 0; n < r.length; n++) {
                    var s = r[n];
                    this.addElementBackgroundImages(s);
                }
            }
        }
    };
    var d = {
        1: !0,
        9: !0,
        11: !0
    };
    return o.prototype.addElementBackgroundImages = function(t) {
        var e = getComputedStyle(t);
        if (e) for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n; ) {
            var o = n && n[2];
            o && this.addBackground(o, t), n = i.exec(e.backgroundImage);
        }
    }, o.prototype.addImage = function(t) {
        var e = new r(t);
        this.images.push(e);
    }, o.prototype.addBackground = function(t, e) {
        var i = new s(t, e);
        this.images.push(i);
    }, o.prototype.check = function() {
        function t(t, i, n) {
            setTimeout(function() {
                e.progress(t, i, n);
            });
        }
        var e = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(e) {
            e.once("progress", t), e.check();
        }) : void this.complete();
    }, o.prototype.progress = function(t, e, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [ this, t, e ]), 
        this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), 
        this.options.debug && a && a.log("progress: " + i, t, e);
    }, o.prototype.complete = function() {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(t, [ this ]), this.emitEvent("always", [ this ]), 
        this.jqDeferred) {
            var e = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[e](this);
        }
    }, r.prototype = Object.create(e.prototype), r.prototype.check = function() {
        var t = this.getIsImageComplete();
        return t ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image(), 
        this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), 
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), 
        void (this.proxyImage.src = this.img.src));
    }, r.prototype.getIsImageComplete = function() {
        return this.img.complete && void 0 !== this.img.naturalWidth;
    }, r.prototype.confirm = function(t, e) {
        this.isLoaded = t, this.emitEvent("progress", [ this, this.img, e ]);
    }, r.prototype.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
    }, r.prototype.onload = function() {
        this.confirm(!0, "onload"), this.unbindEvents();
    }, r.prototype.onerror = function() {
        this.confirm(!1, "onerror"), this.unbindEvents();
    }, r.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), 
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
    }, s.prototype = Object.create(r.prototype), s.prototype.check = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), 
        this.img.src = this.url;
        var t = this.getIsImageComplete();
        t && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents());
    }, s.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
    }, s.prototype.confirm = function(t, e) {
        this.isLoaded = t, this.emitEvent("progress", [ this, this.element, e ]);
    }, o.makeJQueryPlugin = function(e) {
        e = e || t.jQuery, e && (h = e, h.fn.imagesLoaded = function(t, e) {
            var i = new o(this, t, e);
            return i.jqDeferred.promise(h(this));
        });
    }, o.makeJQueryPlugin(), o;
});
(function() {
    var h, l = this, m = function(a, b, c) {
        a = a.split(".");
        c = c || l;
        a[0] in c || !c.execScript || c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift()); )
            a.length || void 0 === b ? c = c[d] ? c[d] : c[d] = {} : c[d] = b
    }, aa = function(a, b) {
        for (var c = a.split("."), d = b || l, e; e = c.shift(); )
            if (null != d[e])
                d = d[e];
            else
                return null;
        return d
    }, ba = function() {
    }, ca = function(a) {
        var b = typeof a;
        if ("object" == b)
            if (a) {
                if (a instanceof Array)
                    return "array";
                if (a instanceof Object)
                    return b;
                var c = Object.prototype.toString.call(a);
                if ("[object Window]" == c)
                    return "object";
                if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))
                    return "array";
                if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))
                    return "function"
            } else
                return "null";
        else if ("function" == b && "undefined" == typeof a.call)
            return "object";
        return b
    }, p = function(a) {
        return void 0 !== a
    }, q = function(a) {
        return "array" == ca(a)
    }, da = function(a) {
        var b = 
        ca(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }, s = function(a) {
        return "string" == typeof a
    }, t = function(a) {
        return "function" == ca(a)
    }, ea = function(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }, ha = function(a) {
        return a[fa] || (a[fa] = ++ga)
    }, fa = "closure_uid_" + (1E9 * Math.random() >>> 0), ga = 0, ia = function(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }, ja = function(a, b, c) {
        if (!a)
            throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }, u = function(a, b, c) {
        u = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ia : ja;
        return u.apply(null, arguments)
    }, ka = function(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var b = c.slice();
            b.push.apply(b, arguments);
            return a.apply(this, b)
        }
    }, v = Date.now || function() {
        return +new Date
    }, w = function(a, b) {
        function c() {
        }
        c.prototype = b.prototype;
        a.B = b.prototype;
        a.prototype = new c;
        a.yd = function(a, c, f) {
            return b.prototype[c].apply(a, Array.prototype.slice.call(arguments, 2))
        }
    };
    Function.prototype.bind = Function.prototype.bind || function(a, b) {
        if (1 < arguments.length) {
            var c = Array.prototype.slice.call(arguments, 1);
            c.unshift(this, a);
            return u.apply(null, c)
        }
        return u(this, a)
    };
    var x = function(a) {
        if (Error.captureStackTrace)
            Error.captureStackTrace(this, x);
        else {
            var b = Error().stack;
            b && (this.stack = b)
        }
        a && (this.message = String(a))
    };
    w(x, Error);
    x.prototype.name = "CustomError";
    var la;
    var ma = function(a, b) {
        for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length; )
            d += c.shift() + e.shift();
        return d + c.join("%s")
    }, ua = function(a) {
        if (!na.test(a))
            return a;
        -1 != a.indexOf("&") && (a = a.replace(oa, "&amp;"));
        -1 != a.indexOf("<") && (a = a.replace(qa, "&lt;"));
        -1 != a.indexOf(">") && (a = a.replace(ra, "&gt;"));
        -1 != a.indexOf('"') && (a = a.replace(sa, "&quot;"));
        -1 != a.indexOf("'") && (a = a.replace(ta, "&#39;"));
        return a
    }, oa = /&/g, qa = /</g, ra = />/g, sa = /"/g, ta = /'/g, na = /[&<>"']/, va = function(a, 
    b) {
        return a < b ? -1 : a > b ? 1 : 0
    };
    var wa = function(a, b) {
        b.unshift(a);
        x.call(this, ma.apply(null, b));
        b.shift()
    };
    w(wa, x);
    wa.prototype.name = "AssertionError";
    var y = function(a, b, c) {
        if (!a) {
            var d = "Assertion failed";
            if (b)
                var d = d + (": " + b), e = Array.prototype.slice.call(arguments, 2);
            throw new wa("" + d, e || []);
        }
    }, xa = function(a, b) {
        throw new wa("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
    };
    var z = Array.prototype, ya = z.indexOf ? function(a, b, c) {
        y(null != a.length);
        return z.indexOf.call(a, b, c)
    } : function(a, b, c) {
        c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
        if (s(a))
            return s(b) && 1 == b.length ? a.indexOf(b, c) : -1;
        for (; c < a.length; c++)
            if (c in a && a[c] === b)
                return c;
        return -1
    }, za = z.forEach ? function(a, b, c) {
        y(null != a.length);
        z.forEach.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = s(a) ? a.split("") : a, f = 0; f < d; f++)
            f in e && b.call(c, e[f], f, a)
    }, Aa = z.filter ? function(a, b, c) {
        y(null != a.length);
        return z.filter.call(a, 
        b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = [], f = 0, g = s(a) ? a.split("") : a, k = 0; k < d; k++)
            if (k in g) {
                var n = g[k];
                b.call(c, n, k, a) && (e[f++] = n)
            }
        return e
    }, Ba = z.some ? function(a, b, c) {
        y(null != a.length);
        return z.some.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = s(a) ? a.split("") : a, f = 0; f < d; f++)
            if (f in e && b.call(c, e[f], f, a))
                return !0;
        return !1
    }, Ca = function(a, b) {
        var c = ya(a, b), d;
        if (d = 0 <= c)
            y(null != a.length), z.splice.call(a, c, 1);
        return d
    }, Da = function(a) {
        return z.concat.apply(z, arguments)
    }, Ea = function(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++)
                c[d] = a[d];
            return c
        }
        return []
    }, Fa = function(a, b, c) {
        y(null != a.length);
        return 2 >= arguments.length ? z.slice.call(a, b) : z.slice.call(a, b, c)
    };
    var Ga, Ha, Ia, Ja, Ka = function() {
        return l.navigator ? l.navigator.userAgent : null
    };
    Ja = Ia = Ha = Ga = !1;
    var La;
    if (La = Ka()) {
        var Ma = l.navigator;
        Ga = 0 == La.lastIndexOf("Opera", 0);
        Ha = !Ga && (-1 != La.indexOf("MSIE") || -1 != La.indexOf("Trident"));
        Ia = !Ga && -1 != La.indexOf("WebKit");
        Ja = !Ga && !Ia && !Ha && "Gecko" == Ma.product
    }
    var Na = Ga, A = Ha, C = Ja, D = Ia, Oa = function() {
        var a = l.document;
        return a ? a.documentMode : void 0
    }, Pa;
    t: {
        var Qa = "", Ra;
        if (Na && l.opera)
            var Sa = l.opera.version, Qa = "function" == typeof Sa ? Sa() : Sa;
        else if (C ? Ra = /rv\:([^\);]+)(\)|;)/ : A ? Ra = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : D && (Ra = /WebKit\/(\S+)/), Ra)
            var Ta = Ra.exec(Ka()), Qa = Ta ? Ta[1] : "";
        if (A) {
            var Ua = Oa();
            if (Ua > parseFloat(Qa)) {
                Pa = String(Ua);
                break t
            }
        }
        Pa = Qa
    }
    var Va = Pa, Wa = {}, E = function(a) {
        var b;
        if (!(b = Wa[a])) {
            b = 0;
            for (var c = String(Va).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), d = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && f < e; f++) {
                var g = c[f] || "", k = d[f] || "", n = RegExp("(\\d*)(\\D*)", "g"), r = RegExp("(\\d*)(\\D*)", "g");
                do {
                    var B = n.exec(g) || ["", "", ""], pa = r.exec(k) || ["", "", ""];
                    if (0 == B[0].length && 0 == pa[0].length)
                        break;
                    b = va(0 == B[1].length ? 0 : parseInt(B[1], 10), 0 == pa[1].length ? 0 : parseInt(pa[1], 10)) || va(0 == B[2].length, 
                    0 == pa[2].length) || va(B[2], pa[2])
                } while (0 == b)
            }
            b = Wa[a] = 0 <= b
        }
        return b
    }, Xa = l.document, Ya = Xa && A ? Oa() || ("CSS1Compat" == Xa.compatMode ? parseInt(Va, 10) : 5) : void 0;
    var Za = null, $a = null, ab = null;
    var bb = function() {
        this.q = -1
    };
    var cb = function(a, b, c) {
        this.q = -1;
        this.w = a;
        this.q = c || a.q || 16;
        this.zc = Array(this.q);
        this.Ob = Array(this.q);
        a = b;
        a.length > this.q && (this.w.update(a), a = this.w.Ha(), this.w.reset());
        for (c = 0; c < this.q; c++)
            b = c < a.length ? a[c] : 0, this.zc[c] = b ^ 92, this.Ob[c] = b ^ 54;
        this.w.update(this.Ob)
    };
    w(cb, bb);
    cb.prototype.reset = function() {
        this.w.reset();
        this.w.update(this.Ob)
    };
    cb.prototype.update = function(a, b) {
        this.w.update(a, b)
    };
    cb.prototype.Ha = function() {
        var a = this.w.Ha();
        this.w.reset();
        this.w.update(this.zc);
        this.w.update(a);
        return this.w.Ha()
    };
    var db = function() {
        this.q = -1;
        this.q = 64;
        this.i = [];
        this.Kb = [];
        this.dd = [];
        this.ib = [];
        this.ib[0] = 128;
        for (var a = 1; a < this.q; ++a)
            this.ib[a] = 0;
        this.hb = this.va = 0;
        this.reset()
    };
    w(db, bb);
    db.prototype.reset = function() {
        this.i[0] = 1732584193;
        this.i[1] = 4023233417;
        this.i[2] = 2562383102;
        this.i[3] = 271733878;
        this.i[4] = 3285377520;
        this.hb = this.va = 0
    };
    var eb = function(a, b, c) {
        c || (c = 0);
        var d = a.dd;
        if (s(b))
            for (var e = 0; 16 > e; e++)
                d[e] = b.charCodeAt(c) << 24 | b.charCodeAt(c + 1) << 16 | b.charCodeAt(c + 2) << 8 | b.charCodeAt(c + 3), c += 4;
        else
            for (e = 0; 16 > e; e++)
                d[e] = b[c] << 24 | b[c + 1] << 16 | b[c + 2] << 8 | b[c + 3], c += 4;
        for (e = 16; 80 > e; e++) {
            var f = d[e - 3] ^ d[e - 8] ^ d[e - 14] ^ d[e - 16];
            d[e] = (f << 1 | f >>> 31) & 4294967295
        }
        b = a.i[0];
        c = a.i[1];
        for (var g = a.i[2], k = a.i[3], n = a.i[4], r, e = 0; 80 > e; e++)
            40 > e ? 20 > e ? (f = k ^ c & (g ^ k), r = 1518500249) : (f = c ^ g ^ k, r = 1859775393) : 60 > e ? (f = c & g | k & (c | g), r = 2400959708) : (f = c ^ g ^ k, r = 3395469782), 
            f = (b << 5 | b >>> 27) + f + n + r + d[e] & 4294967295, n = k, k = g, g = (c << 30 | c >>> 2) & 4294967295, c = b, b = f;
        a.i[0] = a.i[0] + b & 4294967295;
        a.i[1] = a.i[1] + c & 4294967295;
        a.i[2] = a.i[2] + g & 4294967295;
        a.i[3] = a.i[3] + k & 4294967295;
        a.i[4] = a.i[4] + n & 4294967295
    };
    db.prototype.update = function(a, b) {
        p(b) || (b = a.length);
        for (var c = b - this.q, d = 0, e = this.Kb, f = this.va; d < b; ) {
            if (0 == f)
                for (; d <= c; )
                    eb(this, a, d), d += this.q;
            if (s(a))
                for (; d < b; ) {
                    if (e[f] = a.charCodeAt(d), ++f, ++d, f == this.q) {
                        eb(this, e);
                        f = 0;
                        break
                    }
                }
            else
                for (; d < b; )
                    if (e[f] = a[d], ++f, ++d, f == this.q) {
                        eb(this, e);
                        f = 0;
                        break
                    }
        }
        this.va = f;
        this.hb += b
    };
    db.prototype.Ha = function() {
        var a = [], b = 8 * this.hb;
        56 > this.va ? this.update(this.ib, 56 - this.va) : this.update(this.ib, this.q - (this.va - 56));
        for (var c = this.q - 1; 56 <= c; c--)
            this.Kb[c] = b & 255, b /= 256;
        eb(this, this.Kb);
        for (c = b = 0; 5 > c; c++)
            for (var d = 24; 0 <= d; d -= 8)
                a[b] = this.i[c] >> d & 255, ++b;
        return a
    };
    var fb = function(a, b) {
        for (var c in a)
            b.call(void 0, a[c], c, a)
    }, gb = function(a) {
        var b = [], c = 0, d;
        for (d in a)
            b[c++] = a[d];
        return b
    }, hb = function(a) {
        var b = [], c = 0, d;
        for (d in a)
            b[c++] = d;
        return b
    }, ib = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "), jb = function(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d)
                a[c] = d[c];
            for (var f = 0; f < ib.length; f++)
                c = ib[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    };
    var kb = !A || A && 9 <= Ya, lb = !C && !A || A && A && 9 <= Ya || C && E("1.9.1");
    A && E("9");
    var mb = function(a, b) {
        var c;
        c = a.className;
        c = s(c) && c.match(/\S+/g) || [];
        for (var d = Fa(arguments, 1), e = c.length + d.length, f = c, g = 0; g < d.length; g++)
            0 <= ya(f, d[g]) || f.push(d[g]);
        a.className = c.join(" ");
        return c.length == e
    };
    var F = function(a) {
        return a ? new nb(9 == a.nodeType ? a : a.ownerDocument || a.document) : la || (la = new nb)
    }, pb = function(a, b) {
        fb(b, function(b, d) {
            "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : d in ob ? a.setAttribute(ob[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b
        })
    }, ob = {cellpadding: "cellPadding",cellspacing: "cellSpacing",colspan: "colSpan",frameborder: "frameBorder",height: "height",maxlength: "maxLength",role: "role",rowspan: "rowSpan",type: "type",
        usemap: "useMap",valign: "vAlign",width: "width"}, rb = function(a, b, c) {
        function d(c) {
            c && b.appendChild(s(c) ? a.createTextNode(c) : c)
        }
        for (var e = 2; e < c.length; e++) {
            var f = c[e];
            !da(f) || ea(f) && 0 < f.nodeType ? d(f) : za(qb(f) ? Ea(f) : f, d)
        }
    }, sb = function(a) {
        return a && a.parentNode ? a.parentNode.removeChild(a) : null
    }, qb = function(a) {
        if (a && "number" == typeof a.length) {
            if (ea(a))
                return "function" == typeof a.item || "string" == typeof a.item;
            if (t(a))
                return "function" == typeof a.item
        }
        return !1
    }, nb = function(a) {
        this.aa = a || l.document || document
    }, 
    tb = function(a, b) {
        var c;
        c = a.aa;
        var d = b && "*" != b ? b.toUpperCase() : "";
        c = c.querySelectorAll && c.querySelector && d ? c.querySelectorAll(d + "") : c.getElementsByTagName(d || "*");
        return c
    };
    h = nb.prototype;
    h.yc = function(a, b, c) {
        var d = this.aa, e = arguments, f = e[0], g = e[1];
        if (!kb && g && (g.name || g.type)) {
            f = ["<", f];
            g.name && f.push(' name="', ua(g.name), '"');
            if (g.type) {
                f.push(' type="', ua(g.type), '"');
                var k = {};
                jb(k, g);
                delete k.type;
                g = k
            }
            f.push(">");
            f = f.join("")
        }
        f = d.createElement(f);
        g && (s(g) ? f.className = g : q(g) ? mb.apply(null, [f].concat(g)) : pb(f, g));
        2 < e.length && rb(d, f, e);
        return f
    };
    h.createElement = function(a) {
        return this.aa.createElement(a)
    };
    h.createTextNode = function(a) {
        return this.aa.createTextNode(String(a))
    };
    h.e = function() {
        var a = this.aa;
        return a.parentWindow || a.defaultView
    };
    h.appendChild = function(a, b) {
        a.appendChild(b)
    };
    h.removeNode = sb;
    h.Ic = function(a) {
        return lb && void 0 != a.children ? a.children : Aa(a.childNodes, function(a) {
            return 1 == a.nodeType
        })
    };
    var G = function() {
    };
    G.prototype.ga = !1;
    G.prototype.Tb = function() {
        this.ga || (this.ga = !0, this.f())
    };
    var ub = function(a, b) {
        a.Ka || (a.Ka = []);
        a.Ka.push(u(b, void 0))
    };
    G.prototype.f = function() {
        if (this.Ka)
            for (; this.Ka.length; )
                this.Ka.shift()()
    };
    var H = function(a) {
        a && "function" == typeof a.Tb && a.Tb()
    };
    var I = function(a, b) {
        this.type = a;
        this.currentTarget = this.target = b;
        this.defaultPrevented = this.xa = !1;
        this.uc = !0
    };
    I.prototype.f = function() {
    };
    I.prototype.Tb = function() {
    };
    I.prototype.preventDefault = function() {
        this.defaultPrevented = !0;
        this.uc = !1
    };
    var vb = function(a) {
        vb[" "](a);
        return a
    };
    vb[" "] = ba;
    var wb = function(a, b) {
        try {
            return vb(a[b]), !0
        } catch (c) {
        }
        return !1
    };
    var xb = !A || A && 9 <= Ya, yb = A && !E("9");
    !D || E("528");
    C && E("1.9b") || A && E("8") || Na && E("9.5") || D && E("528");
    C && !E("8") || A && E("9");
    var zb = function(a, b) {
        I.call(this, a ? a.type : "");
        this.relatedTarget = this.currentTarget = this.target = null;
        this.charCode = this.keyCode = this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.nb = this.state = null;
        if (a) {
            var c = this.type = a.type;
            this.target = a.target || a.srcElement;
            this.currentTarget = b;
            var d = a.relatedTarget;
            d ? C && (wb(d, "nodeName") || (d = null)) : "mouseover" == c ? d = a.fromElement : "mouseout" == c && (d = a.toElement);
            this.relatedTarget = d;
            this.offsetX = D || void 0 !== a.offsetX ? a.offsetX : a.layerX;
            this.offsetY = D || void 0 !== a.offsetY ? a.offsetY : a.layerY;
            this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX;
            this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY;
            this.screenX = a.screenX || 0;
            this.screenY = a.screenY || 0;
            this.button = a.button;
            this.keyCode = a.keyCode || 0;
            this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
            this.ctrlKey = a.ctrlKey;
            this.altKey = a.altKey;
            this.shiftKey = a.shiftKey;
            this.metaKey = a.metaKey;
            this.state = a.state;
            this.nb = 
            a;
            a.defaultPrevented && this.preventDefault()
        }
    };
    w(zb, I);
    zb.prototype.preventDefault = function() {
        zb.B.preventDefault.call(this);
        var a = this.nb;
        if (a.preventDefault)
            a.preventDefault();
        else if (a.returnValue = !1, yb)
            try {
                if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode)
                    a.keyCode = -1
            } catch (b) {
            }
    };
    zb.prototype.f = function() {
    };
    var Ab = "closure_listenable_" + (1E6 * Math.random() | 0), Bb = function(a) {
        try {
            return !(!a || !a[Ab])
        } catch (b) {
            return !1
        }
    }, Cb = 0;
    var Db = function(a, b, c, d, e) {
        this.ea = a;
        this.kb = null;
        this.src = b;
        this.type = c;
        this.Za = !!d;
        this.eb = e;
        this.key = ++Cb;
        this.ra = this.bb = !1
    }, Eb = function(a) {
        a.ra = !0;
        a.ea = null;
        a.kb = null;
        a.src = null;
        a.eb = null
    };
    var Fb = function(a) {
        this.src = a;
        this.u = {};
        this.Ga = 0
    };
    Fb.prototype.add = function(a, b, c, d, e) {
        var f = this.u[a];
        f || (f = this.u[a] = [], this.Ga++);
        var g = Gb(f, b, d, e);
        -1 < g ? (a = f[g], c || (a.bb = !1)) : (a = new Db(b, this.src, a, !!d, e), a.bb = c, f.push(a));
        return a
    };
    Fb.prototype.remove = function(a, b, c, d) {
        if (!(a in this.u))
            return !1;
        var e = this.u[a];
        b = Gb(e, b, c, d);
        return -1 < b ? (Eb(e[b]), y(null != e.length), z.splice.call(e, b, 1), 0 == e.length && (delete this.u[a], this.Ga--), !0) : !1
    };
    var Hb = function(a, b) {
        var c = b.type;
        if (!(c in a.u))
            return !1;
        var d = Ca(a.u[c], b);
        d && (Eb(b), 0 == a.u[c].length && (delete a.u[c], a.Ga--));
        return d
    };
    Fb.prototype.ab = function(a) {
        var b = 0, c;
        for (c in this.u)
            if (!a || c == a) {
                for (var d = this.u[c], e = 0; e < d.length; e++)
                    ++b, Eb(d[e]);
                delete this.u[c];
                this.Ga--
            }
        return b
    };
    Fb.prototype.Ja = function(a, b, c, d) {
        a = this.u[a];
        var e = -1;
        a && (e = Gb(a, b, c, d));
        return -1 < e ? a[e] : null
    };
    var Gb = function(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.ra && f.ea == b && f.Za == !!c && f.eb == d)
                return e
        }
        return -1
    };
    var Ib = "closure_lm_" + (1E6 * Math.random() | 0), Jb = {}, Kb = 0, Lb = function(a, b, c, d, e) {
        if (q(b)) {
            for (var f = 0; f < b.length; f++)
                Lb(a, b[f], c, d, e);
            return null
        }
        c = Mb(c);
        return Bb(a) ? a.Ma(b, c, d, e) : Nb(a, b, c, !1, d, e)
    }, Nb = function(a, b, c, d, e, f) {
        if (!b)
            throw Error("Invalid event type");
        var g = !!e, k = Ob(a);
        k || (a[Ib] = k = new Fb(a));
        c = k.add(b, c, d, e, f);
        if (c.kb)
            return c;
        d = Pb();
        c.kb = d;
        d.src = a;
        d.ea = c;
        a.addEventListener ? a.addEventListener(b, d, g) : a.attachEvent(b in Jb ? Jb[b] : Jb[b] = "on" + b, d);
        Kb++;
        return c
    }, Pb = function() {
        var a = Qb, b = xb ? function(c) {
            return a.call(b.src, 
            b.ea, c)
        } : function(c) {
            c = a.call(b.src, b.ea, c);
            if (!c)
                return c
        };
        return b
    }, Rb = function(a, b, c, d, e) {
        if (q(b)) {
            for (var f = 0; f < b.length; f++)
                Rb(a, b[f], c, d, e);
            return null
        }
        c = Mb(c);
        return Bb(a) ? a.Qc(b, c, d, e) : Nb(a, b, c, !0, d, e)
    }, Sb = function(a, b, c, d, e) {
        if (q(b))
            for (var f = 0; f < b.length; f++)
                Sb(a, b[f], c, d, e);
        else
            c = Mb(c), Bb(a) ? a.Pb(b, c, d, e) : a && (a = Ob(a)) && (b = a.Ja(b, c, !!d, e)) && Tb(b)
    }, Tb = function(a) {
        if ("number" == typeof a || !a || a.ra)
            return !1;
        var b = a.src;
        if (Bb(b))
            return Hb(b.U, a);
        var c = a.type, d = a.kb;
        b.removeEventListener ? b.removeEventListener(c, 
        d, a.Za) : b.detachEvent && b.detachEvent(c in Jb ? Jb[c] : Jb[c] = "on" + c, d);
        Kb--;
        (c = Ob(b)) ? (Hb(c, a), 0 == c.Ga && (c.src = null, b[Ib] = null)) : Eb(a);
        return !0
    }, Ub = function(a, b, c, d, e) {
        c = Mb(c);
        d = !!d;
        return Bb(a) ? a.Ja(b, c, d, e) : a ? (a = Ob(a)) ? a.Ja(b, c, d, e) : null : null
    }, Wb = function(a, b, c, d) {
        var e = 1;
        if (a = Ob(a))
            if (b = a.u[b])
                for (b = Ea(b), a = 0; a < b.length; a++) {
                    var f = b[a];
                    f && f.Za == c && !f.ra && (e &= !1 !== Vb(f, d))
                }
        return Boolean(e)
    }, Vb = function(a, b) {
        var c = a.ea, d = a.eb || a.src;
        a.bb && Tb(a);
        return c.call(d, b)
    }, Qb = function(a, b) {
        if (a.ra)
            return !0;
        if (!xb) {
            var c = b || aa("window.event"), d = new zb(c, this), e = !0;
            if (!(0 > c.keyCode || void 0 != c.returnValue)) {
                t: {
                    var f = !1;
                    if (0 == c.keyCode)
                        try {
                            c.keyCode = -1;
                            break t
                        } catch (g) {
                            f = !0
                        }
                    if (f || void 0 == c.returnValue)
                        c.returnValue = !0
                }
                c = [];
                for (f = d.currentTarget; f; f = f.parentNode)
                    c.push(f);
                for (var f = a.type, k = c.length - 1; !d.xa && 0 <= k; k--)
                    d.currentTarget = c[k], e &= Wb(c[k], f, !0, d);
                for (k = 0; !d.xa && k < c.length; k++)
                    d.currentTarget = c[k], e &= Wb(c[k], f, !1, d)
            }
            return e
        }
        return Vb(a, new zb(b, this))
    }, Ob = function(a) {
        a = a[Ib];
        return a instanceof 
        Fb ? a : null
    }, Xb = "__closure_events_fn_" + (1E9 * Math.random() >>> 0), Mb = function(a) {
        y(a, "Listener can not be null.");
        if (t(a))
            return a;
        y(a.handleEvent, "An object listener must have handleEvent method.");
        return a[Xb] || (a[Xb] = function(b) {
            return a.handleEvent(b)
        })
    };
    var Yb = function() {
        this.U = new Fb(this);
        this.md = this
    };
    w(Yb, G);
    Yb.prototype[Ab] = !0;
    h = Yb.prototype;
    h.Jb = null;
    h.addEventListener = function(a, b, c, d) {
        Lb(this, a, b, c, d)
    };
    h.removeEventListener = function(a, b, c, d) {
        Sb(this, a, b, c, d)
    };
    h.dispatchEvent = function(a) {
        Zb(this);
        var b, c = this.Jb;
        if (c) {
            b = [];
            for (var d = 1; c; c = c.Jb)
                b.push(c), y(1E3 > ++d, "infinite loop")
        }
        c = this.md;
        d = a.type || a;
        if (s(a))
            a = new I(a, c);
        else if (a instanceof I)
            a.target = a.target || c;
        else {
            var e = a;
            a = new I(d, c);
            jb(a, e)
        }
        var e = !0, f;
        if (b)
            for (var g = b.length - 1; !a.xa && 0 <= g; g--)
                f = a.currentTarget = b[g], e = $b(f, d, !0, a) && e;
        a.xa || (f = a.currentTarget = c, e = $b(f, d, !0, a) && e, a.xa || (e = $b(f, d, !1, a) && e));
        if (b)
            for (g = 0; !a.xa && g < b.length; g++)
                f = a.currentTarget = b[g], e = $b(f, d, !1, a) && e;
        return e
    };
    h.f = function() {
        Yb.B.f.call(this);
        this.U && this.U.ab(void 0);
        this.Jb = null
    };
    h.Ma = function(a, b, c, d) {
        Zb(this);
        return this.U.add(String(a), b, !1, c, d)
    };
    h.Qc = function(a, b, c, d) {
        return this.U.add(String(a), b, !0, c, d)
    };
    h.Pb = function(a, b, c, d) {
        return this.U.remove(String(a), b, c, d)
    };
    var $b = function(a, b, c, d) {
        b = a.U.u[String(b)];
        if (!b)
            return !0;
        b = Ea(b);
        for (var e = !0, f = 0; f < b.length; ++f) {
            var g = b[f];
            if (g && !g.ra && g.Za == c) {
                var k = g.ea, n = g.eb || g.src;
                g.bb && Hb(a.U, g);
                e = !1 !== k.call(n, d) && e
            }
        }
        return e && !1 != d.uc
    };
    Yb.prototype.Ja = function(a, b, c, d) {
        return this.U.Ja(String(a), b, c, d)
    };
    var Zb = function(a) {
        y(a.U, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
    };
    var ac = function(a, b) {
        Yb.call(this);
        this.ua = a || 1;
        this.sa = b || l;
        this.Lb = u(this.ld, this);
        this.Mb = v()
    };
    w(ac, Yb);
    h = ac.prototype;
    h.mb = !1;
    h.H = null;
    h.ld = function() {
        if (this.mb) {
            var a = v() - this.Mb;
            0 < a && a < 0.8 * this.ua ? this.H = this.sa.setTimeout(this.Lb, this.ua - a) : (this.H && (this.sa.clearTimeout(this.H), this.H = null), this.dispatchEvent("tick"), this.mb && (this.H = this.sa.setTimeout(this.Lb, this.ua), this.Mb = v()))
        }
    };
    h.start = function() {
        this.mb = !0;
        this.H || (this.H = this.sa.setTimeout(this.Lb, this.ua), this.Mb = v())
    };
    h.stop = function() {
        this.mb = !1;
        this.H && (this.sa.clearTimeout(this.H), this.H = null)
    };
    h.f = function() {
        ac.B.f.call(this);
        this.stop();
        delete this.sa
    };
    var bc = function(a, b) {
        if (!t(a))
            if (a && "function" == typeof a.handleEvent)
                a = u(a.handleEvent, a);
            else
                throw Error("Invalid listener argument");
        return 2147483647 < b ? -1 : l.setTimeout(a, b || 0)
    };
    var cc = function(a, b, c) {
        this.Hb = a;
        this.ua = b || 0;
        this.qa = c;
        this.hd = u(this.nd, this)
    };
    w(cc, G);
    h = cc.prototype;
    h.G = 0;
    h.f = function() {
        cc.B.f.call(this);
        this.stop();
        delete this.Hb;
        delete this.qa
    };
    h.start = function(a) {
        this.stop();
        this.G = bc(this.hd, p(a) ? a : this.ua)
    };
    h.stop = function() {
        0 != this.G && l.clearTimeout(this.G);
        this.G = 0
    };
    h.nd = function() {
        this.G = 0;
        this.Hb && this.Hb.call(this.qa)
    };
    var J = function(a) {
        this.qa = a;
        this.g = {}
    };
    w(J, G);
    var dc = [];
    J.prototype.Ma = function(a, b, c, d) {
        q(b) || (dc[0] = b, b = dc);
        for (var e = 0; e < b.length; e++) {
            var f = Lb(a, b[e], c || this.handleEvent, d || !1, this.qa || this);
            if (!f)
                break;
            this.g[f.key] = f
        }
        return this
    };
    J.prototype.Qc = function(a, b, c, d) {
        return ec(this, a, b, c, d)
    };
    var ec = function(a, b, c, d, e, f) {
        if (q(c))
            for (var g = 0; g < c.length; g++)
                ec(a, b, c[g], d, e, f);
        else {
            b = Rb(b, c, d || a.handleEvent, e, f || a.qa || a);
            if (!b)
                return a;
            a.g[b.key] = b
        }
        return a
    };
    J.prototype.Pb = function(a, b, c, d, e) {
        if (q(b))
            for (var f = 0; f < b.length; f++)
                this.Pb(a, b[f], c, d, e);
        else if (a = Ub(a, b, c || this.handleEvent, d, e || this.qa || this))
            Tb(a), delete this.g[a.key];
        return this
    };
    J.prototype.ab = function() {
        fb(this.g, Tb);
        this.g = {}
    };
    J.prototype.f = function() {
        J.B.f.call(this);
        this.ab()
    };
    J.prototype.handleEvent = function() {
        throw Error("EventHandler.handleEvent not implemented");
    };
    var fc = function(a) {
        a = String(a);
        if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, "")))
            try {
                return eval("(" + a + ")")
            } catch (b) {
            }
        throw Error("Invalid JSON string: " + a);
    }, ic = function(a) {
        var b = [];
        gc(new hc, a, b);
        return b.join("")
    }, hc = function() {
        this.qb = void 0
    }, gc = function(a, b, c) {
        switch (typeof b) {
            case "string":
                jc(b, c);
                break;
            case "number":
                c.push(isFinite(b) && !isNaN(b) ? b : "null");
                break;
            case "boolean":
                c.push(b);
                break;
            case "undefined":
                c.push("null");
                break;
            case "object":
                if (null == b) {
                    c.push("null");
                    break
                }
                if (q(b)) {
                    var d = b.length;
                    c.push("[");
                    for (var e = "", f = 0; f < d; f++)
                        c.push(e), e = b[f], gc(a, a.qb ? a.qb.call(b, String(f), e) : e, c), e = ",";
                    c.push("]");
                    break
                }
                c.push("{");
                d = "";
                for (f in b)
                    Object.prototype.hasOwnProperty.call(b, f) && (e = b[f], "function" != typeof e && (c.push(d), jc(f, c), c.push(":"), gc(a, a.qb ? a.qb.call(b, f, e) : e, c), d = ","));
                c.push("}");
                break;
            case "function":
                break;
            default:
                throw Error("Unknown type: " + typeof b);
        }
    }, kc = {'"': '\\"',"\\": "\\\\","/": "\\/","\b": "\\b","\f": "\\f","\n": "\\n","\r": "\\r","\t": "\\t","\x0B": "\\u000b"}, lc = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g, jc = function(a, b) {
        b.push('"', a.replace(lc, function(a) {
            if (a in kc)
                return kc[a];
            var b = a.charCodeAt(0), e = "\\u";
            16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
            return kc[a] = e + b.toString(16)
        }), '"')
    };
    var mc = "StopIteration" in l ? l.StopIteration : Error("StopIteration"), nc = function() {
    };
    nc.prototype.next = function() {
        throw mc;
    };
    nc.prototype.td = function() {
        return this
    };
    var K = function(a, b) {
        this.V = {};
        this.g = [];
        this.cb = this.l = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2)
                throw Error("Uneven number of arguments");
            for (var d = 0; d < c; d += 2)
                this.set(arguments[d], arguments[d + 1])
        } else if (a) {
            a instanceof K ? (c = a.pa(), d = a.Z()) : (c = hb(a), d = gb(a));
            for (var e = 0; e < c.length; e++)
                this.set(c[e], d[e])
        }
    };
    K.prototype.Z = function() {
        oc(this);
        for (var a = [], b = 0; b < this.g.length; b++)
            a.push(this.V[this.g[b]]);
        return a
    };
    K.prototype.pa = function() {
        oc(this);
        return this.g.concat()
    };
    K.prototype.Fa = function(a) {
        return pc(this.V, a)
    };
    K.prototype.remove = function(a) {
        return pc(this.V, a) ? (delete this.V[a], this.l--, this.cb++, this.g.length > 2 * this.l && oc(this), !0) : !1
    };
    var oc = function(a) {
        if (a.l != a.g.length) {
            for (var b = 0, c = 0; b < a.g.length; ) {
                var d = a.g[b];
                pc(a.V, d) && (a.g[c++] = d);
                b++
            }
            a.g.length = c
        }
        if (a.l != a.g.length) {
            for (var e = {}, c = b = 0; b < a.g.length; )
                d = a.g[b], pc(e, d) || (a.g[c++] = d, e[d] = 1), b++;
            a.g.length = c
        }
    };
    K.prototype.get = function(a, b) {
        return pc(this.V, a) ? this.V[a] : b
    };
    K.prototype.set = function(a, b) {
        pc(this.V, a) || (this.l++, this.g.push(a), this.cb++);
        this.V[a] = b
    };
    K.prototype.Wa = function() {
        return new K(this)
    };
    K.prototype.td = function(a) {
        oc(this);
        var b = 0, c = this.g, d = this.V, e = this.cb, f = this, g = new nc;
        g.next = function() {
            for (; ; ) {
                if (e != f.cb)
                    throw Error("The map has changed since the iterator was created");
                if (b >= c.length)
                    throw mc;
                var g = c[b++];
                return a ? g : d[g]
            }
        };
        return g
    };
    var pc = function(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
    var qc = function(a) {
        if ("function" == typeof a.Z)
            return a.Z();
        if (s(a))
            return a.split("");
        if (da(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++)
                b.push(a[d]);
            return b
        }
        return gb(a)
    }, rc = function(a, b, c) {
        if ("function" == typeof a.forEach)
            a.forEach(b, c);
        else if (da(a) || s(a))
            za(a, b, c);
        else {
            var d;
            if ("function" == typeof a.pa)
                d = a.pa();
            else if ("function" != typeof a.Z)
                if (da(a) || s(a)) {
                    d = [];
                    for (var e = a.length, f = 0; f < e; f++)
                        d.push(f)
                } else
                    d = hb(a);
            else
                d = void 0;
            for (var e = qc(a), f = e.length, g = 0; g < f; g++)
                b.call(c, e[g], d && d[g], a)
        }
    };
    var tc = function(a) {
        return sc(a || arguments.callee.caller, [])
    }, sc = function(a, b) {
        var c = [];
        if (0 <= ya(b, a))
            c.push("[...circular reference...]");
        else if (a && 50 > b.length) {
            c.push(uc(a) + "(");
            for (var d = a.arguments, e = 0; d && e < d.length; e++) {
                0 < e && c.push(", ");
                var f;
                f = d[e];
                switch (typeof f) {
                    case "object":
                        f = f ? "object" : "null";
                        break;
                    case "string":
                        break;
                    case "number":
                        f = String(f);
                        break;
                    case "boolean":
                        f = f ? "true" : "false";
                        break;
                    case "function":
                        f = (f = uc(f)) ? f : "[fn]";
                        break;
                    default:
                        f = typeof f
                }
                40 < f.length && (f = f.substr(0, 40) + "...");
                c.push(f)
            }
            b.push(a);
            c.push(")\n");
            try {
                c.push(sc(a.caller, b))
            } catch (g) {
                c.push("[exception trying to get caller]\n")
            }
        } else
            a ? c.push("[...long stack...]") : c.push("[end]");
        return c.join("")
    }, uc = function(a) {
        if (vc[a])
            return vc[a];
        a = String(a);
        if (!vc[a]) {
            var b = /function ([^\(]+)/.exec(a);
            vc[a] = b ? b[1] : "[Anonymous]"
        }
        return vc[a]
    }, vc = {};
    var wc = function(a, b, c, d, e) {
        this.reset(a, b, c, d, e)
    };
    wc.prototype.lb = 0;
    wc.prototype.Gc = null;
    wc.prototype.Fc = null;
    var xc = 0;
    wc.prototype.reset = function(a, b, c, d, e) {
        this.lb = "number" == typeof e ? e : xc++;
        d || v();
        this.Ia = a;
        this.kd = b;
        delete this.Gc;
        delete this.Fc
    };
    wc.prototype.Jc = function(a) {
        this.Ia = a
    };
    var L = function(a) {
        this.Ac = a;
        this.Bc = this.Qb = this.Ia = this.k = null
    }, yc = function(a, b) {
        this.name = a;
        this.value = b
    };
    yc.prototype.toString = function() {
        return this.name
    };
    var zc = new yc("SEVERE", 1E3), Ac = new yc("WARNING", 900), Bc = new yc("INFO", 800), Cc = new yc("CONFIG", 700), Dc = new yc("FINE", 500), Ec = new yc("FINEST", 300);
    L.prototype.getName = function() {
        return this.Ac
    };
    L.prototype.getParent = function() {
        return this.k
    };
    L.prototype.Ic = function() {
        this.Qb || (this.Qb = {});
        return this.Qb
    };
    L.prototype.Jc = function(a) {
        this.Ia = a
    };
    var Fc = function(a) {
        if (a.Ia)
            return a.Ia;
        if (a.k)
            return Fc(a.k);
        xa("Root logger has no level set.");
        return null
    };
    L.prototype.log = function(a, b, c) {
        if (a.value >= Fc(this).value)
            for (t(b) && (b = b()), a = this.rd(a, b, c), b = "log:" + a.kd, l.console && (l.console.timeStamp ? l.console.timeStamp(b) : l.console.markTimeline && l.console.markTimeline(b)), l.msWriteProfilerMark && l.msWriteProfilerMark(b), b = this; b; ) {
                c = b;
                var d = a;
                if (c.Bc)
                    for (var e = 0, f = void 0; f = c.Bc[e]; e++)
                        f(d);
                b = b.getParent()
            }
    };
    L.prototype.rd = function(a, b, c) {
        var d = new wc(a, String(b), this.Ac);
        if (c) {
            d.Gc = c;
            var e;
            var f = arguments.callee.caller;
            try {
                var g;
                var k = aa("window.location.href");
                if (s(c))
                    g = {message: c,name: "Unknown error",lineNumber: "Not available",fileName: k,stack: "Not available"};
                else {
                    var n, r, B = !1;
                    try {
                        n = c.lineNumber || c.zd || "Not available"
                    } catch (pa) {
                        n = "Not available", B = !0
                    }
                    try {
                        r = c.fileName || c.filename || c.sourceURL || l.$googDebugFname || k
                    } catch (Se) {
                        r = "Not available", B = !0
                    }
                    g = !B && c.lineNumber && c.fileName && c.stack && c.message && 
                    c.name ? c : {message: c.message || "Not available",name: c.name || "UnknownError",lineNumber: n,fileName: r,stack: c.stack || "Not available"}
                }
                e = "Message: " + ua(g.message) + '\nUrl: <a href="view-source:' + g.fileName + '" target="_new">' + g.fileName + "</a>\nLine: " + g.lineNumber + "\n\nBrowser stack:\n" + ua(g.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + ua(tc(f) + "-> ")
            } catch (pe) {
                e = "Exception trying to expose exception! You win, we lose. " + pe
            }
            d.Fc = e
        }
        return d
    };
    L.prototype.info = function(a, b) {
        this.log(Bc, a, b)
    };
    var Gc = {}, Hc = null, Ic = function(a) {
        Hc || (Hc = new L(""), Gc[""] = Hc, Hc.Jc(Cc));
        var b;
        if (!(b = Gc[a])) {
            b = new L(a);
            var c = a.lastIndexOf("."), d = a.substr(c + 1), c = Ic(a.substr(0, c));
            c.Ic()[d] = b;
            b.k = c;
            Gc[a] = b
        }
        return b
    };
    var N = function(a) {
        var b = M;
        b && b.log(Ec, a, void 0)
    }, O = function(a, b) {
        var c = M;
        c && c.log(zc, a, b)
    }, P = function(a, b, c) {
        a && a.log(Ac, b, c)
    }, Q = function(a) {
        var b = M;
        b && b.info(a, void 0)
    }, R = function(a) {
        var b = M;
        b && b.log(Dc, a, void 0)
    };
    var Jc = function() {
        this.Pa = {}
    };
    w(Jc, G);
    Jc.prototype.vb = Ic("goog.messaging.AbstractChannel");
    Jc.prototype.Q = function(a) {
        a && a()
    };
    Jc.prototype.D = function() {
        return !0
    };
    var Kc = function(a, b, c) {
        a.Pa[b] = {A: c,dc: !1}
    };
    Jc.prototype.f = function() {
        Jc.B.f.call(this);
        delete this.vb;
        delete this.Pa;
        delete this.Yb
    };
    var Lc = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"), Nc = function(a) {
        if (Mc) {
            Mc = !1;
            var b = l.location;
            if (b) {
                var c = b.href;
                if (c && (c = (c = Nc(c)[3] || null) && decodeURIComponent(c)) && c != b.hostname)
                    throw Mc = !0, Error();
            }
        }
        return a.match(Lc)
    }, Mc = D, Oc = function(a) {
        var b = Nc(a);
        a = b[1];
        var c = b[2], d = b[3], b = b[4], e = "";
        a && (e += a + ":");
        d && (e += "//", c && (e += c + "@"), e += d, b && (e += ":" + b));
        return e
    };
    var S = function(a, b) {
        var c;
        if (a instanceof S)
            this.I = p(b) ? b : a.I, Pc(this, a.N), c = a.gb, T(this), this.gb = c, Qc(this, a.Ea), Rc(this, a.ta), Sc(this, a.Ib), Tc(this, a.Y.Wa()), c = a.fb, T(this), this.fb = c;
        else if (a && (c = Nc(String(a)))) {
            this.I = !!b;
            Pc(this, c[1] || "", !0);
            var d = c[2] || "";
            T(this);
            this.gb = d ? decodeURIComponent(d) : "";
            Qc(this, c[3] || "", !0);
            Rc(this, c[4]);
            Sc(this, c[5] || "", !0);
            Tc(this, c[6] || "", !0);
            c = c[7] || "";
            T(this);
            this.fb = c ? decodeURIComponent(c) : ""
        } else
            this.I = !!b, this.Y = new Uc(null, 0, this.I)
    };
    h = S.prototype;
    h.N = "";
    h.gb = "";
    h.Ea = "";
    h.ta = null;
    h.Ib = "";
    h.fb = "";
    h.wd = !1;
    h.I = !1;
    h.toString = function() {
        var a = [], b = this.N;
        b && a.push(Vc(b, Wc), ":");
        if (b = this.Ea) {
            a.push("//");
            var c = this.gb;
            c && a.push(Vc(c, Wc), "@");
            a.push(encodeURIComponent(String(b)));
            b = this.ta;
            null != b && a.push(":", String(b))
        }
        if (b = this.Ib)
            this.Ea && "/" != b.charAt(0) && a.push("/"), a.push(Vc(b, "/" == b.charAt(0) ? Xc : Yc));
        (b = this.Y.toString()) && a.push("?", b);
        (b = this.fb) && a.push("#", Vc(b, Zc));
        return a.join("")
    };
    h.Wa = function() {
        return new S(this)
    };
    var Pc = function(a, b, c) {
        T(a);
        a.N = c ? b ? decodeURIComponent(b) : "" : b;
        a.N && (a.N = a.N.replace(/:$/, ""))
    }, Qc = function(a, b, c) {
        T(a);
        a.Ea = c ? b ? decodeURIComponent(b) : "" : b
    }, Rc = function(a, b) {
        T(a);
        if (b) {
            b = Number(b);
            if (isNaN(b) || 0 > b)
                throw Error("Bad port number " + b);
            a.ta = b
        } else
            a.ta = null
    }, Sc = function(a, b, c) {
        T(a);
        a.Ib = c ? b ? decodeURIComponent(b) : "" : b
    }, Tc = function(a, b, c) {
        T(a);
        b instanceof Uc ? (a.Y = b, a.Y.Rb(a.I)) : (c || (b = Vc(b, $c)), a.Y = new Uc(b, 0, a.I))
    }, T = function(a) {
        if (a.wd)
            throw Error("Tried to modify a read-only Uri");
    };
    S.prototype.Rb = function(a) {
        this.I = a;
        this.Y && this.Y.Rb(a);
        return this
    };
    var Vc = function(a, b) {
        return s(a) ? encodeURI(a).replace(b, ad) : null
    }, ad = function(a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    }, Wc = /[#\/\?@]/g, Yc = /[\#\?:]/g, Xc = /[\#\?]/g, $c = /[\#\?@]/g, Zc = /#/g, Uc = function(a, b, c) {
        this.J = a || null;
        this.I = !!c
    }, cd = function(a) {
        if (!a.h && (a.h = new K, a.l = 0, a.J))
            for (var b = a.J.split("&"), c = 0; c < b.length; c++) {
                var d = b[c].indexOf("="), e = null, f = null;
                0 <= d ? (e = b[c].substring(0, d), f = b[c].substring(d + 1)) : e = b[c];
                e = decodeURIComponent(e.replace(/\+/g, " "));
                e = bd(a, e);
                a.add(e, f ? decodeURIComponent(f.replace(/\+/g, " ")) : "")
            }
    };
    h = Uc.prototype;
    h.h = null;
    h.l = null;
    h.add = function(a, b) {
        cd(this);
        this.J = null;
        a = bd(this, a);
        var c = this.h.get(a);
        c || this.h.set(a, c = []);
        c.push(b);
        this.l++;
        return this
    };
    h.remove = function(a) {
        cd(this);
        a = bd(this, a);
        return this.h.Fa(a) ? (this.J = null, this.l -= this.h.get(a).length, this.h.remove(a)) : !1
    };
    h.Fa = function(a) {
        cd(this);
        a = bd(this, a);
        return this.h.Fa(a)
    };
    h.pa = function() {
        cd(this);
        for (var a = this.h.Z(), b = this.h.pa(), c = [], d = 0; d < b.length; d++)
            for (var e = a[d], f = 0; f < e.length; f++)
                c.push(b[d]);
        return c
    };
    h.Z = function(a) {
        cd(this);
        var b = [];
        if (s(a))
            this.Fa(a) && (b = Da(b, this.h.get(bd(this, a))));
        else {
            a = this.h.Z();
            for (var c = 0; c < a.length; c++)
                b = Da(b, a[c])
        }
        return b
    };
    h.set = function(a, b) {
        cd(this);
        this.J = null;
        a = bd(this, a);
        this.Fa(a) && (this.l -= this.h.get(a).length);
        this.h.set(a, [b]);
        this.l++;
        return this
    };
    h.get = function(a, b) {
        var c = a ? this.Z(a) : [];
        return 0 < c.length ? String(c[0]) : b
    };
    h.toString = function() {
        if (this.J)
            return this.J;
        if (!this.h)
            return "";
        for (var a = [], b = this.h.pa(), c = 0; c < b.length; c++)
            for (var d = b[c], e = encodeURIComponent(String(d)), d = this.Z(d), f = 0; f < d.length; f++) {
                var g = e;
                "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f])));
                a.push(g)
            }
        return this.J = a.join("&")
    };
    h.Wa = function() {
        var a = new Uc;
        a.J = this.J;
        this.h && (a.h = this.h.Wa(), a.l = this.l);
        return a
    };
    var bd = function(a, b) {
        var c = String(b);
        a.I && (c = c.toLowerCase());
        return c
    };
    Uc.prototype.Rb = function(a) {
        a && !this.I && (cd(this), this.J = null, rc(this.h, function(a, c) {
            var d = c.toLowerCase();
            c != d && (this.remove(c), this.remove(d), 0 < a.length && (this.J = null, this.h.set(bd(this, d), Ea(a)), this.l += a.length))
        }, this));
        this.I = a
    };
    var fd = function(a) {
        t(l.setImmediate) ? l.setImmediate(a) : (dd || (dd = ed()), dd(a))
    }, dd, ed = function() {
        var a = l.MessageChannel;
        "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && (a = function() {
            var a = document.createElement("iframe");
            a.style.display = "none";
            a.src = "";
            document.documentElement.appendChild(a);
            var b = a.contentWindow, a = b.document;
            a.open();
            a.write("");
            a.close();
            var c = "callImmediate" + Math.random(), d = b.location.protocol + "//" + b.location.host, a = u(function(a) {
                if (a.origin == 
                d || a.data == c)
                    this.port1.onmessage()
            }, this);
            b.addEventListener("message", a, !1);
            this.port1 = {};
            this.port2 = {postMessage: function() {
                    b.postMessage(c, d)
                }}
        });
        if ("undefined" !== typeof a) {
            var b = new a, c = {}, d = c;
            b.port1.onmessage = function() {
                c = c.next;
                var a = c.Pc;
                c.Pc = null;
                a()
            };
            return function(a) {
                d.next = {Pc: a};
                d = d.next;
                b.port2.postMessage(0)
            }
        }
        return "undefined" !== typeof document && "onreadystatechange" in document.createElement("script") ? function(a) {
            var b = document.createElement("script");
            b.onreadystatechange = function() {
                b.onreadystatechange = 
                null;
                b.parentNode.removeChild(b);
                b = null;
                a();
                a = null
            };
            document.documentElement.appendChild(b)
        } : function(a) {
            l.setTimeout(a, 0)
        }
    };
    var gd = function(a) {
        fd(function() {
            throw a;
        })
    }, ld = function(a, b) {
        hd || (fd(id), hd = !0);
        jd.push(new kd(a, b))
    }, hd = !1, jd = [], id = function() {
        for (; jd.length; ) {
            var a = jd;
            jd = [];
            for (var b = 0; b < a.length; b++) {
                var c = a[b];
                try {
                    c.vd.call(c.scope)
                } catch (d) {
                    gd(d)
                }
            }
        }
        hd = !1
    }, kd = function(a, b) {
        this.vd = a;
        this.scope = b
    };
    var md = function(a) {
        a.prototype.then = a.prototype.then;
        a.prototype.$goog_Thenable = !0
    }, nd = function(a) {
        if (!a)
            return !1;
        try {
            return !!a.$goog_Thenable
        } catch (b) {
            return !1
        }
    };
    var qd = function(a, b) {
        this.j = 0;
        this.T = void 0;
        this.K = this.k = null;
        this.$a = this.Cb = !1;
        this.Gb = [];
        od(this, Error("created"));
        this.oc = 0;
        try {
            var c = this;
            a.call(b, function(a) {
                pd(c, 2, a)
            }, function(a) {
                pd(c, 3, a)
            })
        } catch (d) {
            pd(this, 3, d)
        }
    };
    qd.prototype.then = function(a, b, c) {
        od(this, Error("then"));
        return rd(this, t(a) ? a : null, t(b) ? b : null, c)
    };
    md(qd);
    qd.prototype.cancel = function(a) {
        0 == this.j && ld(function() {
            var b = new sd(a);
            td(this, b)
        }, this)
    };
    var td = function(a, b) {
        if (0 == a.j)
            if (a.k) {
                var c = a.k;
                if (c.K) {
                    for (var d = 0, e = -1, f = 0, g; g = c.K[f]; f++)
                        if (g = g.jb)
                            if (d++, g == a && (e = f), 0 <= e && 1 < d)
                                break;
                    0 <= e && (0 == c.j && 1 == d ? td(c, b) : (d = c.K.splice(e, 1)[0], ud(c), d.Eb(b)))
                }
            } else
                pd(a, 3, b)
    }, wd = function(a, b) {
        a.K && a.K.length || 2 != a.j && 3 != a.j || vd(a);
        a.K || (a.K = []);
        a.K.push(b)
    }, rd = function(a, b, c, d) {
        var e = {jb: null,sc: null,Eb: null};
        e.jb = new qd(function(a, g) {
            e.sc = b ? function(c) {
                try {
                    var e = b.call(d, c);
                    a(e)
                } catch (r) {
                    g(r)
                }
            } : a;
            e.Eb = c ? function(b) {
                try {
                    var e = c.call(d, b);
                    !p(e) && b instanceof 
                    sd ? g(b) : a(e)
                } catch (r) {
                    g(r)
                }
            } : g
        });
        e.jb.k = a;
        wd(a, e);
        return e.jb
    };
    qd.prototype.Dc = function(a) {
        y(1 == this.j);
        this.j = 0;
        pd(this, 2, a)
    };
    qd.prototype.Ec = function(a) {
        y(1 == this.j);
        this.j = 0;
        pd(this, 3, a)
    };
    var pd = function(a, b, c) {
        if (0 == a.j) {
            if (a == c)
                b = 3, c = new TypeError("Promise cannot resolve to itself");
            else {
                if (nd(c)) {
                    a.j = 1;
                    c.then(a.Dc, a.Ec, a);
                    return
                }
                if (ea(c))
                    try {
                        var d = c.then;
                        if (t(d)) {
                            xd(a, c, d);
                            return
                        }
                    } catch (e) {
                        b = 3, c = e
                    }
            }
            a.T = c;
            a.j = b;
            vd(a);
            3 != b || c instanceof sd || yd(a, c)
        }
    }, xd = function(a, b, c) {
        a.j = 1;
        var d = !1, e = function(b) {
            d || (d = !0, a.Dc(b))
        }, f = function(b) {
            d || (d = !0, a.Ec(b))
        };
        try {
            c.call(b, e, f)
        } catch (g) {
            f(g)
        }
    }, vd = function(a) {
        a.Cb || (a.Cb = !0, ld(a.sd, a))
    };
    qd.prototype.sd = function() {
        for (; this.K && this.K.length; ) {
            var a = this.K;
            this.K = [];
            for (var b = 0; b < a.length; b++) {
                this.oc++;
                var c = a[b], d = this.T;
                2 == this.j ? c.sc(d) : (ud(this), c.Eb(d))
            }
        }
        this.Cb = !1
    };
    var od = function(a, b) {
        if (s(b.stack)) {
            var c = b.stack.split("\n", 4)[3], d = b.message, d = d + Array(11 - d.length).join(" ");
            a.Gb.push(d + c)
        }
    }, ud = function(a) {
        for (; a && a.$a; a = a.k)
            a.$a = !1
    }, yd = function(a, b) {
        a.$a = !0;
        ld(function() {
            if (a.$a) {
                if (b && s(b.stack) && a.Gb.length) {
                    for (var c = ["Promise trace:"], d = a; d; d = d.k) {
                        for (var e = a.oc; 0 <= e; e--)
                            c.push(d.Gb[e]);
                        c.push("Value: [" + (3 == d.j ? "REJECTED" : "FULFILLED") + "] <" + String(d.T) + ">")
                    }
                    b.stack += "\n\n" + c.join("\n")
                }
                zd.call(null, b)
            }
        })
    }, zd = gd, sd = function(a) {
        x.call(this, a)
    };
    w(sd, x);
    sd.prototype.name = "cancel"; /*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
    var U = function(a, b) {
        this.W = [];
        this.mc = a;
        this.hc = b || null;
        this.Da = this.F = !1;
        this.T = void 0;
        this.Ab = this.jc = this.zb = !1;
        this.Xa = 0;
        this.k = null;
        this.Ua = 0;
        this.Bb = null;
        if (Error.captureStackTrace) {
            var c = {stack: ""};
            Error.captureStackTrace(c, U);
            "string" == typeof c.stack && (this.Bb = c.stack.replace(/^[^\n]*\n/, ""))
        }
    };
    U.prototype.cancel = function(a) {
        if (this.F)
            this.T instanceof U && this.T.cancel();
        else {
            if (this.k) {
                var b = this.k;
                delete this.k;
                a ? b.cancel(a) : (b.Ua--, 0 >= b.Ua && b.cancel())
            }
            this.mc ? this.mc.call(this.hc, this) : this.Ab = !0;
            this.F || this.tc(new Ad)
        }
    };
    U.prototype.nc = function(a, b) {
        this.zb = !1;
        Bd(this, a, b)
    };
    var Bd = function(a, b, c) {
        a.F = !0;
        a.T = c;
        a.Da = !b;
        Cd(a)
    }, Ed = function(a) {
        if (a.F) {
            if (!a.Ab)
                throw new Dd;
            a.Ab = !1
        }
    };
    U.prototype.A = function(a) {
        Ed(this);
        Fd(a);
        Bd(this, !0, a)
    };
    U.prototype.tc = function(a) {
        Ed(this);
        Fd(a);
        Gd(this, a);
        Bd(this, !1, a)
    };
    var Gd = function(a, b) {
        a.Bb && ea(b) && b.stack && /^[^\n]+(\n   [^\n]+)+/.test(b.stack) && (b.stack = b.stack + "\nDEFERRED OPERATION:\n" + a.Bb)
    }, Fd = function(a) {
        y(!(a instanceof U), "An execution sequence may not be initiated with a blocking Deferred.")
    }, Hd = function(a, b, c, d) {
        y(!a.jc, "Blocking Deferreds can not be re-used");
        a.W.push([b, c, d]);
        a.F && Cd(a)
    };
    U.prototype.then = function(a, b, c) {
        var d, e, f = new qd(function(a, b) {
            d = a;
            e = b
        });
        Hd(this, d, function(a) {
            a instanceof Ad ? f.cancel() : e(a)
        });
        return f.then(a, b, c)
    };
    md(U);
    var Id = function(a, b) {
        var c = u(b.ud, b);
        Hd(a, c, null, void 0)
    };
    U.prototype.ud = function(a) {
        var b = new U;
        Hd(this, b.A, b.tc, b);
        a && (b.k = this, this.Ua++);
        return b
    };
    var Jd = function(a) {
        return Ba(a.W, function(a) {
            return t(a[1])
        })
    }, Cd = function(a) {
        if (a.Xa && a.F && Jd(a)) {
            var b = a.Xa, c = Kd[b];
            c && (l.clearTimeout(c.G), delete Kd[b]);
            a.Xa = 0
        }
        a.k && (a.k.Ua--, delete a.k);
        for (var b = a.T, d = c = !1; a.W.length && !a.zb; ) {
            var e = a.W.shift(), f = e[0], g = e[1], e = e[2];
            if (f = a.Da ? g : f)
                try {
                    var k = f.call(e || a.hc, b);
                    p(k) && (a.Da = a.Da && (k == b || k instanceof Error), a.T = b = k);
                    nd(b) && (d = !0, a.zb = !0)
                } catch (n) {
                    b = n, a.Da = !0, Gd(a, b), Jd(a) || (c = !0)
                }
        }
        a.T = b;
        d && (k = u(a.nc, a, !0), d = u(a.nc, a, !1), b instanceof U ? (Hd(b, k, d), b.jc = 
        !0) : b.then(k, d));
        c && (b = new Ld(b), Kd[b.G] = b, a.Xa = b.G)
    }, Dd = function() {
        x.call(this)
    };
    w(Dd, x);
    Dd.prototype.message = "Deferred has already fired";
    Dd.prototype.name = "AlreadyCalledError";
    var Ad = function() {
        x.call(this)
    };
    w(Ad, x);
    Ad.prototype.message = "Deferred was canceled";
    Ad.prototype.name = "CanceledError";
    var Ld = function(a) {
        this.G = l.setTimeout(u(this.pd, this), 0);
        this.od = a
    };
    Ld.prototype.pd = function() {
        y(Kd[this.G], "Cannot throw an error that is not scheduled.");
        delete Kd[this.G];
        throw this.od;
    };
    var Kd = {};
    var Md = {1: "NativeMessagingTransport",2: "FrameElementMethodTransport",3: "IframeRelayTransport",4: "IframePollingTransport",5: "FlashTransport",6: "NixTransport",7: "DirectTransport"}, Nd = ["pu", "lru", "pru", "lpu", "ppu"], V = {}, Pd = function(a) {
        for (var b = Od, c = b.length, d = ""; 0 < a--; )
            d += b.charAt(Math.floor(Math.random() * c));
        return d
    }, Od = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", M = Ic("goog.net.xpc");
    var W = function(a) {
        this.n = a || F()
    };
    w(W, G);
    W.prototype.fa = 0;
    W.prototype.e = function() {
        return this.n.e()
    };
    W.prototype.getName = function() {
        return Md[this.fa] || ""
    };
    var Rd = function(a, b) {
        this.n = b || F();
        this.a = a;
        this.ia = new J(this);
        ub(this, ka(H, this.ia));
        this.P = new ac(100, this.e());
        ub(this, ka(H, this.P));
        this.r = new U;
        this.t = new U;
        this.o = new U;
        this.rb = Pd(10);
        this.$ = null;
        this.ha = {};
        this.Rc = this.a.name;
        Qd(this.a, this.a.name + "_" + X(this.a));
        this.O = !1;
        Id(this.o, this.r);
        Id(this.o, this.t);
        Hd(this.o, this.Na, null, this);
        this.o.A(!0);
        this.ia.Ma(this.P, "tick", this.ya);
        Q("DirectTransport created. role=" + X(this.a))
    };
    w(Rd, W);
    var Sd = {}, Vd = function(a) {
        var b = new Td(a.channelName, a.service, a.payload);
        a = b.yb;
        var c = b.Ca, b = b.da;
        R("messageReceived: channel=" + a + ", service=" + c + ", payload=" + b);
        var d = V[a];
        if (d)
            return d.L(c, b), !0;
        var d = Ud(b)[0], e;
        for (e in V) {
            var f = V[e];
            if (1 == X(f) && !f.D() && "tp" == c && "SETUP" == d)
                return Qd(f, a), f.L(c, b), !0
        }
        Q("channel name mismatch; message ignored.");
        return !1
    };
    h = Rd.prototype;
    h.fa = 7;
    h.Va = function(a) {
        a = Ud(a);
        var b = a[1];
        switch (a[0]) {
            case "SETUP_ACK":
                this.r.F || this.r.A(!0);
                break;
            case "SETUP":
                this.Ya(), null != this.$ && this.$ != b && (Q("Sending SETUP and changing peer ID to: " + b), this.Aa()), this.$ = b
        }
    };
    h.Aa = function() {
        var a;
        a = "SETUP," + this.rb;
        this.send("tp", a)
    };
    h.Ya = function() {
        this.send("tp", "SETUP_ACK");
        this.t.F || this.t.A(!0)
    };
    h.Q = function() {
        var a = this.e();
        if (a) {
            var b = ha(a);
            0 == (Sd[b] || 0) && null == aa("crosswindowmessaging.channel", a) && m("crosswindowmessaging.channel", Vd, a);
            Sd[b]++;
            this.O = !0;
            this.ya()
        } else
            R("connect(): no window to initialize.")
    };
    h.ya = function() {
        this.a.D() ? this.P.stop() : (this.P.start(), this.Aa())
    };
    h.send = function(a, b) {
        if (this.a.C) {
            var c = new Td(this.Rc + "_" + (0 == X(this.a) ? 1 : 0), a, b);
            this.a.b.directSyncMode ? this.kc(c) : this.ha[ha(c)] = bc(u(this.kc, this, c), 0)
        } else
            R("send(): window not ready")
    };
    h.kc = function(a) {
        var b = ha(a);
        this.ha[b] && delete this.ha[b];
        try {
            var c = aa("crosswindowmessaging.channel", this.a.C)
        } catch (d) {
            P(M, "Can't access other window, ignoring.", d);
            return
        }
        if (null === c)
            P(M, "Peer window had no global function.");
        else
            try {
                c({channelName: a.yb,service: a.Ca,payload: a.da}), Q("send(): channelName=" + a.yb + " service=" + a.Ca + " payload=" + a.da)
            } catch (e) {
                P(M, "Error performing call, ignoring.", e)
            }
    };
    h.Na = function() {
        this.a.R(0)
    };
    h.f = function() {
        if (this.O) {
            var a = this.e(), b = ha(a);
            1 == --Sd[b] && m("crosswindowmessaging.channel", null, a)
        }
        this.ha && (fb(this.ha, function(a) {
            l.clearTimeout(a)
        }), this.ha = null);
        this.r && (this.r.cancel(), delete this.r);
        this.t && (this.t.cancel(), delete this.t);
        this.o && (this.o.cancel(), delete this.o);
        Rd.B.f.call(this)
    };
    var Ud = function(a) {
        a = a.split(",");
        a[1] = a[1] || null;
        return a
    }, Td = function(a, b, c) {
        this.yb = a;
        this.Ca = b;
        this.da = c
    };
    var Wd = function(a, b) {
        this.n = b || F();
        this.a = a;
        this.Ba = [];
        this.Vc = u(this.cd, this)
    };
    w(Wd, W);
    h = Wd.prototype;
    h.fa = 2;
    h.wb = !1;
    h.H = 0;
    h.Q = function() {
        0 == X(this.a) ? (this.X = this.a.ja, this.X.XPC_toOuter = u(this.fc, this)) : this.ec()
    };
    h.ec = function() {
        var a = !0;
        try {
            this.X || (this.X = this.e().frameElement), this.X && this.X.XPC_toOuter && (this.ub = this.X.XPC_toOuter, this.X.XPC_toOuter.XPC_toInner = u(this.fc, this), a = !1, this.send("tp", "SETUP_ACK"), this.a.R())
        } catch (b) {
            O("exception caught while attempting setup: " + b)
        }
        a && (this.ic || (this.ic = u(this.ec, this)), this.e().setTimeout(this.ic, 100))
    };
    h.Va = function(a) {
        if (0 != X(this.a) || this.a.D() || "SETUP_ACK" != a)
            throw Error("Got unexpected transport message.");
        this.ub = this.X.XPC_toOuter.XPC_toInner;
        this.a.R()
    };
    h.fc = function(a, b) {
        this.wb || 0 != this.Ba.length ? (this.Ba.push({Xc: a,da: b}), 1 == this.Ba.length && (this.H = this.e().setTimeout(this.Vc, 1))) : this.a.L(a, b)
    };
    h.cd = function() {
        for (; this.Ba.length; ) {
            var a = this.Ba.shift();
            this.a.L(a.Xc, a.da)
        }
    };
    h.send = function(a, b) {
        this.wb = !0;
        this.ub(a, b);
        this.wb = !1
    };
    h.f = function() {
        Wd.B.f.call(this);
        this.X = this.ub = null
    };
    var Y = function(a, b) {
        this.n = b || F();
        this.a = a;
        this.za = this.a.b.ppu;
        this.Yc = this.a.b.lpu;
        this.Ta = []
    }, Xd, Yd;
    w(Y, W);
    h = Y.prototype;
    h.Sc = 5;
    h.fa = 4;
    h.W = 0;
    h.ma = !1;
    h.O = !1;
    h.$b = null;
    var Zd = function(a) {
        return "googlexpc_" + a.a.name + "_msg"
    }, $d = function(a) {
        return "googlexpc_" + a.a.name + "_ack"
    }, be = function(a) {
        try {
            if (!a.ga && ae(a.a))
                return a.a.C.frames || {}
        } catch (b) {
            R("error retrieving peer frames")
        }
        return {}
    }, ce = function(a, b) {
        return be(a)[b]
    };
    Y.prototype.Q = function() {
        if (!this.ga && ae(this.a)) {
            R("transport connect called");
            if (!this.O) {
                R("initializing...");
                var a = Zd(this);
                this.la = de(this, a);
                this.tb = this.e().frames[a];
                a = $d(this);
                this.ka = de(this, a);
                this.sb = this.e().frames[a];
                this.O = !0
            }
            if (ee(this, Zd(this)) && ee(this, $d(this)))
                R("foreign frames present"), this.Wb = new fe(this, ce(this, Zd(this)), u(this.Uc, this)), this.Vb = new fe(this, ce(this, $d(this)), u(this.Tc, this)), this.Xb();
            else {
                N("foreign frames not (yet) present");
                if (1 == X(this.a))
                    this.$b || 0 < this.Sc-- || 
                    (N("Inner peer reconnect triggered."), Qd(this.a, Pd(10)), N("switching channels: " + this.a.name), ge(this), this.O = !1, this.$b = de(this, "googlexpc_reconnect_" + this.a.name));
                else if (0 == X(this.a)) {
                    N("outerPeerReconnect called");
                    for (var a = be(this), b = a.length, c = 0; c < b; c++) {
                        var d;
                        try {
                            a[c] && a[c].name && (d = a[c].name)
                        } catch (e) {
                        }
                        if (d) {
                            var f = d.split("_");
                            if (3 == f.length && "googlexpc" == f[0] && "reconnect" == f[1]) {
                                this.a.name = f[2];
                                ge(this);
                                this.O = !1;
                                break
                            }
                        }
                    }
                }
                this.e().setTimeout(u(this.Q, this), 100)
            }
        }
    };
    var de = function(a, b) {
        N("constructing sender frame: " + b);
        var c;
        c = document.createElement("iframe");
        var d = c.style;
        d.position = "absolute";
        d.top = "-10px";
        d.left = "10px";
        d.width = "1px";
        d.height = "1px";
        c.id = c.name = b;
        c.src = a.za + "#INITIAL";
        a.e().document.body.appendChild(c);
        return c
    }, ge = function(a) {
        N("deconstructSenderFrames called");
        a.la && (a.la.parentNode.removeChild(a.la), a.la = null, a.tb = null);
        a.ka && (a.ka.parentNode.removeChild(a.ka), a.ka = null, a.sb = null)
    }, ee = function(a, b) {
        N("checking for receive frame: " + b);
        try {
            var c = 
            ce(a, b);
            if (!c || 0 != c.location.href.indexOf(a.Yc))
                return !1
        } catch (d) {
            return !1
        }
        return !0
    };
    Y.prototype.Xb = function() {
        var a = be(this);
        a[$d(this)] && a[Zd(this)] ? (this.rc = new he(this.za, this.tb), this.Sa = new he(this.za, this.sb), R("local frames ready"), this.e().setTimeout(u(function() {
            this.rc.send("SETUP");
            this.ma = !0;
            R("SETUP sent")
        }, this), 100)) : (this.vc || (this.vc = u(this.Xb, this)), this.e().setTimeout(this.vc, 100), R("local frames not (yet) present"))
    };
    var ie = function(a) {
        if (a.xb && a.cc) {
            if (a.a.R(), a.oa) {
                R("delivering queued messages (" + a.oa.length + ")");
                for (var b = 0, c; b < a.oa.length; b++)
                    c = a.oa[b], a.a.L(c.Ca, c.da);
                delete a.oa
            }
        } else
            N("checking if connected: ack sent:" + a.xb + ", ack rcvd: " + a.cc)
    };
    Y.prototype.Uc = function(a) {
        N("msg received: " + a);
        if ("SETUP" == a)
            this.Sa && (this.Sa.send("SETUP_ACK"), N("SETUP_ACK sent"), this.xb = !0, ie(this));
        else if (this.a.D() || this.xb) {
            var b = a.indexOf("|"), c = a.substring(0, b);
            a = a.substring(b + 1);
            b = c.indexOf(",");
            if (-1 == b) {
                var d;
                this.Sa.send("ACK:" + c);
                je(this, a)
            } else
                d = c.substring(0, b), this.Sa.send("ACK:" + d), c = c.substring(b + 1).split("/"), b = parseInt(c[0], 10), c = parseInt(c[1], 10), 1 == b && (this.Fb = []), this.Fb.push(a), b == c && (je(this, this.Fb.join("")), delete this.Fb)
        } else
            P(M, 
            "received msg, but channel is not connected")
    };
    Y.prototype.Tc = function(a) {
        N("ack received: " + a);
        "SETUP_ACK" == a ? (this.ma = !1, this.cc = !0, ie(this)) : this.a.D() ? this.ma ? parseInt(a.split(":")[1], 10) == this.W ? (this.ma = !1, ke(this)) : P(M, "got ack with wrong sequence") : P(M, "got unexpected ack") : P(M, "received ack, but channel not connected")
    };
    var ke = function(a) {
        if (!a.ma && a.Ta.length) {
            var b = a.Ta.shift();
            ++a.W;
            a.rc.send(a.W + b);
            N("msg sent: " + a.W + b);
            a.ma = !0
        }
    }, je = function(a, b) {
        var c = b.indexOf(":"), d = b.substr(0, c), c = b.substring(c + 1);
        a.a.D() ? a.a.L(d, c) : ((a.oa || (a.oa = [])).push({Ca: d,da: c}), N("queued delivery"))
    };
    Y.prototype.pb = 3800;
    Y.prototype.send = function(a, b) {
        var c = a + ":" + b;
        if (!A || b.length <= this.pb)
            this.Ta.push("|" + c);
        else
            for (var d = b.length, e = Math.ceil(d / this.pb), f = 0, g = 1; f < d; )
                this.Ta.push("," + g + "/" + e + "|" + c.substr(f, this.pb)), g++, f += this.pb;
        ke(this)
    };
    Y.prototype.f = function() {
        Y.B.f.call(this);
        var a = le;
        Ca(a, this.Wb);
        Ca(a, this.Vb);
        this.Wb = this.Vb = null;
        sb(this.la);
        sb(this.ka);
        this.tb = this.sb = this.la = this.ka = null
    };
    var le = [], me = u(function() {
        var a = le, b, c = !1;
        try {
            for (var d = 0; b = a[d]; d++) {
                var e;
                if (!(e = c)) {
                    var f = b, g = f.qc.location.href;
                    if (g != f.pc) {
                        f.pc = g;
                        var k = g.split("#")[1];
                        k && (k = k.substr(1), f.bd(decodeURIComponent(k)));
                        e = !0
                    } else
                        e = !1
                }
                c = e
            }
        } catch (n) {
            if (Q("receive_() failed: " + n), b = b.p.a, Q("Transport Error"), b.close(), !a.length)
                return
        }
        a = v();
        c && (Xd = a);
        Yd = window.setTimeout(me, 1E3 > a - Xd ? 10 : 100)
    }, Y), ne = function() {
        R("starting receive-timer");
        Xd = v();
        Yd && window.clearTimeout(Yd);
        Yd = window.setTimeout(me, 10)
    }, he = function(a, b) {
        this.za = 
        a;
        this.Oc = b;
        this.Sb = 0
    };
    he.prototype.send = function(a) {
        this.Sb = ++this.Sb % 2;
        a = this.za + "#" + this.Sb + encodeURIComponent(a);
        try {
            D ? this.Oc.location.href = a : this.Oc.location.replace(a)
        } catch (b) {
            O("sending failed", b)
        }
        ne()
    };
    var fe = function(a, b, c) {
        this.p = a;
        this.qc = b;
        this.bd = c;
        this.pc = this.qc.location.href.split("#")[0] + "#INITIAL";
        le.push(this);
        ne()
    };
    var qe = function(a, b) {
        this.n = b || F();
        this.a = a;
        this.Wc = this.a.b.pru;
        this.bc = this.a.b.ifrid;
        D && oe()
    };
    w(qe, W);
    if (D)
        var re = [], se = 0, oe = function() {
            se || (se = window.setTimeout(function() {
                te()
            }, 1E3))
        }, te = function(a) {
            var b = v();
            for (a = a || 3E3; re.length && b - re[0].timestamp >= a; ) {
                var c = re.shift().ad;
                sb(c);
                N("iframe removed")
            }
            se = window.setTimeout(ue, 1E3)
        }, ue = function() {
            te()
        };
    var ve = {};
    qe.prototype.fa = 3;
    qe.prototype.Q = function() {
        this.e().xpcRelay || (this.e().xpcRelay = we);
        this.send("tp", "SETUP")
    };
    var we = function(a, b) {
        var c = b.indexOf(":"), d = b.substr(0, c), e = b.substr(c + 1);
        if (A && -1 != (c = d.indexOf("|"))) {
            var f = d.substr(0, c), d = d.substr(c + 1), c = d.indexOf("+"), g = d.substr(0, c), c = parseInt(d.substr(c + 1), 10), k = ve[g];
            k || (k = ve[g] = {Lc: [],Mc: 0,Kc: 0});
            -1 != d.indexOf("++") && (k.Kc = c + 1);
            k.Lc[c] = e;
            k.Mc++;
            if (k.Mc != k.Kc)
                return;
            e = k.Lc.join("");
            delete ve[g]
        } else
            var f = d;
        V[a].L(f, decodeURIComponent(e))
    };
    qe.prototype.Va = function(a) {
        "SETUP" == a ? (this.send("tp", "SETUP_ACK"), this.a.R()) : "SETUP_ACK" == a && this.a.R()
    };
    qe.prototype.send = function(a, b) {
        var c = encodeURIComponent(b), d = c.length;
        if (A && 1800 < d)
            for (var e = Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ v()).toString(36), f = 0, g = 0; f < d; g++) {
                var k = c.substr(f, 1800), f = f + 1800;
                xe(this, a, k, e + (f >= d ? "++" : "+") + g)
            }
        else
            xe(this, a, c)
    };
    var xe = function(a, b, c, d) {
        if (A) {
            var e = a.e().document.createElement("div");
            e.innerHTML = '<iframe onload="this.xpcOnload()"></iframe>';
            e = e.childNodes[0];
            e.xpcOnload = ye
        } else
            e = a.e().document.createElement("iframe"), D ? re.push({timestamp: v(),ad: e}) : Lb(e, "load", ye);
        var f = e.style;
        f.visibility = "hidden";
        f.width = e.style.height = "0px";
        f.position = "absolute";
        f = a.Wc;
        f += "#" + a.a.name;
        a.bc && (f += "," + a.bc);
        f += "|" + b;
        d && (f += "|" + d);
        f += ":" + c;
        e.src = f;
        a.e().document.body.appendChild(e);
        N("msg sent: " + f)
    }, ye = function() {
        N("iframe-load");
        sb(this)
    };
    qe.prototype.f = function() {
        qe.B.f.call(this);
        D && te(0)
    };
    var Z = function(a, b, c, d, e) {
        this.n = c || F();
        this.a = a;
        this.M = e || 2;
        y(1 <= this.M);
        y(2 >= this.M);
        this.Ub = b || "*";
        this.ia = new J(this);
        this.P = new ac(100, this.e());
        this.La = !!d;
        this.r = new U;
        this.t = new U;
        this.o = new U;
        this.rb = Pd(10);
        this.$ = null;
        this.La ? 1 == X(this.a) ? Id(this.o, this.r) : Id(this.o, this.t) : (Id(this.o, this.r), 2 == this.M && Id(this.o, this.t));
        Hd(this.o, this.Na, null, this);
        this.o.A(!0);
        this.ia.Ma(this.P, "tick", this.ya);
        Q("NativeMessagingTransport created.  protocolVersion=" + this.M + ", oneSidedHandshake=" + this.La + 
        ", role=" + X(this.a))
    };
    w(Z, W);
    Z.prototype.v = null;
    Z.prototype.O = !1;
    Z.prototype.fa = 1;
    var ze = {}, Be = function(a) {
        var b = a.nb.data;
        if (!s(b))
            return !1;
        var c = b.indexOf("|"), d = b.indexOf(":");
        if (-1 == c || -1 == d)
            return !1;
        var e = b.substring(0, c), c = b.substring(c + 1, d), b = b.substring(d + 1);
        R("messageReceived: channel=" + e + ", service=" + c + ", payload=" + b);
        if (d = V[e])
            return d.L(c, b, a.nb.origin), !0;
        a = Ae(b)[0];
        for (var f in V)
            if (d = V[f], 1 == X(d) && !d.D() && "tp" == c && ("SETUP" == a || "SETUP_NTPV2" == a))
                return Qd(d, e), d.L(c, b), !0;
        Q('channel name mismatch; message ignored"');
        return !1
    };
    Z.prototype.Va = function(a) {
        var b = Ae(a);
        a = b[1];
        switch (b[0]) {
            case "SETUP_ACK":
                Ce(this, 1);
                this.r.F || this.r.A(!0);
                break;
            case "SETUP_ACK_NTPV2":
                2 == this.M && (Ce(this, 2), this.r.F || this.r.A(!0));
                break;
            case "SETUP":
                Ce(this, 1);
                this.Ya(1);
                break;
            case "SETUP_NTPV2":
                2 == this.M && (b = this.v, Ce(this, 2), this.Ya(2), 1 != b && null == this.$ || this.$ == a || (Q("Sending SETUP and changing peer ID to: " + a), this.Aa()), this.$ = a)
        }
    };
    Z.prototype.Aa = function() {
        y(!(1 == this.M && 2 == this.v));
        if (2 == this.M && (null == this.v || 2 == this.v)) {
            var a;
            a = "SETUP_NTPV2," + this.rb;
            this.send("tp", a)
        }
        null != this.v && 1 != this.v || this.send("tp", "SETUP")
    };
    Z.prototype.Ya = function(a) {
        y(1 != this.M || 2 != a, "Shouldn't try to send a v2 setup ack in v1 mode.");
        if (2 != this.M || null != this.v && 2 != this.v || 2 != a) {
            if (null != this.v && 1 != this.v || 1 != a)
                return;
            this.send("tp", "SETUP_ACK")
        } else
            this.send("tp", "SETUP_ACK_NTPV2");
        this.t.F || this.t.A(!0)
    };
    var Ce = function(a, b) {
        b > a.v && (a.v = b);
        1 == a.v && (a.t.F || a.La || a.t.A(!0), a.$ = null)
    };
    h = Z.prototype;
    h.Q = function() {
        var a = this.e(), b = ha(a), c = ze[b];
        "number" == typeof c || (c = 0);
        0 == c && Lb(a.postMessage ? a : a.document, "message", Be, !1, Z);
        ze[b] = c + 1;
        this.O = !0;
        this.ya()
    };
    h.ya = function() {
        var a = 0 == X(this.a);
        this.La && a || this.a.D() || this.ga ? this.P.stop() : (this.P.start(), this.Aa())
    };
    h.send = function(a, b) {
        var c = this.a.C;
        c ? (this.send = function(a, b) {
            var f = this, g = this.a.name;
            this.Qa = bc(function() {
                f.Qa = 0;
                try {
                    var k = c.postMessage ? c : c.document;
                    k.postMessage ? (k.postMessage(g + "|" + a + ":" + b, f.Ub), R("send(): service=" + a + " payload=" + b + " to hostname=" + f.Ub)) : P(M, "Peer window had no postMessage function.")
                } catch (n) {
                    P(M, "Error performing postMessage, ignoring.", n)
                }
            }, 0)
        }, this.send(a, b)) : R("send(): window not ready")
    };
    h.Na = function() {
        this.a.R(1 == this.M || 1 == this.v ? 200 : void 0)
    };
    h.f = function() {
        if (this.O) {
            var a = this.e(), b = ha(a), c = ze[b];
            ze[b] = c - 1;
            1 == c && Sb(a.postMessage ? a : a.document, "message", Be, !1, Z)
        }
        this.Qa && (l.clearTimeout(this.Qa), this.Qa = 0);
        H(this.ia);
        delete this.ia;
        H(this.P);
        delete this.P;
        this.r.cancel();
        delete this.r;
        this.t.cancel();
        delete this.t;
        this.o.cancel();
        delete this.o;
        delete this.send;
        Z.B.f.call(this)
    };
    var Ae = function(a) {
        a = a.split(",");
        a[1] = a[1] || null;
        return a
    };
    var De = function(a, b) {
        this.n = b || F();
        this.a = a;
        this.Zb = a.at || "";
        this.ac = a.rat || "";
        var c = this.e();
        if (!c.nix_setup_complete)
            try {
                c.execScript("Class GCXPC____NIXVBS_wrapper\n Private m_Transport\nPrivate m_Auth\nPublic Sub SetTransport(transport)\nIf isEmpty(m_Transport) Then\nSet m_Transport = transport\nEnd If\nEnd Sub\nPublic Sub SetAuth(auth)\nIf isEmpty(m_Auth) Then\nm_Auth = auth\nEnd If\nEnd Sub\nPublic Function GetAuthToken()\n GetAuthToken = m_Auth\nEnd Function\nPublic Sub SendMessage(service, payload)\n Call m_Transport.GCXPC____NIXJS_handle_message(service, payload)\nEnd Sub\nPublic Sub CreateChannel(channel)\n Call m_Transport.GCXPC____NIXJS_create_channel(channel)\nEnd Sub\nPublic Sub GCXPC____NIXVBS_container()\n End Sub\nEnd Class\n Function GCXPC____NIXVBS_get_wrapper(transport, auth)\nDim wrap\nSet wrap = New GCXPC____NIXVBS_wrapper\nwrap.SetTransport transport\nwrap.SetAuth auth\nSet GCXPC____NIXVBS_get_wrapper = wrap\nEnd Function", 
                "vbscript"), c.nix_setup_complete = !0
            } catch (d) {
                O("exception caught while attempting global setup: " + d)
            }
        this.GCXPC____NIXJS_handle_message = this.$c;
        this.GCXPC____NIXJS_create_channel = this.Zc
    };
    w(De, W);
    h = De.prototype;
    h.fa = 6;
    h.na = !1;
    h.ba = null;
    h.Q = function() {
        0 == X(this.a) ? this.lc() : this.gc()
    };
    h.lc = function() {
        if (!this.na) {
            var a = this.a.ja;
            try {
                a.contentWindow.opener = (0, this.e().GCXPC____NIXVBS_get_wrapper)(this, this.Zb), this.na = !0
            } catch (b) {
                O("exception caught while attempting setup: " + b)
            }
            this.na || this.e().setTimeout(u(this.lc, this), 100)
        }
    };
    h.gc = function() {
        if (!this.na) {
            try {
                var a = this.e().opener;
                if (a && "GCXPC____NIXVBS_container" in a) {
                    this.ba = a;
                    if (this.ba.GetAuthToken() != this.ac) {
                        O("Invalid auth token from other party");
                        return
                    }
                    this.ba.CreateChannel((0, this.e().GCXPC____NIXVBS_get_wrapper)(this, this.Zb));
                    this.na = !0;
                    this.a.R()
                }
            } catch (b) {
                O("exception caught while attempting setup: " + b);
                return
            }
            this.na || this.e().setTimeout(u(this.gc, this), 100)
        }
    };
    h.Zc = function(a) {
        "unknown" == typeof a && "GCXPC____NIXVBS_container" in a || O("Invalid NIX channel given to createChannel_");
        this.ba = a;
        this.ba.GetAuthToken() != this.ac ? O("Invalid auth token from other party") : this.a.R()
    };
    h.$c = function(a, b) {
        this.e().setTimeout(u(function() {
            this.a.L(a, b)
        }, this), 1)
    };
    h.send = function(a, b) {
        "unknown" !== typeof this.ba && O("NIX channel not connected");
        this.ba.SendMessage(a, b)
    };
    h.f = function() {
        De.B.f.call(this);
        this.ba = null
    };
    var Fe = function(a, b) {
        this.Pa = {};
        for (var c = 0, d; d = Nd[c]; c++)
            if (d in a && !/^https?:\/\//.test(a[d]))
                throw Error("URI " + a[d] + " is invalid for field " + d);
        this.b = a;
        this.name = this.b.cn || Pd(10);
        this.n = b || F();
        this.Oa = [];
        this.Ra = new J(this);
        a.lpu = a.lpu || Oc(this.n.e().location.href) + "/robots.txt";
        a.ppu = a.ppu || Oc(a.pu || "") + "/robots.txt";
        V[this.name] = this;
        Ub(window, "unload", Ee) || Rb(window, "unload", Ee);
        Q("CrossPageChannel created: " + this.name)
    };
    w(Fe, Jc);
    var Ge = /^%*tp$/, He = /^%+tp$/;
    h = Fe.prototype;
    h.ca = null;
    h.S = null;
    h.p = null;
    h.j = 1;
    h.D = function() {
        return 2 == this.j
    };
    h.C = null;
    h.ja = null;
    var ae = function(a) {
        try {
            return !!a.C && !Boolean(a.C.closed)
        } catch (b) {
            return !1
        }
    }, Ke = function(a) {
        var b = document.body;
        Q("createPeerIframe()");
        var c = a.b.ifrid;
        c || (c = a.b.ifrid = "xpcpeer" + Pd(4));
        var d = F(b).createElement("IFRAME");
        d.id = d.name = c;
        d.style.width = d.style.height = "100%";
        Ie(a);
        a.S = new U(void 0, a);
        var e = Je(a);
        ec(a.Ra, d, "load", a.S.A, !1, a.S);
        C || D ? window.setTimeout(u(function() {
            b.appendChild(d);
            d.src = e.toString();
            Q("peer iframe created (" + c + ")")
        }, a), 1) : (d.src = e.toString(), b.appendChild(d), Q("peer iframe created (" + 
        c + ")"))
    }, Ie = function(a) {
        a.S && (a.S.cancel(), a.S = null);
        a.Oa.length = 0;
        a.Ra.ab()
    }, Je = function(a) {
        var b = a.b.pu;
        s(b) && (b = a.b.pu = new S(b));
        var c = {};
        c.cn = a.name;
        c.tp = a.b.tp;
        c.osh = a.b.osh;
        a.b.lru && (c.pru = a.b.lru);
        a.b.lpu && (c.ppu = a.b.lpu);
        a.b.ppu && (c.lpu = a.b.ppu);
        (a = a.b.role) && (c.role = 1 == a ? 0 : 1);
        a = b;
        c = ic(c);
        T(a);
        a.Y.set("xpc", c);
        return b
    };
    h = Fe.prototype;
    h.Q = function(a) {
        this.Db = a || ba;
        this.S ? Hd(this.S, this.Nc, null, void 0) : this.Nc()
    };
    h.Nc = function() {
        Q("continueConnection_()");
        this.S = null;
        if (this.b.ifrid) {
            var a = this.b.ifrid;
            this.ja = s(a) ? this.n.aa.getElementById(a) : a
        }
        this.ja && ((a = this.ja.contentWindow) || (a = window.frames[this.b.ifrid]), this.C = a);
        if (!this.C) {
            if (window == window.top)
                throw Error("CrossPageChannel: Can't connect, peer window-object not set.");
            this.C = window.parent
        }
        if (!this.p) {
            if (!this.b.tp) {
                var a = this.b, b;
                if (t(document.postMessage) || t(window.postMessage) || A && window.postMessage)
                    b = 1;
                else if (C)
                    b = 2;
                else if (A && this.b.pru)
                    b = 
                    3;
                else {
                    var c;
                    if (c = A) {
                        c = !1;
                        try {
                            b = window.opener, window.opener = {}, c = wb(window, "opener"), window.opener = b
                        } catch (d) {
                        }
                    }
                    b = c ? 6 : 4
                }
                a.tp = b
            }
            switch (this.b.tp) {
                case 1:
                    this.p = new Z(this, this.b.ph, this.n, !!this.b.osh, this.b.nativeProtocolVersion || 2);
                    break;
                case 6:
                    this.p = new De(this, this.n);
                    break;
                case 2:
                    this.p = new Wd(this, this.n);
                    break;
                case 3:
                    this.p = new qe(this, this.n);
                    break;
                case 4:
                    this.p = new Y(this, this.n);
                    break;
                case 7:
                    if (a = this.C)
                        try {
                            a = window.document.domain == this.C.document.domain
                        } catch (e) {
                            a = !1
                        }
                    a ? this.p = new Rd(this, 
                    this.n) : Q("DirectTransport not supported for this window, peer window in different security context or not set yet.")
            }
            if (this.p)
                Q("Transport created: " + this.p.getName());
            else
                throw Error("CrossPageChannel: No suitable transport found!");
        }
        for (this.p.Q(); 0 < this.Oa.length; )
            this.Oa.shift()()
    };
    h.close = function() {
        Ie(this);
        this.j = 3;
        H(this.p);
        this.Db = this.p = null;
        H(this.ca);
        this.ca = null;
        Q('Channel "' + this.name + '" closed')
    };
    h.R = function(a) {
        this.D() || this.ca && 0 != this.ca.G || (this.j = 2, Q('Channel "' + this.name + '" connected'), H(this.ca), p(a) ? (this.ca = new cc(this.Db, a), this.ca.start()) : (this.ca = null, this.Db()))
    };
    h.Na = Fe.prototype.R;
    h.send = function(a, b) {
        this.D() ? ae(this) ? (ea(b) && (b = ic(b)), this.p.send(Le(a), b)) : (O("Peer has disappeared."), this.close()) : O("Can't send. Channel not connected.")
    };
    h.L = function(a, b, c) {
        if (this.S)
            this.Oa.push(u(this.L, this, a, b, c));
        else {
            var d = this.b.ph;
            if (/^[\s\xa0]*$/.test(null == c ? "" : String(c)) || /^[\s\xa0]*$/.test(null == d ? "" : String(d)) || c == this.b.ph)
                if (this.ga)
                    P(M, "CrossPageChannel::xpcDeliver(): Disposed.");
                else if (a && "tp" != a)
                    if (this.D()) {
                        if (a = a.replace(/%[0-9a-f]{2}/gi, decodeURIComponent), a = He.test(a) ? a.substring(1) : a, c = this.Pa[a], c || (this.Yb ? c = {A: ka(this.Yb, a),dc: ea(b)} : (P(this.vb, 'Unknown service name "' + a + '"'), c = null)), c) {
                            var e;
                            t: {
                                if ((d = c.dc) && s(b))
                                    try {
                                        e = 
                                        fc(b);
                                        break t
                                    } catch (f) {
                                        P(this.vb, "Expected JSON payload for " + a + ', was "' + b + '"');
                                        e = null;
                                        break t
                                    }
                                else if (!d && !s(b)) {
                                    e = ic(b);
                                    break t
                                }
                                e = b
                            }
                            null != e && c.A(e)
                        }
                    } else
                        Q("CrossPageChannel::xpcDeliver(): Not connected.");
                else
                    this.p.Va(b);
            else
                P(M, 'Message received from unapproved origin "' + c + '" - rejected.')
        }
    };
    var Le = function(a) {
        Ge.test(a) && (a = "%" + a);
        return a.replace(/[%:|]/g, encodeURIComponent)
    }, X = function(a) {
        var b = a.b.role;
        return "number" == typeof b ? b : window.parent == a.C ? 1 : 0
    }, Qd = function(a, b) {
        R("changing channel name to " + b);
        delete V[a.name];
        a.name = b;
        V[b] = a
    };
    Fe.prototype.f = function() {
        this.close();
        this.ja = this.C = null;
        delete V[this.name];
        H(this.Ra);
        delete this.Ra;
        Fe.B.f.call(this)
    };
    var Ee = function() {
        for (var a in V)
            H(V[a])
    };
    var Me = function(a, b, c, d, e, f) {
        d = new S(d || window.location.href);
        var g = new S;
        e = e ? e : Math.floor(1E1 * Math.random()) + ".talkgadget.app.jj.cn:8000";
        //e = location.host;//"127.0.0.1"
        //e = "jiayq007.vicp.cc:8000";
        //e = "apush.app.jj.cn";
        Qc(g, e);
        Sc(g, "/talkgadget/d");
        T(g);
        g.Y.set("token", a);
        f && Rc(g, f);
        a = c || "wcs-iframe";
        c = "#" + a + " { display: none; }";//jiayq
        var k = F(void 0), n = null, r = k.aa;
        if (A && r.createStyleSheet)
            k = n = r.createStyleSheet(), A && p(k.cssText) ? k.cssText = c : k.innerHTML = c;
        else {
            r = tb(k, "head")[0];
            r || (n = tb(k, "body")[0], r = k.yc("head"), n.parentNode.insertBefore(r, n));
            var B = n = k.yc("style");
            A && p(B.cssText) ? B.cssText = 
            c : B.innerHTML = c;
            k.appendChild(r, n)
        }
        c = {};
        k = new S;
        Qc(k, e);
        f && Rc(k, f);
        Sc(k, "/talkgadget/xpc_blank");
        "http" == d.N || "https" == d.N ? (Pc(g, d.N), Pc(k, d.N), f = new S, Pc(f, d.N), Qc(f, d.Ea), 80 != d.ta && Rc(f, d.ta), Sc(f, b)) : (Pc(g, "http"), Pc(k, "http"), f = new S("http://www.google.com/xpc_blank"));
        c.lpu = f.toString();
        c.ppu = k.toString();
        c.ifrid = a;
        c.pu = g.toString();
        Fe.call(this, c)
    };
    w(Me, Fe);
    var $ = function(a, b, c, d, e) {
        this.readyState = 0;
        this.Nb = [];
        this.onopen = b.onopen;
        this.onmessage = b.onmessage;
        this.onerror = b.onerror;
        this.onclose = b.onclose;
        this.wa = c || new Me(a, "/_ah/channel/xpc_blank");
        this.xc = c ? d : "wcs-iframe";
        this.wc = e || new Ne(a);
        if (!document.body)
            throw "document.body is not defined -- do not create socket from script in <head>.";
        Ke(this.wa);
        Kc(this.wa, "onMessage", u(this.gd, this));
        Kc(this.wa, "onError", u(this.fd, this));
        Kc(this.wa, "onClosed", u(this.Cc, this));
        this.wa.Q(u(this.ed, this))
    };
    $.prototype.send = function() {
        return !1
    };
    $.prototype.close = function() {
        this.Cc()
    };
    $.prototype.qd = function() {
        for (var a = 0, b; b = this.Nb[a]; a++)
            switch (b.type) {
                case 0:
                    this.onopen(b.ob);
                    break;
                case 1:
                    this.onmessage(b.ob);
                    break;
                case 2:
                    this.onerror(b.ob);
                    break;
                case 3:
                    this.onclose(b.ob)
            }
        this.Nb = []
    };
    var Oe = function(a, b, c) {
        a.Nb.push({type: b,ob: c});
        window.setTimeout(u(a.qd, a), 1)
    }, Pe = function(a) {
        return "string" == typeof a ? window.JSON && window.JSON.parse ? window.JSON.parse(a) : fc(a) : a
    };
    $.prototype.gd = function(a) {
        var b = Pe(a);
        if (b) {
            a = b.m;
            for (var b = b.s, c = this.wc, d = [], e = 0, f = 0; f < a.length; f++) {
                for (var g = a.charCodeAt(f); 255 < g; )
                    d[e++] = g & 255, g >>= 8;
                d[e++] = g
            }
            d.push(c.lb);
            c = c.jd;
            c.reset();
            c.update(d);
            t: if (d = c.Ha(), da(d) && da(b) && d.length == b.length) {
                c = d.length;
                for (e = 0; e < c; e++)
                    if (d[e] !== b[e]) {
                        b = !1;
                        break t
                    }
                b = !0
            } else
                b = !1;
            b && (Oe(this, 1, {data: a}), this.wc.lb++)
        }
    };
    $.prototype.fd = function(a) {
        (a = Pe(a)) && Oe(this, 2, {description: a.d,code: a.c})
    };
    $.prototype.ed = function() {
        this.readyState = 1;
        Oe(this, 0, {})
    };
    $.prototype.Cc = function() {
        H(this.wa);
        this.readyState = 3;
        Oe(this, 3, {});
        if (this.xc) {
            var a = new nb, b;
            b = this.xc;
            (b = s(b) ? a.aa.getElementById(b) : b) && a.removeNode(b)
        }
    };
    var Ne = function(a) {
        for (; 0 != a.length % 4; )
            a += ".";
        this.lb = 0;
        try {
            if (!Za) {
                Za = {};
                $a = {};
                ab = {};
                for (var b = 0; 65 > b; b++)
                    Za[b] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(b), $a[b] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(b), ab[$a[b]] = b
            }
            for (var b = ab, c = [], d = 0; d < a.length; ) {
                var e = b[a.charAt(d++)], f = d < a.length ? b[a.charAt(d)] : 0;
                ++d;
                var g = d < a.length ? b[a.charAt(d)] : 0;
                ++d;
                var k = d < a.length ? b[a.charAt(d)] : 0;
                ++d;
                if (null == e || null == f || null == g || null == k)
                    throw Error();
                c.push(e << 2 | f >> 4);
                64 != g && (c.push(f << 4 & 240 | g >> 2), 64 != k && c.push(g << 6 & 192 | k))
            }
            this.Hc = c
        } catch (n) {
            if (n.message)
                throw Error("The provided token is invalid (" + n.name + ": " + n.message + ")");
            throw Error("The provided token is invalid.");
        }
        this.w = new db;
        this.jd = new cb(this.w, this.Hc, this.Hc.length)
    };
    var Qe = function(a) {
        this.xd = a
    }, Re = {onopen: function() {
        },onclose: function() {
        },onerror: function() {
        },onmessage: function() {
        }};
    Qe.prototype.open = function(a) {
        a = a || Re;
        return new $(this.xd, a)
    };
    m("goog.appengine.Socket", $, void 0);
    m("goog.appengine.Socket.ReadyState", {CONNECTING: 0,OPEN: 1,Ad: 2,CLOSED: 3}, void 0);
    m("goog.appengine.Socket.ReadyState.CONNECTING", 0, void 0);
    m("goog.appengine.Socket.ReadyState.OPEN", 1, void 0);
    m("goog.appengine.Socket.ReadyState.CLOSING", 2, void 0);
    m("goog.appengine.Socket.ReadyState.CLOSED", 3, void 0);
    m("goog.appengine.Socket.prototype.send", $.prototype.send, void 0);
    m("goog.appengine.Socket.prototype.close", $.prototype.close, void 0);
    m("goog.appengine.Channel", Qe, void 0);
    m("goog.appengine.Channel.prototype.open", Qe.prototype.open, void 0);
    m("chat.WcsCrossPageChannel", Me, void 0);
})()

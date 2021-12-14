var optikpi = function (e) {
    var t = {};

    function r(n) {
        if (t[n]) return t[n].exports;
        var i = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(i.exports, i, i.exports, r), i.l = !0, i.exports
    }
    return r.m = e, r.c = t, r.d = function (e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }, r.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, r.t = function (e, t) {
        if (1 & t && (e = r(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var i in e) r.d(n, i, function (t) {
                return e[t]
            }.bind(null, i));
        return n
    }, r.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return r.d(t, "a", t), t
    }, r.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, r.p = "", r(r.s = 0)
}([function (e, t, r) {
    "use strict";
    r.r(t), r.d(t, "MessageDeliveryTracker", (function () {
        return n
    })), r.d(t, "getMessageTracker", (function () {
        return i
    }));
    class n {
        constructor(e, t) {
            this.ingestUrl = e
        }
        trackPushMessage(m) {
            return this.track(m)
        }
        track(m) {
            return this.sendDeliveryStatus(m)
        }
        async sendDeliveryStatus(m) {
            const i = this.ingestUrl + "/ingest/optikpi/track/",
                o = {
                    fcmMessageId: m,
                };
            try {
                return (await fetch(i, {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(o)
                }))
            } catch (e) {
                return console.log(e), e
            }
        }
    }

    function i(e, t) {
        return new n(e, t)
    }
}]);
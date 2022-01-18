window.zs = window.zs || {}, function (t) { class i { constructor(t, i, n, a) { this.unitId = t, this.reportShowFunc = n, this.reportClickFunc = a, this.nativeAd = null, this.preLoad = i, this.inLoad = !1, this.timeOut = 3e3 } init() { var t = this; t.nativeAd = window.qg.createNativeAd({ posId: t.unitId }), t.nativeAd ? (t.nativeAd.onError(i => { t.onError(i) }), t.nativeAd.onLoad(i => { t.onLoad(i) }), t.inLoad = !0, t.errTimer && clearTimeout(t.errTimer), t.errTimer = setTimeout(function () { t.onError("加载超时") }, t.timeOut), console.log(t.unitId + "初始化")) : console.log("创建原生实例失败!!!") } loadAd(t, i) { var n = this; if (n.loadFunc = t, n.errFunc = i, !n.nativeAd) return n.errFunc && n.errFunc(), n.errFunc = null, void (n.loadFunc = null); n.inLoad ? console.log("原生" + n.unitId + "....正在加载中...") : (n.curData = null, n.nativeAd.load(), n.inLoad = !0, n.errTimer && clearTimeout(n.errTimer), n.errTimer = setTimeout(function () { n.onError("加载超时") }, n.timeOut), console.log(n.unitId + "进入加载" + (new Date).getTime())) } onError(t) { try { t = JSON.stringify(t) } catch (t) { } console.log("原生" + this.unitId + "加载失败 ", t), this.showEd = null, this.curData = null, this.errTimer && clearTimeout(this.errTimer), this.errFunc && this.errFunc(t), this.errFunc = null, this.loadFunc = null, this.inLoad = !1 } onLoad(t) { console.log("原生" + this.unitId + "广告加载完成", t), this.curData = t, this.curData.unitId = this.unitId, this.showEd = !1, this.used = !1, this.reportShow(), this.errTimer && clearTimeout(this.errTimer), this.loadFunc && this.loadFunc(this), this.errFunc = null, this.loadFunc = null, this.inLoad = !1 } reportShow() { this.curData && this.curData.adList && this.curData.adList[0] && !this.showEd ? (this.nativeAd.reportAdShow({ adId: this.curData.adList[0].adId }), this.showEd = !0, this.reportShowFunc && this.reportShowFunc(this.unitId)) : console.log("原生广告" + this.unitId + "上报展示失败") } reportNativeAdClick(t) { if (!(this.curData && this.curData.adList && this.curData.adList[0] && this.showEd)) return console.log("原生广告" + this.unitId + "上报点击失败"), t && t(), void (t = null); this.reportClickFunc ? this.reportClickFunc(this.unitId) ? this.nativeAd.reportAdClick({ adId: this.curData.adList[0].adId }) : (console.log("点击控制导致上报点击失败"), t && t(), t = null) : this.nativeAd.reportAdClick({ adId: this.curData.adList[0].adId }), this.curData = null, this.showEd = null, this.preLoad && this.loadAd() } } class n { constructor() { this.nativeList = {}, this.preLoad = !1, this.getIndex = 0, this.lastErrFunc = null, this.inLoadId = null } initNativeData(t, n, a, o) { if (t) { this.nativeList = {}, this.preLoad = n; var r = 0, e = this; t.sort((t, i) => Math.random() < .5 ? t - i : i - t), t.forEach(t => { t && (setTimeout(() => { e.nativeList[t] = new i(t, e.preLoad, a, o), e.nativeList[t].init() }, 3e3 * r), r++) }) } } getNativeData(t, i, n) { var a = this; a.getIndex++; var o = [], r = [], e = a.getIndex, s = i => { t && (i.used = !0), console.log("index" + e + "获得新鲜数据" + JSON.stringify(i.curData)), t && t(i.curData); var n = 0, a = []; for (let t in this.nativeList) { this.nativeList[t].curData ? n++ : a.push(t) } if (n < 2 && a.length > 0) { var o = Math.floor(Math.random() * a.length); this.inLoadId = a[o] } d && d() }, l = n => { var a = []; for (let t in this.nativeList) { var o = this.nativeList[t]; o.curData && a.push(o) } if (a.length > 0) { var r = Math.floor(Math.random() * a.length); console.log("index" + e + "获得二手数据" + JSON.stringify(a[r].curData)), t && t(a[r].curData) } else i && i(n), console.log("index" + e + "不存在可以复用的原生id"); d && d() }, d = () => { t = null, i = null, s = null, l = null, d = null, a.lastErrFunc = null, console.log("清理回调index" + e) }; if (a.lastErrFunc) { if (!n) return console.log("优先级较低的拉取,直接返回失败"), console.log("拉取被终止" + e), i && i("拉取被终止"), void (d && d()); console.log("优先级较高的拉取,上一个返回失败"), a.lastErrFunc("拉取被终止") } a.lastErrFunc = (t => { i && i(t), d && d(), console.log("拉取被终止" + e) }); var h = 0; for (let t in this.nativeList) { var u = this.nativeList[t]; u.curData && !u.used ? (console.log("index" + e + "存在预加载数据"), r.push(u)) : o.push(u), u.curData && h++ } if (r.length > 0) { var c = Math.floor(Math.random() * r.length); s && s(r[c]) } else if (o.length > 0) if (h >= 2) { c = Math.floor(Math.random() * o.length); console.log("index" + e + "随机取一个可以加载的"), o[c].loadAd(s, l), this.inLoadId = o[c].unitId } else if (this.inLoadId) this.nativeList[this.inLoadId].loadAd(s, l); else { console.log("没有inLoadId"), o[c = Math.floor(Math.random() * o.length)].loadAd(s, l) } else console.log("index" + e + "不存在可以加载的原生id"), l && l() } reportShow(t) { this.nativeList[t] && this.nativeList[t].reportShow() } reportNativeAdClick(t, i) { this.nativeList[t] && this.nativeList[t].reportNativeAdClick(i) } } n.Instance = new n, t.NativeManager = n, t.NativeData = i }(window.zs.nativeData = window.zs.nativeData || {});
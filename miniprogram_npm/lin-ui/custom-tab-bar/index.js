Component({
    properties: {
        position: {type: String, value: "bottom"},
        show: {type: Boolean, value: !0},
        selected: {type: Number, value: 0},
        color: {type: String, value: "#707070"},
        selectedColor: {type: String, value: "3963BC"},
        borderStyle: {type: String, value: "#f6f6f6"},
        backgroundColor: {type: String, value: "#fff"},
        backgroundImg: {type: String, value: ""},
        fontSize: {type: Number, value: 24},
        isRedirectToTab: {type: Boolean, value: !0},
        isNav: {type: Boolean, value: !1},
        list: {type: Array, value: []}
    }, data: {}, attached() {
    }, methods: {
        switchTab(t) {
            const e = t.currentTarget.dataset, a = e.path;
            this.data.isNav && (this.data.isRedirectToTab, wx.switchTab({url: a})), this.showItem(e.index)
        }, show() {
            this.setData({show: !0})
        }, hide() {
            this.setData({show: !1})
        }, showItem(t) {
            this.setData({selected: t});
            let e = {idx: t, path: this.route};
            this.triggerEvent("lintap", e, {bubbles: !0, composed: !0})
        }, showRedDot(t) {
            const e = `list[${t}].redDot`;
            this.setData({[e]: !0})
        }, hideRedDot(t) {
            const e = `list[${t}].redDot`;
            this.setData({[e]: !1})
        }, setTabBarBadge(t, e) {
            const a = `list[${t}].badge`;
            this.setData({[a]: e})
        }, removeTabBarBadge(t) {
            const e = `list[${t}].badge`;
            this.setData({[e]: ""})
        }
    }
});
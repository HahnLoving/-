import hover from "../behaviors/hover";

Component({
    behaviors: [hover],
    externalClasses: ["l-class", "l-symbol-class", "l-count-class", "l-disabled-class", "l-symbol-class1",  "l-disabled-class1"],
    properties: {
        count: {type: Number, value: 1},
        max: {type: Number, value: 9999},
        min: {type: Number, value: 1},
        step: {type: Number, value: 1},
        disabled: Boolean,
        iconSize: String,
        iconColor: String
    },
    data: {focus: !1, result: 1},
    observers: {
        "count,min,max": function () {
            this.valueRange(this.data.count, "parameter")
        }
    },
    methods: {
        doNothing(t) {
            const {type: e} = t.currentTarget.dataset;
            this.triggerEvent("linout", {type: e, way: "icon"}, {bubbles: !0, composed: !0})
        }, onCount() {
            this.setData({focus: !0})
        }, onBlur(t) {
            this.setData({focus: !1});
            let {value: e} = t.detail;
            setTimeout(() => {
                this.blurCount(Number(e), () => {
                    this.data.count = this.data.result, this.triggerEvent("lintap", {
                        count: this.data.result,
                        type: "blur"
                    }, {bubbles: !0, composed: !0})
                })
            }, 50)
        }, blurCount(t, e) {
            t ? this.valueRange(t) : this.setData({result: this.properties.count}), e && e()
        }, valueRange(t, e = "input") {
            t > this.properties.max ? this.setData({result: this.properties.max}, () => {
                this.triggerEvent("linout", {type: "overflow_max", way: e}, {bubbles: !0, composed: !0})
            }) : t < this.properties.min ? this.setData({result: this.properties.min}, () => {
                this.triggerEvent("linout", {type: "overflow_min", way: e}, {bubbles: !0, composed: !0})
            }) : this.setData({result: t})
        }, reduceTap() {
            this.data.count - this.properties.step <= this.properties.min ? this.data.count = this.properties.min : this.data.count -= this.properties.step, this.setData({result: this.data.count}), this.triggerEvent("lintap", {
                count: this.data.result,
                type: "reduce"
            }, {bubbles: !0, composed: !0})
        }, addTap() {
            this.data.count + this.properties.step >= this.properties.max ? this.data.count = this.properties.max : this.data.count += this.properties.step, this.setData({result: this.data.count}), this.triggerEvent("lintap", {
                count: this.data.result,
                type: "add"
            }, {bubbles: !0, composed: !0})
        }
    }
});
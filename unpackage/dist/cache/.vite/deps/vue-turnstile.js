// ../../../../program/uniJiaowuAdmin/uni教务后台/node_modules/vue-turnstile/dist/vue-turnstile.js
import { defineComponent as u, openBlock as d, createElementBlock as l } from "vue";
var c = "https://challenges.cloudflare.com/turnstile/v0/api.js";
var o = "cfTurnstileOnLoad";
var i = typeof window < "u" && window.turnstile !== void 0 ? "ready" : "unloaded";
var s;
var p = u({
  name: "VueTurnstile",
  emits: ["update:modelValue", "error", "unsupported"],
  props: {
    siteKey: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    },
    resetInterval: {
      type: Number,
      required: false,
      default: 295 * 1e3
    },
    size: {
      type: String,
      required: false,
      default: "normal"
    },
    theme: {
      type: String,
      required: false,
      default: "auto"
    },
    language: {
      type: String,
      required: false,
      default: "auto"
    },
    action: {
      type: String,
      required: false,
      default: ""
    },
    appearance: {
      type: String,
      required: false,
      default: "always"
    },
    renderOnMount: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      resetTimeout: void 0,
      widgetId: void 0
    };
  },
  computed: {
    turnstileOptions() {
      return {
        sitekey: this.siteKey,
        theme: this.theme,
        language: this.language,
        size: this.size,
        callback: this.callback,
        action: this.action,
        appearance: this.appearance,
        "error-callback": this.errorCallback,
        "unsupported-callback": this.unsupportedCallback
      };
    }
  },
  methods: {
    unsupportedCallback() {
      this.$emit("unsupported");
    },
    errorCallback(e) {
      this.$emit("error", e);
    },
    callback(e) {
      this.$emit("update:modelValue", e), this.startResetTimeout();
    },
    reset() {
      window.turnstile && (this.$emit("update:modelValue", ""), window.turnstile.reset());
    },
    remove() {
      this.widgetId && (window.turnstile.remove(this.widgetId), this.widgetId = void 0);
    },
    render() {
      this.widgetId = window.turnstile.render(this.$refs.turnstile, this.turnstileOptions);
    },
    startResetTimeout() {
      this.resetTimeout = setTimeout(() => {
        this.reset();
      }, this.resetInterval);
    }
  },
  async mounted() {
    const e = new Promise((r, t) => {
      s = { resolve: r, reject: t }, i === "ready" && r(void 0);
    });
    window[o] = () => {
      s.resolve(), i = "ready";
    }, await (() => {
      if (i === "unloaded") {
        i = "loading";
        const r = `${c}?onload=${o}&render=explicit`, t = document.createElement("script");
        t.src = r, t.async = true, t.addEventListener("error", () => {
          s.reject("Failed to load Turnstile.");
        }), document.head.appendChild(t);
      }
      return e;
    })(), this.renderOnMount && this.render();
  },
  beforeUnmount() {
    this.remove(), clearTimeout(this.resetTimeout);
  }
});
var m = (e, n) => {
  const r = e.__vccOpts || e;
  for (const [t, a] of n)
    r[t] = a;
  return r;
};
var h = { ref: "turnstile" };
function f(e, n, r, t, a, w) {
  return d(), l("div", h, null, 512);
}
var y = m(p, [["render", f]]);
export {
  y as default
};
//# sourceMappingURL=vue-turnstile.js.map

export default {
  props: {
    initialPosition: {
      type: Object,
      default: () => ({
        left: undefined,
        top: undefined
      }),
      description: "limit width of area, within which an element can move"
    },
    parentWidth: {
      type: Number,
      default: 0,
      description: "limit width of area, within which an element can move"
    },
    parentHeight: {
      type: Number,
      default: 0,
      description: "limit height of area, within which an element can move"
    },
    disabled: {
      type: Boolean,
      description: "Disable event propagation"
    }
  },
  data() {
    return {
      shiftY: null,
      shiftX: null,
      left: 0,
      top: 0,
      elem: null,
      isIos: false,
      parent: {
        width: 0,
        height: 0
      }
    };
  },
  mounted() {
    this.isIos =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    this.elem = this.$el;

    if (this.initialPosition.top && this.initialPosition.left) {
      this.updateDataset(this.initialPosition);
      this.updateElementStyle(this.initialPosition);
    }
  },
  methods: {
    // handleEventPropagation(callback) {
    //   if (this.disabled) {
    //     event.preventDefault();
    //     return;
    //   }

    //   callback(event);
    // },
    updateDataset(position) {
      this.elem.dataset.draggerState = JSON.stringify(position);
    },
    updateParentBoundaries() {
      this.parent.width = this.parentWidth || this.elem.parentNode.offsetWidth;
      this.parent.height =
        this.parentHeight || this.elem.parentNode.offsetHeight;
    },
    updateElementStyle({ top, left }) {
      this.elem.style.top = `${top}px`;
      this.top = top;
      this.elem.style.left = `${left}px`;
      this.left = left;
    },
    iosMove(e) {
      if (this.isIos) this.elementMove(e);
    },
    elementMove(e) {
      this.$emit("dragging");

      e.preventDefault();
      if (!e.pageX) {
        document.body.style.overflow = "hidden";
      }

      const x = e.pageX || e.changedTouches[0].pageX;
      const y = e.pageY || e.changedTouches[0].pageY;
      let left = x - this.shiftX;
      let top = y - this.shiftY;
      const right = left + this.elem.offsetWidth;
      const bottom = top + this.elem.offsetHeight;

      if (left < 0) {
        left = 0;
      } else if (right > this.parent.width) {
        left = this.parent.width - this.elem.offsetWidth;
      } else {
        left = x - this.shiftX;
      }

      if (top < 0) {
        top = 0;
      } else if (bottom > this.parent.height) {
        top = this.parent.height - this.elem.offsetHeight;
      } else {
        top = y - this.shiftY;
      }

      this.updateDataset({ top, left });
      this.updateElementStyle({ top, left });
    },
    hang(e) {
      this.$emit("hang");
      this.updateParentBoundaries();
      this.shiftX = e.pageX
        ? e.pageX - this.elem.offsetLeft
        : e.changedTouches[0].pageX - this.elem.offsetLeft;
      this.shiftY = e.pageY
        ? e.pageY - this.elem.offsetTop
        : e.changedTouches[0].pageY - this.elem.offsetTop;

      if (e.pageX) {
        if (this.isIos) {
          document.addEventListener("touchmove", this.elementMove);
        } else {
          document.addEventListener("mousemove", this.elementMove);
          document.addEventListener("mouseleave", this.drop);
        }
      } else {
        document.addEventListener("touchmove", this.elementMove);
      }
    },
    drop() {
      this.$emit("dropped", { top: this.top, left: this.left });

      document.removeEventListener("mousemove", this.elementMove, false);
      document.onmouseup = null;

      document.body.style.overflow = null;
      document.removeEventListener("touchmove", this.elementMove, false);
      document.ontouchend = null;
    }
  }
};

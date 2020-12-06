export default {
  data() {
    return {
      elementText: null,
      startX: 0,
      startY: 0,
      startWidth: 0,
      startHeight: 0
    };
  },
  methods: {
    resizeInitDrag(event) {
      this.startX = event.clientX;
      this.startY = event.clientY;
      this.startWidth = parseInt(
        document.defaultView.getComputedStyle(this.elementText).width,
        10
      );
      this.startHeight = parseInt(
        document.defaultView.getComputedStyle(this.elementText).height,
        10
      );
      document.documentElement.addEventListener(
        "mousemove",
        this.resizeDragMove,
        false
      );
      document.documentElement.addEventListener(
        "mouseup",
        this.resizeDragStop,
        false
      );
    },

    resizeDragMove(event) {
      event.stopPropagation();
      this.elementText.style.width =
        this.startWidth + event.clientX - this.startX + "px";
      this.elementText.style.height =
        this.startHeight + event.clientY - this.startY + "px";
    },

    resizeDragStop(event) {
      event.stopPropagation();
      document.documentElement.removeEventListener(
        "mousemove",
        this.resizeDragMove,
        false
      );
      document.documentElement.removeEventListener(
        "mouseup",
        this.resizeDragStop,
        false
      );
    }
  }
};

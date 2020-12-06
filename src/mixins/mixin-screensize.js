export const screenSize = {
  data() {
    return {
      windowWidth: 0
    };
  },
  created() {
    this.windowWidth = window.innerWidth;
  },
  mounted() {
    window.addEventListener("resize", this.setWindowWidth);
  },
  destroyed() {
    window.removeEventListener("resize", this.setWindowWidth);
  },
  methods: {
    setWindowWidth() {
      this.windowWidth = window.innerWidth;
    }
  }
};

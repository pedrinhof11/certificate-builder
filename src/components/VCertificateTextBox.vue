<template>
  <div
    class="certificate-element"
    @touchstart="hang"
    @touchmove="iosMove"
    @touchend="drop"
    @mousedown="hang"
    @mouseup="drop"
    v-on="$listeners"
  >
    <b-button
      variant="blank"
      class="p-0 certificate-element__close h-auto"
      @click.prevent="removeElement"
    >
      <span class="fa-stack fa-xs">
        <i class="fas fa-circle fa-stack-2x text-tertiary"></i>
        <i class="fal fa-times fa-stack-1x text-white"></i>
      </span>
    </b-button>
    <div
      :id="element.id"
      :data-font-size="element.style.fontSize"
      :data-font-family="element.style.fontFamily"
      :data-color="element.style.color"
      :data-text-align="element.style.textAlign"
      :style="elementStyleObject"
      :placeholder="element.placeholder"
      class="certificate-textbox"
      contenteditable="true"
      tabindex="0"
      v-text="element.value"
      @paste="onPaste"
    ></div>
    <div
      class="resizer"
      @mousedown.stop="resizeInitDrag"
      @mouseup.stop="resizeDragStop"
    ></div>
  </div>
</template>

<script>
import dragger from "../mixins/dragger";
import resizer from "../mixins/resizer";
export default {
  name: "CertificateTextBox",
  mixins: [dragger, resizer],
  props: {
    element: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      elementText: null
    };
  },
  computed: {
    elementStyleObject() {
      const { fontSize, fontFamily, color, textAlign } = this.element.style;
      return {
        fontFamily,
        color,
        textAlign,
        fontSize: `${fontSize}px`
      };
    }
  },
  mounted() {
    this.elementText = document.getElementById(this.element.id);
  },
  methods: {
    removeElement() {
      this.$emit("remove:element", this.element);
    },

    onPaste(event) {
      const paste = (event.clipboardData || window.clipboardData).getData(
        "text"
      );

      const selection = window.getSelection();
      if (!selection.rangeCount) {
        event.target.textContent += paste;
      } else {
        selection.deleteFromDocument();
        selection.getRangeAt(0).insertNode(document.createTextNode(paste));
      }

      event.preventDefault();
    }
  }
};
</script>

<style lang="scss" scoped>
$element-padding: 4px;
.certificate-element {
  position: absolute;
  padding: $element-padding;
  border: 1px dashed transparent;
  transition: border 0.2s;
  cursor: default;

  &:hover,
  &:focus,
  &:active {
    border-color: #888;
    .certificate-element__close {
      opacity: 1;
      pointer-events: auto;
    }

    .resizer {
      opacity: 1;
    }
  }

  &__close {
    z-index: 2;
    position: absolute;
    top: -($element-padding * 2.75);
    right: -($element-padding * 3.75);
    opacity: 0;
    pointer-events: none;
    transition: 0.2s;
  }
}

.certificate-textbox {
  position: relative;
  min-width: 115px;
  min-height: 25px;
  overflow: hidden;
  border: none;
  outline: none;

  &:focus {
    background-color: white;
  }
  &:empty:before {
    content: attr(placeholder);
    color: #ccc !important;
  }
}

.resizer {
  z-index: 2;
  width: 10px;
  height: 10px;
  background: #424242;
  position: absolute;
  bottom: -($element-padding + 1);
  right: -($element-padding + 1);
  cursor: se-resize;
  opacity: 0;
}
</style>

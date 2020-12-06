<template>
  <div class="pt-3 certificate" id="certificate">
    <b-row>
      <b-col cols="auto">
        <b-dropdown variant="secondary" text="Variáveis" no-caret lazy>
          <li
            v-for="variable in variables"
            :key="variable.name"
            role="presentation"
          >
            <b-button role="menuitem" @click="setVariable(variable)">
              {{ variable.name }}
            </b-button>
          </li>
        </b-dropdown>
      </b-col>
      <b-col>
        <b-form-select
          v-model="certificate.style.fontFamily"
          :options="fonts"
          @change="setFontFamily"
        >
          <template #option="{ option }">
            <span :style="`font-family: ${option};`">{{ option }}</span>
          </template>
        </b-form-select>
      </b-col>
      <b-col>
        <b-form-input
          list="size-options"
          v-model.number="certificate.style.fontSize"
          type="number"
          @change="setFontSize"
        ></b-form-input>
        <datalist id="size-options">
          <option v-for="(size, key) in sizeOptions" :key="key">{{
            size
          }}</option>
        </datalist>
      </b-col>
    </b-row>
    <b-row class="pt-3 certificate__toolbox">
      <b-col cols="auto">
        <b-button
          variant="light"
          aria-label="Adicionar caixa de texto"
          @click="addTextBox"
        >
          <i class="fas fa-text fa-lg"></i>
        </b-button>

        <b-button
          variant="light"
          aria-label="Alinhar texto à esquerda"
          :class="{
            active: textAlign === 'left'
          }"
          @click="setTextAlign('left')"
        >
          <i class="fas fa-align-left fa-lg"></i>
        </b-button>

        <b-button
          variant="light"
          aria-label="Alinhar texto ao centro"
          :class="{
            active: textAlign === 'center'
          }"
          @click="setTextAlign('center')"
        >
          <i class="fas fa-align-center fa-lg"></i>
        </b-button>
        <b-button
          variant="light"
          aria-label="Alinhar texto à direita"
          :class="{
            active: textAlign === 'right'
          }"
          @click="setTextAlign('right')"
        >
          <i class="fas fa-align-left fa-lg"></i>
        </b-button>
      </b-col>
      <b-col cols="auto">
        <b-form-input
          class="certificate__input-color"
          type="color"
          v-model="certificate.style.color"
          @input="setColor"
        ></b-form-input>
      </b-col>

      <b-col cols="auto">
        <b-button variant="light">
          <i class="fas fa-image fa-lg"></i>
        </b-button>
      </b-col>
    </b-row>

    <div class="certificate__canvas mt-3" id="certificate__canvas">
      <div class="certificate__canvas--paper" :style="canvasStyle">
        <img
          v-if="certificate.background"
          :src="certificate.background"
          alt="background"
        />

        <div class="certificate__canvas--elements">
          <CertificateTextBox
            v-for="(textBox, key) in certificate.textBoxes"
            :key="key"
            :element="textBox"
            @remove:element="removeTextBox"
            @click="selectTextBox(textBox)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Certificate from "./Classes/Certificate";
import TextBox from "./Classes/TextBox";
import { screenSize } from "../mixins/mixin-screensize";
import CertificateTextBox from "./VCertificateTextBox";
import Style from "./Classes/Style";

export default {
  name: "VCertificate",
  mixins: [screenSize],
  components: {
    CertificateTextBox
  },
  props: {
    msg: String
  },
  data() {
    return {
      sizeOptions: [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72],
      fonts: [
        "Arial",
        "Arial Black",
        "Allura",
        "Comic Sans MS",
        "Courier New",
        "Georgia",
        "Impact",
        "Times New Roman",
        "Trebuchet MS",
        "Verdana"
      ],
      variables: [
        { text: "[ALUNO]", name: "Aluno" },
        { text: "[INSTRUTOR]", name: "Instrutor" },
        { text: "[CARGA_HORARIA]]", name: "Carga horária" },
        { text: "[CPF]", name: "CPF" },
        { text: "[CURSO]", name: "Curso" },
        { text: "[DATA_DE_CADASTRO]", name: "Data de cadastro" },
        { text: "[DATA_DE_CONCLUSÃO]", name: "Data de conclusão" }
      ],
      certificate: new Certificate(),
      certificateElem: null,
      containerWidth: 0,
      containerHeight: 0,
      backgroundWidth: 0,
      backgroundHeight: 0,
      canvasScale: 0
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.certificateElem = document.getElementById("certificate__canvas");
      new ResizeObserver(this.setContainerWidth).observe(this.certificateElem);
    });
  },
  computed: {
    canvasStyle() {
      return {
        width: "1152px",
        height: "808px",
        transform: `scale(${this.canvasScale})`,
        transformOrigin: "left top"
      };
    },
    textAlign() {
      return this.certificate.style.textAlign;
    }
  },
  methods: {
    setContainerWidth() {
      this.containerWidth = this.certificateElem.clientWidth;
      this.containerHeight = this.certificateElem.clientHeight;
      this.canvasScale = Math.min(
        this.containerWidth / 1152,
        this.containerHeight / 808
      );
    },
    updateGlobalStyles({ fontSize, fontFamily, color, textAlign }) {
      this.certificate.style.setFontSize(fontSize);
      this.certificate.style.setFontFamily(fontFamily);
      this.certificate.style.setColor(color);
      this.certificate.style.setTextAlign(textAlign);
    },
    selectTextBox(textBox) {
      this.certificate.selectItem(textBox);
      this.updateGlobalStyles({
        fontSize: textBox.style.fontSize,
        fontFamily: textBox.style.fontFamily,
        color: textBox.style.color,
        textAlign: textBox.style.textAlign
      });
    },
    setVariable(variable) {
      console.log(variable);
    },
    setFontFamily(font) {
      this.changeElementStyle(() => {
        this.certificate.itemSelected.style.setFontFamily(font);
      });
    },
    setFontSize(size) {
      this.changeElementStyle(() => {
        this.certificate.itemSelected.style.setFontSize(size);
      });
    },
    setTextAlign(textAlign) {
      this.changeElementStyle(() => {
        this.certificate.itemSelected.style.setTextAlign(textAlign);
      });
    },
    setColor(color) {
      this.changeElementStyle(() => {
        this.certificate.itemSelected.style.setColor(color);
      });
    },
    changeElementStyle(callback) {
      const { itemSelected } = this.certificate;
      if ("id" in itemSelected) {
        callback();
        this.updateGlobalStyles({
          fontSize: itemSelected.style.fontSize,
          fontFamily: itemSelected.style.fontFamily,
          color: itemSelected.style.color,
          textAlign: itemSelected.style.textAlign
        });
      }
    },
    addTextBox() {
      const textBox = new TextBox(new Style(this.certificate.style));
      this.certificate.addTextBox(textBox);
      console.log(textBox);
    },
    removeTextBox(textBox) {
      this.certificate.removeTextBox(textBox);
    }
  }
};
</script>

<style lang="scss" scoped>
.certificate {
  &__toolbox {
    .btn {
      margin: 0 5px;
      &:first-child {
        margin-left: 0;
      }
    }
  }
  &__input-color {
    width: 40px;
  }
  &__canvas {
    width: 100%;
    overflow: hidden;
    &--paper {
      background-color: #f1f1f1;
    }
    &--elements {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
}
</style>

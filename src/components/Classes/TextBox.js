export default class TextBox {
  constructor(style, value = "") {
    this.id = "textBox" + Date.now();
    this.value = value;
    this.placeholder = "Insira um texto";
    this.style = style;
    this.elementType = "textBoxes";
  }

  setValue(value) {
    this.value = value;
  }

  concatValue(value) {
    this.value += value;
  }
}

export default class TextBox {
  constructor(style) {
    this.id = "textBox" + Date.now();
    this.value = "";
    this.placeholder = "Insira um texto";
    this.style = style;
    this.elementType = "textBoxes";
  }
}

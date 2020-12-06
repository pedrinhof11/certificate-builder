import Style from "./Style";

export default class Certificate {
  constructor() {
    this.background = require("../../assets/certificado_academy_moderno.png");
    this.itemSelected = null;
    this.textBoxes = [];
    this.style = new Style();
    this.type = "Moderno";
  }

  addTextBox(textBox) {
    this.textBoxes.push(textBox);
  }

  removeTextBox(textBox) {
    const index = this.textBoxes.findIndex(i => i.id === textBox.id);
    this.textBoxes.splice(index, 1);
  }

  selectItem(item) {
    this.itemSelected = item;
  }
}

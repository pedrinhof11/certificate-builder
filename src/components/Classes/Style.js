export default class Style {
  constructor(params = {}) {
    const { fontFamily, fontSize, color, textAlign } = params;
    this.fontFamily = fontFamily ?? "Arial";
    this.fontSize = fontSize ?? 16;
    this.color = color ?? "#000";
    this.textAlign = textAlign ?? "left";
  }

  setFontFamily(fontFamily) {
    this.fontFamily = fontFamily;
  }
  setFontSize(fontSize) {
    this.fontSize = fontSize;
  }
  setColor(color) {
    this.color = color;
  }
  setTextAlign(textAlign) {
    this.textAlign = textAlign;
  }
}

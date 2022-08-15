export class Section {
  constructor( {renderer }, containerSelector) {
    this.renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  
  addItem(element) {
    this._container.prepend(element);
  }
  
  renderItem(items) {
    this._items = items;
    this._items.forEach(item => {
      this.renderer(item);
    })
  }
}
  

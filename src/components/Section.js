export default class Section {
    constructor({ data, renderer }, containerSelector) {
        this._renderedItems = data
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._renderedItems.forEach(item => {
          this._renderer(item);
        });
    }

    appendItem(element) {
        this._container.append(element);
    }

    prependItem(element) {
        this._container.prepend(element);
    }
}
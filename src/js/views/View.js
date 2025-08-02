import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  // Clear the HTML element
  _clear() {
    this._parentElement.innerHTML = ``;
  }

  /**
   *
   * @param {Object | Object[]} data The data to be render (e.g. recipe)
   * @returns {undefined}
   * @this {Object} View instance
   * @author Yuval Weiss
   * @todo Finish implementation
   */
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }

  // Update the view just where there are changes (not all the html)
  update(data) {
    this._data = data;

    // HTML template of the selected view (updated)
    const newMarkup = this._generateMarkup();

    // document.createRange() creates a range object, which is a powerful tool for working with parts of the DOM.
    //.createContextualFragment(newMarkup) takes a string of HTML (newMarkup) and parses it into a DocumentFragment, which is a lightweight container for DOM nodes
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll(`*`)); // An array of nodes from the new DOM
    const curElements = Array.from(this._parentElement.querySelectorAll(`*`)); // An array of nodes from the old DOM

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Updates changed text
      // Compare nodes with isEqualNode
      // Check if there is an empty text
      // .nodeValue: For text nodes, this returns the text content. For element nodes, it's usually null
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ``
      ) {
        curEl.textContent = newEl.textContent;
      }

      //Updates changed Attribues
      // Array.from(newEl.attributes): Gets all attributes from newEl (like data-set, class, src, href, etc.) as an array.
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner() {
    const markup = `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }

  renderMessage(message = this._successMessage) {
    const markup = `<div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }
}

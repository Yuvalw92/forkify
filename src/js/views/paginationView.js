import View from './View.js';
import icons from 'url:../../img/icons.svg';

// Render buttons of pages number (pagination)
class PaginationView extends View {
  _parentElement = document.querySelector(`.pagination`);

  // Add click handler to the buttons and saves the number of page they go to
  // Both buttons have class of .btn--inline
  // Delegation for attaching this class
  // e.target can be on span or svg, so closest looks up for the class on the button
  addHandlerClick(handler) {
    this._parentElement.addEventListener(`click`, function (e) {
      const btn = e.target.closest(`.btn--inline`);
      if (!btn) return;
      const goToPage = +btn.dataset.goto; // The number of the next/previous page is saved on data-goto on in the markup
      handler(goToPage);
    });
  }

  // generates the buttons according to the current page and the number of pages
  _generateMarkup() {
    const curPage = this._data.page; // this._data is from render() in View
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const prevButton = this._generateMarkupButton(`prev`, curPage);
    const nextButton = this._generateMarkupButton(`next`, curPage);

    // page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return nextButton;
    }
    // page 1 and there are NO other pages
    if (curPage === 1 && curPage === numPages) {
      return ``;
    }
    // last page
    if (curPage === numPages && numPages > 1) {
      return prevButton;
    }
    // other page
    if (curPage < numPages) {
      return `${prevButton}${nextButton}`;
    }
  }

  _generateMarkupButton(direction, curPage) {
    if (direction === `prev`) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>`;
    }
    if (direction === `next`) {
      return `<button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }
  }
}

export default new PaginationView();

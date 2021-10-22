import View from './view.js';
import icons from '../../img/icons.svg'; // parcel 1 way

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  _body = document.body;

  addHandlerClick(subsHandler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      subsHandler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //  first page and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
        <button class="btn--inline ${
          this._body.classList.contains('dark') ? 'btn--inline-dark' : ''
        } pagination__btn--next${
        this._body.classList.contains('dark') ? '-dark' : ''
      } " data-goto="${curPage + 1}">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
          <span>Page ${curPage + 1}</span>
        </button>

        <div class="pagination__btn--mid${
          this._body.classList.contains('dark') ? '-dark' : ''
        }">${curPage}</div>
        
        `;
    }

    //  other pages
    if (curPage < numPages) {
      return `
        <button class="btn--inline ${
          this._body.classList.contains('dark') ? 'btn--inline-dark' : ''
        } pagination__btn--prev${
        this._body.classList.contains('dark') ? '-dark' : ''
      }" data-goto="${curPage - 1}">
        <span>Page ${curPage - 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
        </button>
        
        <div class="pagination__btn--mid${
          this._body.classList.contains('dark') ? '-dark' : ''
        }">${curPage}</div>

        <button class="btn--inline ${
          this._body.classList.contains('dark') ? 'btn--inline-dark' : ''
        } pagination__btn--next${
        this._body.classList.contains('dark') ? '-dark' : ''
      }" data-goto="${curPage + 1}">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
          <span>Page ${curPage + 1}</span>
        </button>
  `;
    }

    //  last page
    if (curPage === numPages && numPages > 1) {
      return `
        <button class="btn--inline ${
          this._body.classList.contains('dark') ? 'btn--inline-dark' : ''
        } pagination__btn--prev${
        this._body.classList.contains('dark') ? '-dark' : ''
      }" data-goto="${curPage - 1}">
          <span>Page ${curPage - 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
        </button>

        <div class="pagination__btn--mid${
          this._body.classList.contains('dark') ? '-dark' : ''
        }">${curPage}</div>
      `;
    }

    //  first page and there are less than 11 results
    return ''; // without any conditon because this is the only alternative left in conditions

    // or
    // if (this._data.results.length < this._data.resultsPerPage) {
    // return '';
    // }
  }
}

export default new PaginationView();

import View from './view.js';
import previewView from './previewView.js';

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _successMessage;

  _searchResultsWidth = document.querySelector('.search-results');
  _bookmarks = document.querySelector('.bookmarks');

  // test
  // _recipeDetailsDark = document.querySelector('.recipe__details-dark');
  constructor() {
    super();
    this._resizeEvents();
  }

  addHandlerRender(subsHandler) {
    window.addEventListener('load', subsHandler);
  }

  _resizeBookmarkWidth() {
    // const recipeDetailsDark = document.querySelector('.recipe__details-dark');
    // const recipeDetails = document.querySelector('.recipe__details');
    // console.log(recipeDetailsDark);
    // console.log(this._recipeDetailsDark, 'test');

    /////////////////////////////////////////////////////   test
    if (window.innerWidth > 750) {
      this._bookmarks.style.width =
        parseFloat(getComputedStyle(this._searchResultsWidth).width) - 5 + 'px';
    } else if (window.innerWidth < 750 && window.innerWidth > 550) {
      this._bookmarks.style.width = '28rem';
    } else this._bookmarks.style.width = '30rem';
  }

  _resizeEvents() {
    ['load', 'resize'].forEach(ev =>
      window.addEventListener(ev, () => {
        this._resizeBookmarkWidth();
      })
    );
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();

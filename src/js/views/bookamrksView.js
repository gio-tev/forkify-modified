import View from './view.js';
import previewView from './previewView.js';

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _successMessage;

  _searchResultsWidth = document.querySelector('.search-results');
  _bookmarks = document.querySelector('.bookmarks');

  constructor() {
    super();
    this._resizeEvents();
  }

  addHandlerRender(subsHandler) {
    window.addEventListener('load', subsHandler);
  }

  _resizeBookmarkWidth() {
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
        setTimeout(() => {
          this._resizeBookmarkWidth();
        }, 1000);
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

import View from './view.js';
import previewView from './previewView.js';

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _successMessage;

  _searchResultsWidth = document.querySelector('.search-results');

  _navBtnBookmarks = document.querySelector('.nav__btn--bookmarks');
  _bookmarks = document.querySelector('.bookmarks');

  constructor() {
    super();
    this._resizeEvents();
    this._focusOnbookark();
  }

  _focusOnbookark() {
    this._navBtnBookmarks.addEventListener('click', () => {
      this._bookmarks.style.opacity = '1';
      this._bookmarks.style.visibility = 'visible';
    });
    this._navBtnBookmarks.addEventListener('focusout', () => {
      this._bookmarks.style.opacity = '0';
      this._bookmarks.style.visibility = 'hidden';
    });
  }

  addHandlerRender(subsHandler) {
    window.addEventListener('load', subsHandler);
  }

  _resizeBookmarkWidth() {
    if (window.innerWidth > 750)
      this._bookmarks.style.width = getComputedStyle(
        this._searchResultsWidth
      ).width;
    else if (window.innerWidth < 750 && window.innerWidth > 550)
      this._bookmarks.style.width = '30rem';
    else this._bookmarks.style.width = '32rem';
  }

  _resizeEvents() {
    ['resize', 'load'].forEach(ev =>
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

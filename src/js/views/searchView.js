class SearchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();

    return query;
  }

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(subsHandler) {
    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();

      subsHandler();
    });
  }
}

export default new SearchView();

import View from './view.js';

class DarkModeView extends View {
  _btnModesContainer = document.querySelector('.nav__btn-dark-mode');
  _btnModesBtn = document.querySelector('.nav__btn-toggle-mode');
  _btnModesTextDark = document.querySelector('.nav__btn-text-dark');
  _btnModesTextLight = document.querySelector('.nav__btn-text-light');

  _body = document.body;
  _header = document.querySelector('.header');
  _navBtns = document.querySelectorAll('.nav__btn');
  _searchInput = document.querySelector('.search');
  _searchInputText = document.querySelector('.search__field');
  _searchResults = document.querySelector('.search-results');
  _recipe = document.querySelector('.recipe');
  _bookmarks = document.querySelector('.bookmarks');
  _recipeParagraph = document.querySelector('.recipe p');
  _recipeIngredientsAndDirections = document.querySelector(
    '.recipe-ingredients-and-directions'
  );

  // Add recipe dark mode
  _addRecipeBtn = document.querySelector('.nav__btn--add-recipe');
  _addRecipeWindow = document.querySelector('.add-recipe-window');
  _btnCloseModal = document.querySelector('.btn--close-modal');

  _addRecipeHeadings = document.querySelectorAll('.upload__heading');
  _addRecipeLabels = document.querySelectorAll('.upload label');
  _addRecipeInputs = document.querySelectorAll('.upload input');

  constructor() {
    super();
    // this._retainModeStateOnRefresh();
    this._addRecipeDarkMode();
  }

  toggleModes(SubsHandler) {
    this._btnModesContainer.addEventListener('click', e => {
      if (!this._body.classList.contains('dark')) {
        this._body.classList.add('dark');
        this._btnModesContainer.classList.add('nav__btn-dark-mode-dark');
        this._btnModesBtn.classList.add('nav__btn-toggle-mode-dark');
        this._btnModesTextDark.classList.add('nav__btn-text-dark-dark');
        this._btnModesTextLight.classList.add('nav__btn-text-light-dark');
        this._header.classList.add('header-dark');
        this._navBtns.forEach(btn => btn.classList.add('nav__btn-dark'));
        this._searchInput.classList.add('search__dark');
        this._searchInputText.classList.add('search__field-dark');
        this._searchResults.classList.add('search-results-dark');
        this._recipe.classList.add('recipe-dark');
        this._bookmarks.classList.add('bookmarks-dark');
        this._recipeParagraph.classList.add('recipe-paragraph-dark');
        this._recipeIngredientsAndDirections.classList.add(
          'recipe-ingredients-and-directions-dark'
        );
        sessionStorage.setItem('mode', 'dark');

        SubsHandler();
      } else {
        this._body.classList.remove('dark');
        this._btnModesContainer.classList.remove('nav__btn-dark-mode-dark');
        this._btnModesBtn.classList.remove('nav__btn-toggle-mode-dark');
        this._btnModesTextDark.classList.remove('nav__btn-text-dark-dark');
        this._btnModesTextLight.classList.remove('nav__btn-text-light-dark');
        this._header.classList.remove('header-dark');
        this._navBtns.forEach(btn => btn.classList.remove('nav__btn-dark'));
        this._searchInput.classList.remove('search__dark');
        this._searchInputText.classList.remove('search__field-dark');
        this._searchResults.classList.remove('search-results-dark');
        this._recipe.classList.remove('recipe-dark');
        this._bookmarks.classList.remove('bookmarks-dark');
        this._recipeParagraph.classList.remove('recipe-paragraph-dark');
        this._recipeIngredientsAndDirections.classList.remove(
          'recipe-ingredients-and-directions-dark'
        );
        sessionStorage.setItem('mode', 'light');

        SubsHandler();
      }
    });
  }

  retainModeStateOnRefresh() {
    if (sessionStorage.getItem('mode') === 'dark') {
      this._body.classList.add('dark');
      this._btnModesContainer.classList.add('nav__btn-dark-mode-dark');
      this._btnModesBtn.classList.add('nav__btn-toggle-mode-dark');
      this._btnModesTextDark.classList.add('nav__btn-text-dark-dark');
      this._btnModesTextLight.classList.add('nav__btn-text-light-dark');
      this._header.classList.add('header-dark');
      this._navBtns.forEach(btn => btn.classList.add('nav__btn-dark'));
      this._searchInput.classList.add('search__dark');
      this._searchInputText.classList.add('search__field-dark');
      this._searchResults.classList.add('search-results-dark');
      this._recipe.classList.add('recipe-dark');
      this._bookmarks.classList.add('bookmarks-dark');
      this._recipeParagraph.classList.add('recipe-paragraph-dark');
      this._recipeIngredientsAndDirections.classList.add(
        'recipe-ingredients-and-directions-dark'
      );
    }
  }

  _addRecipeDarkMode() {
    this._addRecipeBtn.addEventListener('click', e => {
      if (this._body.classList.contains('dark')) {
        this._addRecipeWindow.classList.add('add-recipe-window-dark');
        this._btnCloseModal.classList.add('btn--close-modal-dark');

        this._addRecipeHeadings.forEach(heading =>
          heading.classList.add('upload__heading-dark')
        );
        this._addRecipeLabels.forEach(label =>
          label.classList.add('upload-label-dark')
        );
        this._addRecipeInputs.forEach(input =>
          input.classList.add('upload-input-dark')
        );
      } else {
        this._addRecipeWindow.classList.remove('add-recipe-window-dark');
        this._btnCloseModal.classList.remove('btn--close-modal-dark');

        this._addRecipeHeadings.forEach(heading =>
          heading.classList.remove('upload__heading-dark')
        );
        this._addRecipeLabels.forEach(label =>
          label.classList.remove('upload-label-dark')
        );
        this._addRecipeInputs.forEach(input =>
          input.classList.remove('upload-input-dark')
        );
      }
    });
  }
}

export default new DarkModeView();

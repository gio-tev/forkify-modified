import View from './view.js';

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _successMessage = 'Recipe was successfully uploaded';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  _firstInputFocus = document.querySelector('input[name="title"]');

  _uploadColumns = document.querySelectorAll('.upload__column');
  _uploadBtn = document.querySelector('.upload__btn');
  _uploadInputs = document.querySelectorAll('.upload input');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', () => {
      this.toggleWindow();
      this._firstInputFocus.focus();
    });
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener(
      'click',
      this._updateRecipeWindowOnClose.bind(this)
    );

    this._overlay.addEventListener(
      'click',
      this._updateRecipeWindowOnClose.bind(this)
    );

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') this._updateRecipeWindowOnClose();
    });
  }

  _updateRecipeWindowOnClose() {
    this.toggleWindow();
    this._clear();

    this._uploadColumns.forEach(column =>
      this._parentEl.insertAdjacentElement('beforeend', column)
    );

    this._parentEl.insertAdjacentElement('beforeend', this._uploadBtn);

    this._uploadInputs.forEach(input => (input.value = ''));
  }

  addHandlerUpload(subsHandler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();

      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);

      subsHandler(data);
    });
  }
}

export default new AddRecipeView();

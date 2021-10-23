import { mark } from 'regenerator-runtime';
import icons from '../../img/icons.svg'; // parcel 1 way

export default class View {
  _data;
  _body = document.body;

  render(data, render = true) {
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();

    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;

    const newMarkup = this._generateMarkup();

    // creating new virtual DOM
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentEl.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== '' &&
        newEl.firstChild &&
        newEl.firstChild.nodeValue !== curEl.firstChild.nodeValue
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner"> 
           <svg>
           <use href="${icons}#icon-loader"></use>  
           </svg>
         </div>  
         
         `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(err = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div> 
        <p class ="${
          this._body.classList.contains('dark') ? 'error-dark' : ''
        }">${err}</p>
      </div>`;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderSuccessMessage(succMessage = this._successMessage) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p class ="${
          this._body.classList.contains('dark') ? 'success-dark' : ''
        }">${succMessage}</p>
      </div>`;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}

import View from './view.js';
// import { Fraction } from 'fractional'; // turning decimal numbers to fractionals
import icons from '../../img/icons.svg';

class RecipeIngredientsAndDirectionsView extends View {
  _parentEl = document.querySelector('.recipe-ingredients-and-directions');
  _errorMessage = 'The recipe could not be found, please try another one!';
  _body = document.body;

  addHandlerRender(SubsHandler) {
    ['hashchange', 'load'].forEach(ev =>
      window.addEventListener(ev, SubsHandler)
    );
  }

  addHandlerUpdateServings(subsHandelr) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;

      const { updateTo } = btn.dataset;
      if (+updateTo > 0) subsHandelr(+updateTo);
    });
  }

  addHandlerAddBookmark(subsHandelr) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      subsHandelr();
    });
  }

  _generateMarkup() {
    return ` 
  <div
    class="recipe__ingredients${
      this._body.classList.contains('dark') ? '-dark' : ''
    }"
  >
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
      ${this._data.ingredients
        .map(ing => {
          return `
                <li class="recipe__ingredient">
                    <svg class="recipe__icon">
                    <use href="${icons}#icon-check"></use>
                    </svg>
                    <div class="recipe__quantity${
                      this._body.classList.contains('dark') ? '-dark' : ''
                    }">${
            ing.quantity ? new Fraction(ing.quantity).toString() : ''
          }</div>
                    <div class="recipe__description${
                      this._body.classList.contains('dark') ? '-dark' : ''
                    }">
                    <span class="recipe__unit">${ing.unit}</span>
                    ${ing.description}
                    </div>
                    </li>
        `;
        })
        .join('')}
    </ul>
  </div>

  <div class="recipe__directions${
    this._body.classList.contains('dark') ? '-dark' : ''
  }"
  >
    <h2 class="heading--2-second">How to cook it</h2>
    <p
      class="recipe__directions-text ${
        this._body.classList.contains('dark')
          ? 'recipe__directions-text-dark'
          : ''
      } "
    >
      This recipe was carefully designed and tested by ${this._data.publisher}.
      Please check out directions at their website.
    </p>

    <a
      class="btn--small recipe__btn"
      href="${this._data.sourceUrl}"
      target="_blank"
    > 
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>

    <p class="copyright${this._body.classList.contains('dark') ? '-dark' : ''}">
        &copy; 2021 by
        <a class="twitter-link${
          this._body.classList.contains('dark') ? '-dark' : ''
        }" target="_blank" href="https://twitter.com/"
          >GT</a>
    </p> 

  </div>
    `;
  }
}

export default new RecipeIngredientsAndDirectionsView();

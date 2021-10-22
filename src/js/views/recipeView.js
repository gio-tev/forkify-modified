import View from './view.js';
import icons from '../../img/icons.svg'; // parcel 1 way

class RecipeView extends View {
  _parentEl = document.querySelector('.recipe');
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
    
    <div class="recipe__fig-details-container">
    <figure class="recipe__fig">
    <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />

    <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
               <svg>
                 <use href="${icons}#icon-user"></use>
               </svg>
   </div> 

      <h1 class="recipe__title">
      <span>${this._data.title}</span>
      </h1>
  </figure>

    <div class="recipe__details${
      this._body.classList.contains('dark') ? '-dark' : ''
    }"> 
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="${icons}#icon-users"></use>
              </svg>
              <span class="recipe__info-data${
                this._body.classList.contains('dark') ? '-dark' : ''
              } recipe__info-data--people"> ${this._data.servings} </span>
              <span class="recipe__info-text${
                this._body.classList.contains('dark') ? '-dark' : ''
              }">servings</span>
              
              <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-update-to="${
                this._data.servings - 1
              }">
                  <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                  </svg>
                  </button>
                  <button class="btn--tiny btn--update-servings" data-update-to="${
                    this._data.servings + 1
                  }">
                  <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                  </svg>
                  </button>
               </div> 
        </div>
              
        <div class="recipe__info">
                <svg class="recipe__info-icon"> 
                <use href="${icons}#icon-clock"></use>
                    </svg>
                    <span class="recipe__info-data${
                      this._body.classList.contains('dark') ? '-dark' : ''
                    } recipe__info-data--minutes">${
      this._data.cookingTime
    }</span>
                    <span class="recipe__info-text${
                      this._body.classList.contains('dark') ? '-dark' : ''
                    }">minutes</span>
           </div>
         
          
          <button class="btn--round btn--bookmark">
                    <svg class="">
                      <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
                   </svg>
         </button>       
     </div>
    </div>
    `;
  }
}

export default new RecipeView();

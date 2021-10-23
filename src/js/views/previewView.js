import View from './view.js';
import icons from '../../img/icons.svg';

class PreviewView extends View {
  _body = document.body;
  _preview = document.querySelectorAll('.preview');

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return `
        <li class="preview">
          <a class="preview__link${
            this._body.classList.contains('dark') ? '-dark' : ''
          } ${
      this._data.id === id
        ? `preview__link--active${
            this._body.classList.contains('dark') ? '-dark' : ''
          }`
        : ''
    } " href="#${this._data.id} ">
            <figure class="preview__fig">
                <img src="${this._data.image}" alt="${this._data.title}" />
            </figure>
              <div class="preview__data">
                  <h4 class="preview__title${
                    this._body.classList.contains('dark') ? '-dark' : ''
                  } ${
      this._data.id === id && this._body.classList.contains('dark')
        ? 'preview__title-dark-active'
        : '' || (this._data.id === id && !this._body.classList.contains('dark'))
        ? 'preview__title-active'
        : ''
    }">${this._data.title} ...</h4>
                  <p class="preview__publisher${
                    this._body.classList.contains('dark') ? '-dark' : ''
                  } ${
      this._data.id === id && this._body.classList.contains('dark')
        ? 'preview__publisher-dark-active'
        : '' || (this._data.id === id && !this._body.classList.contains('dark'))
        ? 'preview__publisher-active'
        : ''
    }">${this._data.publisher}</p>         
         </div>
           <div class="bookmarks-container">            
             <div class="preview__user-generated ${
               this._data.key ? '' : 'hidden'
             }">
                  <svg>
                  <use href="${icons}#icon-user"></use>
                 </svg>
             </div>    
           </div>
         </a>
       </li>
   `;
  }
}

export default new PreviewView();

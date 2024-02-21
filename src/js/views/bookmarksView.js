import View from './View';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector(`.bookmarks__list`);
  _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it :)`;
  _successMessage = ``;

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView._generateMarkup(bookmark))
      .join('');
  }

  addHandlerRender(handler) {
    window.addEventListener(`load`, handler);
  }
}

export default new BookmarksView();

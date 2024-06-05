class searchView {
  _parentElement = document.querySelector(".search");
  _input = document.querySelector(".search__input");
  _searchBtn = this._parentElement.querySelector("svg");
  _searchTitle;
  _addhandler(event) {
    this._searchBtn.addEventListener("click", event);
  }
  _searchFunc(e){
    this._inputText(e);
  }
  _inputText(e) {

    this._searchTitle = this._input.value.toUpperCase().trim();
    e.searchedTitle = this._searchTitle;
    // 1) clearing input 
    this._input.value = " ";
  }
}

export default new searchView();

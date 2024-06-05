class popup {
  #content = document.querySelector("#this-feature-is-not-developed");
  #buySection = document.querySelector(".buy-section");
  #filterSearch = document.querySelector(".filter__search-btn");
  #allButtons = Array.of(...document.querySelectorAll(".filter-container"));
  #closeBtn = document.querySelector(".close");
  constructor() {
    this.#allButtons.push(this.#filterSearch, this.#buySection);
  }

  _addHandler(event) {
    this.#allButtons.forEach((btn) => {
      if (!btn) return;
      btn.addEventListener("click", event);
    });
    this.#closeBtn.addEventListener("click", this._closeContent.bind(this));
  }
  _showContent() {
    this.#content.classList.add("active-popUp");
  }
  _closeContent() {
    this.#content.classList.remove("active-popUp");
  }
}

export default new popup();

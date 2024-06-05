// import icons from 'url:../../img/icons.svg';
import icons from "url:../../../img/sprite.svg";

class hotelPagination {
  _parentElement = document.querySelector(".hotels__list__cards");
  _nextBtn = document.querySelector(".next-page");
  _perviousBtn = document.querySelector(".pervious-page");
  _data;
  constructor() {}
  /////////////////////////////////////// METHOD ///////////////////////////////////////
  _addhandler(event) {
    [this._nextBtn, this._perviousBtn].forEach((btn) => {
      btn.addEventListener("click", event);
    });
  }
  /////////////////////////////////////// METHOD ///////////////////////////////////////

  _pageMoving(btnEvent, state) {
    const button = btnEvent.target.closest("button");
    const cardPerPage = state.cardsperPage;

    // other Pages
    if (state.currentPage > 1 && state.currentPage < cardPerPage) {
      this._perviousBtn.classList.remove("hidden");
      this._nextBtn.classList.remove("hidden");
      if (button.classList.contains("next-page")) {
        this._nextBtnDatapageFunc(button, state);
      }
      if (button.classList.contains("pervious-page")) {
        this._perviousBtnDataPageFunc(button, state);
      }
    }

    // first page and there is other page
    if (state.currentPage == 1 && state.currentPage < cardPerPage) {
      if (button.classList.contains("pervious-page")) {
        this._perviousBtn.classList.add("hidden");
        state.currentPage = 1;
      } else {
        this._perviousBtn.classList.remove("hidden");
        this._nextBtnDatapageFunc(button, state);
      }
    }

    // last page
    if (state.currentPage == cardPerPage && cardPerPage > 1) {
      this._nextBtn.classList.add("hidden");
      if (button.classList.contains("pervious-page")) {
        this._nextBtn.classList.remove("hidden");
        this._perviousBtnDataPageFunc(button, state);
      }
    }

    // first page and there is no other page
    if (state.currentPage == 1 && state.currentPage == cardPerPage) {
      this._nextBtn.classList.add("hidden");
      this._perviousBtn.classList.add("hidden");
    }
  }
  /////////////////////////////////////// METHOD ///////////////////////////////////////

  _nextBtnDatapageFunc(button, state) {
    // 1. updating page dataset
    this._perviousBtn.dataset.page = state.currentPage;
    this._nextBtn.dataset.page = +button.dataset.page + 1;

    // 2. updatting button ui
    this._updateButtonsUi();
    // 3. changing current page
    state.currentPage += 1;
  }
  /////////////////////////////////////// METHOD ///////////////////////////////////////

  _perviousBtnDataPageFunc(button, state) {
    // 1. updating page dataset
    this._perviousBtn.dataset.page = +button.dataset.page - 1;
    this._nextBtn.dataset.page = state.currentPage;

    // 2. updatting button ui
    this._updateButtonsUi();
    // 3. changing current page
    state.currentPage -= 1;
  }
  /////////////////////////////////////// METHOD ///////////////////////////////////////

  _updateButtonsUi() {
    this._perviousBtn.querySelector("span").innerHTML =
      this._perviousBtn.dataset.page;
    this._nextBtn.querySelector("span").innerHTML = this._nextBtn.dataset.page;
  }
  /////////////////////////////////////// METHOD ///////////////////////////////////////

  _render(data) {
    this._data = data;
    this._parentElement.innerHTML = " ";
    const markup = (this._generateMainMarkup(data) + "")
      .trim()
      .replaceAll(",", " ");
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  /////////////////////////////////////// METHOD ///////////////////////////////////////

  _generateMainMarkup(currentCards) {
    return currentCards.map((card) => {
      const className = card.title.replaceAll(" ", "").trim();
      return `
      <div class="card">
        <div class="card__img ">
          <img src="${card.imgUrl}" alt="hotel" />
        </div>
        <div class="card__introduction">
          <div class="card__introduction__title">
            <h2 class="${className}">${
        card.title
      }</h2>
          </div>
          <div class="card__introduction__rating">
            <span>Hotel</span>
            <div class="card__introduction__stars">
            ${this._generateStarsMarkup(card)}
            </div>
          </div>
          <p>${card.rating}</p>
          <a href="up_/Hotels--item/index.html" class="card__introduction__button" href="#">
            View Deal
          </a>
        </div>
        <svg class="bookmark-icon" viewBox="0 0 50 50" width="30">
              <use xlink:href="${icons}#icon-bookmark" />
            </svg>
      </div>
      `.replace(",", " ");
    });
  }
  /////////////////////////////////////// METHOD ///////////////////////////////////////

  _generateStarsMarkup(cardS) {
    let markup = "";

    for (let i = 0; i < cardS.starsNumb; i++) {
      markup += `  
      
      <svg
            viewBox="0 0 50 50"
            width="15"
            height="50"
            class="item--link__icon"
          >
            <use
              xlink:href="${icons}#icon-star-outline"
            />
    </svg>
    `;
    }
    return markup;
  }
}

export { hotelPagination };
export default new hotelPagination();

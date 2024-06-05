import icons from "url:../../../img/sprite.svg";

class bookmarkView {
  #cardBookmarkIconAll;
  #cardBookmarkIcon;
  #notificationBookmark = document.querySelector(".notification-bookmark");
  #bookmarkConatainer = document.querySelector(".icon-box-bookmark");
  #parentElement = document.querySelector(".bookmark-container");
  #card;
  #data;
  constructor(state) {
    this.#data = state;
   
  }
  _render(data) {
    this.#parentElement.innerHTML = " ";
    const markup = (this._generateMainMarkup(data) + "")
      .trim()
      .replaceAll(",", " ");
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }
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
            <h2 class="${className}">${card.title}</h2>
          </div>
          <div class="card__introduction__rating">
            <span>Hotel</span>
            <div class="card__introduction__stars">
            ${this._generateStarsMarkup(card)}
            </div>
          </div>
          <p>${card.rating}</p>
          <svg class="bookmark-icon bookmark-icon-acvive" viewBox="0 0 50 50" width="30">
           <use xlink:href="${icons}#icon-bookmark" />
          </svg>
        </div>

      </div>
      `.replace(",", " ");
    });
  }
  /////////////////////////////////////// METHOD ///////////////////////////////////////
  _removeBookmarkFromContainer(data) {
    const allBookmarksIcon = document.querySelectorAll(
      ".bookmark-container .bookmark-icon"
    );

    allBookmarksIcon.forEach((bookmark) => {
      bookmark.addEventListener("click", (e) => {
        const card = bookmark.closest(".card");
        const cardTitle = this.#card.querySelector("h2").innerText;
        const cardRating = this.#card.querySelector("p").innerText;
        // 3. finding card
        const cardArr = this._findCard(cardTitle, cardRating);
        this._popbookMark(cardArr);
        this._render(data.bookMarked);
        this._updateNotification(data);
        this._makeBookMarkActiveOnLoad(data.cards);
      });
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

  _makeBookMarkActiveOnLoad(cards) {
    cards.forEach((card, index, cards) => {
      const className = "." + card.title.replaceAll(" ", "").trim();

      const HotleCard = document.querySelector(`.hotels__list ${className}`);
      if (!HotleCard) return;

      const bookmarkIcon =
        HotleCard.closest(".card").querySelector(".bookmark-icon");

      if (card.isBookMarked) {
        bookmarkIcon.classList.add("bookmark-icon-acvive");
      } else {
        bookmarkIcon.classList.remove("bookmark-icon-acvive");
      }
    });
  }
  _addhandler(event, state) {
    this.#cardBookmarkIconAll = document.querySelectorAll(".bookmark-icon");

    this.#cardBookmarkIconAll.forEach((bookmark) => {
      bookmark.addEventListener("click", event);
    });
  }
  _pushcard(e, state) {
    // 1. setting card and data wich is state
    this.#card = e.target.closest(".card");

    this.#data = state;
    this.#cardBookmarkIcon = e.target.closest(".bookmark-icon");

    // 2. getting card title and card rating
    const cardTitle = this.#card.querySelector("h2").innerText;
    const cardRating = this.#card.querySelector("p").innerText;
    // 3. finding card
    const cardArr = this._findCard(cardTitle, cardRating);
    const isItBookMarked = cardArr[0].isBookMarked;
    // 4. pushing and poping cards the card arr and changing isBookmarked state in cards
    if (!isItBookMarked) {
      this.#cardBookmarkIcon.classList.add("bookmark-icon-acvive");

      this._pushbookmark(cardArr);

    } else {
      this.#cardBookmarkIcon.classList.remove("bookmark-icon-acvive");

      this._popbookMark(cardArr);

    }
  }
  _findCard(CardTitle, CardRating) {
    return this.#data.cards.filter((card) => {
      return (card.title == CardTitle) & (card.rating == CardRating);
    });
  }
  _updateNotification(state) {
    this.#notificationBookmark.innerHTML = state.bookMarked.length;
  }
  // _updateIcon() {
  //   this.#cardBookmarkIcon.classList.toggle("bookmark-icon-acvive");
  // }
  _pushbookmark(CardArr) {
    CardArr.forEach((card) => {
      card.isBookMarked = true;
      this._updateMainCards(card);
      this.#data.bookMarked.push(card);
    });
  }
  _popbookMark(CardArr) {
    CardArr.forEach((card) => {
      card.isBookMarked = false;
      this._updateMainCards(card);
      const index = this.#data.bookMarked.findIndex(
        (card) => card.isBookMarked == true
      );
      this.#data.bookMarked.splice(index, 1);
    });
  }
  _updateMainCards(card) {
    const index = this.#data.cards.findIndex((MainCard) => MainCard == card);
    this.#data.cards[index].isBookMarked = card.isBookMarked;
  }
}

export default bookmarkView;

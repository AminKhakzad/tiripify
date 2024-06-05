import * as Model from "./model";
import offersSliderView from "./views/offersSliderView";
import hotelPaginationView from "./views/hotelPaginationView.js";
import searchView from "./views/searchView.js";
import leafletView from "./views/leafletView.js";
import bookmarkView from "./views/bookmarkView.js";
import popUpView from "./views/popUpView.js";

// const bookmarkViewClass = new bookmarkView(Model.state);
let paginationEvent;
let arr;
const bookmarkViewClass = new bookmarkView(Model.state);

window.addEventListener("resize", (e) => {
  leafletView._mapInMobile();
});
function popUpViewController() {
  popUpView._showContent();
}
function bookmarkViewController(e) {
  bookmarkViewClass._pushcard(e, Model.state);
  //bookmarkViewClass._updateIcon();

  bookmarkViewClass._updateNotification(Model.state);

  bookmarkViewClass._render(Model.state.bookMarked);
  bookmarkViewClass._removeBookmarkFromContainer(Model.state);
}

function offerSliderControll(e) {
  offersSliderView._moveSlides(e);
}

function hotelPaginationControl(e) {
  paginationEvent = e;

  arr =
    Model.state.searchedTitle == ""
      ? Model.state.cards
      : Model.state.foundCards;

  Model.getResualtPage(Model.state.currentPage, arr);
  hotelPaginationView._pageMoving(e, Model.state);
  hotelPaginationView._render(Model.state.currentCards);
  bookmarkViewClass._addhandler(bookmarkViewController);
  leafletView._removeMarkers();
  leafletView._makeMarkUp(Model.state.currentCards);
  bookmarkViewClass._makeBookMarkActiveOnLoad(Model.state.cards);
}

function searchViewController(btnEvent) {
  // 0/5. hidden nextbtn paginatin setting foundcards and current page
  hotelPaginationView._nextBtn.classList.remove("hidden");
  Model.state.foundCards = "";
  Model.state.currentPage = 1;

  // 1. what is the search?
  searchView._searchFunc(Model.state);

  // 2. making the found Array .
  Model.searchCards(Model.state.searchedTitle);

  // 2/5. setting if there is any word to search
  arr =
    Model.state.searchedTitle == ""
      ? Model.state.cards
      : Model.state.foundCards;

  Model.getResualtPage(Model.state.currentPage, arr);

  // 2/75. changing number of pages
  Model.state.cardsperPage = Math.ceil(Model.state.foundCards.length / 7);

  // 2/99. if there is just one page hide buttons
  if (arr.length <= 7) {
    hotelPaginationView._nextBtn.classList.add("hidden");
    hotelPaginationView._perviousBtn.classList.add("hidden");
  }

  // 3. make pagination work currect
  // 3/5. resualt per page
  // 4. rendering search

  hotelPaginationView._render(Model.state.currentCards);
  bookmarkViewClass._addhandler(bookmarkViewController);
  bookmarkViewClass._makeBookMarkActiveOnLoad(Model.state.cards);

  if (!paginationEvent) return;
  hotelPaginationControl(paginationEvent);
  bookmarkViewClass._makeBookMarkActiveOnLoad(Model.state.cards);
}
function leafletViewController(e) {
  leafletView._mapFunc(e);
}

export function init() {
  leafletView._makeMarkUp(Model.state.currentCards);
  hotelPaginationView._render(Model.state.currentCards);
  offersSliderView._addhandler(offerSliderControll);
  hotelPaginationView._addhandler(hotelPaginationControl);
  searchView._addhandler(searchViewController);
  leafletView._mapAddHandler(leafletViewController);
  bookmarkViewClass._addhandler(bookmarkViewController);
  popUpView._addHandler(popUpViewController);
  console.log(offersSliderView);
}
init();

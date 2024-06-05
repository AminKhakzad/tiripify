import * as Model from "../../Hotels/js/model";
import bookmarkView from "../../Hotels/js/views/bookmarkView.js";
import popUpView from "../../Hotels/js/views/popUpView.js";
import barbaView from "../../Hotels/js/views/barbaView.js";
const bookmarkViewClass = new bookmarkView(Model.state);
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

function init() {
  bookmarkViewClass._addhandler(bookmarkViewController);
  popUpView._addHandler(popUpViewController);
}
init();

class offerSlider {
  _parentElement = document.querySelector(".offers__card-container");
  _slides = this._parentElement.querySelectorAll(".offers__card");
  _nextBtn = document.querySelector(".next-offer");
  _perviousBtn = document.querySelector(".previous-offer");
  _clickedNumbs = 0;
  _touchStart;
  _touchEnd;
  _touchDirectionBtn;

  constructor() {
    this._parentElement.addEventListener("touchstart", (e) => {
      this._touchStart = e.changedTouches[0].pageX;
    });
  }
  _addhandler(event) {
    [this._nextBtn, this._perviousBtn].forEach((btn) => {
      btn.addEventListener("click", event);
    });

    this._parentElement.addEventListener("touchend", event);
  }
  _moveSlides(e) {
    // 1. Checking what is type of event and if it was touch selecting btns .
    if (e.type == "touchend" && document.documentElement.clientWidth < 800) {
      this._touchEnd = e.changedTouches[0].pageX;
      this._touchDirectionBtn =
        this._touchStart < this._touchEnd ? this._perviousBtn : this._nextBtn;
    } else {
      this._touchDirectionBtn = false;
    }

    // 2. Selecting button .
    let button =
      e.type == "click" ? e.target.closest("span") : this._touchDirectionBtn;

    // 2.5 ) if it was touch but the screen is larger than 800px , do nothing
    if (!button) return;

    // 3. Next slide or previous slide ?
    this._clickedNumbs = button.classList.contains("next-offer")
      ? (this._clickedNumbs -= 1)
      : (this._clickedNumbs += 1);

    if (this._clickedNumbs == -this._slides.length) {
      this._clickedNumbs = 0;
    }
    if (
      (this._clickedNumbs <= 0 || this._clickedNumbs) &&
      button.classList.contains("previous-offer") &&
      !(this._clickedNumbs == -1)
    ) {
      this._clickedNumbs = 0;
    }

    // 4. Moving slides .
    this._moveSlide();
  }
  _moveSlide() {
    this._slides.forEach((slide) => {
      if (document.documentElement.clientWidth < 800) {
        slide.style.transform = ` translateX(${100 * this._clickedNumbs}%)`;
      } else {
        slide.style.transform = ` translateX(${106 * this._clickedNumbs}%)`;
      }
      this._toggleHiddenBtns();
    });
  }
  _toggleHiddenBtns() {
    this._nextBtn.classList.toggle("hidden");
    this._perviousBtn.classList.toggle("hidden");
  }
}

export default new offerSlider();

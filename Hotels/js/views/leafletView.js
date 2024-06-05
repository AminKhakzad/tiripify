import L from "leaflet";
import "leaflet/dist/leaflet.css";
import hotelPaginationView, { hotelPagination } from "./hotelPaginationView";

class leafletView extends hotelPagination {
  #map;
  _mapConatianerEl = document.querySelector(".hotels__map");
  #mapEl = document.querySelector("#map");
  #coords = [35.6498974, 51.38472];
  #showMap = document.querySelector(".show-map");
  #bind = this._hideMap.bind(this);
  #markers = [];
  constructor() {
    super();
    this._loadMap();
    this._mapInMobile();
  }

  _mapInMobile() {
    if (document.documentElement.clientWidth <= 700) {
      this._hideMap();
    } else {
      this._mapConatianerEl.removeEventListener("click", this.#bind);
      this._showMap();
    }
  }
  _mapAddHandler(event) {
    this.#showMap.addEventListener("click", event, true);
    this.#mapEl.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  _removeEevent() {
    this._mapConatianerEl.removeEventListener("click", this.#bind);
  }
  _mapFunc(e) {
    this._showMap();
    this._mapConatianerEl.addEventListener("click", this.#bind);
  }

  _hideMap() {
    this._mapConatianerEl.classList.add("hidden");
  }

  _showMap() {
    this._mapConatianerEl.classList.remove("hidden");
  }

  _loadMap() {
    this.#map = L.map("map").setView(this.#coords, 9);

    L.tileLayer("http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}", {
      maxZoom: 20,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }).addTo(this.#map);
  }
  _removeMarkers() {
    this.#markers.forEach((marker) => {
      this.#map.removeLayer(marker);
    });
  }
  _makeMarkUp(currentCards) {
    currentCards.forEach((card) => {
      const popUpContent = `
      <div class="cardM">
        <div class="cardM__img">
          <img src="${card.imgUrl}" alt="hotel" />
        </div>
        <div class="cardM__introduction">
          <div class="cardM__introduction__title">
            <h2>${card.title}</h2>
          </div>
          <div class="cardM__introduction__rating">
            <span>Hotel</span>
            <div class="cardM__introduction__stars">
            ${this._generateStarsMarkup(card)}
            </div>
          </div>
          <p>${card.rating}</p>
        </div>
      </div>
      `.replace(",", " ");

      const myIcon = L.icon({
        iconUrl: "./icon.png",
        iconSize: [65, 65],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowUrl: "./shadow.png",
        shadowSize: [35, 35],
      });

      const marker = L.marker(card.coords, { icon: myIcon });
      this.#markers.push(marker);
        marker
        .addTo(this.#map)
        .bindPopup(
          L.popup({
            // maxWidth: 1000,
            // minWidth: 50,
            autoClose: false,
            closeOnClick: false,
            className: `markup`,
          }).setContent(popUpContent)
        )
        .openPopup();
    });
  }
}

export default new leafletView();

import { personIcon } from "./constant.js";
import { getStatus, getIcon } from "./helper.js";
import { ui } from "./ui.js";

// Global variables
let clickCords;
let layer;
let map;
// get data from local , render an array if local is empty
let notes = JSON.parse(localStorage.getItem("notes")) || [];

window.navigator.geolocation.getCurrentPosition(
  //kullanıcın istediği konum
  (e) => {
    loadMap([e.coords.latitude, e.coords.longitude], "Mevcut Konum");
  },
  //varsayılan konum
  (e) => {
    loadMap([39.921132, 32.861194], "Varsayılan Konum");
  }
);

// ! loadMap function
function loadMap(currentPosition, msg) {
  //map set
  map = L.map("map", {
    //Zoom control button remove
    zoomControl: false,
  }).setView(currentPosition, 10);
  //map render
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  //creaat layer markers List
  layer = L.layerGroup().addTo(map);

  //Zoom buttons move right-bottom
  L.control.zoom({ position: "bottomright" }).addTo(map);
  //cursor add and cursor icon define
  L.marker(currentPosition, { icon: personIcon }).addTo(map).bindPopup(msg);

  //map click
  map.on("click", onMapClick);
  //!render notes
  renderNotes();
  //!render marker
  renderMarkers();
}

//! map click function
function onMapClick(e) {
  //get coordinates of clicked location
  clickCords = [e.latlng.lat, e.latlng.lng];
  //add 'add' class to the aside class
  ui.aside.classList.add("add");
}

//click iptal button,
ui.cancelBtn.addEventListener("click", () => {
  //remove the add class in the aside
  ui.aside.classList.remove("add");
});

//! form submit event
ui.form.addEventListener("submit", (e) => {
  //prevent page refresh
  e.preventDefault();

  //access data in the form
  const title = e.target[0].value;
  const date = e.target[1].value;
  const status = e.target[2].value;

  //creat a note object
  const newNote = {
    //unique id
    id: new Date().getTime(),
    title,
    date,
    status,
    coords: clickCords,
  };

  // add notes array to he newNote
  notes.unshift(newNote);
  //update local
  localStorage.setItem("notes", JSON.stringify(notes));
  //remove the add class in the aside
  ui.aside.classList.remove("add");
  //form reset
  e.target.reset();
  //render notes
  renderNotes();
  //render marker
  renderMarkers();
});

//render notes function
function renderNotes() {
  const noteCards = notes
    .map((note) => {
      //edit date data
      const date = new Date(note.date).toLocaleDateString("tr", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      //edit status data
      const status = getStatus(note.status);
      return `
        <li>
          <div>
            <p>${note.title}</p>
            <p>${date}</p>
            <p>${status}</p>
          </div>
          <div class="icons">
            <i data-id='${note.id}' class="bi bi-airplane-fill" id="fly"></i>
            <i data-id='${note.id}' class="bi bi-trash-fill" id="delete"></i>
          </div>
        </li>
  `;
    })
    .join("");
  // add HTML
  ui.ulElement.innerHTML = noteCards;
  //click on the delete icons
  document.querySelectorAll("#delete").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      deleteNote(id);
    });
  });
  //click ont the fly icons
  document.querySelectorAll("#fly").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      flyToLocation(id);
    });
  });
}
//render markers function
function renderMarkers() {
  //clear markers
  layer.clearLayers();
  notes.map((note) => {
    const icon = getIcon(note.status);
    L.marker(note.coords, { icon }).addTo(layer).bindPopup(note.title);
  });
}
// ! delete note function
function deleteNote(id) {
  //confirm from the user
  const result = confirm("Notu silmeyi onaylıyor musunuz ?");
  if (result) {
    //remove element with know id from the notes array
    notes = notes.filter((note) => note.id !== parseInt(id));
    //update local
    localStorage.setItem("notes", JSON.stringify(notes));
    //render notes
    renderNotes();
    //render marker
    renderMarkers();
  }
}
// ! fly note function
function flyToLocation(id) {
  //fly element with know id from the notes array
  const note = notes.find((note) => note.id === parseInt(id));

  //fly to note find
  map.flyTo(note.coords, 10);
}
// click arrow icon function
ui.arrow.addEventListener("click", () => {
  ui.aside.classList.toggle("hide");
});

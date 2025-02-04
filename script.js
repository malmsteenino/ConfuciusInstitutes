// Funzione per caricare le mappe nel dropdown
function loadMapOptions() {
  const yearList = document.getElementById("yearList");
  yearList.innerHTML = ""; // Reset del dropdown

  const selectedMapType = document.querySelector('input[name="mapType"]:checked').value;

  let mapFiles = [];
//modifiche ai nomi dei file non sono passate?
  if (selectedMapType === "single") {
    mapFiles = Array.from({ length: 21 }, (_, i) => (2004 + i).toString());
  } else if (selectedMapType === "aperture") {
    mapFiles = ["openings_2004-2008", "openings_2009-2013", "openings_2014-2018", "openings_2019-2024"];
  } else if (selectedMapType === "chiusure") {
    mapFiles = ["closures_2004-2008", "closures_2009-2013", "closures_2014-2018", "closures_2019-2024"];
  } else if (selectedMapType === "china") {
    mapFiles = ["china"];
  }

  mapFiles.forEach(file => {
    const listItem = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.classList.add("dropdown-item");
    anchor.href = "#";
    anchor.textContent = file;
    anchor.addEventListener("click", () => {
      updateMap(file);
    });
    listItem.appendChild(anchor);
    yearList.appendChild(listItem);
  });

  // Imposta il primo valore come default
  updateMap(mapFiles[0]);
}

// Funzione per aggiornare la mappa visualizzata
function updateMap(file) {
  const mapViewer = document.getElementById("mapViewer");
  const newSrc = `mappe/${file}.html`; 
  mapViewer.src = newSrc;
  document.getElementById("currentYear").textContent = file;
}

// Gestisci il cambio di selezione dei radio button
document.querySelectorAll('input[name="mapType"]').forEach(input => {
  input.addEventListener("change", loadMapOptions);
});

// Caricamento iniziale della mappa
window.onload = () => {
  loadMapOptions();
};

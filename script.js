// Funzione per caricare le mappe dal dropdown in base alla selezione
function loadMapOptions() {
  const yearList = document.getElementById("yearList");
  yearList.innerHTML = ""; // Resetta il contenuto del dropdown

  const selectedYearType = document.querySelector('input[name="yearType"]:checked').value;

  let mapFiles = [];

  if (selectedYearType === "single") {
    // Aggiungi gli anni singoli (2004-2024) senza estensione .html
    mapFiles = [
      "2004", "2005", "2006", "2007", "2008",
      "2009", "2010", "2011", "2012", "2013",
      "2014", "2015", "2016", "2017", "2018",
      "2019", "2020", "2021", "2022", "2023", "2024"
    ];
  } else if (selectedYearType === "range") {
    // Aggiungi gli intervalli di anni (2004-2008, 2009-2012, ...)
    mapFiles = [
      "2004-2008", "2009-2013", "2014-2018", "2019-2024"
    ];
  } else if (selectedYearType === "china") {
    // Aggiungi solo l'opzione per "china.html"
    mapFiles = ["china"];
  }

  // Popola il dropdown con le opzioni senza estensione .html
  mapFiles.forEach(file => {
    const listItem = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.classList.add("dropdown-item");
    anchor.href = "#";
    anchor.textContent = file === "china" ? "China" : file;
    anchor.addEventListener("click", () => {
      updateMap(file);
    });
    listItem.appendChild(anchor);
    yearList.appendChild(listItem);
  });

  // Imposta l'anno corrente nel dropdown
  const currentYearText = document.getElementById("currentYear");
  const firstOption = mapFiles[0]; // Prende il primo anno o intervallo
  currentYearText.textContent = firstOption;
  document.getElementById("yearDropdown").textContent = `Selected ${firstOption}`;

  // Aggiorna la mappa con il primo valore
  updateMap(firstOption);
}

// Funzione per aggiornare la mappa visualizzata
function updateMap(file) {
  const mapViewer = document.getElementById("mapViewer");
  const newSrc = `mappe/${file}.html`; // Aggiungi l'estensione .html al file selezionato
  mapViewer.src = newSrc;
  console.log(`Caricamento mappa: ${newSrc}`);

  // Aggiorna l'anno corrente visualizzato
  const currentYearText = document.getElementById("currentYear");
  currentYearText.textContent = file === "china" ? "China" : file;
  document.getElementById("yearDropdown").textContent = `Selected ${file === "china" ? "China" : file}`;
}

// Gestisci il cambio di tipo di selezione (singolo anno, intervallo o china)
document.querySelectorAll('input[name="yearType"]').forEach(input => {
  input.addEventListener("change", () => {
    loadMapOptions(); // Ricarica le opzioni del dropdown
  });
});

// Carica le opzioni iniziali e la mappa predefinita
window.onload = () => {
  loadMapOptions();
  updateMap("2004"); // Imposta la mappa iniziale su 2004
};

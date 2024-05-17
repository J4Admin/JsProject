// Variables globales
const galleryDiv = document.querySelector(".gallery");
const filterDiv = document.querySelector(".menuDeCategories")
const apiUrl = "http://localhost:5678/api/works";

// Fonction pour récupérer les travaux de l'architecte
async function getWorks() {
  const worksArchitect = await fetch(apiUrl);
  return await worksArchitect.json();
}

// Fonction pour afficher les travaux
async function viewWorks(category = "defaults") {
  const arrayWorks = await getWorks();
  galleryDiv.innerHTML = ""; // Vide la galerie

  // Filtre les travaux en fonction de la catégorie sélectionnée
  const filteredWorks = arrayWorks.filter((element) => {
    if (category === "defaults") {
      return true; // Affiche tous les travaux si aucune catégorie sélectionnée
    } else {
      return element.category.name === category; // Sinon affiche la catégorie selection 
    }
  });

  // Afficher les travaux filtrés.
  filteredWorks.forEach((element) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = element.imageUrl;
    figcaption.textContent = element.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    galleryDiv.appendChild(figure);
  });
}

// Fonction pour filtrer les travaux par catégorie.
async function FilterWorks() {
  const arrayCategorieFilter = await getWorks();

 
 // Bouton "Tous", affiche tout les éléments de la galerie.
  const btnAll = document.createElement("input");
  btnAll.classList.add("btnFilter")
  btnAll.value = "Tous";
  btnAll.type = "button";
  btnAll.addEventListener("click", () => viewWorks()); // On dit que si le buton est cliqué il affiche tout les travaux.
  filterDiv.appendChild(btnAll); // On définit L'enfant de menu catégorie btnAll( Le bouton "Tous").

  // Crée un ensemble(set), pour stocker les noms de catégorie.
  const Categorie = new Set();
  arrayCategorieFilter.forEach((element) => {
    Categorie.add(element.category.name); // On aurait pu ne pas faire de boucle et renseigné chaque catégories, 
    // permet d'automatisé la tache et d'avoir un code plus facilement clair/maintenable.
  });

  //génere et ajoute des boutons pour filtrer avec chaque catégorie 
  Categorie.forEach((categoryName) => {
    const btnFilter = document.createElement("input");
    btnFilter.classList.add("btnFilter");
    btnFilter.value = categoryName; // On ajoute la valeur qui contient le nom  pour chaque catégories.
    btnFilter.type = "button";

    btnFilter.addEventListener("click", () => {
      viewWorks(categoryName) 
    });
// je redefinit "bntAll" enfant de menuDeCategorie, du au fait que la derniere déclaration soit en local et non global. 
    filterDiv.appendChild(btnFilter,btnAll); 
  });

  // Appel pour afficher, Par default tout les travaux.
  viewWorks(); 

}

// Appel initial pour afficher les boutons de filtre.
FilterWorks();



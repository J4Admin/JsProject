// Variables globales
const galleryDiv = document.querySelector(".gallery");
const filterDiv = document.querySelector(".filters");
const apiUrl = "http://localhost:5678/api";
let btnFilter = document.querySelector("button");

// Interpolation ajouté avec succès !

// récupére/stock les travaux de l'architecte et les convertis en JSON
async function getWorks() {
  const worksArchitect = await fetch(`${apiUrl}/works`);
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

  // Affiche les travaux filtrés.
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
async function filterWorks() {
  const arrayCategorieFilter = await getWorks();

  // Bouton "Tous", affiche tout les éléments de la galerie.
  const btnAll = document.createElement("button");

  btnAll.textContent = "Tous";
  btnAll.type = "button";
  btnAll.classList.add("active");
  // On utilise la methode addEventListener afin de surveillier(monitoring) si l'utilisateur "click"
  // Si Oui , il appelle la fonction viewWorks, pour afficher tout les travaux.
  btnAll.addEventListener("click", () => {
    let othersFilter = document.querySelectorAll(".filters button");

    // Parcourir tous les filtres et supprimer la classe active
    othersFilter.forEach((button) => {
      button.classList.remove("active");
    });
    btnAll.classList.add("active");
    viewWorks();
  });

  // On définit L'enfant de menu catégorie btnAll( Le bouton "Tous").
  filterDiv.appendChild(btnAll);

  // Crée un ensemble(set), pour stocker les noms de catégorie.
  const categorie = new Set();

  arrayCategorieFilter.forEach((element) => {
    categorie.add(element.category.name);
    // On aurait pu ne pas faire de boucle et renseigné chaque catégories,
    // permet d'automatisé la tache et d'avoir un code plus facilement clair/maintenable.
  });

  //génere et ajoute des boutons pour filtrer avec chaque catégorie
  categorie.forEach((categoryName) => {
    const btnFilter = document.createElement("button");

    btnFilter.textContent = categoryName; // On ajoute la valeur qui contient le nom  pour chaque catégories.
    btnFilter.type = "button";
    btnFilter.classList.add();

    //monitoring sur l'evenement click, de "btnFilter"
    btnFilter.addEventListener("click", () => {
      let allFilters = document.querySelectorAll(".filters button");

      // Parcourir tous les filtres et supprimer la classe active
      allFilters.forEach((button) => {
        button.classList.remove("active");
      });
      btnFilter.classList.add("active");
      viewWorks(categoryName);
    });

    // je redefinit "bntAll" enfant de filters, du au fait que la derniere déclaration soit en local et non global.
    filterDiv.appendChild(btnFilter, btnAll);
  });

  // Appel pour afficher, Par default tout les travaux.
  viewWorks();
}

// Appel initial pour afficher les boutons de filtre.
filterWorks();

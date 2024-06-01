// Variables globales
const galleryDiv = document.querySelector(".gallery");
const filterDiv = document.querySelector(".filters");
const apiUrl = "http://localhost:5678/api";
let btnFilter = document.querySelector("button");

// récupére/stock les travaux de l'architecte et les convertis en JSON
async function getWorks() {
  const worksArchitect = await fetch(`${apiUrl}/works`);
  return await worksArchitect.json();
}

// Fonction pour afficher les travaux
async function viewWorks(category = "defaults") {
  const arrayWorks = await getWorks();
  
  arrayWorks.forEach((element) => {
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

viewWorks()

// 3 - Modale 



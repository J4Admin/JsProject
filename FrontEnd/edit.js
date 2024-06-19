// import variables @ config.js
import { apiUrl, addModalForm, viewOne } from "./config.js";

// Variables globales
const editWorkSection = document.querySelector(".edit-work");
const asideModal = document.getElementById("modal-aside");
const editWork = document.querySelector("section .edit-work");
const h2FirstModal = document.getElementById("modal1-h2");
const btnBack = document.querySelector(".btn-back");

let isModal1 = false;
let isModal2 = false;

// récupére les travaux, depuis l'api
async function getWorks() {
  const worksArchitect = await fetch(`${apiUrl}/works`);
  return await worksArchitect.json();
}

// 3 - Modale

// Afiche les travaux dans la modal 1
async function viewEditWork(category = "defaults") {
  const arrayWorks = await getWorks();

  arrayWorks.forEach((element) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    const icone = document.createElement("icone");

    icone.classList.add("fa-solid", "fa-trash-can", "ico-editwork");
    figure.classList.add("work");

    icone.id = element.id;
    img.src = element.imageUrl;
    figcaption.textContent = element.title;

    figure.appendChild(icone);
    figure.appendChild(img);
    figure.appendChild(figcaption);
    editWorkSection.appendChild(figure);
  });
  isModal1 = true;
}

// Affiche la modal 1
function getModalDisplay() {
  const btnEdit = document.querySelector(".btn-edit");
  const btnRedirectAdd = document.querySelector(".modal-input");

  btnEdit.addEventListener("click", (event) => {
    if (event) {
      asideModal.classList.add("display-modal");
      btnBack.classList.add("hidden");

      // redéfini le titre de la modal lors d'une ré-ouverture de modal
    }
    if (isModal1 === false && isModal2 === false) {
      viewEditWork();
    }
    if (isModal2 === false) {
      isModal1 = true;
      isModal2 = false;
    }
  });
}
getModalDisplay();

// Redirige sur la seconde Modal / cache la Premiere
function redirectAddModal() {
  const btnRedirectAdd = document.querySelector(".modal-input");
  const form = document.querySelector("form");

  btnRedirectAdd.addEventListener("click", () => {
    btnRedirectAdd.classList.add("hidden");
    h2FirstModal.classList.add("hidden");
    editWork.classList.add("hidden");

    btnBack.classList.remove("hidden");

    if (isModal2 === false) {
      addModalForm();
      getModalBack();
    }

    isModal2 = true;
  });
}

redirectAddModal();

// Supprime la classe "display-modal", et ainsi fait disparaitre la modal / lors d'un clic hors modale
function getModalHide() {
  const btnClose = document.querySelector(".btn-close");
  const modalWrapper = document.querySelector(".modal-wrapper");

  modalWrapper.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  asideModal.addEventListener("click", (e) => {
    // Suprime la classe ".display-modal" SI la modal est affiché et ainsi cache la modal.

    asideModal.classList.remove("display-modal");
  });

  btnClose.addEventListener("click", function (ev) {
    asideModal.classList.remove("display-modal");
    isModal2 = false;
  });
}

getModalHide();

// Permet de revenir sur la modal 1

async function getModalBack() {
  const btnBack = document.querySelector(".btn-back");
  const h2FirstModal = document.querySelector(".modal1-h2");
  const editWork = document.querySelector("section .edit-work");
  const btnRedirectAdd = document.querySelector(".modal-input");
  const viewTwo = document.querySelectorAll(".modal2");

  if (isModal2 === false) {
    btnBack.addEventListener("click", function (e) {
      viewOne.forEach((element) => {
        element.classList.remove("hidden");
      });

      viewTwo.forEach((element) => {
        element.classList.add("hidden");
      });

      btnBack.classList.add("hidden");
      isModal1 = true;
      isModal2 = false;
    });
  }
}

// Suprime un traveau

async function deleteWorks() {
  console.log(isModal1);

  await viewEditWork();

  const iconeAllWorks = document.querySelectorAll(".ico-editwork");
  const token = window.localStorage.getItem("token");

  iconeAllWorks.forEach((work) => {
    work.addEventListener("click", (e) => {
      const id = work.id;
      const init = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      fetch(`${apiUrl}/works/${id}`, init);
    });
  });
}

deleteWorks();

// Ajout de nouveau Travaux

// import variables @ config.js
import { apiUrl, addModalForm, viewOne } from "./config.js";

// Variables globales
const editWorkSection = document.querySelector(".edit-work");
const asideModal = document.getElementById("modal-aside");
const editWork = document.querySelector("section .edit-work");
const h2FirstModal = document.getElementById("modal1-h2");
const btnBack = document.querySelector(".modal-arrow");

let isModal1 = false;
let isModal2 = false;
let xModal2 = false;

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

function toggleModals(showViewOne, showViewTwo) {
  const viewOne = document.querySelectorAll(".modal1");
  const viewTwo = document.querySelectorAll(".modal2");
  const btnBack = document.querySelector(".modal-arrow");

  viewOne.forEach((element) => {
    if (showViewOne) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  });

  viewTwo.forEach((element) => {
    if (!element.classList.contains("modal-arrow")) {
      if (showViewTwo) {
        element.classList.remove("hidden");
      } else {
        element.classList.add("hidden");
      }
    }
  });

  if (btnBack) {
    btnBack.classList.toggle("hidden", !showViewTwo);
  }
}

async function getModalBack() {
  const btnBack = document.querySelector(".modal-arrow");

  if (btnBack) {
    btnBack.addEventListener("click", function () {
      toggleModals(true, false);
    });
  } 
}

function redirectAddModal() {
  const btnRedirectAdd = document.querySelector(".modal-input");
  const h2FirstModal = document.getElementById("modal1-h2");
  const editWork = document.querySelector("section .edit-work");
  const btnBack = document.querySelector(".modal-arrow");


  if (btnRedirectAdd) {
    btnRedirectAdd.addEventListener("click", () => {
      btnRedirectAdd.classList.add("hidden");
      h2FirstModal.classList.add("hidden");
      editWork.classList.add("hidden");

      if (!xModal2) {
        addModalForm();
        xModal2 = true;
      }

      toggleModals(false, true);
    });
  } 
}

getModalBack();


// Crée un Observer, afin d'initialisé des fonctions quand la modal2 est présente. 
const observer = new MutationObserver((mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      const newModals = Array.from(mutation.addedNodes).filter(
        (node) => node.classList && node.classList.contains("modal2")
      );
      if (newModals.length > 0) {
        redirectAddModal();
        viewImgSub();
        checkSubmit()
        
        observer.disconnect();
        break;
      }
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });


// Supression de travaux

async function deleteWorks() {
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

// Ajout de travaux
// Affiche l'image (File), envoyer par l'input,  dans <img>
async function viewImgSub() {
  const imgSub = document.querySelector(".div-modal2 img");
  const iconeModal2 = document.querySelector(".div-modal2 i");
  const inputFile = document.querySelector(".div-modal2 input");
  const infoForm = document.querySelector(".div-modal2 p");
  const modalBtn = document.querySelector(".div-modal2 label");

  inputFile.addEventListener("change", () => {
    const file = inputFile.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imgSub.src = e.target.result;
        iconeModal2.classList.add("hidden");
        inputFile.classList.add("hidden");
        modalBtn.classList.add("hidden");
        infoForm.classList.add("hidden");
      
        imgSub.classList.remove("hidden");
       
      };
      reader.readAsDataURL(file);
      
  
    }
  
  });
}

//async function checkSubmit(){
//  const subCategorie = document.getElementById('title')
//  const subTitle = document.getElementById('title')
//  const errorSubmit2 = document.getElementById("error-message2");
//  const checkBtn =document.querySelector('.valider-btn')
//
// 
//
//  checkBtn.addEventListener("click", (event)=>{
//
//    event.preventDefault()
//  
//  if(subTitle.value !== ""){
//    return true
//  } else {
//    errorSubmit2.classList.remove('hidden')
//   
//  }
//
//if (subCategorie.value !== 0){
//  return true
//  } else {
//    errorSubmit2.classList.remove('hidden')
//    return false
//  }
//
// 
//})
//
//let formData = new FormData();
//formData.append('categorie.id', subCategorie.id, 'category.name' , subCatégorie.value)
//formData.append('imageUrl', imgSub.src)
//formData.append('title', subTitle.value)
//    if()
//}
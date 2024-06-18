// correspond à la page de connexion
// import variables @ config.js
import { apiUrl } from "./config.js";
//// Variables globales
const form = document.getElementById("form");
let submitEmail = document.getElementById("email");
let submitPassword = document.getElementById("password");
const errorSubmit = document.getElementById("error-message");

const headerBorder = document.getElementById("#header-border");

function checkEmail(submitEmail) {
  const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");

  if (emailRegExp.test(submitEmail.value)) {
    return true;
  } else {
    errorSubmit.classList.add("display-message");
    return false;
  }
}

function checkPassword(submitPassword) {
  const passwordRegExp = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{6,}$");

  if (passwordRegExp.test(submitPassword.value)) {
    return true;
  } else {
    errorSubmit.classList.add("display-message");
    return false;
  }
}

// fonction hide border

// fonction display border

const btnEdit = document.getElementsByClassName(".btn-edit");

async function loginSucces() {
  const adminAcess = await fetch(`${apiUrl}/users/login`, {
    method: "POST", // Méthode de la requête
    headers: {
      "Content-Type": "application/json",
    },
    // Converti les data au format JSON
    body: JSON.stringify({
      email: submitEmail.value,
      password: submitPassword.value,
    }),
  });

  // Recuperation  de la reponse POST
  const response = await adminAcess.json();

  // test si la valeur du POST est "OK" ( donc aucune erreur)
  if (adminAcess.ok) {
    // conserve les données( valeurs ) lié au token et userId
    // contenu dans la réponse Post, à l'interieur de l'espace Local
    window.localStorage.setItem("userId", response.userId);
    window.localStorage.setItem("token", response.token);
    // Fonction permetant de redirigé vers la page " homepage_edit", avec un delai de 1000 ms .
    setTimeout(() => {
      document.location.href = "http://127.0.0.1:5500/FrontEnd/index.html";
    }, 500);
    // fonction hide filter
  }
}

form.addEventListener("submit", (event) => {
  // Empêche le comportement par défaut du submit
  event.preventDefault();
  // Ajoute 2 constantes = emailTrue / passwordTrue
  const emailTrue = checkEmail(submitEmail);
  const passwordTrue = checkPassword(submitPassword);
  // Crée un test demandant si les 2 variables sont égales à true
  // (en type et en genre)
  if (emailTrue === true && passwordTrue === true) {
    loginSucces();
  }
});

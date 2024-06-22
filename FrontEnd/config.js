export const apiUrl = "http://localhost:5678/api";
export const viewOne = document.querySelectorAll(".modal1");

export async function addModalForm() {
    const modalForm = document.querySelector("#modal-aside form");
    // Variable Binaire Permet de testé le code / Evite la multiplication de la view2

    
   
    const contentModal2 = `

        
        <h2 class="modal-h2 modal2" id="modal2-h2">Ajout Photo</h2>
        <div class="div-modal2 modal2 ">
            <!-- img pour Prévisualisation -->
            <img class="hidden" src="" alt="prévisualisation de l'image sélectioner"/>
            <i class="fa-regular fa-image form2-img"></i>
            <!-- Champs img -->
            <label class="modal-btn" for="input-file">+ Ajouté photo</label>
            <input id="input-file" type="file" value="img-upload">
            <p>jpg, png : 4mo max</p>
        </div>

        <div class="section-form modal2">
            <div id="modal-form">
                <!-- Message d'Erreur-->
                <p id= "error-message2" class = "hidden" > Erreur présente dans l'un des champs : titre, catégorie ou image manquante.</p>
                <!-- Champ Text -->
                <label for="titre">Titre</label>
                <input type="text" name="Titre" id="titre" />
                
                <!-- Champ Catégorie -->
                <label for="categorie">Catégorie</label>
                <select name="catégorie" id="categorie">
                <option value=""></option>
                <option id="1" value="Objets">Objets</option>
                <option id="2" value="Appartements">Appartements</option>
                <option id="3" value="Hotels & restaurants">Hotels & restaurants</option>
                </select>
            </div>
        </div>
       
        <input type="submit" class="modal-btn valider-btn  modal2 " value="Valider">

    `;

  // Ajoutez le contenu HTML à l'élément modalForm

  modalForm.insertAdjacentHTML("beforeend", contentModal2);
 
}

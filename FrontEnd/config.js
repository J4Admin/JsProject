export const apiUrl = "http://localhost:5678/api";
export const viewOne = document.querySelectorAll(".modal1");

export async function addModalForm() {
  const modalForm = document.querySelector("#modal-aside form");

  const contentModal2 = `

        
        <h2 class="modal-h2 modal2" id="modal2-h2">Ajout Photo</h2>
        <div class="div-modal2 modal2 ">
            <i class="fa-regular fa-image form2-img"></i>
            <label class="modal-btn" for="input-file">+ Ajouté photo</label>
            <input id="input-file" type="file" value="img-upload">
            <p>jpg, png : 4mo max</p>
        </div>

        <div class="section-form modal2">
            <div id="modal-form">
                <!-- Champ Text -->
                <label for="titre">Titre</label>
                <input type="text" name="Titre" id="titre" />
                
                <!-- Champ Catégorie -->
                <label for="catégorie">Catégorie</label>
                <select name="catégorie" id="categorie">
                <option value=""></option>
                <option value="Objets">Objets</option>
                <option value="Appartement">Appartement</option>
                <option value="Hotel & restaurant">Hotel & Restaurant</option>
                </select>
            </div>
        </div>
        <input type="submit" class="modal-btn valider-btn  modal2 " value="Valider">

    `;

  // Ajoutez le contenu HTML à l'élément modalForm
  modalForm.insertAdjacentHTML("beforeend", contentModal2);
}

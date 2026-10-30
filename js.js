const formulaire = document.querySelector("form");
const titre = document.querySelector("#titre");
const auteur = document.querySelector("#author");
const genre = document.querySelector("#genre");
const annee = document.querySelector("#year");
const description = document.querySelector("#description");
let livres = JSON.parse(localStorage.getItem("livres")) || [];
const bookList = document.getElementById("booksList")
const recherche = document.querySelector("#recherche")
const tri = document.querySelector("#tri")



if (formulaire){
formulaire.addEventListener("submit", function(event){
event.preventDefault();
const titreSaisi = titre.value;
const auteurSaisi = auteur.value;
const genreSaisi = genre.value;
const anneeSaisi = annee.value;
const descriptionSaisi = description.value;
if (titreSaisi.trim() === "" || auteurSaisi.trim() === ""){
    alert("Le titre et l'auteur sont obligatoires !")
    return
}
const livre = {
titre : titreSaisi.trim(),
auteur : auteurSaisi.trim(),
genre : genreSaisi.trim(),
annee : anneeSaisi.trim(),
description : descriptionSaisi.trim()
}
livres.push(livre)
localStorage.setItem("livres", JSON.stringify(livres));
afficherLivres();
formulaire.reset();
})
}
function afficherLivres(listeLivres = livres){
    if(bookList){
    bookList.innerHTML ="";
    listeLivres.forEach(function (livre){
        bookList.innerHTML += `
        <tr>
        <td>${livre.titre}</td>
        <td>${livre.auteur}</td>
        <td>${livre.genre}</td>
        <td>${livre.annee}</td>
        <td>${livre.description}</td>
        <td>
        <button id="btn1">modifier</button>
        <button id="btn2">supprimer</button>
        </tr>
        `;
    })
}
}
afficherLivres();
if (recherche){
    recherche.addEventListener("input", function (){
        const rechercheSaisie = recherche.value.toLowerCase().trim()
        const resultats = livres.filter(function(livre){
            return livre.titre.toLowerCase().includes(rechercheSaisie) || livre.auteur.toLowerCase().includes(rechercheSaisie)
        })
        afficherLivres(resultats)
    })
}
if (tri) {
  tri.addEventListener("change", function () {
    const valeurTri = tri.value;
    const livresTries = [...livres];
    livresTries.sort(function (a, b) {
      if (valeurTri === "titre") {
        return a.titre.localeCompare(b.titre);
      }
      if (valeurTri === "auteur") {
        return a.auteur.localeCompare(b.auteur);
      }
      if (valeurTri === "annee") {
        return Number(a.annee) - Number(b.annee);
      }
    });

    afficherLivres(livresTries);
  });
}

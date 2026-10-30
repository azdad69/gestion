const formulaire = document.querySelector("form");
const titre = document.querySelector("#titre");
const auteur = document.querySelector("#author");
const genre = document.querySelector("#genre");
const annee = document.querySelector("#year");
const description = document.querySelector("#description");
const bookList = document.querySelector("#booksList")
let livres = JSON.parse(localStorage.getItem("livres")) || [];

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
})
}
function afficherLivres(){
    if(bookList){
    bookList.innerHTML ="";
    livres.forEach(function (livre){
        bookList.innerHTML += `
        <h3>${livre.titre}</h3>
        <p>${livre.auteur}</p>
        `;
    })
}
}
afficherLivres();
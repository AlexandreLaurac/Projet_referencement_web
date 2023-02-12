//--------------------------------------------------------------- Elements HTML ---------------------------------------------------------------//

// Menu de navigation
var menuNav = document.getElementById("div_menu_nav");

// Elements de la page de connexion et d'espace personnel
var divConnex = document.getElementById('connexion');
var divInfosPerso = document.getElementById('infos_perso');
var formConnex = document.getElementById('form_connexion');
var identifiant = document.getElementById('identifiant');
var motDePasse = document.getElementById('mot_de_passe');

// Tableau des animaux du parc zoologique
var tableauHTML = document.getElementById('tableau');

// Eléments du formulaire d'ajout et de modification des animaux
var contFormAnim = document.getElementById('conteneur_form_ajout_anim');
var formAnim = document.getElementById('form_ajout_anim');
var titreForm = document.getElementById('titre_form_ajout_anim');
var nomForm = document.getElementById('nom_form');
var imageForm = document.getElementById('image_form');
var descrForm = document.getElementById('descr_form');
var paysForm = document.getElementById('pays_form');
var boutonForm = document.getElementById('bouton_form_anim');


//------------------------------------------------------------- Création du menu -------------------------------------------------------------//

//// 1. Structure des données
//// Menu modifié par rapport aux TP précédents : pas de sous-menus car les pages créées (avec formulaire ou informations personnelles) les remplacent 

var menuJSON =
    `{
        "name":"nav",
        "children":
            [
                {
                    "name":"ul",
                    "children":
                        [
                            {
                                "name":"li",
                                "children":
                                    [
                                        {
                                            "name":"a",
                                            "id":"lien_1",
                                            "class":"lien_menu",
                                            "href":"#!Zoo",
                                            "onclick":"affichagePage(1)",
                                            "content":"Zoo"
                                        }
                                    ]
                            },
                            {
                                "name":"li",
                                "children":
                                    [
                                        {
                                            "name":"a",
                                            "id":"lien_2",
                                            "class":"lien_menu",
                                            "href":"#!Insectes",
                                            "onclick":"affichagePage(2)",
                                            "content":"Découvrez nos Insectes"
                                        }
                                    ]
                            },
                            {
                                "name":"li",
                                "children":
                                    [
                                        {
                                            "name":"a",
                                            "id":"lien_3",
                                            "class":"lien_menu",
                                            "href":"#!Partenariat",
                                            "onclick":"affichagePage(3)",
                                            "content":"Communauté de l’abeille"
                                        }
                                    ]
                            },
                            {
                                "name":"li",
                                "children":
                                    [
                                        {
                                            "name":"a",
                                            "id":"lien_4",
                                            "class":"lien_menu",
                                            "href":"#!Pôle_recherche",
                                            "onclick":"affichagePage(4)",
                                            "content":"Laboratoire de l’Insectarium"
                                        }
                                    ]
                            },
                            {
                                "name":"li",
                                "children":
                                    [
                                        {
                                            "name":"a",
                                            "id":"lien_5",
                                            "class":"lien_menu",
                                            "href":"#!Contact_&_prestations",
                                            "onclick":"affichagePage(5)",
                                            "content":"Prestations et contact"
                                        }
                                    ]
                            }
                        ]
                    
                }
            ]
    }` ;

var menuObj = JSON.parse(menuJSON);


//// 2. Création effective

// Fonction de création du menu de navigation à partir de l'objet obtenu par analyse de la chaine json précédente
function creationMenu(objet) {

    // Création de l'élément à partir de l'attribut 'name'
    var element = document.createElement(objet.name);

    // Ajout d'un id, s'il est défini
    if (objet.id !== undefined) {
        element.id = objet.id;
    }

    // Ajout d'une classe, si elle est définie
    if (objet.class !== undefined) {
        element.className = objet.class;
    }

    // Ajout d'une href, s'il y en a une
    if (objet.href !== undefined) {
        element.href = objet.href;
    }

    // Ajout d'une callback associé au clic sur l'élément, si elle est fournie
    if (objet.onclick !== undefined) {
        var fonctionElement = function () { return Function(objet.onclick) };  // objet.onclick est une chaine de caractère, alors que element.onclick attend une fonction

        element.onclick = fonctionElement();
    }

    // Ajout de contenu, s'il y en a un
    if (objet.content !== undefined) {
        element.textContent = objet.content;
    }

    // Ajout des enfants, si l'élément courant en a
    if (objet.children !== undefined) {
        objet.children.forEach(child => element.appendChild(creationMenu(child)));
    }

    return element;
}

var nav = creationMenu(menuObj);
menuNav.appendChild(nav);


//-------------------------------------------------- Page d'espace personnel ---------------------------------------------------//

var utilisateur = 'visiteur';

// Fonction choisissant le contenu de la page
function contenuPagePerso() {

    divConnex.style.display = 'none';
    divInfosPerso.style.display = 'none';

    // Gestion du cas 'visiteur' (la personne surfant sur la page ne s'est pas connectée, on lui propose un formulaire de connexion)
    if (utilisateur == 'visiteur') {
        divConnex.style.display = 'block';
    }

    // Gestion du cas 'user' ou 'admin' (le visiteur s'est connecté selon l'un de ces deux login, on affiche ses informations personnelles)
    else if (utilisateur == 'user' || utilisateur == 'admin') {
        divInfosPerso.style.display = 'flex';
    }
}

// Fonction générique de requête AJAX
function ajaxPostRequest(callback, url, async, data) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, async);
    xhr.addEventListener("load", callback);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(data);
}

// Fonction callback associée à la soumission du formulaire de connexion
function soumFormConnex(event) {

    // Empêcher la page de se recharger
    event.preventDefault();

    // Récupération du contenu des inputs du formulaire
    var login = identifiant.value;
    var password = motDePasse.value;

    // Requête Ajax pour la connexion
    var url = "http://localhost:8080/connexion.php";
    var donnees = "login=" + login + "&password=" + password;
    ajaxPostRequest(reponseConnex, url, true, donnees);
}

//formConnex.onsubmit = soumFormConnex;

// Fonction callback déclenchée à la réponse du serveur suite à la requête Ajax de soumission du formulaire
function reponseConnex() {

    // Analyse de la chaine Json reçue
    var reponse = JSON.parse(this.responseText);

    // Identifiant et mot de passe corrects
    if (reponse.resultat == 'success') {

        // Message de réussite à l'utilisateur
        alert("Vous êtes maintenant connecté(e) au site");

        // Récupération du login
        utilisateur = identifiant.value;

        // Réinitialisation des inputs
        identifiant.value = "";
        motDePasse.value = "";

        // Affichage des informations personnelles
        divInfosPerso.innerHTML =
            '<h2> Informations personnelles </h2>' +
            '<ul>' +
            '<li> Nom : ' + reponse.nom + ', prénom : ' + reponse.prenom + '</li>' +
            '<li> Numéro de téléphone : ' + reponse.tel + '</li>' +
            '<li> Email : ' + reponse.email + '</li>' +
            '</ul>';
        contenuPagePerso();

        // Mise à jour du contenu du tableau HTML et affichage ou non du formulaire de modification associé
        affichageCompletTableauHTML();
        affichageFormGestTableauHTML();
    }

    // Identifiant et mot de passe incorrects
    else if (reponse.resultat == 'failure') {
        alert("Mauvais identifiant ou mot de passe");
    }
}

// Création effective
//contenuPagePerso();


//----------------------------------------------------------- Affichage des "pages" -----------------------------------------------------------//

// Fonction permettant l'affichage des différentes "pages" du site (précédemment de véritables pages, maintenant des div affichés quand les autres sont masqués)
function affichagePage(i) { // i est le numéro de la "page" à afficher

    //// 1. Mise en évidence de la "page" active dans le menu de navigation (changement de couleur du lien correspondant) 

    // Classe de tous les liens du menu remise à la seule valeur 'lien_menu'
    var liens = document.querySelectorAll('.lien_menu');
    liens.forEach(lien => lien.className = 'lien_menu');

    // Ajout de la classe "actif" au lien courant
    var lienCourant = document.getElementById('lien_' + i);
    lienCourant.className += " actif";  // garder l'espace


    //// 2. Affichage de la page correspondant au numéro fourni

    // Récupération des éléments blocs de la page
    var blocs = document.querySelectorAll(".blocs");

    // Blocs cachés
    blocs.forEach(element => element.style.display = 'none');

    // Bloc dont l'id contient le numéro fourni en argument de nouveau affiché
    var id = "bloc_" + i;
    var blocAAfficher = document.getElementById(id);
    blocAAfficher.style.display = "block";

    history.pushState('', '', menuObj.children[0].children[i - 1].children[0].href);
}

// Affichage de la "page" d'accueil lors de l'ouverture du fichier HTML
affichagePage(1);


//------------------------------------------------------------- Gestion du tableau --------------------------------------------------------//

//// 1. Structure des données, requêtes AJAX et fonctions callback associées pour leur lecture et leur écriture

// Constructeur de la classe Animal
function Animal(nom, image, description, pays) {
    this.nom = nom;
    this.image = image;
    this.description = description;
    this.pays = pays;
}

var tableauAnimaux = [];

// Fonction callback associée à la requête d'obtention du fichier source.json contenant les données à afficher dans le tableau HTML
/*function recuperationDonnees() {
    tableauAnimaux = JSON.parse(this.responseText);
    affichageCompletTableauHTML(); // Appel de cette fonction ici, pour attendre d'avoir les données nécessaires à l'affichage du tableau HTML
}

// Fonction d'envoi des données suite à la modification du tableau HTML (ajout, modification ou suppression d'une ligne) pour réécriture du fichier source.json
function ecritureDonnees(tableauAnimaux) {
    var url = "http://localhost:8080/ecriture.php";
    chaineJson = JSON.stringify(tableauAnimaux);
    var data = "data=" + chaineJson;
    ajaxPostRequest(null, url, true, data);
}
*/

//// 2. Remplissage effectif

var nbEltsTableau = 0;

// Fonction ajoutant une ligne au tableau HTML à partir de la donnée d'un objet de type Animal (voir le fichier CSS pour des explications sur l'affichage du tableau en RWD)
function ajoutAnimalTableauHTML(animal) {

    // Incrémentation de la variable "nombre d'éléments du tableau"
    nbEltsTableau++;

    // Couleur de la ligne (la règle CSS n'est pas prise en compte avec la création dynamique du tableau)
    var couleur = ""
    if (nbEltsTableau % 2 == 0) { // numéro de la ligne pair
        couleur = "#e38C3c";
    }
    else { // numéro de la ligne impair
        couleur = "#c06a39";
    }

    // Classe supplémentaire pour ne pas afficher les en-têtes secondaires
    var classeDeuxieme = (nbEltsTableau > 1) ? " deuxieme" : "";

    // Création du contenu HTML de l'élément tableau (avec callback du bouton adaptée à la ligne du tableau)
    var idLigne = "tr_" + nbEltsTableau;
    var idBoutonMod = "btnMod_" + nbEltsTableau;
    var idBoutonSuppr = "btnSup_" + nbEltsTableau;
    var idBoutonDec = "btnDec_" + nbEltsTableau;
    if (utilisateur == 'admin') {
        tableauHTML.innerHTML +=
            '<div class="paire">' +

            '<div class="tete' + classeDeuxieme + '" style="background-color : #84503c">' +
            '<div class="cellule">Nom</div>' +
            '<div class="cellule image">Image</div>' +
            '<div class="cellule">Description</div>' +
            '<div class="cellule">Pays natal</div>' +
            '<div class="cellule">Modifier</div>' +
            '<div class="cellule">Supprimer</div>' +
            '<div class="cellule">Retour</div>' +
            '</div>' +

            '<div id="' + idLigne + '"class="ligne" style="background-color : ' + couleur + '" onmouseover="this.style.background=\'#84503c\'" onmouseout="this.style.background=\'' + couleur + '\'">' +
            '<div class="cellule">' + animal.nom + '</div>' +
            '<div class="cellule image"> <img class="images_tableau" src="' + animal.image + '" alt="Image manquante"> </div>' +
            '<div class="cellule">' + animal.description + '</div>' +
            '<div class="cellule">' + animal.pays + '</div>' +
            '<div class="cellule"> <button id="' + idBoutonMod + "\" onclick=\"modificationAnimalUn('" + idBoutonMod + "')\"> Modifier </button> </div>" +
            '<div class="cellule"> <button id="' + idBoutonSuppr + "\" onclick=\"supprimerAnimalTableaux('" + idBoutonSuppr + "')\"> Supprimer </button> </div>" +
            '<div class="cellule"> <a href="#tableau"> retour vers le haut du tableau</a> </div>' +
            '</div>' +

            '</div>';
    }
    else if (utilisateur == 'user') {
        tableauHTML.innerHTML +=
            '<div class="paire">' +

            '<div class="tete' + classeDeuxieme + '" style="background-color : #84503c">' +
            '<div class="cellule">Nom</div>' +
            '<div class="cellule image">Image</div>' +
            '<div class="cellule">Description</div>' +
            '<div class="cellule">Pays natal</div>' +
            '<div class="cellule">Découvrir</div>' +
            '<div class="cellule">Retour</div>' +
            '</div>' +

            '<div id="' + idLigne + '"class="ligne" style="background-color : ' + couleur + '" onmouseover="this.style.background=\'#84503c\'" onmouseout="this.style.background=\'' + couleur + '\'">' +
            '<div class="cellule">' + animal.nom + '</div>' +
            '<div class="cellule image"> <img class="images_tableau" src="' + animal.image + '" alt="Image manquante"> </div>' +
            '<div class="cellule">' + animal.description + '</div>' +
            '<div class="cellule">' + animal.pays + '</div>' +
            '<div class="cellule"> <button id="' + idBoutonMod + "\" onclick=\"decouverteAnimal('" + idBoutonDec + "')\"> Découvrir </button> </div>" +
            '<div class="cellule"> <a href="#tableau"> retour vers le haut du tableau</a> </div>' +
            '</div>' +

            '</div>';
    }
    else if (utilisateur == 'visiteur') {
        tableauHTML.innerHTML +=
            '<div class="paire">' +

            '<div class="tete' + classeDeuxieme + '" style="background-color : #84503c">' +
            '<div class="cellule">Nom</div>' +
            '<div class="cellule image">Image</div>' +
            '<div class="cellule">Description</div>' +
            '<div class="cellule">Pays natal</div>' +
            '<div class="cellule">Retour</div>' +
            '</div>' +

            '<div id="' + idLigne + '"class="ligne" style="background-color : ' + couleur + '" onmouseover="this.style.background=\'#84503c\'" onmouseout="this.style.background=\'' + couleur + '\'">' +
            '<div class="cellule">' + animal.nom + '</div>' +
            '<div class="cellule image"> <img class="images_tableau" src="' + animal.image + '" alt="Image manquante"> </div>' +
            '<div class="cellule">' + animal.description + '</div>' +
            '<div class="cellule">' + animal.pays + '</div>' +
            '<div class="cellule"> <a href="#tableau"> retour vers le haut du tableau</a> </div>' +
            '</div>' +

            '</div>';
    }
}

let listeInsectes = ["Coccinelle", "Libellule", "Sauterelle", "Scarabée", "Hétérocères"]
let listDesc = ["Les Coccinellidae, en français coccinellidés, sont une famille d'insectes de l'ordre des coléoptères, appelés aussi coccinelles, ou encore familièrement ou régionalement bête à bon Dieu ou pernettes.",
    "Les odonates sont un ordre d'insectes à corps allongé, dotés de deux paires d'ailes membraneuses généralement transparentes, et dont les yeux composés et généralement volumineux leur permettent de chasser efficacement leurs proies.",
    "Sauterelle est un nom vernaculaire ambigu désignant en français non pas un genre, mais plusieurs familles et sous-familles d'insectes orthoptères communs presque partout dans le monde et qui se déplacent en sautant à l'aide de leurs longues pattes postérieures.",
    "Les Scarabéoïdes sont une super-famille d'insectes coléoptères polyphages. C'est la seule de l'infra-ordre des Scarabeiformia. Il existe de nombreuses espèces.",
    "Les hétérocères sont un ancien sous-ordre, aujourd'hui obsolète, de l'ordre des lépidoptères. Il se définit par opposition à l'ancien sous-ordre des rhopalocères."]
let insectes = [];
for (let i = 1; i <= listeInsectes.length; i++) {
    insectes.push(new Animal(listeInsectes[i - 1], 'images/insecte' + i + '.jpg', listDesc[i - 1], ''));
}

let div3 = document.getElementById('tableau');
let table = document.createElement('table');
let tbody = document.createElement('tbody');

insectes.forEach(function (element, index) {
    let tr = document.createElement('tr');
    let td_img = document.createElement('td');
    let td_text = document.createElement('td');


    let titre = document.createElement('h4');
    titre.innerHTML = element.nom;

    let desc = document.createElement('p');
    desc.innerHTML = element.description;

    let img = document.createElement('img');
    img.setAttribute('src', element.image);
    img.setAttribute('alt', "Image d'un insecte type " + element.nom);

    td_img.appendChild(img);
    td_text.appendChild(titre);
    td_text.appendChild(desc);

    tr.appendChild(td_img);
    tr.appendChild(td_text);

    tbody.appendChild(tr);
    table.appendChild(tbody);
    div3.appendChild(table);
});


// Fonction réalisant l'affichage d'un tableau complet à partir du tableau JS des animaux 'tableauAnimaux' et de la fonction précédente
function affichageCompletTableauHTML() {

    nbEltsTableau = 0;

    // Ligne d'en-tête du tableau
    tableauHTML.innerHTML = '';


    // Lignes du tableau contenant les animaux
    tableauAnimaux.forEach(animal => ajoutAnimalTableauHTML(animal));
}

/*
// Requête effective AJAX pour l'obtention des données et l'affichage du tableau HTML
var url = "http://localhost:8080/source.json";
ajaxPostRequest(recuperationDonnees, url, true, null);
*/

//// 3. Affichage ou non du formulaire de gestion du tableau en fonction de l'utilisateur du site
/*
function affichageFormGestTableauHTML() {
    if (utilisateur == 'visiteur' || utilisateur == 'user') {
        contFormAnim.style.display = 'none';
    }
    else if (utilisateur == 'admin') {
        contFormAnim.style.display = 'block';
    }
}

affichageFormGestTableauHTML();
*/

//// 4. Ajout d'un animal à partir du formulaire

/*
// Fonction d'ajout d'un animal associée à l'événement "soumission du formulaire"
function ajoutAnimalFormulaire(event) {

    // Empêcher la page de se recharger
    event.preventDefault();

    // Récupération du contenu des inputs du formulaire
    var nom = nomForm.value.trim();
    var image = imageForm.value.trim();
    var description = descrForm.value.trim();
    var pays = paysForm.value.trim();

    // Création de l'animal correspondant
    var nouvelAnimal = new Animal(nom, image, description, pays);

    // Ajout de l'animal au tableau JS des animaux
    tableauAnimaux.push(nouvelAnimal);

    // Sauvegarde du tableau mis à jour dans le fichier source.json
    ecritureDonnees(tableauAnimaux);

    // Ajout d'une ligne au tableau HTML existant avec l'objet Animal créé
    ajoutAnimalTableauHTML(nouvelAnimal);


    // Suppression du contenu des input
    nomForm.value = "";
    imageForm.value = "";
    descrForm.value = "";
    paysForm.value = "";
}

formAnim.onsubmit = ajoutAnimalFormulaire;
*/

//// 5. Modification d'un animal

// Fonction réalisant la première partie de modification d'un animal : modification du formulaire
function modificationAnimalUn(id) {

    // Récupération de l'animal de la ligne correspondant au bouton cliqué
    var numLigTabHTML = parseInt(id.slice(7, id.length));
    var animalCourant = tableauAnimaux[numLigTabHTML - 1];

    // Modification du formulaire : titre revu, inputs remplis avec les propriétés de l'animal, texte du bouton de soumission modifié
    titreForm.textContent = "Formulaire de modification de l'animal \"" + animalCourant.nom + "\"";
    nomForm.value = animalCourant.nom;
    imageForm.value = animalCourant.image;
    descrForm.value = animalCourant.description;
    paysForm.value = animalCourant.pays;
    boutonForm.value = "Modifier";

    // Déplacement dans la page vers le dernier élément du formulaire
    paysForm.focus()

    // Modification de la callback associée au bouton
    formAnim.onsubmit = event => modificationAnimalDeux(event, id);
}

// Fonction réalisant la deuxième partie de la modification d'un animal : modification des tableaux (HTML et des objets de type "Animal")
function modificationAnimalDeux(event, id) {

    // Empêcher la page de se recharger
    event.preventDefault();

    // Récupération du contenu des inputs du formulaire
    var nom = nomForm.value.trim();
    var image = imageForm.value.trim();
    var description = descrForm.value.trim();
    var pays = paysForm.value.trim();

    // Modification du tableau des animaux
    var numLigTabHTML = parseInt(id.slice(7, id.length));
    var numAnimal = numLigTabHTML - 1;
    tableauAnimaux[numAnimal].nom = nom;
    tableauAnimaux[numAnimal].image = image;
    tableauAnimaux[numAnimal].description = description;
    tableauAnimaux[numAnimal].pays = pays;

    // Sauvegarde du tableau mis à jour dans le fichier source.json
    ecritureDonnees(tableauAnimaux);

    // Modification du tableau HTML
    var ligne = document.getElementById("tr_" + numLigTabHTML);
    ligne.childNodes[0].textContent = nom;
    ligne.childNodes[1].innerHTML = '<img src="' + image + '" alt=\"Image manquante\">';
    ligne.childNodes[2].innerHTML = '<i> ' + description + ' </i>';
    ligne.childNodes[3].textContent = pays;

    // Retour à l'état initial
    modificationAnimalTrois(id);
}

// Fonction réalisant la troisième partie de la modification d'un animal : retour au formulaire initial
function modificationAnimalTrois(id) {

    // Modification du titre
    titreForm.textContent = "Formulaire d'ajout d'un animal";

    // Suppression du contenu des input
    nomForm.value = "";
    imageForm.value = "";
    descrForm.value = "";
    paysForm.value = "";

    // Modification du bouton de soumission
    boutonForm.value = "Envoyer";

    // Modification de la callback associée à l'envoi du formulaire
    formAnim.onsubmit = ajoutAnimalFormulaire;
}


//// 6. Suppression d'un animal du tableau

function supprimerAnimalTableaux(id) {

    // On revient au formulaire d'origine, au cas où on aurait commencé à modifier un animal sans aller jusqu'au bout
    // (clic sur le bouton modifier de la ligne du tableau, absence de soumission du formulaire, puis clic sur le bouton supprimer)
    modificationAnimalTrois(id);

    // Suppression de l'animal dans le tableau d'objets Javascript
    var numLigTabHTML = parseInt(id.slice(7, id.length));
    var indiceAnimal = numLigTabHTML - 1;
    tableauAnimaux.splice(indiceAnimal, 1);

    // Sauvegarde du tableau mis à jour dans le fichier source.json
    ecritureDonnees(tableauAnimaux);

    // Nouvel affichage du tableau HTML à partir du nouveau tableau JS
    affichageCompletTableauHTML();
}


//// 7. "Découverte" d'un animal (zoom de l'élément choisi)

function decouverteAnimal(id) {

    // Remise à la valeur initiale de la classe des images
    var imagesTableau = document.querySelectorAll('.images_tableau');
    imagesTableau.forEach(image => image.className = 'images_tableau');

    // Modification du tableau des animaux
    var numLigTabHTML = parseInt(id.slice(7, id.length));

    // Récupération de l'image
    var ligne = document.getElementById("tr_" + numLigTabHTML);
    var image = ligne.childNodes[1].childNodes[1];
    console.log(image);

    // Ajout de la classe zoom à l'image sélectionnée
    image.className += ' zoom';
}

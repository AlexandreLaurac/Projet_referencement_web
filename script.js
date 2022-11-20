//--------------------------------------------------------------- Elements HTML ---------------------------------------------------------------//

// Menu de navigation
var divMenuNav = document.getElementById("div_menu_nav") ;

// Tableau des animaux du parc zoologique
var tableauHTML = document.getElementById('tableau') ;

// Formulaire d'ajout et de modification des animaux
var formulaire = document.getElementById('form_ajout_anim') ;
var titreForm = document.getElementById('titre_form') ;
var nomForm = document.getElementById('nom_form') ;
var imageForm = document.getElementById('image_form') ;
var descrForm = document.getElementById('descr_form') ;
var paysForm = document.getElementById('pays_form') ;
var boutonForm = document.getElementById('bouton_form_anim') ;


//------------------------------------------------------------- Affichage du menu -------------------------------------------------------------//

//// 1. Structure des données

var menuJSON =
    `{
        "name":"nav",
        "class":"premier_niveau",
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
                                            "href":"#",
                                            "onclick":"affichagePage(1)",
                                            "content":"Accueil"
                                        }
                                    ]
                            },
                            {
                                "name":"li",
                                "children":
                                    [
                                        {
                                            "name":"nav",
                                            "class":"deuxieme_niveau",
                                            "children":
                                                [
                                                    {
                                                        "name":"a",
                                                        "id":"lien_2",
                                                        "class":"lien_menu",
                                                        "href":"#",
                                                        "onclick":"affichagePage(2)",
                                                        "content":"Espace personnel"
                                                    },
                                                    {
                                                        "name":"ul",
                                                        "children":
                                                            [
                                                                {
                                                                    "name":"li",
                                                                    "content":"Connexion"
                                                                },
                                                                {
                                                                    "name":"li",
                                                                    "class":"troisieme_niveau",
                                                                    "content":"Mes informations",
                                                                    "children":
                                                                        [
                                                                            {
                                                                                "name":"ul",
                                                                                "children":
                                                                                    [
                                                                                        {
                                                                                            "name":"li",
                                                                                            "content":"Nom et prénom"
                                                                                        },
                                                                                        {
                                                                                            "name":"li",
                                                                                            "content":"Numéro de téléphone"
                                                                                        },
                                                                                        {   "name":"li",
                                                                                            "content":"Email"
                                                                                        }
                                                                                    ]
                                                                            }
                                                                        ]
                                                                },
                                                                {
                                                                    "name":"li",
                                                                    "content":"Messagerie"
                                                                },
                                                                {
                                                                    "name":"li",
                                                                    "content":"Historique"
                                                                }
                                                            ]
                                                    }
                                                ]
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
                                            "href":"#",
                                            "onclick":"affichagePage(3)",
                                            "content":"Animaux"
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
                                            "href":"#",
                                            "onclick":"affichagePage(4)",
                                            "content":"Visite virtuelle audio"
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
                                            "href":"#",
                                            "onclick":"affichagePage(5)",
                                            "content":"Visite virtuelle vidéo"
                                        }
                                    ]
                            },
                            {
                                "name":"li",
                                "children":
                                    [
                                        {
                                            "name":"a",
                                            "id":"lien_6",
                                            "class":"lien_menu",
                                            "href":"#",
                                            "onclick":"affichagePage(6)",
                                            "content":"Contact"
                                        }
                                    ]
                            }
                        ]

                }
            ]
    }` ;

var menuObj = JSON.parse(menuJSON) ;


//// 2. Création effective

// Fonction de création du menu de navigation à partir de l'objet obtenu par analyse de la chaine json précédente
function creationMenu (objet) {

    // Création de l'élément à partir de l'attribut 'name'
    var element = document.createElement(objet.name) ;

    // Ajout d'un id, s'il est défini
    if (objet.id !== undefined) {
        element.id = objet.id ;
    }

    // Ajout d'une classe, si elle est définie
    if (objet.class !== undefined) {
        element.className = objet.class ;
    }

    // Ajout d'une href, s'il y en a une
    if (objet.href !== undefined) {
        element.href = objet.href ;
    }

    // Ajout d'une callback associé au clic sur l'élément, si elle est fournie
    if (objet.onclick !== undefined) {
        var fonctionElement = function() { return Function(objet.onclick) } ;  // objet.onclick est une chaine de caractère, alors que element.onclick attend une fonction
        element.onclick = fonctionElement() ;
    }

    // Ajout de contenu, s'il y en a un
    if (objet.content !== undefined) {
        element.textContent = objet.content ;
    }

    // Ajout des enfants, si l'élément courant en a
    if (objet.children !== undefined) {
        objet.children.forEach ( child => element.appendChild(creationMenu(child)) ) ;
    }

    return element ;
}

var nav = creationMenu(menuObj) ;
divMenuNav.appendChild(nav) ;


//----------------------------------------------------------- Affichage des "pages" -----------------------------------------------------------//

// Fonction permettant l'affichage des différentes "pages" du site (précédemment de véritables pages, maintenant des div affichés quand les autres sont masqués)
function affichagePage (i) { // i est le numéro de la "page" à afficher

    //// 1. Mise en évidence de la "page" active dans le menu de navigation (changement de couleur du lien correspondant)

    // Classe de tous les liens du menu remise à la seule valeur 'lien_menu'
    var liens = document.querySelectorAll('.lien_menu') ;
    liens.forEach (lien => lien.className = 'lien_menu') ;

    // Ajout de la classe "actif" au lien courant
    var lienCourant = document.getElementById('lien_'+i) ;
    lienCourant.className += " actif" ;  // garder l'espace


    //// 2. Affichage de la page correspondant au numéro fourni

    // Récupération des éléments blocs de la page
    var blocs = document.querySelectorAll(".blocs") ;

    // Blocs cachés
    blocs.forEach (element => element.style.display = 'none') ;

    // Bloc dont l'id contient le numéro fourni en argument de nouveau affiché
    var id = "bloc_" + i ;
    var blocAAfficher = document.getElementById(id) ;
    blocAAfficher.style.display = "block" ;
}

// Affichage de la "page" d'accueil lors de l'ouverture du fichier HTML
affichagePage(1) ;


//------------------------------------------------------------- Gestion du tableau --------------------------------------------------------//

//// 1. Structure des données

// Constructeur de la classe Animal
function Animal (nom, image, description, pays) {
    this.nom = nom ;
    this.image = image ;
    this.description = description ;
    this.pays = pays ;
}

var tableauJson =
    `[
        {
            "nom":"Lion d'Afrique",
            "image":"images/lion.jpg",
            "description":"Panthera leo",
            "pays":"Ethiopie, Tanzanie, Botswana, Afrique du Sud, etc."
        },
        {
            "nom":"Elephant d'Afrique",
            "image":"images/elephant.jpg",
            "description":"Loxodonta africana",
            "pays":"Kenya, Namibie, Mozambique, Ouganda, etc."
        },
        {
            "nom":"Buffle d'Afrique",
            "image":"images/buffle.jpg",
            "description":"Syncerus caffer",
            "pays":"Côte d'Ivoire, Cameroun, Gabon, Congo, etc."
        },
        {
            "nom":"Léopard d'Afrique",
            "image":"images/leopard.jpg",
            "description":"Panthera pardus",
            "pays":"Angola, Zambie, Zimbabwe, Centrafrique, etc."
        },
        {
            "nom":"Rhinocéros noir",
            "image":"images/rhinoceros.jpg",
            "description":"Diceros bicornis",
            "pays":"Afrique du Sud, Namibie, Zimbabwe, Kenya, etc."
        }
    ]` ;


var tableauAnimaux = JSON.parse(tableauJson) ;


//// 2. Remplissage effectif

var nbEltsTableau = 0 ;

// Fonction ajoutant une ligne au tableau HTML à partir de la donnée d'un objet de type Animal
function ajoutAnimalTableauHTML (animal) {

    // Incrémentation de la variable "nombre d'éléments du tableau"
    nbEltsTableau++ ;

    // Couleur de la ligne (la règle CSS n'est pas prise en compte avec la création dynamique du tableau)
    var couleur = ""
    if (nbEltsTableau % 2 == 0) { // numéro de la ligne pair
        couleur = "#e38C3c" ;
    }
    else { // numéro de la ligne impair
        couleur = "#c06a39" ;
    }

    // Création du contenu HTML de l'élément tableau (avec callback du bouton adaptée à la ligne du tableau)
    var idLigne = "tr_" + nbEltsTableau ;
    var idBoutonMod = "btnMod_" + nbEltsTableau ;
    var idBoutonSuppr = "btnSup_" + nbEltsTableau ;
    tableauHTML.innerHTML +=
        '<tr id="' + idLigne + '" style="background-color : ' + couleur + '" onmouseover="this.style.background=\'#84503c\'" onmouseout="this.style.background=\'' + couleur + '\'">' +
            '<td>' + animal.nom + '</td>' +
            '<td> <img src="' + animal.image + '" alt="Image manquante"> </td>' +
            '<td> <i>' + animal.description + '</i> </td>' +
            '<td>' + animal.pays + '</td>' +
            '<td> <button id="' + idBoutonMod + "\" onclick=\"modificationAnimalUn('" + idBoutonMod + "')\"> Modifier </button> </td>" +  // Ajout d'une callback onclick aux boutons, dépendant du numéro de ligne
            '<td> <button id="' + idBoutonSuppr + "\" onclick=\"supprimerAnimalTableaux('" + idBoutonSuppr + "')\"> Supprimer </button> </td>" +  // Ajout d'une callback onclick aux boutons, dépendant du numéro de ligne
            '<td> <a href="#tableau"> retour vers le haut du tableau</a> </td>' +
        '</tr>' ;
}

// Fonction réalisant l'affichage d'un tableau complet à partir du tableau JS des animaux 'tableauAnimaux' et de la fonction précédente
function affichageCompletTableauHTML() {

    nbEltsTableau = 0 ;

    // Ligne d'en-tête du tableau
    tableauHTML.innerHTML = "" ;
    tableauHTML.innerHTML +=
        `<tr>
            <th> Nom </th>  <th> Image </th>  <th> Description </th>  <th> Pays natal </th>  <th> Modifier </th>  <th> Supprimer </th>  <th> Retour </th>
        </tr>` ;

    // Lignes du tableau contenant les animaux
    tableauAnimaux.forEach (animal => ajoutAnimalTableauHTML(animal)) ;
}

affichageCompletTableauHTML() ;


//// 3. Ajout d'un animal à partir du formulaire

// Fonction d'ajout d'un animal associée à l'événement "soumission du formulaire"
function ajoutAnimalFormulaire(event) {

    // Empêcher la page de se recharger
    event.preventDefault() ;

    // Récupération du contenu des inputs du formulaire
    var nom = nomForm.value.trim() ;
    var image = imageForm.value.trim() ;
    var description = descrForm.value.trim() ;
    var pays = paysForm.value.trim() ;

    // Création de l'animal correspondant
    var nouvelAnimal = new Animal (nom, image, description, pays) ;

    // Ajout de l'animal au tableau JS des animaux
    tableauAnimaux.push(nouvelAnimal) ;

    // Ajout d'une ligne au tableau HTML existant avec l'objet Animal créé
    ajoutAnimalTableauHTML(nouvelAnimal) ;

    // Suppression du contenu des input
    nomForm.value = "" ;
    imageForm.value = "" ;
    descrForm.value = "" ;
    paysForm.value = "" ;
}

formulaire.onsubmit = ajoutAnimalFormulaire ;


//// 4. Modification d'un animal

// Fonction réalisant la première partie de modification d'un animal : modification du formulaire
function modificationAnimalUn (id) {

    // Récupération de l'animal de la ligne correspondant au bouton cliqué
    var numLigTabHTML = parseInt (id.slice(7,id.length)) ;
    var animalCourant = tableauAnimaux[numLigTabHTML-1] ;

    // Modification du formulaire : titre revu, inputs remplis avec les propriétés de l'animal, texte du bouton de soumission modifié
    titreForm.textContent = "Formulaire de modification de l'animal \"" + animalCourant.nom + "\"" ;
    nomForm.value = animalCourant.nom ;
    imageForm.value = animalCourant.image ;
    descrForm.value = animalCourant.description ;
    paysForm.value = animalCourant.pays ;
    boutonForm.value = "Modifier" ;

    // Déplacement dans la page vers le dernier élément du formulaire
    paysForm.focus()

    // Modification de la callback associée au bouton
    formulaire.onsubmit = event => modificationAnimalDeux(event, id) ;
}

// Fonction réalisant la deuxième partie de la modification d'un animal : modification des tableaux (HTML et des objets de type "Animal")
function modificationAnimalDeux (event, id) {

    // Empêcher la page de se recharger
    event.preventDefault() ;

    // Récupération du contenu des inputs du formulaire
    var nom = nomForm.value.trim() ;
    var image = imageForm.value.trim() ;
    var description = descrForm.value.trim() ;
    var pays = paysForm.value.trim() ;

    // Modification du tableau des animaux
    var numLigTabHTML = parseInt (id.slice(7,id.length)) ;
    var num_animal = numLigTabHTML - 1 ;
    tableauAnimaux[num_animal].nom = nom ;
    tableauAnimaux[num_animal].image = image ;
    tableauAnimaux[num_animal].description = description ;
    tableauAnimaux[num_animal].pays = pays ;

    // Modification du tableau HTML
    var ligne = document.getElementById("tr_"+numLigTabHTML) ;
    ligne.cells[0].textContent = nom ;
    ligne.cells[1].innerHTML = '<img src="' + image + '" alt=\"Image manquante\">' ;
    ligne.cells[2].innerHTML = '<i> ' + description + ' </i>' ;
    ligne.cells[3].textContent = pays ;

    // Retour à l'état initial
    modificationAnimalTrois(id) ;
}

// Fonction réalisant la troisième partie de la modification d'un animal : retour au formulaire initial
function modificationAnimalTrois (id) {

    // Modification du titre
    titreForm.textContent = "Formulaire d'ajout d'un animal" ;

    // Suppression du contenu des input
    nomForm.value = "" ;
    imageForm.value = "" ;
    descrForm.value = "" ;
    paysForm.value = "" ;

    // Modification du bouton de soumission
    boutonForm.value = "Envoyer" ;

    // Modification de la callback associée à l'envoi du formulaire
    formulaire.onsubmit = ajoutAnimalFormulaire ;
}


//// 5. Suppression d'un animal du tableau

function supprimerAnimalTableaux (id) {

    // On revient au formulaire d'origine, au cas où on aurait commencé à modifier un animal sans aller jusqu'au bout
    // (clic sur le bouton modifier de la ligne du tableau, absence de soumission du formulaire, puis clic sur le bouton supprimer)
    modificationAnimalTrois (id) ;

    // Suppression de l'animal dans le tableau d'objets Javascript
    var numLigTabHTML = parseInt (id.slice(7,id.length)) ;
    var indiceAnimal = numLigTabHTML - 1 ;
    tableauAnimaux.splice(indiceAnimal,1) ;

    // Nouvel affichage du tableau HTML à partir du nouveau tableau JS
    affichageCompletTableauHTML() ;
}

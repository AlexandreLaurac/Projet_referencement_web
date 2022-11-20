<?php

    // Récupération des variables de la Query String
    $login = $_POST['login'] ?? "" ;
    $password = $_POST['password'] ?? "" ;

    // Variables de référence
    $loginUser = "user" ;
    $loginAdmin = "admin" ;
    $passwordCorrect = "ajax" ;

    // Chaines Json à transmettre
    $chaineJsonAdmin = '{ "resultat":"success", "login":"admin", "nom":"Karoui", "prenom":"Aous", "tel":"0601020304", "email":"a.karoui@uga.fr" }' ;
    $chaineJsonUser = '{ "resultat":"success", "login":"user", "nom":"Laurac", "prenom":"Alexandre", "tel":"0605060708", "email":"a.laurac@etu.uga.fr" }' ;
    $chaineJsonEchec = '{ "resultat":"failure" }' ;

    // Comparaison des valeurs reçues aux valeurs de référence et "envoi" des chaines de retour
    if ($login == $loginAdmin && $password == $passwordCorrect) {
        echo $chaineJsonAdmin ;
    }
    else if ($login == $loginUser && $password == $passwordCorrect) {
        echo $chaineJsonUser ;
    }
    else {
        echo $chaineJsonEchec ;
    }

?>

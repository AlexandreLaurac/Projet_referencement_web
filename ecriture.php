<?php

    // Récupération des données reçues
    $chaineJson = $_POST['data'] ?? "" ;

    // Ecriture dans le fichier source.json
    if ($chaineJson !== '') {
        $nomFichier = "source.json" ;
        file_put_contents ($nomFichier, $chaineJson) ;
    }

?>
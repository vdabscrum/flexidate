<?php
//inhoud bevat de nieuwe localStorage
$inhoud = $_POST['inhoud'];
//timestamp, vandaag
$vandaag = $_POST['vandaag'];
//verwijzing naar profielen.json bestand
$file = '../js/profielen.json';
// lees de inhoud van profielen.json
$current = file_get_contents($file);
// backup de inhoud van profielen.json
file_put_contents('../js/backup_'.$vandaag.'.json',$current);
//schrijf de meest recente versie van localStorage naar profielen.json
file_put_contents('../js/profielen.json',$inhoud);
?>
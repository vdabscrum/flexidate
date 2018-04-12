window.onload = function(){

    var aFormElements = document.getElementById('registratiefrm').elements;
    var eForm = document.getElementById('registratiefrm');
    var datumVandaag = new Date();
    var lib = scrumlib.getAllDatasets();

    $('.formulier').click(function(e) {
        e.preventDefault();

        //console.log(test);
        var sWachtwoord = eForm['wachtwoord'].value;  // type=password -> string
        var sWachtwoordctrl = eForm['wachtwoordctrl'].value;  // type=password -> string
        var error = false
        var sEmail = eForm['email'].value;  //type=email (string output)
        var sGebruikersnaam = eForm['nickname'].value; //type=string
        var nGrootte = eForm['grootte'].value;  // type=number
        var nGewicht = eForm['gewicht'].value;  // type=number
        var eGewichtSpan = document.getElementById('gewichtspan');
        var eGrootteSpan = document.getElementById('groottespan');
        var eGebruikersNaam = document.getElementById('gebruikersnaamspan');
        var eMailspan = document.getElementById('mailspan');
        var eWwSpan = document.getElementById('wwspan');
        var eWwCtrlSpan = document.getElementById('wwctrlspan');
        var eDatumSpan = document.getElementById('datumspan');

        for (var i = 0, aFormElement; aFormElement = aFormElements[i++];) {

            var eParent = aFormElement.parentNode;

            if (aFormElement.type === "text" && aFormElement.value === ""){

                e.preventDefault();
                error = true
                //alert("Gelieve alle velden in te vullen.");
                eParent.childNodes[5].style.display = 'inline';
            }
            else{if(aFormElement.type === "text"){eParent.childNodes[5].style.display = 'none';}}

        }

            var sGeboortedatum = eForm['geboortedatum'].value;
            var sGeboorteSplit = sGeboortedatum.split("-");
            var dGeboortedatum = new Date(parseInt(sGeboorteSplit[0]), parseInt(sGeboorteSplit[1]), parseInt(sGeboorteSplit[2]));
            var dJaar = parseInt(datumVandaag.getFullYear()) - 18;
            var dMaand = datumVandaag.getMonth();
            var dDag = datumVandaag.getDay();
            var dDatumVolwassen = new Date(dJaar, dMaand, dDag);

            //console.log(sGeboorteSplit[0]);

            if(sGeboortedatum == ""){

                e.preventDefault();
                error = true;
                //console.log('date');
                eDatumSpan.style.display = 'inline';
                //alert("Gelieve een datum in te geven.");

            }
            else{eDatumSpan.style.display = 'none';}

            if(dGeboortedatum > dDatumVolwassen){

                e.preventDefault();
                error = true;
                eDatumSpan.innerHTML = 'Je moet 18+ zijn.'
                eDatumSpan.style.display = 'inline';
                //alert("U bent niet oud genoeg voor deze site.");
            }
            else{eDatumSpan.style.display = 'none';}

        if(sWachtwoord == "" || sWachtwoordctrl == ""){

            e.preventDefault();
            error = true;
            eWwSpan.style.display = 'inline';
            //alert("Gelieve een wachtwoord in te geven.");

        }
        else{eWwSpan.style.display = 'none';}

        if(sWachtwoord !== sWachtwoordctrl){

            e.preventDefault();
            error = true;
            eWwCtrlSpan.style.display = 'inline';
            //alert('Paswoorden komen niet overeen.');

        }
        else{eWwCtrlSpan.style.display = 'none';}
        //------------------------------------
        // check van gebruikersnaam toevoegen!
        //-------------------------------------



        for(i = 0; i<lib.length; i++){

            if(sGebruikersnaam == lib[i].nickname){

                e.preventDefault();
                error = true;
                //alert('Deze gebruikersnaam bestaat al');
                //console.log(sGebruikersnaam, lib[i].nickname)
                var eGebruikersNaam = document.getElementById('gebruikersnaamspan');
                eGebruikersNaam.innerHTML = 'Deze naam bestaat al.'
                eGebruikersNaam.style.display = 'inline';
                break;
            }
            else{if(sGebruikersnaam = ""){
                eGebruikersNaam.style.display = 'none';
        }}

            if(sEmail == lib[i].email){

                e.preventDefault();
                error = true;
                //alert('Dit email bestaat al');
                eMailspan.innerHTML = 'Dit email is al in gebruik.'
                eMailspan.style.display = 'inline';
                break;
            }
            else{if(sEmail == ""){

                //console.log('test');
                error = true;
                eMailspan.innerHTML = 'Gelieve een email in te vullen.'
                eMailspan.style.display = 'inline';
            }
            else{
                eMailspan.style.display = 'none';
            }
        }
            var reg = /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

            //console.log(reg.test(String(sEMail).toLowerCase()));

            if(!reg.test(String(sEmail).toLowerCase())){
                error = true;
                eMailspan.innerHTML = 'Gelieve een geldig email in te vullen.'
                eMailspan.style.display = 'inline';
            }
            else{eMailspan.style.display = 'none';}
        }

        if(nGrootte == ""){

            error = true
            eGrootteSpan.innerHTML = 'Gelieve een grootte in te vullen.'
            eGrootteSpan.style.display = 'inline';

        }
        else{
            eGrootteSpan.style.display = 'none'
            if(nGrootte < 50 || nGrootte > 300 ){

            error = true
            eGrootteSpan.innerHTML = 'Gelieve een waarde tussen 30 en 300 cm in te geven.'
            eGrootteSpan.style.display = 'inline';
            }
            else{eGrootteSpan.style.display = 'none'}
        }

        if(nGewicht == ""){

            error = true
            eGewichtSpan.innerHTML = 'Gelieve een gewicht in te vullen.'
            eGewichtSpan.style.display = 'inline';

        }
        else{
            eGewichtSpan.style.display = 'none'
            if(nGewicht < 30 || nGewicht > 300 ){
            error = true
            eGewichtSpan.innerHTML = 'Gelieve een waarde tussen 30 en 300 kg in te geven.'
            eGewichtSpan.style.display = 'inline';
            }
            else{eGewichtSpan.style.display = 'none'}
        }

        if(error == false){

            //e.preventDefault();
            console.log('Success!');
            registreer();
        }

    });

}

function registreer(){

    var eForm = document.getElementById('registratiefrm');
    var sFamilienaam = eForm['familienaam'].value;
    var sVoornaam = eForm['voornaam'].value;    //type=string
    var sGeboortedatum = eForm['geboortedatum'].value; // type=date -> string
    var sEmail = eForm['email'].value;  //type=email (string output)
    var sGebruikersnaam = eForm['nickname'].value; //type=string
    var sBeroep = eForm['beroep'].value;    //type=string
    var eSexe = document.getElementsByName('sexe');    //type=radio, value=m/v
    var sHaarkleur = eForm['haarkleur'].value;  //type= string
    var sOogkleur = eForm['oogkleur'].value; //type = string
    var nGrootte = eForm['grootte'].value;  // type=number
    var nGewicht = eForm['gewicht'].value;  // type=number
    var sWachtwoord = eForm['wachtwoord'].value;  // type=password -> string
    var sWachtwoordctrl = eForm['wachtwoordctrl'].value;  // type=password -> string
    var nLovecoins = 3; // 3 gratis lovecoins bij registratie

    if(eSexe[0].checked){
        var sSexe = 'm';
    }
    else{ var sSexe = 'v'};


    //console.log(sSexe);


    var persoon = scrumlib.createDataset({"familienaam":sFamilienaam, "voornaam":sVoornaam, "geboortedatum": sGeboortedatum, "email": sEmail, "nickname": sGebruikersnaam, "beroep": sBeroep,
    "sexe": sSexe, "haarkleur": sHaarkleur, "grootte": nGrootte, "gewicht": nGewicht, "wachtwoord": sWachtwoord, "LoveCoins": nLovecoins, "oogkleur": sOogkleur});

    //code voor wegschrijven van de values naar local storage:
    scrumlib.save();

    //code voor wegschrijven van de values naar de profielen.JSON file:
    scrumlib.saveJSON();

    //localStorage.setItem('id', persoon[0].id);

    window.location="main.html"


    //console.log(sFamilienaam, sVoornaam, sGeboortedatum, sEMail, sGebruikersnaam, sBeroep, sSexe, sHaarkleur, nGrootte, nGewicht, sWachtwoord, sWachtwoordctrl);









}

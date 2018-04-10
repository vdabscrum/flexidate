window.onload = function(){

    var aFormElements = document.getElementById('registratiefrm').elements;
    var eForm = document.getElementById('registratiefrm');
    var datumVandaag = new Date();

    $('.formulier').click(function(e) {
        e.preventDefault();

        var test = scrumlib.getAllDatasets();
        console.log(test);

        var sWachtwoord = eForm['wachtwoord'].value;  // type=password -> string
        var sWachtwoordctrl = eForm['wachtwoordctrl'].value;  // type=password -> string
        var error = false

        for (var i = 0, aFormElement; aFormElement = aFormElements[i++];) {

            if (aFormElement.type === "text" && aFormElement.value === ""){

                e.preventDefault();
                error = true
                alert("Gelieve alle velden in te vullen.");
                break;
            }


        }


            var sGeboortedatum = eForm['geboortedatum'].value;
            var sGeboorteSplit = sGeboortedatum.split("-");
            var dGeboortedatum = new Date(parseInt(sGeboorteSplit[0]), parseInt(sGeboorteSplit[1]), parseInt(sGeboorteSplit[2]));
            var dJaar = parseInt(datumVandaag.getFullYear()) - 18;
            var dMaand = datumVandaag.getMonth();
            var dDag = datumVandaag.getDay(); 
            var dDatumVolwassen = new Date(dJaar, dMaand, dDag);

            console.log(sGeboorteSplit[0]);

            if(sGeboortedatum == ""){

                e.preventDefault();
                error = true
                alert("Gelieve een datum in te geven.");
             
            }

            if(dGeboortedatum > dDatumVolwassen){

                e.preventDefault();
                error = true
                alert("U bent niet oud genoeg voor deze site.");
            }
         

        if(sWachtwoord == "" || sWachtwoordctrl == ""){

            e.preventDefault();
            error = true
            alert("Gelieve een wachtwoord in te geven.");

        }
        if(sWachtwoord !== sWachtwoordctrl){

            e.preventDefault();
            error = true
            alert('Paswoorden komen niet overeen.');


        }
        if(error == false){
            
            e.preventDefault()
            //console.log('Success!');
            registreer();
        }
    });

}

function registreer(){

    var eForm = document.getElementById('registratiefrm');
    var sFamilienaam = eForm['familienaam'].value; 
    var sVoornaam = eForm['voornaam'].value;    //type=string
    var sGeboortedatum = eForm['geboortedatum'].value; // type=date -> string 
    var sEMail = eForm['email'].value;  //type=email (string output)
    var sGebruikersnaam = eForm['nickname'].value; //type=string 
    var sBeroep = eForm['beroep'].value;    //type=string
    var sSexe = eForm['sexe'].value;    //type=radio, value=m/v
    var sHaarkleur = eForm['haarkleur'].value;  //type= string
    var nGrootte = eForm['grootte'].value;  // type=number
    var nGewicht = eForm['gewicht'].value;  // type=number 
    var sWachtwoord = eForm['wachtwoord'].value;  // type=password -> string
    var sWachtwoordctrl = eForm['wachtwoordctrl'].value;  // type=password -> string

    var persoon = scrumlib.createDataset({"familienaam":sFamilienaam, "voornaam":sVoornaam, "geboortedatum": sGeboortedatum, "email": sEMail, "nickname": sGebruikersnaam, "beroep": sBeroep,
    "sexe": sSexe, "haarkleur": sHaarkleur, "grootte": nGrootte, "gewicht": nGewicht, "wachtwoord": sWachtwoord});

    //console.log(persoon[0].familienaam);

    //code voor wegschrijven van de values naar de profielen.JSON file:
    scrumlib.save();
   
    //console.log(typeof(sWachtwoord));

    //console.log(sFamilienaam, sVoornaam, sGeboortedatum, sEMail, sGebruikersnaam, sBeroep, sSexe, sHaarkleur, nGrootte, nGewicht, sWachtwoord, sWachtwoordctrl);

    


    




}
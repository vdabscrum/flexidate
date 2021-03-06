if (!localStorage.getItem("id")) {
    window.location = "main.html";
}

window.onload = function(){

    var aFormElements = document.getElementById('registratiefrm').elements;
    var eForm = document.getElementById('registratiefrm');
    var datumVandaag = new Date();
    var lib = scrumlib.getAllDatasets();
    var sIngelogd = localStorage.getItem('id');
    var aIngelogd = scrumlib.getDatasetById(sIngelogd)

    vulGegevens();

    $('.deleteProfile').click(function(e) {
        e.preventDefault();



        if(window.confirm("Bent u zeker dat u uw profiel wilt verwijderen?")){

            scrumlib.deleteDataset(sIngelogd);
            scrumlib.save();
            scrumlib.saveJSON();
            localStorage.clear()
            window.location = "Aanpassen.html"

        }

    });

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

            if(sGebruikersnaam == lib[i].nickname && aIngelogd[0]['nickname'] != sGebruikersnaam){

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

            }
        }

            if(sEmail == lib[i].email && aIngelogd[0]['email'] != sEmail){

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

            //console.log(reg.test(String(sEmail).toLowerCase()));

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
            update();
        }

    });

}

function update(){

  var eFoto = document.getElementById('foto');
  var imgfoto = eFoto.value;
  eFoto.src = imgfoto;
  console.log(eFoto, imgfoto)

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
    var sIngelogd = localStorage.getItem('id');
    var sWachtwoord = eForm['wachtwoord'].value;  // type=password -> string

    console.log();

    if(eSexe[0].checked){
        var sSexe = 'm';
    }
    else{ var sSexe = 'v'};

    if(sWachtwoord == ""){

        var persoon = [{"familienaam":sFamilienaam, "voornaam":sVoornaam, "geboortedatum": sGeboortedatum, "email": sEmail, "nickname": sGebruikersnaam, "beroep": sBeroep,
    "sexe": sSexe, "haarkleur": sHaarkleur, "grootte": nGrootte, "gewicht": nGewicht, "oogkleur": sOogkleur}];

    }
    else{

        var persoon = [{"familienaam":sFamilienaam, "voornaam":sVoornaam, "geboortedatum": sGeboortedatum, "email": sEmail, "nickname": sGebruikersnaam, "beroep": sBeroep,
        "sexe": sSexe, "haarkleur": sHaarkleur, "grootte": nGrootte, "gewicht": nGewicht, "wachtwoord": sWachtwoord, "oogkleur": sOogkleur}];
    }


    console.log('Update' , persoon[0]);

    scrumlib.updateDataset(sIngelogd,persoon[0]);
    scrumlib.save();
    //code voor wegschrijven van de values naar de profielen.JSON file:
    scrumlib.saveJSON();

    window.location="Aanpassen.html"


    //console.log(sFamilienaam, sVoornaam, sGeboortedatum, sEmail, sGebruikersnaam, sBeroep, sSexe, sHaarkleur, nGrootte, nGewicht, sWachtwoord, sWachtwoordctrl);

}

function vulGegevens(){

  var eFoto = document.getElementById('fotoimg');
  eFoto.style.width = '200px';
  let foto = document.getElementById('foto');
  foto.addEventListener('change', function() {
    console.log('foto:', foto.value);
    let fotoValue = foto.value;
    let aFoto = fotoValue.split('\\');
    let sFoto = (aFoto[aFoto.length - 1]);

    eFoto.src = 'img/' + sFoto;
  });

    var aFormElements = document.getElementById('registratiefrm').elements;
    var sIngelogd = localStorage.getItem('id');
    var aIngelogd = scrumlib.getDatasetById(sIngelogd);

    //console.log('test', sIngelogd, aIngelogd)

    for (var i = 0; i < aFormElements.length ; i++)
    {
        var soort = (aFormElements[i].id).toString();
        //console.log(aIngelogd[0][soort]);

        if(soort != 'wachtwoord' && soort != 'wachtwoordctrl' && soort != 'submit' && soort != 'submitdelete' && soort!='foto'){

            aFormElements[i].value = aIngelogd[0][soort];

        }
        //console.log(aFormElements[i].id, "soort");
        //console.log(aFormElements[i]);
    }

    console.log(aIngelogd[0]['sexe'] , 'test')
    if(aIngelogd[0]['sexe'] == 'm'){document.getElementById('man').checked = true}
    else{document.getElementById('vrouw').checked = true}

}

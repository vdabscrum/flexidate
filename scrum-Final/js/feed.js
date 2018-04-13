let aMensen;

window.onload = function() {
  aMensen = createFeed(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  overloopIds(aMensen, localStorage.getItem("id"));

  // messagebutton
  let eMessageButtons = document.querySelectorAll("button.messageButton");
  let eLoveButtons = document.querySelectorAll("button.loveButton") //3.1

  //Listen buy coins 3.1
  for (let i = 0; i < eLoveButtons.length; i++) {
    eLoveButtons[i].addEventListener('click', function(e) {

      payCoin(this)

    });
  }

  for (let i = 0; i < eMessageButtons.length; i++) {
    eMessageButtons[i].addEventListener('click', function(e) {
      showMessageBox(e);
    });
  }


  // filter
  let vindmatchButton = document.getElementById("matchButtonId");
  vindmatchButton.addEventListener('click', function() {
    let geslachtValue = document.getElementById('geslacht');
    let sexe = geslachtValue.value;
    let haarkleurValue = document.getElementById('haarkleur');
    let haarkleur = haarkleurValue.value;
    let oogkleurValue = document.getElementById('oogkleur');
    let oogkleur = oogkleurValue.value;
    let minLeeftijdValue = document.getElementById('minLeeftijd');
    let minLeeftijd = minLeeftijdValue.value;
    let maxLeeftijdValue = document.getElementById('maxLeeftijd');
    let maxLeeftijd = maxLeeftijdValue.value;
    let minGewichtValue = document.getElementById('minGewicht');
    let minGewicht = minGewichtValue.value;
    let maxGewichtValue = document.getElementById('maxGewicht');
    let maxGewicht = maxGewichtValue.value;
    let minGrootteValue = document.getElementById('minGrootte');
    let minGrootte = minGrootteValue.value;
    let maxGrootteValue = document.getElementById('maxGrootte');
    let maxGrootte = maxGrootteValue.value;

  //  console.log("poging 1 ", eLoveButtons);


    //Listen buy coins 3.1




    aMensen = createFeed(minLeeftijd, maxLeeftijd, minGewicht, maxGewicht, minGrootte, maxGrootte, oogkleur, haarkleur, sexe);
    overloopIds(aMensen, localStorage.getItem("id"));
    let eLoveButtons = document.querySelectorAll("button.loveButton") //3.1
    for (let i = 0; i < eLoveButtons.length; i++) {
      eLoveButtons[i].addEventListener('click', function(e) {

        payCoin(this)

      });
    }
        console.log("poging 2 ", eLoveButtons);
    let eMessageButtons = document.querySelectorAll("button.messageButton");
    for (let i = 0; i < eMessageButtons.length; i++) {
      eMessageButtons[i].addEventListener('click', function(e) {
        showMessageBox(e);
      });
    }
    console.log("tekst", eMessageButtons);
  });


}

///////////////DYLAN WAS HERE//////////////////////////////////////////////////


//volledigProfielArray scrum3.1
function addBetaaldProfiel(gebruikerId, profielId) {
  let gebruiker = scrumlib.getDatasetsByConditions({
    _id: {
      "waarde": gebruikerId
    }
  });
  let lijst = gebruiker[0].ArrayId;
  if (lijst === undefined) {
    addBetaaldeProfielenProperty();
    addBetaaldProfiel(gebruikerId, profielId)
  } else {
    lijst = lijst + profielId;
    gebruiker[0].ArrayId = lijst;
    scrumlib.save();
    scrumlib.saveJSON();
    console.log(lijst);
  }
}

function overloopIds(aMensen, gebruikerId) {
  let gebruiker = scrumlib.getDatasetsByConditions({
    _id: {
      "waarde": gebruikerId
    }
  });
  let lijst = gebruiker[0].ArrayId;
  if (lijst === undefined) {
    console.log("do nothing");
  } else {
    let lengte = lijst.length;
    for (let i = 0; i < lijst.length; i = i + 24) {
      let profielId = lijst.substring(i, i + 24)
      for (let j = 0; j < aMensen.length; j++) {
        if (aMensen[j]._id == profielId) {
          let profiel = document.getElementById(profielId);
          let eKnop = profiel.querySelector(".loveButton");
          /*
          payCoin(eKnop);
          console.log("toonProfiel");
          console.log(id.button)
          */

          var eParent = eKnop.parentNode
          var eHidden = eParent.childNodes
          var sIngelogd = localStorage.getItem('id');
          //  } else {
          //    var sIngelogd = eKnop;
          //
          var aIngelogd = scrumlib.getDatasetById(sIngelogd);
          var ePersonCoins = document.getElementById('personCoins');
          let eSpan = ePersonCoins.querySelector('span');
          eHidden[2].style.display = 'block';
          eHidden[3].style.display = 'block';
          //eHidden[3].style.float = 'right';
          eKnop.style.display = 'none';

        }
      }
    }
  }
}

    function addBetaaldeProfielenProperty() {
      scrumlib.addProperty("ArrayId", "string", "");
      scrumlib.save();
      scrumlib.saveJSON();
    }


    //////////////////////////////////////////////////////////////////

    function showMessageBox(e) {
      let eMessageBox = document.querySelector('.messageBox');
      eMessageBox.style.visibility = 'visible';
      eMessageBox.id = e.path[1].id;
    }

    function createFeed(minLeeftijd, maxLeeftijd,
      minGewicht, maxGewicht,
      minGrootte, maxGrootte,
      oogkleur, haarkleur, sexe) {

      sexe = sexe == 0 ? undefined : sexe;
      oogkleur = oogkleur == 0 ? undefined : oogkleur;
      haarkleur = haarkleur == 0 ? undefined : haarkleur;

      minLeeftijd = minLeeftijd == 0 ? undefined : minLeeftijd;
      maxLeeftijd = maxLeeftijd == 0 ? undefined : maxLeeftijd;
      minGewicht = minGewicht == 0 ? undefined : minGewicht;
      maxGewicht = maxGewicht == 0 ? undefined : maxGewicht;
      minGrootte = minGrootte == 0 ? undefined : minGrootte;
      maxGrootte = maxGrootte == 0 ? undefined : maxGrootte;

      let aPeople = scrumlib.getAllDatasets();



      // filter leeftijd
      if (minLeeftijd || maxLeeftijd) {

        if (minLeeftijd) {
          aPeople = aPeople.filter(function(person) {
            let geboortejaar = person.geboortedatum.substring(0, 4);
            let huidigjaar = new Date().getFullYear();
            let leeftijd = huidigjaar - geboortejaar;
            if (leeftijd >= minLeeftijd) {
              return person;
            }
          });
        }
        if (maxLeeftijd) {
          aPeople = aPeople.filter(function(person) {
            let geboortejaar = person.geboortedatum.substring(0, 4);
            let huidigjaar = new Date().getFullYear();
            let leeftijd = huidigjaar - geboortejaar;
            if (leeftijd <= maxLeeftijd) {
              return person;
            }
          });
        }
      }

      // filter Gewicht
      if (minGewicht || maxGewicht) {
        if (minGewicht) {
          aPeople = aPeople.filter(person => person.gewicht >= minGewicht);
        }
        if (maxGewicht) {
          aPeople = aPeople.filter(person => person.gewicht >= maxGewicht);
        }
      }

      // filter grootte
      if (minGrootte || maxGrootte) {
        if (minGrootte) {
          aPeople = aPeople.filter(person => person.grootte >= minGrootte);
        }
        if (maxGrootte) {
          aPeople = aPeople.filter(person => person.grootte <= maxGrootte);
        }
      }

      // filter oogkleur
      if (oogkleur) {
        aPeople = aPeople.filter(person => person.oogkleur == oogkleur);
      }

      // filter oogkleur
      if (haarkleur) {
        aPeople = aPeople.filter(person => person.haarkleur == haarkleur);
      }

      // filter sexe
      if (sexe) {
        if (sexe == 'man') {
          sexe = 'm';
        }
        if (sexe == 'vrouw') {
          sexe = 'v';
        }
        aPeople = aPeople.filter(person => person.sexe == sexe);
      }

      // create the feed
      let eFeed = document.getElementById('feed');

      if (eFeed.innerHTML !== "") {
        eFeed.innerHTML = "";
      }
      aPeople.forEach(function(person) {
        // outer div
        let eDiv = document.createElement('div');
        eDiv.id = person._id;

        // nickname
        let eH3 = document.createElement('h3');
        eH3.innerHTML = person.nickname;
        eDiv.appendChild(eH3);

        // definition list
        let eDl = document.createElement('dl');

        // Beroep
        let eDtBeroep = document.createElement('dt');
        eDtBeroep.innerHTML = 'Beroep';
        let eDdBeroep = document.createElement('dd');
        eDdBeroep.innerHTML = person.beroep;
        eDl.appendChild(eDtBeroep);
        eDl.appendChild(eDdBeroep);

        // Geslacht
        let eDtGeslacht = document.createElement('dt');
        eDtGeslacht.innerHTML = 'Geslacht';
        let eDdGeslacht = document.createElement('dd');
        eDdGeslacht.innerHTML = person.sexe == 'm' ? 'man' : 'vrouw';
        eDl.appendChild(eDtGeslacht);
        eDl.appendChild(eDdGeslacht);

        // Oogkleur
        let eDtOogkleur = document.createElement('dt');
        eDtOogkleur.innerHTML = 'Oogkleur';
        let eDdOogkleur = document.createElement('dd');
        eDdOogkleur.innerHTML = person.oogkleur;
        eDl.appendChild(eDtOogkleur);
        eDl.appendChild(eDdOogkleur);

        // Haarkleur
        let eDtHaarkleur = document.createElement('dt');
        eDtHaarkleur.innerHTML = 'Haarkleur';
        let eDdHaarkleur = document.createElement('dd');
        eDdHaarkleur.innerHTML = person.haarkleur;
        eDl.appendChild(eDtHaarkleur);
        eDl.appendChild(eDdHaarkleur);

        // Gewicht
        let eDtGewicht = document.createElement('dt');
        eDtGewicht.innerHTML = 'Gewicht';
        let eDdGewicht = document.createElement('dd');
        eDdGewicht.innerHTML = person.gewicht;
        eDl.appendChild(eDtGewicht);
        eDl.appendChild(eDdGewicht);

        // Grootte
        let eDtGrootte = document.createElement('dt');
        eDtGrootte.innerHTML = 'Grootte';
        let eDdGrootte = document.createElement('dd');
        eDdGrootte.innerHTML = person.grootte;
        eDl.appendChild(eDtGrootte);
        eDl.appendChild(eDdGrootte);

        eDiv.appendChild(eDl);




        // M&M
        //------------

        //Leeftijd
        let geboortejaar = person.geboortedatum.substring(0, 4);
        let huidigjaar = new Date().getFullYear();
        let leeftijd = huidigjaar - geboortejaar;
        let eDtLeeftijd = document.createElement('dt');
        eDtLeeftijd.innerHTML = 'Leeftijd';
        let eDdLeeftijd = document.createElement('dd');
        eDdLeeftijd.innerHTML = leeftijd;
        eDl.appendChild(eDtLeeftijd);
        eDl.appendChild(eDdLeeftijd);

        eDiv.appendChild(eDl);

        // definition list Hidden element 3.1
        let eDlHidden = document.createElement('dl');
        eDlHidden.style.display = "none"

        //Voornaam 3.1
        let eDtVoornaam = document.createElement('dt');
        eDtVoornaam.innerHTML = 'Voornaam';
        let eDdVoornaam = document.createElement('dd');
        eDdVoornaam.innerHTML = person.voornaam;
        eDlHidden.appendChild(eDtVoornaam);
        eDlHidden.appendChild(eDdVoornaam);

        //Achternaam 3.1
        let eDtAchternaam = document.createElement('dt');
        eDtAchternaam.innerHTML = 'Familienaam';
        let eDdAchternaam = document.createElement('dd');
        eDdAchternaam.innerHTML = person.familienaam;
        eDlHidden.appendChild(eDtAchternaam);
        eDlHidden.appendChild(eDdAchternaam);

        eDiv.appendChild(eDlHidden);

        //Profielfoto 3.1
        var eImg = document.createElement("img");
        eImg.src = "img/" + person.foto;
        eImg.style.display = "none"
        //console.log(person.foto);
        eDiv.appendChild(eImg);

        // BuyLove 3.1
        let eLove = document.createElement('button');
        eLove.innerHTML = "Geef 1 coin voor meer info";
        eLove.classList.add("loveButton", "reversehide");
        eDiv.appendChild(eLove);





        // end M&M
        //---------





        // Sterrenbeeld
        let eDivSterrenbeeld = document.createElement('div');
        eDivSterrenbeeld.classList.add("sterrenbeeld");

        let sDivSterrenbeeld = document.createTextNode(getSterrenbeeld(person.geboortedatum));
        eDivSterrenbeeld.appendChild(sDivSterrenbeeld);
        eDiv.appendChild(eDivSterrenbeeld);

        // Bericht
        let eButton = document.createElement('button');
        eButton.innerHTML = "Stuur een bericht";
        eButton.classList.add("messageButton");

        let eHeartDiv = document.createElement('div');
        let eHeart = document.createElement('i');
        eHeart.classList.add('fab');
        eHeart.classList.add('fa-gratipay');
        eHeartDiv.appendChild(eHeart);
        eButton.appendChild(eHeartDiv);
        eDiv.appendChild(eButton);


        //  Outerdiv
        eFeed.appendChild(eDiv);

      });

      return aPeople;

    }

    /*
    function payCoin(){

        var eParent = this.parentNode
        var eHidden = eParent.getElementsbyClassName('verborgen');

        eHidden.style.display = 'block'

    }
    */

    function payCoin(eKnop) {

      //  if (eKnop !== typeof "abc") {

      var eParent = eKnop.parentNode
      var eHidden = eParent.childNodes
      var sIngelogd = localStorage.getItem('id');
      //  } else {
      //    var sIngelogd = eKnop;
      //
      var aIngelogd = scrumlib.getDatasetById(sIngelogd);
      var ePersonCoins = document.getElementById('personCoins');
      let eSpan = ePersonCoins.querySelector('span');
                    console.log("TESTING");
      if (aIngelogd[0]['LoveCoin'] <= 0 || aIngelogd[0]['LoveCoin'] === undefined) {

        alert('U heeft niet genoeg coins!');
      } else {

        addBetaaldProfiel(sIngelogd, eParent.id)
        aIngelogd[0]['LoveCoin'] = aIngelogd[0]['LoveCoin'] - 1;
        let sLoveCoins = aIngelogd[0]['LoveCoin'] == 1 ? " LoveCoin" : " LoveCoins";
        eSpan.innerHTML = aIngelogd[0]['LoveCoin'] + sLoveCoins;
        eHidden[2].style.display = 'block';
        eHidden[3].style.display = 'block';
        //eHidden[3].style.float = 'right';
        eKnop.style.display = 'none';

        scrumlib.updateDataset(sIngelogd, aIngelogd[0]);
        scrumlib.save();
        scrumlib.saveJSON();

      }
    }

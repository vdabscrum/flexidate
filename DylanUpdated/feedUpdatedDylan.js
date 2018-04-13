
///////////////////////DYLAN WAS HERE /////////////////////////////////




let aMensen ;

// nota aan redactie: aMensen wordt nog 2 maal gebruikt in de onload!!!!

///////////////////////////////////////////////////////////////////////

window.onload = function() {
aMensen =  createFeed(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);

  // messagebutton
  let eMessageButtons = document.querySelectorAll("button.messageButton");

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

aMensen = createFeed(minLeeftijd, maxLeeftijd, minGewicht, maxGewicht, minGrootte, maxGrootte, oogkleur, haarkleur, sexe);

    let eMessageButtons = document.querySelectorAll("button.messageButton");
    for (let i = 0; i < eMessageButtons.length; i++) {
      eMessageButtons[i].addEventListener('click', function(e) {
        showMessageBox(e);
      });
    }
  });


}


///////////////DYLAN WAS HERE//////////////////////////////////////////////////


//volledigProfielArray scrum3.1
function addBetaaldProfiel(gebruikerId, profielId){
  let gebruiker = scrumlib.getDatasetsByConditions({ _id: { "waarde": gebruikerId } });
  let lijst = gebruiker[0].ArrayId ;
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

function overloopIds(aMensen, gebruikerId){
  let gebruiker = scrumlib.getDatasetsByConditions({ _id: { "waarde": gebruikerId } });
  let lijst = gebruiker[0].ArrayId ;
  if (lijst === undefined) {
    console.log("do nothing");
  } else {
    let lengte = lijst.length ;
    for (i = 0; i < lijst.length; i = i + 24)
    {
      let profielId = lijst.substring(i, i + 24)
      for (j = 0; j < aMensen.length; j++)
      {
        if (aMensen[j]._id == profielId){
          console.log("toonProfiel");
        }
      }
    }
  }
}

function addBetaaldeProfielenProperty(){
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

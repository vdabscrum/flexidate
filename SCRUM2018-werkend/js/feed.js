window.onload = function () {
    createFeed(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);

    // messagebutton
    let eMessageButton = document.querySelector("button");
    console.log(eMessageButton);
    eMessageButton.addEventListener('click', function () {
        let eMessageBox = document.querySelector('.messageBox');
        eMessageBox.style.visibility = 'visible';
    });
}

function createFeed(minLeeftijd, maxLeeftijd,
    minGewicht, maxGewicht,
    minGrootte, maxGrootte,
    oogkleur, haarkleur, sexe) {

    let aPeople = scrumlib.getAllDatasets();



    // filter leeftijd
    if (minLeeftijd || maxLeeftijd) {
        let geboortejaar = person.geboortedatum.join('-')[0];
        let huidigjaar = new Date().getFullYear();
        let leeftijd = huidigjaar - geboortejaar;

        if (minLeeftijd) {
            aPeople = aPeople.filter(person => leeftijd >= minLeeftijd);
        }
        if (maxLeeftijd) {
            aPeople = aPeople.filter(person => leeftijd >= maxLeeftijd);
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

    // filter oogkleur
    if (sexe) {
        aPeople = aPeople.filter(person => person.sexe == sexe);
    }

    // create the feed
    let eFeed = document.getElementById('feed');
    aPeople.forEach(function (person) {
        // outer div
        let eDiv = document.createElement('div');

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
        eDiv.appendChild(eButton);


        //  Outerdiv
        eFeed.appendChild(eDiv);

    });



}
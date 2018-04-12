
window.onload = function () {
    let eLogUit = document.getElementById('uitloggen');
    eLogUit.addEventListener('click', uitloggen);

    let eLogoWrap = document.querySelector('.ow_logo_wrap');
    eLogoWrap.addEventListener('click', function() {
      eLogoWrap.style.cursor = "pointer";
      window.location.href = "feed.html";
    })
}

function uitloggen() {
    localStorage.removeItem("id");
    window.location = "main.html";
}


function getSterrenbeeld(geboorteDatum) {
    let sterrenbeeld;
    let aDatum = geboorteDatum.split('-');
    aDatum.shift();
    if (aDatum[1].length == 1) {
        aDatum[1] = '0' + aDatum[1];
    }
    let sDatum = aDatum.join('');
    let nDatum = parseInt(sDatum);
    if (nDatum < 21 || nDatum > 1221) {
        sterrenbeeld = "SteenBok";
    } else if (nDatum < 220) {
        sterrenbeeld = "Waterman";
    } else if (nDatum < 321) {
        sterrenbeeld = "Vissen";
    } else if (nDatum < 421) {
        sterrenbeeld = "Ram";
    } else if (nDatum < 521) {
        sterrenbeeld = "Stier";
    } else if (nDatum < 622) {
        sterrenbeeld = "Tweeling";
    } else if (nDatum < 723) {
        sterrenbeeld = "Kreeft";
    } else if (nDatum < 823) {
        sterrenbeeld = "Leeuw";
    } else if (nDatum < 923) {
        sterrenbeeld = "Maagd";
    } else if (nDatum < 1023) {
        sterrenbeeld = "Weegschaal";
    } else if (nDatum < 1122) {
        sterrenbeeld = "Schorpioen";
    } else if (nDatum < 1222) {
        sterrenbeeld = "Boogschutter";
    }

    return sterrenbeeld;
}

function addLoveCoinProperty() {
    scrumlib.addProperty("LoveCoin", "number", 0);
    scrumlib.save();
}

function addLoveCoins(personId, aantalCoins) {
    let person = scrumlib.getDatasetsByConditions({ _id: { "waarde": personId } });

    if (person[0].LoveCoin === undefined) {
        addLoveCoinProperty();
        addLoveCoins(personId, aantalCoins)
    } else {
        person[0].LoveCoin = person[0].LoveCoin + aantalCoins;
    }
}

function removeLoveCoins(personId, aantalCoins) {
    let person = scrumlib.getDatasetsByConditions({ _id: { "waarde": personId } });

    if (person[0].LoveCoin === undefined) {
        addLoveCoinProperty();
        console.log("Nog geen coins")
    } else {
        if (aantalCoins <= person[0].LoveCoin) {
            person[0].LoveCoin = person[0].LoveCoin - aantalCoins;
            console.log(person[0].LoveCoin);
        } else {
            console.log("Te weinig coins");
        }
    }
}

"use strict";
/**
 * last update 23/5/2017
 * Created by jan on 22/02/2016.
 * flexi_scrum_x.x.x.js
 *  API voor basis scrum project
 * deze library kan gebruikt worden met verschillende json data files, zie LAATSTE LIJN
 *
 * dependencies:
 *  - jQuery: gebruik bij voorkeur de CDN
 *  - localStorage functionality
 *
 * minify met de http://closure-compiler.appspot.com/ optie 'simple'
 * geef cursisten flexi_scrum.x.x.x.min.js

 * CHANGELOG:
 * V2
 *  - alle data en methods generisch gemaakt, geen verwijzingen meer naar profielen
 *  - minified version moet de vars $ en jQuery bewaren! anders dependency failure
 *
 *  2.1.0
 *  c
 *  bug opgelost in deleteDataset
 *
 *  2.1.1
 *  Adinda: saveJSON method toegevoegd
 *
 *
 * */

//IIFE

var scrumlib = (function ($, json) {

    var single = {


        //=========================private vars=================================
        version: "2.1.1",
        jsonUrl: json, // welke json file wordt doorgegeven: voor dating, voor immo, etc...
        flexidata: [],

        //==========================init==========================================

        init: function (eId) {
            /*
             * start de app
             * checked startvoorwaarden
             * laadt profielen ofwel uit LocalStorage ofwel uit startBestand
             *
             * @eId: String, optioneel, id van dom element voor eventuele invulling
             * */
            console.log(single.speak());

            if (single.dependencyChecks() === false) {
                throw new Error('Fout: een startvoorwaarde is niet voldaan');

            }
            //console.log(localStorage.getItem('profielen'));
            //LS of JSON
            if (localStorage.getItem('flexidata') != null) {
                // profielen aanwezig in LS => laadt ze
                single.flexidata = JSON.parse(localStorage.getItem('flexidata'));
                console.log('data geladen uit localStorage');
            }
            else {
                // profielen afwezig in LS => laadt ze uit startbestand
                single.laadStartData();
            }

        },

        speak: function () {
            return "Scrumlib v" + single.version;
        },

        laadStartData: function () {
            // laadStartData resolve promise

            single.startData()

                .done(function (data) {
                    single.flexidata = data;
                    console.log('data geladen uit startbestand');
                })
                .done(function (data) {
                    //save data naar LS
                    single.saveDataLS();

                })
                //.done(function (data) {
                //    //testfunctie die profielen in een dom el schrijft
                //    if (eId) {
                //        single.makeList(document.getElementById(eId), single.getAlleProfielen());
                //    }
                //})
                .fail(function (data) {
                    console.log('probleem met laden startProfielen');
                })
        },

        reset: function () {
            /*
             * Reset app:
             *   - wist alle huidige profielen
             *   - wist LS profielen
             *   - herlaadt profielen uit JSON
             * */

            single.flexidata = [];
                //console.log(single.flexidata);
            localStorage.removeItem('flexidata');
                //console.log(localStorage.getItem('flexidata'));
            single.laadStartData();
            console.log('data werden gereset');
        },

        save: function () {
            /*
             * Save alle huidige profielen naar LS
             * wrapper voor  saveProfielenLS()
             * */
            single.saveDataLS();
        },

        dependencyChecks: function () {
            /*
             * dependency checks, return boolean
             * */

            var ok = true;
            if (typeof $ == "undefined") {
                console.log('jQuery not defined');
                //throw new Error('Fout: jQuery not defined');
                ok = false;
            }
            if (!window.localStorage) {
                console.log('localStorage not supported');
                //throw new Error('Fout:localStorage not supported');
                ok = false;
            }
            return ok;
        },

        //========================== data ===================================

        startData: function () {
            /*
             * return promise voor laden json bestanden
             * */
            return $.getJSON(single.jsonUrl).then(function (data) {
                return data;
            })
        },

        saveDataLS: function () {
            /*
             * save data naar LocalStorage
             * */
            localStorage.setItem('flexidata', JSON.stringify(single.flexidata));
            console.log('data opgeslagen in LS');
        },

        addProperty: function (propertyName, type, defaultValue) {
            /*
             * voeg een nieuwe property toe aan alle data objects
             * @propertyname: String, verplicht, naam van property
             * @type: String, verplicht, "String", "Number", "Boolean"
             * @defaultValue: String, Number, Boolean, verplicht, standaardwaarde
             * */

            //bestaat propertyname reeds?
            //check eerste dataset
            if (single.flexidata[0].hasOwnProperty(propertyName)) {
                //bestaat reeds
                console.log("property '" + propertyName + "' bestaat reeds: niets toegevoegd.")
            }
            else {
                //ok
                //check datatypes
                var t = type.toLowerCase();
                //console.log("propertyName: " + propertyName  + "; type: " + type + "; defaultValue: " + defaultValue);
                if (t == "string" || t == "number" || t == "boolean") {
                    //ok
                    //lus doorheen profielen
                    if (typeof defaultValue !== t) {
                        throw new Error("defaultValue " + defaultValue + " komt niet overeen met datatype " + type);
                    } else {
                        for (var i = 0; i < single.flexidata.length; i++) {
                            single.flexidata[i][propertyName] = defaultValue;
                        }
                    }
                }
                else {
                    //verkeerd datatype
                    console.log("datatype '" + type + "' van property '" + propertyName + "' kan enkel String, Number of Boolean zijn");
                }
            }
        },
        compareDates: function (date1, date2) {
            /*
             * vergelijkt twee datums
             * @date1 dateString
             * @date1 dateString
             * */
            var d1 = new Date(date1);
            var d2 = new Date(date2);
            var same = d1.getTime() === d2.getTime();
            var notSame = d1.getTime() !== d2.getTime();
        },

        //================== core DAO methods =================================

        getAllDatasets: function () {
            /*
             * return Array met alle datasets (objecten)
             * */
            return single.flexidata;
        },

        getDatasetByIndex: function (i) {
            /*
             * return  Array met één dataset volgens positie
             * */
            var a = [];
            if (typeof i !== 'undefined' && i >= 0 && i < single.flexidata.length) {
                a.push(single.flexidata[i]);
            } else {
                throw new Error('index ' + i + " buiten bereik");
            }
            return a;
        },

        getIdByEmailPassword: function (email, pw) {
            /*
             * return id | false
             * @email
             * @password
             * */

            var aidee = false;
            //search profiles
            for (var i = 0; i < single.flexidata.length; i++) {
                var dataset = single.flexidata[i];
                //console.log("prof email: " + dataset["email"]);
                if (dataset["email"] == email) {
                    if (dataset["wachtwoord"] == pw) {
                        //console.log("prof pw: " + dataset["wachtwoord"]);
                        aidee = dataset["_id"];
                        break;
                    }
                }
            }
            return aidee;
        },

        getDatasetsByProperty: function (aData, prop, val, match) {
            /*

             private function
             * return Array of Objects, volgens één bepaalde property, EXACTE MATCH
             * aData: Array met objecten, voor eventuele recursie
             * @prop: string, verplicht, de property te evalueren
             * @val: string/number,boolean, verplicht, de waarde te vergelijken
             * @match: string, optional, default =, vergelijkingsmethode
             *=
             gelijk aan
             ~
             bevat string (fuzzy search)
             <
             jonger dan
             <=
             kleiner dan of gelijk aan
             >
             ouder dan
             >=
             groter dan of gelijk aan
             *
             *
             * */

            // console.log("getDatasetsByProperty: " + "entry aantal: " + aData.length + " ,prop: " + prop + ", val: " + val + " , match: " + match);

            // /default match =
            if (typeof match === "undefined" || match === null) {
                match = "=";
            }
            //console.log(match);

            var a = []; //return Array

            if (val == "") {
                //lege waarde == leeg Array
                console.log('lege waarde, return leeg array');
                return a; //stop en retun leeg array

            }
            if (single.isArray(aData) && arguments.length >= 3 && typeof prop !== "undefined" && prop !== "") {

                if (single.isNumber(val)) {
                    val = parseFloat(val);
                } //convert possible numbers to numbers

                $.each(aData, function (i, dataset) {
                        //vergelijk elk record
                        //bestaat property?
                        if (dataset.hasOwnProperty(prop)) {

                            var waarde = dataset[prop];
                            //console.log("waarde: "+ waarde, "prop: " + prop)
                            //SCRIMLIB AAN TE PASSEN/
                            // ELKE PROPERTY MOET EEN TYPE KRIJGEN WAAROP JE MAKKELIJKER KUNT BEPALEN HOE DE SEARCH MOET GEBEUREN? DUS STRING, NUMBER, DATE
                            if (prop == "geboortedatum") {
                                //console.log(' datum')
                                //specifiek voor leeftijd/datums
                                //geen fuzzy search
                                var waardeDate = new Date(waarde);
                                var zoekDate = new Date(val); //validatie nodig voor ISO date!! yyyy-mm-dd
                                var waardeTime = waardeDate.getTime();
                                var zoekTime = zoekDate.getTime();

                                //exacte match, fuzzy niet toegstaan
                                if ((match == "=") || (match == "~")) {
                                    if (waardeTime == zoekTime) {
                                        a.push(dataset);
                                    }
                                }
                                //smaller than
                                if (match == "<") {
                                    if (waardeTime < zoekTime) {
                                        a.push(dataset);
                                    }
                                }
                                //smaller than and equal
                                if (match == "<=") {
                                    if (waardeTime <= zoekTime) {
                                        a.push(dataset);
                                    }
                                }
                                //bigger than
                                if (match == ">") {
                                    if (waardeTime > zoekTime) {
                                        a.push(dataset);
                                    }
                                }
                                //bigger than and equal
                                if (match == ">=") {
                                    if (waardeTime >= zoekTime) {
                                        a.push(dataset);
                                    }
                                }
                            }
                            else {
                                //geen datum
                                if (single.isNumber(waarde)) {
                                    waarde = parseFloat(waarde);
                                } //convert to number als numeriek
                                // console.log('geen datum');
                                // console.log("prop: " + waarde +  match + " val: " + val);

                                //exacte match
                                if (match == "=") {
                                    if (waarde == val) {
                                        a.push(dataset);
                                    }
                                }
                                //smaller than
                                if (match == "<") {
                                    if (waarde < val) {
                                        a.push(dataset);
                                    }
                                }
                                //smaller than and equal
                                if (match == "<=") {
                                    if (waarde <= val) {
                                        a.push(dataset);
                                    }
                                }
                                //bigger than
                                if (match == ">") {
                                    if (waarde > val) {
                                        a.push(dataset);
                                    }
                                }
                                //bigger than and equal
                                if (match == ">=") {
                                    if (waarde >= val) {
                                        a.push(dataset);
                                    }
                                }
                                //fuzzy
                                if (match == "~") {

                                    var re = new RegExp(val, "i"); //caseinsensitive
                                    if (waarde.search(re) != -1) {
                                        a.push(dataset);
                                    }
                                }

                            }

                        }
                        else {
                            console.log('property \'' + prop + '\' niet gevonden in object');
                        }
                    }
                );

            } else {
                throw new Error('argumenten prop en val zijn verplicht en mogen niet leeg zijn');
            }
            //console.log("exit aantal:" + a.length);

            return a;
        },

        getDatasetsByPropertyRegex: function (aData, prop, val) {
            /*
             * return Array of Objects, volgens één bepaalde property, String, GEEN EXACTE MATCH
             * werkt enkel met String types
             * gebruikt een regex expression
             *
             * aData: Array met profielen, voor eventuele recursie
             * @prop: string, verplicht
             * @val: string/number,boolean, verplicht
             * */


            if (typeof val !== "string") {
                throw new Error("deze method accepteert enkel String waarden");
            }
            else {
                var a = [];
                if (val == "") {
                    //lege waarde == leeg Array
                    return a;
                }
                if (single.isArray(aData) && arguments.length == 3 && typeof prop !== "undefined" && prop !== "") {

                    var re = new RegExp(val);

                    $.each(aData, function (i, dataset) {
                        if (dataset[prop]) {
                            if (dataset[prop].search(re) != -1) {
                                a.push(dataset);
                            }
                        }
                        else {
                            console.log('property \'' + prop + '\' niet gevonden in object');
                        }
                    });

                } else {
                    throw new Error('argumenten prop en val zijn verplicht en mogen niet leeg zijn');
                }
                return a;
            }

        },

        getDatasetsByConditions: function (oMap) {
            /*
             * return Array of Objects, volgens meerdere properties,
             * @oMap: Object(key, value)
             *   key = property
             *   value = exacte waarde
             *  stuurt door naar getDatasetsByProperty die de property tegen de waarde checkt en een array returned
             * */
            var filterArray = single.flexidata; //start vanaf alle profielen
            //console.log(oMap);

            if (single.isObject(oMap)) {
                for (var key in oMap) {
                    //console.log("getDatasetsByConditions:", "key: " + key + ", waarde: " + oMap[key].waarde + ", match: " + oMap[key].match);
                    // getDatasetsByProperty: function (aProfielen, prop, val, match) {

                    filterArray = single.getDatasetsByProperty(filterArray, key, oMap[key].waarde, oMap[key].match); //recursieve filtering //exacte match
                    //console.log (filterArray.length);
                }
                return filterArray;
            }
            else {
                return []
            }

        },

        getDatasetsByConditionsFuzzy: function (oMap) {
            /*
             * return Array of Objects, volgens meerdere properties,
             * @oMap: Object(key, value)
             *   key = property
             *   value = fuzzy voor Strings
             *
             * */
            var filterArray = single.flexidata; //start vanaf alle data

            if (single.isObject(oMap)) {
                for (var key in oMap) {

                    filterArray = single.getDatasetsByProperty(filterArray, key, oMap[key]); //recursie //exacte match
                }
                return filterArray;
            }
            else {
                return []
            }

        },

        //================== wrapper search methods ============================

        login: function (email, pw) {
            /*wrapper voor   getIdByEmailPassword()
             * */
            return single.getIdByEmailPassword(email, pw);

        },

        getDatasetById: function (val) {
            /* Wrapper voor getProfilesByProperty
             * return Array with single object*/
            return single.getDatasetsByProperty(single.flexidata, '_id', val, "=");
        },


        //================== aanmaken/update/delete van dataset ============================

        createDataset: function (new_dataset) {
            /*
             * creates a new profile

             * @new_dataset: Object, without id
             *  return nieuwe dataset / false
             * */
            if (single.isObject(new_dataset)) {

                var schema = {}; //niet meer op basis van vast schema: vrij
                //console.log(new_profile);
                var aidee = single.genKey(); //maak key aan
                //console.log(aidee);
                schema._id = aidee;
                single.mergeDatasets(new_dataset, schema);//merge nieuw dataset met (leeg) schema
                single.flexidata.push(schema);
                return single.getDatasetById(aidee); //return new profile
            }
            else return false;
        },

        updateDataset: function (_id, updateDataset) {
            /*
             * updates a Profile
             * @_id: String, _id key
             * @updateDataset: Object, the updates to be done
             * return updated dataset /false
             * */
            var origDatasetArray = single.getDatasetById(_id);
            //leeg?
            if (origDatasetArray.length != 0) {
                var origDataset = origDatasetArray[0];
                single.mergeDatasets(updateDataset, origDataset);
                console.log("Dataset '" + _id + "' geupdate;");
                return single.getDatasetById(_id); //return updated dataset
            }
            else {
                console.log("_id '" + _id + "' niet gevonden;")
                return false;
            }
        },

        deleteDataset: function (_id) {
            /*
             *removes a Dataset bij _id
             * @_id: String, _id key
             * return void
             * */
            //console.log('deleteDataset:' + _id);
            var found = false;
            var idx = null;

            for (var i = 0; i < single.flexidata.length; i++) {
                //console.log(single.flexidata[i]['_id']);

                if (single.flexidata[i]['_id'] == _id) {
                    idx = i;
                    found=true;
                    break;
                }
            }

            if (found == false) {
                console.log('dataset met _id \'' + _id + '\' niet gevonden');
            }
            else {
                single.flexidata.splice(idx, 1);
                console.log('dataset met _id \'' + _id + '\' werd verwijderd');
            }
            return found;
        },


        //================== varia ============================

        genKey: function () {
            /*
             * wrapper voor genarateHexString*/
            return single.generateHexString(24);
        },

        generateHexString: function (length) {
            /*
             * eenvoudige WEP key generator
             * @length: aantal digits
             * */
            var ret = "";
            while (ret.length < length) {
                //ret += Math.random().toString(16).substring(2);
                ret += Math.floor(Math.random() * 16777215).toString(16);
            }
            return ret.substring(0, length);
        },

        isObject: function (iets) {
            //correcte test voor objecten, return boolean
            return (iets && typeof iets === 'object');
        },

        isArray: function (iets) {
            //correcte test voor arrays, return boolean
            return (iets && typeof iets === 'object' && iets.constructor === Array)
        },
        isNumber: function (value) {
            //ultieme test voor getallen, return boolean
            return typeof value === 'number' && isFinite(value); //isFinite=geldige JS functie
        },
        mergeDatasets: function (updateObj, profObj) {
            /*
             overschrijft alle properties van setObj met optObj, recursief
             @updateObj		object, de doorgegeven updates
             @profObj		profile object, het te wijzigen profielobj
             return profObj
             */
            if (updateObj && profObj && single.isObject(updateObj)) {
                for (var key in updateObj) {
                    //bestaat de key in de dataset?
                    //enkel updates indien prop bestaat in dataset
                    //AANPASSEN/ HOEFT NIET MEER
                    //_id kan niet geupdate worden
                    //if (key != "_id" && profObj.hasOwnProperty(key)) {
                    if (key != "_id") {
                        profObj[key] = updateObj[key];
                    }
                }

                //return profObj;
            } else {
                throw new Error('mergeDataset: argumenten tekort');
            }
        },

        enumerate: function (o) {
            /*
             * return string van key: value waarden van properties van een object, recursief
             * dependency isObject
             * */

            var strProps = "";
            if (single.isObject(o)) {
                for (var key in o) {
                    if (o.hasOwnProperty(key)) { //geen inherited props
                        if (single.isObject(o[key])) {
                            strProps += key + " : " + single.enumerate(o[key]);
                        }
                        else {
                            strProps += " " + key + " : " + o[key] + ",";
                        }
                    }
                }
            }
            else {
                throw new Error("geen object")
            }
            return strProps;
        },

        makeList: function (domEl, aData) {
            /*
             * appends list to anchor element from data
             * @ domEl: JQ el, verplicht
             * @ aData: array van profielobjecten, verplicht
             */
            var data = (single.isArray(aData)) ? aData : [];
            var uul = $('<ul>');
            $.each(data, function (i, dataset) {
                uul.append('<li>' + single.enumerate(dataset) + '</li>');
            });
            $(domEl).append(uul);
        },
		
        saveJSON: function(){
			var today = new Date();
            var dd = today.getDate();
			dd = (today.getDate()<10?'0':'')+dd;
            var mm = today.getMonth()+1; //januari begint vanop nul
			mm = ((today.getMonth()+1)<10?'0':'')+mm;
            var yyyy = today.getFullYear();
			var h = (today.getHours()<10?'0':'') + today.getHours();
			var m = (today.getMinutes()<10?'0':'') + today.getMinutes();
			today = yyyy+mm+dd+'_'+h+m;
			$.ajax({
			  url: "./php/writescript.php",
			  type: "post",
			  data: {inhoud: JSON.stringify(JSON.parse(localStorage.getItem('flexidata'))), vandaag: today},
			});
			console.log('saveJSON done');		
		
	}		

        //=========== end singleton ================
    }

    single.init();

    return single;

})(window.jQuery, 'js/profielen.json')

/*
 * jQuery moet geladen voor deze lib
 * json bestand bepaalt het soort data
 *
 * */



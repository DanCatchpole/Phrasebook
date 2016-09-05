var MongoClient = require('mongodb').MongoClient;

var types = require("./types");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/phrasebook');

console.log("[SETUP] Starting setup for Phrasebook");

types.Language.count({shortened: "fra"}, (err, count) => {
    if (count == 0) {
        var fra = new types.Language({language: "Français", shortened: "fra", hello: "Bonjour"});
        fra.save((err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Created Language FRA");
            }
        });
    }
});

types.Language.count({shortened: "ger"}, (err, count) => {
    if (count == 0) {
        var ger = new types.Language({language: "Deutsch", shortened: "ger", hello: "Hallo"});
        ger.save((err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Created Language GER");
            }
        });
    }
});

types.Language.count({shortened: "spa"}, (err, count) => {
    if (count == 0) {
        var spa = new types.Language({language: "Espagnol", shortened: "spa", hello: "Hola"});
        spa.save((err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Created Language SPA");
            }
        });
    }
});

types.Language.count({shortened: "ita"}, (err, count) => {
    if (count == 0) {
        var ita = new types.Language({language: "Italiano", shortened: "ita", hello: "Ciao"});
        ita.save((err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Created Language ITA");
            }
        });
    }
});

types.Language.count({shortened: "ire"}, (err, count) => {
    if (count == 0) {
        var ire = new types.Language({language: "Gaeilge", shortened: "ire", hello: "Dia duit"});
        ire.save((err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Created Language IRE");
            }
        });
    }
});

mongoose.connection.close();
console.log("[SETUP] Setup Complete")

"use strict";
var types = require('../types');

class LanguageManager {
    // callback(error, languages);
    getAllLanguages(callback) {
        var query = types.Language.find({});
        query.exec(callback);
    }

    getLanguageByShortened(shortened, cb) {
        let query = types.Language.findOne({shortened: shortened});
        query.exec((err, lang) => {
            if(err) {
                console.log(err);
            }
            cb(lang);
        });

    }
}

module.exports = LanguageManager

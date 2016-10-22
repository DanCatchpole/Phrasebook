"use strict";
var types = require('../types');

class LanguageManager {
    // callback(error, languages);
    getAllLanguages(callback) {
        var query = types.Language.find({});
        query.exec(callback);
    }
}

module.exports = LanguageManager

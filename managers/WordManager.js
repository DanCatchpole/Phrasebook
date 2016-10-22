"use strict";

var types = require('../types');

class WordManager {

    getWordsInCategoryById(categoryID, callback) {
        let query = types.Word.find({category: id}).sort({word: 1});
        query.exec(callback);
    }

    /* Will callback 'true' if the word is added successfully, or 'false' if not
     * word: The 'foreign' version of a word
     * username: The username for the User who created the word
     * language: Which language it is in
     * translations: An array of Strings representing the 'English' versions of the word
     * categoryID: The category to insert the word into
     */
    createWord(word, username, language, translations, categoryID, callback) {
        exports.checkIfWordExistsInCategory(word, categoryID, (err, exists) => {
            if (!exists) {
                let newWord = new types.Word({word: word, username: username, language: language, translations: translations, category: categoryID});
                newWord.save((err) => {
                    callback(err, true);
                })
            } else {
                callback(err, false);
            }
        });
    };

    checkIfWordExistsInCategory(word, category, callback) {
        var query = types.Word.find({word: word, category: category});
        query.exec((err, words) => {
            if (words.length == 0) {
                callback(err, false);
            } else {
                callback(err, true);
            }
        });
    };
}

module.exports = WordManager;

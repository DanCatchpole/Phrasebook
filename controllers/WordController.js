"use strict";
var constants = require("../constants");
var {categoryManager, wordManager, userManager, languageManager} = require('../instantiatemanagers');
var types = require("../types");
var utils = require("../utils");

class WordController {
    createWord(req, res) {
        var categoryID = req.query.c;
        if (categoryID) {
            if (req.session.username) {
                categoryManager.getCategory(categoryID, (category) => {
                    if (category) {
                        res.render('newword', { title: `New Word (${category.name})`, maintitle: `New Word (${category.name})`, u: req.session.user, selected: "category" + categoryID, s: req.session, categoryID: categoryID, categoryName: category.name});
                    } else {
                        res.redirect(constants.URL);
                    }
                });
            } else {
                res.redirect(constants.URL + "/logout");
            }
        } else {
            res.redirect(constants.URL);
        }
    }

    createWordPOST(req, res) {
        var word = req.body.word;
        var translations = req.body.translations;
        var categoryID = req.body.categoryID;
        var categoryName = req.body.categoryName;

        var actualTrans = translations.split(',');

        if (word != "" && translations != "" && actualTrans.length != 0) {
            wordManager.createWord(word, req.session.username, req.session.currentlanguage.shortened, actualTrans, categoryID, (done) => {
                res.redirect(constants.URL + "/category?c=" + categoryID);
            });
        } else {
            res.redirect(constants.URL + "/category?c=" + categoryID);
        }
    }

    allWords(req, res) {
        if(req.session.username) {
            wordManager.getAllWordsForUserInLanguage(req.session.username, req.session.currentlanguage.shortened, (words) => {

                res.render('allwords', { title:"All Words", u: req.session.user, selected: "allwords", s: req.session, words: JSON.parse(JSON.stringify(words))});
            });
        } else {
            res.redirect(constants.URL + "/logout");
        }
    }

    search(req, res) {
        var sess = req.session;
        var query = req.body.search;
        var category = req.body.category;
        var username = req.body.username;
        var short = req.body.short;
        if (category) {
            var q = types.Word.find({username: username, category: category, language: short, $or: [{translations: {"$regex": query, "$options": "i"}}, {word: {"$regex": query, "$options": "i"}}]}).sort({'word': 1});
        } else {
            var q = types.Word.find({username: username, language: short, $or: [{translations: {"$regex": query, "$options": "i"}}, {word: {"$regex": query, "$options": "i"}}]}).sort({'word': 1});
        }
        q.exec(function(err, wordObjs) {
            if (err) {
                console.log(err);
            } else {
                res.send(wordObjs);
            }
        });
    }
}

module.exports = WordController;

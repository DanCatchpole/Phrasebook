var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var types = require('../types');

const appName = 'Phrasebook';

/* All of these are in the /phrasebook/app/words/ directory */

router.post("search", (req, res) => {
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
});



router.get("new", (req, res) => {
    var sess = req.session;
    var categoryID = req.query.c;
    if (categoryID) {
        if (sess.username) {
            types.Word.find({username: sess.username}, function(err, wordObjs) {
                if (err) {
                    console.log(err);
                } else {
                    types.Category.findOne({ _id: categoryID }, (err, category) => {
                        if (category) {
                            res.render('newword', { title: appName + ` - New Word (${category.name})`, maintitle: `New Word (${category.name})`, u: sess.user, selected: "category" + categoryID, s: sess, categoryID: categoryID, categoryName: category.name});
                        } else {
                            res.redirect("/phrasebook/app");
                        }
                    });
                }
            });
        } else {
            res.redirect("/phrasebook/logout");
        }
    } else {
        res.redirect('/phrasebook/app');
    }
});

// Respond to a new word POST request
router.post("new", (req, res) => {
    var sess = req.session;
    var word = req.body.word;
    var translations = req.body.translations;
    var categoryID = req.body.categoryID;
    var categoryName = req.body.categoryName;

    var actualTrans = translations.split(',');
    // var Word = mongoose.model('Word', {word: String, language: String, translations: Array});

    if (word != "" && translations != "" && actualTrans.length != 0) {
        types.Word.find({ word: word, username: sess.username, language: sess.currentlanguage.shortened }, (err, words) => {
            if (words.length == 0) {
                var w = new types.Word({word: word, username: sess.username, language: sess.currentlanguage.shortened, translations: actualTrans, category: categoryID, catName: categoryName});
                w.save(function (err) {
                    if (err) {
                        console.log(err);
                        res.redirect("/phrasebook/app");
                    } else {
                        res.redirect("/phrasebook/app/category?c=" + categoryID);
                    }
                });
            } else {
                res.redirect('back');
            }
        })
    }
});


module.exports = {
    router: router
};

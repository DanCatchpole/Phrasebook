var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var types = require('../types');

var Phrasebook = require('../app');

/* All of these are in the /phrasebook/app/category/ directory */

router.get('/', (req, res) => {
    var sess = req.session;
    var id = req.query.c;
    if (sess.username) {
        types.Category.findOne({ _id: id }, (err, category) => {
            if (err) {
                console.log(err);
            } else if (category.language == sess.currentlanguage.shortened) {
                var query = types.Word.find({ category: id }).sort({'word': 1});
                query.exec((err, words) => {
                    res.render('category', { title: appName + " - Category", u: sess.user, selected: "category"+id, s: sess, current: category, words: words });
                });
            } else {
                res.redirect('/phrasebook/app');
            }
        });
    } else {
        res.redirect("/phrasebook/login");
    }
});



router.get('new', (req, res) => {
    var sess = req.session;

    if (sess.username) {
        // console.log(req.session.categories);
        res.render('newcategory', { title: appName + " - New Category", u: sess.user, selected: "newcategory", s: sess });
    } else {
        res.redirect('/phrasebook/login')
    }
});

router.post('new', (req, res) => {
    var sess = req.session;
    var name = req.body.category;
    var short = req.body.shortened;
    // var Category = mongoose.model('Category', {name: String, shortened: String, language: String, username: String});

    var c = new types.Category({ name: name, shortened: short, language: sess.currentlanguage.shortened, username: sess.username, words: 0 });
    c.save(function (err) {
        if (err) {
            console.log(err);
            res.redirect("/phrasebook/app");
        } else {
            res.redirect("/phrasebook/app");
        }
    });

});


router.get('quiz', (req, res) => {
    var id = req.query.c;
    if (req.session.user && id) {
        var q = types.Category.count({username: res.session.user.username, _id: id});
        q.exec((err, counter) => {
            if (err) {
                console.log(err);
            } else if (counter == 1) {
                var r = types.Word.find({username: res.session.user.username, category: id});
                r.exec((err, words) => {
                    if (err) {
                        console.log(err);
                    } else if (words.length > 0) {
                        while (words.length > 10) {
                            var index = Math.floor(Math.random() * words.length);
                            words.splice(index, 1);
                        }
                        res.render('catquiz', {title: appName + " - Quiz", u: req.session.user, selected: "category" + categoryID, s: req.session, words: words});
                    } else {
                        res.redirect("/phrasebook/category?c=" + id);
                    }
                });
            } else {
                res.redirect("/phrasebook/app");
            }
        });
    } else {
        res.redirect("/phrasebook/app");
    }
});

module.exports = {
    router: router
};

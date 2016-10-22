"use strict";
var constants = require("../constants");
var types = require("../types");
var {categoryManager, wordManager, userManager, languageManager} = require('../instantiatemanagers');

class OverviewController {
    getMainPage(req, res) {
        if (req.session.username) {
            var query = types.Word.find({username: req.session.username}).sort({_id: -1}).limit(10);
            query.exec((err, words) => {
                if (err) {
                    console.log(err);
                    res.redirect(constants.URL + '/logout');
                } else {
                    res.render('app', {title: "Home", maintitle: `${req.session.currentlanguage.hello}!`, u: req.session.user, selected: "overview", s: req.session, w: words})
                }
            });
        } else {
            res.render('notloggedin', {});
        }
    }

    error404(req, res) {
        res.render('error404', {});
    }
}

module.exports = OverviewController;

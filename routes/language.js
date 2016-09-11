var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var types = require('../types');

var Phrasebook = require('../app');

/* All of these are in the /phrasebook/app/language/ directory */

router.get('change', (req, res) => {
    var sess = req.session;

    if (sess.username) {
        res.render('changelanguage', { title: appName + " - Home", u: sess.user, selected: "languagechange", s: sess });
    } else {
        res.redirect("/phrasebook/logout");
    }
});



module.exports = {
    router: router
};

"use strict";
var constants = require("../constants");
var {categoryManager, wordManager, userManager, languageManager} = require('../instantiatemanagers');
var utils = require("../utils");
class LanguageController {
    changeLanguage(req, res) {
        var short = req.query.langShort;
        if (req.session.username) {
            languageManager.getLanguageByShortened(short, (lang) => {
                if (lang) {
                    userManager.getUser(req.session.username, (user) => {
                        if (user) {
                            user.languages.forEach(elem => {
                                if (elem.shortened == short) {
                                    req.session.currentlanguage = elem;
                                    req.session.save();
                                    utils.refreshCategoryLists(req, res, () => {
                                        res.redirect('back');
                                    });
                                }
                            });
                        } else {
                            // No such user logged in
                            res.redirect(constants.URL + "/logout");
                        }
                    });
                } else {
                    // No such language
                    res.redirect('back');
                }
            });
        } else {
            res.redirect(constants.URL + '/logout');
        }

    }
}

module.exports = LanguageController;

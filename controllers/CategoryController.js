"use strict";
var constants = require("../constants");
var {categoryManager, wordManager, userManager, languageManager} = require('../instantiatemanagers');
var types = require("../types");
var utils = require("../utils");
class CategoryController {
    createCategory(req, res) {
        if (req.session.username) {
            res.render('newcategory', { title: "New Category", u: req.session.user, selected: "newcategory", s: req.session });
        } else {
            res.redirect(constants.URL + '/login')
        }
    }

    createCategoryPOST(req, res) {
        var name = req.body.category;
        var short = req.body.shortened;
        categoryManager.createCategory(name, short, req.session.currentlanguage.shortened, req.session.username, () => {
            utils.refreshCategoryLists(req, res, () => {
                res.redirect(constants.URL);
            })
        })
    }

    getCategory(req, res) {
        var sess = req.session;
        var id = req.query.c;
        if (sess.username) {
            categoryManager.getCategory(id, (category) => {
                if (category.language == sess.currentlanguage.shortened) {
                    wordManager.getWordsInCategoryById(id, (words) => {
                        res.render('category', { title: `Category (${category.name})`, u: sess.user, selected: "category" + id, s: sess, current: category, words: words });
                    });
                } else {
                    res.redirect(constants.URL + '/category/list');
                }
            });
        } else {
            // Not logged in
            res.redirect(constants.URL + "/login");
        }
    }

    allCategories(req, res) {
        var sess = req.session;
        if (sess.username) {
            languageManager.getLanguageByShortened(sess.currentlanguage.shortened, (lang) => {
                if (lang) {
                    res.render('categories', { title: "Home", u: sess.user, selected: "categories", s: sess});
                }
            });
        } else {
            res.redirect(constants.URL + "/logout");
        }
    }

    pinCategory(req, res) {
        var id = req.query.c;
        var p = req.query.p;
        if (req.session.user && id) {
            categoryManager.pinCategory(id, p, (done) => {
                utils.refreshCategoryLists(req, res, (next) => {
                    res.redirect(constants.URL + "/category?c=" + id);
                });
            });
        } else {
            res.redirect(constants.URL + "/");
        }
    }

}

module.exports = CategoryController;

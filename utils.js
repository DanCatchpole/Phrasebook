var constants = require('./constants');
var {categoryManager, wordManager, userManager} = require('./instantiatemanagers.js');
var types = require('./types');
var async = require('async');

exports.genLoggedInTemplateDetails = (page, username, req) => {
    var object = {
        title: `${constants.APPNAME} - ${page}`,
        session: req.session,
        user: req.session.user

    };
    return object;
}

exports.refreshCategoryLists = (req, res, next) => {

    if(req.session.username && req.session.currentlanguage) {
        var query = types.Category.find({username: req.session.username, language: req.session.currentlanguage.shortened}).sort({"pinned": -1, "_id": 1});
        query.exec((err, cats) => {
            if (err) {
                next(err);
            } else if (cats) {
                async.each(cats, (elem, cb) => {
                    var cQuery = types.Word.count({username: req.session.username, language: req.session.currentlanguage.shortened, category: elem._id});
                    cQuery.exec((err, c) => {
                        if (err) {
                            cb(err);
                        } else {
                            elem.words = c;
                            cb();
                        }
                    });
                }, (err) => {
                    if (err) {
                        next(err);
                    } else {
                        req.session.categories = cats;
                        next();
                    }
                });
            } else {
                next();
            }
        });
    } else {
        next();
    }
}

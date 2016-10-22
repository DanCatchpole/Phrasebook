"use strict";

var types = require('../types');


class CategoryManager {

    createCategory(categoryName, shortened, language, username, cb) {
        let newCategory = new types.Category({name: categoryName, shortened: shortened, language: language, username: username, words: 0, pinned: false});
        newCategory.save((err) => {
            if (err) {
                console.log(err);
            }
            cb();
        });
    }

    getCategoriesForUserInLanguage(username, language, callback) {
        let query = types.Category.find({username: username, language: language}).sort({pinned: -1, _id: 1});
        query.exec(callback);
    }

    categoryExists(categoryID, callback) {
        let query = types.Category.findOne({_id: id});
        query.exec((err, category) => {
            if (category) {
                callback(err, true);
            } else {
                callback(err, false);
            }
        });
    }

    getCategory(id, cb) {
        let query = types.Category.findOne({_id: id});
        query.exec((err, cat) => {
            if (err) {
                console.log(err);
            }
            cb(cat);
        });
    }

    pinCategory(id, pinned, cb) {
        if (pinned) {
            var query = types.Category.update({_id: id}, {$set: {pinned: true}});
        } else {
            var query = types.Category.update({_id: id}, {$set: {pinned: false}});
        }

        query.exec((err) => {
            if (err) {
                console.log(err);
                cb(false);
            } else {
                cb(true);
            }
        })

    }

}

module.exports = CategoryManager;

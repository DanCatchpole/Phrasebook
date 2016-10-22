"use strict";

var types = require('../types');


class CategoryManager {

    createCategory(categoryName, shortened, language, username, callback) {
        let newCategory = new types.Category({name: categoryName, shortened: shortened, language: language, username: username, words: 0, pinned: false});
        newCategory.save(callback);
    }

    getCategoriesForUserInLanguage(username, language, callback) {
        let query = types.Category.find({username: username, language: language}).sort({pinned: -1, _id: 1});
        query.exec(callback);
    }

}

module.exports = CategoryManager;

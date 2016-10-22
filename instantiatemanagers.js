var CategoryManager = require('./managers/CategoryManager');
var WordManager = require('./managers/WordManager');
var UserManager = require('./managers/UserManager');
var LanguageManager = require('./managers/LanguageManager');

exports.categoryManager = new CategoryManager();
exports.wordManager = new WordManager();
exports.userManager = new UserManager();
exports.languageManager = new LanguageManager();

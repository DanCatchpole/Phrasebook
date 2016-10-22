var CategoryController = require('./controllers/CategoryController');
var OverviewController = require('./controllers/OverviewController');
var AuthenticationController = require('./controllers/AuthenticationController');
var LanguageController = require('./controllers/LanguageController');
var WordController = require('./controllers/WordController');
var MiddlewareController = require('./controllers/MiddlewareController');

exports.categoryController = new CategoryController();
exports.overviewController = new OverviewController();
exports.authController = new AuthenticationController();
exports.languageController = new LanguageController();
exports.wordController = new WordController();
exports.middlewareController = new MiddlewareController();

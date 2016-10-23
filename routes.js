var router = require('express').Router();
var constants = require("./constants");
var {categoryController, overviewController, authController, languageController, wordController, middlewareController} = require('./instantiatecontrollers');

// Middleware
router.use(middlewareController.interceptRender);
router.use(middlewareController.refreshUserDetails);
// router.use(middlewareController.refreshCategoryLists);
router.use(middlewareController.firstLogin);

// Login
router.get('/login', authController.getLoginPage);
router.post('/login', authController.postLogin);

// Logout
router.get('/logout', authController.logout);

// Register
router.get('/register', authController.getRegisterPage);
router.post('/register', authController.postRegister);

// Main page
router.get('/', overviewController.getMainPage);

// Category things
router.get('/category', categoryController.getCategory);
router.get('/category/new', categoryController.createCategory);
router.post('/category/new', categoryController.createCategoryPOST);
router.get('/category/list', categoryController.allCategories);
router.get('/category/pin', categoryController.pinCategory);

// Language things
router.post('/language/new', languageController.addLanguage);
router.get('/language/change', languageController.changeLanguage);

// Word things
router.get('/words/new', wordController.createWord);
router.post('/words/new', wordController.createWordPOST);
router.get('/words/all', wordController.allWords);
router.post('/words/search', wordController.search);
router.post('/words/star', wordController.toggleStar);
router.post('/words/update', wordController.updateWord);

// Error 404
router.get('/404', overviewController.error404);
router.use((req, res, next) => {
    res.redirect(constants.URL + "/404");
});



exports.router = router;

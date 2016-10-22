var router = require('express').Router();
var {categoryController, overviewController, authController, languageController, wordController, middlewareController} = require('./instantiatecontrollers');

// Middleware
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
router.get('/', overviewController.getMainPage); // TODO

// Category things
// router.get('/category', categoryController.getCategory); // TODO
// router.get('/category/new', categoryController.createCategory); // TODO
// router.get('/category/list', categoryController.allCategories); // TODO
// router.get('/category/pin', categoryController.pinCategory); // TODO

// Language things
// router.get('/language/new', languageController.addLanguage); // TODO
// router.get('/language/change', languageController.changeLanguage); // TODO

// Word things
// router.get('/words/new', wordController.createWord); // TODO
// router.post('/words/new', wordController.postNewWord); // TODO
// router.get('/words/all', wordController.allWords); // TODO

router.get('/404', overviewController.error404);
// Error 404
router.use((req, res, next) => {
    res.redirect("/phrasebook/404");
});



exports.router = router;

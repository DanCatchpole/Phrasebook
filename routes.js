var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var types = require('./types');
// mongoose.connect('mongodb://localhost:27017/phrasebook');

const appName = 'Phrasebook';

// Port the server will be running on
const PORT = 2907;

// Models for the database



router.get('/', (req, res) => {
    res.redirect("/phrasebook/app");
});




// When the user requests the app directory
router.get('/app', (req, res) => {
    var sess = req.session;

    if (sess.username) {
        // Find a user with this username
        types.Language.findOne({shortened: sess.currentlanguage.shortened}, function(err, langObj) {
            if (err) {
                console.log(err);
            } else if (langObj) {
                var q = types.Word.find({username: sess.username}).sort({_id: -1}).limit(10);
                q.exec((err, words) => {
                    res.render('app', { title: appName + " - Home", maintitle: `${langObj.hello} ${sess.user.firstname}!`, u: sess.user, selected: "overview", s: sess, w: words});
                });
            }
        });
    } else {
        res.redirect("/phrasebook/logout");
    }
});


router.get("/app/newlanguage", (req, res) => {
    var sess = req.session;

    if (sess.username) {
        // Find a user with this username
        res.render('newLanguage', { title: appName + " - New Language", maintitle: "Add a new Language", u: sess.user, selected: "newlanguage", s: sess });
    } else {
        res.redirect("/phrasebook/login");
    }

});

router.get('/app/category', (req, res) => {
    var sess = req.session;
    var id = req.query.c;
    if (sess.username) {
        types.Category.findOne({ _id: id }, (err, category) => {
            if (err) {
                console.log(err);
            } else if (category.language == sess.currentlanguage.shortened) {
                var q = types.Word.find({ category: id }).sort({'word': 1});
                q.exec((err, words) => {
                    res.render('category', { title: appName + " - Category", u: sess.user, selected: "category"+id, s: sess, current: category, words: words });
                });
            } else {
                res.redirect('/phrasebook/app');
            }
        });
    } else {
        res.redirect("/phrasebook/login");
    }
});

router.get("/app/categories", (req, res) => {
    var sess = req.session;

    if (sess.username) {
        types.Language.findOne({shortened: sess.currentlanguage.shortened}, function(err, langObj) {
            if (err) {
                console.log(err);
            } else if (langObj) {
                res.render('categories', { title: appName + " - Home", maintitle: `${langObj.hello} ${sess.user.firstname}!`, u: sess.user, selected: "categories", s: sess});
            }
        });
    } else {
        res.redirect("/phrasebook/logout");
    }
});


router.get('/app/language/change', (req, res) => {
    var sess = req.session;

    if (sess.username) {
        // Find a user with this username
        types.Language.findOne({shortened: sess.currentlanguage.shortened}, function(err, langObj) {
            if (err) {
                console.log(err);
            } else if (langObj) {
                res.render('changelanguage', { title: appName + " - Home", maintitle: `${langObj.hello} ${sess.user.firstname}!`, u: sess.user, selected: "languagechange", s: sess });
            }
        });
    } else {
        res.redirect("/phrasebook/logout");
    }
});

router.get('/app/category/new', (req, res) => {
    var sess = req.session;

    if (sess.username) {
        // console.log(req.session.categories);
        res.render('newcategory', { title: appName + " - New Category", u: sess.user, selected: "newcategory", s: sess });
    } else {
        res.redirect('/phrasebook/login')
    }
});

router.post('/app/category/new', (req, res) => {
    var sess = req.session;
    var name = req.body.category;
    var short = req.body.shortened;
    // var Category = mongoose.model('Category', {name: String, shortened: String, language: String, username: String});

    var c = new types.Category({ name: name, shortened: short, language: sess.currentlanguage.shortened, username: sess.username, words: 0 });
    c.save(function (err) {
        if (err) {
            console.log(err);
            res.redirect("/phrasebook/app");
        } else {
            res.redirect("/phrasebook/app");
        }
    });

});


/**               LOGIN SECTION               **/

router.get('/login', (req, res) => {
    if (req.session.username == null || req.session.username == "") {
        res.render('login', { title: appName + ' - Login', s: req.session, error: ""});
    } else {
        res.redirect("/phrasebook/app");
    }
});


// If we recieve a login request (POST @ /login)
router.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    var sess = req.session;

    types.User.findOne({username: username}, function(err, userObj) {
        if (err) {
            console.log(err);
        } else if (userObj) {
            bcrypt.compare(password, userObj.password, function (err, result) {
                if (result) {
                    sess.username = userObj.username;
                    sess.currentlanguage = userObj.languages[0];
                    res.redirect("/phrasebook/app");
                } else {
                    res.render('login', { title: appName + ' - Login', s: req.session, error: "Sorry, incorrect username or password"});
                }
            });
        } else {
            res.render('login', { title: appName + ' - Login', s: req.session, error: "Sorry, incorrect username or password"});
        }
    });
});

router.get("/app/words/search", (req, res) => {
    var sess = req.session;
    var query = req.query.search;
    var username = req.query.username;
    var short = req.query.short;
    var q = types.Word.find({username: username, language: short, $or: [{translations: {"$regex": query, "$options": "i"}}, {word: {"$regex": query, "$options": "i"}}]}).sort({'word': 1});
    q.exec(function(err, wordObjs) {
        if (err) {
            console.log(err);
        } else {
            res.send(wordObjs);
        }
    });
});



router.get("/app/words/new", (req, res) => {
    var sess = req.session;
    var categoryID = req.query.c;
    if (categoryID) {
        if (sess.username) {
            types.Word.find({username: sess.username}, function(err, wordObjs) {
                if (err) {
                    console.log(err);
                } else {
                    types.Category.findOne({ _id: categoryID }, (err, category) => {
                        if (category) {
                            res.render('newword', { title: appName + ` - New Word (${category.name})`, maintitle: `New Word (${category.name})`, u: sess.user, selected: "category" + categoryID, s: sess, categoryID: categoryID, categoryName: category.name});
                        } else {
                            res.redirect("/phrasebook/app");
                        }
                    });
                }
            });
        } else {
            res.redirect("/phrasebook/logout");
        }
    } else {
        res.redirect('/phrasebook/app');
    }
});

// Respond to a new word POST request
router.post("/app/words/new", (req, res) => {
    var sess = req.session;
    var word = req.body.word;
    var translations = req.body.translations;
    var categoryID = req.body.categoryID;
    var categoryName = req.body.categoryName;

    var actualTrans = translations.split(',');
    // var Word = mongoose.model('Word', {word: String, language: String, translations: Array});

    if (word != "" && translations != "" && actualTrans.length != 0) {
        types.Word.find({ word: word, username: sess.username, language: sess.currentlanguage.shortened }, (err, words) => {
            if (words.length == 0) {
                var w = new types.Word({word: word, username: sess.username, language: sess.currentlanguage.shortened, translations: actualTrans, category: categoryID, catName: categoryName});
                w.save(function (err) {
                    if (err) {
                        console.log(err);
                        res.redirect("/phrasebook/app");
                    } else {
                        res.redirect("/phrasebook/app/category?c=" + categoryID);
                    }
                });
            } else {
                res.redirect('back');
            }
        })
    }
});

// Respond to a changelanguage?langShort="<LANG>" request.
router.get("/app/changelanguage", (req, res) => {
    var short = req.query.langShort;
    if (req.session.username) {
        types.Language.findOne({ shortened: short }, function (err, langObj) {
            if (err) {
                console.log(err);
            } else if (langObj) {
                types.User.findOne({ username: req.session.username }, function (err, userObj) {
                    if (err) {
                        console.log(err);
                    } else if (userObj) {
                        userObj.languages.forEach(elem => {
                            if (elem.shortened == short) {
                                //console.log(elem);
                                req.session.currentlanguage = elem;
                                req.session.save();
                                res.redirect('back');
                                //break;
                            }
                        });
                    } else {
                        // No such user logged in
                        res.redirect("/phrasebook/logout");
                    }
                });
            } else {
                // No such language
                res.redirect('back');
            }
        });
    } else {
        res.redirect('/phrasebook/logout');
    }
});



/**               REGISTER SECTION               **/

// Render the REGISTER page
router.get('/register', (req, res) => {
    if (req.session.user_id == null) {
        res.render('register', {title: appName + " - Register", s: req.session, error: ""});
    } else {
        res.redirect("/phrasebook/app");
    }
});

// Handle a POST request to the REGISTER page
router.post('/register', (req, res) => {
    // Check if user is in database already
    // var username =
    var regUser = req.body;
    var username = regUser.username;
    var firstname = regUser.firstname;
    var lastname = regUser.lastname;
    var email = regUser.email;
    var password = regUser.password;
    var confirmpassword = regUser.confirmpassword;

    if (password != confirmpassword) {
        res.render('register', {title: appName + " - Register", s: req.session, error: "Sorry, the two passwords must be the same!"});
    } else {
        types.User.findOne({username : `${username}`}, function (err, userObj) {
            if (err) {
                console.log(err);
            } else if (userObj) {
                res.render('register', {title: appName + " - Register", s: req.session, error: "Sorry, this username is taken!"});
            } else {
                bcrypt.hash(password, null, null, function(err, hash) {
                    // by default they can have french
                    var french = new types.Language({ language: "Français", shortened: "fra", hello: "Bonjour", colour: "#1894a3" });
                    var newUser = new types.User({username: username, firstname: firstname, lastname: lastname, email: email, password: hash, description: "", profile_icon: "https://dcatcher.me/assets/userIcon.svg", languages: [french]});
                    newUser.save(function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect("/phrasebook/login");
                        }
                    });
                });
            }
        });
    }
});

// Handle incoming request to the ALL WORDS page
router.get("/app/words", (req, res) => {
    if (req.session.username && req.session.categories) {
        // Find a user with this username
        var q = types.Word.find({username: req.session.username, language: req.session.currentlanguage.shortened }).sort({'word': 1});
        q.exec(function(err, wordObjs) {
            if (err) {
                console.log(err);
            } else {
                res.render('allwords', { title: appName + " - All Words", u: req.session.user, selected: "allwords", s: req.session, words: wordObjs});
            }
        });
    } else {
        res.redirect("/phrasebook/logout");
    }
});


router.get("/app/sidebar", (req, res) => {
    var sidebar = req.query.sidebar;
    if (sidebar == "big" || sidebar == "small") {
        req.session.sidebar = sidebar;
    }
    res.send("Saved!");
});



// Handle requests to LOGOUT the user
router.get("/logout", (req, res) => {
    req.session.regenerate(function (err) {
        if (err) {
            console.log(err);
        }
        res.redirect("/phrasebook/login");
    });
});


// If the page hasn't been found - Error 404 => redirect to the login page
router.use((req, res, next) => {
    res.redirect("/phrasebook/login");
});


// Export the router to be used in the main app, and allow all models to be used there as well
module.exports = {
    router: router
};

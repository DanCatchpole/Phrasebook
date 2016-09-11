var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Variables!

exports.User = mongoose.model('User', Schema({username: String, firstname: String, lastname: String, email: String, password: String, description: String, profile_icon: String, languages: Array}));

// Category: name: Name of category, shortened: the shortened version of the category, language: the language of the category, username: the username who owns this category, words: number of words
exports.Category = mongoose.model('Category', Schema({name: String, shortened: String, language: String, username: String, words: String, pinned: Boolean}));

exports.Word = mongoose.model('Word', Schema({ word: String, username: String, language: String, translations: Array, category: String, catName: String }));
exports.Language = mongoose.model('Language', Schema({language: String, shortened: String, hello: String}));

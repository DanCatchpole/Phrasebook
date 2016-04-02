var mongoose = require('mongoose');
var Schema = mongoose.Schema;


exports.User = mongoose.model('User', Schema({username: String, firstname: String, lastname: String, email: String, password: String, description: String, profile_icon: String, languages: Array}));
exports.Category = mongoose.model('Category', Schema({name: String, shortened: String, language: String, username: String, words: String}));
exports.Word = mongoose.model('Word', Schema({ word: String, username: String, language: String, translations: Array, category: String, catName: String }));
exports.Language = mongoose.model('Language', Schema({language: String, shortened: String, hello: String, colour: String}));

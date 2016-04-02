var method = User.prototype;

function User(userID, username, firstname, lastname, email) {
    this._userID = userID;
    this._username = username;
    this._firstname = firstname;
    this._lastname = lastname;
    this._email = email;
}

method.getUserID = function() {
    return this._userID;
}

method.getUsername = function() {
    return this._username;
}

method.getFirstname = function() {
    return this._firstname;
}

method.getLastname = function() {
    return this._lastname;
}

method.getEmail = function() {
    return this._email;
}


module.exports = User;

var db = require("../db/db.json");
var path = require("path");
var fs = require("fs")

module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        res.json(notesArray);
    })
}
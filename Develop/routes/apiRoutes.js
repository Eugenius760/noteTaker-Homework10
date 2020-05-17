var notesArray = require("../db/db.json");
var path = require("path");
var fs = require("fs");

module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });

    app.post("/api/notes", function(req, res) {
        var newNote = req.body;
        notesArray.push(newNote);

        write(notesArray);
        res.json(notesArray);
    });

    app.delete("/api/notes/:id", function(req, res) {

        var theNote = req.params.id;
            for (i = 0; i < notesArray.length; i++) {
                if (theNote == notesArray[i].id) {
                    notesArray.splice(i, 1);
                }
            }
        write(notesArray);
        res.json(notesArray);
    });
}

function noteID(newNote) {
    for (i = 0; i < newNote.length; i++) {
        newNote[i].id = i + 1;
    }
}

function write(notesArray) {
    noteID(notesArray);
    fs.writeFile("./db/db.json", JSON.stringify(notesArray), function(err) {
        if (err) throw err;
        console.log("Note Taken!")
    })
}

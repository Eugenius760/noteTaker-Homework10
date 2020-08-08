var notesArray = require("../db/db.json");
var path = require("path");
var fs = require("fs");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.json(notesArray);
  });

  app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    notesArray.push(newNote);

    uniqueID(notesArray);

    fs.writeFile(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(notesArray),
      (err) => {
        if (err) {
          console.log("no note fam");
        } else {
          console.log("note's good fam");
        }
      }
    );
    res.json(newNote);
  });

  app.delete("/api/notes/:id", function (req, res) {
    var theNote = req.params.id;
    for (i = 0; i < notesArray.length; i++) {
      if (theNote == notesArray[i].id) {
        notesArray.splice(i, 1);
      }
    }
    uniqueID(notesArray);

    fs.writeFile(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(notesArray),
      (err) => {
        if (err) {
          console.log("no note fam");
        } else {
          console.log("note's good fam");
        }
      }
    );
    res.json(theNote);
  });
};

var uniqueID = function(arr) {
    for (i =0; i < arr.length; i++) {
        arr[i].id = i + 1;
    }
}

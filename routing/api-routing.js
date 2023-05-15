const fs = require("fs");
const path = require('path');

var uniqid = require("uniqid");

// routing
module.exports = function (app) {
  app.get("/api/notes", (req, res) => {
    console.log("notes app working");

    let data = fs.readFileSync(path.join(__dirname, "../db/db.json"),"utf8");

    res.json(JSON.parse(data));
  });
  app.post("/api/notes", (req, res) => {
    const newNote = {
      ...req.body,
      id: uniqid(),
    };

    let data = fs.readFileSync(path.join(__dirname, "../db/db.json"),"utf8");

    const dataJSON = JSON.parse(data);

    dataJSON.push(newNote);

    fs.writeFile(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(dataJSON),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
    res.json(data);
  });

  // deleting
  app.delete("/api/notes/:id", (req, res) => {
    let data = fs.readFileSync(path.join(__dirname, "../db/db.json"),"utf8");

    const dataJSON = JSON.parse(data);

    const newNotes = dataJSON.filter((note) => {
      return note.id !== req.params.id;
    });

    fs.writeFile(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(newNotes),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
    res.json(newNotes);
  });
};

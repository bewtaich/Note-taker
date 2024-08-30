const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notes", (req, res) => {
  const notes = require("./db/db.json");
  res.json(notes);
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.post("/api/notes", (req, res) => {
  fs.readFile(
    path.join(__dirname, "db", "db.json"),
    "utf-8",
    (err, jsonData) => {
      if (err) {
        console.error(err);
        return;
      }

      let notes = JSON.parse(jsonData);
      const newNote = { ...req.body, id: uuidv4() };
      notes.push(newNote);

      fs.writeFile(
        path.join(__dirname, "db", "db.json"),
        JSON.stringify(notes),
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
          res.json(newNote);
        }
      );
    }
  );
});

app.delete("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;
  console.log(noteId);

  fs.readFile(
    path.join(__dirname, "db", "db.json"),
    "utf-8",
    (err, jsonData) => {
      if (err) {
        console.error(err);
        return;
      }

    let notes = JSON.parse(jsonData);
    notes = notes.filter(note => note.id === noteId) 

    fs.writeFile(
        path.join(__dirname, "db", "db.json"),
        JSON.stringify(notes),
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
          res.json(noteId);
        }
      );
    }

    
  );
});

app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

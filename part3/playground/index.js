const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.static("dist"));

// MODELS
const Note = require("./models/note");

// MIDDLEWARE
// Request logger
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const cors = require("cors");

app.use(cors());
app.use(express.json()); //json-parser: nos permite acceder a datos enviados en body de un request (POST, PUT, PATCH)
app.use(requestLogger);

// ROUTES
// ###GET
app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response, next) => {
  const id = request.params.id;
  Note.findById(id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// ###DELETE
app.delete("/api/notes/:id", (request, response, next) => {
  const id = request.params.id;
  Note.findByIdAndDelete(id)
    .then((deletedNote) => {
      response.json(deletedNote);
    })
    .catch((error) => next(error));
});

// ###POST
app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

// ###PUT
app.put("/api/notes/:id", (request, response, next) => {
  const id = request.params.id;
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  // TO-DO: entender el terncer parametro
  Note.findByIdAndUpdate(id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

// MIDDLEWARE
// ###UNKNOWN ENDPOINT
app.use((request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
});

// ###ERROR HANDLlER
app.use((error, request, response, next) => {
  console.error(error);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
});

// PORT CONECTION
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

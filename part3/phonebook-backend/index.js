import express from "express";
import "dotenv/config";
import morgan from "morgan";
import Phonebook from "./mongo.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static("dist"));
morgan.token("post-data", (req) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post-data"
  )
);

app.get("/info", (req, res, next) => {
  Phonebook.countDocuments({})
    .then((count) => {
      res.send(
        `<p>Phonebook has info for ${count} people</p> <p>${
          new Date().toUTCString() + " " + new Date()
        }</p>`
      );
    })
    .catch((err) => next(err));
});

app.get("/api/persons", (req, res) => {
  Phonebook.find({}).then((result) => res.json(result));
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Phonebook.findById(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({ error: "content missing" });
  }

  Phonebook.findOne({ name: name.trim() })
    .then((checkName) => {
      if (!checkName) {
        const newPerson = new Phonebook({
          name,
          number,
        });

        newPerson
          .save()
          .then((result) => {
            res.status(201).json(result);
          })
          .catch((err) => next(err));
      } else {
        res.status(409).json({ error: "name must be unique" });
      }
    })
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  const updatedPerson = {
    name,
    number,
  };
  Phonebook.findByIdAndUpdate(req.params.id, updatedPerson, {new:true, runValidators: true, context:'query'})
    .then((result) => {
      if (result) {

        res.status(201).json(result);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Phonebook.findByIdAndDelete(id)
    .then((result) => {
      if (result) return res.status(200).json(result);
      else res.status(404).end();
    })
    .catch((err) => next(err));
});

// middlewares
const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndPoint);

const errorHandler = (error, request, response, next) => {
  console.log(error);
  if (error.name === "CastError") {
    return response.status(400).json({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} port successfully`);
});

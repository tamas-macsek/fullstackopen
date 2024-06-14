const express = require("express");
const morgan = require("morgan");

const app = express();

morgan.token("post_data", (req, res) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post_data"
  )
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  return Math.floor(Math.random() * 10000);
};

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const personId = Number(req.params.id);
  const item = persons.filter((p) => p.id === personId);

  if (item.length === 0) {
    res.status(404).json("ID not found.");
  }

  res.json(item);
});

app.delete("/api/persons/:id", (req, res) => {
  const itemId = Number(req.params.id);
  const newPersons = persons.filter((p) => p.id !== itemId);
  persons = newPersons;

  res.json(itemId + " removed");
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  console.log(body);

  if (!body.name && !body.number) {
    return res.status(400).json("`name` and `number` are missing");
  }

  if (!body.name) {
    return res.status(400).json("`name` is missing.");
  }

  if (!body.number) {
    return res.status(400).json("`number` is missing.");
  }

  if (persons.find((p) => p.name === body.name)) {
    return res.status(400).json(body.name + " already exists");
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(newPerson);

  res.json(newPerson);
});

app.get("/info", (req, res) => {
  const number_of_persons = persons.length;
  const datum = Date();

  res.send(
    "Phonebook has info for " +
      number_of_persons +
      " people " +
      "<br /><br />" +
      datum.toString()
  );
});
const PORT = 3000;
app.listen(PORT);

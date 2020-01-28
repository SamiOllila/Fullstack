const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get(`/api/persons/:id`, (req,res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if(person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.get('/info', (req, res) => {
  res.send(`<div><p>Phonebook has info for ${persons.length} people</p></div> <div><p>${Date()}</p><div/>`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.delete(`/api/persons/:id`, (req, res) => {
  const id = Number(req.params.id)
  const person = persons.filter(person => person.id !== id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const person = req.body
  newPerson = {
    name: person.name,
    number: person.number,
    id: Math.floor(1000*Math.random()),
  }
  persons = persons.concat(newPerson)
  res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
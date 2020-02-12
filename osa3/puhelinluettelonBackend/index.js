const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
morgan.token('body', (req,res) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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
  if (Object.keys(person).length > 2) {
    res.status(400).json({
      error: 'Only name and number information is accepted.'
    })
    return
  }
  if (!person.name || !person.number) {
    res.status(400).json({
      error: 'Name or number missing.'
    })
    return
  }
  if (persons.map(person => person.name).includes(person.name)) {
    res.status(400).json({
      error: 'Name must be unique.'
    })
    return
  }
  newPerson = {
    name: person.name,
    number: person.number,
    id: Math.floor(1000*Math.random()),
  }
  persons = persons.concat(newPerson)
  res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
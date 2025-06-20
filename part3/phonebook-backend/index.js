import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT

let persons = [
    {
        id: "1",
        name: 'Arto Hellas',
        number: '040-123456'
    },
    {
        id: "2",
        name: 'Ada Lovelace',
        number: '39-44-5323523'
    },
    {
        id: "3",
        name: 'Dan Abramov',
        number: '12-43-234345'
    },
    {
        id: "4",
        name: 'Mary Poppendieck',
        number: '39-23-6423122'
    },
]

const generateId = () => {
    return Math.floor(Math.random() * 1000000).toString();
}


app.use(express.json())

morgan.token('post-data', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : '';
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'));



app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${new Date().toUTCString() + " " + new Date() }</p>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})


app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(e => e.id === id);
    if(person) {
        res.status(200).json(person);
    } else {
        res.status(404).end();
    }
})


app.post('/api/persons', (req, res) => {
    const { name, number } = req.body;
    if(!name || !number) {
        return res.status(400).json({error: "name or number missing"})
    }
    const checkName = persons.find(e => e.name.toLowerCase().trim() === name.trim().toLowerCase())
    if(!checkName) {

        
        const newPerson = {
            id: generateId(),
            name,
            number
        }
        persons = persons.concat(newPerson);
        
        res.status(201).json(newPerson)
    } else {
        res.status(409).json({error: "name must be unique"})
    }
})

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const person = persons.find(e => e.id === id);
    if(person) {
        persons = persons.filter(e => e.id !== id);
        res.status(204).end();
    } else {
        res.status(404).end();
    }
})


app.listen(PORT, () => {
    console.log(`Server started on ${PORT} port successfully`);
})
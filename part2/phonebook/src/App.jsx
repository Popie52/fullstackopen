import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import axios from 'axios';

function App() {
  const [person, setPerson] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(res => {
      setPerson(res.data);
    })

  }, [])

  let updatedPerson =
    filter === ""
      ? person
      : person.filter((e) =>
          e.name.toLowerCase().includes(filter.trim().toLowerCase())
        );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      person.find((e) => e.name.toLowerCase() === newName.trim().toLowerCase())
    ) {
      alert(`${newName} already added to phonebook`);
      return;
    }

    setPerson(person.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={updatedPerson} />
    </div>
  );
}

export default App;

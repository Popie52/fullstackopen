import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import phonebookService from './services/phonebook.js';

function App() {
  const [person, setPerson] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");



  useEffect(() => {
    console.log(`fetching data`);
    phonebookService.getAll()
    .then(data =>setPerson(data))
    .catch(err => console.log(err.message));
    console.log(`fetched data sucessfully`);
  }, [])

  let updatedPerson =
    filter === ""
      ? person
      : person.filter((e) =>
          e.name.toLowerCase().includes(filter.trim().toLowerCase())
        );

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if(!newName || !newNumber) {
        alert(`please fill out the all the fields`);
        return;
      }
      
        
      const searchObject = person.find((e) => e.name.toLowerCase() === newName.trim().toLowerCase())
      if (searchObject) {
        console.log(`update(put) request`);
        const confirm = window.confirm(`${newName} already added to phonebook, replace the old number with new one?`);
        if(confirm) {
          const updateObject = { ...searchObject , number: newNumber }
          phonebookService.updateOne(searchObject.id, updateObject)
          .then(res => {
            setPerson(person.map(e => e.id === res.id ? res: e))
          }).catch(err => console.log(err.message))
          console.log(`successfully update(put) request`);
        } else {
          console.log(`Cancel Updation`);
        }
        return;
      }

      const newObject = { name: newName, number: newNumber };

      console.log(`post request started`);
      phonebookService.create(newObject)
      .then(res => {
        console.log(`successfull post request`);
        setPerson(person.concat(res));
        setNewName("");
        setNewNumber("");
      })
  
      
    } catch (error) {
      console.log(`failed to create new object`);
      console.log(error.message);
    }
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

  const handleDelete = (id) => {
    try {
      const object = person.find(e => e.id === id);
      const confirm = window.confirm(`Delete ${object.name} ?`);
      if(confirm) {
        phonebookService.deleteOne(object.id)
        .then((res) => {
          console.log(`${res.name} deleted succesfully`);
          setPerson(person.filter(e => e.id !== id));
        }).catch(err => console.log(err.message))
      } else {
        console.log(`deletion abort`);
      }
    } catch(err) {
      console.log(err.message);
    }
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
      <Persons persons={updatedPerson} handleDelete={handleDelete}/>
    </div>
  );
}

export default App;

const PersonForm = ({newName, newNumber, handleSubmit, handleNameChange, handleNumberChange }) => {
    return (

        <form onSubmit={handleSubmit}>
        <div>
          name: <input type="text"  value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    )
}

export default PersonForm;
const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map((e) => (
          <p key={e.id}>
            {e.name} {e.number} 
          {" "}
          <button onClick={() => handleDelete(e.id)}>delete</button>
          </p>
      ))}
    </div>
  );
};

export default Persons;

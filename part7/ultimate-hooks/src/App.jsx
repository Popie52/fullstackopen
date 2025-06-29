import { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const handleReset = () => {
    setValue("");
  };

  return {
    handleReset,
    inputProps: {
      type,
      value,
      onChange,
    },
  };
};

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    if (!baseUrl) return null;
    (async () => {
      const res = await axios.get(baseUrl);
      setResources(res.data);
    })();
  }, [baseUrl]);

  const create = async (resource) => {
    const ans = await axios.post(baseUrl, resource);
    setResources(resources.concat(ans.data));
  };

  const service = {
    create,
  };

  return [resources, service];
};

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource("http://localhost:3005/notes");
  const [persons, personService] = useResource("http://localhost:3005/persons");

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.inputProps.value });
    content.handleReset();
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({
      name: name.inputProps.value,
      number: number.inputProps.value,
    });
    name.handleReset();
    number.handleReset();
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content.inputProps} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name.inputProps} /> <br />
        number <input {...number.inputProps} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;

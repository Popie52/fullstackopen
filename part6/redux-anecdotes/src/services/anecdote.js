import axios from "axios";
const baseUrl = `http://localhost:3001/anecdotes`;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (content) => {
  const newObject = { content, votes: 0 };
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

const update = async (content) => {
    const updatedAnecdote = {...content, votes: content.votes+1}
    const response = await axios.put(`${baseUrl}/${content.id}`, updatedAnecdote);
    return response.data
}

export default { create, getAll, update };

import axios from 'axios';
const baseUrl = `http://localhost:3001/anecdotes`

export const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}

export const create = async (newAnecdote) => {
    const anecdote = {content: newAnecdote, votes: 0}
    const response = await axios.post(baseUrl, anecdote);
    return response.data
}

export const update = async(anecdote) => {
    const newanecdote = {...anecdote, votes: anecdote.votes+1}
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, newanecdote);
    return response.data
}
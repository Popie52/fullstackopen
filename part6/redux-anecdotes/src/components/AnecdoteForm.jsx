import { useDispatch } from "react-redux";
import { appendAnecdotes, createAnecdote } from "../reducers/anecdoteReducer.js";
import { notificationHandler } from "../reducers/notificationReducer.js";
import anecdoteService from "../services/anecdote.js";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    console.log(content);
    e.target.anecdote.value = "";
    dispatch(createAnecdote(content));
    dispatch(notificationHandler(`Added ${content}`, 5));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

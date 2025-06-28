import { useQueryClient, useMutation } from "@tanstack/react-query";
import { create } from "../services/request.js";
import { useNotificationDispatch } from "../reducers/notificationReducer.jsx";
import { setNotificaiton } from "../reducers/notificationHelper.js";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const createAnecdote = useMutation({
    mutationFn: create,
    onSuccess: (newAnecdote) => {
      let data = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], data.concat(newAnecdote));
      setNotificaiton(dispatch, `Added ${newAnecdote.content}`, 5);
    },
    onError: () => {
      setNotificaiton(
        dispatch,
        `too short anecdote, must have length 5 or more`,
        5
      );
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log("new anecdote");
    createAnecdote.mutate(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

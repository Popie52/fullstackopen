import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAll, update } from "./services/request.js";
import { setNotificaiton } from "./reducers/notificationHelper.js";
import { useNotificationDispatch } from "./reducers/notificationReducer.jsx";

const App = () => {

  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch()

  const updateMutation = useMutation({
    mutationFn: update,
    onSuccess: (anecdote) => {
      const data = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], data.map(e => e.id === anecdote.id ? anecdote: e));
      setNotificaiton(dispatch, `upvote ${anecdote.content}`, 5)
    }
  })

  const handleVote = (anecdote) => {
    console.log("vote");
    updateMutation.mutate(anecdote)
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
    retry: false,
  });

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  if (result.isLoading) {
    return <div>loading data from the server wait...</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

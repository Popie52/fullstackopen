import { useDispatch } from "react-redux"
import { updateAnecdote} from "../reducers/anecdoteReducer.js";
import { notificationHandler } from "../reducers/notificationReducer.js";

const Anecdote = ({anecdote}) => {
    const dispatch = useDispatch();

    const vote = (anecdote) => {
        dispatch(updateAnecdote(anecdote));
        dispatch(notificationHandler(`you voted ${anecdote.content}`, 5))
    }

    return (
        <div>
            <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
    )
}


export default Anecdote;
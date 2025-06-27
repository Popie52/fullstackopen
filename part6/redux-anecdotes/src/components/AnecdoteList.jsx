import { useSelector } from "react-redux"
import Anecdote from "./Anecdote";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if(state.filter === ''){
            return state.anecdotes
        }
        else{
            const newState = state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase().trim()));
            return newState
        }
    });

    return(
        <div>
            {
            [...anecdotes].sort((a,b) => b.votes-a.votes)
            .map(anecdote => <Anecdote anecdote={anecdote} key={anecdote.id} />)
            }
        </div>
    )
}

export default AnecdoteList;
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter';
import Notification from './components/Notification';
import anecdoteService from './services/anecdote';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      const response = await anecdoteService.getAll();
      dispatch(setAnecdotes(response))
    })()
  }, [])
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification  />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
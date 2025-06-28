import { useQueryClient, useMutation } from "@tanstack/react-query"
import { create } from "../services/request.js"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const createAnecdote =  useMutation( {
    mutationFn: create,
    onSuccess: (newAnecdote) => {
      let data = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], data.concat(newAnecdote))
      // queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    createAnecdote.mutate(content);
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

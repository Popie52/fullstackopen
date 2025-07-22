import { useState } from 'react'
import { ADD_BOOK, GET_AUTHORS, GET_BOOKS } from '../queries'
import { useMutation } from '@apollo/client';

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK, 
    {
      // refetchQueries: [
      //   { query: GET_AUTHORS },
      //   { query: GET_BOOKS }
      // ]
      update: (cache, { data: { addBook }}) => {
        cache.updateQuery({ query: GET_BOOKS}, (data) => {
          if(!data) return;
          return {
            allBooks: data.allBooks.concat(addBook)
          }
        });

        cache.updateQuery({query: GET_AUTHORS}, (data) => {
          if(!data) return;
          const authorsExist = data.allAuthors.find(a => a.name === addBook.author.name);
          if(!authorsExist) {
            return {
              allAuthors: data.allAuthors.concat(addBook.author)
            }
          } else {
            return data
          }
        })

      }
    },
  );

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...');
    addBook({
      variables: {title, published: Number(published), author, genres}
  });

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
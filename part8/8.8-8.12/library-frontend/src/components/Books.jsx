import { useState } from "react"
import { GET_BOOKS, BOOKSBYGENRE } from "../queries"
import { useQuery } from "@apollo/client"

const Books = () => {
  const [filter, setFilter] = useState(null)

  const result = useQuery(GET_BOOKS)
  const { data, loading, error } = useQuery(BOOKSBYGENRE, {
    variables: { genre: filter },
    fetchPolicy: 'cache-and-network',
  })

  if (loading || result.loading) return <div>Loading...</div>
  if (error || result.error) {
    console.error(error)
    console.error(result.error)
    return <div>Couldn't fetch due to errors...</div>
  }

  const books = data?.allBooks || []
  const allBooks = result.data?.allBooks || []

  const genreSet = new Set()
  allBooks.forEach(b => b.genres.forEach(g => genreSet.add(g)))
  const genres = Array.from(genreSet).sort()

  return (
    <div>
      <h2>Books</h2>

      <p>
        {filter
          ? <>in genre: <strong>{filter}</strong></>
          : <>all genres</>}
      </p>

      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '1rem' }}>
        {genres.map(e => (
          <button key={e} onClick={() => setFilter(e)}>
            {e}
          </button>
        ))}
        <button onClick={() => setFilter(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books

import { useQuery } from "@apollo/client"
import { CURRENTUSER, BOOKSBYGENRE } from "../queries"

const Recommendations = () => {

    const { data: userData, loading: userLoading, error: userError } = useQuery(CURRENTUSER);
    
    const genre = userData?.me?.favouriteGenre;
    const {
        data: bookData,
        loading: bookLoading,
        error: bookError,
    } = useQuery(BOOKSBYGENRE, {
        variables: { genre },
        skip: !genre,
        });

  if (userLoading || bookLoading) return <div>Loading...</div>;
  if (userError || bookError) return <div>Could not fetch data...</div>;

  const books = bookData?.allBooks || [];
  
  return (
    <div>
        <h2>Recommendations</h2>
        <p>book in your favourite genre: <strong>{genre}</strong></p>
        <table>
            <thead>

            <tr>
                <th></th>
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
    </div>
  )
}

export default Recommendations
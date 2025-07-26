import { useState } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import {
  GET_BOOKS,
  GET_AUTHORS,
  BOOKSBYGENRE,
  BOOK_ADDED,
} from "../queries";

// Helper to ensure unique items by ID
const uniqById = (arr) => {
  const seen = new Set();
  return arr.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
};

// Cache update helper
export const updateCache = (cache, queryObject, addedBook) => {
  try {
    cache.updateQuery(queryObject, (data) => {
      if (!data || !data.allBooks) {
        return { allBooks: [addedBook] };
      }

      const exists = data.allBooks.some((b) => b.id === addedBook.id);
      if (exists) return data;

      return {
        allBooks: uniqById(data.allBooks.concat(addedBook)),
      };
    });
  } catch (error) {
    console.warn("Could not update cache:", error.message);
  }
};

const Books = () => {
  const [filter, setFilter] = useState(null);

  // Subscription for book added
  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data?.bookAdded;
      if (!addedBook) {
        console.warn("No book in subscription payload");
        return;
      }

      alert(`New book added: ${addedBook.title} by ${addedBook.author.name}`);

      // Update allBooks cache
      updateCache(client.cache, { query: GET_BOOKS }, addedBook);

      // Update booksByGenre cache for each genre
      addedBook.genres.forEach((genre) => {
        updateCache(client.cache, {
          query: BOOKSBYGENRE,
          variables: { genre },
        }, addedBook);
      });

      // Update authors cache
      client.cache.updateQuery({ query: GET_AUTHORS }, (data) => {
        if (!data || !data.allAuthors) return;

        const existing = data.allAuthors.find(a => a.name === addedBook.author.name);
        if (!existing) {
          return {
            allAuthors: [...data.allAuthors, addedBook.author],
          };
        }

      });
    },
  });

  // Queries
  const { data: allBooksData, loading: allBooksLoading, error: allBooksError } = useQuery(GET_BOOKS);
  const { data: filteredBooksData, loading: filteredBooksLoading, error: filteredBooksError } = useQuery(
    BOOKSBYGENRE,
    {
      variables: { genre: filter },
      fetchPolicy: "cache-and-network",
    }
  );

  if (allBooksLoading || filteredBooksLoading) return <div>Loading...</div>;
  if (allBooksError || filteredBooksError) {
    console.error(allBooksError || filteredBooksError);
    return <div>Couldn't fetch data due to errors...</div>;
  }

  const allBooks = allBooksData?.allBooks || [];
  const books = filter ? filteredBooksData?.allBooks || [] : allBooks;

  // Collect unique genres
  const genreSet = new Set();
  allBooks.forEach((book) => {
    book.genres.forEach((g) => genreSet.add(g));
  });
  const genres = Array.from(genreSet).sort();

  return (
    <div>
      <h2>Books</h2>
      <p>
        {filter ? (
          <>
            in genre: <strong>{filter}</strong>
          </>
        ) : (
          <>all genres</>
        )}
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
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "1rem" }}>
        {genres.map((g) => (
          <button key={g} onClick={() => setFilter(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setFilter(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;


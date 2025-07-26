import {gql} from '@apollo/client';

export const GET_AUTHORS = gql`
    query {
        allAuthors {
            name
            bookCount
            born
            id
        }
    }
`;

export const GET_BOOKS = gql`
    query {
        allBooks {
            id
            title
            published
            author {
                name
            }
            genres

        }
    }
`

export const ADD_BOOK = gql`
    mutation addBook($title: String!, $author: String!, $published: Int, $genres: [String!]) {
        addBook(
            title: $title, 
            author: $author,
            published: $published,
            genres: $genres
            ) {
                id
                title
                author {
                    name
                }
                published
                genres
            }

    }
`

export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $born: Int) {
        editAuthor(
            name: $name,
            setBornTo: $born
        ) {
            name
            born
            id
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!){
        login(
            username: $username,
            password: $password
        ) {
            value
        }
    }
`
export const CURRENTUSER = gql`
    query currentUser {
        me{
            favouriteGenre
        }
    }
`

export const BOOKSBYGENRE = gql`
    query booksByGenre($genre: String) {
        allBooks(genre: $genre) {
            id
            title
            author{
                name
            }
            published
        }
    }
`

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        id
        title
        published
        genres
        author {
            name
        }
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`
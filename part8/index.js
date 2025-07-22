import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import jwt from 'jsonwebtoken';
import Author from "./models/Author.js";
import Book from "./models/Book.js";
import mongoose from "mongoose";
import User from "./models/User.js";
import { GraphQLError } from "graphql";

import 'dotenv/config';

mongoose.set('strictQuery', false);
console.log(`connecting to mongodb`);
mongoose.connect(process.env.MONGODB_URI).then( () => console.log('connected succesfully')
).catch(error => console.log(error))

const typeDefs = `
    type User {
      username: String!
      favouriteGenre: String!
      id: ID!
    }

    type Token {
      value: String!
    }
    
    type Book {
        title: String!
        author: Author!
        published: Int
        id: String!
        genres: [String!]!
    }    
    
    type Author {
        name: String!
        bookCount: Int
        born: Int
        id: String!
    }
    
    type Query {
        bookCount: Int
        authorCount: Int
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    
    }

    type Mutation {
        addBook(title: String!, author: String!, published: Int, genres: [String!]): Book
        editAuthor(name: String!, setBornTo: Int): Author

        createUser(
        username: String!,
        favouriteGenre: String!): User
        login(
        username: String!,
        password: String!): Token
    }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {};
      if(args.author) {
        const author = await Author.findOne({name: args.author});
        if(author) {
          filter.author = author._id;
        }else {
          return [];
        }
      }
      if(args.genre) {
        filter.genres = {$in: [args.genre]}
      }
      return Book.find(filter).populate('author');
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      return Promise.all(
        authors.map(async (author) => {
          const bookCount = await Book.countDocuments({author: author._id});
          return {
            name: author.name,
            born: author.born,
            id: author._id.toString(),
            bookCount
          }
        })
      )
    },
    me: (root, args, context) => context.currentUser
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre});
      return user.save()
      .catch(err => {throw new GraphQLError('Creating user failed', {
        extensions: {
          code: "BAD_USER_INPUT",
          invalidArgs: args.username,
          err
        }
      })})
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username});
      if(!user || args.password !== "secret") {
        throw new GraphQLError('wrong credentails', {
          extensions: {
            code: "BAD_USER_INPUT",
          }
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return {value: jwt.sign(userForToken, process.env.JWT_SECRET)};
    },
    addBook: async (root, args, context) => {
  if (!context.currentUser) {
    throw new GraphQLError('not authenticated', {
      extensions: {
        code: "UNAUTHENTICATED"
      }
    });
  }

  let author = await Author.findOne({ name: args.author });
  if (!author) {
    author = new Author({ name: args.author });
    try {
      await author.save();
    } catch (error) {
      throw new GraphQLError('Creating author failed', {
        extensions: {
          code: "BAD_USER_INPUT",
          invalidArgs: ['author'],
          error
        }
      });
    }
  }

  const newBook = new Book({
    title: args.title,
    published: args.published,
    genres: args.genres || [],
    author: author._id
  });

  try {
    await newBook.save();
  } catch (error) {
    throw new GraphQLError('Adding a book failed', {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: Object.keys(error.errors),
        error
      }
    });
  }

  return newBook.populate('author');
    },
    editAuthor: async (root, args, context) => {
      if(!context.currentUser) {
        throw new GraphQLError('Not Authenticated', {
          extensions: {
            code: "UNAUTHORIZED",
          }
        })
      }
      const author = await Author.findOne({name: args.name});
      if (!author) return null;

      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError('Could not update Author', {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: Object.keys(error.errors),
            error
          }
        })
      }


      // authors = authors.map((a) => (a.name === args.name ? updatedAuthor : a));

      return author;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }, context: async ({req, res}) => {
    const auth = req? req.headers.authorization : null;
    if(auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return {
        currentUser
      }
    }
  }
});

console.log(`Server start at port ${url}`);

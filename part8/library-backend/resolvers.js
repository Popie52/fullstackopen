import Author from "./models/Author.js";
import Book from "./models/Book.js";
import { GraphQLError, subscribe } from "graphql";
import jwt from 'jsonwebtoken';
import { PubSub } from "graphql-subscriptions";
import User from "./models/User.js";

const pubsub = new PubSub()


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
  const populateBook = await newBook.populate('author');
  pubsub.publish('BOOK_ADDED', {bookAdded: populateBook})
  return populateBook

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

      return author;
    },
  },
  Subscription: {
    bookAdded: {
        subscribe: () => pubsub.asyncIterableIterator(['BOOK_ADDED'])
    }
  }
};


export default resolvers;
import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import User from "./models/User.js";
import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import {makeExecutableSchema} from '@graphql-tools/schema';
import http from 'http';
import express from 'express'
import cors from 'cors'
import { WebSocketServer } from "ws";
// import User from "./models/User.js";
import 'dotenv/config';
import { useServer } from "graphql-ws/use/ws";

mongoose.set('strictQuery', false);
console.log(`connecting to mongodb`);
mongoose.connect(process.env.MONGODB_URI).then( () => console.log('connected succesfully')
).catch(error => console.log(error))


const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)
  
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql'
  })
  const schema = makeExecutableSchema({typeDefs, resolvers})
  const serverCleanup = useServer({schema}, wsServer);
  
  
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({httpServer}),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            }
          }
        }
      }
    ]
  });

  await server.start()


  app.use(
    '/graphql',cors(), express.json(),
    expressMiddleware(server, {
      context: async ({req}) => {
        const auth = req ? req.headers.authorization: null
        if(auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
          const currentUser = await User.findById(decodedToken.id)
          return { currentUser }
        }
      }
    })
  )

  const PORT = 4000
  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`)
  })
  
  // const { url } = await startStandaloneServer(server, {
  //   listen: { port: 4000 }, context: async ({req, res}) => {
  //     const auth = req? req.headers.authorization : null;
  //     if(auth && auth.startsWith('Bearer ')) {
  //       const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
  //       const currentUser = await User.findById(decodedToken.id);
  //       return {
  //         currentUser
  //       }
  //     }
  //   }
  // });
  
  // console.log(`Server start at port ${url}`);
  
}

start()
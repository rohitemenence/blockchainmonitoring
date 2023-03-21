const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typeDefs = require('./schema.graphql');
const resolvers = require('./user.resolver');

const app = express();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }));
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
})
.catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

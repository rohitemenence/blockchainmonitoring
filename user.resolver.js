const User = require('./user.modal');

const resolvers = {
  Query: {
    user: async (_, { id }) => {
      return User.findById(id);
    },
    users: async () => {
      return User.find();
    }
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const user = new User(input);
      await user.save();
      return user;
    },
    updateUser: async (_, { id, input }) => {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      Object.assign(user, input);
      await user.save();
      return user;
    },
    deleteUser: async (_, { id }) => {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      await user.remove();
      return user;
    }
  }
};

module.exports = resolvers;

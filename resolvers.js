import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const User = mongoose.model("User");
const Quote = mongoose.model("Quote");

const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (_, { _id }) => await User.findOne({ _id }),
    quotes: async () => await Quote.find({}).populate("by", "_id firstName"),
    iqo: async (_, { by }) => await Quote.find({ by }),
    myprofile: async (_, args, { userId }) => {
      if (!userId) throw new Error(`You must be logged in`);
      return await User.findOne({ _id: userId });
    }
  },
  User: {
    quotes: async (ur) => await Quote.find({ by: ur._id })
  },
  Mutation: {
    signupUser: async (_, { userNew }) => {
      const user = await User.findOne({ email: userNew.email });

      if (user) throw new Error("User Already exists with this email");

      const hashedPassword = await bcrypt.hash(userNew.password, 10);

      const newUser = new User({
        ...userNew,
        password: hashedPassword
      });
      return await newUser.save();
    },

    signinUser: async (_, { userSignin }) => {
      const user = await User.findOne({ email: userSignin.email });

      if (!user) throw new Error(`User ${userSignin.email} is not found`);

      const matchPassword = await bcrypt.compare(
        userSignin.password,
        user.password
      );

      if (!matchPassword) throw new Error("Invalid Email or Password");

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      return { token };
    },

    createQuote: async (_, { name }, { userId }) => {
      if (!userId) throw new Error("You must be logged In!");

      const newQuote = new Quote({
        name,
        by: userId
      });

      await newQuote.save();

      return "Quote saved successfully!";
    }
  }
};

export default resolvers;

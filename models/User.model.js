import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    permissionLevel: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema, 'User');

export default User;

export const isEmailExisted = async (email) => {
  const user = await User.findOne({ email });
  return user ? true : false;
};

export const getFullUser = async (id) => {
  const user = await User.findById(id).select('-password');
  return user;
};

export const getUserNameOnly = async (id) => {
  const user = await User.findById(id).select('name');
  return user;
};

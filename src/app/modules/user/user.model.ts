import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const userSchema = new Schema<TUser, UserModel>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      immutable: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide your password'],
    },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// pre save middleware/hook
userSchema.pre('save', async function (next) {
  //hashing password

  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// post save middleware/hook
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistByEmail = async function (email: string) {
  return await User.findOne({ email });
};

userSchema.statics.isPasswordCorrect = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);

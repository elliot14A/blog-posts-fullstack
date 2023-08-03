import mongoose from "mongoose";
import argon2 from "argon2";

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  let user = this as UserDocument;
  if (!user.isModified("password")) {
    return next();
  }
  const hash = await argon2.hash(user.password, {});
  user.password = hash;
  return next();
});

userSchema.methods.checkPassword = async function (
  password: string,
): Promise<boolean> {
  const user = this as UserDocument;
  return argon2.verify(user.password, password).catch((_) => false);
};

const UserModel: mongoose.Model<UserDocument> = mongoose.model(
  "User",
  userSchema,
);

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  checkPassword(password: string): Promise<boolean>;
}

export default UserModel;

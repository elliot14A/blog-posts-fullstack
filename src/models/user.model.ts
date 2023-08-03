import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

userSchema.pre("save", async function(next) {
  let user = this as UserDocument;
  if (user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  return next();
});

userSchema.methods.checkPassword = async function(
  password: string,
): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt.compare(password, user.password).catch((_) => false);
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

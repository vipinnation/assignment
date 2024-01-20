import { Document, Schema, model, Model } from "mongoose";

interface IUser {
  email: string;
  password: string;
}

interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User: Model<IUserDocument | any> = model("user", userSchema);

export default User;
export { IUser };

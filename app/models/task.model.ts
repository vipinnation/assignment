import { Document, Schema, model, Model, Types } from "mongoose";

interface ITask {
  user_id: Types.ObjectId | any;
  url: string;
  request_body?: string;
  headers?: string;
  token?: string;
  scheduled_time: Date;
  retries?: number;
  max_retries?: number;
}

interface ITaskDocument extends ITask, Document {}

const taskSchema = new Schema<ITask>({
  user_id: { type: Types.ObjectId, ref: "User", required: true },
  url: { type: String, required: true },
  request_body: { type: String },
  headers: { type: String },
  token: { type: String },
  scheduled_time: { type: Date, required: true },
  retries: { type: Number, default: 0 },
  max_retries: { type: Number, default: process.env.MAX_RETRIES || 3 },
});

const Task: Model<ITaskDocument | any> = model("Task", taskSchema);

export default Task;

export { ITaskDocument };

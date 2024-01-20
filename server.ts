import express from "express";
import bodyParser from "body-parser";
import { IUser } from "./app/models/user.model";
import cron from "node-cron";
import { handleScheduledTask, sendEmailNotification } from "./app/services";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

const RETRY_OFFSET: number = parseInt(process.env.RETRY_OFFSET as any, 10) || 2;
const WAIT_TIMEOUT: number = parseInt(process.env.WAIT_TIMEOUT as any, 10) || 5;

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

cron.schedule("* * * * *", () => {
  handleScheduledTask(sendEmailNotification, WAIT_TIMEOUT, RETRY_OFFSET);
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

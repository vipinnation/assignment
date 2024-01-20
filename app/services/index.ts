import axios from "axios";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import Task from "../models/task.model";

interface Task {
  _id: mongoose.Types.ObjectId;
  userId: string;
  url: string;
  requestBody?: string;
  headers?: string;
  token?: string;
  scheduledTime: Date;
  retries?: number;
  maxRetries?: number;
}

const handleScheduledTask = async (
  sendEmailNotification: (task: Task) => void,
  WAIT_TIMEOUT: number,
  RETRY_OFFSET: number
) => {
  try {
    const tasks = await Task.find({ scheduledTime: { $lt: new Date() } });

    for (const task of tasks) {
      try {
        const response = await axios.post(
          task.url,
          {
            data: task.requestBody,
          },
          {
            headers: JSON.parse(task.headers),
            timeout: WAIT_TIMEOUT * 1000,
          }
        );

        await Task.findByIdAndDelete(task._id);
      } catch (error) {
        console.error(`Error for task ID ${task._id}:`, error);

        if (task.retries < task.maxRetries) {
          const retryTime = new Date(
            task.scheduledTime.getTime() + RETRY_OFFSET * 60 * 60 * 1000
          );
          task.scheduledTime = retryTime;
          task.retries += 1;
          await task.save();
        } else {
          sendEmailNotification(task);
          await Task.findByIdAndDelete(task._id);
        }
      }
    }
  } catch (error) {
    console.error("Error handling scheduled task:", error);
  }
};

const sendEmailNotification = async (task: Task) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.gmail_service,
      auth: {
        user: process.env.username,
        pass: process.env.password,
      },
    });

    const mailOptions = {
      from: process.env.from_user,
      to: process.env.to_user,
      subject: "Task Failed",
      text: `Task failed for URL: ${task.url}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    console.log(`Email notification sent for task: ${JSON.stringify(task)}`);
  } catch (error) {
    console.error("Error sending email notification:", error);
  }
};

export { handleScheduledTask, sendEmailNotification };

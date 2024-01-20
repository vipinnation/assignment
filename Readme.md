# React / NodeJS Scheduling Application

This repository contains the source code for a scheduling application built using React (TypeScript) for the frontend and NodeJS (Express with TypeScript) for the backend. The application allows users to schedule tasks that involve sending HTTP pings to specified URLs at designated times. The backend handles the scheduling, execution, and management of these tasks.

## Getting Started

Follow these instructions to set up and run the application locally.

### Prerequisites

- Node.js: Make sure you have Node.js installed on your machine. You can download it from [https://nodejs.org/](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies for both the frontend and backend:

   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

### Configuration

1. Create a `.env` file in the `backend` directory and configure the following environment variables:

   ```env
   PORT=3001
   WAIT_TIMEOUT=30
   RETRY_OFFSET=2
   MAX_RETRIES=3
   ```

   Adjust the values based on your preferences.

2. In the `frontend` directory, create a `.env` file with the following content:

   ```env
   REACT_APP_API_URL=http://localhost:3001
   ```

   Update the API URL based on your backend server configuration.

### Running the Application

1. Start the backend server:

   ```bash
   # Navigate to the backend directory
   cd backend

   # Run the server
   npm start
   ```

2. Start the frontend application in a separate terminal:

   ```bash
   # Navigate to the frontend directory
   cd frontend

   # Run the application
   npm start
   ```

The application should now be accessible at [http://localhost:3000](http://localhost:3000).

## Application Flow

1. **User Authentication:**

   - Users can sign in to their accounts.

2. **Creating Ping Tasks:**

   - Users can create Ping Tasks specifying the URL, request body, headers, and token for a scheduled time.

3. **Execution and Retrying:**

   - The NodeJS application will ping the specified URL at the scheduled time.
   - If successful, the task will be cleared from the schedule.
   - If unsuccessful, an email notification will be sent to the user, and the task will be rescheduled for later.

4. **Task History:**
   - The API maintains a history of all past tasks.
   - Users can perform basic CRUD operations on their tasks.

## Environment Parameters

- `WAIT_TIMEOUT`: Maximum time to wait for a response from the specified URL (in seconds).
- `RETRY_OFFSET`: Time offset for retrying failed tasks (in hours).
- `MAX_RETRIES`: Maximum number of retries for a task.

Feel free to explore the source code for detailed implementation.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

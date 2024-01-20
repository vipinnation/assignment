import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/auth/login.page";
import RegisterPage from "./pages/auth/register.page";
import CreateTaskPage from "./pages/task/create.page";
import TaskPage from "./pages/task/task.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TaskPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/create-task",
    element: <CreateTaskPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;

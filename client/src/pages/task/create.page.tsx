import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { redirect, useParams } from "react-router-dom";

interface RouteParams {
  id: string;
}

interface Props {}

interface FormData {
  url: string;
  request_body: string;
  headers: string;
  token: string;
  scheduled_time: string;
  retries: number;
  max_retries: number;
}

interface Errors {
  url: string;
  scheduled_time: string;
}

const CreateTaskPage: React.FC<Props> = (props: Props) => {
  const { id } = useParams<any>();

  const [formData, setFormData] = useState<FormData>({
    url: "",
    request_body: "",
    headers: "",
    token: "",
    scheduled_time: "",
    retries: 0,
    max_retries: 3,
  });

  const [errors, setErrors] = useState<Errors>({
    url: "",
    scheduled_time: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`your-backend-api-endpoint/${id}`)
        .then((response) => {
          const taskData = response.data;
          setFormData(taskData);
        })
        .catch((error) => {
          console.error("Error fetching task details:", error);
        });
    }
  }, [id]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === "" ? `${name} is required` : "",
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.url.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        url: "URL is required",
      }));
      return;
    }

    if (formData.scheduled_time.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        scheduled_time: "Scheduled Time is required",
      }));
      return;
    }

    try {
      if (id) {
        const response = await axios.put(
          `your-backend-api-endpoint/${id}`,
          formData
        );

        if (response.status === 200) {
          console.log("Task updated successfully");
          redirect("/");
        } else {
          console.error("Task update failed");
        }
      } else {
        const response = await axios.post(
          "your-backend-api-endpoint",
          formData
        );

        if (response.status === 201) {
          console.log("Task created successfully");
          redirect("/");
        } else {
          console.error("Task creation failed");
        }
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {id ? "Edit Task" : "Create a Task"}
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="url"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              URL
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  errors.url && "border-red-500"
                }`}
              />
              {errors.url && (
                <p className="mt-1 text-xs text-red-500">{errors.url}</p>
              )}
            </div>
          </div>

          {/* Other form fields go here... */}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {id ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskPage;

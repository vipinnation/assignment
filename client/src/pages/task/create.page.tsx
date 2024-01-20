import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { redirect, useParams } from "react-router-dom";
import apis from "../../constants/apis";
import { showToastError, showToastSuccess } from "../../utils/toast";

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
  request_body: string;
  headers: string;
  token: string;
  scheduled_time: string;
  retries: string;
  max_retries: string;
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
    request_body: "",
    headers: "",
    token: "",
    scheduled_time: "",
    retries: "",
    max_retries: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`${apis.task}/${id}`)
        .then((response) => {
          const taskData = response.data;
          setFormData(taskData);
        })
        .catch((error) => {
          console.error("Error fetching task details:", error);
        });
    }
  }, [id]);

  const validateForm = (): boolean => {
    let valid = true;

    if (formData.url.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        url: "URL is required",
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        url: "",
      }));
    }

    return valid;
  };

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

    if (!validateForm()) {
      return;
    }

    try {
      if (id) {
        const response = await axios.put(`${apis.task}/${id}`, formData);

        if (response.status === 200) {
          showToastSuccess("Task updated successfully");
          redirect("/");
        } else {
          showToastError("Task update failed");
        }
      } else {
        const response = await axios.post(apis.task, formData);

        if (response.status === 201) {
          showToastSuccess("Task created successfully");
          redirect("/");
        } else {
          showToastError("Task creation failed");
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

          <div>
            <label
              htmlFor="request_body"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Request Body
            </label>
            <div className="mt-2">
              <textarea
                id="request_body"
                name="request_body"
                value={formData.request_body}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.request_body && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.request_body}
                </p>
              )}
            </div>
          </div>

          <div>
            <div>
              <label
                htmlFor="headers"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Headers
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="headers"
                  name="headers"
                  value={formData.headers}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.headers && (
                  <p className="mt-1 text-xs text-red-500">{errors.headers}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="token"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Token
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="token"
                  name="token"
                  value={formData.token}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.token && (
                  <p className="mt-1 text-xs text-red-500">{errors.token}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="scheduled_time"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Scheduled Time
              </label>
              <div className="mt-2">
                <input
                  type="datetime-local"
                  id="scheduled_time"
                  name="scheduled_time"
                  value={formData.scheduled_time}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.scheduled_time && "border-red-500"
                  }`}
                />
                {errors.scheduled_time && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.scheduled_time}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="retries"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Retries
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  id="retries"
                  name="retries"
                  value={formData.retries}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.retries && (
                  <p className="mt-1 text-xs text-red-500">{errors.retries}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="max_retries"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Max Retries
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  id="max_retries"
                  name="max_retries"
                  value={formData.max_retries}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.max_retries && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.max_retries}
                  </p>
                )}
              </div>
            </div>
          </div>

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

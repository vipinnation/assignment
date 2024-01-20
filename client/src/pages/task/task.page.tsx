import React, { useState, useEffect } from "react";
import axios from "axios";
import apis from "../../constants/apis";
import { redirect } from "react-router-dom";
import { showToastSuccess } from "../../utils/toast";

interface SavedItem {
  _id: string;
  url: string;
  request_body: string;
  headers: string;
  token: string;
  scheduled_time: string;
  retries: number;
  max_retries: number;
}

const TaskPage: React.FC = () => {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  useEffect(() => {
    const fetchSavedItems = async () => {
      try {
        const response = await axios.get(apis.task);
        setSavedItems(response.data);
      } catch (error) {
        console.error("Error fetching saved items:", error);
      }
    };

    fetchSavedItems();
  }, []);

  const handleEdit = (itemId: string) => {
    console.log(`Edit item with ID: ${itemId}`);
    redirect("/edit-task" + itemId);
  };

  const handleDelete = async (itemId: string) => {
    try {
      await axios.delete(`${apis.task}/${itemId}`);
      setSavedItems((prevItems) =>
        prevItems.filter((item) => item._id !== itemId)
      );
      showToastSuccess(`Deleted item with ID: ${itemId}`);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    URL
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Request Body
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Headers
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Token
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Scheduled Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Retries
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Max Retries
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {savedItems.map((item) => (
                  <tr
                    key={item._id}
                    className={`odd:bg-white even:bg-gray-100 hover:bg-gray-100 ${
                      item.retries > 0
                        ? "dark:odd:bg-gray-800 dark:even:bg-gray-700 dark:hover:bg-gray-700"
                        : ""
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                      {item.url}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {item.request_body}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {item.headers}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {item.token}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {item.scheduled_time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {item.retries}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {item.max_retries}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <button
                        type="button"
                        onClick={() => handleEdit(item._id)}
                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item._id)}
                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:hover:text-red-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;

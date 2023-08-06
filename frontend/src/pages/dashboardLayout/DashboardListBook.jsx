import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardAbout() {
  const [booksData, setBooksData] = useState([]);
  const api_url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${api_url}/books`)
      .then((response) => {
        setBooksData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function truncateString(str) {
    if (str.length > 50) {
      return str.substring(0, 50) + "...";
    } else {
      return str;
    }
  }

  return (
    <div className="flex items-start justify-start w-full h-auto mt-8 px-8">
      <div className="w-80 flex flex-col flex-wrap gap-6">
        <span className="text-2xl font-bold">List Book</span>
        <div className="overflow-x-auto">
          <table className="table w-full text-sm text-left">
            <thead>
              <tr>
                <th className="text-[14px]">Title</th>
                <th className="text-[14px]">Description</th>
                <th className="text-[14px]">Author</th>
                <th className="text-[14px]">Publish date</th>
                <th className="text-[14px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {booksData.map((book) => (
                <tr>
                  <td>
                    <div className="h-20">{truncateString(book.title)}</div>
                  </td>
                  <td>
                    <div className="h-20">
                      {truncateString(book.description)}
                    </div>
                  </td>
                  <td>
                    <div className="h-20">{truncateString(book.author)}</div>
                  </td>
                  <td>
                    <div className="h-20">{book.publishdate}</div>
                  </td>
                  <td>
                    <div className="h-20 -mt-3 -ml-2">
                      <div className="flex items-center gap-2">
                        <button className="btn btn-ghost btn-xs">
                          details
                        </button>
                        <button className="btn btn-ghost btn-circle btn-sm">
                          <PencilSquareIcon className="text-gray-600 font-bold p-1" />
                        </button>
                        <button className="btn btn-ghost btn-circle btn-sm">
                          <TrashIcon className="text-gray-600 font-bold p-1" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
                        <Link
                          to={`/book-detail/books` + `/${book.id}`}
                          className="btn btn-ghost btn-xs"
                        >
                          details
                        </Link>
                        <button
                          className="btn btn-ghost btn-circle btn-sm"
                          onClick={() => window.modal_update.showModal()}
                        >
                          <PencilSquareIcon className="text-gray-600 font-bold p-1" />
                        </button>
                        <button
                          className="btn btn-ghost btn-circle btn-sm"
                          onClick={() => window.modal_delete.showModal()}
                        >
                          <TrashIcon className="text-gray-600 font-bold p-1" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* modal update */}
          <dialog id="modal_update" className="modal">
            <form method="dialog" className="modal-box">
              {/* <h3 className="font-bold text-lg">Update!</h3> */}
              {/* <p className="py-4">Press ESC key or click outside to close</p> */}
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-gray-700 mb-2" for="productName">
                    Title
                  </label>
                  <input
                    type="text"
                    className="input input-sm input-bordered w-full max-w-xs"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" for="productName">
                    Author
                  </label>
                  <input
                    type="text"
                    className="input input-sm input-bordered w-full max-w-xs"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" for="productName">
                    Publish date
                  </label>
                  <input
                    type="text"
                    className="input input-sm input-bordered w-full max-w-xs"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" for="productName">
                    Price
                  </label>
                  <input
                    type="text"
                    className="input input-sm input-bordered w-full max-w-xs"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" for="productName">
                    Synopsis
                  </label>
                  <input
                    type="text"
                    className="input input-sm input-bordered w-full max-w-xs"
                  />
                </div>
              </div>
              <div className="modal-action">
                <button
                  className="btn btn-sm btn-secondary border-0 text-md rounded capitalize"
                  onClick={() => window.modal_update.showModal()}
                >
                  Update
                </button>
              </div>
            </form>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          {/* modal delete */}
          <dialog id="modal_delete" className="modal">
            <form method="dialog" className="modal-box">
              <h3 className="font-bold text-lg">Delete</h3>
              <p className="py-4">Are you sure want to delete book ?</p>
              <div className="modal-action">
                <button
                  className="btn btn-sm btn-secondary border-0 text-md rounded capitalize"
                  onClick={() => window.modal_delete.showModal()}
                >
                  delete
                </button>
              </div>
            </form>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  );
}

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function DashboardAbout() {
  const [booksData, setBooksData] = useState([]);
  const [bookId, setBookId] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateAuthor, setUpdateAuthor] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updatePublishDate, setUpdatePublishDate] = useState("");
  const [updatePrice, setUpdatePrice] = useState(0);
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

  const updateBookById = () => {
    const formData = new FormData();

    formData.append(
      "title",
      updateTitle === ""
        ? booksData.find((x) => x.id === bookId).title
        : updateTitle
    );
    formData.append(
      "description",
      updateDescription === ""
        ? booksData.find((x) => x.id === bookId).description
        : updateDescription
    );
    formData.append(
      "author",
      updateAuthor === ""
        ? booksData.find((x) => x.id === bookId).author
        : updateAuthor
    );
    formData.append(
      "publishdate",
      updatePublishDate === ""
        ? booksData.find((x) => x.id === bookId).publishdate
        : updatePublishDate
    );
    formData.append(
      "price",
      updatePrice === 0
        ? booksData.find((x) => x.id === bookId).price
        : updatePrice
    );
    formData.append(
      "imageurl",
      booksData.find((x) => x.id === bookId).imageurl
    );

    axios
      .put(api_url + `/books/${bookId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        response.data.message === "Book updated"
          ? alert("Book updated")
          : alert("An error occured, cannot edit the book");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteBookById = () => {
    axios
      .delete(api_url + `/books/${bookId}`)
      .then((response) => {
        response.data.message === "Book deleted"
          ? alert("Book deleted")
          : alert("An error occured, cannot delete the book");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                <tr key={book.id}>
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
                          onClick={() => {
                            window.modal_update.showModal();
                            setBookId(book.id);
                          }}
                        >
                          <PencilSquareIcon className="text-gray-600 font-bold p-1" />
                        </button>
                        <button
                          className="btn btn-ghost btn-circle btn-sm"
                          onClick={() => {
                            window.modal_delete.showModal();
                            setBookId(book.id);
                          }}
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
              <div className="flex flex-col gap-4">
                <div>
                  <label
                    className="block text-gray-700 mb-1 text-md"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    className="input input-sm input-bordered w-full max-w-xs"
                    onChange={(e) => setUpdateTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="author">
                    Author
                  </label>
                  <input
                    id="author"
                    type="text"
                    className="input input-sm input-bordered w-full max-w-xs"
                    onChange={(e) => setUpdateAuthor(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 mb-1"
                    htmlFor="publishdate"
                  >
                    Publish date
                  </label>
                  <input
                    id="publishdate"
                    type="text"
                    className="input input-sm input-bordered w-full max-w-xs"
                    onChange={(e) => setUpdatePublishDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="price">
                    Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    className="input input-sm input-bordered w-full max-w-xs"
                    onChange={(e) => setUpdatePrice(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 mb-1"
                    htmlFor="sysnopsis"
                  >
                    Synopsis
                  </label>
                  <input
                    id="synopsis"
                    type="text"
                    className="input input-sm input-bordered w-full max-w-xs"
                    onChange={(e) => setUpdateDescription(e.target.value)}
                  />
                </div>
                <div>
                  <figure className="w-[190px]">
                    <img
                      src={
                        booksData.find((x) => x.id === bookId) === undefined
                          ? ""
                          : booksData.find((x) => x.id === bookId).imageurl
                      }
                      className="h-48"
                    />
                  </figure>
                </div>
                <div>
                  <label
                    className="block text-gray-700 mb-1"
                    htmlFor="sysnopsis"
                  >
                    Edit image
                  </label>
                  <input
                    type="file"
                    className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                  />
                </div>
              </div>
              <div className="modal-action">
                <button
                  className="btn btn-sm btn-secondary border-0 text-md rounded capitalize"
                  onClick={() => {
                    updateBookById();
                  }}
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
                  className="btn btn-accent btn-sm border-0 text-md rounded capitalize"
                  onClick={() => deleteBookById()}
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

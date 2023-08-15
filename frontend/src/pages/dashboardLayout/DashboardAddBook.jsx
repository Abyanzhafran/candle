import { useRef, useState } from "react";
import axios from "axios";

export default function DashboardHome() {
  const [addTitle, setAddTitle] = useState("");
  const [addAuthor, setAddAuthor] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [addPublishDate, setAddPublishDate] = useState("");
  const [addPrice, setAddPrice] = useState(0);
  const [addImageFile, setAddImageFile] = useState(null);

  const addTitleRef = useRef("");
  const addAuthorRef = useRef("");
  const addDescriptionRef = useRef("");
  const addPublishDateRef = useRef("");
  const addPriceRef = useRef(0);
  const addImageFileRef = useRef(null);

  const api_url = import.meta.env.VITE_API_URL;

  const clearFormFields = () => {
    setAddTitle("");
    setAddAuthor("");
    setAddDescription("");
    setAddPublishDate("");
    setAddPrice(0);
    setAddImageFile(null);
    addTitleRef.current.value = "";
    addAuthorRef.current.value = "";
    addDescriptionRef.current.value = "";
    addPublishDateRef.current.value = "";
    addPriceRef.current.value = 0;
    addImageFileRef.current.files = null;
  };

  const addBook = () => {
    const formData = new FormData();
    formData.append("title", addTitle);
    formData.append("description", addDescription);
    formData.append("author", addAuthor);
    formData.append("publishdate", addPublishDate);
    formData.append("price", addPrice);
    formData.append("imagefile", addImageFile);

    axios
      .post(api_url + `/books`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert(response.data.message);
        clearFormFields();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-start w-full mt-8 pl-8">
      <div className="flex flex-col gap-6">
        <span className="text-2xl font-bold">Add Book</span>
        <div className="sm:w-[580px] md:w-[600px] lg:w-[780px] grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              ref={addTitleRef}
              defaultValue={""}
              placeholder="Type here"
              className="input input-bordered input-sm w-full max-w-xs"
              onChange={(e) => setAddTitle(e.target.value)}
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Author</span>
            </label>
            <input
              type="text"
              ref={addAuthorRef}
              defaultValue={""}
              placeholder="Type here"
              className="input input-bordered input-sm w-full max-w-xs"
              onChange={(e) => setAddAuthor(e.target.value)}
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Publish date</span>
            </label>
            <input
              type="date"
              ref={addPublishDateRef}
              defaultValue={""}
              placeholder="Type here"
              className="input input-bordered input-sm w-full max-w-xs"
              onChange={(e) => setAddPublishDate(e.target.value)}
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              ref={addDescriptionRef}
              defaultValue={""}
              className="textarea textarea-bordered"
              placeholder="Bio"
              onChange={(e) => setAddDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              ref={addPriceRef}
              defaultValue={""}
              placeholder="Type here"
              className="input input-bordered input-sm w-full max-w-xs"
              onChange={(e) => setAddPrice(e.target.value)}
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Upload cover</span>
            </label>
            <input
              type="file"
              ref={addImageFileRef}
              defaultValue={null}
              className="file-input file-input-bordered file-input-sm w-full max-w-xs"
              onChange={(e) => setAddImageFile(e.target.files[0])}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div />
          <label
            htmlFor="modal-add"
            className="btn btn-sm btn-secondary text-md rounded capitalize"
          >
            Submit
          </label>
          <input type="checkbox" id="modal-add" className="modal-toggle" />
          <label htmlFor="modal-add" className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
              <h3 className="text-xl font-bold">Yakin mau submit ?</h3>
              <div className="modal-action">
                <label
                  htmlFor="modal-add"
                  className="btn btn-sm btn-secondary text-md rounded capitalize"
                  onClick={() => addBook()}
                >
                  Submit
                </label>
              </div>
            </label>
          </label>
        </div>
      </div>
    </div>
  );
}

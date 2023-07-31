export default function DashboardHome() {
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
              placeholder="Type here"
              className="input input-bordered input-sm w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Author</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-sm w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Publish date</span>
            </label>
            <input
              type="date"
              placeholder="Type here"
              className="input input-bordered input-sm w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              placeholder="Bio"
            ></textarea>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              placeholder="Type here"
              className="input input-bordered input-sm w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Upload cover</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-sm w-full max-w-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

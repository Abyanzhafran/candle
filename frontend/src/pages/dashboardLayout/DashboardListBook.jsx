import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function DashboardAbout() {
  const bookData = [
    {
      cover: "lorem ipsum",
      title: "lorem ipsum",
      description:
        "lorem ipsum dolor sit amet lorem ipsum dolor sit amet loremipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
      author: "lorem ipsum",
      publishDate: "12/07/2023",
    },
    {
      cover: "lorem ipsum",
      title: "lorem ipsum",
      description:
        "lorem ipsum dolor sit amet lorem ipsum dolor sit amet loremipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
      author: "lorem ipsum",
      publishDate: "12/07/2023",
    },
    {
      cover: "lorem ipsum",
      title: "lorem ipsum",
      description:
        "lorem ipsum dolor sit amet lorem ipsum dolor sit amet loremipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
      author: "lorem ipsum",
      publishDate: "12/07/2023",
    },
    {
      cover: "lorem ipsum",
      title: "lorem ipsum",
      description:
        "lorem ipsum dolor sit amet lorem ipsum dolor sit amet loremipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
      author: "lorem ipsum",
      publishDate: "12/07/2023",
    },
    {
      cover: "lorem ipsum",
      title: "lorem ipsum",
      description:
        "lorem ipsum dolor sit amet lorem ipsum dolor sit amet loremipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
      author: "lorem ipsum",
      publishDate: "12/07/2023",
    },
    {
      cover: "lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor",
      title: "lorem ipsum",
      description:
        "lorem ipsum dolor sit amet lorem ipsum dolor sit amet loremipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
      author: "lorem ipsum",
      publishDate: "12/07/2023",
    },
  ];

  return (
    <div className="flex items-start justify-start w-full h-auto mt-8 px-8">
      <div className="w-80 flex flex-col flex-wrap gap-6">
        <span className="text-2xl font-bold">List Book</span>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Author</th>
                <th>Publish date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {bookData.map((book) => (
                <tr>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src="http://daisyui.com/tailwind-css-component-profile-5@56w.png"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{book.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="w-96 max-h-12 line-clamp-2">
                    {book.description}
                  </td>
                  <td className="w-32">{book.author}</td>
                  <td className="w-24">{book.publishDate}</td>
                  <td className="flex items-center px-6 py-4 gap-2">
                    <button className="btn btn-ghost btn-xs">details</button>
                    <button className="btn btn-ghost btn-circle btn-sm">
                      <PencilSquareIcon className="text-gray-600 font-bold p-1" />
                    </button>
                    <button className="btn btn-ghost btn-circle btn-sm">
                      <TrashIcon className="text-gray-600 font-bold p-1" />
                    </button>
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

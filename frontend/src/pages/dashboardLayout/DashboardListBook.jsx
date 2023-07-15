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
      cover: "lorem ipsum",
      title: "lorem ipsum",
      description:
        "lorem ipsum dolor sit amet lorem ipsum dolor sit amet loremipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
      author: "lorem ipsum",
      publishDate: "12/07/2023",
    },
  ];

  return (
    <div className="flex items-center justify-start w-full mt-8 pl-8">
      <div className="flex flex-col gap-6">
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
                  <td className="max-w-sm max-h-12 line-clamp-2">
                    {book.description}
                  </td>
                  <td>{book.author}</td>
                  <td>{book.publishDate}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

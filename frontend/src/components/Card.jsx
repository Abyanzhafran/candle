import { useEffect, useState } from "react";
import axios from "axios";

export default function Card() {
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

  return (
    <>
      {booksData.map((book) => (
        <div className="card w-[190px] bg-gray-100 shadow-sm">
          <figure className="w-[190px]">
            <img src={book.imageurl} className="h-48" />
          </figure>
          <div className="card-body p-4 h-44">
            <h2 className="text-lg font-semibold text-gray-700 line-clamp-2">
              {book.title}
            </h2>
            <p className="line-clamp-2 text-gray-700">{book.description}</p>
            <div className="card-actions justify-start">
              <div className="text-md font-bold text-gray-700">
                Rp. {book.price}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

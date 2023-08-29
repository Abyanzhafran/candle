import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function BookDetail() {
  const [bookDetail, setBookDetail] = useState("");
  const api_url = import.meta.env.VITE_API_URL;

  var params = useParams();

  useEffect(() => {
    axios.get(api_url + `/books/${params.bookId}`).then((res) => {
      setBookDetail(res.data.data);
    });
  }, []);

  return (
    <div className="flex items-center justify-start w-full mt-8 pl-8 px-6">
      <div className="flex flex-wrap lg:flex-nowrap  gap-6">
        <img src={bookDetail.imageurl} className="h-72" />
        <div className="flex flex-col gap-1">
          <div>
            <span className="font-bold">Title : </span>
            <span>{bookDetail.title}</span>
          </div>
          <div>
            <span className="font-bold">Author : </span>
            <span>{bookDetail.author}</span>
          </div>
          <div>
            <span className="font-bold">Publish date : </span>
            <span>{bookDetail.publishdate}</span>
          </div>
          <div>
            <span className="font-bold">Price : </span>
            <span>{bookDetail.price}</span>
          </div>
          <div>
            <span className="font-bold">Synopsis : </span>
            <span className="text-justify line-clamp-[7]">
              {bookDetail.description}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

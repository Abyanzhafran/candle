import { useState } from "react";
import axios from "axios";

export default function SignIn() {
  const [usernameAuth, setUsernameAuth] = useState("");
  const [passwordAuth, setPasswordAuth] = useState("");

  const api_url = import.meta.env.VITE_API_URL;

  const auth = () => {
    axios
      .get(api_url + `/books`, {
        headers: {
          Authorization: `Basic ${btoa(`${usernameAuth}:${passwordAuth}`)}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="card w-96 bg-gray-100 border-2 border-gray-300">
        <div className="card-body flex flex-col items-center">
          <span className="text-6xl font-berlin font-semibold text-sky-600">
            Candle
          </span>
          <span className="text-3xl font-semibold mb-10">
            Welcome to Candle
          </span>
          <div className="w-full flex flex-col gap-3 px-4">
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered border-gray-300 w-full max-w-xs bg-gray-100"
              onChange={(e) => setUsernameAuth(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered border-gray-300 w-full max-w-xs bg-gray-100"
              onChange={(e) => setPasswordAuth(e.target.value)}
            />
          </div>
          <button
            className="btn btn-info"
            onClick={() => {
              auth();
            }}
          >
            Info
          </button>
        </div>
      </div>
    </div>
  );
}

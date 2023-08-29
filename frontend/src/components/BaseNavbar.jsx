import { Bars3Icon, ArrowDownIcon } from "@heroicons/react/24/solid";
import { Link, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export default function BaseNavbar() {
  const logout = () => {
    Cookies.remove("loggedIn");
    window.location.reload();
  };

  return (
    <>
      <div className="drawer drawer-mobile h-screen">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="flex flex-col items-center justify-center drawer-content">
          <div className="w-full navbar flex items-center bg-gray-50 border-b-2 border-gray-300 sticky top-0 z-10">
            <div className="flex-none lg:hidden">
              <label
                for="my-drawer-2"
                className="btn btn-square btn-ghost btn-sm"
              >
                <Bars3Icon className="text-gray-800" />
              </label>
            </div>

            <div className="flex-none font-mono ml-2">
              <Link
                to="/"
                className="font-mono font-bold text-3xl text-sky-500"
              >
                Candle
              </Link>
            </div>

            <div className="flex-1"></div>

            <div className="dropdown dropdown-bottom dropdown-end flex items-end">
              <label tabIndex={0} className="m-1 avatar">
                <div className="rounded-full w-8 mt-1 mr-2">
                  <img src="http://daisyui.com/tailwind-css-component-profile-5@56w.png" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-gray-50 rounded-box w-52"
              >
                <li>
                  <Link to="/dashboard2" className="text-gray-800">
                    Go to dashboard
                  </Link>
                </li>
                <li onClick={logout}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

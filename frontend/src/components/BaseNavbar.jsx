import { Bars3Icon, ArrowDownIcon } from "@heroicons/react/24/solid";
import { Link, Outlet } from "react-router-dom";

export default function BaseNavbar() {
  const checkboxData = [
    {
      name: "Lorem checkbox_1",
    },
    {
      name: "Lorem checkbox_2",
    },
    {
      name: "Lorem checkbox_3",
    },
  ];

  return (
    <>
      <div className="drawer drawer-mobile h-screen">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="flex flex-col items-center justify-center drawer-content">
          <div className="w-full navbar flex items-center bg-gray-100 border-b-2 border-gray-300 sticky top-0 z-10">
            <div className="flex-none lg:hidden">
              <label
                for="my-drawer-2"
                className="btn btn-square btn-ghost btn-sm"
              >
                <Bars3Icon className="text-gray-800" />
              </label>
            </div>

            <div className="flex-none font-mono ml-2">
              <p className="font-mono font-bold text-3xl text-sky-500">
                Candle
              </p>
            </div>

            <div className="flex-1"></div>

            <button className="flex items-end">
              <div className="avatar">
                <div className="rounded-full w-8 mt-1 mr-2">
                  <img src="http://daisyui.com/tailwind-css-component-profile-5@56w.png" />
                </div>
              </div>
              <ArrowDownIcon className="text-white" />
            </button>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

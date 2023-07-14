import { Bars3Icon, ArrowDownIcon } from '@heroicons/react/24/solid'
import { Link, Outlet } from "react-router-dom"

export default function BaseNavbar() {
  const checkboxData = [
    {
      name: "Lorem checkbox_1"
    },
    {
      name: "Lorem checkbox_2"
    },
    {
      name: "Lorem checkbox_3"
    },
  ]

  return (
    <>
      <div className="drawer drawer-mobile h-screen">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="flex flex-col items-center justify-center drawer-content">
          <div className="w-full navbar flex items-center bg-gray-100 border-b-2 border-gray-300 sticky top-0 z-10">
            <div className="flex-none lg:hidden">
              <label for="my-drawer-2" className="btn btn-square btn-ghost btn-sm">
                <Bars3Icon className="text-gray-800" />
              </label>
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

        <div className="drawer-side">
          {/* <label for="my-drawer-2" className="drawer-overlay"></label> */}
          <ul className="menu p-4 overflow-y-auto w-80 bg-gray-100">
            <Link to="/" className="normal-case text-4xl font-berlin font-semibold text-sky-600">Candle</Link>
            <div className="border-b-2 border-gray-300 my-[6px] mb-8 z-20" />
            {/* card checkbox */}
            <div className="card w-auto bg-gray-100 border border-gray-300 items-start">
              <div className="form-control p-4 pl-6">
                <label className="label flex flex-col items-start gap-4">
                  <span className="font-semibold text-gray-700 text-xl text-start cursor-default">Category</span>
                  {checkboxData.map((x) => (
                    <div className="flex items-start justify-center gap-2">
                      <span className="label-text text-gray-700">{x.name}</span>
                      <input type="checkbox" className="checkbox checkbox-sm border border-gray-700 cursor-pointer" />
                    </div>
                  ))}
                </label>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </>
  )
}
import { HomeIcon, Bars3Icon, ArrowDownIcon } from '@heroicons/react/24/solid'
import {
  Link, Outlet
} from "react-router-dom";

export default function BaseDashboardLayout2() {
  const btnSidebar = [
    {
      icon: <HomeIcon />,
      name: 'HOME',
      link: '/dashboard2',
    },
    {
      icon: <HomeIcon />,
      name: 'ABOUT',
      link: '/dashboard2/about',
    }
  ];

  return (
    <>
      <div className="shadow drawer drawer-mobile h-screen">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="flex flex-col items-center justify-center drawer-content">
          <div className="w-full navbar flex items-center bg-base-100 sticky top-0">
            <div className="flex-none lg:hidden">
              <label for="my-drawer-2" className="btn btn-square btn-ghost">
                <Bars3Icon className="text-white" />
              </label>
            </div>
            <div className="flex-1 px-2 mx-2">
              <div className="rounded-full w-8 mt-1">
                <img src="http://daisyui.com/tailwind-css-component-profile-5@56w.png" />
              </div>
            </div>
            <button className="flex items-center">
              <div className="avatar">
                <div className="rounded-full w-8 mt-1">
                  <img src="http://daisyui.com/tailwind-css-component-profile-5@56w.png" />
                </div>
              </div>
              <ArrowDownIcon className="text-white" />
            </button>
          </div>
          <main className="w-full h-screen flex items-center justify-center bg-gray-500">
            <Outlet />
          </main>
        </div>
        <div className="drawer-side">
          <label for="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            <div>
              <span className="text-xl font-bold text-white">Dashboard</span>
            </div>
            <div className="border-b-2 bg-white my-4" />
            <li className="text-white">
              {btnSidebar.map((el) => (
                <Link to={el.link} key={el.link}>
                  <div className="flex gap-3">
                    {el.icon}
                    {el.name}
                  </div>
                </Link>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

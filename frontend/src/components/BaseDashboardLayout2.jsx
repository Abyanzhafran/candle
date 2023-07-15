import {
  Bars3Icon,
  UserCircleIcon,
  PlusIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { Link, Outlet } from "react-router-dom";

export default function BaseDashboardLayout2() {
  // const api_url = import.meta.env.VITE_API_URL;
  const btnSidebar = [
    {
      icon: <PlusIcon />,
      name: "Add book",
      link: "/dashboard2/dashboard-add-book",
    },
    {
      icon: <ClipboardDocumentListIcon />,
      name: "List book",
      link: "/dashboard2/dashboard-list-book",
    },
  ];

  return (
    <>
      <div className="shadow drawer drawer-mobile h-full lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="flex flex-col items-center justify-center drawer-content">
          <div className="w-full navbar flex items-center bg-gray-50 sticky top-0">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-2"
                className="hover:bg-gray-200 hover:rounded-full w-9"
              >
                <Bars3Icon className="text-gray-600 font-bold p-1" />
              </label>
            </div>

            <div className="flex-1"></div>

            <div className="flex items-center gap-2">
              {/* Daily Capital Modal */}
              <input
                type="checkbox"
                id="daily-capital-modal"
                className="modal-toggle"
              />
              <label
                htmlFor="daily-capital-modal"
                className="modal cursor-pointer"
              >
                <label className="modal-box relative" htmlFor="">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold">Buat Modal Harian</h3>
                    <input
                      type="number"
                      placeholder="eg: 20000000"
                      className="input input-sm input-bordered w-full max-w-xs"
                      onChange={(e) => setUpdateThisDayCapital(e.target.value)}
                    />
                    <div className="modal-action">
                      <label
                        htmlFor="modal-update"
                        className="btn btn-sm btn-secondary border-0 text-md rounded capitalize"
                        onClick={() => setThisDayCapital()}
                      >
                        Submit
                      </label>
                    </div>
                  </div>
                </label>
              </label>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                  <div className="w-8 rounded-full">
                    <UserCircleIcon />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="https://inventory-mj-fe.vercel.app">
                      Go to homepage
                    </Link>
                  </li>
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <main className="w-full h-screen bg-gray-200 overflow-auto">
            <Outlet />
          </main>
        </div>

        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay" />
          <ul className="menu p-4 w-72 h-full bg-gray-50 text-base-content">
            <div className="flex items-center gap-4">
              <label
                htmlFor="my-drawer-2"
                className="hover:bg-gray-200 hover:rounded-full w-9 lg:hidden"
              >
                <Bars3Icon className="text-gray-600 font-bold p-1" />
              </label>
              <span className="text-xl ml-0 md:ml-4 font-bold text-gray-600 whitespace-nowrap">
                Dashboard Seller
              </span>
            </div>
            <div className="my-4" />
            {btnSidebar.map((el) =>
              el.children ? (
                <div tabIndex="0" className="collapse collapse-arrow">
                  <input type="checkbox" className="peer" />
                  <div className="collapse-title text-gray-600 font-semibold flex gap-3 whitespace-nowrap">
                    <div className="w-7">{el.icon}</div>
                    {el.name}
                  </div>
                  <ul className="collapse-content">
                    {el.children.map((child) => (
                      <li key={child.link}>
                        <Link
                          to={child.link}
                          className="flex gap-3 active:bg-gray-300"
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <li className="text-gray-600 font-semibold" key={el.link}>
                  <Link
                    to={el.link}
                    className="flex gap-3 text-base active:bg-gray-300"
                  >
                    <div className="w-7">{el.icon}</div>
                    {el.name}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

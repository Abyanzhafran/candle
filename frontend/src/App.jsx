import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import BaseNavbar from "./components/BaseNavbar";
// import BaseDashboardLayout from "./components/BaseDashboardLayout";
import BaseDashboardLayout2 from "./components/BaseDashboardLayout2";
import DashboardAddBook from "./pages/dashboardLayout/DashboardAddBook";
import DashboardListBook from "./pages/dashboardLayout/DashboardListBook";
import DetailBook from "./pages/DetailBook";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BaseNavbar />}>
          <Route path="" element={<Home />}></Route>
          <Route path="about" element={<About />}></Route>
        </Route>
        <Route path="signin" element={<SignIn />}></Route>
        <Route path="book-detail" element={<DetailBook />}></Route>
      </Routes>
      {/* Not used, but just in case, so i don't delete it */}
      {/* <Routes>
        <Route path="/dashboard" element={<BaseDashboardLayout />}>
          <Route path="" element={<DashboardHome />}></Route>
          <Route path="about" element={<DashboardAbout />}></Route>
        </Route>
      </Routes> */}
      {/* till here */}
      <Routes>
        <Route path="/dashboard2" element={<BaseDashboardLayout2 />}>
          <Route path="" element={<DashboardAddBook />}></Route>
          <Route
            path="dashboard-list-book"
            element={<DashboardListBook />}
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

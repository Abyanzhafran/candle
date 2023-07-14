import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import BaseNavbar from "./components/BaseNavbar"
import BaseDashboardLayout from "./components/BaseDashboardLayout"
import BaseDashboardLayout2 from "./components/BaseDashboardLayout2"
import DashboardHome from "./pages/dashboardLayout/DashboardHome"
import DashboardAbout from "./pages/dashboardLayout/DashboardAbout"

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BaseNavbar />}>
          <Route path="" element={<Home />}></Route>
          <Route path="about" element={<About />}></Route>
        </Route>
        <Route path="signin" element={<SignIn />}></Route>
      </Routes>
      <Routes>
        <Route path="/dashboard" element={<BaseDashboardLayout />}>
          <Route path="" element={<DashboardHome />}></Route>
          <Route path="about" element={<DashboardAbout />}></Route>
        </Route>
      </Routes>
      <Routes>
        <Route path="/dashboard2" element={<BaseDashboardLayout2 />}>
          <Route path="" element={<DashboardHome />}></Route>
          <Route path="about" element={<DashboardAbout />}></Route>
        </Route>
      </Routes>
    </>
  )
}
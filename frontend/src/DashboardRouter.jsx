import { Route, Routes } from "react-router"
import BaseDashboardLayout from "./components/BaseDashboardLayout"
import DashboardHome from "./pages/dashboardLayout/DashboardHome"
import Home from "./pages/Home"

export default function DashboardRouter() {
  return (
    <>
      <BaseDashboardLayout />
      <Routes>
        <Route path="/dashboard" element={<Home />}></Route>
      </Routes>
    </>
  )
}
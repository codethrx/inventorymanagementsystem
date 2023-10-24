import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./page/account/login";
//
import Register from "./page/account/register";
import ForgetPass from "./page/account/forgetPass";
import ResetPass from "./page/account/resetPassword";
import DefaultLayout from "./components/dashboard/defaultLayout";
import EmployeeProfile from "./components/profile/employeeProfile";
import { SalesPerson } from "./components/dashboard/salesperson";
import { useAuth } from "./context/auth";
import { SuperAdmin } from "./components/dashboard/superAdmin/superAdmin";
import { Admin } from "./components/dashboard/storeAdmin/admin";

function App() {
  const { user, getDashboardURL } = useAuth();
  return (
    <div className="App">
      <ToastContainer />

      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to={getDashboardURL()} /> : <Login />}
        />
        <Route
          path="/superadmin"
          element={user ? <SuperAdmin /> : <Navigate to="/" />}
        />
        <Route path="/admin" element={user ? <Admin /> : <Navigate to="/" />} />
        <Route
          path="/salesperson"
          element={user ? <SalesPerson /> : <Navigate to="/" />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPass />} />
        <Route path="/reset-password/:token" element={<ResetPass />} />
        {/*
         */}
        <Route path="/default" element={<DefaultLayout />} />
        {/* <Route path="/profile" element={<EmployeeProfile />} /> */}
      </Routes>
    </div>
  );
}

export default App;

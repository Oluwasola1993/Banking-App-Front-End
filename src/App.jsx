import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Dashboard from "./Components/Dashboard";
import { Toaster } from "react-hot-toast";
import Home from "./Components/Home";
import About from "./Components/About";
import Account from "./Pages/Account";
import Card from "./Pages/Card";
import Settings from "./Pages/Settings";
import FlutterVerify from "./Pages/FlutterVerify";
import FundWallet from "./Pages/FundWallet";
import Verify from "./Components/Verify";
import Intrawallet from "./Pages/Intrawallet";
import ResetPass from "./Pages/ResetPass";
import AdminDashboard from "./Components/AdminDashboard";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated } from "./Redux/Pageslide";
import { useEffect } from "react";
import Adminsignin from "./Components/Adminsignin";
import Admintrans from "./Pages/Admintrans";
import Adminservices from "./Pages/Adminservices";
import Adminsupport from "./Pages/Adminsupport";

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setAuthenticated(true));
    }
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/about" element={<About />} />
        <Route path="/reset-password" element={<ResetPass />} />
        <Route
          path="/verify_mail"
          element={isAuthenticated ? <Verify /> : <Navigate to="/Signin" />}
          replace
        />
        <Route
          path="/dashboard/"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />}
          replace
        />
        <Route
          path="/dashboard/account"
          element={isAuthenticated ? <Account /> : <Navigate to="/signin" />}
          replace
        />
        <Route
          path="/dashboard/card"
          element={isAuthenticated ? <Card /> : <Navigate to="/signin" />}
          replace
        />
        <Route
          path="/dashboard/settings"
          element={isAuthenticated ? <Settings /> : <Navigate to="/signin" />}
          replace
        />
        <Route
          path="/dashboard/fund_wallet"
          element={isAuthenticated ? <FundWallet /> : <Navigate to="/signin" />}
          replace
        />
        <Route
          path="/dashboard/flutter_payment"
          element={
            isAuthenticated ? <FlutterVerify /> : <Navigate to="/signin" />
          }
          replace
        />
        <Route
          path="/dashboard/intra-transfer"
          element={
            isAuthenticated ? <Intrawallet /> : <Navigate to="/signin" />
          }
          replace
        />

        {/* Admin Routes */}
        <Route path="/admin-signin" element={<Adminsignin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-transactions" element={<Admintrans />} />
        <Route path="/admin-services" element={<Adminservices />} />
        <Route path="/admin-support" element={<Adminsupport />} />
      </Routes>
    </>
  );
};

export default App;

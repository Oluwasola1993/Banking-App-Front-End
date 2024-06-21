import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { MdOutlineAccountBalance } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";

const Adminsupport = () => {
  const navigate = useNavigate();

  const logOutUser = () => {
    localStorage.removeItem("token");
    navigate("/admin-signin");
  };

  return (
    <div
      className="container-fluid"
      id="firstCont"
      style={{ background: "#412f3a" }}
    >
      <div className="row" id="side">
        <div className="col-sm-5 col-md-2 col-lg-2">
          <div id="navLink">
            <div className="">
              <IoHome className="icons" />
              <NavLink
                to="/admin-dashboard/"
                className={` ${
                  location.pathname === "/admin-dashboard/"
                    ? "text-info fs-5 fw-bold active px-2 text-decoration-none"
                    : "text-info fs-5 fw-bold text-decoration-none px-2"
                }`}
              >
                Summary
              </NavLink>
            </div>
            <div className="">
              <MdOutlineAccountBalance className="icons" />
              <NavLink
                to="/admin-transactions"
                className={` ${
                  location.pathname === "/admin-transactions"
                    ? "text-info fs-5 fw-bold px-2 active text-decoration-none"
                    : "text-white text-decoration-none px-2"
                }`}
              >
                Transactions
              </NavLink>
            </div>
            <div>
              <FaRegCreditCard className="icons" />
              <NavLink
                to="/admin-services"
                className={` ${
                  location.pathname === "/admin-services"
                    ? "text-info px-2 fs-5 fw-bold active text-decoration-none"
                    : "text-white text-decoration-none px-2"
                }`}
              >
                Services
              </NavLink>
            </div>
            <div>
              <IoMdSettings className="icons" />
              <NavLink
                to="/admin-support"
                className={` ${
                  location.pathname === "/admin-support"
                    ? "text-info fs-5 px-2 fw-bold active text-decoration-none"
                    : "text-white text-decoration-none px-2"
                }`}
              >
                Support
              </NavLink>
            </div>
            <div
              className="log "
              style={{ cursor: "pointer" }}
              onClick={logOutUser}
            >
              <RiLogoutCircleLine />
              <h6 className="pt-1">Log Out</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminsupport;

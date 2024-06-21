import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { MdOutlineAccountBalance } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutCircleLine } from "react-icons/ri";

const Card = () => {
  return (
    <div
      className="container-fluid"
      id="firstCont"
      style={{ background: "#412f3a", height: "100vh" }}
    >
      <div className="row" id="side">
        <div className="col-sm-12 col-md-2 col-lg-2">
          <div id="navLink">
            <div className="">
              <IoHome className="icons" />
              <NavLink
                to="/dashboard/"
                className={` ${
                  location.pathname === "/dashboard"
                    ? "text-info fs-5 fw-bold px-2 text-decoration-none"
                    : "text-white text-decoration-none px-2"
                }`}
              >
                Home
              </NavLink>
            </div>
            <div className="">
              <MdOutlineAccountBalance className="icons" />
              <NavLink
                to="/dashboard/account"
                className={` ${
                  location.pathname === "/dashboard/account"
                    ? "text-info fs-5 fw-bold px-2 text-decoration-none"
                    : "text-white text-decoration-none px-2"
                }`}
              >
                Account
              </NavLink>
            </div>
            <div>
              <FaRegCreditCard className="icons" />
              <NavLink
                to="/dashboard/card"
                className={` ${
                  location.pathname === "/dashboard/card"
                    ? "text-info fs-5 fw-bold px-2 text-decoration-none"
                    : "text-white text-decoration-none px-2"
                }`}
              >
                Card
              </NavLink>
            </div>
            <div>
              <IoMdSettings className="icons" />
              <NavLink
                to="/dashboard/settings"
                className={` ${
                  location.pathname === "/dashboard/settings"
                    ? "text-info fs-5 fw-bold active text-decoration-none"
                    : "text-white text-decoration-none px-2"
                }`}
              >
                Settings
              </NavLink>
            </div>
            <div className="log">
              <RiLogoutCircleLine />
              <h6 className="pt-1">Log Out</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

import React from "react";
import { NavLink } from "react-router-dom";
import personal from "../assets/Images/personal-cover.jpg";
import { useNavigate } from "react-router-dom";
import Bimg from "../assets/Images/hero.jpeg";
import phone from "../assets/Images/teaser-pnc.svg";
import { SlCalender } from "react-icons/sl";
import { FaLocationDot } from "react-icons/fa6";
import { MdLocalLaundryService } from "react-icons/md";

const Home = () => {
  const navigate = useNavigate();

  const signup = () => {
    navigate("/signup");
  };

  const Navlinks = [
    { name: "Personal", path: "/" },
    { name2: "About", path: "/about" },
    { name3: "Signup", path: "/signup" },
  ];

  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{ background: "#414e58" }}
      >
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand text-white px-1">
            SOLCEMAN BANK
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul
              className="nav me-auto mb-2 mb-lg-0 mx-auto"
              style={{
                listStyleType: "none",
                fontSize: "16px",
              }}
            >
              {Navlinks.map((link) => (
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "fw-bold text-white text-decoration-underline fs-5"
                      : null
                  }
                  key={link.name}
                  to={link.path}
                  style={{
                    textDecoration: "none",
                    color: "#908d89",
                  }}
                >
                  <li>{link.name}</li>
                </NavLink>
              ))}
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul
              className="nav me-auto mb-2 mb-lg-0 mx-auto"
              style={{
                listStyleType: "none",
                fontSize: "16px",
              }}
            >
              {Navlinks.map((link) => (
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "fw-bold text-white text-decoration-underline fs-5"
                      : null
                  }
                  key={link.name2}
                  to={link.path}
                  style={{
                    textDecoration: "none",
                    color: "#908d89",
                  }}
                >
                  <li>{link.name2}</li>
                </NavLink>
              ))}
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul
              className="nav me-auto mb-2 mb-lg-0 mx-auto"
              style={{
                listStyleType: "none",
                fontSize: "16px",
              }}
            >
              {Navlinks.map((link) => (
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "fw-bold text-white text-decoration-underline fs-5"
                      : null
                  }
                  key={link.name3}
                  to={link.path}
                  style={{
                    textDecoration: "none",
                    color: "#908d89",
                  }}
                >
                  <li>{link.name3}</li>
                </NavLink>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid px-0" style={{ overflow: "hidden" }}>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <img src={personal} alt="" id="first" />
            <div className="shadow-lg rounded" id="second">
              <h1 style={{ color: "#484848" }}>
                Change the <br /> Way You Bank
              </h1>
              <p style={{ color: "#484848" }}>
                Take your next step with SOLCEMAN <br /> Virtual Wallet -
                checking, savings <br />
                and financial tools designed to go <br /> wherever you do.
              </p>
              <button
                style={{
                  background: "#0069aa",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                <a href="#" className="btn btn-lg text-white" onClick={signup}>
                  Learn More & Apply
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid px-0" style={{ overflow: "hidden" }}>
        <div className="row">
          <div className="col-lg-12 col-sm-12 col-md-12 text-center">
            <img src={Bimg} id="third" alt="" />
            <div id="fourth">
              <h2>Financial Wellness</h2>
              <h3
                style={{
                  color: "RGB(72, 72, 72)",
                  fontFamily: "PNC Brand",
                  fontSize: "31.104px",
                }}
              >
                We can help you get a clear picture of where you are <br />{" "}
                today and help you plan for the future you want.
              </h3>
              <p
                className="pt-3"
                style={{
                  color: "#004c97",
                  fontFamily: "monospace",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
                onClick={signup}
              >
                Learn more and start your banking journey to securing a better
                and brighter future {"--->"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid py-5" style={{ background: "#415a76" }}>
        <div className="row">
          <div className="col-sm-12 col-lg-12 col-md-12">
            <div className="text-white text-center">
              <h2
                style={{
                  fontFamily: "PNC Brand Medium",
                  color: "#fff",
                  fontSize: "37.314px",
                }}
              >
                Mobile App
              </h2>
              <h3
                style={{
                  fontFamily: "PNC Brand",
                  color: "RGB(255, 255, 255)",
                  fontSize: "31.104px",
                }}
              >
                Bank anytime, anywhere.
              </h3>
              <div className="d-flex justify-content-center">
                <img src={phone} className="w-25" alt="" />
                <p className="pt-5">
                  Open a new account, deposit a check, check balances, <br />{" "}
                  make bill payments and more – all from our mobile app <br />{" "}
                  on your smartphone or tablet.
                  <p onClick={signup} style={{ cursor: "pointer", paddingTop: '5px', fontSize: '18px', fontFamily: 'monospace' }}>
                    Learn More {"--->"}
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid py-3" style={{ background: "#2e4867" }}>
        <div className="row pt-4">
          <div className="col-sm-12 col-lg-12 col-md-12 text-center">
            <h1 className="text-white">Contact Us</h1>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-sm-12 col-lg-4 col-md-6">
            <div className="text-center text-white">
              <SlCalender />
              <h3 className="text-white">Let’s Meet</h3>
              <p>
                Review your calendar and find a <br /> convenient time to meet
                with us.
              </p>
              <a href="" className="text-white" style={{fontFamily: 'monospace'}}>
                Schedule an Appointment {"--->"}
              </a>
            </div>
          </div>
          <div className="col-sm-12 col-lg-4 col-md-6">
            <div className="text-center text-white">
              <FaLocationDot />
              <h3 className="text-white">Visit Us</h3>
              <p>
                Find a SOLCEMAN location near you <br /> and stop by to see us.
              </p>
              <a href="" className="text-white" style={{fontFamily: 'monospace'}}>
                Find a SOLCEMAN Branch{"--->"}
              </a>
            </div>
          </div>
          <div className="col-sm-12 col-lg-4 col-md-6 mb-4">
            <div className="text-center text-white">
              <MdLocalLaundryService />
              <h3 className="text-white">Call Us</h3>
              <h6>Mon - Fri: 8 a.m. - 9 p.m. GMT</h6>
              <h6>Sat - Sun: 8 a.m. - 5 p.m. GMT</h6>
              <a href="" className="text-white" style={{fontFamily: 'monospace'}}>
                Call +2348053185250 {"--->"}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container-fluid px-5 py-4"
        style={{ background: "#2d3943" }}
      >
        <div className="row mx-4 text-white">
          <div className="col-sm-12 col-lg-2 col-md-2">
            <a href="" className="text-white" id="links" style={{fontFamily: 'monospace'}}>
              Security
            </a>
          </div>
          <div className="col-sm-12 col-lg-2 col-md-2" style={{fontFamily: 'monospace'}}>
            <a href="" className="text-white" id="links">
              Terms & Conditions
            </a>
          </div>
          <div className="col-sm-12 col-lg-2 col-md-2" style={{fontFamily: 'monospace'}}>
            <a href="" className="text-white" id="links">
              Privacy Policy
            </a>
          </div>
          <div className="col-sm-12 col-lg-2 col-md-2" style={{fontFamily: 'monospace'}}>
            <a href="" className="text-white" id="links">
              Cookie Preferences
            </a>
          </div>
          <div className="col-sm-12 col-lg-2 col-md-2">
            <a href="" className="text-white" id="links" style={{fontFamily: 'monospace'}}>
              Do Not Sell or Share My Personal Information
            </a>
          </div>
        </div>
        <div className="row mx-3 text-white py-2">
          <div className="col-sm-12 col-12 col-md-12" style={{fontFamily: 'monospace'}}>
            <p id="fut">
              ©2024 SOLCEMAN Financial Services Group, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

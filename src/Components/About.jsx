import React from "react";
import { NavLink } from "react-router-dom";
import BGIMG from "../assets/Images/consulting-animate.svg";
import BGIMG2 from "../assets/Images/credit-card-animate.svg";

const About = () => {
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
          <NavLink to="/" className="navbar-brand text-white">
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

      <div className="container-fluid px-3">
        <div className="row">
          <div className="col-sm-12 col-lg-7 col-md-7">
            <div>
              <h4>About Solceman Bank</h4>
              <small style={{ fontSize: "15px" }}>
                Welcome to Solceman Bank, where we strive to provide innovative
                banking solutions tailored to meet the diverse needs of our
                customers. At Solceman Bank, we are committed to delivering
                exceptional financial services while building strong, lasting
                relationships with our clients.
              </small>

              <h4>Our Mission</h4>
              <small style={{ fontSize: "15px" }}>
                Our mission is to empower individuals and businesses to achieve
                their financial goals by offering a comprehensive range of
                banking products and services. We aim to be a trusted partner in
                our customers' financial journey, providing personalized
                solutions and excellent customer service every step of the way.
              </small>

              <h4>Our Vision</h4>
              <small style={{ fontSize: "15px" }}>
                Our vision is to be the leading bank in customer satisfaction
                and financial services innovation. We aspire to set the standard
                for excellence in the banking industry, continually evolving to
                meet the changing needs of our customers and communities.
              </small>
            </div>
          </div>
          <div className="col-sm-12 col-lg-4 col-md-5">
            <img src={BGIMG} className="img-fluid" alt="" />
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col-sm-12 col-lg-7 col-md-7">
              <div>
                <h4>Our History</h4>
                <small style={{ fontSize: "15px" }}>
                  Established in [year], Solceman Bank has been a cornerstone of
                  the community for over [number] years. From our humble
                  beginnings, we have grown into a respected financial
                  institution, serving thousands of customers across the region.
                  Our rich history is a testament to our commitment to
                  integrity, reliability, and service excellence.
                </small>

                <h4>Our Team</h4>
                <small style={{ fontSize: "15px" }}>
                  At Solceman Bank, our greatest asset is our people. Our team
                  of dedicated professionals is committed to delivering the
                  highest quality service to our customers. With a wealth of
                  experience and expertise in the banking industry, our team is
                  here to help you navigate your financial journey with
                  confidence.
                </small>
                <h4>Community Involvement</h4>
                <small style={{ fontSize: "15px" }}>
                  We believe in giving back to the communities we serve. Through
                  philanthropic initiatives, volunteerism, and community
                  partnerships, Solceman Bank is proud to support local
                  organizations and make a positive impact in the areas where we
                  live and work.
                </small>
                <h4>Contact Us</h4>
                <small style={{ fontSize: "15px" }}>
                  We invite you to explore our website to learn more about our
                  products, services, and commitment to excellence. If you have
                  any questions or would like to speak with a member of our
                  team, please don't hesitate to contact us. We look forward to
                  serving you and helping you achieve your financial goals.
                </small>
              </div>
            </div>

            <div className="col-sm-12 col-lg-4 col-md-5">
              <img src={BGIMG2} className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

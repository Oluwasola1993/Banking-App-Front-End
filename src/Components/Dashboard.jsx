import axios from "axios";
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
import { GiWallet } from "react-icons/gi";
import { RiExchangeDollarLine } from "react-icons/ri";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import { BsCircleHalf } from "react-icons/bs";

const Dashboard = () => {
  const [name, setname] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [Balance, setBalance] = useState("");

  const location = useLocation();

  const navigate = useNavigate();

  let url = "http://localhost:3000/dashboard";
  let token = localStorage.getItem("token");

  const [profilePix, setprofilePix] = useState("");
  const [email, setemail] = useState("");

  const otherTrsf = () => {
    navigate("/dashboard/fund_wallet");
  };

  const intraTrsf = () => {
    navigate("/dashboard/intra-transfer");
  };

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === true) {
          console.log("success");
          setname(res.data.user.firstName);
          setfirstName(res.data.user.firstName);
          setlastName(res.data.user.lastName);
          setemail(res.data.user.emailInfo.email);
          setBalance(res.data.user.accountBalance.toLocaleString());
          setprofilePix(res.data.user.profile_url);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          localStorage.removeItem("token");
          navigate("/signin");
        }
      });
  }, []);

  // const showNav = () => {
  //   const navLink = document.getElementById("navLink");
  //   if (navLink.style.display === "none" || navLink.style.display === "") {
  //     navLink.style.display = "block";
  //   } else {
  //     navLink.style.display = "none";
  //   }
  // };

  const logOutUser = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const [navVisible, setNavVisible] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isSmallScreen) {
      setNavVisible(true); // Ensure nav is visible on large screens
    }
  }, [isSmallScreen]);

  const toggleNav = () => {
    setNavVisible(!navVisible);
  };

  return (
    <>
      <div
        className="container-fluid"
        id="firstCont"
        style={{ background: "#412f3a", height: 'fit-content' }}
      >
        <div className="row" id="side">
          <div className="col-sm-5 col-md-3 col-lg-2">
            <button
              id="show"
              className="btn btn-sm bg-secondary mb-3"
              onClick={toggleNav}
            >
              {navVisible ? "Collapse" : "Show"} Navlinks
            </button>
            {(!isSmallScreen || (isSmallScreen && navVisible)) && (
              <div id="navLink">
                <div className="">
                  <IoHome className="icons" />
                  <NavLink
                    to="/dashboard/"
                    className={`${
                      location.pathname === "/dashboard"
                        ? "text-info fs-5 fw-bold active px-2 text-decoration-none"
                        : "text-info fs-5 fw-bold text-decoration-none px-2"
                    }`}
                  >
                    Home
                  </NavLink>
                </div>
                <div className="">
                  <MdOutlineAccountBalance className="icons" />
                  <NavLink
                    to="/dashboard/account"
                    className={`${
                      location.pathname === "/dashboard/account"
                        ? "text-info fs-5 fw-bold px-2 active text-decoration-none"
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
                    className={`${
                      location.pathname === "/dashboard/card"
                        ? "text-info fs-5 px-2 fw-bold active text-decoration-none"
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
                    className={`${
                      location.pathname === "/dashboard/settings"
                        ? "text-info fs-5 px-2 fw-bold active text-decoration-none"
                        : "text-white text-decoration-none px-2"
                    }`}
                  >
                    Settings
                  </NavLink>
                </div>
                <div
                  className="log"
                  style={{ cursor: "pointer" }}
                  onClick={logOutUser}
                >
                  <RiLogoutCircleLine />
                  <h6 className="pt-1">Log Out</h6>
                </div>
              </div>
            )}
          </div>
          <div className="col-sm-12 col-md-11 col-lg-7 text-white">
            <div className="main">
              <div>
                <h4 style={{ color: "#e6e8e9" }}>Dashboard</h4>
                <p style={{ color: "#958f9c" }}>Welcome back, {name}</p>
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <p
                    style={{ color: "#958f9c", fontFamily: "cursive, poppins" }}
                  >
                    Your Account Balance is: #{Balance}
                  </p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-6">
                <div id="search">
                  <IoSearch />
                  <input
                    type="text"
                    id="input"
                    placeholder="search"
                    className="w-100"
                  />
                </div>
              </div>
            </div>
            <div className="row py-1">
              <div className="col-sm-3 col-md-5 col-lg-3" id="firstRow">
                <button
                  id="transferOne"
                  className="text-center btn btn"
                  onClick={intraTrsf}
                >
                  <FaCircleDollarToSlot />
                  <h6 style={{ color: "#c2c6d0" }}>
                    Transfer to Solceman Bank
                  </h6>
                </button>
              </div>
              <div className="col-sm-3 col-md-5 col-lg-3 py-lg-5">
                <button
                  id="transferTwo"
                  className="text-center btn btn"
                  onClick={otherTrsf}
                >
                  <RiExchangeDollarLine />
                  <h6 style={{ color: "#c2c6d0" }}>Transfer to other Banks</h6>
                </button>
              </div>
              <div className="col-sm-3 col-md-5 col-lg-3 pb-2">
                <button id="transferOne" className="text-center btn btn">
                  <GiWallet />
                  <h6 style={{ color: "#c2c6d0" }}>
                    Transfer to International Bank
                  </h6>
                </button>
              </div>
              <div className="col-sm-3 col-md-5 col-lg-3 py-lg-5">
                <button id="transferOne" className="text-center btn btn">
                  <GiWallet />
                  <h6 style={{ color: "#c2c6d0" }}>Airtime Top Up</h6>
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3 col-md-5 col-lg-3">
                <button id="transferOne" className="text-center btn btn">
                  <GiWallet />
                  <h6 style={{ color: "#c2c6d0" }}>Bills Payment</h6>
                </button>
              </div>
              <div className="col-sm-3 col-md-5 col-lg-3 py-lg-5">
                <button id="transferTwo" className="text-center btn btn">
                  <RiExchangeDollarLine />
                  <h6 style={{ color: "#c2c6d0" }}>Loans</h6>
                </button>
              </div>
              <div className="col-sm-3 col-md-5 col-lg-3 pb-2">
                <button id="transferOne" className="text-center btn btn">
                  <GiWallet />
                  <h6 style={{ color: "#c2c6d0" }}>International Airtime</h6>
                </button>
              </div>
              <div className="col-sm-3 col-md-5 col-lg-3 py-lg-5">
                <button id="transferOne" className="text-center btn btn">
                  <GiWallet />
                  <h6 style={{ color: "#c2c6d0" }}>Transaction History</h6>
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 container">
            <div className="icons1">
              <BsCircleHalf />
              <FaRegBell />
            </div>
            <div className="pix mx-auto">
              <img src={profilePix} className="inputNw" alt="" />
            </div>
            <div className="row pt-5">
              <div className="col-sm-12 col-md-12 col-lg-12 pb-2">
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <p className="heading_8264">MASTERCARD</p>
                      <svg
                        className="logo"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="36"
                        height="36"
                        viewBox="0 0 48 48"
                      >
                        <path
                          fill="#ff9800"
                          d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
                        ></path>
                        <path
                          fill="#d50000"
                          d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
                        ></path>
                        <path
                          fill="#ff3d00"
                          d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
                        ></path>
                      </svg>
                      <svg
                        version="1.1"
                        className="chip"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        width="30px"
                        height="30px"
                        viewBox="0 0 50 50"
                        xml:space="preserve"
                      >
                        {" "}
                        <image
                          id="image0"
                          width="50"
                          height="50"
                          x="0"
                          y="0"
                          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
              AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB6VBMVEUAAACNcTiVeUKVeUOY
              fEaafEeUeUSYfEWZfEaykleyklaXe0SWekSZZjOYfEWYe0WXfUWXe0WcgEicfkiXe0SVekSXekSW
              ekKYe0a9nF67m12ZfUWUeEaXfESVekOdgEmVeUWWekSniU+VeUKVeUOrjFKYfEWliE6WeESZe0GS
              e0WYfES7ml2Xe0WXeESUeEOWfEWcf0eWfESXe0SXfEWYekSVeUKXfEWxklawkVaZfEWWekOUekOW
              ekSYfESZe0eXekWYfEWZe0WZe0eVeUSWeETAnmDCoWLJpmbxy4P1zoXwyoLIpWbjvXjivnjgu3bf
              u3beunWvkFWxkle/nmDivXiWekTnwXvkwHrCoWOuj1SXe0TEo2TDo2PlwHratnKZfEbQrWvPrWua
              fUfbt3PJp2agg0v0zYX0zYSfgkvKp2frxX7mwHrlv3rsxn/yzIPgvHfduXWXe0XuyIDzzISsjVO1
              lVm0lFitjVPzzIPqxX7duna0lVncuHTLqGjvyIHeuXXxyYGZfUayk1iyk1e2lln1zYTEomO2llrb
              tnOafkjFpGSbfkfZtXLhvHfkv3nqxH3mwXujhU3KqWizlFilh06khk2fgkqsjlPHpWXJp2erjVOh
              g0yWe0SliE+XekShhEvAn2D///+gx8TWAAAARnRSTlMACVCTtsRl7Pv7+vxkBab7pZv5+ZlL/UnU
              /f3SJCVe+Fx39naA9/75XSMh0/3SSkia+pil/KRj7Pr662JPkrbP7OLQ0JFOijI1MwAAAAFiS0dE
              orDd34wAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0IDx2lsiuJAAACLElEQVRIx2Ng
              GAXkAUYmZhZWPICFmYkRVQcbOwenmzse4MbFzc6DpIGXj8PD04sA8PbhF+CFaxEU8iWkAQT8hEVg
              OkTF/InR4eUVICYO1SIhCRMLDAoKDvFDVhUaEhwUFAjjSUlDdMiEhcOEItzdI6OiYxA6YqODIt3d
              I2DcuDBZsBY5eVTr4xMSYcyk5BRUOXkFsBZFJTQnp6alQxgZmVloUkrKYC0qqmji2WE5EEZuWB6a
              lKoKdi35YQUQRkFYPpFaCouKIYzi6EDitJSUlsGY5RWVRGjJLyxNy4ZxqtIqqvOxaVELQwZFZdkI
              JVU1RSiSalAt6rUwUBdWG1CP6pT6gNqwOrgCdQyHNYR5YQFhDXj8MiK1IAeyN6aORiyBjByVTc0F
              qBoKWpqwRCVSgilOaY2OaUPw29qjOzqLvTAchpos47u6EZyYnngUSRwpuTe6D+6qaFQdOPNLRzOM
              1dzhRZyW+CZouHk3dWLXglFcFIflQhj9YWjJGlZcaKAVSvjyPrRQ0oQVKDAQHlYFYUwIm4gqExGm
              BSkutaVQJeomwViTJqPK6OhCy2Q9sQBk8cY0DxjTJw0lAQWK6cOKfgNhpKK7ZMpUeF3jPa28BCET
              amiEqJKM+X1gxvWXpoUjVIVPnwErw71nmpgiqiQGBjNzbgs3j1nus+fMndc+Cwm0T52/oNR9lsdC
              S24ra7Tq1cbWjpXV3sHRCb1idXZ0sGdltXNxRateRwHRAACYHutzk/2I5QAAACV0RVh0ZGF0ZTpj
              cmVhdGUAMjAyMy0wMi0xM1QwODoxNToyOSswMDowMEUnN7UAAAAldEVYdGRhdGU6bW9kaWZ5ADIw
              MjMtMDItMTNUMDg6MTU6MjkrMDA6MDA0eo8JAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDIzLTAy
              LTEzVDA4OjE1OjI5KzAwOjAwY2+u1gAAAABJRU5ErkJggg=="
                        ></image>
                      </svg>
                      <svg
                        version="1.1"
                        className="contactless"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        width="20px"
                        height="20px"
                        viewBox="0 0 50 50"
                        xml:space="preserve"
                      >
                        {" "}
                        <image
                          id="image0"
                          width="50"
                          height="50"
                          x="0"
                          y="0"
                          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAABGdBTUEAALGPC/xhBQAAACBjSFJN
              AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZ
              cwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0IEzgIwaKTAAADDklEQVRYw+1XS0iUURQ+f5qPyjQf
              lGRFEEFK76koKGxRbWyVVLSOgsCgwjZBJJYuKogSIoOonUK4q3U0WVBWFPZYiIE6kuArG3VGzK/F
              fPeMM/MLt99/NuHdfPd888/57jn3nvsQWWj/VcMlvMMd5KRTogqx9iCdIjUUmcGR9ImUYowyP3xN
              GQJoRLVaZ2DaZf8kyjEJALhI28ELioyiwC+Rc3QZwRYyO/DH51hQgWm6DMIh10KmD4u9O16K49it
              VoPOAmcGAWWOepXIRScAoJZ2Frro8oN+EyTT6lWkkg6msZfMSR35QTJmjU0g15tIGSJ08ZZMJkJk
              HpNZgSkyXosS13TkJpZ62mPIJvOSzC1bp8vRhhCakEk7G9/o4gmZdbpsTcKu0m63FbnBP9Qrc15z
              bkbemfgNDtEOI8NO5L5O9VYyRYgmJayZ9nPaxZrSjW4+F6Uw9yQqIiIZwhp2huQTf6OIvCZyGM6g
              DJBZbyXifJXr7FZjGXsdxADxI7HUJFB6iWvsIhFpkoiIiGTJfjJfiCuJg2ZEspq9EHGVpYgzKqwJ
              qSAOEwuJQ/pxPvE3cYltJCLdxBLiSKKIE5HxJKcTRNeadxfhDiuYw44zVs1dxKwRk/uCxIiQkxKB
              sSctRVAge9g1E15EHE6yRUaJecRxcWlukdRIbGFOSZCMWQA/iWauIP3slREHXPyliqBcrrD71Amz
              Z+rD1Mt2Yr8TZc/UR4/YtFnbijnHi3UrN9vKQ9rPaJf867ZiaqDB+czeKYmd3pNa6fuI75MiC0uX
              XSR5aEMf7s7a6r/PudVXkjFb/SsrCRfROk0Fx6+H1i9kkTGn/E1vEmt1m089fh+RKdQ5O+xNJPUi
              cUIjO0Dm7HwvErEr0YxeibL1StSh37STafE4I7zcBdRq1DiOkdmlTJVnkQTBTS7X1FYyvfO4piaI
              nKbDCDaT2anLudYXCRFsQBgAcIF2/Okwgvz5+Z4tsw118dzruvIvjhTB+HOuWy8UvovEH6beitBK
              xDyxm9MmISKCWrzB7bSlaqGlsf0FC0gMjzTg6GgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDIt
              MTNUMDg6MTk6NTYrMDA6MDCjlq7LAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTAyLTEzVDA4OjE5
              OjU2KzAwOjAw0ssWdwAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyMy0wMi0xM1QwODoxOTo1Nisw
              MDowMIXeN6gAAAAASUVORK5CYII="
                        ></image>
                      </svg>
                      <p className="number">9759 2484 5269 6576</p>
                      <p className="valid_thru">VALID THRU</p>
                      <p className="date_8264">1 2 / 2 8</p>
                      <p className="name">
                        {firstName} {lastName}
                      </p>
                    </div>
                    <div className="flip-card-back">
                      <div className="strip"></div>
                      <div className="mstrip"></div>
                      <div className="sstrip">
                        <p className="code">***</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

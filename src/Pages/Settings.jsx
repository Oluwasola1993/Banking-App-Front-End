import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { MdOutlineAccountBalance } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutCircleLine } from "react-icons/ri";
import { HiPencilAlt } from "react-icons/hi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [email, setemail] = useState("");
  const [userFile, setuserFile] = useState("");
  const [profilePix, setprofilePix] = useState("");

  const [userMail, setuserMail] = useState("Enter your email address");
  const [oldPassword, setoldPassword] = useState("Enter your old password");
  const [newPassword, setnewPassword] = useState("Enter your new password");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let url = "https://bank-app-back-end.onrender.com/dashboard";
    let token = localStorage.getItem("token");

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
          setemail(res.data.user.emailInfo.email);
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

  const UploadFile = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      setuserFile(reader.result);
      setprofilePix(reader.result);
    };
  };

  let endpoint = "https://bank-app-back-end.onrender.com/upload";

  const uploadPix = () => {
    axios
      .post(endpoint, { email, userFile })
      .then((res) => {
        console.log(res);
        setprofilePix(res.data.result.url);
        toast.success("Profile Picture Uploaded Successfully");
      })
      .catch((err) => {
        console.log(err);
        console.log("File not uploaded");
        toast.error("File not uploaded");
      });
  };

  const handleClick = (e) => {
    e.preventDefault();
    document.getElementById("fileInput").click();
  };

  const showNav = () => {
    const navLink = document.getElementById("navLink");
    if (navLink.style.display === "none" || navLink.style.display === "") {
      navLink.style.display = "block";
    } else {
      navLink.style.display = "none";
    }
  };

  const changePasswrd = () => {
    const url = "https://bank-app-back-end.onrender.com/change-password";
    axios
      .post(url, {
        email: userMail,
        oldPassword: oldPassword,
        newPassword: newPassword,
      })
      .then((res) => {
        console.log("Response:", res);
        if (res.data.status === true) {
          toast.success("Password Changed Successfully");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else if (
          res.data.message === "New password is same as old password"
        ) {
          toast.error("New password is same as old password");
        } else if (res.data.message === "Incorrect password") {
          toast.error("Incorrect password");
        } else {
          toast.error("Password not changed");
        }
      })
      .catch((err) => {
        console.error("Error response:", err);
        if (err.response && err.response.data && err.response.data.msg) {
          if (err.response.data.msg === "User does not exist") {
            toast.error("User does not exist");
          } else if (
            err.response.data.msg === "New password is same as old password"
          ) {
            toast.error("New password is same as old password");
          } else if (err.response.data.msg === "Incorrect password") {
            toast.error("Incorrect password");
          } else {
            toast.error("Password not changed");
          }
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      });
  };

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
    <div
      className="container-fluid"
      id="firstCont"
      style={{ background: "#412f3a", height: "100vh" }}
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
        <div className="col-sm-12 col-lg-5 col-md-4">
          <div className="text-center">
            <h1>SETTINGS</h1>
            <p className="text-white">
              Kindly Change your password and profile picture in this section
            </p>
          </div>
          <div className="" id="form">
            <div className="text-white">
              <small>Upload New Profile Picture Below</small>
            </div>
            <div className="profile-container">
              <img
                src={profilePix}
                alt="Profile"
                className="profile-pic"
              />
              <input
                type="file"
                id="fileInput"
                className="ppix"
                onChange={(e) => UploadFile(e)}
                style={{ display: "none" }}
              />
              <label
                htmlFor="fileInput"
                className="iconNw"
                style={{ cursor: "pointer" }}
              >
                <HiPencilAlt />
              </label>
              <button onClick={uploadPix} className="btn btn-success butn">
                UPLOAD
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-lg-4 col-md-4 mt-5 pt-5">
          <div className="text-white">
            <small>
              Kindly Enter your Email, Old password and New password in the
              spaces below to Change your Password
            </small>
          </div>
          <div>
            <label htmlFor="password" className="form-label text-white">
              Email
            </label>
            <input
              type="password"
              className="form-control form-control-sm w-75"
              id="password"
              onChange={(e) => setuserMail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="form-label text-white">
              Old Password
            </label>
            <input
              type="password"
              className="form-control form-control-sm w-75"
              id="password"
              onChange={(e) => setoldPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="form-label text-white">
              New Password
            </label>
            <input
              type="password"
              className="form-control form-control-sm w-75"
              id="password"
              onChange={(e) => setnewPassword(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <button className="btn btn-primary w-75" onClick={changePasswrd}>
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

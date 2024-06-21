import React from "react";
import user from "../assets/Images/user-regular.svg";
import lock from "../assets/Images/lock-solid.svg";
import phone from "../assets/Images/pix.avif";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import Logo from "../assets/Images/ilogo.png";
import { useNavigate } from "react-router-dom";
import "../assets/Style.css";

const Signin = () => {
  const navigate = useNavigate();

  const resetPass = () => {
    navigate("/reset-password");
  };

  let URL = "https://bank-app-back-end.onrender.com/signin";

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email address").required("Required"),
      password: yup
        .string()
        .min(8, "Must be 8 characters or more")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password must contain at least one special character"
        )
        .required("Required"),
    }),
    onSubmit: (values) => {
      document.getElementById("loader").style.display = "block";
      document.getElementById("text").style.display = "none";
      axios
        .post(URL, values)
        .then((res) => {
          console.log(res);
          let token = res.data.token;
          localStorage.setItem("token", token);
          toast.success("Login Successfully");
          setTimeout(() => {
            if (res.data.user.emailInfo.verified === true) {
              navigate("/dashboard");
            } else if (res.data.user.emailInfo.verified === false) {
              toast.success("please kindly verify your Gmail account");
              navigate("/verify");
            }
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Invalid Credentials");
          if (err) {
            document.getElementById("text").style.display = "block";
            document.getElementById("loader").style.display = "none";
          }
        });
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="container-fluid"
        style={{ background: "#f5f7f8" }}
      >
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <div>
              <img src={Logo} id="signIn" alt="" />
            </div>
          </div>
        </div>
        <div className="row gap-5">
          <div className="col-sm-12 col-md-5 col-lg-5 ps-5 mx-auto">
            <h3>STEP 2 of 2</h3>
            <h4>Welcome to Access Internet Banking</h4>
            <p className="fw-bold">
              Sign in with your Internet Banking details or Access More login
              details. Not registered on Internet Banking or Access More? Click
              on register to get started
            </p>
            <p className="fw-bold">
              No account?{" "}
              <a
                href=""
                style={{
                  color: "#fd9617",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Open savings account
              </a>
            </p>
            <div className="d-flex gap-3">
              <img src={user} style={{ width: "3%" }} alt="" />
              <input
                type="text"
                className="form-control form-control-sm fw-bold w-75 py-3"
                id="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            <div className=" my-3">
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: "red", fontStyle: "italic" }}>
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="d-flex my-3 gap-3">
              <img src={lock} style={{ width: "3%" }} alt="" />
              <input
                type="password"
                className="form-control form-control-sm fw-bold w-75 py-3"
                id="password"
                placeholder="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            <div>
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: "red", fontStyle: "italic" }}>
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div>
              <a
                href=""
                className="fw-bold"
                onClick={resetPass}
                style={{
                  marginInlineStart: "34%",
                  color: "#fe9458",
                  textDecoration: "none",
                }}
              >
                Forgot Username or Password?
              </a>
            </div>
            <div>
              <button
                className="btn btn-lg text-white my-2"
                style={{
                  backgroundColor: "#ff8200",
                  position: "relative",
                  height: "2.7rem",
                  width: "82%",
                }}
                id="submit"
                type="submit"
              >
                <div id="loader" style={{ display: "none" }}>
                  <div className="loader"></div>
                  <div className="loader"></div>
                  <div className="loader"></div>
                  <div className="loader"></div>
                  <div className="loader"></div>
                  <div className="loader"></div>
                  <div className="loader"></div>
                  <div className="loader"></div>
                  <div className="loader"></div>
                </div>
                <h5 id="text">Sign In</h5>
              </button>
            </div>
            <div>
              <button
                className="btn btn-lg text-dark my-2 rounded-0 p-3 fw-bold shadow-lg"
                id="register"
                style={{ backgroundColor: "#fff", width: "82%" }}
                onClick={() => navigate("/signup")}
              >
                Register on internet banking
              </button>
            </div>
            <div></div>
            <div className="bg-white p-2">
              <p className="fw-bold mt-3" style={{ fontSize: "x-small" }}>
                @2024 SOLCEMAN Financial Services Group, Inc. All rights
                reserved.
              </p>
            </div>
          </div>
          <div
            className="col-sm-12 col-md-5 col-lg-5 mx-auto text-center mt-sm-3 bg-white"
            style={{ height: "fit-content" }}
          >
            <img src={phone} id="phone" alt="" />
          </div>
        </div>
      </form>
    </>
  );
};

export default Signin;

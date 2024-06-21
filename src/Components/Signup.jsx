import React from "react";
import { useFormik } from "formik";
import "../assets/Style.css";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/Images/ilogo.png";

const Signup = () => {
  const navigate = useNavigate();
  let URL = "http://localhost:3000/signup";

  const signIn = () => {
    navigate("/signIn");
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Maximum 15 characters or less")
        .min(3, "Minimum 3 characters or More"),
      lastName: Yup.string()
        .max(15, "Maximum 15 characters or less")
        .min(3, "Minimum 3 characters or More"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phoneNo: Yup.string()
        .max(11, "Phone number must be 11 digits")
        .required("Phone number is required"),
      password: Yup.string()
        .min(8, "Password must be Minimum of 8 characters or More")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[^A-Za-z0-9]/,
          "Password must contain at least one special character"
        )
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      document.getElementById("loader").style.display = "block";
      document.getElementById("text").style.display = "none";
      // Show loader when form is submitted
      try {
        const res = await axios.post(URL, values);
        console.log(res.data);
        setTimeout(() => {
          toast.success("User Created Successfully");
          navigate("/signin");
        }, 3000);
      } catch (err) {
        console.log(err);
        toast.error("User Creation Failed");
        if (err) {
          document.getElementById("text").style.display = "block";
          document.getElementById("loader").style.display = "none";
        }
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <div className="logoNw">
              <img src={Logo} alt="" />
            </div>
          </div>
          <div className="col-sm-12 col-md-8 col-lg-8 mx-auto">
            <h3>STEP 1 of 2</h3>
            <h1 className="text-dark">Welcome, Let’s get you started</h1>
            <p className="mt-3">
              Provide the information below to create your access internet
              banking profile
            </p>
            <div>
              <input
                type="text"
                className="form-control form-control-sm fw-bold w-75 py-3 my-4"
                id="firstName"
                placeholder="First Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div style={{ color: "red", fontStyle: "italic" }}>
                  {formik.errors.firstName}
                </div>
              ) : null}
            </div>
            <div>
              <input
                type="text"
                className="form-control form-control-sm fw-bold w-75 py-3 my-4"
                id="lastName"
                placeholder="Last Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div style={{ color: "red", fontStyle: "italic" }}>
                  {formik.errors.lastName}
                </div>
              ) : null}
            </div>
            <div>
              <input
                type="text"
                className="form-control form-control-sm fw-bold w-75 py-3 my-4"
                id="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: "red", fontStyle: "italic" }}>
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div>
              <input
                type="number"
                className="form-control form-control-sm fw-bold w-75 py-3 my-4"
                id="phoneNo"
                placeholder="phone number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNo}
              />
              {formik.touched.phoneNo && formik.errors.phoneNo ? (
                <div style={{ color: "red", fontStyle: "italic" }}>
                  {formik.errors.phoneNo}
                </div>
              ) : null}
            </div>
            <div>
              <input
                type="password"
                className="form-control form-control-sm fw-bold w-75 py-3 my-4"
                id="password"
                placeholder="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: "red", fontStyle: "italic" }}>
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <p>Password must have</p>
            <div className="d-flex gap-2">
              <p
                style={{
                  Color: "#9c9c9c",
                  fontWeight: "lighter",
                  backgroundColor: "#eeeeee",
                }}
                className="text-dark rounded-5 px-3"
              >
                1 Lowercase
              </p>
              <p
                style={{
                  Color: "#9c9c9c",
                  fontWeight: "lighter",
                  backgroundColor: "#eeeeee",
                }}
                className="text-dark rounded-5 px-3"
              >
                1 Uppercase
              </p>
              <p
                style={{
                  Color: "#9c9c9c",
                  fontWeight: "lighter",
                  backgroundColor: "#eeeeee",
                }}
                className="text-dark rounded-5 px-3"
              >
                At least 8 characters
              </p>
            </div>
            <div className="d-flex gap-2">
              <p
                style={{
                  Color: "#9c9c9c",
                  fontWeight: "lighter",
                  backgroundColor: "#eeeeee",
                }}
                className="text-dark rounded-5 px-3"
              >
                1 Special Character
              </p>
              <p
                style={{
                  Color: "#9c9c9c",
                  fontWeight: "lighter",
                  backgroundColor: "#eeeeee",
                }}
                className="text-dark rounded-5 px-3"
              >
                1 Number
              </p>
            </div>
            <button
              className="btn btn-lg text-white my-2 w-75"
              style={{
                backgroundColor: "#ff8200",
                position: "relative",
                height: "2.7rem",
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
              <h5 id="text">Continue</h5>
            </button>
            <p className="signin">
              Already have an acount ? <Link to='/signin'>Login</Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default Signup;

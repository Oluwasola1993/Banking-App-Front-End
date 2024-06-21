import { useFormik } from "formik";
import React from "react";
import axios from "axios";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Adminsignin = () => {
  let URL = "https://bank-app-back-end.onrender.com/login-user";

  const navigate = useNavigate();

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
            navigate("/admin-dashboard");
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Invalid Credentials");
          if (error) {
            document.getElementById("text").style.display = "block";
            document.getElementById("loader").style.display = "none";
          }
        });
    },
  });

  return (
    <div className="container-fluid admin">
      <div className="row">
        <div className="col-sm-12 col-lg-12 col-md-12 adminDes">
          <form onSubmit={formik.handleSubmit} className="form">
            <div>
              <h6>Admin Signin </h6>
            </div>
            <div>
              <label htmlFor="">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control form-control-lg w-100"
                id="email"
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
            <div>
              <label htmlFor="">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="form-control form-control-lg w-100"
                id="password"
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
              <button
                className="btn btn-lg text-white my-3"
                style={{
                  backgroundColor: "black",
                  position: "relative",
                  height: "2.7rem",
                  width: "100%",
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Adminsignin;

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
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const Adminservices = () => {
  const navigate = useNavigate();
  const [service, setservice] = useState("");
  const [airtimeFetched, setAirtimeFetched] = useState("");
  const [dataPlan, setDataPlan] = useState("");

  useEffect(() => {
    const adminDashboard = () => {
      let url = "https://bank-app-back-end.onrender.com/admin_dashboard";
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
          }
        })
        .catch((err) => {
          console.log(err);
          if (err) {
            localStorage.removeItem("token");
            navigate("/admin-signin");
          }
        });
    };
    adminDashboard();
    getSettings();
    getDataPlans();
  }, []);

  const getSettings = () => {
    let URL = "https://bank-app-back-end.onrender.com/admin-settings";
    axios
      .get(URL)
      .then((res) => {
        console.log(res);
        // setAirtimeFetched(res.data.settings[0].airtimePrice)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDataPlans = () => {
    let URL = "https://bank-app-back-end.onrender.com/get-dataPlan";
    axios
      .get(URL)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logOutUser = () => {
    localStorage.removeItem("token");
    navigate("/admin-signin");
  };

  const formik = useFormik({
    initialValues: {
      serverId: "",
      dataPrice: "",
      validationPeriod: "",
      dataSize: "",
    },
    validationSchema: Yup.object({
      serverId: Yup.number().required("Server Id is required"),
      dataPrice: Yup.number().required("Price is required"),
      validationPeriod: Yup.string().required("Valid for is required"),
      dataSize: Yup.string().required("Data size is required"),
    }),
    onSubmit: (values) => {
      let networkId = document.getElementById("network").value;
      if (!networkId) {
        toast.error("Please select a network");
      } else {
        const url = "https://bank-app-back-end.onrender.com/add-dataPlans";
        const data = {
          network_id: networkId,
          server_id: values.serverId,
          price: values.dataPrice,
          valid_period: values.validationPeriod,
          byte: values.dataSize,
        };
        axios
          .post(url, data)
          .then((res) => {
            console.log(res);
            toast.success("Added successfully!");
            formik.resetForm();
          })
          .catch((err) => {
            console.log(err);
            toast.error("An error occured");
          });
      }
    },
  });

  const editAirtime = () => {
    const url = "https://bank-app-back-end.onrender.com/edit-adminSettings";
    let newValue = document.getElementById("airtimePercentage").value;
    axios
      .post(url, { whatToEdit: "airtimePrice", newValue })
      .then((res) => {
        console.log(res);
        toast.success("Change saved successfully.");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error occured");
      });
  };

  const addNetwork = () => {
    let network_id = document.getElementById("networkId").value;
    let network_name = document.getElementById("networkName").value;
    if (dataPlan.length == 4) {
      toast.error("You added upto 4 network already");
    } else if (network_id == "" || network_name == "") {
      toast.error("Spaces can't be empty");
    } else {
      const url = "https://bank-app-back-end.onrender.com/add-networks";
      axios
        .post(url, { network_id, network_name })
        .then((res) => {
          console.log(res);
          toast.success("Network added successfully.");
          toast.loading("Reloading");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        })
        .catch((err) => {
          let errorMsg = err.response.data.msg;
          if (err.response.data.error.code == 11000) {
            toast.error("Id or name already exist");
          } else if (errorMsg) {
            toast.error(`${errorMsg}`);
          } else {
            toast.error("Unknow network error");
          }
        });
    }
  };

  return (
    <div
      className="container-fluid"
      id="firstCont"
      style={{ background: "#412f3a", height: "100vh" }}
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
        <div className="col-sm-12 col-md-6 col-lg-6 text-center">
          <h1 className="text-white">Select a Service to Edit</h1>
          <div className="mt-3">
            <select
              onChange={(e) => setservice(e.target.value)}
              className="form-select w-50 mx-auto"
            >
              <option value="null">Select service</option>
              <option value="airtime">Airtime</option>
              <option value="data">Data</option>
            </select>
          </div>
        </div>
        <div className="col-sm-12 col-lg-4 col-md-6">
          {service && (
            <div className="pt-3">
              {service === "airtime" ? (
                <div>
                  <h1 className="text-center text-secondary mt-4">
                    Airtime Price
                  </h1>
                  <h2 className="text-center text-danger mt-3">
                    Currently set to <span>{airtimeFetched}%</span> Off
                  </h2>
                  <p className="text-center">
                    Your user will get <span>{airtimeFetched}%</span> off their
                    airtimes.
                  </p>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={() =>
                      (document.getElementById("airtimeEdit").style.display =
                        "flex")
                    }
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <div>
                  <h1 className="text-center mt-4">Data Plan</h1>
                  <p className="text-center my-4">
                    Here you can add, check and delete data plans available on
                    your app.
                  </p>
                  <div className="d-flex flex-column align-items-center">
                    <table className="table table-bordered">
                      <thead className="thead-dark">
                        <tr>
                          <th>Network name</th>
                          <th>Network Id</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataPlan.length > 0 ? (
                          dataPlan.map((network) => (
                            <tr key={network.network_id}>
                              <td>{network.network_name}</td>
                              <td>{network.network_id}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="2" className="text-center">
                              No data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <button
                      className="btn btn-primary mt-3"
                      onClick={() =>
                        (document.getElementById("addNetwork").style.display =
                          "flex")
                      }
                    >
                      Add network
                    </button>
                  </div>
                  <div className="d-flex justify-content-center gap-3 mt-3">
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        (document.getElementById("showDataPlan").style.display =
                          "flex")
                      }
                    >
                      Show data plans
                    </button>
                    <button
                      onClick={() =>
                        (document.getElementById("addDataPlan").style.display =
                          "flex")
                      }
                      className="btn btn-primary"
                    >
                      Add new data plan
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Edit airtime div */}
      <div
        id="airtimeEdit"
        className="d-flex justify-content-center align-items-center vh-100"
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          backgroundColor: "rgba(0, 0, 0, 0.548)",
          display: "none",
          zIndex: 1050,
        }}
      >
        <div className="bg-white p-4 rounded-lg position-relative">
          <div
            onClick={() =>
              (document.getElementById("airtimeEdit").style.display = "none")
            }
            className="text-dark position-absolute"
            style={{
              top: "10px",
              right: "10px",
              cursor: "pointer",
            }}
          >
            <RxCross2 />
          </div>
          <h3 className="mt-3">Enter bonus in percentage:</h3>
          <p>Please enter new value without any sign, Just a number!</p>
          <input
            type="number"
            id="airtimePercentage"
            className="form-control mt-3 mb-3"
            placeholder="0"
          />
          <button onClick={editAirtime} className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>

      {/* Add network modal */}
      <div
        id="addNetwork"
        className="d-flex justify-content-center align-items-center vh-100"
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          backgroundColor: "rgba(0, 0, 0, 0.548)",
          display: "none",
          zIndex: 1050,
        }}
      >
        <div className="bg-white p-4 rounded-lg position-relative">
          <div
            onClick={() =>
              (document.getElementById("addNetwork").style.display = "none")
            }
            className="text-dark position-absolute"
            style={{
              top: "10px",
              right: "10px",
              cursor: "pointer",
            }}
          >
            X
          </div>
          <h2 className="text-2xl text-center font-bold text-blue-700">
            Add a new network
          </h2>
          <label htmlFor="networkId">Network ID</label>
          <input
            type="number"
            id="networkId"
            className="form-control mb-3"
            placeholder="ID"
          />
          <label htmlFor="networkName">Network name</label>
          <input
            type="text"
            id="networkName"
            className="form-control mb-3"
            placeholder="Name"
          />
          <button className="btn btn-primary mt-3" onClick={addNetwork}>
            Add
          </button>
        </div>
      </div>

      {/* Add data plan modal */}
      <div
        id="addDataPlan"
        className="d-flex justify-content-center align-items-center vh-100"
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          backgroundColor: "rgba(0, 0, 0, 0.548)",
          display: "none",
          zIndex: 1050,
        }}
      >
        <div className="bg-white p-4 rounded-lg position-relative">
          <div
            onClick={() =>
              (document.getElementById("addDataPlan").style.display = "none")
            }
            className="text-dark position-absolute"
            style={{
              top: "10px",
              right: "10px",
              cursor: "pointer",
            }}
          >
            X
          </div>
          <div id="adminAddDataPlan">
            <h1 className="text-center font-bold">Add new data plan</h1>
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="network">Network</label>
              <select id="network" className="form-control mb-3">
                <option value="">Select network</option>
                {dataPlan
                  ? dataPlan.map((item) => (
                      <option key={item.network_id} value={item.network_id}>
                        {item.network_name}
                      </option>
                    ))
                  : null}
              </select>
              <label htmlFor="serverId">Server ID</label>
              <input
                type="number"
                id="serverId"
                className="form-control mb-3"
                placeholder="000"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.serverId}
              />
              {formik.touched.serverId ? (
                <div
                  className={
                    formik.errors.serverId
                      ? "my-4 text-center text-primary"
                      : "hidden"
                  }
                >
                  <i>{formik.errors.serverId}</i>
                </div>
              ) : null}

              <label htmlFor="dataPrice">Price</label>
              <input
                type="number"
                id="dataPrice"
                className="form-control mb-3"
                placeholder="300"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.dataPrice}
              />
              {formik.touched.dataPrice ? (
                <div
                  className={
                    formik.errors.dataPrice
                      ? "my-4 text-center text-primary"
                      : "hidden"
                  }
                >
                  <i>{formik.errors.dataPrice}</i>
                </div>
              ) : null}
              <label htmlFor="validationPeriod">Valid For</label>
              <input
                type="text"
                id="validationPeriod"
                className="form-control mb-3"
                placeholder="1 Day"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.validationPeriod}
              />
              {formik.touched.validationPeriod ? (
                <div
                  className={
                    formik.errors.validationPeriod
                      ? "my-4 text-center text-primary"
                      : "hidden"
                  }
                >
                  <i>{formik.errors.validationPeriod}</i>
                </div>
              ) : null}
              <label htmlFor="dataSize">Data Size</label>
              <input
                type="text"
                id="dataSize"
                className="form-control mb-3"
                placeholder="E.G: 500MB or 1GB"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.dataSize}
              />
              {formik.touched.dataSize ? (
                <div
                  className={
                    formik.errors.dataSize
                      ? "my-4 text-center text-primary"
                      : "hidden"
                  }
                >
                  <i>{formik.errors.dataSize}</i>
                </div>
              ) : null}
              <button type="submit" className="btn btn-primary">
                Add plan
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Show data plan modal */}
      <div
        id="showDataPlan"
        className="d-flex justify-content-center align-items-center vh-100"
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          backgroundColor: "rgba(0, 0, 0, 0.548)",
          display: "none",
          zIndex: 1050,
        }}
      >
        <div className="bg-white p-4 rounded-lg position-relative">
          <div
            onClick={() =>
              (document.getElementById("showDataPlan").style.display = "none")
            }
            className="text-dark position-absolute"
            style={{
              top: "10px",
              right: "10px",
              cursor: "pointer",
            }}
          >
            <RxCross2 />
          </div>
          <h1 className="text-center text-blue-800 font-bold">
            All data plans
          </h1>
          <div>
            {dataPlan ? (
              dataPlan.map((item) => (
                <div key={item.network_id} className="mb-3">
                  <h2 className="text-center">{item.network_name}</h2>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Plans</th>
                        <th>Price</th>
                        <th>ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.dataPlans.map((plan) => (
                        <tr key={plan.server_id}>
                          <td>{plan.byte}</td>
                          <td>{plan.price}</td>
                          <td>{plan.server_id}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
            ) : (
              <div className="text-center mt-5">
                Please check your internet connection
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminservices;

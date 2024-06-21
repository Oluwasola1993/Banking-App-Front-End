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
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [allUsers, setallUsers] = useState("");
  const [ChartData, setChartData] = useState("");
  const [totalDeposit, settotalDeposit] = useState("");
  const [totalTransactions, settotalTransactions] = useState("");

  useEffect(() => {
    dashboard();
    fetchUsers();
    getTotalTransactions();
    fetchChartData();
  }, []);

  const dashboard = () => {
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

  const fetchUsers = () => {
    axios
      .get("https://bank-app-back-end.onrender.com/fetch-users")
      .then((res) => {
        setallUsers(res.data.allUsers.length);
        let totalBal = 0;
        res.data.allUsers.map((items) => {
          totalBal += Number(items.accountBalance);
        });
        settotalDeposit(
          totalBal.toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTotalTransactions = () => {
    axios
      .get("https://bank-app-back-end.onrender.com/get-allTransactions")
      .then((res) => {
        settotalTransactions(res.data.allTransactions.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchChartData = async () => {
    const response = await axios.get(
      "https://bank-app-back-end.onrender.com/chart-transactions"
    );
    const data = response.data.result;
    console.log(data);

    const dates = data.map((item) => item.date);
    const transactionCounts = data.map((item) => item.transactionCount);
    // const dates = [1, 2, 3, 4, 5, 6, 7 ,8]
    // const transactionCounts = [ 30,40, 58, 59, 484 ]

    setChartData({
      labels: dates,
      datasets: [
        {
          label: "Daily Transaction Counts",
          data: transactionCounts,
          borderColor: "#4A90E2",
          backgroundColor: "whitesmoke",
          fill: true,
        },
      ],
    });
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        label: {
          color: "black",
        },
      },
      title: {
        display: true,
        text: "Daily Transaction Counts",
        color: "white",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "black",
        },
      },
      y: {
        ticks: {
          color: "pink",
        },
      },
    },
  };

  const logOutUser = () => {
    localStorage.removeItem("token");
    navigate("/admin-signin");
  };

  return (
    <div
      className="container-fluid"
      id="firstCont"
      style={{ background: "#412f3a", height: '100vh' }}
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
                    ? "text-info fs-5 fw-bold active text-decoration-none"
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
                    ? "text-info fs-5 fw-bold active text-decoration-none"
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
        <div className="col-sm-12 col-md-10 col-lg-10">
          <div className="row">
            <div className="col-sm-12 col-lg-6 col-md-6">
              <div className="users">
                <h4>Total Number of Users: {allUsers}</h4>
                <big style={{ fontStyle: "italic" }}>
                  Total Deposit:
                  <small style={{ fontWeight: "bold" }}>{totalDeposit}</small>
                </big>
              </div>
            </div>
            <div className="col-sm-12 col-lg-6 col-md-6">
              <div className="transactns">
                <h4>Total Transactions</h4>
                <big
                  style={{
                    fontStyle: "italic",
                    fontWeight: "bold",
                    fontFamily: "poppins",
                  }}
                >
                  {totalTransactions}
                </big>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div style={{ height: "350px" }}>
                <h1>Transaction Statistical Chart</h1>
                {ChartData ? (
                  <Line data={ChartData} options={options} />
                ) : (
                  <p>Loading Chart Data.....</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

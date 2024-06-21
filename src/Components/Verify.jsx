import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

const Verify = () => {
    const [status, setStatus] = useState("");
    const [user, setuser] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        checkEmail();
    }, []);

    const checkEmail = () => {
        let url = "http://localhost:3000/dashboard";
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
                    setuser(res.data.user);
                    if (res.data.user.emailInfo.verified === true) {
                        navigate("/dashboard");
                    }
                } else {
                    localStorage.removeItem("token");
                    navigate("/signin");
                    console.log(res.status);
                }
            });
    };

    const resendVerificationEmail = async () => {
        let URL = "http://localhost:3000/resendVerificationEmail";
        axios
            .post(URL, { theEmail: user.emailInfo.email })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.error("Error sending email verification link:", error);
                setStatus("An error occurred while sending email verification link.");
            });
    };

    return (
        <div
            style={{
                fontFamily: "Arial, sans-serif",
                backgroundColor: "#f4f4f4",
                margin: 0,
                padding: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <div
                style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                }}
            >
                <h2 style={{ marginTop: 0 }}>Verify Your Email</h2>
                <p>
                    An email has been sent to your email address. Please check your inbox
                    and click the verification link to complete the process.
                </p>
                <div>
                    <button
                        style={{
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                        onClick={resendVerificationEmail}
                    >
                        Resend Verification Email
                    </button>
                </div>
                <div className="pt-2">
                    <button
                        style={{
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                        onClick={checkEmail}
                    >
                        I have clicked the link
                    </button>
                </div>
                <p>{status}</p>
            </div>
        </div>
    );
};

export default Verify
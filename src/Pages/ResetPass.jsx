import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'


const ResetPass = () => {
    const [email, setemail] = useState("")

    const sendMail = () => {
        let url = "http://localhost:3000/reset-password";

        document.getElementById("loader").style.display = "block";
        document.getElementById("text").style.display = "none";

        axios.post(url, { email: email })
            .then((res) => {
                console.log(res);
                toast.success("Mail Sent Successfully");
                setTimeout(() => {
                    window.location.reload();
                }, 3000)
            })
            .catch((err) => {
                console.log(err);
                toast.error("Something went wrong");
                if (err) {
                    document.getElementById("text").style.display = "block";
                    document.getElementById("loader").style.display = "none";
                }
            })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12 text-center">
                    <h1>Reset Password</h1>
                </div>
                <div className='col-sm-12 col-md-12 col-lg-12 pt-3'>
                    <div className='text-center'>
                        <small>Enter Email To Reset Old Password</small>
                    </div>
                    <input type="email" onChange={(e) => { setemail(e.target.value) }} className='w-50 mx-auto form-control form-control-sm' />
                    <div className='mt-2 justify-content-center d-flex'>
                        <button
                            className='btn btn-success w-50' onClick={sendMail}
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
                            <h5 id="text">Reset</h5>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ResetPass
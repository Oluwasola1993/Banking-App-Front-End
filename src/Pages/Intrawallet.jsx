import React, { useEffect, useState } from 'react'
import "../assets/Style.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Intrawallet = () => {
    const [receiverName, setreceiverName] = useState("Enter receiver email address")
    const [totalAmount, settotalAmount] = useState("0")
    const [amount, setamount] = useState(false)
    const [receiver, setreciever] = useState(false)
    const [user, setuser] = useState("")
    const [description, setdescription] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        let url = "https://bank-app-back-end.onrender.com/dashboard";
        let token = localStorage.getItem("token");

        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json",
                Accept: "application/json",
            },
        })
            .then((res) => {
                console.log(res.data);
                setuser(res.data.user);
            })
            .catch((err) => {
                console.log(err);
                if (err) {
                    localStorage.removeItem("token");
                    navigate("/signin");
                }
            })
    }, []);

    const getReceiver = (e) => {
        console.log(isValidEmail(e.target.value));
        if (!isValidEmail(e.target.value)) {
            setreciever(false)
            setreceiverName("Enter a valid email address")
        } else {
            let url = "https://bank-app-back-end.onrender.com/intra_transfer/get_user"
            axios.post(url, { email: e.target.value })
                .then((res) => {
                    console.log(res.data)
                    setreceiverName(`${res.data.user.firstName} ${res.data.user.lastName}`)
                    setreciever(res.data.user.emailInfo.email)
                })
                .catch((err) => {
                    console.log(err)
                    setreceiverName("User not found!")
                    setreciever(false)
                })
        }
    }

    const paymentValidation = (e) => {
        if (e.target.value === "" || e.target.value < 100) {
            setamount(false)
            settotalAmount("0")
            if (e.target.value < 100) {
                settotalAmount("You can only transfer up to 100")
            }
        } else {
            let url = "https://bank-app-back-end.onrender.com/intra_transfer/payment_validation"
            axios.post(url, { email: user.emailInfo.email, amount: e.target.value })
                .then((res) => {
                    console.log(res.data)
                    settotalAmount(res.data.amountDebit.toLocaleString())
                    setamount(e.target.value)
                })
                .catch((err) => {
                    console.log(err)
                    setamount(false)
                })
        }

    }

    function isValidEmail(value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value);
    }

    const intraTransfer = () => {
        console.log(amount);
        console.log(receiver);
        if (amount && receiver) {
            let url = "https://bank-app-back-end.onrender.com/intra_transfer"
            axios.post(url, { senderEmail: user.emailInfo.email, amount: amount, receiver: receiver, description })
                .then((res) => {
                    console.log(res.data)
                    if (res.data.msg === "Transfer successful") {
                        toast.success("Transfer Successful!")
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    }
                })
                .catch((err) => {
                    console.log(err)
                    toast.error("Transfer Failed!")
                })
        } else {
            toast.error("Please enter all the details correctly!")
        }

    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12 text-center">
                    <h1>Welcome To Intra-Transfer section</h1>
                    <p>Here you can transfer money from one account to another</p>
                </div>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <div className='text-center'>
                        <small>Enter Reciever's Email Address Below</small>
                    </div>
                    <input type="email" placeholder='Enter Email Address' className='form-control form-control-lg w-50 mt-2 mx-auto' onChange={getReceiver} />
                    <div id='' className='w-50 h-25 mx-auto border border-secondary px-2' style={{ borderRadius: '5px' }} >
                        <small>Receiver: <span>{receiverName}</span></small>
                    </div>
                </div>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <div className='text-center'>
                        <small>Description</small>
                    </div>
                    <input type="text" onChange={(e) => { setdescription(e.target.value) }} placeholder='Enter Description' className='form-control form-control-lg w-50 mt-2 mx-auto' />
                </div>
                <div className='col-sm-12 col-md-12 col-lg-12 mt-3 '>
                    <div className='text-center'>
                        <small>Enter Amount to send Below</small>
                    </div>
                    <input type="number" placeholder='Enter Amount' className='form-control form-control-lg w-50 mt-2 mx-auto' onChange={paymentValidation} />
                    <div id='' className='w-50 h-25 mx-auto border border-secondary px-2' style={{ borderRadius: '5px' }} >
                        <small>Total Charge: <span>#{totalAmount}</span></small>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12 text-center">
                    <button className='btn btn-primary btn-lg mt-4 w-50' onClick={intraTransfer}>Transfer</button>
                </div>
            </div>
        </div>
    )
}

export default Intrawallet
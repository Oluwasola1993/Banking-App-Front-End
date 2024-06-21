import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const FundWallet = () => {

    const [user, setuser] = useState("")
    const [account, setaccount] = useState("")
    const [bvnOrNin, setbvnOrNin] = useState("")
    let url = "https://bank-app-back-end.onrender.com/dashboard";
    let token = localStorage.getItem("token");
    const navigate = useNavigate();

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
                setuser(res.data.user);
                getAccount(res.data.user.emailInfo.email)
            })
            .catch((err) => {
                console.log(err);
                navigate('/signin')
            });
    }, []);

    const getAccount = (email) => {
        const url = 'https://bank-app-back-end.onrender.com/monnify/get_account'
        axios.post(url, { userEmail: email })
            .then((res) => {
                console.log(res);
                if (res) {
                    document.getElementById('created').style.display = 'block';
                    document.getElementById('notCreated').style.display = 'none';
                    setaccount(res.data.data.accounts)
                }

            })
            .catch((err) => {
                console.log(err);
                document.getElementById('created').style.display = 'none';
                document.getElementById('notCreated').style.display = 'block';
                // if (err) {
                // }
            })

    }

    const createAccount = () => {
        const url = 'https://bank-app-back-end.onrender.com/monnify'
        let data = {
            accountReference: `SOLCEMAN_MFY_${genCode()}`,
            accountName: `${user.firstName} ${user.lastName}`,
            customerEmail: user.emailInfo.email,
            bvn: bvnOrNin,
            customerName: `${user.firstName} ${user.lastName}`
        }
        axios.post(url, data)
            .then((res) => {
                console.log(res);
                toast.success('Account created successfully');
                setTimeout(() => {
                    window.location.reload()
                }, 2500);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const genCode = () => {
        let text = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let txtRandom = "";
        for (let i = 0; i < 20; i++) {
            txtRandom += text.charAt(Math.floor(Math.random() * text.length));
        }
        return txtRandom;
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12 text-center">
                        <h1>Fund Your Wallet</h1>
                        <h3>Reserved accounts</h3>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <div id="created">
                                <p className="text-center">
                                    Send money to any of this <b>Reserved account</b> to automatically
                                    fund your wallet by using Monnify Simulators.
                                </p>
                                <p className="text-center">Choose any of the accounts below to transfer money to</p>
                                <div className="d-flex gap-5 justify-content-around pt-4">
                                    {account ? (
                                        account.map((acc) => {
                                            return (
                                                <div>
                                                    <p>Account Name: Solceman {acc.accountName}</p>
                                                    <p>Account Number: {acc.accountNumber}</p>
                                                    <p>Bank Name: {acc.bankName}</p>
                                                </div>
                                            )
                                        })
                                    ) : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12 text-center">
                        <div id="notCreated">
                            <p>You have no Reserved account created!</p>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Create account</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <label htmlFor="ninOrBvn">BVN or NIN</label>
                            <input className="form-control w-100" type="text" id="ninOrBvn" onChange={(e) => { setbvnOrNin(e.target.value) }} />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={createAccount}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FundWallet;

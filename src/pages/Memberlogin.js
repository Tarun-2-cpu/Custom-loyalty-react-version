import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Memberlogin() {
    const navigate = useNavigate();
    const apiUrl = "https://cl-backend.kryptocoder.com/api/";

    useEffect(() => {
        if (!isLoggedIn() && window.location.pathname === '/member-dashboard') {
            navigate('/');
        }
    }, [navigate]);

    const isLoggedIn = () => {
        return sessionStorage.getItem('memberData') !== null;
    };

    const updateMember = async () => {
        const formAccountNum = document.querySelector('.account-number').value;
        const formCardId = document.querySelector('.card-id').value;

        const inputData = JSON.stringify({
            accountnumber: formAccountNum,
            cardid: formCardId
        });

        try {
            const response = await fetch(apiUrl + 'memberData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: inputData
            });

            const data = await response.json();

            if (data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid credentials. Please double-check your Account Number and Access ID.'
                });
            } else {
                localStorage.setItem('accountNumber', JSON.stringify(formAccountNum));
                localStorage.setItem('cardId', JSON.stringify(formCardId));
                sessionStorage.setItem('memberData', JSON.stringify(data));
                // updatePoints(data.points); // Define updatePoints if necessary
                navigate('/member-dashboard'); // Redirect to the dashboard
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An unexpected error occurred. Please try again later.'
            });
            console.error(error);
        }
    };

    const handleSignIn = (event) => {
        event.preventDefault();
        updateMember();
    };

    return (
        <div className="background show-spinner no-footer wrapper">
            <div className="fixed-background"></div>
            <main>
                <div className="container">
                    <div className="row h-100">
                        <div className="col-12 col-md-10 mx-auto my-auto">
                            <div className="auth-card card-auth">
                                <div className="position-relative col-5 image-side side-image">
                                    <p className="text-white h2 customer">Customer Loyalty Program</p><br />
                                    <p className="text-white mb-10 h3">Be Member</p>
                                    <p className="text-white mb-10 register">
                                        Join our exclusive loyalty program today and unlock exciting rewards!<br /><br />
                                        <Link to="/register-member" className="text-dark"><b>Register as Member</b></Link>.
                                    </p>
                                </div>
                                <div className="form-side side-form text-secondary col-7">
                                    <Link to="/">
                                        <span className="logo-single"><img src="./assets/logos/black.svg" alt="Logo" /></span>
                                    </Link>
                                    <h6 className="mb-4">Sign In</h6>
                                    <form>
                                        <label className="form-group has-float-label mb-4">
                                            <input className="form-control account-number" type="text" placeholder="Account Number" />
                                            {/* <span>Account Number</span> */}
                                        </label>
                                        <label className="form-group has-float-label mb-4">
                                            <input className="form-control card-id" type="text" placeholder="Access ID" />
                                            {/* <span>Access ID</span> */}
                                        </label>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Link to="/partner-login" style={{ color: 'grey' }}><b>Partner Access?</b></Link>
                                            <button className="btn btn-primary btn-lg btn-shadow sign sign-in-member" type="submit" onClick={handleSignIn}>SIGN IN</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Memberlogin;

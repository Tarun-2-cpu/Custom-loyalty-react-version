import React from 'react';
import '../css/login.css';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Partnerlogin() {
    const navigate = useNavigate();
    
    React.useEffect(() => {
        const apiUrl = "https://cl-backend.kryptocoder.com/api/";

        function isLoggedIn(){
            return sessionStorage.getItem('partnerData') !== null ;
        }

        if(!isLoggedIn() && window.location.pathname === '/partner-dashboard'){
            navigate('/partner');
        }

        function updatePartner(event){
            event.preventDefault();
            const formPartnerId = document.querySelector('.partner-id').value;
            const formCardId = document.querySelector('.card-id').value;
            const inputData = JSON.stringify({
                "partnerid": formPartnerId,
                "cardid": formCardId
            });

            fetch(apiUrl + 'partnerData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: inputData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    let error = data.error;
                    if (data.error.includes("Error")){
                        error = data.error.slice(data.error.indexOf("Error"));
                    }
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: error,
                    });
                } else {
                    localStorage.setItem('partner-id', JSON.stringify(formPartnerId));
                    localStorage.setItem('card-id', JSON.stringify(formCardId));
                    sessionStorage.setItem('partnerData', JSON.stringify(data));
                    navigate('/partner-dashboard');
                }
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Error: Try again',
                });
                console.error('Error:', error);
            });
        }

        document.querySelector('.sign-in-partner').addEventListener('click', updatePartner);

    }, [navigate]);

    return (
        <div className="background show-spinner no-footer wrapper">
            <div className="fixed-background"></div>
            <main>
                <div className="container">
                    <div className="row h-100">
                        <div className="col-12 col-md-10 mx-auto my-auto">
                            <div className="auth-card card-auth">
                                <div className="position-relative col-5 image-side side-image">
                                    <p className="text-white h2 customer">Customer Loyalty Program</p><br/>
                                    <p className="text-white mb-10 h3">Be Partner</p>
                                    <p className="text-white mb-10 register">
                                        Join our exclusive loyalty program today and unlock exciting rewards!<br/><br/>
                                        <Link to="/register-partner" className="text-dark"><b>Register as Partner</b></Link>.
                                    </p>
                                </div>
                                <div className="form-side side-form text-secondary col-7">
                                    <Link to="/">
                                        <span className="logo-single"><img src="./assets/logos/black.svg" alt="Logo"/></span>
                                    </Link>
                                    <h6 className="mb-4">Signin</h6>
                                    <form>
                                        <label className="form-group has-float-label mb-4">
                                            <input className="form-control partner-id" type="text" placeholder='Partner ID' />
                                            {/* <span>Partner ID</span> */}
                                        </label>
                                        <label className="form-group has-float-label mb-4">
                                            <input className="form-control card-id" type="text" placeholder="Access Card ID" />
                                            {/* <span>Access Card ID</span> */}
                                        </label>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Link to="/member-login" style={{color:'grey'}}><b>Member Access ?</b></Link>
                                            <button className="btn btn-primary btn-lg btn-shadow sign sign-in-partner" type="submit">SIGN IN</button>
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

export default Partnerlogin;

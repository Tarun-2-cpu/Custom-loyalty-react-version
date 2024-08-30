import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../css/Register.css';

function RegisterPartner() {
    const [name, setName] = useState('');
    const [partnerId, setPartnerId] = useState('');
    const [cardId, setCardId] = useState('');

    const apiUrl = "https://cl-backend.kryptocoder.com/api/registerPartner";

    const handleRegister = async (event) => {
        event.preventDefault();

        // Validation
        if (name.trim() === "" || partnerId.trim() === "" || cardId.trim() === "") {
            Swal.fire('Error', 'All fields are mandatory.', 'error');
            return;
        }
        if (partnerId.length < 6) {
            Swal.fire('Error', 'Partner ID must be at least 6 digits long.', 'error');
            return;
        }
        if (!/^\d+$/.test(partnerId)) {
            Swal.fire('Error', 'Partner ID can only contain numbers.', 'error');
            return;
        }
        if (cardId.length < 6) {
            Swal.fire('Error', 'Card ID must be at least 6 digits long.', 'error');
            return;
        }
        if (!/^\d+$/.test(cardId)) {
            Swal.fire('Error', 'Card ID can only contain numbers.', 'error');
            return;
        }

        // Create JSON data
        const inputData = JSON.stringify({
            name: name,
            partnerid: partnerId,
            cardid: cardId
        });

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: inputData
            });

            if (response.ok) {
                Swal.fire('Success', 'Successfully registered!', 'success').then(() => {
                    window.location.href = "/partner-login";
                });
            } else {
                const data = await response.json();
                Swal.fire('Error', data.error || 'Registration failed. Please try again.', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'An unexpected error occurred. Please try again.', 'error');
            console.error('Error:', error);
        }
    };

    return (
        <div className="background show-spinner no-footer wrapper">
            <div className="fixed-background"></div>
            <main>
                <div className="container">
                    <div className="row h-100">
                        <div className="col-12 col-md-10 mx-auto my-auto">
                            <div className="auth-card card-auth">
                                <div className="position-relative col-5 image-side side-image" style={{ height: "460px" }}>
                                    <p className="text-white customer h2">MAGIC IS IN THE DETAILS</p>
                                    <p className="white login">
                                        Please use this form to register.
                                        <br />If you are a partner, please<br /><br />
                                        <Link to="/partner-login"><b>Login As Partner</b></Link>.
                                    </p>
                                </div>
                                <div className="form-side side-form text-secondary col-7">
                                    <Link to="/">
                                        <span className="logo-single"><img src="./assets/logos/black.svg" alt="Logo" /></span>
                                    </Link>
                                    <h6 className="mb-4">Sign In</h6>
                                    <form onSubmit={handleRegister}>
                                        <label className="form-group mb-4 col-12">
                                            <input
                                                className="form-control partner-id"
                                                placeholder="Partner ID"
                                                value={partnerId}
                                                onChange={(e) => setPartnerId(e.target.value)}
                                            />
                                        </label>
                                        <label className="form-group mb-4 col-12">
                                            <input
                                                className="form-control card-id"
                                                placeholder="Access Card ID"
                                                value={cardId}
                                                onChange={(e) => setCardId(e.target.value)}
                                            />
                                        </label>
                                        <label className="form-group mb-4 col-12">
                                            <input
                                                className="form-control name"
                                                placeholder="Company"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </label>
                                        <div className="d-flex justify-content-end align-items-center">
                                            <button className="btn btn-primary btn-lg btn-shadow sign register-partner" type="submit">REGISTER</button>
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

export default RegisterPartner;

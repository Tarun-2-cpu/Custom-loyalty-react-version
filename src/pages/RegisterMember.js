import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../css/Register.css';

function RegisterMember() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [cardId, setCardId] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const apiUrl = "https://cl-backend.kryptocoder.com/api/registerMember";

    const validateEmail = (email) => {
        // Simple email validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        // Validation
        if (firstName.trim() === "") {
            Swal.fire('Error', 'First name cannot be empty.', 'error');
            return;
        }
        if (lastName.trim() === "") {
            Swal.fire('Error', 'Last name cannot be empty.', 'error');
            return;
        }
        if (accountNumber.length < 6 || !/^\d+$/.test(accountNumber)) {
            Swal.fire('Error', 'Account number must be a minimum of 6 digits and can only contain numbers.', 'error');
            return;
        }
        if (cardId.length < 6 || !/^\d+$/.test(cardId)) {
            Swal.fire('Error', 'Card ID must be a minimum of 6 digits and can only contain numbers.', 'error');
            return;
        }
        if (email.trim() === "" || !validateEmail(email)) {
            Swal.fire('Error', 'Please enter a valid email address.', 'error');
            return;
        }
        if (phoneNumber.trim() === "" || !/^\d+$/.test(phoneNumber)) {
            Swal.fire('Error', 'Please enter a valid phone number.', 'error');
            return;
        }

        // Create JSON data
        const inputData = JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            email: email,
            phonenumber: phoneNumber,
            accountnumber: accountNumber,
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
                    window.location.href = "/member-login";
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
                                <div className="position-relative col-5 image-side side-image">
                                    <p className="text-white customer h2">MAGIC IS IN THE DETAILS</p>
                                    <p className="white login mb-0">
                                        Please use this form to register.
                                        <br />If you are a member, please<br /><br />
                                        <Link to="/"><b>Login As Member</b></Link>.
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
                                                className="form-control first-name"
                                                placeholder="First Name"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </label>
                                        <label className="form-group mb-4 col-12">
                                            <input
                                                className="form-control last-name"
                                                placeholder="Last Name"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </label>
                                        <label className="form-group mb-4 col-12">
                                            <input
                                                className="form-control account-number"
                                                placeholder="Account Number"
                                                value={accountNumber}
                                                onChange={(e) => setAccountNumber(e.target.value)}
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
                                                className="form-control email"
                                                type="email"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </label>
                                        <label className="form-group mb-4 col-12">
                                            <input
                                                className="form-control phone-number"
                                                placeholder="Phone"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />
                                        </label>
                                        <div className="d-flex justify-content-end align-items-center">
                                            <button className="btn btn-primary btn-lg btn-shadow sign register-member" type="submit">REGISTER</button>
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

export default RegisterMember;

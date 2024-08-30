import React, { useState, useEffect } from 'react';
import '../css/body.css';
import PartnerNavbar from '../components/PartnerNavbar';
import { Link } from 'react-router-dom'; 
import Footer from '../components/footer';

function PartnerDashboard() {
    // State to store partner data
    const [partnerData, setPartnerData] = useState(null);

    useEffect(() => {
        // Retrieve partner data from sessionStorage
        const data = JSON.parse(sessionStorage.getItem('partnerData'));

        if (data) {
            setPartnerData(data);
        }
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    return (
        <div id="app-container" className="menu-default show-spinner">
            <PartnerNavbar/>
            <main>
                <div className="container-fluid">
                    <div className="col-12">
                        <h1>Partner Dashboard</h1>
                        <nav className="breadcrumb-container d-none d-sm-block d-lg-inline-block" aria-label="breadcrumb">
                            <ol className="breadcrumb pt-0">
                                <li className="breadcrumb-item">
                                    <Link to="/partner-dashboard">Home</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to="/transactions">Transactions</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    <Link to="/add-offer">Offers</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to="/add-reward">Rewards</Link>
                                </li>
                            </ol>
                        </nav>
                        <div className="separator mb-5" />
                        <div className="row">
                            <div className="col-12">
                                <div className="row icon-cards-row mb-4 sortable">
                                    <div className="col-md-3 col-lg-3 col-sm-4 col-6 mb-2">
                                        <div className="card">
                                            <div className="card-body text-center">
                                                <i className="iconsminds-user" />
                                                <p className="card-text font-weight-semibold mt-10 mb-0">Name:</p>
                                                <p className="lead text-center heading-1">
                                                    {partnerData ? partnerData.name : ''}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-lg-3 col-sm-4 col-6 mb-2">
                                        <div className="card">
                                            <div className="card-body text-center">
                                                <i className="iconsminds-id-card" />
                                                <p className="card-text mb-0">Account ID:</p>
                                                <p className="lead text-center heading-2">
                                                    {partnerData ? partnerData.id : ''}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-4 col-11">
                            <div className="card-body" id="dashboard">
                                <h3 className="mb-4">Points Usage</h3>
                                <div className="mb-0 dashboards">
                                    {partnerData && (
                                        <>
                                            <h5>Total Allocated Points: <b>{partnerData.pointsGiven}</b></h5>
                                            <h5>Total Redeemed Points: <b>{partnerData.pointsCollected}</b></h5>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default PartnerDashboard;

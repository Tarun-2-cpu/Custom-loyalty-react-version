import React, { useEffect } from 'react';
import '../css/body.css';
import PartnerNavbar from '../components/PartnerNavbar';
import Footer from '../components/footer';
import $ from 'jquery';

function Addoffer() {
    useEffect(() => {
        // var apiUrl = "https://cl-backend.kryptocoder.com/api/";

        // Function to check if partner is logged in
        function isLoggedIn() {
            return sessionStorage.getItem('partnerData') !== null;
        }

        // Redirect to login page if not logged in
        if (!isLoggedIn() && window.location.pathname === 'addOffer.html') {
            window.location.href = 'partner.html';
        }

        // Retrieve partner data from session storage
        var partnerData = JSON.parse(sessionStorage.getItem('partnerData'));
        console.log(partnerData);

        // Display partner data if available
        if (!partnerData || !Array.isArray(partnerData.addOfferResults)) {
            console.error('Partner data is missing or incorrectly formatted:', partnerData);
        } else {
            let nameElement = $('.heading-1');
            let accountIdElement = $('.heading-2');

            nameElement.text(partnerData.name);
            accountIdElement.text(partnerData.id);

            let offerList = $('#offerlist');
            let offerData = partnerData.addOfferResults.reverse();

            for (let i = 0; i < offerData.length; i++) {
                offerList.append('<div class="card d-flex text-center m-4 offer-card">' +
                '<div class="d-flex flex-grow-1 min-width-zero">' +
                '<div class="card-body m-auto d-flex align-content-center flex-column flex-lg-row justify-content-center min-width-zero">' +
                '<div class="min-width-zero card-details">' +
                '<p class="list-item-heading mb-1 truncate">' + offerData[i].product + '</p>' +
                '<p class="mb-2 text-muted">Price: ' + offerData[i].price + '$</p>' +
                '<p class="mb-2 text-muted">Points: ' + offerData[i].points + '</p>' +
                '</div></div></div></div>');
            }        
        }

    }, []);

    // Function to handle adding an offer
    const handleAddOffer = (event) => {
        event.preventDefault();

        let partnerId = JSON.parse(localStorage.getItem('partner-id'));
        let cardId = JSON.parse(localStorage.getItem('card-id'));
        var apiUrl = "https://cl-backend.kryptocoder.com/api/";

        var offerproduct = $('#offerproduct').val();
        var offerprice = $('#offerprice').val();
        var offerpoints = $('#offerpoints').val();

        var inputdata = JSON.stringify({
            "cardId": cardId,
            "partnerId": partnerId,
            "productName": offerproduct,
            "price": offerprice,
            "points": offerpoints
        });

        console.log(inputdata);

        $.ajax({
            type: 'POST',
            url: apiUrl + 'addOffer',
            data: inputdata,
            dataType: 'json',
            contentType: 'application/json',
            success: function(data) {
                console.log(data);
                if (data.error) {
                    let error = data.error;
                    if (error.startsWith("Error")) {
                        error = error.substring(error.indexOf("Error"));
                    }
                    alert(error);
                } else {
                    console.log("Offer added successfully");
                    
                    $('#offerlist').append( '<div class="card d-flex text-center offer-card m-4">' +
                    '<div class="d-flex flex-grow-1 min-width-zero m-4">' +
                    '<div class="card-body m-auto d-flex align-content-center flex-column flex-lg-row justify-content-center min-width-zero">' +
                    '<div class="min-width-zero card-details">' +
                    '<p class="list-item-heading mb-1 truncate">' + offerproduct + '</p>' +
                    '<p class="mb-2 text-muted">Price: ' + offerprice + '</p>' +
                    '<p class="mb-2 text-muted">Points: ' + offerpoints + '</p>' +
                    '</div></div></div></div>');
                    $('.offerModal').css("display", "none");
                    $('#offerproduct').val('');
                    $('#offerprice').val('');
                    $('#offerpoints').val('');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                console.log(textStatus);
                console.log(jqXHR);
                alert("Error: Try again");
            }
        });
    };

    // Function to handle showing the add offer modal
    const handleShowOfferModal = () => {
        $('.offerModal').css("display", "block");
    };

    // Function to handle hiding the add offer modal
    const handleCancelOffer = () => {
        $('.offerModal').css("display", "none");
    };

    return (
        <>
            <PartnerNavbar />
            <main>
                <div className="container-fluid">
                    <div className="col-12">
                        <div className="nav-side-link">
                            <h1>Partner Dashboard</h1>
                            <nav className="breadcrumb-container d-none d-sm-block d-lg-inline-block" aria-label="breadcrumb">
                                <ol className="breadcrumb pt-0">
                                    <li className="breadcrumb-item">
                                        <a href="partner-dashboard.html">Home</a>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <a href="Transactions.html">Transactions</a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        <a href="addOffer.html">Offers</a>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <a href="addReward.html">Rewards</a>
                                    </li>
                                </ol>
                            </nav>
                        </div>
                        <div className="separator mb-5"></div>

                        <div className="row">
                            <div className="col-12">
                                <div className="row icon-cards-row mb-4 sortable">
                                    <div className="col-md-3 col-lg-3 col-sm-4 col-6 mb-2">
                                        <div className="card">
                                            <div className="card-body text-center">
                                                <i className="iconsminds-user"></i>
                                                <p className="card-text font-weight-semibold mt-10 mb-0">Name:</p>
                                                <p className="lead text-center heading-1"></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-lg-3 col-sm-4 col-6 mb-2">
                                        <div className="card">
                                            <div className="card-body text-center">
                                                <i className="iconsminds-id-card"></i>
                                                <p className="card-text mb-0">Account ID:</p>
                                                <p className="lead text-center heading-2"></p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="card mb-4 col-11">
                                    <div className="card-body">
                                        <p className="mb-30">
                                            <button className="btn btn-primary mb-20" type="button" data-toggle="collapse"
                                                data-target="#collapseExample" aria-expanded="false"
                                                aria-controls="collapseExample" onClick={handleShowOfferModal}>
                                                Add Offer
                                            </button>
                                        </p>
                                        <div className="collapse" id="collapseExample">
                                            <div className="p-4 border mt-4">

                                                <div className="mb-4 offerModal">
                                                    <div className="container-fluid card-body col-6">
                                                        <h5 className="mb-4">Add Offer</h5>

                                                        <form id="exampleFormTopLabels" method="POST" className="tooltip-right-bottom">

                                                            <div className="form-group col-12">
                                                                <span>Product</span>
                                                                <input type="text" id="offerproduct" className="form-control" required />
                                                            </div>

                                                            <div className="form-group col-12">
                                                                <span>Price</span>
                                                                <input type="text" id="offerprice" className="form-control" required />
                                                            </div>

                                                            <div className="form-group col-12">
                                                                <span>Points</span>
                                                                <input type="text" id="offerpoints" className="form-control" required />
                                                            </div>

                                                            <button className="btn btn-primary" type="submit" id="add_offer" onClick={handleAddOffer}>Submit</button>
                                                            <button className="btn btn-secondary" type="button" id="cancelOffer" onClick={handleCancelOffer}>Cancel</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="mb-10 offer">Offer List</h4>
                                            <div className="row mb-10">
                                                <div className="col-md-12 mb-4 pl-0 pr-0">
                                                    <div className="slick-container">
                                                        <div className="slick basic list-offer" id="offerlist">
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Addoffer;

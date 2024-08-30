import React, { useEffect, useState } from 'react';
import '../css/body.css';
import PartnerNavbar from '../components/PartnerNavbar';
import Footer from '../components/footer';

function AddReward() {
    const [partnerData, setPartnerData] = useState(null);
    const [rewardItem, setRewardItem] = useState('');
    const [rewardPoints, setRewardPoints] = useState('');
    const [rewardList, setRewardList] = useState([]);
    const [showRewardModal, setShowRewardModal] = useState(false);

    const apiUrl = "https://cl-backend.kryptocoder.com/api/";

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('partnerData') !== null;
        if (!isLoggedIn && window.location.pathname === '/addReward.html') {
            window.location.href = 'partner.html';
        } else {
            const storedPartnerData = JSON.parse(sessionStorage.getItem('partnerData'));
            setPartnerData(storedPartnerData);
            if (storedPartnerData) {
                setRewardList(storedPartnerData.addRewardResults.reverse());
            }
        }
    }, []);

    const updatePartner = () => {
        const partnerId = JSON.parse(localStorage.getItem('partner-id'));
        const cardId = JSON.parse(localStorage.getItem('card-id'));
        const inputData = JSON.stringify({ partnerid: partnerId, cardid: cardId });

        fetch(`${apiUrl}partnerData`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: inputData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                let error = data.error;
                if (error.startsWith("Error")) {
                    error = error.substring(error.indexOf("Error"));
                }
                alert(error);
            } else {
                sessionStorage.setItem('partnerId', inputData);
                sessionStorage.setItem('partnerData', JSON.stringify(data));
            }
        })
        .catch(error => {
            alert("Error: Try again");
            console.error(error);
        });
    };

    const handleAddReward = (event) => {
        event.preventDefault();

        const partnerId = JSON.parse(localStorage.getItem('partner-id'));
        const cardId = JSON.parse(localStorage.getItem('card-id'));
        const inputData = JSON.stringify({
            cardId: cardId,
            partnerId: partnerId,
            itemName: rewardItem,
            points: rewardPoints,
        });

        fetch(`${apiUrl}addReward`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: inputData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                let error = data.error;
                if (error.startsWith("Error")) {
                    error = error.substring(error.indexOf("Error"));
                }
                alert(error);
            } else {
                console.log("Reward added successfully");
                setRewardList([
                    { item: rewardItem, points: rewardPoints },
                    ...rewardList,
                ]);
                setShowRewardModal(false);
                setRewardItem('');
                setRewardPoints('');
                updatePartner();
            }
        })
        .catch(error => {
            alert("Error: Try again");
            console.error(error);
        });
    };

    // const handleLogout = () => {
    //     sessionStorage.removeItem('partnerData');
    //     window.location.href = 'partner.html';
    // };

    const toggleRewardModal = () => {
        setShowRewardModal(!showRewardModal);
    };

    return (
        <>

            <PartnerNavbar/>

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
                                                <p className="lead text-center heading-1">
                                                    {partnerData ? partnerData.name : ''}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-lg-3 col-sm-4 col-6 mb-2">
                                        <div className="card">
                                            <div className="card-body text-center">
                                                <i className="iconsminds-id-card"></i>
                                                <p className="card-text mb-0">Account ID:</p>
                                                <p className="lead text-center heading-2">
                                                    {partnerData ? partnerData.id : ''}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mb-4 col-11">
                                    <div className="card-body">
                                        <p className="mb-30">
                                            <button className="btn btn-primary mb-20" type="button" onClick={toggleRewardModal}>
                                                Add Reward
                                            </button>
                                        </p>
                                        {showRewardModal && (
                                            <div className="p-4 border mt-4 rewardModal">
                                                <div className="container-fluid card-body col-6">
                                                    <h5 className="mb-4">Add Reward</h5>
                                                    <form id="exampleFormTopLabels" className="tooltip-right-bottom" onSubmit={handleAddReward}>
                                                        <div className="form-group col-12">
                                                            <span>Item</span>
                                                            <input type="text" id="rewarditem" className="form-control" value={rewardItem} onChange={(e) => setRewardItem(e.target.value)} required />
                                                        </div>
                                                        <div className="form-group col-12">
                                                            <span>Points</span>
                                                            <input type="text" id="rewardpoints" className="form-control" value={rewardPoints} onChange={(e) => setRewardPoints(e.target.value)} required />
                                                        </div>
                                                        <button className="btn btn-primary" type="submit">Submit</button>
                                                    </form>
                                                </div>
                                            </div>
                                        )}
                                        <div>
                                            <h4 className="mb-10 offer">Reward List</h4>
                                            <div className="row mb-10">
                                                <div className="col-md-12 mb-4 pl-0 pr-0">
                                                    <div className="slick-container">
                                                        <div className="slick basic" id="rewardlist">
                                                            {rewardList.map((reward, index) => (
                                                                <div className="card d-flex text-center m-4" key={index}>
                                                                    <div className="d-flex flex-grow-1 min-width-zero">
                                                                        <div className="card-body m-auto d-flex align-content-center flex-column flex-lg-row justify-content-center min-width-zero">
                                                                            <div className="min-width-zero card-details">
                                                                                <p className="list-item-heading mb-1 truncate">{reward.item}</p>
                                                                                <p className="mb-2 text-muted">{reward.points}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
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

export default AddReward;

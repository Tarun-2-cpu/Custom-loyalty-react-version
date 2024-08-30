
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MemberNavbar from "../components/MemberNavbar"
import Footer from "../components/footer"


const Reedem = () => {
    const [memberData, setMemberData] = useState(null);
    const [partnerData, setPartnerData] = useState([]);
    const [redeemOptions, setRedeemOptions] = useState([]);
    const [selectedPartnerId, setSelectedPartnerId] = useState('');
    const [usePointsInput, setUsePointsInput] = useState('');
    const navigate = useNavigate();
    const apiUrl = "https://cl-backend.kryptocoder.com/api/";

    useEffect(() => {
        const memberDataFromSession = JSON.parse(sessionStorage.getItem('memberData'));
        if (memberDataFromSession) {
            setMemberData(memberDataFromSession);
            setPartnerData(memberDataFromSession.partnersData);
        } else {
            navigate('/index');  // Redirect to login if not logged in
        }
    }, [navigate]);

    const handlePartnerChange = async (e) => {
        const partnerId = e.target.value;
        setSelectedPartnerId(partnerId);

        const cardId = JSON.parse(localStorage.getItem('cardId'));
        const inputData = {
            partnerId: partnerId,
            cardId: cardId
        };

        try {
            const response = await axios.post(apiUrl + 'addRewardTransactions', inputData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                setRedeemOptions(response.data.success);
            }
        } catch (error) {
            console.error("Error fetching redeem options:", error);
        }
    };

    const handleUsePoints = async (points) => {
        const accountNumber = JSON.parse(localStorage.getItem('accountNumber'));
        const cardId = JSON.parse(localStorage.getItem('cardId'));

        if (!selectedPartnerId) {
            alert("Select partner first");
            return;
        }

        const formPoints = parseFloat(points);

        if (isNaN(formPoints) || formPoints <= 0) {
            alert("Enter a valid number of points");
            return;
        }

        const inputData = {
            accountnumber: accountNumber,
            cardid: cardId,
            points: formPoints,
            partnerid: selectedPartnerId
        };

        try {
            const response = await axios.post(apiUrl + 'usePoints', inputData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.data.error) {
                alert('Transaction successful');
                const newPoints = memberData.points - formPoints;
                updatePoints(newPoints);
                resetFields();
            } else {
                alert("Error: Try again");
            }
        } catch (error) {
            console.error("Error during transaction:", error);
        }
    };

    const updatePoints = (points) => {
        setMemberData(prevData => {
            const updatedData = { ...prevData, points };
            sessionStorage.setItem('memberData', JSON.stringify(updatedData));
            return updatedData;
        });
    };

    const resetFields = () => {
        setSelectedPartnerId('');
        setUsePointsInput('');
        setRedeemOptions([]);
    };
    // 
    return (
        <div id="app-container" className="menu-default show-spinner">
            <MemberNavbar />

            <main>
                <div className="container-fluid">
                    <div className="col-12">
                        <h1>Member Dashboard</h1>
                        <nav className="breadcrumb-container d-none d-sm-block d-lg-inline-block" aria-label="breadcrumb">
                            <ol className="breadcrumb pt-0">
                                <li className="breadcrumb-item">
                                    <Link to="/member-dashboard">Home</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to="/reedem">Reedem</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    <Link to="/member-transaction">Transaction</Link>
                                </li></ol></nav>
                        <div className="separator mb-5" />
                        <div className="row">
                            <div className="col-10">
                                <div className="row icon-cards-row mb-4 sortable">
                                    <div className="col-md-3 col-lg-3 col-sm-4 col-6 mb-2">
                                        <div className="card">
                                            <div className="card-body text-center">
                                                <i className="iconsminds-user" />
                                                <p className="card-text font-weight-semibold mt-10 mb-0">User:</p>
                                                <p className="lead text-center heading-1">
                                                    {memberData ? `${memberData.firstName || ''} ${memberData.lastName || ''}` : ''}
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
                                                    {memberData ? memberData.accountNumber || '' : ''}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-lg-3 col-sm-4 col-6 mb-2">
                                        <div className="card">
                                            <div className="card-body text-center">
                                                <i className="iconsminds-diamond" />
                                                <p className="card-text mb-0">Points:</p>
                                                <p className="lead text-center heading-3">
                                                    {memberData ? memberData.points || 0 : 0}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-10">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <h2 className="mb-4">Reedem Points</h2>
                                        <div className="separator mb-5" />
                                        <div className=" mb-4 form-side d-flex justify-content-center">
                                            <form id="exampleFormTopLabels" className="tooltip-right-bottom" />
                                            <div className="card-body usePartnerId col-7">
                                                <div className="form-group col-12 use-partner">
                                                    <span>Choose Partner to Reedem Points</span>


                                                    <select className="form-control select2-single" value={selectedPartnerId} onChange={handlePartnerChange} name="jQueryTopLabelsState" required data-width="100%">
                                                        <option value="" disabled>Select Partner</option>
                                                        {partnerData.map(partner => (
                                                            <option key={partner.id} value={partner.id}>{partner.name}</option>
                                                        ))}
                                                    </select>


                                                </div>
                                                <div className="form-group col-12 redeemloyalty">
                                                    {redeemOptions.length > 0 && (
                                                        <select
                                                            className="form-control"
                                                            value={usePointsInput}
                                                            onChange={(e) => handleUsePoints(e.target.value)}
                                                        >
                                                            {redeemOptions.map(option => (
                                                                <option key={option.item} value={option.points}>
                                                                    {option.item} - {option.points} points
                                                                </option>
                                                            ))}
                                                        </select>
                                                    )}
                                                </div>
                                                <div className="form-group col-12 usePoints">
                                                    <span>Reedem Points for an Item</span>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={usePointsInput}
                                                        onChange={(e) => setUsePointsInput(e.target.value)}
                                                        placeholder="Enter points to use"
                                                    />
                                                </div>
                                                <button className="btn btn-primary use-points-transaction" onClick={() => handleUsePoints(usePointsInput)}>Purchase and Earn</button>
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
        </div>
    )
}

export default Reedem;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// const MemberDashboard = () => {
//     const [memberData, setMemberData] = useState(null);
//     const [partnerData, setPartnerData] = useState([]);
//     const [redeemOptions, setRedeemOptions] = useState([]);
//     const [selectedPartnerId, setSelectedPartnerId] = useState('');
//     const [usePointsInput, setUsePointsInput] = useState('');
//     const navigate = useNavigate();
//     const apiUrl = "https://cl-backend.kryptocoder.com/api/";

//     useEffect(() => {
//         const memberDataFromSession = JSON.parse(sessionStorage.getItem('memberData'));
//         if (memberDataFromSession) {
//             setMemberData(memberDataFromSession);
//             setPartnerData(memberDataFromSession.partnersData);
//         } else {
//             navigate('/index');  // Redirect to login if not logged in
//         }
//     }, [navigate]);

//     const handlePartnerChange = async (e) => {
//         const partnerId = e.target.value;
//         setSelectedPartnerId(partnerId);

//         const cardId = JSON.parse(localStorage.getItem('cardId'));
//         const inputData = {
//             partnerId: partnerId,
//             cardId: cardId
//         };

//         try {
//             const response = await axios.post(apiUrl + 'addRewardTransactions', inputData, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (response.data.success) {
//                 setRedeemOptions(response.data.success);
//             }
//         } catch (error) {
//             console.error("Error fetching redeem options:", error);
//         }
//     };

//     const handleUsePoints = async (points) => {
//         const accountNumber = JSON.parse(localStorage.getItem('accountNumber'));
//         const cardId = JSON.parse(localStorage.getItem('cardId'));

//         if (!selectedPartnerId) {
//             alert("Select partner first");
//             return;
//         }

//         const formPoints = parseFloat(points);

//         if (isNaN(formPoints) || formPoints <= 0) {
//             alert("Enter a valid number of points");
//             return;
//         }

//         const inputData = {
//             accountnumber: accountNumber,
//             cardid: cardId,
//             points: formPoints,
//             partnerid: selectedPartnerId
//         };

//         try {
//             const response = await axios.post(apiUrl + 'usePoints', inputData, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.data.error) {
//                 alert('Transaction successful');
//                 const newPoints = memberData.points - formPoints;
//                 updatePoints(newPoints);
//                 resetFields();
//             } else {
//                 alert("Error: Try again");
//             }
//         } catch (error) {
//             console.error("Error during transaction:", error);
//         }
//     };

//     const updatePoints = (points) => {
//         setMemberData(prevData => {
//             const updatedData = { ...prevData, points };
//             sessionStorage.setItem('memberData', JSON.stringify(updatedData));
//             return updatedData;
//         });
//     };

//     const resetFields = () => {
//         setSelectedPartnerId('');
//         setUsePointsInput('');
//         setRedeemOptions([]);
//     };

//     return (
//         <div>
//             {memberData && (
//                 <>
//                     <h1 className="heading-1">{memberData.firstName} {memberData.lastName}</h1>
//                     <h2 className="heading-2">{memberData.accountNumber}</h2>
//                     <h3 className="heading-3">{memberData.points}</h3>

//                     <div className="use-partner">
//                         <select value={selectedPartnerId} onChange={handlePartnerChange}>
//                             <option value="" disabled>Select Partner</option>
//                             {partnerData.map(partner => (
//                                 <option key={partner.id} value={partner.id}>{partner.name}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="redeemloyalty">
//                         {redeemOptions.length > 0 && (
//                             <select
//                                 className="form-control"
//                                 value={usePointsInput}
//                                 onChange={(e) => handleUsePoints(e.target.value)}
//                             >
//                                 {redeemOptions.map(option => (
//                                     <option key={option.item} value={option.points}>
//                                         {option.item} - {option.points} points
//                                     </option>
//                                 ))}
//                             </select>
//                         )}
//                     </div>

//                     <div className="usePoints">
//                         <input
//                             type="number"
//                             className="form-control"
//                             value={usePointsInput}
//                             onChange={(e) => setUsePointsInput(e.target.value)}
//                             placeholder="Enter points to use"
//                         />
//                         <button className="use-points-transaction" onClick={() => handleUsePoints(usePointsInput)}>
//                             Use Points
//                         </button>

//                         <Link to= "/member-dashboard"> Member Dashboard </Link>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default MemberDashboard;






















// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import MemberNavbar from '../components/MemberNavbar';
// import Footer from '../components/footer';
// import $ from 'jquery';

// function Reedem() {
//     const navigate = useNavigate();
//     const [memberData, setMemberData] = useState(null);
//     const apiUrl = "https://cl-backend.kryptocoder.com/api/";

//     useEffect(() => {
//         // Check if the user is logged in
//         const isLoggedIn = () => {
//             return sessionStorage.getItem('memberData') !== null;
//         };

//         if (!isLoggedIn()) {
//             navigate('/index');
//         } else {
//             const memberDataFromStorage = JSON.parse(sessionStorage.getItem('memberData'));
//             setMemberData(memberDataFromStorage);
//             updateDashboard(memberDataFromStorage);
//         }
//     }, [navigate]);

//     function updateDashboard(memberData) {
//         if (memberData) {
//             let nameElement = document.querySelector('.heading-1');
//             let accountNumberElement = document.querySelector('.heading-2');
//             let pointsElement = document.querySelector('.heading-3');

//             if (nameElement) nameElement.innerHTML = memberData.firstName + ' ' + memberData.lastName;
//             if (accountNumberElement) accountNumberElement.innerHTML = memberData.accountNumber;
//             if (pointsElement) pointsElement.innerHTML = memberData.points;

//             populatePartnersDropdown(memberData.partnersData);
//         }
//     }

//     function populatePartnersDropdown(partnerData) {
//         let partnerDropdown = document.querySelector('.use-partner select');
//         if (partnerDropdown) {
//             partnerDropdown.innerHTML = '<option value="" disabled selected>Select</option>';
//             partnerData.forEach(partner => {
//                 partnerDropdown.innerHTML += `<option partner-id="${partner.id}">${partner.name}</option>`;
//             });
//         }
//     }

//     function earnPoints(formPoints) {
//         let accountNumber = JSON.parse(localStorage.getItem('accountNumber'));
//         let cardId = JSON.parse(localStorage.getItem('cardId'));
//         let partnerId = $('.use-partner select').find(":selected").attr('partner-id');

//         if (!partnerId) {
//             alert("Select a partner first");
//             return;
//         }

//         formPoints = parseFloat(formPoints);
//         if (isNaN(formPoints) || formPoints <= 0) {
//             alert("Enter a valid number of points");
//             return;
//         }

//         var inputData = JSON.stringify({
//             "accountnumber": accountNumber,
//             "cardid": cardId,
//             "points": formPoints,
//             "partnerid": partnerId
//         });

//         $.ajax({
//             type: 'POST',
//             url: apiUrl + 'usePoints',
//             data: inputData,
//             dataType: 'json',
//             contentType: 'application/json',
//             success: function (data) {
//                 if (data.error) {
//                     alert(data.error);
//                 } else {
//                     alert('Transaction successful');
//                     let pointsElement = document.querySelector('.heading-3');
//                     let currentPoints = parseInt(pointsElement.innerHTML);
//                     let earnedPoints = parseInt(formPoints);
//                     let newPoints = currentPoints - earnedPoints;

//                     updatePoints(newPoints);
//                     $('.use-partner select').val('');
//                     $('.usePoints input').val('');
//                     $('#redeemloyalty').html('');
//                 }
//             },
//             error: function () {
//                 console.log("Error: Try again");
//             }
//         });
//     }

//     function updatePoints(newPoints) {
//         let pointsElement = document.querySelector('.heading-3');
//         if (pointsElement) {
//             pointsElement.innerHTML = newPoints;
//         }

//         if (memberData) {
//             const updatedMemberData = { ...memberData, points: newPoints };
//             setMemberData(updatedMemberData);
//             sessionStorage.setItem('memberData', JSON.stringify(updatedMemberData));
//         }
//     }

//     useEffect(() => {
//         $(document).on('change', '.use-partner select', function (e) {
//             e.preventDefault();
//             var partnerId = $(this).find(':selected').attr('partner-id');
//             var formCardId = JSON.parse(localStorage.getItem('cardId'));

//             var inputData = JSON.stringify({
//                 "partnerId": partnerId,
//                 "cardId": formCardId
//             });

//             $.ajax({
//                 type: 'POST',
//                 url: apiUrl + 'addRewardTransactions',
//                 data: inputData,
//                 dataType: 'json',
//                 contentType: 'application/json',
//                 success: function (data) {

//                     let dropdown = '<select class="form-control" id="transactionDropdown" required>';
//                     data.success.forEach(transaction => {
//                         dropdown += `<option value="${transaction.points}">Purchase ${transaction.product} for $${transaction.price} and earn ${transaction.points} points</option>`;
//                     });
//                     dropdown += '</select><span>Purchase Deals</span>';

//                     $('#redeemloyalty').html(dropdown);
//                 }
//             });
//         });

//         $(document).on('change', '#redeemloyalty #transactionDropdown', function (e) {
//             e.preventDefault();
//             var formPoints = $(this).val();
//             earnPoints(formPoints);
//         });

//         $(document).on('click', '.use-points-transaction', function (e) {
//             e.preventDefault();
//             var formPoints = $('.usePoints input').val();
//             earnPoints(formPoints);
//         });
//     }, [memberData]);

//     return (
//         <div id="app-container" className="menu-default show-spinner">
//             <MemberNavbar />

//             <main>
//                 <div className="container-fluid">
//                     <div className="col-12">
//                         <h1>Member Dashboard</h1>
//                         <nav className="breadcrumb-container d-none d-sm-block d-lg-inline-block" aria-label="breadcrumb">
//                             <ol className="breadcrumb pt-0">
//                                 <li className="breadcrumb-item">
//                                     <Link to="/member-dashboard">Home</Link>
//                                 </li>
//                                 <li className="breadcrumb-item">
//                                     <Link to="/reedem">Reedem</Link>
//                                 </li>
//                                 <li className="breadcrumb-item active" aria-current="page">
//                                     <Link to="/member-transaction">Transaction</Link>
//                                 </li>
//                             </ol>
//                         </nav>
//                         <div className="separator mb-5" />
//                         <div className="row">
//                             <div className="col-11">
//                                 <div className="row icon-cards-row mb-4 sortable">
//                                     <div className="col-md-3 col-lg-3 col-sm-4 col-6 mb-2">
//                                         <div className="card">
//                                             <div className="card-body text-center">
//                                                 <i className="iconsminds-user" />
//                                                 <p className="card-text font-weight-semibold mt-10 mb-0">User:</p>
//                                                 <p className="lead text-center heading-1" />
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-3 col-lg-3 col-sm-4 col-6 mb-2">
//                                         <div className="card">
//                                             <div className="card-body text-center">
//                                                 <i className="iconsminds-id-card" />
//                                                 <p className="card-text mb-0">Account ID:</p>
//                                                 <p className="lead text-center heading-2" />
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-3 col-lg-3 col-sm-4 col-6 mb-2">
//                                         <div className="card">
//                                             <div className="card-body text-center">
//                                                 <i className="iconsminds-diploma" />
//                                                 <p className="card-text mb-0">Total Points:</p>
//                                                 <p className="lead text-center heading-3" />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="row icon-cards-row mb-4 sortable">
//                                     <div className="col-md-3 col-lg-3 col-sm-4 col-6 mb-2">
//                                         <div className="usePoints">
//                                             <div className="card">
//                                                 <div className="card-body text-center">
//                                                     <p className="card-text mb-0">Use Points:</p>
//                                                     <div className="input-group mb-3">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control"
//                                                             placeholder="Enter Points"
//                                                             aria-label="Points"
//                                                             aria-describedby="button-addon2"
//                                                         />
//                                                         <div className="input-group-append">
//                                                             <button
//                                                                 className="btn btn-primary use-points-transaction"
//                                                                 type="button"
//                                                                 id="button-addon2"
//                                                             >
//                                                                 Redeem
//                                                             </button>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="col-md-3 col-lg-3 col-sm-4 col-6 mb-2">
//                                         <div className="use-partner">
//                                             <div className="card">
//                                                 <div className="card-body text-center">
//                                                     <p className="card-text mb-0">Select Partner:</p>
//                                                     <select className="form-control" required></select>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="col-md-3 col-lg-3 col-sm-4 col-6 mb-2">
//                                         <div className="card">
//                                             <div className="card-body text-center">
//                                                 <p className="card-text mb-0">Redeem Loyalty:</p>
//                                                 <div id="redeemloyalty" />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </main>

//             <Footer />
//         </div>
//     );
// }

// export default Reedem;

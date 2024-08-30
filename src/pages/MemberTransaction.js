import React, { useEffect } from 'react';
import MemberNavbar from '../components/MemberNavbar';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';
import $ from 'jquery';

function MemberTransaction() {

    useEffect(() => {
        // Assuming jQuery is globally available
        var apiUrl = "https://cl-backend.kryptocoder.com/api/";

        function isLoggedIn() {
            return sessionStorage.getItem('memberData') !== null;
        }

        if (!isLoggedIn() && window.location.pathname === '/member-transaction') {
            window.location.href = '/';
        }

        document.querySelector('.sign-in-member')?.addEventListener('click', function (event) {
            event.preventDefault();
            updateMember();
        });

        function updateMember() {
            var formAccountNum = document.querySelector('.account-number')?.value;
            var formCardId = document.querySelector('.card-id')?.value;

            var inputData = JSON.stringify({
                "accountnumber": formAccountNum,
                "cardid": formCardId
            });

            console.log(inputData);

            $.ajax({
                type: 'POST',
                url: apiUrl + 'memberData',
                data: inputData,
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    console.log(data);

                    if (data.error) {
                        alert(data.error);
                    } else {
                        sessionStorage.setItem('memberData', JSON.stringify(data));
                        window.location.href = "/member-dashboard";
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Error: Try again");
                    console.log(errorThrown);
                    console.log(textStatus);
                    console.log(jqXHR);
                }
            });
        }

        document.querySelector('.log-out')?.addEventListener('click', function (event) {
            event.preventDefault();
            logout();
        });

        function logout() {
            sessionStorage.removeItem('memberData');
            window.location.href = '/';
        }

        var memberData = JSON.parse(sessionStorage.getItem('memberData'));
        if (memberData) {
            console.log(memberData);
            let nameElement = document.querySelector('.heading-1');
            let accountNumber = document.querySelector('.heading-2');
            let points = document.querySelector('.heading-3');

            if (nameElement && accountNumber && points) {
                nameElement.innerHTML = memberData.firstName + ' ' + memberData.lastName;
                accountNumber.innerHTML = memberData.accountNumber;
                points.innerHTML = memberData.points;

                let pointsAllocated = document.querySelector('.points-allocated-transactions');
                console.log(pointsAllocated);

                let transactionData = memberData.earnPointsResult;
                console.log(transactionData);

                let transactionHtmlContent = '<table>';
                transactionHtmlContent += '<tr><th>Time Stamp</th><th>Partner</th><th>Member</th><th>Points</th><th>Transaction ID</th></tr>';

                for (let i = 0; i < transactionData.length; i++) {
                    transactionHtmlContent += `<tr><td>${transactionData[i].timestamp}</td><td>${transactionData[i].partner}</td><td>${transactionData[i].member}</td><td>${transactionData[i].points}</td><td>${transactionData[i].transactionId}</td></tr>`;
                }

                transactionHtmlContent += '</table>';
                pointsAllocated.innerHTML = transactionHtmlContent;

                let pointsRedeemed = document.querySelector('.points-redeemed-transactions');
                console.log(pointsRedeemed);

                if (memberData && memberData.usePointsResults && memberData.usePointsResults.length > 0) {
                    let redeemData = memberData.usePointsResults;
                    console.log(redeemData);

                    let redeemHtmlContent = '<table>';
                    redeemHtmlContent += '<tr><th>Time Stamp</th><th>Partner</th><th>Member</th><th>Points</th><th>Transaction ID</th></tr>';

                    for (let i = 0; i < redeemData.length; i++) {
                        redeemHtmlContent += `<tr><td>${redeemData[i].timestamp}</td><td>${redeemData[i].partner}</td><td>${redeemData[i].member}</td><td>${redeemData[i].points}</td><td>${redeemData[i].transactionId}</td></tr>`;
                    }

                    redeemHtmlContent += '</table>';
                    pointsRedeemed.innerHTML = redeemHtmlContent;
                } else {
                    pointsRedeemed.innerHTML = '<p>No points redeemed</p>';
                }
            }
        }

    }, []); // Empty dependency array to run this effect only once on mount

    return (
        <div id="app-container" className="menu-default show-spinner">
            <MemberNavbar />
            <main>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <h1>Member Dashboard</h1>
                            <nav className="breadcrumb-container d-none d-sm-block d-lg-inline-block" aria-label="breadcrumb">
                                <ol className="breadcrumb pt-0">
                                    <li className="breadcrumb-item">
                                        <Link to="/member-dashboard">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link to="/redeem">Redeem</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/member-transaction">Transaction</Link>
                                    </li>
                                </ol>
                            </nav>
                            <div className="separator mb-5" />
                            <div className="row">
                                <div className="col-10">
                                    <div className="row icon-cards-row mb-4 sortable">
                                        <div className="col-md-3 col-lg-3 col-sm-4 col-6 mb-2">
                                            <div className="card">
                                                <div className="card-body text-center">
                                                    <i className="iconsminds-user" />
                                                    <p className="card-text font-weight-semibold mt-10 mb-0">User:</p>
                                                    <p className="lead text-center heading-1" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-sm-4 col-6 mb-2">
                                            <div className="card">
                                                <div className="card-body text-center">
                                                    <i className="iconsminds-id-card" />
                                                    <p className="card-text mb-0">Account ID:</p>
                                                    <p className="lead text-center heading-2" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-sm-4 col-6 mb-2">
                                            <div className="card">
                                                <div className="card-body text-center">
                                                    <i className="iconsminds-diamond" />
                                                    <p className="card-text mb-0">Points</p>
                                                    <p className="lead text-center heading-3" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-10 mb-4">
                    <div className="card mb-4">
                        <div id="smartWizardClickable">
                            <div className="card-body">
                                <div id="clickable1">
                                    <h4>Points Allocated</h4><br />
                                    <div className="points-allocated-transactions">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Time Stamp</th>
                                                    <th>Partner</th>
                                                    <th>Member</th>
                                                    <th>Points</th>
                                                    <th>Transaction ID</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div id="clickable2">
                                    <h4 className="pb-2 mt-5">Points Redeemed</h4><br />
                                    <div className="points-redeemed-transactions">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Time Stamp</th>
                                                    <th>Partner</th>
                                                    <th>Member</th>
                                                    <th>Points</th>
                                                    <th>Transaction ID</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
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

export default MemberTransaction;

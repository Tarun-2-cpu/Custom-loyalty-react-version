import React, { useState, useEffect } from 'react';
import '../css/body.css';
import PartnerNavbar from '../components/PartnerNavbar';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';

function Transaction() {
  const [partnerData, setPartnerData] = useState(null);

  useEffect(() => {
    // Retrieve partnerData from sessionStorage
    const data = JSON.parse(sessionStorage.getItem('partnerData'));
    if (data) {
      setPartnerData(data);
    }
  }, []);

  return (
    <>
      <PartnerNavbar />

      <main>
        <div className="container-fluid">
          <div className="col-12">
            <h1>Partner Dashboard</h1>
            <nav className="breadcrumb-container d-none d-sm-block d-lg-inline-block" aria-label="breadcrumb">
              <ol className="breadcrumb pt-0">
                <li className="breadcrumb-item">
                  <Link to="partner-dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="transaction">Transactions</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <Link to="add-offer">Offers</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="add-reward.html">Rewards</Link>
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
                        <p className="lead text-center heading-1">{partnerData?.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-lg-3 col-sm-4 col-6 mb-2">
                    <div className="card">
                      <div className="card-body text-center">
                        <i className="iconsminds-id-card" />
                        <p className="card-text mb-0">Account ID:</p>
                        <p className="lead text-center heading-2">{partnerData?.id}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 mb-4">
              <div className="card mb-4 col-11">
                <div id="smartWizardClickable">
                  {/* <ul className="card-header"> */}
                    {/* <li><Link to="#clickable1">Points Allocated</Link></li>
                    <li><Link to="#clickable2">Points Reedemed</Link></li> */}
                  {/* </ul> */}
                  <div className="card-body">
                    <div id="clickable1">
                      <h4 className="text-muted">Points Allocated Transactions</h4>
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
                            {partnerData?.earnPointsResults?.length > 0 ? (
                              partnerData.earnPointsResults.map((transaction, index) => (
                                <tr key={index}>
                                  <td>{transaction.timestamp}</td>
                                  <td>{transaction.partner}</td>
                                  <td>{transaction.member}</td>
                                  <td>{transaction.points}</td>
                                  <td>{transaction.transactionId}</td>
                                </tr>
                              ))
                            ) : (
                              <tr><td colSpan="5">No points allocated transactions</td></tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div id="clickable2">
                      <h4 className="text-muted">Points Reedemed Transactions</h4>
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
                            {partnerData?.usePointsResults?.length > 0 ? (
                              partnerData.usePointsResults.map((transaction, index) => (
                                <tr key={index}>
                                  <td>{transaction.timestamp}</td>
                                  <td>{transaction.partner}</td>
                                  <td>{transaction.member}</td>
                                  <td>{transaction.points}</td>
                                  <td>{transaction.transactionId}</td>
                                </tr>
                              ))
                            ) : (
                              <tr><td colSpan="5">No points redeemed transactions</td></tr>
                            )}
                          </tbody>
                        </table>
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

export default Transaction;

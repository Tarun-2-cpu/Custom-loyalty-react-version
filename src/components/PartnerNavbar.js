import React from 'react'
import '../css/Nav.css';
import { Link } from 'react-router-dom';

function PartnerNavbar() {
    return (
        <>
            <nav className="navbar fixed-top">
                <div className="d-flex align-items-center navbar-left">
                    <Link to="#" className="menu-button d-none d-md-block">
                        <svg className="main" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 17">
                            <rect x="0.48" y="0.5" width={7} height={1} />
                            <rect x="0.48" y="7.5" width={7} height={1} />
                            <rect x="0.48" y="15.5" width={7} height={1} />
                        </svg>
                        <svg className="sub" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 17">
                            <rect x="1.56" y="0.5" width={16} height={1} />
                            <rect x="1.56" y="7.5" width={16} height={1} />
                            <rect x="1.56" y="15.5" width={16} height={1} />
                        </svg>
                    </Link>
                    <Link to="#" className="menu-button-mobile d-xs-block d-sm-block d-md-none">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 17">
                            <rect x="0.5" y="0.5" width={25} height={1} />
                            <rect x="0.5" y="7.5" width={25} height={1} />
                            <rect x="0.5" y="15.5" width={25} height={1} />
                        </svg>
                    </Link>
                </div>
                <Link className="navbar-logo" href="Dashboard.Default.html">
                    <span className="logo d-none d-xs-block" />
                    <span className="logo-mobile d-block d-xs-none" />
                </Link>
                <div className="navbar-right">
                    <div className="header-icons d-inline-block align-middle">
                        <div className="d-none d-md-inline-block align-text-bottom mr-3">
                            <div className="custom-switch custom-switch-primary-inverse custom-switch-small pl-1" data-toggle="tooltip" data-placement="left" title="Dark Mode">
                                <input className="custom-switch-input" id="switchDark" type="checkbox" defaultChecked />
                                <label className="custom-switch-btn" htmlFor="switchDark" />
                            </div>
                        </div>
                        <button className="header-icon btn btn-empty d-none d-sm-inline-block" type="button" id="fullScreenButton">
                            <i className="simple-icon-size-fullscreen" />
                            <i className="simple-icon-size-actual" />
                        </button>
                    </div>
                    <div className="user d-inline-block">
                        <button className="btn btn-empty p-0" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="name">Sarah Kortney</span>
                            <span>
                                <img alt="Profile Picture" src="img/profiles/l-1.jpg" />
                            </span>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right mt-3">
                            <Link className="dropdown-item log-out">Sign out</Link>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="menu">
                <div className="main-menu">
                    <div className="scroll">
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/partner-dashboard">
                                    <i className="iconsminds-shop-4" />
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/transaction">
                                    <i className="iconsminds-bank" />
                                    <span>Transactions</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/add-offer">
                                    <i className="iconsminds-ribbon" />
                                    <span>Add Offer</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/add-reward">
                                    <i className="iconsminds-money-bag" />
                                    <span>Add Reward</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>

    )
}

export default PartnerNavbar;
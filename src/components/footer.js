import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
        <footer class="page-footer">
        <div class="footer-content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 col-sm-6">
                        <p class="mb-0 text-muted">ColoredStrategies 2019</p>
                    </div>
                    <div class="col-sm-6 d-none d-sm-block">
                        <ul class="breadcrumb pt-0 pr-0 float-right">
                            <li class="breadcrumb-item mb-0">
                                <Link to="#" class="btn-link">Review</Link>
                            </li>
                            <li class="breadcrumb-item mb-0">
                                <Link to="#" class="btn-link">Purchase</Link>
                            </li>
                            <li class="breadcrumb-item mb-0">
                                <Link to="#" class="btn-link">Docs</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    </>
  )
}

export default Footer;
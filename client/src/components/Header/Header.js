import React from "react";
import { useNavigate } from "react-router-dom";

// image
import logo from "../../images/logo_pu.png";


const Header = () => {
    const navigate = useNavigate();
    return (
        <nav className="navbar navbar-expand-lg  bg-light sticky-top shadow " id="mainNav">
            <div className="container px-4 py-1">

                <a className="m-1" href="/"><img src={logo} alt="" /></a>

                <a className="navbar-brand fw-bold fs-3" style={{ letterSpacing: 2 }} onClick={() => navigate("/")}> <span
                    style={{ color: "#44bb11" }}>Nutri</span>-Fit</a>

                <button className="navbar-toggler border border-white " type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                    aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse fw-semibold" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><a className="nav-link" onClick={() => navigate("/searchlogin")}>Nutrients</a></li>
                        <li className="nav-item"><a className="nav-link " onClick={() => navigate("/about")} >About</a></li>
                        <li className="nav-item"><a className="nav-link " onClick={() => navigate("/news")} >News</a></li>
                        <li className="nav-item"><a className="nav-link" onClick={() => navigate("/login")}>Login |</a>  </li>
                        <li className="nav-item ps-0 "><a className="nav-link" onClick={() => navigate("/register")}>Signup</a>  </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
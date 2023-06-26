import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import signup from "../../images/signup.png";

const Register = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        fName: "",
        lName: "",
        username: "",
        email: "",
        password: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    function handleClick() {
        if (user.fName && user.lName && user.username && user.email && user.password) {
            const mailformat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
            if (user.email.match(mailformat)) {
                axios.post("/register", user)
                    .then((res) => {
                        alert(res.data.message);
                        if (res.data.message === "Successully Registered, please login now") {
                            navigate("/login");
                        }
                    });
            } else {
                alert("You have entered an invalid email address!");
            }
        }
        else {
            alert("Invalid Input");
        }
    }



    return (
        <div className="p-3 mb-2  ">

            <div className="container">

                <div className="row  py-5 m-2 justify-content-md-center ">
                    <div className="col-sm-8">
                        <div className="row bxshdow rounded-3">
                            <div className="col-sm-6 p-5">
                                <img className="img-fluid" src={signup} alt="" />

                            </div>
                            <div className="col-sm-6  d-flex flex-column justify-content-center ">

                                <div className="justify-content-center align-items-center">
                                    <h2 className="fw-bold py-2 m-2 text-center">Sign Up</h2>
                                    {/* <form role="form"> */}
                                    <div className="form-group m-3">
                                        <input type="text" name="fName"
                                            className="form-control input-lg" placeholder="First Name " value={user.fName} onChange={handleChange} />
                                    </div>

                                    <div className="form-group m-3">
                                        <input type="text" name="lName"
                                            className="form-control input-lg" placeholder="Last Name " value={user.lName} onChange={handleChange} />
                                    </div>

                                    <div className="form-group m-3">
                                        <input type="text" name="username" id="username"
                                            className="form-control input-lg" placeholder="username" value={user.username} onChange={handleChange} />
                                    </div>

                                    <div className="form-group m-3">
                                        <input type="email" name="email"
                                            className="form-control input-lg" placeholder="email" value={user.email} onChange={handleChange} />
                                    </div>

                                    <div className="form-group m-3">
                                        <input type="password" name="password" id="password"
                                            className="form-control input-lg" placeholder="Password" value={user.password} onChange={handleChange} />
                                    </div>

                                    <div className="d-flex justify-content-center m-3">
                                        <button className="btn btn-primary rounded-5 grnbtn" onClick={handleClick}> SIGN UP </button>
                                    </div>

                                    <div className="text-center">
                                        <p>Already User ? <a className="blulink" onClick={() => navigate("/login")}>Sign In</a>  </p>
                                    </div>
                                    {/* </form> */}
                                </div>

                            </div>
                        </div>
                    </div>



                </div>



            </div>

        </div>
    );
}

export default Register;
import axios from "axios";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import login from "../../images/login.png";
import "./Login.css";

const Login = () => {
    
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    function handleChange(event) {
        const {name, value} = event.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    function handleClick() {
        axios.post("/login", user)
        .then(res => {
            alert(res.data.message);
            if(res.data.message === "login Successfull") {
                navigate("/search", {state: {username: user.username}});
            }
        });
    }

    return (
        <div className="p-3 mb-2  ">

            <div className="container">

                <div className="row  py-5 m-2 justify-content-md-center ">
                    <div className="col-sm-8">
                        <div className="row bxshdow rounded-3">
                            <div className="col-sm-6 p-5">
                                <img className="img-fluid" src={login} alt="" />

                            </div>
                            <div className="col-sm-6  d-flex flex-column justify-content-center ">

                                <div className="justify-content-center align-items-center">
                                    <h2 className="fw-bold py-2 m-2 text-center">Login</h2>
                                    <form role="form">
                                        <div className="form-group m-3">
                                            <input type="text" name="username" id="username"
                                                className="form-control input-lg" placeholder="username" onChange={handleChange} value={user.username} />
                                        </div>

                                        <div className="form-group m-3">
                                            <input type="password" name="password" id="password"
                                                className="form-control input-lg" placeholder="Password" onChange={handleChange} value={user.password} />
                                        </div>

                                        <div className="d-flex justify-content-center m-3">
                                            <button type="button" className="btn btn-primary rounded-5 grnbtn" onClick={handleClick}> Login </button>
                                        </div>

                                        <div className="text-center">
                                            <p>New User ? <a className="blulink" onClick={()=>navigate("/register")}>Sign Up</a></p>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>



                </div>



            </div>

        </div>
    );
}

export default Login;
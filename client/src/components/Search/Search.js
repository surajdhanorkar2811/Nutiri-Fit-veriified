import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Search.css";
import history from "../../images/history.png";
import apple from "../../images/apple.jpg";
import biryani from "../../images/biryani.jpg";
import poha from "../../images/poha.jpg";
import rice from "../../images/rice.jpg";
import orange from "../../images/orange.jpg";
import dosa from "../../images/dosa.jpg";
import chicken from "../../images/chicken.jpg";
import idli from "../../images/idli.jpg";

function Search() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const { state } = useLocation();
    const { username } = state;
    const [content, setContent] = useState({
        name: "",
        sugar: 0,
        carbohydrates: 0,
        cholesterol: 0,
        potassium: 0,
        protein: 0,
        sodium: 0,
        saturatedFat: 0,
        totalFat: 0,
        serving_size: 0
    });

    function handlChange(event) {
        setQuery(event.target.value);
    }

    function handleClick() {
        if (query === "") {
            alert("Error! Blank Search");
        }
        else {
            axios.post("/request", { query: query })
                .then(res => {
                    if (res.data.message === "Not found") {
                        alert("Not found!");
                    }
                    else {
                        const { name, calories, carbohydrates_total_g, cholesterol_mg, potassium_mg, protein_g, sodium_mg, fat_saturated_g, fat_total_g, sugar_g, serving_size_g } = res.data.result[0];
                        setContent({
                            name: name,
                            sugar: sugar_g,
                            carbohydrates: carbohydrates_total_g,
                            cholesterol: cholesterol_mg,
                            potassium: potassium_mg,
                            protein: protein_g,
                            sodium: sodium_mg,
                            saturatedFat: fat_saturated_g,
                            totalFat: fat_total_g,
                            serving_size: serving_size_g
                        });
                    }
                });
        }
    }

    function handleEatenClick() {
        if (content.name === "") {
            alert("Choose some food please!");
        }
        else {
            axios.post("/insert", { content: content, username: username })
                .then(res => {
                    alert(res.data.message);
                });
        }
    }

    function handleCommonClick(event) {
        axios.post("/insert2", { name: event.target.name, username: username })
            .then(res => {
                alert(res.data.message);
            });
    }


    return (
        <div className="p-3 mb-2  ">


            <div className="container">

                {/* <!-- search box star --> */}
                <div className="my-3 py-3 rounded-2" style={{ backgroundColor: 'rgb(240, 240, 240)' }}>
                    <h1 className="text-center ">Search food </h1>

                    <div className=" col-md-6 mx-auto ">
                        <div className="row no-gutters mt-3 align-items-center mx-auto">
                            <div className="col col-md-10">
                                <input className="form-control border-secondary rounded-pill pr-5" type="search"
                                    placeholder="search" id="example-search-input2" name="search" value={query} onChange={handlChange} />
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-outline-light text-dark border-0 rounded-pill ml-n5 "
                                    type="button" onClick={handleClick}>
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
                {/* <!-- search box end --> */}



                {/* <!-- item box start --> */}
                <div className="mt-3 py-1 rounded-2" style={{ backgroundColor: 'rgb(240, 240, 240)' }}>

                    <h5 className="m-3 fw-bold">Food Name: {content.name} ({content.serving_size}gm) </h5>

                    <div className="container my-5">
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            <div className="col">
                                <h5 className="fw-bold">Sugar : {content.sugar} g</h5>

                            </div>
                            <div className="col">
                                <h5 className="fw-bold">Carbohydrates : {content.carbohydrates} g </h5>

                            </div>
                            <div className="col">
                                <h5 className="fw-bold">Cholesterol : {content.cholesterol} mg</h5>

                            </div>
                            <div className="col">
                                <h5 className="fw-bold">Potassium : {content.potassium} mg </h5>

                            </div>
                            <div className="col">
                                <h5 className="fw-bold">Protein : {content.protein} g</h5>

                            </div>
                            <div className="col">
                                <h5 className="fw-bold">Sodium : {content.sodium} mg </h5>

                            </div>
                            <div className="col">
                                <h5 className="fw-bold">Saturated Fat : {content.saturatedFat} g </h5>

                            </div>
                            <div className="col">
                                <h5 className="fw-bold">Total Fat : {content.totalFat} g </h5>

                            </div>

                        </div>

                        <div className="d-flex justify-content-center mt-3">
                            <button type="button" className="btn btn-primary rounded-5 grnbtn" onClick={handleEatenClick}> Eaten </button>
                        </div>


                    </div>

                </div>
                {/* <!-- item box end --> */}


                {/* <!-- most searches start --> */}
                <div className="container text-center m-1">
                    <div className="row">
                        <div className="col-md-12 my-4">
                            <h6 className="fw-bold">Search</h6>
                            <h3 className="fw-bold">Commenly Search</h3>
                        </div>
                    </div>


                    {/* <!-- our value card start --> */}
                    <div className="row row-cols-1 row-cols-md-4 g-4">

                        <div className="col ">
                            <div className="card h-100 border-0 shadow valuecard">
                                <img src={apple} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Apple </h5>
                                    <div className="d-flex justify-content-center mt-3">
                                        <button type="button" className="btn btn-primary rounded-5 grnbtn" name="apple" onClick={handleCommonClick}> Eaten </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="col ">
                            <div className="card h-100 border-0 shadow valuecard ">
                                <img src={biryani} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Biryani </h5>
                                    <div className="d-flex justify-content-center mt-3">
                                        <button type="button" className="btn btn-primary rounded-5 grnbtn" name="biryani" onClick={handleCommonClick}> Eaten </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="col ">
                            <div className="card h-100 border-0 shadow valuecard">
                                <img src={poha} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Poha </h5>
                                    <div className="d-flex justify-content-center mt-3">
                                        <button type="button" className="btn btn-primary rounded-5 grnbtn" name="poha" onClick={handleCommonClick}> Eaten </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="col ">
                            <div className="card h-100 border-0 shadow valuecard">
                                <img src={rice} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Rice </h5>
                                    <div className="d-flex justify-content-center mt-3">
                                        <button type="button" className="btn btn-primary rounded-5 grnbtn" name="rice" onClick={handleCommonClick}> Eaten </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="col ">
                            <div className="card h-100 border-0 shadow valuecard">
                                <img src={orange} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Orange </h5>
                                    <div className="d-flex justify-content-center mt-3">
                                        <button type="button" className="btn btn-primary rounded-5 grnbtn" name="orange" onClick={handleCommonClick}> Eaten </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="col ">
                            <div className="card h-100 border-0 shadow valuecard">
                                <img src={dosa} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Dosa </h5>
                                    <div className="d-flex justify-content-center mt-3">
                                        <button type="button" className="btn btn-primary rounded-5 grnbtn" name="dosa" onClick={handleCommonClick}> Eaten </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="col ">
                            <div className="card h-100 border-0 shadow valuecard">
                                <img src={chicken} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Chicken </h5>
                                    <div className="d-flex justify-content-center mt-3">
                                        <button type="button" className="btn btn-primary rounded-5 grnbtn" name="chicken" onClick={handleCommonClick}> Eaten </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="col ">
                            <div className="card h-100 border-0 shadow valuecard">
                                <img src={idli} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Idli </h5>
                                    <div className="d-flex justify-content-center mt-3">
                                        <button type="button" className="btn btn-primary rounded-5 grnbtn" name="idle" onClick={handleCommonClick}> Eaten </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    {/* <!-- our value card end --> */}

                </div>
                {/* <!-- most searches end --> */}


                {/* <!-- tep box start --> */}
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <div className="floating-container" onClick={() => navigate("/account", { state: { username: username } })}>
                    <div className="floating-button"><img src={history} /></div>
                </div>
                {/* <!-- temp btn end --> */}




                {/* <!-- footer start --> */}
                <div className="container">
                    <div className="text-center mt-5 ">
                        <div className="copyright">
                            &copy; Copyright <strong><span>Web Squad'5'</span></strong>. All Rights Reserved
                        </div>
                    </div>
                </div>
                {/* <!-- footer end --> */}


            </div>

        </div>
    );
}

export default Search;
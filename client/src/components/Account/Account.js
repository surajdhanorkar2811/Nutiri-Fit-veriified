import React, {useState} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";

function Account() {

    const {state} = useLocation();
    const {username} = state;
    const [info, setInfo] = useState({
        name: "",
        surname: "",
        email: "",
        userName: "",
        fat_total: 0,
        fat_saturated: 0,
        protein: 0,
        sodium: 0,
        potassium: 0,
        carbohydrates_total: 0,
        fiber: 0,
        sugar: 0,
        cart: []
    });
    axios.post("/account", {username: username})
    .then(res => {
        const {
            cart, 
            name, surname, 
            email, 
            userName,
            fat_total,
            fat_saturated,
            protein,
            sodium,
            potassium,
            cholesterol,
            carbohydrates_total,
            fiber,
            sugar
        } = res.data;
        setInfo({
            cart,
            name,
            surname,
            email,
            userName,
            fat_total,
            fat_saturated,
            protein,
            sodium,
            potassium,
            cholesterol,
            carbohydrates_total,
            fiber,
            sugar
        });
    });

    // calories: Number,
//   serving_size_g: Number,
//   fat_total_g: Number,
//   fat_saturated_g: Number,
//   protein_g: Number,
//   sodium_mg: Number,
//   potassium_mg: Number,
//   cholesterol_mg: Number,
//   carbohydrates_total_g: Number,
//   fiber_g: Number,
//   sugar_g: Number,


    return (
        <div className="p-3 mb-2  ">

            <div className="container">

                {/* <!-- search box star --> */}
                <div className="my-3 py-3 rounded-2" style={{backgroundColor: 'rgb(240, 240, 240)'}}>
                    <h1 className="text-center ">Account Detail </h1>

                    <div className="container my-5">
                        <div className="row row-cols-1 row-cols-md-2 g-4 my-3">
                            <div className="col">
                                <h5 className="fw-bold">Name : {info.name} </h5>

                            </div>
                            <div className="col">
                                <h5 className="fw-bold">Surname : {info.surname} </h5>

                            </div>
                        </div>

                        <div className="row row-cols-1 row-cols-md-1 g-4">

                            <div className="col">
                                <h5 className="fw-bold">Email : {info.email} </h5>

                            </div>
                            <div className="col">
                                <h5 className="fw-bold">Username : {info.userName}  </h5>

                            </div>

                        </div>

                    </div>

                </div>
                {/* <!-- search box end --> */}


                {/* <!-- Total history start --> */}
                <div className="mt-3 py-1 rounded-2" style={{backgroundColor: 'rgb(240, 240, 240)'}}>

                    <h1 className="m-3  text-center">Total </h1>

                    <div className="container my-5">
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            <div className="col">
                                <h5 className="fw-bold">Sugar : {info.sugar.toFixed(2)} g</h5>

                            </div>
                            <div className="col">
                                <h5 className="fw-bold">Carbohydrates : {info.carbohydrates_total.toFixed(2)} g </h5>

                            </div>
                            <div className="col">
                                <h5 className="fw-bold">Cholesterol : {info.cholesterol} mg</h5>
                            </div>
                            <div className="col">
                                <h5 className="fw-bold">Potassium : {info.potassium.toFixed(2)} mg </h5>

                            </div>
                            <div className="col">
                                <h5 className="fw-bold">Protein : {info.protein.toFixed(2)} g</h5>

                            </div>
                            <div className="col">
                                <h5 className="fw-bold">Sodium : {info.sodium.toFixed(2)} mg </h5>

                            </div>
                            <div className="col">
                                <h5 className="fw-bold">Saturated Fat : {info.fat_saturated.toFixed(2)} g </h5>

                            </div>
                            <div className="col">
                                <h5 className="fw-bold">Total Fat : {info.fat_total.toFixed(2)} g </h5>

                            </div>

                        </div>

                    </div>

                </div>
                {/* <!-- Total History end --> */}


                {/* <!-- item box start --> */}
                <div className="my-3 py-3 rounded-2" style={{backgroundColor: 'rgb(240, 240, 240)'}}>
                    <h1 className="text-center ">History </h1>

                    <div className="container my-5">
                        <div className="row row-cols-1 row-cols-md-3 g-4">

                            {info.cart.map((item, i) => {
                                return (
                                    <div className="col ">
                                        <div className="card h-100 border-0 shadow valuecard">
                                            <div className="card-body">
                                                <h5 className="card-title">{item.name}</h5>
                                                <div className="container py-2">
                                                    <div className="row row-cols-1 row-cols-md-2 g-1">
                                                        <div className="col">
                                                            <h6 className="fw-bold">Sugar : {item.sugar_g} g</h6>
                            
                                                        </div>
                                                        <div className="col">
                                                            <h6 className="fw-bold">Carbohydrates : {item.carbohydrates_total_g} g </h6>
                            
                                                        </div>
                                                        <div className="col">
                                                            <h6 className="fw-bold">Cholesterol : {item.cholesterol_mg} mg</h6>
                            
                                                        </div>
                                                        <div className="col">
                                                            <h6 className="fw-bold">Potassium : {item.potassium_mg} mg </h6>
                            
                                                        </div>
                                                        <div className="col">
                                                            <h6 className="fw-bold">Protein : {item.protein_g} g</h6>
                            
                                                        </div>
                                                        <div className="col">
                                                            <h6 className="fw-bold">Sodium : {item.sodium_mg} mg </h6>
                            
                                                        </div>
                                                        <div className="col">
                                                            <h6 className="fw-bold">Saturated Fat : {item.fat_saturated_g} g </h6>
                            
                                                        </div>
                                                        <div className="col">
                                                            <h6 className="fw-bold">Total Fat : {item.fat_total_g} g </h6>
                                                        </div>
                                                </div>
                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </div>

                </div>
                {/* <!-- item box end --> */}


                




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

export default Account;
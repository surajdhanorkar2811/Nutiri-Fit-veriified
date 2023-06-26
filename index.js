const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const request = require('request');

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

let port = process.env.PORT;
if (port == null || port == "") {
    port = 9002;
}

mongoose.connect('mongodb://localhost:27017/Nutri-fit', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected");
});

const nutritionSchema = mongoose.Schema({
    name: String,
    calories: Number,
    serving_size_g: Number,
    fat_total_g: Number,
    fat_saturated_g: Number,
    protein_g: Number,
    sodium_mg: Number,
    potassium_mg: Number,
    cholesterol_mg: Number,
    carbohydrates_total_g: Number,
    fiber_g: Number,
    sugar_g: Number
});

const Nutri = new mongoose.model("Nutri", nutritionSchema);

const userSchema = mongoose.Schema({
    fName: String,
    lName: String,
    username: String,
    email: String,
    password: String,
    calories: Number,
    serving_size_g: Number,
    fat_total_g: Number,
    fat_saturated_g: Number,
    protein_g: Number,
    sodium_mg: Number,
    potassium_mg: Number,
    cholesterol_mg: Number,
    carbohydrates_total_g: Number,
    fiber_g: Number,
    sugar_g: Number,
    cart: [nutritionSchema]
});

const User = new mongoose.model("User", userSchema);

app.get("/", (req, res) => {
    res.send("Home");
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username: username }, (err, user) => {
        if (user) {
            if (user.password === password) {
                res.send({ message: "login Successfull", user: user });
            } else {
                res.send({ message: "password didn't match" });
            }
        } else {
            res.send("User not registered");
        }
    });
});

app.post("/register", (req, res) => {
    const { fName, lName, username, email, password } = req.body;
    User.findOne({ username: username }, (err, user) => {
        if (user) {
            res.send({ message: "User already Registerd" });
        } else {
            const user = new User({
                fName,
                lName,
                username,
                email,
                password,
                calories: 0,
                serving_size_g: 0,
                fat_total_g: 0,
                fat_saturated_g: 0,
                protein_g: 0,
                sodium_mg: 0,
                potassium_mg: 0,
                cholesterol_mg: 0,
                carbohydrates_total_g: 0,
                fiber_g: 0,
                sugar_g: 0,
                cart: []
            });
            user.save(err => {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ message: "Successully Registered, please login now" });
                }
            });
        }
    })
});


app.post("/request", (req, res) => {
    var query = req.body.query;
    if (query === "") {
        res.send({ message: "Error! Blank Search" });
    }
    else {
        request.get({
            url: 'https://api.api-ninjas.com/v1/nutrition?query=' + query,
            headers: {
                'X-Api-Key': 'wMwTo/lkOUWyRryGrar7GQ==6BYSFxmmdVweWKaz'
            },
        }, function (error, response, body) {
            if (error) return console.error('Request failed:', error);
            else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
            else {
                const result = JSON.parse(body);
                if (result.length === 0) {
                    res.send({ message: "Not found" });
                }
                else {
                    res.send({ result: result });
                }
            }
        });
    }
});


app.post("/insert", (req, res) => {
    const { content, username } = req.body;

    const nutri = new Nutri({
        name: content.name,
        calories: 0,
        serving_size_g: content.serving_size,
        fat_total_g: content.totalFat,
        fat_saturated_g: content.saturatedFat,
        protein_g: content.protein,
        sodium_mg: content.sodium,
        potassium_mg: content.potassium,
        cholesterol_mg: content.cholesterol,
        carbohydrates_total_g: content.carbohydrates,
        fiber_g: 0,
        sugar_g: content.sugar
    });

    User.findOne({ username: username }, function (err, foundUser) {
        if (err) {
            console.log("error in /insert");
        }
        else {
            foundUser.fat_total_g += content.totalFat;
            foundUser.fat_saturated_g += content.saturatedFat;
            foundUser.protein_g += content.protein;
            foundUser.sodium_mg += content.sodium;
            foundUser.potassium_mg += content.potassium;
            foundUser.cholesterol_mg += content.cholesterol;
            foundUser.carbohydrates_total_g += content.carbohydrates;
            foundUser.sugar_g += content.sugar;
            foundUser.cart.push(nutri);
            foundUser.save();
            res.send({ message: "Added" });
        }
    });

});

app.post("/insert2", (req, res) => {
    const { username } = req.body;

    var query = req.body.name;
    request.get({
        url: 'https://api.api-ninjas.com/v1/nutrition?query=' + query,
        headers: {
            'X-Api-Key': 'wMwTo/lkOUWyRryGrar7GQ==6BYSFxmmdVweWKaz'
        },
    }, function (error, response, body) {
        if (error) return console.error('Request failed:', error);
        else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
        else {
            const content2 = JSON.parse(body);
            const content = content2[0];
            const nutri = new Nutri({
                name: content.name,
                calories: 0,
                serving_size_g: content.serving_size_g,
                fat_total_g: content.fat_total_g,
                fat_saturated_g: content.fat_total_g,
                protein_g: content.protein_g,
                sodium_mg: content.sodium_mg,
                potassium_mg: content.potassium_mg,
                cholesterol_mg: content.cholesterol_mg,
                carbohydrates_total_g: content.carbohydrates_total_g,
                fiber_g: 0,
                sugar_g: content.sugar_g
            });
            User.findOne({ username: username }, function (err, foundUser) {
                if (err) {
                    console.log("error in /insert2 findOne");
                }
                else {
                    foundUser.fat_total_g += content.fat_total_g;
                    foundUser.fat_saturated_g += content.fat_total_g;
                    foundUser.protein_g += content.protein_g;
                    foundUser.sodium_mg += content.sodium_mg;
                    foundUser.potassium_mg += content.potassium_mg;
                    foundUser.cholesterol_mg += content.cholesterol_mg;
                    foundUser.carbohydrates_total_g += content.carbohydrates_total_g;
                    foundUser.sugar_g += content.sugar_g
                    foundUser.cart.push(nutri);
                    foundUser.save();
                    res.send({ message: "Added" });
                }
            });
        }
    });

});


app.post("/account", (req, res) => {
    const username = req.body.username;
    User.findOne({ username: username }, function (err, foundUser) {
        if (err) {
            console.log("error in /account");
        }
        else {
            res.send({
                cart: foundUser.cart, name: foundUser.fName, surname: foundUser.lName, email: foundUser.email, userName: foundUser.username, fat_total: foundUser.fat_total_g, fat_saturated: foundUser.fat_saturated_g,
                protein: foundUser.protein_g, sodium: foundUser.sodium_mg, potassium: foundUser.potassium_mg, cholesterol: foundUser.cholesterol_mg, carbohydrates_total: foundUser.carbohydrates_total_g, fiber: foundUser.fiber_g, sugar: foundUser.sugar_g
            });
        }
    });
});


if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname + "/client/build/index.html"));
    });
}

app.listen(port, function () {
    console.log("Server has started Successfully on " + port);
});
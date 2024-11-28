const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors")

const { infoLog, errorLog } = require("./Services/Logger");

// Routes
const StripeRoutes = require("./Routes/Stripe");
const RestaurantRoutes = require("./Routes/Restaurant");
const MenuRoutes = require("./Routes/Menu");

const app = express();
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://tabletechs.ca'
    ]
}))

const URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@table-techs.n9nc6.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority&appName=Table-Techs`;

mongoose.connect(URI)
    .then(() => {
        infoLog("MongoDB Connection Successfull!!");
    })
    .catch((error) => {
        errorLog("MongoDB Connection Failed!!", error);
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/stripe", StripeRoutes);
app.use("/api/restaurants", RestaurantRoutes);
app.use("/api/menu", MenuRoutes);

module.exports = app;
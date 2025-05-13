// Inillizing database with sample data

const mongoose = require("mongoose")
const initData = require('./data.js')
const Listing = require("../models/listing.js");
const { application } = require("express");

main()
    .then(() => {
        console.log("Connection Successful");  // Logs success if the connection works
    })
    .catch((err) => {
        console.log("Connection Error:", err);  // Logs any connection error
    });
async function main() {
    await mongoose.
    connect('mongodb://127.0.0.1:27017/wanderlust');  // Connects to the "test" database

}

const initDB = async () => {
    await Listing.deleteMany({}); // Deleting all the initial data then after we start inserting data
    initData.data=initData.data.map((obj)=>({...obj,owner:"681b682bffba20ddac7fdf5d"}))
    await Listing.insertMany(initData.data)
    console.log("data was initaillised")
}


initDB()
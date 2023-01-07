// import { Router, json } from "express";
// import data from "./static/data.json"
const express = require("express")
const db = require("./static/data.json")
const routes = express();

routes.use(express.json());
routes.use(express.urlencoded({ extended: false }));

routes.get('/data', (req, res) => {
    const result = db.restaurants.filter((d) => d.isActive);
    return res.send(result)
})

routes.post("/data", (req, res) => {
    const { name, address, category } = req.body;
    const items = db.restaurants;
    const id = items[items.length - 1].id + 1;
    db.restaurants.push({
        id: id,
        name: name,
        address: address,
        category: category,
        isActive: true
    });
    return res.status(200).json({
        message: "success"
    });
});

routes.get('/data/:id', (req, res) => {
    const { id } = req.params;
    const resto = db.restaurants.find((d) => d.id === +id);
    return res.status(200).json({
        result : resto
    });  
});

routes.put("/data/:id", (req, res) => {
    const { id } = req.params;
    const { name, address, category } = req.body;
    db.restaurants = db.restaurants.map((d) => {
        if (d.id === +id) {
            return {
                id: d.id,
                name: name,
                address: address,
                category: category,
                isActive: true
            }
        }
        return d;
    });
    return res.status(200).json({
        message: "success"
    });
});

//soft delete
routes.delete("/data/:id", (req, res) => {
    const { id } = req.params;
    db.restaurants = db.restaurants.map((d) => {
        console.log(d);
        if (d.id === +id) {
            return {
                ...d,
                isActive: false
            }
        }
        return d;
    });
    return res.status(200).json({
        message: "success"
    });
});

module.exports = routes;
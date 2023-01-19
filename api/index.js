// import { Router, json } from "express";
// import data from "./static/data.json"
const express = require("express")
const {resto_profile, resto_product} = require("../models/")
const routes = express();

routes.use(express.json());
routes.use(express.urlencoded({ extended: false }));

routes.get('/data', (req, res) => {
    const result = resto_profile.resto_profile.filter((d) => d.membership);
    return res.send(resto_profile)
})

routes.get("/data", (req, res) => {
    const { name_resto, address, products, price, category, } = req.body;
    const items = resto_profile.restaurants;
    const id = items[items.length - 1].id + 1;
    resto_profile.create({
        name_resto: name_resto,
        address: address,
        membership: true,
    }).then(resto_profile => {
        resto_product
          .create({
            id:resto_profile.id,
            products: products,
            price: price,
            category: category,
        })
    }).then(response => {
        res.status(200).json({
        message: "success"
        });
    }); 
});

routes.get('/data/:id', (req, res) => {
    const { id } = req.params;
    const resto = resto_profile.restaurants.find((d) => d.id === +id);
    return res.status(200).json({
        result : resto
    });  
});

routes.put("/data/:id", (req, res) => {
    const { id } = req.params;
    const { name_resto, address, products, price, category, } = req.body;
    resto_profile.restaurants = resto_profile.restaurants.map((d) => {
        if (d.id === +id) {
            return {
                id: id,
                name_resto: name_resto,
                address: address,
                membership: true,
                products: products,
                price: price,
                category: category
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
    resto_profile.restaurants = resto_profile.restaurants.map((d) => {
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
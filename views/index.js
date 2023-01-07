// import express from "express"
const express = require("express")
const routes = express.Router()
const { default: axios } = require("axios");

routes.use('/assets', express.static("./views/assets"));
routes.use(express.urlencoded({ extended: true }));

routes.get("/", async (req, res) => {
    const hasil = await axios({
        url: "http://localhost:3000/api/v1/data",
        method: "GET",
    });
    return res.render('home', {
        items : hasil.data
    })
})

routes.get("/add", async (req, res) => {
    return res.render("add", {
        onSubmit: () => {
            console.log("here");
        },
    });
});

routes.post("/add", async (req, res) => {
    const {name, address, category} = req.body;
        const resto = await axios({
            url: "http://localhost:3000/api/v1/data",
            method: "POST",
            data: {
                name,
                address,
                category
            },
        });
        return res.status(302).redirect('/')
    })

routes.get("/:id", async (req, res) => {
    const {id} =req.params;
    const hasil = await axios({
        url: `http://localhost:3000/api/v1/data/${id}`,
        method: "GET",
    });
    return res.render('detail', {
        items : hasil.data.result
    })
})

routes.get("/edit/:id", async (req, res) => {
    const { id } = req.params;
        const hasil = await axios({
            url: `http://localhost:3000/api/v1/data/${id}`,
            method: "GET",
        }); 
        return res.render('edit', {
            items : hasil.data.result
        })
});

routes.post("/edit/:id", async (req, res) => {
    const { id } = req.params;
    const { name, address, category } = req.body;
    const hasil = await axios({
        url: `http://localhost:3000/api/v1/data/${id}`,
        method: "PUT",
        data: {
            name: name,
            address: address,
            category: category
        }
    });
    return res.status(302).redirect("/");
});

routes.post("/:id", async (req, res) => {
    const { id } = req.params;
    const hasil = await axios({
        url: `http://localhost:3000/api/v1/data/${id}`,
        method: "DELETE",
    });
    return res.status(302).redirect("/");
});

module.exports = routes
// export default routes;
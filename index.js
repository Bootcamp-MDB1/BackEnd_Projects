// import  express  from "express";
// import api from './api/index.js';
// import views from './views/index.js'

const express = require("express")
const app = express();
const port = 3000
const api = require("./api/index.js")
const views = require("./views/index.js")
app.set("view engine", "ejs");

app.use("/", views);
app.use("/api/v1", api);

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});


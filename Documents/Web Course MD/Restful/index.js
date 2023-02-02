const express = require("express")
const data = require("./api/data.json")
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/api/v1/data", (req, res) => res.status(200).json(data))

app.get("/api/v1/data/:id", (req, res) => {
    const { id } = req.params;
    const resto = data.restaurants.find((d) => d.id === +id)
    res.status(200).json({restaurants : resto})
})


app.post("/api/v1/data", (req, res) =>{ 
    const {name, category } = req.body;
    const resto = data.restaurants
    const id = resto[resto.length -1].id +1;
    data.restaurants.push({
        id,
        name,
        category
    })
    res.status(201).json({
        restaurants: { 
            name, 
            category 
        }
    })
})

app.put("/api/v1/data/:id", (req, res) => {
    const { id } = req.params;
    const { name, category } = req.body;
    
    res.status(201).json({
        restaurants: {
            id : +id,
            name,
            category
        }
    });
});

app.delete("/api/v1/data/:id", (req, res) => {
        const { id } = req.params;
        data.restaurants = data.restaurants.filter((d) => d.id !== +id);
        console.log(data.restaurants);
        return res.status(200).json({
            message: `Data dengan id ${id} berhasil dihapus`
        });
    });



app.listen(3000, () => {
    console.log("Server Running on port 3000");
});   
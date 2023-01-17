
const express = require('express')
const app = express()
const port = 3000
const{resto_profile, resto_products} = require('./models')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/resto/create', (req, res)=>{
    resto_profile.create({
        nama_resto: "green_resto",
        alamat:"bogor"
    }).then(response => {
        res.json(response)
        console.log("data created", response);
    })
})

app.get('/resto/update', (req, res)=>{
  resto_profile.update({
      nama_resto: "blue_resto",
      alamat:"depok"
  }, {
    where: {
      id: 2
  }
  }).then(response => {
      res.json(response)
      console.log("data updated", response);
  })
})

app.get('/resto/:id', (req, res)=>{
  const {id} = req.params;
  resto_profile.findOne({
    where: {id}
  }).then(response => {
      res.json(response)
  })
})

app.get('/resto', (req, res)=>{
  const {id} = req.params;
  resto_profile.findAll({
  }).then(response => {
      res.json(response)
  })
})

app.get('/resto/:id/delete', (req, res)=>{
  const {id} = req.params;
  resto_profile.destroy({
    where: {id}
  }).then(response => {
      res.json(response)
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
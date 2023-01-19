// import  express  from "express";
// import api from './api/index.js';
// import views from './views/index.js'

// const express = require("express")
// const app = express();
// const port = 3000
// const api = require("./api/index.js")
// const views = require("./views/index.js")
// app.set("view engine", "ejs");

// app.use("/", views);
// app.use("/api/v1", api);

// app.listen(port, () => {
//     console.log(`Server running on ${port}`);
// });


// app.post("/add", (req, res) => {
//   const {
//     username,
//     password,
//     first_name,
//     last_name,
//     birthplace
//   } = req.body;
//   user_game
//     .create({
//       username,
//       password,
//       isSuperAdmin: false,
//     })
//     .then((user_game) => {
//       user_game_biodata
//         .create({
//           id_user: user_game.id,
//           first_name,
//           last_name,
//           birthplace,
//         })
//         .then((response) => {
//           res.redirect("/dashboard");
//         });
//     });
// });



const express = require("express");
const router = express.Router();
const {
  param,
  default: req
} = require("express/lib/request");
const {
  contentType,
  default: res,
  send,
  status,
} = require("express/lib/response");
// const ejsLint = require("ejs-lint");
const app = express();
const port = 3000;
// const data = require("./static/data-post.json");
const bodyParser = require("body-parser");
const {
  resto_profile
} = require("./models");
const {
  resto_product
} = require("./models");


app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(__dirname));
// app.use(express.static("website"));
// app.use("/images", express.static(__dirname + "/images"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

// app.get("/dashboard", (req, res) => {
//     res.render("dashboard.ejs");
//   });

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/detail/:id", (req, res) => {
  const { id } = req.params;
  resto_profile
    .findOne({
      where: {id},include: resto_product
    })
    .then((resto) => {
      res.render("detail.ejs", {
        resto,
      });
    });
  });


// app.post("/resto/:id/edit", (req, res) => {
//     const {
//     id
//     } = req.params;
//     const {
//         name_resto,
//         address,
//         products,
//         price,
//         category
//     } = req.body;
//     resto_profile
//       .update({
//         name_resto,
//         address,
//         membership: true,
//       }, {
//         where: {
//           id,
//         },
//       })
//       .then((response) => {
//         resto_product
//           .update({
//             products,
//             price,
//             category
//           }, {
//             where: {
//               id: id,
//             },
//           })
//           .then((response) => {
//             res.redirect("/detail");
//           });
//       });
//   });

app.get("/dashboard", (req, res) => {
  resto_profile
    .findAll({
      include: resto_product,
    })
    .then((resto) => {
      res.render("dashboard.ejs", {
        resto,
      });
    });
});

app.get("/edit/:id", (req, res) => {
  const {
    id
  } = req.params;
  resto_profile
    .findOne({
      where: {id,},
      include: resto_product,
    })
    .then((resto) => {
      res.render("edit.ejs", {
        resto,
      });
    });
});

app.post("/edit/:id", (req, res) => {
  const {
    id
  } = req.params;
  const {
        name,
        address,
        products,
        price,
        category
  } = req.body;
 resto_profile
    .update({
        name,
        address,
        membership: true,
    }, {
      where: {
        id,
      },
    })
    .then((response) => {
      resto_product
        .update({
            products,
            price,
            category
        }, {
          where: {
            id: id,
          },
        })
        .then((response) => {
          res.redirect("/dashboard");
        });
    });
});

// app.get("/delete/:id", (req, res) => {
//   const {id} = req.params;
//   resto_profile.destroy({
//     where: {id,},
//     include: resto_product,
//   });
//   res.redirect("/dashboard");
// });

app.get("/delete/:id", (req, res) => {
  const {
    id
  } = req.params;
  resto_profile.destroy({
    where: {id},
    // include: resto_product,
  }).then((response) => {
    resto_product.destroy({
        where: {id},
      })
      .then((response) => {
        res.redirect("/dashboard");
      })
    })
});

app.get("/add", (req, res) => {
    res.render("add.ejs");
  });

app.post("/add", (req, res) => {
  const {
        name,
        address,
        products,
        price,
        category
  } = req.body;
  resto_profile
    .create({
        name,
        address,
        membership: true,
    })
    .then((resto_profile) => {
      resto_product
        .create({
        id: resto_profile.id,
        products,
        price,
        category
        })
        .then((response) => {
          res.redirect("/dashboard");
        });
    });
});


app.post("/login", (req, res) => {
    const {
      username,
      password
    } = req.body;
    const isSuperAdmin = true;
    resto_profile
      .findOne({
        where: {
          username: username,
          password: password,
        },
      })
      .then((resto) => {
        if (user != null) {
          if (resto.isSuperAdmin) {
            res.redirect("/dashboard");
          } else {
            res.redirect("/detail");
          }
        } else {
          res.status(401).json({
            status: "Wrong Password or You're not yet registered ?",
          });
        }
      });
  });

app.post("/register", (req, res) => {
  res.status(200).json({
    status: "You are Registered... (see you in next chapter)",
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    status: "404 Page Not Founds",
  });
});

app.listen(port, () => {
  console.log(`Example App listening on port ${port}`);
});
//
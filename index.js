const express = require("express");
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
const app = express();
const port = 3000;
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

app.get("/", (req, res) => {
  res.render("home.ejs");
});

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

app.get("/delete/:id", (req, res) => {
  const {
    id
  } = req.params;
  resto_profile.destroy({
    where: {id},
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
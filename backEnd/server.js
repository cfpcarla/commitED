require("dotenv").config();
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const axios = require('axios');
const db = require('./lib/db.js');
const cookieSession = require("cookie-session");

const dbParams = db.dbParams;
console.log(dbParams);

app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"]
  })
);

//home
app.get("/api", (request, response) => {
  response.send("HEllO");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

//POST login
app.post("/api/login", (request, response) => {
  // check if user exists in database

  db.login(request.body.email)
    .then(data => {
      const user = data.rows[0];

      if (!user) {
        return response.status(403).json({ message: "Email cannot be found"});
      }

      // if password doesn't match
      if (!bcrypt.compareSync(request.body.password, user.password)) {
        return response.status(403).json({ message: "Wrong password" });
      }

      // if everything is good
      request.session.user_id = user.id;
      response.json({ user });
    })
    .catch(err => {
      // render login with error
      response.status(500).json({ error: err.message });
    });
});

//POST LOGOUT
app.post("/api/logout", (request, response) => {
  request.session.user_id = null;
  response.redirect("/");
});

//POST Register
app.post("/api/register", (request, response) => {
  const email = request.body.email;
  const password = request.body.password;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  if (email === "" || password === "") {
    response.status(400).json({ message: "Missing email or password" });
    return;
  }



    // //get to  all posts opp
    // app.get('/posts', (request, response) => {
    //   db.query(
    //           `SELECT * FROM  opportunities;

    //           `).then(({ rows: posts }) => {
    //             response.json(posts);
    //           }).catch(error=> console.log(error));
    //         })

  //get latitude and longitude from the database
   // Axios GET for take latitude and longitude from the database and display in the map
    app.get('/map',(request, response)=>{
      db.query(`SELECT id, latitude, longitude
      FROM users
      WHERE latitude = $1 AND
      WHERE longitude = $2;`,[lat, lng])
      .then(data => {
        const newUser = data.rows[0];
        // eslint-disable-next-line camelcase
        request.session.user_id = newUser.id;
        response.statusCode = 200;
        response.json({ user: user });
      });
    }
  console.log({ body: request.body })
  db.getEmail(request.body.email)
    .then(data => {
      console.log({ data });
      const user = data.rows[0];
      if (user) {
        return response.status(400).json({ message: "Email already registered" });
      }

      const apiKey = process.env.GOOGLEAPIKEY;
      return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${request.body.address}&key=${apiKey}`);
    })
    .then(function(locationResponse) {
      console.log("gmap response", locationResponse.data);
      const { lat, lng } = locationResponse.data.results[0].geometry.location;
      return db.createUser(request.body.name, request.body.address, request.body.phone,request.body.email, hashedPassword, request.body.type, lat, lng);
    })
    .then(data => {
      const newUser = data.rows[0];
      // eslint-disable-next-line camelcase
      request.session.user_id = newUser.id;
      response.statusCode = 200;
      response.end(`success. user: ${newUser}`);
      return true;
    })
    .catch(function(error) {
      console.log({ error });

      // if (error === "done") {
      //   return;
      // }
      response.status(500).json({ error });
    });
});

app.get("/api/posts", (request, response) => {
  db.showPosts()
    .then(({ rows: posts }) => {
      response.json(posts);
    })
    .catch(error => console.log(error));
});

app.post("/api/posts/new", (request, response) => {
  db.createPost(
    request.body.type,
    request.body.description,
    request.body.title,
    request.body.date_posted,
    request.body.user_id,
    request.body.address,
    request.body.longitude,
    request.body.latitude
  )
    .then(({ rows: newPosts }) => {})
    .catch(error => console.log(error));
});

app.post("/api/requests/new", (request, response) => {
  db.createRequest(
    request.body.opportunity_id,
    request.body.user_id,
    request.body.status
  )
    .then(({ rows: newRequests }) => {
      response.json(newRequests);
    })
    .catch(error => console.log(error));
});

app.get("/api/requests", (request, response) => {
  db.showRequests(request.body.user.id, request.body.opportunity.id)
    .then(({ rows: requests }) => {
      response.json(requests);
    })
    .catch(error => console.log(error));
});

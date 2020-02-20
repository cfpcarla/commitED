require('dotenv').config();
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

const dbParams = db.dbParams;
console.log(dbParams)
// REMOVE THIS WHEN EVERYTHING IS IN db.js
const db = new Pool(dbParams);
db.connect();
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.use(cors())

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

//home
app.get('/', (request, response) => {
  response.send("HEllO");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

//POST login
app.post('/login', (request, response) => {
  // check if user exists in database
  db.query(`SELECT id, email, password, latitude, longitude
  FROM users
  WHERE email = $1;`, [request.body.email])
  .then(data => {
    const user = data.rows[0];
    if (!user) {
      response.statusCode = 403;
      response.end('403 Forbidden. E-mail cannot be found');
    } else if (!bcrypt.compareSync(request.body.password, user.password)) {
      response.statusCode = 403;
      response.end('403 Forbidden. Wrong password');
    } else {
      // eslint-disable-next-line camelcase
      request.session.user_id = user.id;
      response.statusCode = 200;
      response.json({ user: user });
    }
  })
  .catch(err => {
    // render login with error
    console.log(err)
    response
    .status(500)
    .json({ error: err.message });
  });
});

//POST LOGOUT
app.post('/logout', (request, response) => {
  request.session.user_id = null;
  response.redirect('/');
});

//POST Register
app.post('/register', (request, response) => {
  const email = request.body.email;
  const password = request.body.password;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  if (email === '' || password === '') {
    response.statusCode = 400;
    response.end('400 Bad request. Missing email or password');
    return;
  }
  db.query(`SELECT email
  FROM users
  WHERE email = $1;`, [request.body.email])
  .then(data => {
    const user = data.rows[0];
    if (user) {
      response.statusCode = 400;
      response.end('400 Bad request. Email already registered');
    } else {
      const apiKey = process.env.GOOGLEAPIKEY;
      return axios({
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${request.body.address}&key=${apiKey}`,
        responseType: 'json'
      })
      .then(function (locationResponse) {
        console.log("gmap response", locationResponse.data);
        const { lat, lng } = locationResponse.data.results[0].geometry.location;
        const temporaryType = "volunteer" // Kill this and use request.body.type when implemented in the frontend
        return db.query(`INSERT INTO users(name, address, phone_number, email, password, type,latitude, longitude) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;`,
        [request.body.name, request.body.address, request.body.phone, request.body.email, hashedPassword, temporaryType, lat, lng])
        .then(data => {
          const newUser = data.rows[0];
          // eslint-disable-next-line camelcase
          request.session.user_id = newUser.id;
          response.statusCode = 200;
          response.json({ user: user });
        });
      })
      .catch(function (error) {
        response.statusCode = 500;
        console.log(error)
        response.end("error")
      })
    }
  });
});

//get to  all posts app
app.get('/posts', (request, response) => {
db.showPosts.then(({ rows: posts }) => {
      response.json(posts);
    }).catch(error=> console.log(error));
  })


  //Post/new
  app.post('/posts/new',(request, response)=>{

   db.createPost(request.body.type,request.body.description, request.body.title, request.body.date_posted, request.body.user_id, request.body.address, request.body.longitude, request.body.latitude)
    .then(({ rows: newPosts }) => {
  }).catch(error=> console.log(error));
  })

    // //get to  all posts opp
    // app.get('/posts', (request, response) => {
    //   db.query(
    //           `SELECT * FROM  opportunities;

    //           `).then(({ rows: posts }) => {
    //             response.json(posts);
    //           }).catch(error=> console.log(error));
    //         })

  //get latitude and longitude from the database
    Axios GET for take latitude and longitude from the database and display in the map
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

  app.post('/requests/new',(request, response)=>{
  db.createRequest(request.body.opportunity_id,request.body.user_id, request.body.status).then(({ rows: newRequests }) => {
    response.json(newRequests);
  }).catch(error=> console.log(error)); })



app.get('/requests', (request, response) => {
  db.showRequests(request.body.user.id, request.body.opportunity.id).then(({ rows: requests }) => {
            response.json(requests);
          }).catch(error=> console.log(error));
        })


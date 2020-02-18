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

console.log(dbParams)
const db = new Pool(dbParams);
db.connect();
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

//Axios Api take the latitude and longitude
const axios = require('axios');


// Configure CORS to accepts requests from any client
// In the future I should use the corsOptions to accept requests only from my client, but it is not working.
// CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
// const corsOptions = {
//   origin: 'http://localhost:3002/'
// }

app.use(cors())

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

//home
app.get('/', (request, response) => {
  response.send("I'm alive");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

//POST login
app.post('/login', (request, response) => {
  console.log(request.body)
  db.query(`SELECT id, email, password
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
        response.statusCode = 200;
        response.end(`success. user: ${user}`);
      }
      response.json({ user });
    })
    .catch(err => {
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
        const apiKey = "AIzaSyACFwxULqY968mB9R8JtWb0e1Pgex3s6Vw"
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${request.body.address}&key=${apiKey}`

        axios.get(url, {

        })
          .then(function (locationResponse) {
            console.log(locationResponse.data.results[0])
            const { lat, lng } = locationResponse.data.results[0].geometry.location;
            db.query(`INSERT INTO users(name, address, phone, email, password, latitude, longitude) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *;`,
              [request.body.name, request.body.address, request.body.phone, request.body.email, hashedPassword, lat, lng])
              .then(data => {
                const newUser = data.rows[0];
                // eslint-disable-next-line camelcase
                request.session.user_id = newUser.id;
                response.statusCode = 200;
                response.end(`success. user: ${user}`);
              });
          })
          .catch(function (error) {
            response.end("error")
          })
      }

    });
});


//why???
//get to  all posts opp
app.get('/posts', (request, response) => {
  db.query(
          `SELECT * FROM  opportunities;

          `).then(({ rows: posts }) => {
            response.json(posts);
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



// server.post('/login', passport.authenticate('local'), (req, res, next) => {
//   if (req.user) {
//       let redir = { redirect: "/" };
//       return res.json(redir);
// } else {
//       let redir = { redirect: '/login'};
//       return res.json(redir);
// }
// })

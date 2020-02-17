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
  response.send("xunda");
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
    .catch (err => {
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
        db.query(`INSERT INTO users(name, address, phone, email, password) VALUES($1,$2,$3,$4,$5) RETURNING *;`,
          [request.body.name,request.body.address, request.body.phone, request.body.email, hashedPassword])
          .then(data => {
            const newUser = data.rows[0];
            // eslint-disable-next-line camelcase
            request.session.user_id = newUser.id;
            response.statusCode = 200;
            response.end(`success. user: ${user}`);
          });
      }
    });
});








// server.post('/login', passport.authenticate('local'), (req, res, next) => {
//   if (req.user) {
//       let redir = { redirect: "/" };
//       return res.json(redir);
// } else {
//       let redir = { redirect: '/login'};
//       return res.json(redir);
// }
// })

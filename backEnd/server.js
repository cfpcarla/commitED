require("dotenv").config();
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieSession = require("cookie-session");
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const axios = require("axios");
const db = require("./lib/db.js");
const nodemailer = require("nodemailer");
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
        //error component
        return response.status(403).json({ message: "Email cannot be found" });
      }
      // if password doesn't match
      if (!bcrypt.compareSync(request.body.password, user.password)) {
        return response.status(403).json({ message: "Wrong password" });
      }
      request.session.user_id = user.id
      console.log({ login: user })
      // if everything is good
      response.json({ user });
    })
    .catch(err => {
      // render login with error
      response.status(500).json({ error: err.message });
    });
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
    db.getEmail(request.body.email).then(data => {
      console.log({ data });
      const user = data.rows[0];
      if (user) {
        return response.status(400).json({ message: "Email already registered" });
      } else {
        const apiKey = process.env.GOOGLEAPIKEY;
        return axios({
          method: "get",
          url: `https://maps.googleapis.com/maps/api/geocode/json?address=${request.body.address}&key=${apiKey}`,
          responseType: "json"
        })
        .then(function(locationResponse) {
          const {
            lat,
            lng
          } = locationResponse.data.results[0].geometry.location;
          db.createUser(
            request.body.name,
            request.body.address,
            request.body.phone,
            request.body.email,
            hashedPassword,
            request.body.type,
            lat,
            lng
            ).then(data => {
              const newUser = data.rows[0];
              // eslint-disable-next-line camelcase
              request.session.user_id = newUser.id;
              response.json({ user: newUser });
              return true;
            });
          })
          .catch(function(error) {
            console.log({ error });
            response.status(500).json({ error });
          });
        }
      });
    });
    //APP GET
    app.get("/api/posts", (request, response) => {
      db.showPosts()
      .then(({ rows: posts }) => {
        response.json(posts);
      })
      .catch((error) => {
        console.log(error)
      });
    });
    //APP POST
    app.post("/api/posts/new", (request, response) => {
      const apiKey = process.env.GOOGLEAPIKEY;
      axios({
        method: "get",
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${request.body.address}&key=${apiKey}`,
        responseType: "json"
      }).then((locationResponse) => {
        console.log("gmap response", locationResponse.data);
        const { lat, lng } = locationResponse.data.results[0].geometry.location;
        db.createPost(
          request.body.type,
          request.body.description,
          request.body.title,
          request.body.date_posted,
          request.body.user_id,
          request.body.address,
          lng,
          lat
          )
          .then(({ rows: newPosts }) => {
            response.json(newPosts);
          })
          .catch(error => console.log(error));
        });
      });
      //APP POST
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
        //APP GET
        app.get("/api/requests", (request, response) => {
          db.showRequests(request.body.user.id, request.body.opportunity.id)
          .then(({ rows: requests }) => {
            response.json(requests);
          })
          .catch(error => console.log(error));
        });
        // //get to  all posts opp
        // app.get('/posts', (request, response) => {
        //   db.query(
        //           `SELECT * FROM  opportunities;
        //           `).then(({ rows: posts }) => {
        //             response.json(posts);
        //           }).catch(error=> console.log(error));
        //         })
// get latitude and longitude of a user from the database
app.get("/api/user/:userId/get-lat-and-lng", (request, response) => {
  db.getUserLatAndLng(request.params.userId)
  .then(({ rows: getLatAndLng }) => {
    console.log(getLatAndLng);
    response.json(getLatAndLng);
  })
  .catch(error => {
    console.log(error);
  });
});
app.get("/api/opportunities/get-lat-and-lng", (request, response) => {
  db.getOpportunityLatAndLng()
  .then(({ rows }) => {
    response.json({rows: rows});
  })
  .catch(error => {
    console.log(error)
  });
});
// Delete post
app.delete('/api/posts/:postId/delete', (request, response) => {
  const postId = request.params.postId;
  const userId = request.body.userId;
  db.deleteOpportunities(userId, postId)
  .then (({ rows }) => {
    response.json({rows: rows});
  })
  .catch(error => {
    console.log(error);
  });
});
// Edit
app.put('/api/posts/:postId/update', (request, response) => {
  const apiKey = process.env.GOOGLEAPIKEY;
  axios({
    method: "get",
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${request.body.data.address}&key=${apiKey}`,
    responseType: "json"
  }).then((locationResponse) => {
    const { lat, lng } = locationResponse.data.results[0].geometry.location;
    db.updateOpportunity ({
      address: request.body.data.address,
      id: request.params.postId,
      description: request.body.data.description,
      title: request.body.data.title,
      type: request.body.data.type,
      longitude: lng,
      latitude: lat,
      user_id: request.body.data.user_id
    }).then(({ rows: newPosts }) => {
      response.json(newPosts);
    })
    .catch(error => console.log(error));
  });
});
//Mailer code
const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '64a8a2cb2a86f1',
    pass: 'ba3d08d50f5b68'
  }
});
app.post("/api/message/:id", (req, res) => {

  db.getEmailOfOpportunityOwner(req.params.id).then(data => {
    db.getUserInfoFromId(req.body.from.id).then((userData) => {
      const message = {
        from: userData.rows[0].email,
        to: data.rows[0].email,
        subject: 'test',
        text: `${userData.rows[0].name} is applying for this position. Please contact ${userData.rows[0].name} by ${userData.rows[0].phone_number} or by ${userData.rows[0].email}`
      };

      transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
          res.send("ok");
        }
      });
    });
  }).catch(error => {
    console.log(error);
    res.status(400).send(JSON.stringify(error));
  });
});

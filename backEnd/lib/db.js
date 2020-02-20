const { Pool } = require('pg');

let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}
//create queries here and assign them to functions

const db = new Pool(dbParams);
db.connect();

const createRequest = (opportunity_id, user_id, status) => {
  return db.query(
    `INSERT INTO requests(opportunity_id, user_id, status) VALUES($1,$2, $3) RETURNING *;`,
    [opportunity_id, user_id, status])//user.id //props.id==> opportunity id;
};

const showRequests = (user_id, opportunity_id) =>{
return  db.query(
  `SELECT * FROM requests WHERE user_id = $1 AND opportunity_id = $2`,
[user_id ,opportunity_id])
}

const createPost = (type,description, title, date_posted, user_id, address, longitude, latitude) => {
  return db.query(`INSERT INTO opportunities(type, description, title, date_posted, user_id, address,longitude, latitude) VALUES($1,$2,$3,to_timestamp($4),$5,$6,$7,$8) RETURNING *;`,
  [type,description, title, date_posted, user_id, address, longitude, latitude]
  )
}

const showPosts = () =>{
  return db.query(
    `SELECT * FROM  opportunities;

    `)
}
const login = (email) => {
 return db.query(`SELECT id, email, password
      FROM users
      WHERE email = $1;`, [email])
}
const getEmail = (email) =>{
  return db.query(`SELECT email
  FROM users
  WHERE email = $1;`, [email])
}
const createUser = (name, address, phone,email, hashedPassword, type, lat, lng) => {
 return  db.query(`INSERT INTO users(name, address, phone_number, email, password, type,latitude, longitude) VALUES($1,$2,$3,$4,$5,$6,$7, $8) RETURNING *;`,
        [name, address, phone,email, hashedPassword, type, lat, lng])
}
module.exports = { dbParams, createRequest, showRequests, createPost, showPosts,login, getEmail, createUser };

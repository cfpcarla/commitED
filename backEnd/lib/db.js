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
    `SELECT * FROM opportunities;`)
}
const login = (email) => {
 return db.query(`SELECT id, email, password, type
      FROM users
      WHERE email = $1;`, [email])
}
const getEmail = (email) =>{
  return db.query(`SELECT email
  FROM users
  WHERE email = $1;`, [email])
}
const createUser = (name, address, phone,email, hashedPassword, type, lat, lng) => {
 return  db.query(`INSERT INTO users(name, address, phone_number, email, password, type,latitude, longitude) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;`,
        [name, address, phone,email, hashedPassword, type, lat, lng])
}
const getUserLatAndLng = (userId) => {
  return db.query(`SELECT latitude, longitude
                    FROM users
                    WHERE id = $1;`, [userId])
}
const getOpportunityLatAndLng = () => {
  return db.query(`SELECT id, latitude, longitude
                    FROM opportunities`)
}
const updateOpportunity = ({id, type, description, title, address, longitude, latitude, user_id}) =>{
  return db.query(`
    UPDATE
      opportunities
    SET
      type = $1,
      description = $2,
      title = $3,
      address = $4,
      longitude = $5,
      latitude = $6
    WHERE
      user_id = $7 AND
      id = $8
    RETURNING *;`,
    [type, description, title, address, longitude, latitude, user_id, id]
    )
  }
const deleteOpportunities = (user_id, opportunity_id) =>{
  return db.query(`
    DELETE FROM
      opportunities
    WHERE
      user_id = $1
    AND
      id = $2
    `, [user_id, opportunity_id])
}
const getEmailOfOpportunityOwner = (user_id) => {
  return db.query(`
  SELECT * FROM opportunities
  JOIN users ON users.id = opportunities.user_id WHERE opportunities.user_id = $1`,[user_id]);
};

const getUserInfoFromId = (id) => {
  return db.query(`SELECT *
       FROM users
       WHERE id = $1;`, [id]);
};
module.exports = { dbParams, createRequest, showRequests, createPost, showPosts,login, getEmail, createUser, getUserLatAndLng, getOpportunityLatAndLng, updateOpportunity, deleteOpportunities, getEmailOfOpportunityOwner,getUserInfoFromId };


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

/* const db = knex({
  // connect to your own database here:
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'david',
    password : '',
    database : 'smart-brain'
  }
}); */

//MiddleWare
app.use(bodyParser.json());
app.use(cors());

/* app.get('/', (req, res)=> {res.send('it\'s working now')})
 */
app.get('/', (req, res)=> { res.send(db.users) });

app.post('/signin', (res, req) => {signin.handleSignin(res, req, db, bcrypt)});

app.post('/register', (res, req) => {register.handleRegister(res, req, bcrypt, db)});

app.get('/profile/:id', (res, req) => {profile.handleProfile(res, req, db)});

app.put('/image', (res, req) => {image.handleImage(res, req, db)});

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})
//
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT}!`);
});



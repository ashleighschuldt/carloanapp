const express =  require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');

const auth = require('./server/controller/authorization');


require('dotenv').config();

const app = express();

massive(process.env.CONNECTION_STRING)
    .then((db) => {
        console.log('db is running');
        app.set('db', db)
    })
    .catch( err => {
        console.log(err)
    })

app.use(cors());
app.use(bodyParser.json());

app.use(session({
    name: 'carLoanApp',
    secret: process.env.SESSION_SECRET,
    cookie: {
        expires: 5*24*60*60*1000
    }
}))

app.post(`/api/auth/login`, auth.login);
app.post(`/api/auth/register`, auth.register);

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log('this port is awesome', port)
});
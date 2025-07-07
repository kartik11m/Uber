const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const captainRoutes = require('./routes/captain.routes');

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

// ✅ Test route to verify body parsing
// app.post('/test', (req, res) => {
//   console.log('TEST BODY:', req.body);
//   res.json({ received: req.body });
// });

app.get('/',(req,res) =>{
    res.send('Hello world');
});

app.use('/users' , userRoutes);
app.use('/captains', captainRoutes);

module.exports = app;
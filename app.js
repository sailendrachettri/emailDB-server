const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// require('dotenv').config({path: ['.env.dev', '.env']}); // for development
require('dotenv').config(); // for production
require('./database');
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));

const PORT = process.env.PORT || 8000

app.use('/api/auth/user', require('./routes/auth.routes'));
app.use('/api/post/email', require('./routes/email.routes'));

app.listen(PORT, ()=>{
    console.log("Listining at port ", PORT);
})
const express = require('express');
require('dotenv').config({path: ['.env.dev', '.env']});
require('./database');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000

app.use('/api/auth/user', require('./routes/auth.routes'));
app.use('/api/post/email', require('./routes/email.routes'));

app.listen(PORT, ()=>{
    console.log("Listining at port ", PORT);
})
const PORT = 4000
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

//Initializing express
const app = express();

//Initializing the server
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));

app.get('/', (req, res) => {
    res.json('Welcome to the Simple API');
});
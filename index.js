const PORT = 4000
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

//Initializing express
const app = express();

const articles =[];

//Initializing the server
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));

app.get('/', (req, res) => {
    res.json('Welcome to the Simple API');
});

app.get('/feed', (req, res) => {
    axios.get('https://www.uol.com.br').then((response) => {
        const html = response.data;
        console.log(html);
        const $ = cheerio.load(html);

        $('a:contains("Bolsonaro")', html).each(function () {
            const title = $(this).text();
            const url = $(this).attr('href');
            articles.push({
                title,
                url
            });    
        
        });
        res.json(articles);
    }).catch((err) => console.log(err));
    
});
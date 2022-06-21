const PORT = 8000
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
//const scrap = require('./scrapping');
const cors = require('cors');

//Initializing express
const app = express();

app.use(cors());

const sources = [

    {
        name: 'Uol',
        url: 'https://www.uol.com.br'
    },
    {
        name: 'G1',
        url: 'http://www.G1.com.br'
    },
    
]

/*
sources.forEach(async source => {    
    axios.get(source.url).then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            console.log("entered");
    
            $('a:contains("bolsonaro")', html).each(function () {
                
                const title = $(this).text();
                const url = $(this).attr('href');
                
                articles.push({
                    title,
                    url,
                    source: source.name,
                });

                
                
            });
        }).catch(err => {
            console.log(err);
        });
        console.log(articles)
        
    });
*/


//Initializing the server
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));

app.get('/', (req, res) => {
    res.json('Welcome to the Simple API');
});



//criando uma rota /feed para realizar webscrapping no portal do uol buscando por noticias que contenham Bolsonaro no titulo
app.get('/feed/:id', async (req, res) => {
    const articles = [];
    await sources.forEach(source => {  
        const id = req.params.id;  
        axios.get(source.url).then(response => {
                const html = response.data;
                const $ = cheerio.load(html);
                
                $(`a:contains("${id}")`, html).each(function () {
                    console.log("entered");
                    const title = $(this).text();
                    const url = $(this).attr('href');
   
                    
                    articles.push({
                        title,
                        url,
                        source: source.name,
                    });
                    //console.log(articles)
    
                    
                    
                });
            }).catch(err => {
                console.log(err);
            });
            
            
            
        });
        console.log(articles)

        res.json(articles);
});
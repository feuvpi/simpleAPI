const axios = require('axios');
const cheerio = require('cheerio');


//lista fontes para webscrapping
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

const articles = [];

//criando uma constante para armazenar as informações encontradas



module.exports = function scrap(keyword) {
    
    sources.forEach(async source => {    
    axios.get(source.url).then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
           
            console.log(typeof keyword);
            console.log(`The key word is "${keyword}"`);
    
            $(`a:contains("${keyword}")`, html).each(function () {
                console.log("entered");
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
        //console.log(articles)
        
    });

}





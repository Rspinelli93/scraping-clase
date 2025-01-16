const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const PORT = 3000;

const url = 'https://carlosdiazgirol.github.io/dashboard/'

app.get('/', (req, res) => {
   axios.get(url).then((response) => {
    if (response.status === 200) {
        const html = response.data
        const $ = cheerio.load(html)

        const pageTitle = $('title').text()

        const links = []
        const imgs = []

        $('a').each((index, element) => {
            const link = $(element).attr('href')
            links.push(link)

        
        })
        
        $('img').each((index, element) => {
            const img = $(element).attr('src')
            imgs.push(img)
        })

        res.send(`
              <h1>${pageTitle}</h1>
              <h3>Enlaces</h3>
              <ul>
                ${links.map(link => `<li>${link}</li>`).join('')}
              </ul>
              <h3>Imagenes</h3>
              <ul>
                ${imgs.map(img => `<li><img src="${url}${img}"></li>`).join('')}
              </ul>
            `)
    }
   })
})

app.listen(PORT, () => {
    console.log(`Server is listening in http://localhost:${PORT}`)
})
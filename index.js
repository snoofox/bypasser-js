const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/bypass', (req, res) => {
    const url = req.body.url;
    axios.get(url)
        .then((response) => {
            const $ = cheerio.load(response.data);
            const script = $('script').text();
            const pattern = /link:\s+'(https?:\/\/\S+)'/;
            const result = pattern.exec(script);
            res.send(result[1]);
        })
        .catch((error) => {
            res.send(error.data);
        });
})

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
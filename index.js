const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('index', { messageToDisplay: "HEY WELCOME TO PUG" });
});

async function getCard(cardName) {
    const req = await fetch(`https://api.lorcana-api.com/strict/${cardName}`)
    const res = await req.json()
    return res;
}

app.post('/card', async(req, res) => {
    console.log(req.body)
    const card = await getCard(req.body.cardName)
    console.log(card)
    res.send("Looking For Card")
})

app.listen("8080", () => {
    console.log('Server running at http://localhost:8080/')
})
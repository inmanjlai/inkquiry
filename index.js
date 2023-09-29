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

    // getting all cards using Lorcana API using the search query from the user
    const cards = await getCard(req.body.cardName)
    
    // create an empty list of cards
    const allCards = [];

    // for each card returned from the API, we're adding it to our empty list
    for(let card in cards) {
        allCards.push(cards[card])
    }

    // return the cards template, passing in the allCards list to display the cards
    res.render("cards", { cards: allCards, title: `Search Results for ${req.body.cardName}`})
})

app.listen("8080", () => {
    console.log('Server running at http://localhost:8080/')
})
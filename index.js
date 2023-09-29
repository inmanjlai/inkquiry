const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/public", express.static('public'))

app.get('/', async(req, res) => {
    // make an api request to fetch /lists/sets
    const setsFromAPI = await fetch(`https://api.lorcana-api.com/lists/sets`)
    const setsJson = await setsFromAPI.json()

    const allSets = []
    for(let set of setsJson) {

        let data = {
            name: Object.keys(set)[0],
            code: Object.values(set)[0]['set-code']
        }
        allSets.push(data)
    }
    res.render('index', { sets: allSets });
});

async function getCard(cardName) {
    const req = await fetch(`https://api.lorcana-api.com/strict/${cardName.toLowerCase()}`)
    const res = await req.json()
    return res;
}

app.post('/cards', async(req, res) => {
    // getting all cards using Lorcana API using the search query from the user
    const cards = await getCard(req.body.cardName)
    
    // create an empty list of cards
    const allCards = [];

    // for each card returned from the API, we're adding it to our empty list
    for(let card in cards) {
        allCards.push(cards[card])
    }

    // return the cards template, passing in the allCards list to display the cards
    res.render("cards", { 
        cards: allCards, 
        title: `Search results for "${req.body.cardName}"`
    })
})

app.get('/sets/:code', async(req, res) => {
    const setCode = req.params.code;

    const cardsInSetReq = await fetch(`https://api.lorcana-api.com/search?set-code=${setCode}`)
    const cardsInSetJson = await cardsInSetReq.json()

    let queryString = ""
    for(let [idx, card] of cardsInSetJson.entries()) {
        if (idx == cardsInSetJson.length - 1) queryString += card
        else queryString += `${card};`
    }

    const cardsFromAPI = await fetch(`https://api.lorcana-api.com/strict/${queryString}`)
    const cardsFromAPIJson = await cardsFromAPI.json()

    res.render('cards', { cards: cardsFromAPIJson, title: `All cards from ${setCode}` })
})

app.listen("8080", () => {
    console.log('Server running at http://localhost:8080/')
})
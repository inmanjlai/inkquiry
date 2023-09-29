const express = require('express');
const app = express();

app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index', { messageToDisplay: "HEY WELCOME TO PUG" });
});

app.get('/card', (req, res) => {
    res.render('card', { card: {name: "Mickey Mouse", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat." } })
})

app.listen("8080", () => {
    console.log('Server running at http://localhost:8080/')
})
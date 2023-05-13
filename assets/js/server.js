// dependencies
const express = require('express');
const path = require('path');

// setting up app
const app = express()
const PORT = process.env.PORT || 3001;

// allow app to data parse
app.use(express.urlencoded({ extended: true }));

// parse
app.use(express.json());

// telling html to look in assets folder
app.use(express.static(path.join(__dirname + './assets/db' )));

app.listen(PORT, function(){
    console.log('listening on 3001')
});
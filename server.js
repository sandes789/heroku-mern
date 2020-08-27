const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')

const items = require('./route/api/items')

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

const db = require('./config/keys.js').mongoURI;

const config = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

// COnnect to MOngo
mongoose
    .connect(db, config)
    .then(() => console.log('Mongoos Connected...'))
    .catch(err => console.log(err))

// Use Routes
app.use('/api/items', items)


if (process.env.NODE_ENV === 'production') {
    // Set a static folder
    app.use(express.static(path.join(__dirname, "client/build")))

    // Send all requests in build index
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
    });

    console.log("Sent file to build index.html")
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Started on port ${port}`));


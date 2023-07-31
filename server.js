const express = require('express')
const app = express()

app.listen(3000, () => {
    console.log('node api is running on port 3000');
})

// Routes
app.get('/', (req, res) => {
    res.send('hello node api');
})

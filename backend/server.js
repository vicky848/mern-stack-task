const express = require('express')
const apiRoutes = require('./api');

const app = express()
const mongoose = require('mongoose')

app.use('/api', apiRoutes);


mongoose.connect("mongodb://localhost:27017/mydatabase")


const db = mongoose.connection 
db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.once('open',() =>{
    console.log('Connected to mongoDB')
})

const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
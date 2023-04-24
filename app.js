const express = require("express")
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')

app.use(cors({
    origin: "*"
}))

app.use(bodyParser.json({ limit: '20mb' }))
app.use(express.json())

const calendarRoutes = require('./routes/calanderRoutes')
// app.use('/', (req, res) => {
//     return res.status(200).send(`<h1 style="color:blue;padding: 70px 0;
//     border: 3px solid green;
//     text-align: center;" >Welcome to LMS Node Server (version ${1})</h1>`)

//     // return res.status(200).send(`Welcome to LMS Node Server (version ${VERSION})`)
// })
app.use('/api', calendarRoutes)

module.exports = app
const express = require('express')
const bodyParser = require('body-parser')
require('./db/mongoose')
const itemRouter = require('./routers/item')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')

app.use(express.json())
app.use(itemRouter)
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
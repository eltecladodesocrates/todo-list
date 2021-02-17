const express = require('express')
const bodyParser = require('body-parser')
const getDate = require('../utils/date')

const app = express()
const port = process.env.PORT || 3000

const items = ['Buy Food', 'Cook Food', 'Eat Food'] 
const workItems = []

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

app.get('/', (req, res) => {

    const day = getDate()
    res.render('list', {
        listTitle: day,
        items
    })

})

app.get('/work', (req, res) => {
    res.render('list', {
        listTitle: 'Work List',
        items: workItems
    })
})

app.post('/', (req, res) => {

    const item = req.body.newItem

    if (req.body.list === 'Work') {
        workItems.push(item)
        res.redirect('/work')
    } else {
        items.push(item)
        res.redirect('/')
    }
    
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
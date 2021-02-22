const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

mongoose.connect('mongodb://localhost:27017/todolistDB', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

const itemsSchema = {
    name: String
}

const Item = mongoose.model('Item', itemsSchema)

const item1 = new Item({
    name: 'Go to work'
})
const item2 = new Item({
    name: 'Make lunch'
})
const item3 = new Item({
    name: 'Eat lunch'
})

const defaultItems = [item1, item2, item3]

app.get('/', async (req, res) => {

    const items = await Item.find()
    if (items.length === 0) {
        Item.insertMany(defaultItems, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Items succesfully saved in the database');
                
            }
        })
        res.redirect('/')
    } else {
        res.render('list', {
            listTitle: 'Today',
            items
        })
    }

})

app.get('/work', (req, res) => {
    res.render('list', {
        listTitle: 'Work List',
        items: workItems
    })
})

app.post('/', (req, res) => {

    const item = new Item({
        name: req.body.newItem
    })
    item.save()
    res.redirect('/')

})

app.post('/delete', async (req, res) => {
    const item = await Item.findByIdAndDelete({
        _id: req.body.checkbox
    })
    console.log(`The task ${item.name} has been removed`);
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
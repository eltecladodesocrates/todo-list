const express = require('express')
const bodyParser = require('body-parser')
const Item = require('../models/item')
const router = new express.Router()

router.use(bodyParser.urlencoded({extended:true}))

router.get('/', async (req, res) => {

    const items = await Item.find()
    res.render('list', {
        listTitle: 'Today',
        items
    })

})

router.post('/', async (req, res) => {

    const item = new Item({
        name: req.body.newItem
    })
    await item.save()
    res.redirect('/')

})

router.post('/delete', async (req, res) => {
    const item = await Item.findByIdAndDelete({
        _id: req.body.checkbox
    })
    console.log(`The task ${item.name} has been removed`);
    res.redirect('/')
})

module.exports = router


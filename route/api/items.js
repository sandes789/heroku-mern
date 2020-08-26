const express = require('express')
const router = express.Router();

// Item Model
const Item = require('../../modals/Item')

// @route GET api/items
// @desc Create a Item
// @access Public
//  sort by date ( 1 or -1'for descending' )

router.get('/', async (req, res) => {
    const result = await Item.find()
        .sort({ date: -1 })
        res.json(result)
})


// @route POST api/items
// @desc Create a Item
// @access Public
// .save -> save to database and it is promise base so .then

router.post('/', async (req, res) => {
    const newItem = await new Item(req.body);
    newItem.save();
    res.json(newItem)
})

// Route POST api/items
// desc Delete a Item
// access Public

router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
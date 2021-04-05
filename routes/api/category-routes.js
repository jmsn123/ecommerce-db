const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
    // find all categories
    // be sure to include its associated Products
    Category.findAll({
        include: {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
    }).then(cat => {
        // no cat found
        if (!cat) {
            res.status(404).json({ message: "No Categories Found" })
            return;
        }
        res.json(cat)
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

router.get('/:id', (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    Category.findOne({
        where: { id: req.params.id },
        include: {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
    }).then(cat => {
        if (!cat) {
            res.status(404).status({ message: "no cat found " })
            return;
        }
        res.json(cat)
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

router.post('/', (req, res) => {
    // create a new category
    Category.create({
            category_name: req.body.category_name
        })
        .then(cat => res.json(cat))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    // update a category by its `id` value
    Category.update({
            category_name: req.body.category_name
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(cat => {
            if (!cat) {
                res.status(404).json({ message: 'No category with this id' });
                return;
            }
            res.json(cat);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    // delete a category by its `id` value
    Category.destroy({
        where: { id: req.params.id }
    }).then(cat => {
        if (!cat) {
            res.status(404).json({ message: "cant find category" })

        }
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

module.exports = router;
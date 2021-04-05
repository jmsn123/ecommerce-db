const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
    // find all tags
    // be sure to include its associated Product data
    Tag.findAll({
            include: { model: Product }
        }).then(tag => res.json(tag))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
});

router.get('/:id', (req, res) => {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    Tag.findOne({ where: { id: req.params.id } }, {
            include: { model: Product }
        }).then(tag => res.json(tag))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })

});

router.post('/', (req, res) => {
    // create a new tag
    Tag.Create({ tag_name: req.body.tag_name }).then(tag => res.json(tag))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
});

router.put('/:id', (req, res) => {
    // update a tag's name by its `id` value
    Tag.update({ tag_name: req.body.tag_name }, {
        where: { id: req.params.id }
    }).then(tag => {

            if (!tag) {
                res.status(404).json({ message: "noTage found" })
            }
            res.json(tag)
        }

    ).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

router.delete('/:id', (req, res) => {
    // delete on tag by its `id` value
    router.delete('/:id', (req, res) => {
        Tag.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(tag => {
                if (!tag) {
                    res.status(404).json({ message: 'No Tag found by that ID.' });
                    return;
                }
                res.json(tag);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    });
});

module.exports = router;
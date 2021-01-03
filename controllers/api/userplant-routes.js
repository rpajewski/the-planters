const router = require('express').Router();
const { User, Plant, Room, Userplant, Home } = require('../../models');
const withAuth = require('../../utils/auth');

// get all userplants /api/plants
router.get('/', (req, res) => {
    Userplant.findAll({
        attributes: ['id', 'plant_id', 'user_id'],
        include: [
            {
                model: Home,
                attributes: ['id', 'home_name', 'user_id']
            },
            {
                model: Plant,
                attributes: [ 
                    'id',
                    'common_name',
                    'scientific_name',
                    'image_url',
                    'description',
                    'care_level',
                    'toxicity',
                    'water'
                ]
            },
        ]
    })
        .then(dbPlantData => res.json(dbPlantData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get one userplant /api/userplants/1
router.get('/:id', (req, res) => {
    Userplant.findOne({
        attributes: ['id', 'plant_id', 'user_id'],
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Home,
                attributes: ['id', 'home_name', 'user_id']
            },
            {
                model: Plant,
                attributes: [ 
                    'id',
                    'common_name',
                    'scientific_name',
                    'image_url',
                    'description',
                    'care_level',
                    'toxicity',
                    'water'
                ]
            },

        ]
    })
        .then(dbUserPlantData => {
            if (!dbUserPlantData) {
                res.status(404).json({ message: 'No userplant found with this ID' });
                return;
            }
            res.json(dbUserPlantData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// create userplant  /api/userplants
router.post('/', (req, res) => {
    // expects {common_name: ''}
    Userplant.create({
        plant_id: req.body.plant_id,
        user_id: req.session.user_id
    })
        .then(dbUserPlantData => res.json(dbUserPlantData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
});

// update a userplant info /api/userplants/1
router.put('/:id', withAuth, (req, res) => {
    Userplant.update(req.body,
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbUserPlantData => {
            if (!dbUserPlantData) {
                res.status(404).json({ message: 'No userplant found with this id!' });
                return;
            }
            res.json(dbUserPlantData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

// delete userplant  /api/userplants/1
router.delete('/:id', withAuth, (req, res) => {
    Userplant.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserPlantData => {
            if (!dbUserPlantData) {
                res.status(404).json({ message: 'No userplant found with this id!' });
                return;
            }
            res.json(dbUserPlantData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router
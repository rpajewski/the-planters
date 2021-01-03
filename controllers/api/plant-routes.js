const router = require('express').Router();
const { User, Plant, Room } = require('../../models');
const withAuth = require('../../utils/auth');

// get all plants /api/plants
router.get('/', (req, res) => {
    Plant.findAll({
        attributes: [
            'id',
            'common_name',
            'scientific_name',
            'image_url',
            'description',
            'care_level',
            'toxicity',
            'water',
            'filters'
        ]
    })
        .then(dbPlantData => res.json(dbPlantData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get one plant /api/plants/1
router.get('/:id', (req, res) => {
    Plant.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'common_name',
            'scientific_name',
            'image_url',
            'description',
            'care_level',
            'toxicity',
            'water',
            'filters'
        ],
        // include: [
            // {
            //     model: Room,
            //     attributes: [
            //         'id',
            //         'room_name'
            //     ]
            // },
        //     {
        //         model: User,
        //         attributes: ['username']
        //     }
        // ]
    })
        .then(dbPlantData => {
            if (!dbPlantData) {
                res.status(404).json({ message: 'No plant found with this id!' });
                return;
            }
            res.json(dbPlantData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

// create plant  /api/plants
router.post('/', withAuth, (req, res) => {
    // expects {common_name: 'Elephant's Ear', scientifict_name: 'Alocasia', image_url: 'https://www.ourhouseplants.com/imgs-content/Alocasia-leaves.jpg', description: 'description paragraph', care_level: 'difficult', toxicity: 1, water: 'daily'}
    Plant.create({
        common_name: req.body.common_name,
        scientific_name: req.body.scientific_name,
        image_url: req.body.image_url,
        description: req.body.description,
        care_level: req.body.care_level,
        toxicity: req.body.toxicity,
        water: req.body.water,
        filters: req.body.filters,
        user_id: req.session.user_id
    })
        .then(dbPlantData => res.json(dbPlantData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
});

// update plant  /api/plants/1
router.put('/:id', withAuth, (req, res) => {
    Plant.update(req.body, 
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPlantData => {
            if (!dbPlantData) {
                res.status(404).json({ message: 'No plant found with this id!' });
                return;
            }
            res.json(dbPlantData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// delete plant  /api/plants/1
router.delete('/:id', withAuth, (req, res) => {
    Plant.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPlantData => {
            if (!dbPlantData) {
                res.status(404).json({ message: 'No plant found with this id!' });
                return;
            }
            res.json(dbPlantData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
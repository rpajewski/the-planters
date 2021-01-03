const router = require('express').Router()
const { User, Home, Room, Plant, Userplant } = require('../models')

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
        ],
    })
    .then(dbPlantData => {
        // serialize the data
        const randomPlantsArray = [];
        const data = dbPlantData.map(plant => plant.get({ plain: true }));

        // randomize 5 plants to display
        for (let i = 0; i < 6; i++) {
            let randomNumber = Math.floor(data.length * Math.random());

            let randomPlants = data.splice(randomNumber, 1);
            randomPlantsArray.push(randomPlants);
        }
        const plants = randomPlantsArray.flat(1)
        // console.log(plants)
        res.render('homepage', {
            plants,
            data,
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/')
        return
    }
  
    res.render('login')
});

// review a single plant
router.get('/plants/:id', (req, res) => {
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
        ]
    })
    .then(dbPlantData => {
        if (!dbPlantData) {
            res.status(404).json({ message: 'No plant found with this id!' })
            return
        }
        
        const plant = dbPlantData.get({ plain: true })
        res.render('single-plant', {
            plant,
            loggedIn: req.session.loggedIn
        })
    })
})

module.exports = router

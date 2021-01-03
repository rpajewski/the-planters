const router = require('express').Router();
const { User, Plant, Room, Userplant, Home } = require('../../models');
const withAuth = require('../../utils/auth');

// get all homes /api/homes
router.get('/', (req, res) => {
    Home.findAll({
        attributes: ['id', 'home_name', 'user_id'],
        include: [
            {
                model: Userplant,
                attributes: [
                    'id', 'plant_id', 'user_id'
                ],
                include: [
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
                    }
                ]
                
            }
        ]
    })
        .then(dbPlantData => res.json(dbPlantData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get one home /api/homes/1
router.get('/:id', withAuth, (req, res) => {
    Home.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'home_name', 'user_id'],
        include: [
            {
                model: Userplant,
                attributes: [
                    'id', 'plant_id', 'user_id'
                ],
                include: [
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
                    }
                ]
                
            }
        ]
    })
        .then(dbHomeData => {
            if (!dbHomeData) {
                res.status(404).json({ message: 'No homefound with this ID' });
                return;
            }
            res.json(dbHomeData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create homes  /api/homes
router.post('/', withAuth, (req, res) => {
    Home.create({
        home_name: req.body.home_name,
        user_id: req.session.user_id
    })
        .then(dbHomeData => res.json(dbHomeData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
});

// update home info /api/homes/1
router.put('/:id', withAuth, (req, res) => {
    Home.update(req.body,
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbHomeData => {
            if (!dbHomeData) {
                res.status(404).json({ message: 'No home found with this id!' });
                return;
            }
            res.json(dbHomeData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

// delete a home  /api/home/1
router.delete('/:id', withAuth, (req, res) => {
    Home.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbHomeData => {
            if (!dbHomeData) {
                res.status(404).json({ message: 'No home found with this id!' });
                return;
            }
            res.json(dbHomeData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
const router = require('express').Router()
const { User, Plant, Room, Userplant, Home } = require('../../models')

// get users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] },
        include: [
            {
                model: Home,
                attributes: ['id', 'home_name', 'user_id'],
            },
            {
                model: Room,
                attributes: ['id', 'room_name']
            },
            {
                model: Userplant,
                attributes: ['id', 'plant_id', 'user_id'],
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
                            'water',
                            'filters'
                        ]
                    }
                ]
            },
        ]
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// get one users
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Home,
                attributes: ['id', 'home_name', 'user_id'],
            },
            {
                model: Room,
                attributes: ['id', 'room_name']
            },
            {
                model: Userplant,
                attributes: ['id', 'plant_id', 'user_id'],
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
            },
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this ID' })
            return
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// create new user
router.post('/', (req, res) => {
    // expects { username: 'newUser', password: 'eightLetterPass' }
    User.create(req.body)
    .then(dbUserData => {
        // session variables
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData)
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// login validation 
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user with that username!'})
            return
        }
        const validPass = dbUserData.checkPassword(req.body.password)

        if (!validPass) {
            res.status(404).json({ message: 'Invalid password'})
            return
        }
        // session variables
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in!'})
        })
    })
})

// update user
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id'})
            return
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// delete user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id'})
            return
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// logout route
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end()
    }
})

module.exports = router
const User = require('./User');
const Plant = require('./Plant');
const Room = require('./Room');
const Home = require('./Home');
const Userplant = require('./Userplant')

// may incorporate at later date
// const Light = require('./Light');

// associations

// Home
Home.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Home.hasMany(Room, {
    foreignKey: 'room_id'
});

Home.hasMany(Userplant, {
    foreignKey: 'user_id'
});

// Room
Room.belongsTo(Home, {
    foreignKey: 'home_id',
    onDelete: 'SET NULL'
});

Room.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Room.hasMany(Plant, {
    foreignKey: 'room_id'
});

Room.hasMany(Userplant, {
    foreignKey: 'user_id'
});

// User
User.hasMany(Plant, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

User.hasOne(Home, {
    foreignKey: 'user_id'
});

User.hasMany(Room, {
    foreignKey: 'user_id'
});

User.hasMany(Userplant, {
    foreignKey: 'user_id'
});

// Plant
Plant.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// Plant.belongsTo(User, {
//     through: Userplant,
//     as: 'owned_plants',
//     foreignKey: 'user_id'
// });

Plant.belongsTo(Home, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Plant.belongsTo(Room, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});


// Userplant associations
Userplant.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Userplant.belongsTo(Plant, {
    foreignKey: 'plant_id',
    onDelete: 'SET NULL'
});

Userplant.belongsTo(Home, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Userplant.belongsTo(Room, {
    foreignKey: 'room_id',
    onDelete: 'SET NULL'
});

Room.belongsTo(Userplant, {
    foreignKey: 'user_id'
})

module.exports = { User, Plant, Room, Home, Userplant };
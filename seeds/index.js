// const seedUsers = require('./user-seeds');
const seedPlants = require('./plant-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('-----------');

    await seedPlants();
    console.log('-----------');
    process.exit(0);
};

seedAll();
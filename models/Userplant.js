const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Userplant extends Model {}

Userplant.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        plant_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'plant',
                key: 'id'
            } 
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        // home_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'home',
        //         key: 'id'
        //     }
        // },
        // room_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'room',
        //         key: 'id'
        //     }
        // }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscore: true,
        modelName: 'userplant'
    }
);

module.exports = Userplant;
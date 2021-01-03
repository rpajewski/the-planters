const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

// plantModel
class Plant extends Model {}

Plant.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        common_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        scientific_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        description:{
            type: DataTypes.STRING(2000),
            allowNull: false
        },
        care_level: {
            type: DataTypes.STRING,
            allowNull: false
        },
        toxicity: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        // May incorporate later 
        // light_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'light',
        //         key: 'id'
        //     }
        // },
        water: {
            type: DataTypes.STRING,
            allowNull: false
        },
        filters: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscore: true,
        modelName: 'plant'
    }
)

module.exports = Plant;
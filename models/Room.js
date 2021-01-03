const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

// room Model
class Room extends Model {

}

Room.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        room_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // ****May incorporate later****
        // light_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // }
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
        modelName: 'room'
    }
)

module.exports = Room;
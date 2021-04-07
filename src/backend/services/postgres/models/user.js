'use strict'
module.exports = (sequelize, DataTypes) => {
    var user = sequelize.define(
        'user',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING(100)
            },
            sex: {
                allowNull: true,
                type: DataTypes.INTEGER
            },
            pic: {
                allowNull: true,
                type: DataTypes.STRING(300)
            },

        },
        {
            timestamps: false
        }
    )

    return user
}

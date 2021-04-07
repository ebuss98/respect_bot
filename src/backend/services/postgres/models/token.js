'use strict'
module.exports = (sequelize, DataTypes) => {
	var tokens = sequelize.define(
		'tokens',
		{
			guid: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.STRING(50)
			},
			token: {
				allowNull: false,
				type: DataTypes.STRING(200)
			},
			userId: {
				allowNull: false,
				type: DataTypes.INTEGER
			}
		},
		{
			timestamps: false
		}
	)

	return tokens
}

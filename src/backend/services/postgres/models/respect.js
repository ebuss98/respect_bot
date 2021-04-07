'use strict'
module.exports = (sequelize, DataTypes) => {
	var respect = sequelize.define(
		'respect',
		{
			userId: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			respectedUserId: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			respect: {
				allowNull: false,
				type: DataTypes.INTEGER
			},
			dateTime: {
				type: DataTypes.BIGINT(15),
				primaryKey: true,
				allowNull: false
			},
			type: {
				type: DataTypes.STRING(10),
				allowNull: false,
				defaultValue: 'normal'
			} //возможные: normal, init
		},
		{
			timestamps: false,
			indexes: [
				{
					fields: ['userId', 'respectedUserId']
				},
				{
					fields: ['respectedUserId']
				},
				{
					fields: ['userId', 'respectedUserId', 'type']
				}
			]
		}
	)
	respect.associate = function(models) {
		respect.belongsTo(models.user, {
			foreignKey: 'respectedUserId'
		});
	};
	return respect
}

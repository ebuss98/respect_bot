'use strict'
// модель = таблица в бд. Их по образу и подобию этой складываем в папку и все. Больше нихуя делать не надо
// миграции пока игнорим
module.exports = (sequelize, DataTypes) => {
	var account = sequelize.define(
		'testdata',
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			text: {
				type: DataTypes.STRING(100),
				defaultValue: '999'
			},
			bool: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
				allowNull: false
			},
			details: {
				type: DataTypes.JSONB,
				defaultValue: {},
				allowNull: true
			}
		},
		{
			timestamps: false
		}
	)

	return account
}

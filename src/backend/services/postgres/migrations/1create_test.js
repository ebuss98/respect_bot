'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('test', {
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
		})
	},
	down: (queryInterface) => {
		return queryInterface.dropTable('test')
	}
}

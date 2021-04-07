// с таблицами попроюуем уебанскую архитектуру которую я придумал за 15 секунд
// для каждой таблчки своя папка
// в индексе пишем дефортные удаления и вставки, и ипортируем сюда более сложные запросы, различные выборки и тд
// сюда экспортируем все остальные, кидаем в единый объект, и делаем экспорт
import models from '../../services/postgres/index'
import getUserRespect from './getUserRespect' // - это функция которая в бд лезет (пока нет)

const respect = {
	getUserRespect,
	create: async (userId, respectedUserId, respect, type) => {
		let row = {
			userId,
			respectedUserId,
			respect,
			type,
			dateTime: Date.now()
		}
		let result = await models.respect.create(row)
		// await добавление в бд // его пока нет потому что бд надо в докере поднимать, или локально иначе - хуета.
		return result.dataValues // какой-нить результат
	},
	sumUserToUser: (userId, respectedUserId) => {
		return models.respect.sum('respect', {
			where: {
				userId,
				respectedUserId
			}
		})
	},
	sumAllUsers: (userId) => {
		return models.respect.findAll({
			where: { userId },
			include: [{
				model: models.user,
				as: 'user',
				required: true
			}],
			attributes: [
				'respectedUserId',
				[models.sequelize.fn('sum', models.sequelize.col('respect')), 'respect'],
				[models.sequelize.fn('max', models.sequelize.col('dateTime')), 'lastTime']
			],
			group: ['respectedUserId', 'user.id', 'user.name', 'user.sex', 'user.pic'],
			order: [[models.sequelize.col('respect'), 'DESC']]
		})
	},
	get: (userId) => {
		return models.respect.findAll({
			where: { userId }
		})
	},
	getInitRow: (userId, respectedUserId) => {
		return models.respect.findOne({
			where: {
				userId, 
				respectedUserId,
				type: 'init'
			}
		})
	},
	getAll: () => {
		return models.respect.findAll()
	},
	getHistory: async (userId) => {
		let respects  = await models.respect.findAll({
			where: {
				[models.op.or]: [
					{ userId },
					{ respectedUserId: userId }
				]
			},
			order: [['dateTime', 'DESC']]
		})
		let ids = new Set()
		for (let i = 0; i < respects.length; i++) {
			respects[i] = respects[i].dataValues
			ids.add(respects[i].userId)
			ids.add(respects[i].respectedUserId)
		}
		let userData = await models.user.findAll({
			where: {
				id: Array.from(ids)
			}
		})
		let usersObject = {}
		userData.map(item => {
			item = item.dataValues
			usersObject[item.id] = {name: item.name, sex: item.sex, pic: item.pic}
		})
		return {users: usersObject, history: respects }
	},
	deleteData: (userId, respectedUserId) => {
		return models.respect.destroy({
			where: {
				userId: userId,
				respectedUserId: respectedUserId
			}
		})
	}
}
//{
// 	users: {
// 		id: {name, sex, pic},
// 		di2:{},
// 		id4:
// 		...
// 	},
// 	history: [
// 		{id, respecId}
// 	]
// }

export default respect

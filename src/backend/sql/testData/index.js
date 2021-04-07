import models from '../../services/postgres/index'

const testdata = {
	create: async (text, bool) => {
		let row = {
			text,
			bool,
			details: {}
		}
		let result = await models.testdata.create(row)
		console.log(result)
		return result
	},
	getAll: () => {
		return models.testdata.findAll()
	}
}
export default testdata

import Sequelize from 'sequelize'
import pgConfig from './config'

import testdata from './models/testdata'
import respect from './models/respect'
import user from './models/user'
import token from './models/token'


const config = pgConfig.development
const sequelize = process.env.DATABASE_URL ? 
	new Sequelize(process.env.DATABASE_URL, config) :
	new Sequelize(config.database, config.username, config.password, config)
const db = {}

db.testdata = testdata(sequelize, Sequelize.DataTypes)
db.respect = respect(sequelize, Sequelize.DataTypes)
db.user = user(sequelize, Sequelize.DataTypes)
db.token = token(sequelize, Sequelize.DataTypes)

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db)
	}
})

db.sequelize = sequelize
db.Sequelize = Sequelize
db.op = Sequelize.Op
db.fn = Sequelize.fn

export default db

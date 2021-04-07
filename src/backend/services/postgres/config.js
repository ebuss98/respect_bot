export default {
	development: {
		username: process.env.DB_USER || 'postgres',
		password: process.env.DB_PASSWORD || 'postgres',
		database: process.env.DB_NAME || 'respect-bot',
		host: process.env.DB_HOST || 'localhost',
		dialect: 'postgres',
		port: process.env.DB_PORT || 5432,
		dialectOptions: { ssl: process.env.DB_SSL }
	}
}

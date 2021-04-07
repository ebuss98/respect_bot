// // Запускаем http сервет, тобиш наша апишечка
import HTTPServer from './services/http'
import router from './routes'
import models from './services/postgres'

models.sequelize.sync().then(() => {
	const publicHttpService = new HTTPServer(router)
	publicHttpService.start(process.env.HTTP_PORT || 8080) // todo config
})

import Bot from './bot'

const bot = new Bot(
	process.env.TOKEN || '88b100013425cd18d5383f44995d72283d90f153206abe1a0bab225b6c3614c0aec4b128b5ecd0d2494b4'
)
bot.start()
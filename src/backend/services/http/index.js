import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import fileUpload from 'express-fileupload'

const application = express()

class HTTPServer {
	constructor(routes) {
		application.use(cors())
		application.use(fileUpload())
		application.use(
			bodyParser.json({
				limit: '10mb'
			})
		)
		application.use('/', routes)
	}

	async start(port) {
		let connection
		let expressPromise = new Promise((resolve) => {
			connection = application.listen(port, function () {
				console.log(`Listenning on ${port}`)
				resolve()
			})
		})

		try {
			await expressPromise
			return connection
		} catch (error) {
			console.log(error)
		}
	}
}

export default HTTPServer

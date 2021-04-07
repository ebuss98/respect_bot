import { Router } from 'express'
import Log from '../services/logger'
import testdata from '../sql/testData'
import auth from './vkAuth'
import respect from './respect'
import user from './user'
// тут формат следуюший - по логике делим роуты на файлы/ папки
// и перед export default добавляем router.use(`/тут корень роутера/`, тут то что импортировали); потом докину пример

const router = Router()

router.use('/user/', user)
router.use('/auth/', auth) 
router.use('/respect/', respect)
router.use('/user/', user)
router.get('/ping', (req, res) => res.send('pong'))
router.get('/postDB', async (req, res) => {
	// это метод пуе только для того чтобы в браузере работало, так то должен быть post
	res.status(201).json(await testdata.create('asd' + Math.trunc(Math.random() * 1000), true))
})
router.get('/dump', async (req, res) => {
	res.status(201).json(await testdata.getAll())
})
router.get('/example', async (req, res) => {
	// мб вынесем контроллер роута в отдельное место, но при 5 роутах - похуй
	// чета делаем, но чтобы не было ошибко
	try {
		// тут делаем че хотим
		// await зарос к бд
		// берем данные из запроса req.body
		res.send({ qwe: 321 }) // отдаем данные
	} catch (error) {
		// Поломались, логируем ошибку, возвращаем 500
		Log.error(error)
		res.sendStatus(500)
		// либо res.status(400).json({ message: 'example failed' }) если хотим тело к ответу
	}
})

export default router

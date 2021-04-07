import { Router } from 'express'
import respect from '../sql/respect'
//import ranks, { lowRank, highRank } from '../../constants/ranks.js'
import ranks from '../../utils/ranks.js'
const router = Router()

router.post('/', async (req, res) => {
	try {
		if (!req.body.userId || !req.body.respectedUserId || !req.body.respect) {
			res.sendStatus(400)
		} else {
			res.status(201).json(await respect.create(req.body.userId, req.body.respectedUserId, req.body.respect))
		}
	} catch (exception) {
		res.status(500).json(exception)
	}
})
router.get('/', async (req, res) => {
	try {
		res.json(await respect.getAll())
	} catch (exception) {
		res.status(500).json(exception)
	}
})

router.get('/history/:userId', async (req, res) => {
	try {
		res.json(await respect.getHistory(req.params.userId))
	} catch (exception) {
		res.status(500).json(exception)
	}
})

router.get('/sum_user_to_user/:userId/:respectedUserId', async (req, res) => {
	try {
		if (!req.params.userId || !req.params.respectedUserId) {
			res.sendStatus(400)
		} else {
			res.json(await respect.sumUserToUser(req.params.userId, req.params.respectedUserId))
		}
	} catch (exception) {
		res.status(500).json(exception)
	}
})

router.get('/sum_all_users/:userId', async (req, res) => {
	try {
		if (!req.params.userId) {
			res.sendStatus(400)
		} else {
			let result = await respect.sumAllUsers(req.params.userId)
			result = result.map(item => {
				item = item.dataValues
				item.rank = ranks(item.respect, item.user.sex)
				return item
			})
			res.json(result)
		}
	} catch (exception) {
		console.log(exception)
		res.status(500).json(exception)
	}
})

router.delete('/:userId/:respectedUserId', async (req, res) => {
	try {
		if (!req.params.userId || !req.params.respectedUserId) {
			res.sendStatus(400)
		} else {
			res.json(await respect.deleteData(req.params.userId, req.params.respectedUserId))
		}
	} catch (exception) {
		res.status(500).json(exception)
	}
})
export default router

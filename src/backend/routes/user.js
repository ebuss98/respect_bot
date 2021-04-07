import { Router } from 'express'
import user from '../sql/user'
import Log from '../services/logger'
import respect from "../sql/respect";
const router = Router()

router.post('/', async (req, res) => {
	try {
		if (!req.body.id || !req.body.name) {
			res.sendStatus(400)
		} else {
			res.status(201).json(await user.create(req.body.id, req.body.name))
		}
	} catch (exception) {
		res.status(500).json(exception)
	}
})
router.get('/', async (req, res) => {
	try {
		res.json(await user.getAll())
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
		Log.error(exception)
		res.status(500).json(exception)
	}
})

router.get('/sum_all_users/:userId', async (req, res) => {
	try {
		if (!req.params.userId) {
			res.sendStatus(400)
		} else {
			res.json(await respect.sumAllUsers(req.params.userId))
		}
	} catch (exception) {
		res.status(500).json(exception)
	}
})

export default router

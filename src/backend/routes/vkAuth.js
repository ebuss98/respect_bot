import { Router } from 'express'
import tokens from '../sql/tokens'
import Log from '../services/logger'
import axios from 'axios'
import { getUser } from '../logic/getUser'

const router = Router()
const CLIENT_ID = '7698287'
const CLIENT_SECRET = 'phoIMI10GF6UqWVujMTp'
const HOME_URI = 'http://localhost:8080/auth'
const REDIRECT_URI = HOME_URI + '/vk/'


router.get('/url/:id', (req, res) => {
  let redirect = REDIRECT_URI + req.params.id
  console.log(`https://oauth.vk.com/authorize?client_id=${CLIENT_ID}&display=page&redirect_uri=${redirect}&scope=offline&response_type=code&v=5.126`)
  res.redirect(`https://oauth.vk.com/authorize?client_id=${CLIENT_ID}&display=page&redirect_uri=${redirect}&scope=offline&response_type=code&v=5.126`)
})
router.get('/:id', async (req, res) => {
  try {
    let token = await tokens.get(req.params.id)
    if (!token) return res.json()
    let user = await getUser(token.userId)
    res.json(user)
  } catch (error) {
    Log.error(error)
    res.sendStatus(500)
  }
})
router.get('/vk/:id', async (req, res) => {
  try {
    let { id } = req.params
    let { code } = req.query
    let redirect = REDIRECT_URI + id
    let vkResponse = await axios.get(`https://oauth.vk.com/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${redirect}&code=${code}`)
    if (vkResponse.data.error) return res.status(500).json(vkResponse.data)
    await tokens.create(id, vkResponse.data.access_token, vkResponse.data.user_id)
    res.redirect('http://localhost:3000')
  } catch (error) {
    Log.error(error)
    res.sendStatus(500)
  }
 
})

export default router

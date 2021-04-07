import VkBot from 'node-vk-bot-api'
import Log from '../services/logger'
import respect from '../sql/respect'
import {getUser} from '../logic/getUser'
import { alredyInited, getHelpText, badInitText, badScoreText, changeRespectText, currentRespectText, invalidMessageText, noMentionedText, userRankText } from './phrases'
import { getRespect, help, initWord } from './contants/keyWords'
import { setInitialRespect } from '../logic/respect'
import { isAlreadyExists } from '../../utils/errorsChecker'
class Bot {
	constructor(token) {
		this.vk = new VkBot(token)
		this.vk.on(eventHandler)
	}
	start() {
		this.vk.startPolling((err) => {
			if (err) Log.error(err)
		})
	}
}
const GROUP_MENTION = '[club200343552|@respect__bot]' //todo env

async function eventHandler(ctx) {
	try {
		console.log(ctx.message)
		if (!ctx.message || ctx.message.type !== 'message_new') return

		let { text, from_id: senderId } = ctx.message

		if (!text.includes(GROUP_MENTION)) return
    text = text.replace(GROUP_MENTION, '').toLowerCase()
    if(text.includes(help)) return ctx.reply(getHelpText())
    
		let regMentionedResult = text.match(/\[id([\d]+)\|/)
    let mentioned = +(regMentionedResult && regMentionedResult[1])
    
    if (mentioned === senderId) return ctx.reply(invalidMessageText())
    if (!mentioned) return ctx.reply(noMentionedText())

    text = text.replace(/\[.*\]/, '').trim()
    getUser(senderId).catch(() => void 0)
    let user = await getUser(mentioned)
    if (!user) return ctx.reply(`Шота поломалось. Dump > ${text}, ${user}`)
    // тут у нас остается сырой текст сообщения
    if (text.includes(initWord)) {
      let regInitResult = text.match(/\+[\d]{1,2}|-[\d]{1,2}/)
      let initScore = Number(regInitResult && regInitResult[0])
      if (!initScore) return ctx.reply(badInitText())
      try {
        await setInitialRespect(senderId, mentioned, initScore)
        let curRespect = await respect.sumUserToUser(senderId, mentioned)
        ctx.reply(currentRespectText(user, curRespect))
      } catch (error) {
        if (isAlreadyExists(error)) return ctx.reply(alredyInited())
        else ctx.reply('Шота поломалось' + JSON.stringify(error, null, 4))
      }
    } else if (text.includes(getRespect)) {
      let curRespect = await respect.sumUserToUser(senderId, mentioned) || 0
      ctx.reply(userRankText(user, curRespect))
    } else {
      let regScoreResult = text.match(/\+[\d]{1}|-[\d]{1}/)
      if (!regScoreResult) return ctx.reply(badScoreText())
      let score = Number(regScoreResult && regScoreResult[0])
      if (![-3, -2, -1, 0, 1, 2, 3].includes(score)) return ctx.reply(badScoreText())
      if (score) {
        await respect.create(senderId, mentioned, score)
        let curRespect = await respect.sumUserToUser(senderId, mentioned)
        ctx.reply(changeRespectText(user, score, curRespect))
      } else {
        let curRespect = await respect.sumUserToUser(senderId, mentioned) || 0
        ctx.reply(userRankText(user, curRespect))
      }
    }
	} catch (error) {
		Log.error('Error in eventHandler', error)
	}
}

export default Bot

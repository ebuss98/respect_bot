//функция, которая проверят есть ли пользователь в бд и если нет то добавляет его туда
import user from '../sql/user'
import { getUserInfo } from '../vkApi'

export async function getUser(vkId) {
	let vkUser = await user.get(vkId)
	if (vkUser) return vkUser

	const { id, name, sex, photo } = await getUserInfo(vkId)
	console.log(id, name, sex, photo)
	let userCreating = await user.create( id, name, sex, photo)
	console.log(userCreating)
	return userCreating
}

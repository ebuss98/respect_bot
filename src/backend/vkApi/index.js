import axios from 'axios'
import user from "../sql/user";

const accessToken = '88b100013425cd18d5383f44995d72283d90f153206abe1a0bab225b6c3614c0aec4b128b5ecd0d2494b4'
const version = '5.126'

const getUserFields = ['photo_200','sex']
export async function getUserInfo(id) {
	//https://api.vk.com/method/users.get?user_ids=112609182&fields=photo_200&access_token=88b100013425cd18d5383f44995d72283d90f153206abe1a0bab225b6c3614c0aec4b128b5ecd0d2494b4&v=5.126

	let response = await axios.get(constructRequestUrl('users.get', { user_ids: id, fields: getUserFields.join(',') }))
	const userObject = response.data.response[0]
	if (!userObject) throw new Error(`User not found. id - ${id}`)
	return {
		id: userObject.id,
		name: userObject.first_name + ' ' + userObject.last_name,
		sex: userObject[getUserFields[1]],
		photo: userObject[getUserFields[0]]
	}
}

function constructRequestUrl(method, params) {
	let paramsStr = Object.entries(params)
		.map((a) => a.join('='))
		.join('&')
	return `https://api.vk.com/method/${method}?${paramsStr}&access_token=${accessToken}&v=${version}`
}

import { ALREADY_EXISTS_ERROR } from '../../constants/errors' 
import respect from "../sql/respect";

export async function setInitialRespect(userId, respectedUserId, initialRespect) {
	//проверка наличия в бд записи с таким айди респайди и типом инит
	let dbResult = await respect.getInitRow(userId, respectedUserId)
	if (dbResult) throw ALREADY_EXISTS_ERROR
	let respectCreating = await respect.create(userId, respectedUserId, initialRespect, 'init')
	return respectCreating
}
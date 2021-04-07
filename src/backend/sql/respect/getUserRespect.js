export default async function getUserRespect(id) {
	let response // = await запрос к бд
	let data = [{ id: 321, respect: 1 }] // await другой запрос в бд, потому что 1 нам сложно
	return data.map((a) => a.respect) // форматирование данных и возврат
}

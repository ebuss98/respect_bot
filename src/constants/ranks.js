// Таблица рангов
// 0 - пол неопределен, 1 - женшина, 2 - мужчина
let rankList = [
	{
		ru: {
			0: 'Античел',
			1: 'Античелэсса',
			2: 'Античел'
		}
	},
	{
		ru: {
			0: 'Чел(Челесса)',
			1: 'Челесса',
			2: 'Чел'
		}
	},
	{
		ru: {
			0: 'Знакомый(Знакомая)',
			1: 'Знакомая',
			2: 'Знакомый'
		}
	},
	{
		ru: {
			0: 'Микродруг(Микроподруга)',
			1: 'Микроподруга',
			2: 'Микродруг'
		}
	},
	{
		ru: {
			0: 'Друг(подруга)',
			1: 'Подруга',
			2: 'Друг'
		}
	},
	{
		ru: {
			0: 'Бро(Сис)',
			1: 'Сис',
			2: 'Бро'
		}
	},
	{
		ru: {
			0: 'Чел(Челесса)',
			1: 'Челесса',
			2: 'Чел'
		}
	},
	{
		ru: {
			0: 'Старина(Старуха)',
			1: 'Старуха',
			2: 'Старина'
		}
	},
	{
		ru: {
			0: 'Лучший друг(Лучшая подруга)',
			1: 'Лучшая подруга',
			2: 'Лучший друг'
		}
	},
	{
		ru: {
			0: 'Лучше лучшего друг(Лучше лучшей подруги)',
			1: 'Лучше лучшей подруги',
			2: 'Лучше лучшего друг'
		}
	},
	{
		ru: {
			0: 'Любимый друг(Любимая подруга)',
			1: 'Любимая подруга',
			2: 'Любимый друг'
		}
	},
	{
		ru: {
			0: 'Лучший любимый друг(Лучшая любимая подруга)',
			1: 'Лучшая любимая подруга',
			2: 'Лучший любимый друг'
		}
	}
]
export const highRank = {
	ru: {
		0: 'Муж(Жена)',
		1: 'Жена',
		2: 'Муж'
	}
}
export const lowRank = {
	ru: {
		0: 'хлебушек',
		1: 'хлебушек',
		2: 'хлебушек'
	}
}
const ranksMap = {}
let count = 0
for (let i = -99; i < 100; i++) {
	if (i % 10 === 0) count++
	ranksMap[i + ''] = rankList[count]
}
export default ranksMap

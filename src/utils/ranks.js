import ranks, { lowRank, highRank } from '../constants/ranks'

export default function getRank(respect, sex, language = 'ru') {
	if (respect > 99) return highRank[language][sex]
	if (respect < -99) return lowRank[language][sex]
	return ranks[respect][language][sex]
}

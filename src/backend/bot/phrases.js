import rank from '../../utils/ranks'

export function changeRespectText(user, score, respect) { 
  let changeText = score > 0 ? 'повысили' : 'понизили'
  return `Вы ${changeText} респект пользователю ${user.name} на ${score}\nТекуший респект: ${respect}, ранг: ${rank(respect, user.sex)}`
}
export function currentRespectText(user, respect) {
  return `Вы респектeте пользователя ${user.name} на ${respect}\nТекуший ранг: ${rank(respect, user.sex)}`
}
export function initAlreadySetText() { return 'Ты уже установил изначальный респект этому юзеру, больше нельзя :)' }
export function invalidMessageText() { return 'А ну не шали' }
export function noMentionedText() { return 'Надо тегнуть кого-то вместе со мной' }
export function badScoreText() { return 'Надо написать число респекта, от -3 до +3, обязательно со знаком' }
export function getHelpText() { return `Как мной пользоваться:
@respect__bot @другой_юзер +2 - изменение респекто пользователю (возмоджны значения от -3 до +3)
@respect__bot @другой_юзер респектую на +50 - установка изначального респекта (можно сделать только 1 раз)
@respect__bot @другой_юзер ранг - посмотреть текуший респект` }
export function badInitText() { return `Надо написать 'респектую на' и число респекта, от -99 до +99, обязательно со знаком` }
export function alredyInited() { return 'Нельзя устанавливать дефолтный респект несколько раз!'}
export function userRankText(user, respect) { return `${user.name} для тебя ${rank(respect, user.sex)}(${respect} респекта)`}
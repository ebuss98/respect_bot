import { ALREADY_EXISTS_ERROR } from '../constants/errors'

export function isAlreadyExists(error) { return error.message === ALREADY_EXISTS_ERROR.message } 
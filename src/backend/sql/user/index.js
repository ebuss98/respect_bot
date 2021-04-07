import models from '../../services/postgres/index'
import { defaultPicURL } from '../../../constants/defaults'

const user = {
    create: async (id, name, sex, pic = defaultPicURL) => {
        let row = {
            id,
            name,
            sex,
            pic
        }
        await models.user.create(row)
        return row // какой-нить результат
    },
    get: (id) => {
        return models.user.findByPk(id)
    },
    getAll: () => {
        return models.user.findAll()
    }
}

export default user
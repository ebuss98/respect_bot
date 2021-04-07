import models from '../services/postgres/index'

const tokens = {
    create: async (guid, token, userId) => {
        let row = {
          guid,
            token,
            userId
        }
        await models.token.upsert(row)
        return row
    },
    get: (guid) => {
        return models.token.findByPk(guid)
    }
}

export default tokens
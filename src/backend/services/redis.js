// мб не нужен будет, хотя для ouath норм тема
import redis from 'redis'
import { promisify } from 'util'

const config = {
	host: process.env.REDIS_HOST || 'localhost',
	port: process.env.REDIS_PORT || 6379
}
let client

class RedisService {
	constructor() {
		this.client = this.connection()
		this.aget = (key) => promisify(this.client.get).apply(this.client, [key])
		this.aset = (key, value) => promisify(this.client.set).apply(this.client, [key, value])
		this.adel = (key) => promisify(this.client.del).apply(this.client, [key])
		this.attl = (key) => promisify(this.client.ttl).apply(this.client, [key])
		this.akeys = (template) => promisify(this.client.keys).apply(this.client, [template])
		this.aexpire = (key, expire) => promisify(this.client.expire).apply(this.client, [key, expire])
		this.aexists = (key) => promisify(this.client.exists).apply(this.client, [key])
		this.ahset = (key, field, value) => promisify(this.client.hset).apply(this.client, [key, field, value])
		this.ahget = (key, field) => promisify(this.client.hget).apply(this.client, [key, field])
		this.ahdel = (key, field) => promisify(this.client.hdel).apply(this.client, [key, field])
		this.ahgetall = (key) => promisify(this.client.hgetall).apply(this.client, [key])
		this.ahmset = (key, value) => promisify(this.client.hmset).apply(this.client, [key, value])
		this.asadd = (key, value) => promisify(this.client.sadd).apply(this.client, [key, value])
		this.asrem = (key, value) => promisify(this.client.srem).apply(this.client, [key, value])
		this.asmembers = (key) => promisify(this.client.smembers).apply(this.client, [key])
		this.alpop = (key) => promisify(this.client.lpop).apply(this.client, [key])
		this.arpush = (key, data) => promisify(this.client.rpush).apply(this.client, [key, data])
		this.alrange = (key, start, stop) => promisify(this.client.lrange).apply(this.client, [key, start, stop])
		this.apersist = (key) => promisify(this.client.persist).apply(this.client, [key])
	}
	connection() {
		if (!client) client = redis.createClient(config)
		return client
	}
}

export default new RedisService()

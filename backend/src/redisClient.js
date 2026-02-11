const redis = require('redis');

const client = redis.createClient({
  url: process.env.REDIS_URL || 'redis://redis:6379'
});

client.on('error', (error) => {
  // eslint-disable-next-line no-console
  console.error('Redis connection error:', error.message);
});

const ensureConnected = async () => {
  if (!client.isOpen) {
    await client.connect();
  }
};

module.exports = {
  ensureConnected,
  get: async (key) => {
    await ensureConnected();
    return client.get(key);
  },
  set: async (key, value) => {
    await ensureConnected();
    return client.set(key, value);
  },
  ping: async () => {
    await ensureConnected();
    return client.ping();
  },
  quit: async () => {
    if (client.isOpen) {
      await client.quit();
    }
  },
  get isOpen() {
    return client.isOpen;
  }
};

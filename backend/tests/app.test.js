const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');

const app = require('../src/app');
const redisClient = require('../src/redisClient');

let visits = 0;
redisClient.ping = async () => 'PONG';
redisClient.get = async () => String(visits || '');
redisClient.set = async (_key, value) => {
  visits = Number(value);
};

const sendRequest = (port, path) =>
  new Promise((resolve, reject) => {
    const request = http.get(
      {
        hostname: '127.0.0.1',
        port,
        path,
        timeout: 5000
      },
      (response) => {
        let body = '';
        response.on('data', (chunk) => {
          body += chunk;
        });
        response.on('end', () => {
          resolve({ statusCode: response.statusCode, body: JSON.parse(body) });
        });
      }
    );

    request.on('error', reject);
  });

let server;
let port;

test.before(() => {
  visits = 0;
  server = app.listen(0);
  port = server.address().port;
});

test('GET /healthz returns healthy status', async () => {
  const response = await sendRequest(port, '/healthz');

  assert.equal(response.statusCode, 200);
  assert.equal(response.body.status, 'ok');
});

test('GET /api/message returns message payload', async () => {
  const response = await sendRequest(port, '/api/message');

  assert.equal(response.statusCode, 200);
  assert.equal(response.body.message, 'Hello! Visits: 1');
});

test.after(async () => {
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }

  if (redisClient.isOpen) {
    await redisClient.quit();
  }
});

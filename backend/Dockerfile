FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force
COPY src ./src

USER node
EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:5000/healthz', (res) => process.exit(res.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["node", "src/server.js"]

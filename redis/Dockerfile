FROM redis:7.2-alpine

USER redis
EXPOSE 6379

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD redis-cli ping | grep PONG || exit 1

CMD ["redis-server", "--appendonly", "yes", "--save", "60", "1000"]

/**
 * Queue us which consumer and sender should use
 */
const rabbitMqQueueName = "aws-to-rabbit-queue";

const rabbitMqHost = "localhost";

/** Needed for basic auth for sender HTTP request */
const rabbitMqUserAndPassword = "guest:guest";

/** Host + port for RabbitMq queue consumer */
const rabbitMqListenerHost = `amqp://${rabbitMqHost}:5672`;

/** Host + port + API endpoint for sending HTTP pushes into RabbitMQ queue */
const rabbitMqSenderUrl = `http://${rabbitMqHost}:15672/api/exchanges/%2F/amq.default/publish`;

module.exports = {
  rabbitMqQueueName,
  rabbitMqHost,
  rabbitMqUserAndPassword,
  rabbitMqListenerHost,
  rabbitMqSenderHost: rabbitMqSenderUrl,
};

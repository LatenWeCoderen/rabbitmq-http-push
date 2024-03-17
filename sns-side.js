const {
  rabbitMqQueueName,
  rabbitMqSenderHost,
  rabbitMqUserAndPassword,
} = require("./configuration");

// process arguments
const arguments = process.argv;

const requestId = arguments[2];
const imageName = arguments[3];

if (!requestId || !imageName) {
  console.log(`usage: node ./sns-side.js <RequestID> <ImageName>`);
  return;
}

// send HTTP POST request into RabbitMQ queue
postData(rabbitMqSenderHost, rabbitMqQueueName, {
  requestId,
  url: `https://fake-s3-bucket.s3.amazonaws.com/${requestId}/${imageName}`,
}).then((data) => {
  console.log(`response: `, data); // JSON data parsed by `data.json()` call
});

/**
 * Send message into RabbitMQ queue over HTTP
 * @param {string} rabbitMqListenerHostWithExchange
 * @param {string} queueName
 * @param {object} payload
 * @returns
 */
async function postData(
  rabbitMqListenerHostWithExchange = "",
  queueName,
  payload = {}
) {
  // RabbitMQ request body
  const rabbitMqRequest = {
    name: "amq.default", // exchange name
    properties: {
      delivery_mode: 1, // non persistent message (will not survive server restart)
    },
    routing_key: queueName,
    payload: JSON.stringify(payload),
    payload_encoding: "string",
  };

  // send HTTP request to RabbitMQ
  const response = await fetch(rabbitMqListenerHostWithExchange, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(rabbitMqUserAndPassword).toString(
        "base64"
      )}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rabbitMqRequest), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

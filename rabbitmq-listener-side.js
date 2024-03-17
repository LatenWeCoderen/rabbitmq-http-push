const amqplib = require("amqplib/callback_api");
const { rabbitMqQueueName, rabbitMqListenerHost } = require("./configuration");

amqplib.connect(`${rabbitMqListenerHost}`, (err, conn) => {
  if (err) throw err;

  conn.createChannel((err, ch2) => {
    if (err) throw err;

    ch2.assertQueue(rabbitMqQueueName);

    ch2.consume(rabbitMqQueueName, (msg) => {
      if (msg !== null) {
        const payload = JSON.parse(msg.content.toString());
        switch (payload.requestId) {
          case "10":
            console.log(
              `Payload for processId 10 received, image url: ${payload.url}`
            );
            break;
          case "20":
            console.log(
              `Payload for processId 20 received, image url: ${payload.url}`
            );
            break;
          default:
            console.warn(
              `Payload for not awaited requestId ${payload.requestId} received`
            );
            break;
        }
        ch2.ack(msg);
      } else {
        console.log("Consumer of processId 10 is cancelled by server");
      }
    });
  });

  console.log("RabbitMQ listener is started");

  /*
  //RabbitMQ sender for processId 20, uncomment to use  
  conn.createChannel((err, ch1) => {
    if (err) throw err;

    ch1.assertQueue(rabbitMqQueueName);
    const requestId = "20";
    const url = `https://fake-s3-bucket.s3.amazonaws.com/${requestId}/image.png`;
    setInterval(() => {
      ch1.sendToQueue(
        rabbitMqQueueName,
        Buffer.from(JSON.stringify({ requestId, url }))
      );
    }, 1000);
  });
  */
});

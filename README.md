# rabbitmq-http-push

Test project which shows possibility of sending messages into Rabbit MQ queue by HTTP
Also it shows segregation of consumer behavior depend on RequestId inside the queued messages

# How to start test

1. Perform operations below in project root folder
   a) `docker compose build`
   b) `docker compose up`
   c) `npm install`

2. Check and change values in configuration.js if required

3. Open one terminal window and start queue listener from the project folder
   `npm run start-listener`

4. Open another terminal window and start script which adds messages into RabbitMQ queue by HTTP
   `node ./sns-side.js <RequestId> <ImageName>`

where:

- <RequestId> is number, can be any, but only 10 and 20 are handled separately, all others will give warning
- <ImageName> is arbitrary string which represents an image name

# Expected test results

- Rabbit MQ listener will consume queue messages and consider messages with RequestId 10 and 20 as normal messages
- For other RequestId Rabbit MQ listener will printout warnings

Check image `./app-work-example.png`

![Application test process](https://raw.githubusercontent.com/LatenWeCoderen/rabbitmq-http-push/main/app-work-example.png)

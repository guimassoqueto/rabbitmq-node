import { RabbitMQReceiver, TConsumer } from "./app/receiver/receiver.js";

const consumer: TConsumer = (channel) => {
  return (message) => {
    if (message) {
      const pids = JSON.parse(message.content.toString())
      console.log(pids)
      channel.ack(message)
    }
  }
}

try {
  await RabbitMQReceiver.receiver(consumer)
} catch (error) {

}
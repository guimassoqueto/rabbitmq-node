import { Channel, ConsumeMessage } from "amqplib";
import { RabbitMQPublisher } from "./app/publisher/publisher.js";
import { RabbitMQReceiver } from "./app/receiver/receiver.js"


const list = ['B09BBDVPB1']

function consumer(channel: Channel) {
  return function (message: ConsumeMessage | null){ 
    if (message) {
      setTimeout(() => {
        console.log('gaymen')
      }, 10000)
      console.log(message.content.toString())
      channel.ack(message)
    }
  }
}

try {
  await RabbitMQPublisher.publish(list)
  // console.log('Listening for messages...')
  // await RabbitMQReceiver.receiver(consumer)
} catch (error) {
  console.error(error)
}

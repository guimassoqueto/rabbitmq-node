import client, { Connection, Channel, ConsumeMessage } from 'amqplib'
import { 
  RABBITMQ_URL,
  RABBITMQ_MAIN_QUEUE
} from '../settings.js'


function consumer(channel: Channel) {
  return function (message: ConsumeMessage | null){ 
    if (message) {
      console.log(JSON.parse(message.content.toString()))
      channel.ack(message)
    }
  }
}

try {
  const connection: Connection = await client.connect(RABBITMQ_URL)
  const channel: Channel = await connection.createChannel()
  await channel.assertQueue(RABBITMQ_MAIN_QUEUE, {durable: false})
  await channel.consume(RABBITMQ_MAIN_QUEUE, consumer(channel))
}
catch (error) {
  console.error(error)
}

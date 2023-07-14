import client, { Connection, Channel } from 'amqplib'
import { 
  RABBITMQ_URL,
  RABBITMQ_MAIN_QUEUE
} from '../settings.js'

async function publisher(message: any) {
  try {
    const connection: Connection = await client.connect(RABBITMQ_URL)
    const channel: Channel = await connection.createChannel()
    await channel.assertQueue(RABBITMQ_MAIN_QUEUE, { autoDelete: true })
    channel.sendToQueue(RABBITMQ_MAIN_QUEUE, Buffer.from(message))
  } catch (error) {
    console.error(error)
  }
}


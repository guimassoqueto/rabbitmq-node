import client, { Connection, Channel } from 'amqplib'
import { 
  RABBITMQ_URL,
  RABBITMQ_MAIN_QUEUE,
  OPTIONS_ASSERT_QUEUE
} from '../settings.js'

export class RabbitMQPublisher {
  static async publish(message: any) {
    const connection: Connection = await client.connect(RABBITMQ_URL)
    const channel: Channel = await connection.createChannel()
    await channel.assertQueue(RABBITMQ_MAIN_QUEUE, OPTIONS_ASSERT_QUEUE)
    if (['number', 'string'].includes(typeof message)) {
      channel.sendToQueue(RABBITMQ_MAIN_QUEUE, Buffer.from(message))
    }
    if (typeof message == 'object') {
      channel.sendToQueue(RABBITMQ_MAIN_QUEUE, Buffer.from(JSON.stringify(message)))
    } 
    setTimeout(() => {
      channel.close();
      connection.close();
    }, 50);
  }
}
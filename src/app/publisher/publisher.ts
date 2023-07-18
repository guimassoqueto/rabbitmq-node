import client, { Channel, Connection } from "amqplib";
import { RABBITMQ_MAIN_QUEUE, RABBITMQ_URL } from "../settings.js";

export class RabbitMQPublisher {
  static async publish(message: any) {
    const connection: Connection = await client.connect(RABBITMQ_URL);
    const channel: Channel = await connection.createChannel();
    await channel.assertQueue(RABBITMQ_MAIN_QUEUE, { durable: false });
    await channel.prefetch(1); // will send one message at time
    if (["number", "string"].includes(typeof message)) {
      channel.sendToQueue(RABBITMQ_MAIN_QUEUE, Buffer.from(message), {
        persistent: true,
      });
    }
    if (typeof message == "object") {
      channel.sendToQueue(
        RABBITMQ_MAIN_QUEUE,
        Buffer.from(JSON.stringify(message)),
        { persistent: true },
      );
    }
    setTimeout(() => {
      channel.close();
      connection.close();
    }, 50);
  }
}

import amqp, { Channel, Connection, ConsumeMessage } from "amqplib";
import { CONSUME_EVENT } from "./events";

class RabbitMQ {
  private connection: Connection | null = null;
  private channel: Channel | null = null;

  public async connect(): Promise<void> {
    if (!this.channel) {
      this.connection = await amqp.connect({
        hostname: process.env.RABBITMQ_HOST,
        port: Number(process.env.RABBITMQ_PORT),
        username: process.env.RABBITMQ_USER,
        password: process.env.RABBITMQ_PASS,
      });
      this.channel = await this.connection.createChannel();
      consumeMessage(this.channel);
    }
  }

  public getChannel(): Channel | null {
    return this.channel;
  }

  sendQueue(queue: string, payload: any) {
    this.channel?.assertQueue(queue);
    this.channel?.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));
  }
}

const consumeMessage = (channel: Channel) => {
  CONSUME_EVENT.forEach(async (event) => {
    channel.assertExchange(event.exchangeName, event.exchangeType, {
      durable: false,
    });
    const q1 = await channel.assertQueue(event.queueName);
    await channel.bindQueue(q1.queue, event.exchangeName, event.routingKey);
    channel.consume(q1.queue, (msg) => {
      if (!msg?.content) return;
      event.action(channel, JSON.parse(msg.content.toString()), msg);
    });
  });
};

export const mq = new RabbitMQ();

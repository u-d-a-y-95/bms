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
  publishMessage(
    exchangeName: string,
    exchangeType: string,
    routingKey: string,
    payload: any
  ) {
    this.channel?.assertExchange(exchangeName, exchangeType, {
      durable: false,
    });
    this.channel?.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(payload))
    );
  }
}

const consumeMessage = (channel: Channel) => {
  CONSUME_EVENT.forEach((event) => {
    channel.assertQueue(event.name);
    channel.consume(event.name, (m) => {
      event.action(channel, m ? JSON.parse(m?.content.toString()) : "", m);
    });
  });
};

export const mq = new RabbitMQ();

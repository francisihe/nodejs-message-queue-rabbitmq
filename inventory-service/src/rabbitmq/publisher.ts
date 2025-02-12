import amqp from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL as string;
const QUEUE = 'notification_queue';

export async function publishNotification(notification: any) {
  try {
    const conn = await amqp.connect(RABBITMQ_URL);
    const channel = await conn.createChannel();

    await channel.assertQueue(QUEUE, { durable: true });
    channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(notification)), { persistent: true });

    console.log('📢 Notification sent:', notification);
    await channel.close();
    await conn.close();
  } catch (error) {
    console.error('❌ RabbitMQ error:', error);
  }
}

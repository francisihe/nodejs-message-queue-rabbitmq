import amqp from 'amqplib';
import { sendEmailNotification } from '../utils/emailSender';

const RABBITMQ_URL = process.env.RABBITMQ_URL as string;
const QUEUE = 'notification_queue';

async function consumeNotifications() {
  const conn = await amqp.connect(RABBITMQ_URL);
  const channel = await conn.createChannel();
  await channel.assertQueue(QUEUE, { durable: true });

  console.log('📢 Waiting for notifications...');
  channel.consume(QUEUE, async (msg) => {
    if (msg) {
      const notification = JSON.parse(msg.content.toString());
      console.log('📢 New Notification:', notification);

      await sendEmailNotification(notification);
      
      channel.ack(msg);
    }
  });
}

consumeNotifications().catch(console.error);

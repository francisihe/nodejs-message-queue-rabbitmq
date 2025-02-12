import * as amqp from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL as string;
const QUEUE = 'order_queue';

export async function publishOrder(order: any) {
    try {
        const conn = await amqp.connect(RABBITMQ_URL);
        const channel = await conn.createChannel();

        await channel.assertQueue(QUEUE, { durable: true });
        channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(order)), { persistent: true });

        console.log('📦 Order sent to queue:', order);
        await channel.close();
        await conn.close();
    } catch (error) {
        console.error('❌ RabbitMQ error:', error);
    }
}

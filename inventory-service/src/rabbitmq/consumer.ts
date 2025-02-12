import amqp from 'amqplib';
import { Inventory } from '../models/inventory';
import { publishNotification } from './publisher';

const RABBITMQ_URL = process.env.RABBITMQ_URL as string;
const QUEUE = 'order_queue';

async function consumeOrders() {
  const conn = await amqp.connect(RABBITMQ_URL);
  const channel = await conn.createChannel();
  await channel.assertQueue(QUEUE, { durable: true });

  console.log('📦 Waiting for orders...');
  channel.consume(QUEUE, async (msg) => {
    if (msg) {
      const order = JSON.parse(msg.content.toString());
      console.log('📦 Processing order:', order);

      const inventoryItem = await Inventory.findOne({ where: { product: order.product } });
      
      if (inventoryItem && inventoryItem.stock >= order.quantity) {
        inventoryItem.stock -= order.quantity;
        await inventoryItem.save();

        console.log('✅ Order fulfilled:', order);

        if (inventoryItem.stock < 5) {
          publishNotification({
            product: order.product,
            message: `Stock running low for ${order.product}`,
          });
        }
      } else {
        console.log('❌ Not enough stock:', order.product);
      }

      channel.ack(msg);
    }
  });
}

consumeOrders().catch(console.error);

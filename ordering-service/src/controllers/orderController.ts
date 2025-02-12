import { Request, Response } from 'express';
import { Order } from '../models/order';
import { publishOrder } from '../rabbitmq/publisher';

export async function createOrder(req: Request, res: Response) {
    try {
        const { product, quantity } = req.body;
        const order = await Order.create({ product, quantity });

        await publishOrder(order);

        res.status(201).json({ message: 'Order placed successfully!', order });
    } catch (error) {
        res.status(500).json({ error: 'Order creation failed' });
    }
}

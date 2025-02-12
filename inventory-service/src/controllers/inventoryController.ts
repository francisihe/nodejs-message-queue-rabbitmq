import { Request, Response } from 'express';
import { Inventory } from '../models/inventory';

export async function addInventory(req: Request, res: Response) {
  try {
    const { product, stock } = req.body;
    const item = await Inventory.create({ product, stock });

    res.status(201).json({ message: 'Inventory added successfully!', item });
  } catch (error) {
    res.status(500).json({ error: 'Inventory addition failed' });
  }
}

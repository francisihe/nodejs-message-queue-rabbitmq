import express from 'express';
import dotenv from 'dotenv';
import inventoryRoutes from './src/routes/inventoryRoutes';
import { sequelize } from './src/models/inventory';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api', inventoryRoutes);

// sequelize.sync().then(() => console.log('📦 Inventory Database Connected'));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Inventory Service running on port ${PORT}`));

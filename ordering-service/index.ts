import express from 'express';
import dotenv from 'dotenv';
import orderRoutes from './src/routes/orderRoutes';
import { sequelize } from './src/models/order';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api', orderRoutes);

// sequelize.sync().then(() => console.log('📦 Database Connected'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Ordering Service running on port ${PORT}`));

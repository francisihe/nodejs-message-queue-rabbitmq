import * as express from 'express';
import * as dotenv from 'dotenv';
import orderRoutes from './routes/orderRoutes';
import { sequelize } from './models/order';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api', orderRoutes);

sequelize.sync().then(() => console.log('📦 Database Connected'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Ordering Service running on port ${PORT}`));

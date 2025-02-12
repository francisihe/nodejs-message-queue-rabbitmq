import { Sequelize, DataTypes, Model } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
    dialect: 'postgres',
});

class Inventory extends Model { 
    public id!: string;
    public product!: string;
    public stock!: number;
 }

Inventory.init(
    {
        id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
        product: { type: DataTypes.STRING, allowNull: false },
        stock: { type: DataTypes.INTEGER, allowNull: false },
    },
    { sequelize, modelName: 'inventory' }
);

export { sequelize, Inventory };

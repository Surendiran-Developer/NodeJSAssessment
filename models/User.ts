import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class User extends Model {}
User.init({
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
}, { sequelize, modelName: 'user' });

export default User;

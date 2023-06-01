import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import { sequelize } from '../../config/db.js';

export const UserSchema = sequelize.define('user_data', {
    id: {
        field: 'id',
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        field: 'name',
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        field: 'email',
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        field: 'password',
        type: DataTypes.STRING,
        allowNull: false
    },
},
    {
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10);
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            },
            beforeUpdate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10);
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            },
        },
    }
);
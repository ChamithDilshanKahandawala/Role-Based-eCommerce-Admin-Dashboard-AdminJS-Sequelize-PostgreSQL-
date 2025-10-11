const {DataTypes, Model} = require('sequelize');
const {sequelize} = require('../config/database');

const OrderItem  = sequelize.define('OrderItem',{

    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    quentity:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1,
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false,
        defaultValue:0.00,
    },
});

module.exports = OrderItem;
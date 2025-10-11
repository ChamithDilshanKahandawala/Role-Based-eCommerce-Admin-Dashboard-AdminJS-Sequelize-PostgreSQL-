const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/database');

const Order = sequelize.define('Order',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    total:{
        type:DataTypes.FLOAT,
        allowNull:false,
        defaultValue:0.00,
    },
    status:{
        type:DataTypes.ENUM('Pending','Processing','Shipped','Delivered','Cancelled'),
        defaultValue:'Pending',
    },
});

module.exports = Order;
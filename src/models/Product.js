const {DataTypes} = require('sequelize');
const  {sequelize} = require('../config/database');
const { name } = require('@adminjs/express');

const Product = sequelize.define('Product',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        unique:true,
        autoIncrement:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:true,

    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false,
        defaultValue:0.00,
    },
    stock:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0,
    },

});

module.exports = Product;
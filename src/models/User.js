const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/database');


const User = sequelize.define('User',{
     id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
     },
     email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
     },
      password:{
       type :DataTypes.STRING,
       allowNull:false, 
     },
     role:{
        type:DataTypes.ENUM('admin','regular'),
        defaultValue: 'regular',
        allowNull:false,
     },
     firstName:{
        type:DataTypes.STRING,
        allowNull:false,
     },
     lastName:{
        type:DataTypes.STRING,
        allowNull:false,
     },
     
},{
    defaultScope:{
        attributes:{exclude:['password']}
    },
    scopes:{
        withPassword:{
            attributes:{},
        }
    }
});

module.exports = User;
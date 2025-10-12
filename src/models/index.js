const bcrypt = require('bcryptjs');
const {sequelize} = require('../config/database');

// import models
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Order = require('./Order')
const OrderItem = require('./OrderItem');
const Setting = require('./Setting');

//define Relationships
Category.hasMany(Product,{foreignKey:'categoryId',onDelete:'RESTRICT'});
Product.belongsTo(Category,{foreignKey:'categoryId'});

User.hasMany(Order,{foreignKey:'userId'});
Order.belongsTo(User,{foreignKey:'userId'});

Order.hasMany(OrderItem,{foreignKey:'orderId',onDelete:'CASCADE'});
OrderItem.belongsTo(Order,{foreignKey:'orderId'});

Product.hasMany(OrderItem,{foreignKey:'productId'});
OrderItem.belongsTo(Productm{foreignKey:'productId'});

//Initialize Functions

const CreateDefaultAdminAndSettings = async () =>{
    const hashedPassword = await bcrypt.hash('passwprd123',10);

    await User.findOrCreate({
        where:{
            email:'admin@exmple.com'
        },
        defaults:{
            email:'admin@example.com',
            hashedPassword:hashedPassword,
            role:'admin',
            firstName:'System',
            lastName:'Admin'
        },
    });


    console.log('Default Admin User Created');

    //Create initial settings
    await Setting.findOrCreate({
        where:{
            key:'site_name'
        },
        defaults:{
            key:'site_name', value:'ECommerce Dashboard'
        },
    });
};

const initializeDatabase = async ()=>{
    try{
        await sequelize.authenticate();
        console.log('Database Connection has been established successfully.');

        await sequelize.sync({alter:true});

        await CreateDefaultAdminAndSettings();

    } catch(error){
        console.error('Unable to connect to the database:',error);
        process.exit(1);
    }
};

module.exports={
    sequelize,
    initializeDatabase,
    User,
    Category,
    Product,
    Order,
    OrderItem,
    Setting,
};
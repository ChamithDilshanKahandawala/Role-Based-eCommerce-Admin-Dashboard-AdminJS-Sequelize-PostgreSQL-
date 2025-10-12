const AdminJS = require('adminjs');
const AdminJSSequelize = require('@adminjs/sequelize');
const AdminJSExpress = require('@adminjs/express');
const bcrypt = require('bcryptjs');

const { initializeDatabase, User, Product, Category, Order, OrderItem, Setting } = require('../models');

const userOptions = require('./resources/userOptions');
const settingOptions = require('./resources/settingOptions');
const { isVisible } = require('./resources/userOption');
const { use } = require('react');


AdminJS.registerAdapter(AdminJSSequelize);

const createAdminUser = async ()=>{
    await initializeDatabase();

    const adminJS = new AdminJS({
        rootPath: '/admin',
        branding:{
            companyName:'E-Commerce Dashboard',
            logo:false,
        },

        resources:[
            {resource:User,options:userOptions},
            {resource:Setting,options:settingOptions},
            {resource:Category},
            {resource:Product},
            {resource:Order},
            {resource:OrderItem},

        ],
        //create Custom Pages

        pages:{
            dashboard:{
                handler:async(request,response,context)=>{
                    const isAdmin = context.currentAdmin && context.currentAdmin.role === 'admin';

                    let summery = [];
                    if(isAdmin){
                        const userCount = await User.count();
                        const productCount = await Product.count();
                        const categoryCount = await Category.count();
                        const orderCount = await Order.count();
                        summery = [
                            { label: 'Users', count: userCount },
                            { label: 'Products', count: productCount },
                            { label: 'Categories', count: categoryCount },
                            { label: 'Orders', count: orderCount },
                        ];
                    }
                    return{
                        content:{
                            title:isAdmin ? 'Admin Dashboard' : 'User Dashboard',
                            isAdmin:isAdmin,
                            summery:summery,

                        }
                    };
                },
                component: AdminJS.bundle('../admin/components/Dashboard'),
            },

            settingPage:{ //create a custom settings page
                handler:async(request,response,context)=>{
                    if(!context.currentAdmin || context.currentAdmin.role !== "admin"){
                        return{notice: {message:'Access Denied', type:'error'}};
                    }
                    return{};
                },component: AdminJS.bundle('../admin/components/SettingsForm'),
                isVisible:({currentAdmin})=>{

                    return currentAdmin && currentAdmin.role === 'admin';
                }

            }
        }
    });

    //Build the authenticated router
    const adminRouter  = AdminJSExpress.buildAuthenticatedRouter(
        adminJS,
        {
            authenticate:async(email,password,req)=>{
                const user = await User.scope('withPassword').findOne({where:{email}});

                if(User (await bcrypt.compare(password,User.password))){
                    return {email:user.email, role:user.role};


                }
                return null;
            },
            cookiePassword:process.env.COOKIE_SECRET || 'some-secret-password-used-to-secure-cookie',
            cookieName:'adminjs_session_jwt',

        }

    );
    return {adminJS, adminRouter};
};

module.exports = createAdminUser;
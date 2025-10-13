const express = require('express');
const cookieParser = require('cookie-parser'); 

const app = express();
const PORT = process.env.PORT || 3000;

const createAdminApp = require('./admin/adminJsSetup'); 
const authRoutes = require('./routes/auth');

//middleware setup
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const startServer = async()=>{
    try{
        const{ adminJs,adminRouter} = await createAdminApp();

        app.use('/api',authRoutes);

        app.use(adminJs.options.rootPath, adminRouter);

        app.get('/',(req,res)=>{
            res.send('Welcome to the E-Commerce Admin Dashboard API');
        });
       
        app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`Admin panel available at http://localhost:${PORT}/admin`);
        });
    }catch(error){
        console.error('Error starting server:', error);
         process.exit(1); 
    }
};

startServer();
const app = require('./server');
app.listen(process.env.PORT,()=>{
    console.log(`Server on Port ${process.env.PORT}`);
});
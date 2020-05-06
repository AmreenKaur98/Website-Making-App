const express = require('express');
const dbconnection = require('./dbconnection');
const PORT = process.env.PORT || 8000

const user = require('./routers/userRouter')
const admin = require('./routers/adminRoute')

var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

var app=express();

app.use('/api',user,admin)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(8000,()=>{
    console.log(`the magic is on port ${PORT}`);
}); 
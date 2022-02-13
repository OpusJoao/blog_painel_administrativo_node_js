const express = require('express')
const app = express();
const PORT = 8080; 
app.get('/', (req,res)=>{
    res.send('Bem vindo.');
})

app.listen(PORT,()=>{
    console.log(`Servidor is running on PORT ${PORT}`)
})
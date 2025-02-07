const express = require('express')
const app = express()
const port = 3000

app.get('/ping',(req,res)=>{
    res.send("This is rudar asap working on ping route")
})

app.listen(port,()=>{
    console.log(`The server is running on port ${port}`)
})
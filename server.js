
const express = require('express')
const app = express()

const fs  = require('fs')
 
app.use(express.json())

app.get('/', function(req, res){
    res.send()
})

app.post('/data', function(req, res){
    console.log(req.body)
    res.redirect('/')
})
 
app.listen(3000, () => console.log('포트 3000에 서버가 열렸습니다.'))

const express = require('express')
const app = express()

const fs  = require('fs')
const bodyParser = require('body-parser')

const db = require('./database')

app.use("/css", express.static("./static/css"))
app.use("/js", express.static("./static/js"))

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

app.get('/', function(req, res){
    var html = fs.readFileSync('./index.html', 'utf8')
    db.conn.query(db.getAllSh(), (err, row) => {
        if(err) console.log(err);
        var result = ""
        //console.log(row)
        row.forEach(x => {
            if(x == undefined) return;
            result += `<tr><td>${x.name}</td><td>${x.money}</td><td>${x.date}</td><td>${x.per}</td></tr>\r\n`
        });
        res.send(html.replace("<!--!@#$%^&*()-->", result))
    })
})

app.post('/data', function(req, res){
    db.conn.query(db.findSh(req.body.name), (err, row) => {
        if(err) return;
        console.log(row)
        if(row == null){
            console.log(db.AddSh(req.body))
            db.conn.query(db.AddSh(req.body), (err) => {
                console.log(err)
            })
        }
        else{
            db.conn.query(db.updateSh(req.body), (err) => {
                console.log(err)
            })
        }
    })
    res.redirect('/')
})
 
app.listen(3000, () => console.log('포트 3000에 서버가 열렸습니다.'))

const express = require('express')
const app = express()

const fs  = require('fs')
const bodyParser = require('body-parser')

app.use("/css", express.static("./static/css"))
app.use("/js", express.static("./static/js"))

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

var data = GetData()

function GetData(){
    var str = fs.readFileSync('data.txt', 'utf8')
    var arr = str.split('\r\n').map(x => {
        var _ = x.split(',')
        return {name:_[0],
                money:parseInt(_[1]),
                date:_[2],
                per:parseFloat(_[3])}
    })

    return arr.filter(x => x.name.length != 0)
}

function ParseTable()
{
    var result = ""
    data.forEach(x => {
        if(x == undefined) return;
        result += `<tr><td>${x.name}</td><td>${x.money}</td><td>${x.date}</td><td>${x.per}</td></tr>\r\n`
    });
    return result
}

function ParseHTML()
{
    var html = fs.readFileSync('./index.html', 'utf8')
    return html.replace("<!--!@#$%^&*()-->", ParseTable())
}

function AddData(body)
{
    var event = new Date(Date.now());
    var abc =  data.find(x => x.name == body.name)
    if(abc == null){
        abc = {name : body.name,
               money:parseInt(body.money),
               date:event.toLocaleString('ko-KR', { timeZone: 'UTC' }),
               per:null}
        data.push(abc)
    }
    else{
        abc.money += parseInt(body.money)
        abc.date = event.toLocaleString('ko-KR', { timeZone: 'UTC' })
    }
    CalcPer()
    Save()
}

function CalcPer()
{
    var sum = 0.0
    data.forEach(x => sum += x.money)
    data.forEach(x => {
        x.per = (x.money * 100/sum).toFixed(2) 
    })
}

function Save(){
    var text = ""
    data.forEach(x => {
        text += `${x.name},${x.money},${x.date},${x.per}\r\n`
    })
    fs.writeFileSync('data.txt',text,'utf8')
}

app.get('/', function(req, res){
    res.send(ParseHTML())
})

app.post('/data', function(req, res){
    AddData(req.body)
    res.redirect('/')
})
 
app.listen(3000, () => console.log('포트 3000에 서버가 열렸습니다.'))
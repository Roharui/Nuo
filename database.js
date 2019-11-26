
const mysql = require("mysql")

var connection =  mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: 'jack7073',
    port    : 3306,
    database: 'nuo'
})

module.exports = {

    conn : connection,

    getAllSh() { return 'select *, (money * 100 / (select sum(money) from nuo.shareholder)) as per from nuo.shareholder;' },
    
    findSh(name) { return `select * from shareholder where name = '${name}'` },

    AddSh(body){ return `INSERT INTO shareholder(name, money, date) VALUES ('${body.name}', ${body.money}, now())`},

    updateSh(body){return `update shareholder set money = money + ${body.money}, date = now() where name = '${body.name}'`}
}

/*
module.exports = {
    host    : 'localhost',
    user    : 'root',
    password: 'jack7073',
    port    : 3306,
    database: 'nuo',
    insecureAuth : true
}
*/
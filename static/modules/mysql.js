/**
 * Created with JetBrains WebStorm.
 * User: Tianyi(99)
 * Date: 13-3-20
 * Time: 下午5:52
 */
var mysql = require('mysql')
function mysqlOrm(conn) {
    this.conn = conn || {
        host:'192.168.1.3',
        user:'root',
        password:'c1N+hUjANg0s7!A',
        database:'coreIdentification'
    };
    this.cache = {};
    this.connection = null;
}
mysqlOrm.prototype = {
    init:function () {
        var connect = mysql.createConnection(this.conn);
        this.connection = connect;
        return connect
    },
    end:function () {
        if (this.connection) {
            this.connection.end();
            this.connection = null;
        } else {
            throw new Error('no mySql connection exists')
        }

    },
    exec:function (statement, callback) {
        if (this.connection) {
            this.connection.query(statement, function (err, rows, fields) {
                if (err) throw err;
                callback(rows, fields)
            });
        } else {
            throw new Error('no mySql connection exists')
        }
    }
}
exports.orm = mysqlOrm;
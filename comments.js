// creat web server
// 1. npm install express
// 2. npm install body-parser
// 3. npm install mysql
// 4. npm install cors
// 5. npm install nodemon

// 1. import module
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')

// 2. create express object
const app = express()

// 3. use body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// 4. use cors
app.use(cors())

// 5. create mysql connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'comment',
  port: 3306
})

// 6. create web server
app.listen(5000, () => {
  console.log('server is running ...')
})

// 7. create api
// 7.1 create api for getting all comments
app.get('/comments', (req, res) => {
  // 7.1.1 get connection from connection pool
  pool.getConnection((err, connection) => {
    if (err) throw err

    // 7.1.2 use connection
    connection.query('select * from comment', (err, rows) => {
      if (err) throw err
      // console.log(rows)
      // 7.1.3 release connection
      connection.release()

      // 7.1.4 return data to client
      res.send(rows)
    })
  })
})

// 7.2 create api for adding comments
app.post('/comments', (req, res) => {
  // 7.2.1 get connection from connection pool
  pool.getConnection((err, connection) => {
    if (err) throw err

    // 7.2.2 use connection
    connection.query('insert into comment set ?', req.body, (err, result) => {
      if (err) throw err

      // 7.2.3 release connection
      connection.release()

      // 7.2.4 return data to client
      res.send({result: 'ok'})
    })
  })
})

// 7.3 create api for deleting comment
app.delete('/comments/:id', (req, res) => {
    // 7.3.1 get connection from connection pool
    pool.getConnection((err, connection) => {
        if (err) throw err
    
        // 7.3.2 use connection
        connection.query('delete from comment where id = ?', req.params.id, (err, result) => {
        if (err) throw err
    
        // 7.3.3 release connection
        connection.release()
    
        // 7.3.4 return data to client
        res.send({result: 'ok'})
        })
    })
    })
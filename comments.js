// creat web server
// 1. create server
// 2. listen request
// 3. handle request

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url);
    if (req.url === '/comments') {
        // read file
        fs.readFile('./comments.json', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
                res.end('Server Error');
            } else {
                // write file
                res.writeHead(200, {
                    'Content-Type': 'text/plain; charset=utf-8'
                });
                res.end(data);
            }
        });
    } else if (req.url === '/post' && req.method === 'POST') {
        // post request
        // 1. get data
        // 2. save data
        // 3. response
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on('end', () => {
            console.log(data);
            res.writeHead(200, {
                'Content-Type': 'text/plain; charset=utf-8'
            });
            res.end('发布成功');
        });
    } else {
        res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('server is running at http://')
});
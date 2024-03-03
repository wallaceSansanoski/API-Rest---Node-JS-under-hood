const http = require('node:http')
const {  getAllUsers, getUserByID } = require('./controller/usersControllers')

const PORT = process.env.PORT || '3000'

http.createServer((request, response) => {

    const {url, method } = request

    if(method === 'GET' && url === '/user'){
        getAllUsers(request, response)
    } 
    else if (url.match(/\/users\/([0-9]+)/) && method === 'GET') { /// search and see how method match work proprelly !!!
        const id = url.match('\/users\/[0-9]+')[0].split('/')[2]
        getUserByID(request, response, id )

    } else  {
        response.writeHead(404, {
            'Content-Type' : 'application/json'
        })
       response.end(JSON.stringify({ message : 'Not found***'}))
    }


}).listen(PORT , () => console.log(`Server running at port ${PORT}`))
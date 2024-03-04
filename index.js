const http = require('node:http')
const {  getAllUsers, getUserByID, createUser, userDelete } = require('./controller/usersControllers')

const PORT = process.env.PORT || '3000'

http.createServer((request, response) => {

    const { url, method } = request

    if(method === 'GET' && url === '/users'){
        getAllUsers(request, response)
    } 
    else if (url.match(/\/user\/([0-9]+)/) && method === 'GET') { 
        const id = url.match('\/user\/[0-9]+')[0].split('/')[2]
        getUserByID(request, response, id)
    }
    else if(method === 'POST' && url === '/user/include') {
        createUser(request, response)
    }
    else if(method === 'DELETE' && url.match(/\/user\/remove\/([0-9]+)/)) {
        const id = url.match(/\/user\/remove\/([0-9]+)/)[0].split('/')[3]
        userDelete(request,response, id)
    }else  {
        response.writeHead(404, { 'Content-Type' : 'application/json'})
       response.end(JSON.stringify({ message : 'Not found route***'}))
    }


}).listen(PORT , () => console.log(`Server running at port ${PORT}`))
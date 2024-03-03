const { findAll, findByID } = require("../models/usersModels");

async function getAllUsers(request, response) {
    try {
        const users = await findAll()
        response.writeHead(200, {
            'Content-Type' : 'application/json'
        })
         response.end(JSON.stringify(users))
        
    } catch (error) {
        console.log(error)
    }
}

/// single user  like /user/:id

async function getUserByID (request, response, id) {
    try {
        const userByID = await findByID(id)

        if(!userByID){
            response.writeHead(404, { 'Content-Type': 'application/json'})
            response.end(JSON.stringify({message : 'DEU RUIM **** BAD REQUEST'}))
        }else {
            response.writeHead(200, {
                'Content-Type': 'application/json'
            })
            response.end(JSON.stringify(userByID))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
     getAllUsers,
     getUserByID
}
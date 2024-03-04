const { findAll, findByID, addUser, deleteUser} = require("../models/usersModels");
const { includeUser } = require("../utilis");

//@ desc -  return all user
//@ route  GET - /users
async function getAllUsers(request, response) {
    try {
        const users = await findAll()
        response.writeHead(200, {'Content-Type' : 'application/json'})
         response.end(JSON.stringify(users))
        
    } catch (error) {
        console.log(error)
    }
}


//@ desc -  return user by ID
//@ route  GET- /user/:id
async function getUserByID (request, response, id) {
    try {
        const userByID = await findByID(id)

        if(!userByID){
            response.writeHead(404, {'Content-Type': 'application/json'})
            response.end(JSON.stringify({message : 'DEU RUIM **** BAD REQUEST'}))
        }else {
            response.writeHead(200, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify(userByID))
        }
    } catch (error) {
        console.log(error)
    }
}

//@ desc -  create a user 
//@ route - POST /user/include
async function createUser(request, response) {
    
    try {
        const body = await includeUser(request)
        addUser(body)

        response.writeHead(201, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(body))
    } catch (error) {
        console.log(error)
    }
}

//@ desc -  delete user
//@ route  DELETE - /users/remove/:id

async function userDelete(request, response, id) {
    try {
        const user = await deleteUser(id)
        if(user.message) {
            response.writeHead(400,{'Content-Type':'application/json'})
            response.end(JSON.stringify(user))
        }
        response.writeHead(200,{'Content-Type':'application/json'})
        response.end(JSON.stringify(user))
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
     getAllUsers,
     getUserByID,
     createUser,
     userDelete
}
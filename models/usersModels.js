const users = require('../db/database.json')
const { v4: uuidv4 } = require('uuid');
const { writeRegisterUser } = require('../utilis');


function findAll () {
    return new   Promise((resolve, reject) => {
        resolve(users)
    })
}

function findByID (id) {

    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id === parseInt(id))
        resolve(user)
    })
}

function addUser (user) {
    return new Promise((resolve, reject) => {
        const newUser = {...user, id : users.length + 1}
        users.push(newUser)
        writeRegisterUser('./db/database.json', users)
        resolve(newUser)
    })

}

function deleteUser(id){
    return new Promise((resolve, reject) => {
        const user = users.findIndex((user) => parseInt(user.id) === parseInt(id))
        if(user < 0 )return reject({message  : 'ID not exist'})
        users.splice(user, 1)
        writeRegisterUser('./db/database.json', users)
        resolve(users)
    })
}

module.exports = {
    findAll,
    findByID,
    addUser,
    deleteUser
}
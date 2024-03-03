const users = require('../db/database.json')

function findAll () {
    return new   Promise((resolve, reject) => {
        resolve(users)
    })
}

function findByID (id) {

    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id=== parseInt(id))
        resolve(user)
    })
}

module.exports = {
    findAll,
    findByID
}
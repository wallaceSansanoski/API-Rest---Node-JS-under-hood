const  fs = require('node:fs')

function writeRegisterUser (filename, data) {
    return fs.writeFileSync(filename, JSON.stringify(data), 'utf8', (err) => {
        if(err){
            console.log('Not  possible to register User***')
        }
    })
}

function includeUser(request) {
    return new Promise((resolve, reject) => {
        try {
            let body = ''
            request.on('data', (chunk) => {// why we need to use .on() method
                body = chunk.toString()
            })

            request.on('end', () => {
                const newBody = JSON.parse(body)
                resolve(newBody)
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    writeRegisterUser,
    includeUser
}
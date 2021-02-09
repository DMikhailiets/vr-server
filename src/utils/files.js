let fs = require('fs')

let getFiles = function (){
    
  let files_ = []
    let files = fs.readdirSync(__dirname + '/../../uploads/')
    for (let i in files){
        let name = files[i]
            files_.push(name)
    }
    return files_
}

module.exports = getFiles
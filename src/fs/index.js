import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
console.log(import.meta.url,'__dirname')
// 异步读取文件
let fileText = ''
let fileTextCode = '12'

fs.readFile(path.join(path.resolve(),'src/httpServer/index.js'),(err,res)=>{
    if(err){
        return console.error(err)
    }
    fileTextCode = res
    fileText = res.toString()

    fs.writeFile('copy_index.js',fileTextCode,(err)=>{
        if(err){
            console.error(err)
        }
        console.log('写入完成')
    })
})

// 同步为 readFileSync
fileText = fs.readFileSync(path.join(path.resolve(),'src/httpServer/index.js'))
fs.writeFileSync(path.join(path.resolve(),'src/httpServer/index_copy.js'),fileText)
// 异步方法一般都有返回值
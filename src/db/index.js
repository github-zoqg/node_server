// 1.导入mysql模块
import mysql from 'mysql'

// 2.创建数据库连接对象
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'custom'
})
 
// 3.向外共享 数据库的连接对象
export default db
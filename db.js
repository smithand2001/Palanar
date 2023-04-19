const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/cmsdb.sqlite');


let sql = `SELECT * FROM USER WHERE username=? and password=?` ;

db.get(sql, ['subu','1234'], (err, row) => {
  if (err) {
    throw err;
  }else{
    console.log(row)
  }
});

function getRow(sql, values) {
    return new Promise((resolve, reject) =>{
        db.get(sql,values, (err,row) => {
            if(err) {
                reject(err);
            }else{
                resolve(row);
            }
            });

        })
}

async function getRowTest() {
    let row = await getRow(sql,['subu', '1234'])
    console.log(row)
}

getRowTest().then(()=>console.log('query completed'))

module.exports = { getRow}

// close the database connection
db.close();
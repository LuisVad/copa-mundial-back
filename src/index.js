const { app } = require('./config/express')
const db = require('./utils/mysql');

const main = () => {
    try{
        //console.log('DB_HOST:', process.env.DB_HOST);
        //console.log('DB_USER:', process.env.DB_USER);
        //console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
        //console.log('DB_NAME:', process.env.DB_DATABASE);
        app.listen(app.get('port'))
        console.log(`Running in http://localhost:${app.get('port')}/`)
    }catch (err) {
        console.log(err)
    }
}

main();
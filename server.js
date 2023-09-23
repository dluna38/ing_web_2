const app = require(__dirname+'/app')
const { mongoConn } = require(__dirname+'/databases/configuration')
require('dotenv').config()

mongoConn();

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
    console.log(`Server UP - ${app.get('port')}`)
})



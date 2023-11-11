const express = require('express');
const cors = require('cors');
const db = require("./database/db.js")
const todoraquiraRouter = require("./routes/routes.js")
const {PORT} = require('./config.js')
const app = express()

app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use('/', todoraquiraRouter) 

async function startServer() {
    try {
      await db.authenticate();
      console.log('Conexión exitosa a la DB');
      
      await db.sync();

      app.get('/', (req, res) =>{
        res.send('Hola mundo');
      });
      
      app.listen(PORT, () => {
        console.log('Server running in http://localhost:', PORT);
      });
    } catch (error) {
      console.log(`Error en la conexión a la DB: ${error}`);
    }
  }
  
startServer();
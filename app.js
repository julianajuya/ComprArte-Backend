const express = require('express');
const cors = require('cors');
const db = require("./database/db.js")
const todoraquiraRouter = require("./routes/routes.js")
const app = express()


app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use('/', todoraquiraRouter) 

async function startServer() {
    try {
      await db.authenticate();
      console.log('Conexión exitosa a la DB');
      
      app.get('/', (req, res) =>{
        res.send('Hola mundo');
      });
      
      app.listen(8000, () => {
        console.log('Server running in http://localhost:8000');
      });
    } catch (error) {
      console.log(`Error en la conexión a la DB: ${error}`);
    }
  }
  
startServer();
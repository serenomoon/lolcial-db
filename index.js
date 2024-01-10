const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');


//Express server
const app = express();

//DB
dbConnection();

//CORS
app.use(cors());

//Directorio publico
app.use( express.static('public') );

//Parseo body
app.use( express.json() );

//Rutas
app.use('/api/auth', require('./routes/auth') );

app.use('/api/posts', require('./routes/posts') );

app.use('/api/comments', require('./routes/comments') );

app.use('/api/likes', require('./routes/likes') );

app.use('/api/noticias', require('./routes/noticias') );

app.use('/api/perfil', require('./routes/perfil') );

app.use('/api/apiinfo', require('./routes/apiinfo') );

// app.use('/api/events', require('./routes/events') );

app.get('*', (req,res) => {
    res.sendFile( __dirname + '/public/index.html')
});


//Listener
app.listen( process.env.PORT, () => {
    console.log(`Server en puerto ${ process.env.PORT }`);
});

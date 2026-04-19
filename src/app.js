const express = require('express');
const app = express();
 
// Middleware para parsear JSON
app.use(express.json());
 
// Rutas
const authRouter           = require('./routes/auth.routes');
const usuariosRouter       = require('./routes/usuarios.routes');
const especialistasRouter  = require('./routes/especialistas.routes');
const citasRouter          = require('./routes/citas.routes');
const agendaRouter         = require('./routes/agenda.routes');
const pagosRouter          = require('./routes/pagos.routes');
const chatRouter           = require('./routes/chat.routes');
const iaRouter             = require('./routes/ia.routes');
const notificacionesRouter = require('./routes/notificaciones.routes');
const adminRouter          = require('./routes/admin.routes');
 
app.use('/api/v1/auth',            authRouter);
app.use('/api/v1/usuarios',        usuariosRouter);
app.use('/api/v1/especialistas',   especialistasRouter);
app.use('/api/v1/citas',           citasRouter);
app.use('/api/v1/agenda',          agendaRouter);
app.use('/api/v1/pagos',           pagosRouter);
app.use('/api/v1/chat',            chatRouter);
app.use('/api/v1/ia',              iaRouter);
app.use('/api/v1/notificaciones',  notificacionesRouter);
app.use('/api/v1/admin',           adminRouter);
 
module.exports = app;
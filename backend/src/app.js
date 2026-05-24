const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { manejarErrores } = require('./middlewares/authMiddleware');
 
const app = express();
 
// ─── Middlewares de seguridad ───
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173'
}));
 
// ─── Rate limiting — máximo 100 peticiones cada 15 minutos por IP ───
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { ok: false, msg: 'Demasiadas peticiones. Intenta de nuevo en 15 minutos.' }
});
app.use(limiter);

// ─── Middlewares globales ───
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(morgan('dev'));
app.use(express.json());

// ─── Rutas ───
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

// ─── Middleware de errores global — siempre al final ───
app.use(manejarErrores);

module.exports = app;
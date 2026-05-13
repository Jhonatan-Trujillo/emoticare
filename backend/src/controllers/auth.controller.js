const AuthModel = require('../models/auth.model');

const registro = async (req, res) => {
  try {
    const { nombre, correo, contrasena, rol } = req.body;

    if (!nombre || !correo || !contrasena || !rol) {
      return res.status(400).json({ ok: false, msg: 'Faltan campos obligatorios' });
    }
    if (contrasena.length < 8) {
      return res.status(400).json({ ok: false, msg: 'La contraseña debe tener mínimo 8 caracteres' });
    }

    const resultado = await AuthModel.registrarUsuario({ nombre, correo, contrasena, rol });
    if (!resultado.ok) {
      return res.status(400).json(resultado);
    }

    res.status(201).json({ ok: true, msg: 'Usuario registrado. Revisa tu correo para verificar la cuenta.' });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const verificarCorreo = async (req, res) => {
  try {
    const { correo, codigo } = req.body;

    if (!correo || !codigo) {
      return res.status(400).json({ ok: false, msg: 'Correo y código son requeridos' });
    }

    const resultado = await AuthModel.verificarCodigo(correo, codigo);
    if (!resultado.ok) {
      return res.status(400).json(resultado);
    }

    res.json({ ok: true, msg: 'Correo verificado. Cuenta activada correctamente.' });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return res.status(400).json({ ok: false, msg: 'Correo y contraseña son requeridos' });
    }

    const resultado = await AuthModel.autenticarUsuario(correo, contrasena);
    if (!resultado.ok) {
      return res.status(401).json(resultado);
    }

    res.json({ ok: true, token: resultado.token, data: resultado.usuario });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const loginTercero = async (req, res) => {
  try {
    const { proveedor, tokenProveedor } = req.body;

    if (!proveedor || !tokenProveedor) {
      return res.status(400).json({ ok: false, msg: 'Proveedor y token son requeridos' });
    }

    const resultado = await AuthModel.autenticarConTercero(proveedor, tokenProveedor);
    if (!resultado.ok) {
      return res.status(400).json(resultado);
    }

    res.json({ ok: true, token: resultado.token, data: resultado.usuario });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { registro, verificarCorreo, login, loginTercero };
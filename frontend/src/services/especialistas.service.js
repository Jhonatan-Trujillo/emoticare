import api from '../api/axiosConfig';

export const getEspecialistas = async (filtros = {}) => {
  const res = await api.get('/especialistas', { params: filtros });
  return res.data;
};

export const getEspecialista = async (id) => {
  const res = await api.get(`/especialistas/${id}`);
  return res.data;
};

export const crearEspecialista = async (data) => {
  const res = await api.post('/especialistas', data);
  return res.data;
};

export const actualizarEspecialista = async (id, data) => {
  const res = await api.put(`/especialistas/${id}`, data);
  return res.data;
};

export const eliminarEspecialista = async (id) => {
  const res = await api.delete(`/especialistas/${id}`);
  return res.data;
};
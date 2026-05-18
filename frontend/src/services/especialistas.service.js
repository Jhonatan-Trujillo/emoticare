import api from '../api/axiosConfig';

export const getEspecialistas = async (filtros = {}) => {
  const res = await api.get('/especialistas', { params: filtros });
  return res.data;
};

export const getEspecialista = async (id) => {
  const res = await api.get(`/especialistas/${id}`);
  return res.data;
};
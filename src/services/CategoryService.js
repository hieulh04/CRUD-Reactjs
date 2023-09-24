import api from "./api";

export const findAll = async () => {
  return await api.get("/category");
};

export const create = async (category) => {
  return await api.post("/category", category);
};

export const update = async (category, id) => {
  return await api.put(`/category/${id}`, category);
};

export const deleteById = async (id) => {
  return await api.delete(`/category/${id}`);
};
export const findCategoryById = async (id) => {
  return await api.get(`/category/${id}`);
};

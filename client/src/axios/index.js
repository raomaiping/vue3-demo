import axios from "axios";

//查询所有数据
export const fetchResources = () => {
  return axios.get("/api/profiles").then(res => res.data);
}

//根据id查询数据
export const fetchResource = (resourceId) => {
  return axios.get(`/api/profiles/${resourceId}`).then(res => res.data);
}

//根据title模糊查询数据
export const searchResource = (title) => {
  return axios.get(`/api/profiles/search/${title}`).then(res => res.data);
}

//根据id更新单条数据
export const updateResources = (id, resource) => {
  return axios.post(`/api/profiles/edit/${id}`, resource)
    .then(res => res.data)
    .catch((error => {
      return Promise.reject(error?.response?.data)
    }))
    ;
}

//根据id删除数据
export const deleteResources = (id) => {
  return axios.delete(`/api/profiles/delete/${id}`)
    .then(res => res.data)
    .catch((error => {
      return Promise.reject(error?.response?.data)
    }))
    ;
}

//创建单条数据
export const createResources = ( resource) => {
  return axios.post("/api/profiles/add", resource)
    .then(res => res.data)
    .catch((error => {
      return Promise.reject(error?.response?.data)
    }))
    ;
}
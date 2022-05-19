import http from 'src/utils/http'
const URL = '/admin'
const adminApi = {
  getAllUser() {
    return http.get(`${URL}/users`)
  },
  uploadImage(data, config) {
    return http.post(`${URL}/products/upload-images`, data, config)
  },
  addProduct(data) {
    return http.post(`${URL}/products`, data)
  },
  addCategory(data) {
    return http.post(`${URL}/categories`, data)
  }
}

export default adminApi

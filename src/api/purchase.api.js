import http from 'src/utils/http'

const URL = 'purchases'
export const purchaseApi = {
  addToCart(data) {
    return http.post(`${URL}/add-to-cart`, data)
  },
  getCartPurchase() {
    return http.get(URL, {
      params: {
        status: -1
      }
    })
  },
  updatePurchase(data) {
    return http.put(`${URL}/update-purchase`, data)
  },
  deletePurchase(id) {
    return http.delete(URL, id)
  },
  buyPurchase(data) {
    return http.post(`${URL}/buy-products`, data)
  }
}

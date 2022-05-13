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
  }
}

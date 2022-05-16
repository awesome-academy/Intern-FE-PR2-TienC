import http from 'src/utils/http'

const URL = 'purchases'
const STATUS_INCART = -1
const STATUS_ALL = 0

export const purchaseApi = {
  addToCart(data) {
    return http.post(`${URL}/add-to-cart`, data)
  },
  getCartPurchase() {
    return http.get(URL, {
      params: {
        status: STATUS_INCART
      }
    })
  },
  getPurchaseOrdered() {
    return http.get(URL, {
      params: {
        status: STATUS_ALL
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

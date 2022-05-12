class Path {
  constructor() {
    this.home = '/'
    this.login = '/login'
    this.register = '/register'
    this.product = '/product'
    this.productDetail = '/product/:idProduct'
    this.notFound = '*'
  }
}

export const path = new Path()

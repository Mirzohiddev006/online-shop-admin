import { Product } from '../models/product'
import { Customer } from '../models/customer'
import { Order } from '../models/order'

export class Shop {
  private _products: Product[] = []
  private _customers: Customer[] = []
  private _orders: Order[] = []

  constructor(public shopName: string) {}

  get products() { return this._products }
  get customers() { return this._customers }
  get orders() { return this._orders }

  addProduct(p: Product) { if (this._products.some(x => x.id === p.id)) throw new Error('exists'); this._products.push(p); console.info('[Shop] product added', p.id) }
  registerCustomer(c: Customer) { if (this._customers.some(x => x.email === c.email)) throw new Error('exists'); this._customers.push(c); console.info('[Shop] customer registered', c.customerId) }
  processOrder(o: Order) { this._orders.push(o); console.info('[Shop] order processed', o.orderId) }
  searchProducts(q: string) { return this._products.filter(p => p.name.toLowerCase().includes(q.toLowerCase())) }
}

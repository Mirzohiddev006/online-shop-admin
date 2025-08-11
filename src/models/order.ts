import { OrderStatus } from './enums'
import { Product } from './product'

export interface OrderItem { productId: string; quantity: number; unitPrice: number; totalPrice: number }

export class Order {
  public items: OrderItem[] = []
  public totalAmount = 0
  public status: OrderStatus = OrderStatus.PENDING
  constructor(public orderId: string, public customerId: string) {}
  addItem(product: Product, qty: number) { if (!product.isAvailable() || qty > product.stock) throw new Error('not enough'); product.reduceStock(qty); this.items.push({ productId: product.id, quantity: qty, unitPrice: product.price, totalPrice: product.price * qty }); this.calc() }
  calc() { this.totalAmount = this.items.reduce((s, i) => s + i.totalPrice, 0) }
  updateStatus(s: OrderStatus) { this.status = s }
}

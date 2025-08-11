import { ProductCategory } from './enums'

export class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public stock: number,
    public category: ProductCategory
  ) {}

  updatePrice(price: number) { if (price <= 0) throw new Error('Price must be > 0'); this.price = price }
  addStock(q: number) { if (q <= 0) throw new Error('q > 0'); this.stock += q }
  reduceStock(q: number) { if (q <= 0 || q > this.stock) throw new Error('invalid'); this.stock -= q }
  isAvailable() { return this.stock > 0 }
}

export class Customer {
  public orders: string[] = []
  constructor(
    public customerId: string,
    public fullName: string,
    public email: string,
    public phoneNumber: string,
    public bonusPoints: number = 0
  ) {}
  addBonus(points: number) { if (points <= 0) throw new Error('>0'); this.bonusPoints += points }
  useBonus(points: number) { if (points <= 0 || points > this.bonusPoints) throw new Error('invalid'); this.bonusPoints -= points }
  updateContactInfo(email: string, phone: string) { this.email = email; this.phoneNumber = phone }
  getTotalOrders() { return this.orders.length }
}

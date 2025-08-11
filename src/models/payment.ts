import { PaymentMethod, PaymentStatus } from './enums'

export class Payment {
  constructor(
    public paymentId: string,
    public orderId: string,
    public method: PaymentMethod,
    public amount: number,
    public status: PaymentStatus = PaymentStatus.PENDING
  ) {}

  processPayment() {
    if (this.amount <= 0) throw new Error('Amount must be > 0')
    this.status = PaymentStatus.COMPLETED
  }

  refundPayment() {
    if (this.status !== PaymentStatus.COMPLETED) throw new Error('Only completed payments can be refunded')
    this.status = PaymentStatus.REFUNDED
  }
}

import {Receipt} from './receipt'
import {calcTotalIncludingTax} from '../../application/receipt/calc-total-including-tax';
import {TAX_RATE} from '../../constants';

export class Receipts {
  constructor(private items: Receipt[]) {}

  toArray(): Receipt[] {
    return this.items
  }

  newReceipt() {
    this.items.push(new Receipt())
  }

  addTransaction(receiptUuid: string) {
    this.getReceipt(receiptUuid)
      .addTransaction()
  }

  removeTransaction(receiptUuid: string, transactionUuid: string) {
    this.getReceipt(receiptUuid)
      .removeTransaction(transactionUuid)
  }

  getReceiptsFixed(): Receipt[] {
    return this.items.map(item => {
      return calcTotalIncludingTax(item, TAX_RATE)
    })
  }

  private getReceipt(uuid: string): Receipt {
    return this.items.find(v => v.uuid === uuid)
  }
}

import { Injectable } from '@angular/core';

@Injectable()
export class ReceiptsService {
  items: any[]

  constructor() {
    this.items = []
  }

  newReceipt() {
    this.items.push({
      date: new Date(),
      transactions: [{
        dummy: 1
      }]
    })
  }

  addTransaction(idx: number) {
    this.items[idx].transactions.push({
      dummy: 1
    })
  }
}

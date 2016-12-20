import {Injectable} from '@angular/core'
import {Subject} from 'rxjs'

@Injectable()
export class ReceiptsService {
  items: any[]
  changed = new Subject()

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
    this.changed.next()
  }

  addTransaction(idx: number) {
    this.items[idx].transactions.push({
      dummy: 1
    })
    this.changed.next()
  }
}

import {Injectable} from '@angular/core'
import {Subject} from 'rxjs'

import {convertToCsv} from './convert-to-csv'
import {ConfigService} from '../config/config.service'

import {Receipts} from '../../domain/receipt/receipts'

@Injectable()
export class ReceiptsService {
  items: Receipts
  changed = new Subject()

  constructor(private configService: ConfigService) {
    this.items = new Receipts([])
  }

  newReceipt() {
    this.items.newReceipt()
    this.changed.next()
  }

  addTransaction(receiptUuid: string) {
    this.items.addTransaction(receiptUuid)
    this.changed.next()
  }

  removeTransaction(receiptUuid: string, transactionUuid: string) {
    this.items.removeTransaction(receiptUuid, transactionUuid)
    this.changed.next()
  }

  convertToCsv(): string {
    const receiptsFixed = this.items.getReceiptsFixed()
    return convertToCsv(
      receiptsFixed,
      this.configService.largeCategories
    )
  }
}

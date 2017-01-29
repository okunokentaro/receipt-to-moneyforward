import {Injectable} from '@angular/core'
import {Subject} from 'rxjs'

import {TAX_RATE} from '../../constants'
import {calcTotalIncludingTax} from './calc-total-including-tax'
import {convertToCsv} from './convert-to-csv'
import {ConfigService} from '../config/config.service'
import {Receipt} from '../../domain/receipt/receipt'
import {uuidGen} from "../../uuid-gen";

@Injectable()
export class ReceiptsService {
  items: Receipt[]
  changed = new Subject()

  constructor(private configService: ConfigService) {
    this.items = []
  }

  newReceipt() {
    this.items.push(new Receipt())
    this.changed.next()
  }

  addTransaction(idx: number) {
    const lastIndex       = this.items[idx].transactions.length - 1
    const lastTransaction = this.items[idx].transactions[lastIndex]

    const newTransaction   = Object.assign({}, lastTransaction)
    newTransaction.uuid    = uuidGen()
    newTransaction.content = ''
    newTransaction.amount  = 0
    this.items[idx].transactions.push(newTransaction)

    this.changed.next()
  }

  removeTransaction(idx: number, transactionUuid: string) {
    const receipt = this.items[idx]
    receipt.removeTransaction(transactionUuid)

    this.changed.next()
  }

  convertToCsv(): string {
    const receiptsFixed = this.items.map((item) => {
      return calcTotalIncludingTax(item, TAX_RATE)
    })
    return convertToCsv(
      receiptsFixed,
      this.configService.largeCategories
    )
  }
}

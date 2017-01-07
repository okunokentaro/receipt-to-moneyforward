import {Injectable} from '@angular/core'
import {Subject} from 'rxjs'

import {TAX_RATE} from '../../constants'
import {calcTotalIncludingTax} from './calc-total-including-tax'
import {convertToCsv} from './convert-to-csv'
import {ConfigService} from '../config/config.service'

export type Transaction = {
  lCatIndex: number,
  mCatIndex: number,
  content: string,
  amount: number,
  isTaxIncluded: boolean,
  amountFixed?: number,
}

export type Receipt = {
  date: Date,
  transactions: Transaction[],
  place: string,
  account: string,
  total?: number
}

const defaultTransactions = (): Transaction => {
  return {
    lCatIndex: 0,
    mCatIndex: 0,
    content: '',
    amount: 0,
    isTaxIncluded: true
  }
}

@Injectable()
export class ReceiptsService {
  items: Receipt[]
  changed = new Subject()

  constructor(private configService: ConfigService) {
    this.items = []
  }

  newReceipt() {
    this.items.push({
      date: new Date(),
      transactions: [defaultTransactions()],
      place: '',
      account: '',
    })

    this.changed.next()
  }

  addTransaction(idx: number) {
    const lastTransaction  = this.items[idx].transactions[this.items[idx].transactions.length - 1]

    const newTransaction   = Object.assign({}, lastTransaction)
    newTransaction.content = ''
    newTransaction.amount  = 0
    this.items[idx].transactions.push(newTransaction)

    this.changed.next()
  }

  convertToCsv(): string {
    const receiptsFixed = this.items.map((item) => {
      return calcTotalIncludingTax(item, TAX_RATE)
    })
    return convertToCsv(receiptsFixed, this.configService.largeCategories)
  }
}

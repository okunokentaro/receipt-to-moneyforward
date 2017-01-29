import {uuidGen} from "../../uuid-gen";

export interface Transaction {
  uuid         : string
  lCatIndex    : number
  mCatIndex    : number
  content      : string
  amount       : number
  isTaxIncluded: boolean
  amountFixed? : number
}

const defaultTransactions = (): Transaction => {
  return {
    uuid         : uuidGen(),
    lCatIndex    : 0,
    mCatIndex    : 0,
    content      : '',
    amount       : 0,
    isTaxIncluded: true
  }
}

export class Receipt {
  uuid        : string
  date        : Date
  transactions: Transaction[]
  place       : string
  account     : string
  total       : number | null

  constructor() {
    this.uuid         = uuidGen()
    this.date         = new Date()
    this.transactions = [defaultTransactions()]
    this.place        = ''
    this.account      = ''
    this.total        = null
  }

  removeTransaction(uuid: string) {
    this.transactions = this.transactions.filter(t => t.uuid !== uuid)
  }
}

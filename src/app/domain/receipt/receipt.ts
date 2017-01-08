export type Transaction = {
  lCatIndex: number,
  mCatIndex: number,
  content: string,
  amount: number,
  isTaxIncluded: boolean,
  amountFixed?: number,
}

const defaultTransactions = (): Transaction => {
  return {
    lCatIndex    : 0,
    mCatIndex    : 0,
    content      : '',
    amount       : 0,
    isTaxIncluded: true
  }
}

export class Receipt {
  date: Date
  transactions: Transaction[]
  place: string
  account: string
  total: number | null

  constructor() {
    this.date         = new Date()
    this.transactions = [defaultTransactions()]
    this.place        = ''
    this.account      = ''
    this.total        = null
  }
}

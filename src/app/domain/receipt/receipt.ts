import {uuidGen} from '../../uuid-gen'
import {Transaction} from '../transaction/transaction'

export class Receipt {

  uuid:         string
  date:         Date
  transactions: Transaction[]
  place:        string
  account:      string
  total:        number | null

  constructor() {
    this.uuid         = uuidGen()
    this.date         = new Date()
    this.transactions = [new Transaction()]
    this.place        = ''
    this.account      = ''
    this.total        = null
  }

  addTransaction() {
    const newTransaction = Object.assign({}, this.getLastTransaction())

    newTransaction.uuid    = uuidGen()
    newTransaction.content = ''
    newTransaction.amount  = 0

    this.transactions.push(newTransaction)
  }

  removeTransaction(uuid: string) {
    this.transactions = this.transactions.filter(t => t.uuid !== uuid)
  }

  private getLastTransaction(): Transaction {
    const idx = this.transactions.length - 1
    return this.transactions[idx]
  }

}

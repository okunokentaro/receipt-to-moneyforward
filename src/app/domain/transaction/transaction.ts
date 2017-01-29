import {uuidGen} from '../../uuid-gen'

export class Transaction {
  uuid         : string
  lCatIndex    : number
  mCatIndex    : number
  content      : string
  amount       : number
  isTaxIncluded: boolean
  amountFixed  : number | null

  constructor() {
    this.uuid          = uuidGen()
    this.lCatIndex     = 0
    this.mCatIndex     = 0
    this.content       = ''
    this.amount        = 0
    this.isTaxIncluded = true
    this.amountFixed   = null
  }
}

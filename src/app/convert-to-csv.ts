import * as Papa from 'papaparse'

import {Receipt} from './receipts.service'
import {LargeCategory} from './config.service'
const leftpad = require('left-pad')

const getMfDate = (date: Date) => {
  const yyyy = date.getFullYear()
  const mm   = leftpad(date.getMonth() + 1, 2, '0')
  const dd   = leftpad(date.getDate(),      2, '0')
  return [yyyy, mm, dd].join('/')
}

export const convertToCsv = (receipts: Receipt[], categories: LargeCategory[]): string => {
  const allTransactions = [] as any[]
  receipts.forEach((receipt) => {
    receipt.transactions.forEach((transaction) => {
      const mfTransaction = {
        '計算対象': 1,
        '日付': getMfDate(receipt.date),
        '内容': [receipt.place, transaction.content].join(' / '),
        '金額（円）': -1 * transaction.amountFixed,
        '保有金融機関': receipt.account,
        '大項目': categories[transaction.lCatIndex].name,
        '中項目': categories[transaction.lCatIndex].middleCategories[transaction.mCatIndex].name,
        'メモ': '',
        '振替': 0,
      }
      allTransactions.push(mfTransaction)
    })
  })

  return Papa.unparse(allTransactions, {
    quotes   : true,
    delimiter: ',',
    newline  : '\r\n'
  })
}

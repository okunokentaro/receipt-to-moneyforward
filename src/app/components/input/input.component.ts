import * as jQuery from 'jquery'
import {Component, OnInit, OnDestroy} from '@angular/core'
import {Router} from '@angular/router'
import {Subscription} from 'rxjs'

import {CONFIG_PATH} from '../../constants'
import {ReceiptsService} from '../../application/receipt/receipts.service'
import {ConfigService} from '../../application/config/config.service'
import {Receipt} from '../../domain/receipt/receipt'

const rerenderDropdown = () => {
  requestAnimationFrame(() => (<any>jQuery('.ui.dropdown')).dropdown())
}
const rerenderCheckbox = () => {
  requestAnimationFrame(() => (<any>jQuery('.ui.checkbox')).checkbox())
}
const rerenderSemanticUi = () => {
  rerenderDropdown()
  rerenderCheckbox()
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, OnDestroy {
  subscriptions = [] as Subscription[]

  constructor(public receiptsService: ReceiptsService,
              public configService: ConfigService,
              public router: Router) {
    this.subscriptions.push(
      this.receiptsService.changed.subscribe(() => {
        rerenderSemanticUi()
      })
    )
  }

  ngOnInit() {
    rerenderSemanticUi()
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  onClickNew() {
    this.receiptsService.newReceipt()
  }

  onClickConfig() {
    this.router.navigate([CONFIG_PATH])
  }

  onClickAddTransaction(receiptIndex: number) {
    this.receiptsService.addTransaction(receiptIndex)
  }

  onClickRemoveTransaction(receiptIndex: number,
                           transactionUuid: string) {
    this.receiptsService.removeTransaction(
      receiptIndex,
      transactionUuid
    )
  }

  onClickExportCsv() {
    const csv = this.receiptsService.convertToCsv()

    const a    = document.createElement('a')
    a.href     = URL.createObjectURL(new Blob([csv], {type: 'text/plain'}))
    a.download = 'export.csv'

    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  getMiddleCategories(lCatIndex: number): string[] {
    return lCatIndex === void 0 || lCatIndex === null
      ? []
      : this.configService.getMiddleCategoryNames(lCatIndex)
  }

  get largeCategories(): string[] {
    return this.configService.getLargeCategoryNames()
  }

  get receipts(): Receipt[] {
    return this.receiptsService.items
  }
}

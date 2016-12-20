import * as jQuery from 'jquery'
import {Component, OnDestroy} from '@angular/core'
import {ReceiptsService} from './receipts.service'
import {Subscription} from 'rxjs'

const rerenderDropdown = () => {
  requestAnimationFrame(() => (<any>jQuery('.ui.dropdown')).dropdown())
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  subscriptions = [] as Subscription[]

  constructor(public receiptsService: ReceiptsService) {
    this.subscriptions.push(this.receiptsService.changed.subscribe(() => {
      rerenderDropdown()
    }))
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe())
  }

  onClickNew() {
    this.receiptsService.newReceipt()
  }

  onClickAddTransaction(receiptIndex: number) {
    this.receiptsService.addTransaction(receiptIndex)
  }

  get receipts() {
    return this.receiptsService.items
  }
}

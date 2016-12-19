import * as jQuery from 'jquery'

import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http'
import {DateValueAccessorModule} from 'angular-date-value-accessor'

import {AppComponent} from './app.component'
import {ReceiptsService} from './receipts.service'

(<any>window).jQuery = jQuery
require('../semantic.js')

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DateValueAccessorModule,
  ],
  providers: [
    ReceiptsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

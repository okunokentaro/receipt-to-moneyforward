import * as jQuery from 'jquery'

import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http'
import {DateValueAccessorModule} from 'angular-date-value-accessor'

import {AppComponent} from './app.component'
import {ConfigComponent} from './config/config.component'
import {InputComponent} from './input/input.component'

import {ROUTING} from './app.routing'

import {ReceiptsService} from './receipts.service'
import {ConfigService} from './config.service'

(<any>window).jQuery = jQuery
require('../semantic.js')

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DateValueAccessorModule,
    ROUTING,
  ],
  providers: [
    ReceiptsService,
    ConfigService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'

import {InputComponent} from './input.component'
import {ReceiptsService} from '../../application/receipt/receipts.service'
import {ConfigService} from '../../application/config/config.service'
import { Router } from '@angular/router'

const RouterMock = {
  navigate() {}
}

fdescribe('InputComponent', () => {
  let component: InputComponent
  let fixture: ComponentFixture<InputComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InputComponent,
      ],
      imports: [],
      providers: [
        {provide: ReceiptsService, useClass: ReceiptsService, deps: [ConfigService]},
        ConfigService,
        {provide: Router, useValue: RouterMock}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

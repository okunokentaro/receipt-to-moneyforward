import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {ConfigService} from '../config.service'

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  constructor(public configService: ConfigService,
              public router: Router) {
  }

  ngOnInit() {
  }

  onClickDone() {
    this.router.navigate(['']);
  }

  onClickAddLargeCategory() {
    this.configService.addLargeCategory()
  }

  onClickAddMiddleCategory(lCatIndex: number) {
    this.configService.addMiddleCategory(lCatIndex)
  }

  getMiddleCategories(lCatIndex: number) {
    return this.configService.getMiddleCategories(lCatIndex)
  }

  setLargeCategoryName(lCatIndex: number, newName: string) {
    this.configService.setLargeCategoryName(lCatIndex, newName)
  }

  setMiddleCategoryName(lCatIndex: number, mCatIndex: number, newName: string) {
    this.configService.setMiddleCategoryName(lCatIndex, mCatIndex, newName)
  }

  get largeCategories() {
    return this.configService.largeCategories
  }
}

import {Injectable} from '@angular/core'

export type LargeCategory = {
  name: string,
  middleCategories: Array<{name: string}>
}

type ConfigData = {
  largeCategories: LargeCategory[],
  version?: number
}

const CONFIG_KEY = 'ReceiptToMoneyforward-Config'

@Injectable()
export class ConfigService {
  largeCategories: LargeCategory[] = []
  localStorage: Storage

  constructor() {
    this.localStorage = window.localStorage
    this.largeCategories = this.getConfig().largeCategories
  }

  addLargeCategory() {
    this.largeCategories.push({
      name: '',
      middleCategories: [{name: ''}],
    })

    this.setConfig(this.largeCategories)
  }

  addMiddleCategory(index: number) {
    this.largeCategories[index].middleCategories.push({
      name: '',
    })

    this.setConfig(this.largeCategories)
  }

  getMiddleCategories(index: number): any[] {
    if (this.largeCategories[index].middleCategories.length < 2) {
      return []
    }
    return this.largeCategories[index].middleCategories.slice(1)
  }

  setLargeCategoryName(index: number, newName: string) {
    this.largeCategories[index].name = newName
    this.setConfig(this.largeCategories)
  }

  setMiddleCategoryName(lCatIndex: number, mCatIndex: number, newName: string) {
    this.largeCategories[lCatIndex]
      .middleCategories[mCatIndex]
      .name = newName
    this.setConfig(this.largeCategories)
  }

  getLargeCategoryNames(): string[] {
    return this.largeCategories
      .map((category) => category.name)
  }

  getMiddleCategoryNames(lCatIndex: number): string[] {
    return this.largeCategories[lCatIndex]
      .middleCategories
      .map((category) => category.name)
  }

  private getConfig(): ConfigData {
    const jsonObj = JSON.parse(this.localStorage.getItem(CONFIG_KEY))
    if (!jsonObj) {
      return {largeCategories: []}
    }
    return jsonObj.data
  }

  private setConfig(largeCategories: LargeCategory[]): void {
    const json = JSON.stringify({
      data: {
        largeCategories,
        version: 1
      }
    })
    this.localStorage.setItem(CONFIG_KEY, json);
  }
}

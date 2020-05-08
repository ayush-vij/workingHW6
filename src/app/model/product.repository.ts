import { Injectable } from '@angular/core'
import { Product } from './product.model'
import { StaticDataSource } from './static.datasource'

@Injectable()
export class ProductRepository {
  private products: Product[] = []
  private categories: string[] = []

  constructor(private dataSource: StaticDataSource) {
    dataSource.getProducts().subscribe(data => {
      this.products = data
      this.categories = data
        .map(p => p.category)
        .filter((c, index, array) => array.indexOf(c) == index)
        .sort()
    })
  }

  getProducts(category: string = null, searchedText: string): Product[] {
    let list = this.products.filter(p => category == null || category == p.category)
    return applyFilter(searchedText, list);   //apply this code for filter...
  }

  getProduct(id: number): Product {
    return this.products.find(p => p.id == id)
  }

  getCategories(): string[] {
    return this.categories
  }
}

// search string in the list... 
export function applyFilter(filterValue: any, list: any[]) {
  let returnList = [];
  filterValue = filterValue.trimLeft();
  filterValue = filterValue.trim().toLowerCase();
  if (!filterValue || filterValue == "") {
    returnList = list.map(s => Object.assign(s));
  }
  else {
    let targetColumns = ['name', 'description', 'price'];
    returnList = filterListBySearchStringOnDisplayedColumns(filterValue, list, targetColumns).map(s => Object.assign(s));
  }
  return returnList;
}

export function filterListBySearchStringOnDisplayedColumns(searchString: string, targetList: any[], targetColumns: string[]) {
  let searchedList: any[] = [];
  let _targetList: any[] = targetList.map(s => Object.assign({}, s));
  for (var i = 0; i < _targetList.length; i++) {
    for (var j = 0; j < targetColumns.length; j++) {
      let obj = _targetList[i];
      let column = targetColumns[j];
      let val = obj[column];
      let value = val ? val.toString().toLowerCase() : '';
      let found = value.includes(searchString);
      if (found) {
        searchedList.push(_targetList[i]);
        break;
      }
    }
  }
  return searchedList;
}

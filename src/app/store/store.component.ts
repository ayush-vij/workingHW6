import { Component } from '@angular/core'
import { Product } from '../model/product.model'
import { ProductRepository } from '../model/product.repository'
import { Cart } from '../model/cart.model'
import { Router } from '@angular/router'
import { StaticDataSource } from '../model/static.datasource'

@Component({
  selector: 'store',
  templateUrl: 'store.component.html',
})
export class StoreComponent {
  public selectedCategory = null
  public productsPerPage = 4
  public selectedPage = 1
  public isDivisble: boolean = false;

  public list: any = [
    new Product(1, 'Cricket Bat', 'Cricket', 'Cricket Bat (Cricket)', 100),
    new Product(2, 'Cricket Bowl', 'Cricket', 'Cricket Bowl (Cricket)', 70),
    new Product(3, 'Soccer Ball', 'Soccer', 'Soccer Ball (Soccer)', 120),
    new Product(4, 'Tennis Racket', 'Tennis', 'Tennis Racket (Tennis)', 150),
    new Product(5, 'Swimming Cap', 'Swimming', 'Swimming Cap (Swimming)', 10),
    new Product(6, 'Swimming Costume', 'Swimming', 'Swimming Costume (Swimming)', 30),
    new Product(7, 'Chess Board', 'Indoor Games', 'Chess Board (Category 2)', 20),
    new Product(8, 'Chess Warriors', 'Indoor Games', 'Chess Warriors (Indoor Games)', 5),
    new Product(9, 'Board Games', 'Indoor Games', 'Board Games (Indoor Games)', 10),
    new Product(10, 'Table Tennis Table', 'Indoor Games', 'Table Tennis Table (Indoor Games)', 200),
    new Product(11, 'Table Tennis Ball', 'Indoor Games', 'Table Tennis Ball (Indoor Games)', 10),
    new Product(12, 'Table Tennis Racket', 'Indoor Games', 'Table Tennis Racket (Indoor Games)', 40),
    new Product(13, 'Handball', 'Handball', 'Handball (Handball)', 100),
    new Product(14, 'Shoes', 'Misc', 'Shoes (Misc)', 50),
    new Product(15, 'Stumps', 'Cricket', 'Stumps (Cricket)', 40),
  ]
  public productsList = (this.list);

  constructor(private repository: ProductRepository, private cart: Cart, private router: Router) { }

  get products(): Product[] {
    let pageIndex = (this.selectedPage - 1) * this.productsPerPage
    return this.repository
      .getProducts(this.selectedCategory)
      .slice(pageIndex, pageIndex + this.productsPerPage)
  }

  get categories(): string[] {
    return this.repository.getCategories()
  }

  search(filterValue: string) {
    debugger
    const productsList = this.repository.getProducts(this.selectedCategory)
    console.log("display product list", productsList);
    console.log(this.productsList.length);
     this.productsList.filter = filterValue.trim().toLowerCase();
     this.productsList.length = this.productsList.filteredData.length;
     if (this.productsList.filteredData.length == 0) {
       this.isDivisble = false;
     } else {
       this.isDivisble = true;
     }
  }

  changeCategory(newCategory?: string) {
    this.selectedCategory = newCategory
  }

  changePage(newPage: number) {
    this.selectedPage = newPage
  }

  changePageSize(newSize: number) {
    this.productsPerPage = Number(newSize)
    this.changePage(1)
  }

  get pageNumbers(): number[] {
    const products = this.repository.getProducts(this.selectedCategory)
    const pages = products.length / this.productsPerPage
    const pageCount = Math.ceil(pages)
    const pageNumbers = Array(pageCount)
      .fill(0)
      .map((x, i) => i + 1)

    return pageNumbers
  }

  addProductToCart(product: Product) {
    this.cart.addLine(product)
    this.router.navigateByUrl('/cart')
  }
}
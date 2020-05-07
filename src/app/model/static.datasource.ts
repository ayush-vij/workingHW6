import { Injectable } from '@angular/core'
import { Product } from './product.model'
import { Observable, from } from 'rxjs'
import { Order } from './order.model'

@Injectable()
export class StaticDataSource {
  private products: Product[] = [
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

  getProducts(): Observable<Product[]> {
    return from([this.products])
  }

  saveOrder(order: Order): Observable<Order> {
    console.log(JSON.stringify(order))
    return from([order])
  }
}
import { NgModule } from '@angular/core'
import { ProductRepository } from './product.repository'
import { StaticDataSource } from './static.datasource'
import { Cart } from './cart.model'

// make its classes/services available to other modules
@NgModule({
  providers: [ProductRepository, StaticDataSource, Cart],
})
export class ModelModule {}

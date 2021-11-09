import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from './product.services';

@Component({
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit, OnDestroy{
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errMessage = '';
  sub! : Subscription
  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: any[] = [];

  products: any[] = [];

  constructor(private productServices: ProductService) {}

  performFilter(filterBy: string): any[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter((product) =>
      product.productName.toLowerCase().includes(filterBy)
    );
  }

  toggleShowImage(): void {
    this.showImage = !this.showImage;
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

  ngOnInit(): void {
    this.sub = this.productServices.getProducts().subscribe({
      next: (prooucts) => {
        this.products = prooucts;
        this.filteredProducts = this.products
      },
      error: (err) => (this.errMessage = err),
    });
    ;
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}

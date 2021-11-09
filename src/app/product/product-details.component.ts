import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  pageTitle = 'Product Details'
  product: any | undefined;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.product =  {
      "productId": 8,
      "productName": "Saw",
      "productCode": "TBX-0022",
      "releaseDate": "May 15, 2021",
      "description": "15-inch steel blade hand saw",
      "price": 11.55,
      "starRating": 3.7,
      "imageUrl": "assets/images/saw.png"
    }
  }
  onBack(): void {
    this.router.navigate(['/products'])
  }

}

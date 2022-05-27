import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { WoocommerceProductsService } from 'src/app/services/products/woocommerce-products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  data : any
  constructor(public productService: ProductService,
    private woocommerceProductsService: WoocommerceProductsService,
    private httpClient: HttpClient
    ) { }

  ngOnInit() {
    this.woocommerceProductsService.getAllProducts().subscribe(result => {
      if (result) {
        this.data = JSON.stringify(result);
      }
    });
  }
}
